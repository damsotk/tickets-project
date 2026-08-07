import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hashPassword } from '@/lib/auth';
import { isIpRateLimited } from '@/lib/api/guards';
import { issueAuthTokens } from '@/lib/api/auth-session';
import { setAuthCookies } from '@/lib/auth-cookies';

export async function POST(request: Request) {
  try {
    if (await isIpRateLimited(request, 'auth')) {
      return NextResponse.json(
        { error: 'Too many attempts. Try again in 15 minutes.' },
        { status: 429 },
      );
    }

    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return NextResponse.json({ error: 'Email, password and name are required' }, { status: 400 });
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: 'Password must be at least 6 characters' },
        { status: 400 },
      );
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 400 });
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name,
        refreshToken: '',
      },
      select: {
        id: true,
        email: true,
        name: true,
        avatar: true,
        role: true,
        createdAt: true,
      },
    });

    const { accessToken, refreshToken } = await issueAuthTokens(user.id, user.role);

    const response = NextResponse.json(
      { user, message: 'Registration successful' },
      { status: 201 },
    );
    setAuthCookies(response, accessToken, refreshToken);

    return response;
  } catch (error) {
    console.error('Registration error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { generateAccessToken, generateRefreshToken } from '@/lib/auth';
import { rateLimiters } from '@/lib/rate-limit';
import { setAuthCookies } from '@/lib/auth-cookies';

interface DiscordTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
  email: string | null;
  verified: boolean;
  global_name: string | null;
}

async function exchangeCode(code: string): Promise<DiscordTokenResponse> {
  const response = await fetch('https://discord.com/api/v10/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      client_id: process.env.DISCORD_CLIENT_ID!,
      client_secret: process.env.DISCORD_CLIENT_SECRET!,
      grant_type: 'authorization_code',
      code,
      redirect_uri: process.env.DISCORD_REDIRECT_URI!,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to exchange code for token');
  }

  return response.json();
}

async function getDiscordUser(accessToken: string): Promise<DiscordUser> {
  const response = await fetch('https://discord.com/api/v10/users/@me', {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch Discord user');
  }

  return response.json();
}

function getDiscordAvatarUrl(user: DiscordUser): string | null {
  if (!user.avatar) return null;
  const ext = user.avatar.startsWith('a_') ? 'gif' : 'png';
  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}`;
}

export async function GET(request: NextRequest) {
  try {
    const ip = request.headers.get('x-forwarded-for') ?? 'anonymous';
    const { success } = await rateLimiters.auth.limit(ip);
    if (!success) {
      return NextResponse.redirect(new URL('/auth?error=rate_limit', request.url));
    }

    const { searchParams } = new URL(request.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    if (error) {
      return NextResponse.redirect(new URL('/auth?error=discord_denied', request.url));
    }

    if (!code) {
      return NextResponse.redirect(new URL('/auth?error=no_code', request.url));
    }

    const tokenData = await exchangeCode(code);

    const discordUser = await getDiscordUser(tokenData.access_token);

    if (!discordUser.email) {
      return NextResponse.redirect(new URL('/auth?error=no_email', request.url));
    }

    const avatarUrl = getDiscordAvatarUrl(discordUser);
    const displayName = discordUser.global_name || discordUser.username;

    let user = await prisma.user.findFirst({
      where: {
        OR: [{ discordId: discordUser.id }, { email: discordUser.email }],
      },
    });

    if (user) {
      user = await prisma.user.update({
        where: { id: user.id },
        data: {
          discordId: discordUser.id,
          avatar: avatarUrl || user.avatar,
        },
      });
    } else {
      user = await prisma.user.create({
        data: {
          email: discordUser.email,
          name: displayName,
          avatar: avatarUrl,
          discordId: discordUser.id,
        },
      });
    }

    const accessToken = generateAccessToken(user.id, user.role);
    const refreshToken = generateRefreshToken(user.id, user.role);

    await prisma.user.update({
      where: { id: user.id },
      data: { refreshToken },
    });

    const response = NextResponse.redirect(new URL('/', request.url));
    setAuthCookies(response, accessToken, refreshToken);
    return response;
  } catch (error) {
    console.error('Discord OAuth error:', error);
    return NextResponse.redirect(new URL('/auth?error=discord_failed', request.url));
  }
}

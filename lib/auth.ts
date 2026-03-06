import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { jwtVerify } from 'jose';

const JWT_SECRET = process.env.JWT_SECRET!;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET!;

interface CustomJWTPayload {
  userId: string;
  role: 'USER' | 'ADMIN';
}

// Hash password
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

// Verify password
export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
  return bcrypt.compare(password, hashedPassword);
}

// Generate access token (1 week)
export function generateAccessToken(userId: string, role: 'USER' | 'ADMIN'): string {
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: '7d' });
}

// Generate refresh token (30 days)
export function generateRefreshToken(userId: string, role: 'USER' | 'ADMIN'): string {
  return jwt.sign({ userId, role }, JWT_REFRESH_SECRET, { expiresIn: '30d' });
}

// Verify access token
export function verifyAccessToken(token: string): CustomJWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as CustomJWTPayload;
  } catch {
    return null;
  }
}

// Verify refresh token
export function verifyRefreshToken(token: string): CustomJWTPayload | null {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as CustomJWTPayload;
  } catch {
    return null;
  }
}
//  Verify access token (Edge Runtime compatible)
export async function verifyAccessTokenEdge(token: string): Promise<CustomJWTPayload | null> {
  try {
    const secret = new TextEncoder().encode(JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    if (
      typeof payload === 'object' &&
      payload !== null &&
      'userId' in payload &&
      'role' in payload
    ) {
      return {
        userId: payload.userId as string,
        role: payload.role as 'USER' | 'ADMIN',
      };
    }
    return null;
  } catch {
    return null;
  }
}

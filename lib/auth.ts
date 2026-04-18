import bcrypt from 'bcryptjs';
import jwt, { TokenExpiredError } from 'jsonwebtoken';
import { jwtVerify } from 'jose';

export const ACCESS_TOKEN_TTL = 60 * 60 * 24 * 7;
export const REFRESH_TOKEN_TTL = 60 * 60 * 24 * 30;

function getRequiredEnvVar(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(
      `❌ Fatal error: Environment variable ${name} is not set. ` +
        `Please add it to the .env file on the service where the project is hosted.`,
    );
  }
  return value;
}

const JWT_SECRET = getRequiredEnvVar('JWT_SECRET');
const JWT_REFRESH_SECRET = getRequiredEnvVar('JWT_REFRESH_SECRET');

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
  return jwt.sign({ userId, role }, JWT_SECRET, { expiresIn: ACCESS_TOKEN_TTL });
}

// Generate refresh token (30 days)
export function generateRefreshToken(userId: string, role: 'USER' | 'ADMIN'): string {
  return jwt.sign({ userId, role }, JWT_REFRESH_SECRET, { expiresIn: REFRESH_TOKEN_TTL });
}

// Verify access token
export function verifyAccessToken(token: string): CustomJWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as CustomJWTPayload;
  } catch (error) {
    if (!(error instanceof TokenExpiredError)) {
      console.error('[Auth] Access token verification failed:', error);
    }
    return null;
  }
}

// Verify refresh token
export function verifyRefreshToken(token: string): CustomJWTPayload | null {
  try {
    return jwt.verify(token, JWT_REFRESH_SECRET) as CustomJWTPayload;
  } catch (error) {
    if (!(error instanceof TokenExpiredError)) {
      console.error('[Auth] Refresh token verification failed:', error);
    }
    return null;
  }
}

// Verify access token (Edge Runtime compatible)
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

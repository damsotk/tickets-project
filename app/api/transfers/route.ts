import { NextRequest, NextResponse } from 'next/server';
import { requireAuth, checkRateLimit } from '@/lib/api/guards';
import {
  transferCoins,
  getTransferHistory,
  MIN_TRANSFER_AMOUNT,
  MAX_TRANSFER_AMOUNT,
  TRANSFER_DIRECTIONS,
  type TransferDirection,
} from '@/lib/api/transfers';

const MAX_RECIPIENT_ID_LENGTH = 50;
const MAX_CURSOR_LENGTH = 50;

export async function GET(request: NextRequest) {
  try {
    const { error, user } = await requireAuth();
    if (error) return error;

    const params = request.nextUrl.searchParams;
    const direction = params.get('direction') ?? 'all';
    const cursor = params.get('cursor');

    if (!TRANSFER_DIRECTIONS.includes(direction as TransferDirection)) {
      return NextResponse.json({ error: 'Invalid direction' }, { status: 400 });
    }

    if (cursor !== null && (cursor.length === 0 || cursor.length > MAX_CURSOR_LENGTH)) {
      return NextResponse.json({ error: 'Invalid cursor' }, { status: 400 });
    }

    const history = await getTransferHistory(user!.id, direction as TransferDirection, cursor);

    return NextResponse.json(history);
  } catch (error) {
    console.error('Error fetching transfer history:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const { error, user } = await requireAuth();
    if (error) return error;

    const limitError = await checkRateLimit(user!.id, 'transfers');
    if (limitError) return limitError;

    const { recipientId, amount } = await request.json();

    if (
      !recipientId ||
      typeof recipientId !== 'string' ||
      recipientId.length > MAX_RECIPIENT_ID_LENGTH
    ) {
      return NextResponse.json({ error: 'Invalid recipient' }, { status: 400 });
    }

    if (
      typeof amount !== 'number' ||
      !Number.isInteger(amount) ||
      amount < MIN_TRANSFER_AMOUNT ||
      amount > MAX_TRANSFER_AMOUNT
    ) {
      return NextResponse.json(
        { error: `Amount must be an integer of at least ${MIN_TRANSFER_AMOUNT}` },
        { status: 400 },
      );
    }

    if (recipientId === user!.id) {
      return NextResponse.json({ error: 'Cannot transfer coins to yourself' }, { status: 400 });
    }

    const {
      error: transferError,
      transfer,
      balance,
    } = await transferCoins(user!.id, recipientId, amount);
    if (transferError) return transferError;

    return NextResponse.json({ transfer, balance }, { status: 201 });
  } catch (error) {
    console.error('Error transferring coins:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

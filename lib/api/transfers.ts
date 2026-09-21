import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const MIN_TRANSFER_AMOUNT = 1;
export const MAX_TRANSFER_AMOUNT = 2_147_483_647;

type TransferRecord = { id: string; amount: number; recipientId: string | null; createdAt: Date };

type TransferResult =
  | { error: NextResponse; transfer: null; balance: null }
  | { error: null; transfer: TransferRecord; balance: number };

class TransferError extends Error {
  constructor(
    message: string,
    public status: number,
  ) {
    super(message);
  }
}

export async function transferCoins(
  senderId: string,
  recipientId: string,
  amount: number,
): Promise<TransferResult> {
  try {
    const { transfer, balance } = await prisma.$transaction(async (tx) => {
      const recipient = await tx.user.findUnique({
        where: { id: recipientId },
        select: { id: true },
      });
      if (!recipient) throw new TransferError('Recipient not found', 404);

      const { count } = await tx.user.updateMany({
        where: { id: senderId, balance: { gte: amount } },
        data: { balance: { decrement: amount } },
      });
      if (count === 0) throw new TransferError('Insufficient funds', 400);

      await tx.user.update({
        where: { id: recipientId },
        data: { balance: { increment: amount } },
      });

      const transfer = await tx.coinTransfer.create({
        data: { senderId, recipientId, amount },
        select: { id: true, amount: true, recipientId: true, createdAt: true },
      });

      const sender = await tx.user.findUniqueOrThrow({
        where: { id: senderId },
        select: { balance: true },
      });

      return { transfer, balance: sender.balance };
    });

    return { error: null, transfer, balance };
  } catch (error) {
    if (error instanceof TransferError) {
      return {
        error: NextResponse.json({ error: error.message }, { status: error.status }),
        transfer: null,
        balance: null,
      };
    }
    throw error;
  }
}

export const TRANSFER_DIRECTIONS = ['all', 'sent', 'received'] as const;
export type TransferDirection = (typeof TRANSFER_DIRECTIONS)[number];

const HISTORY_PAGE_SIZE = 10;

const counterpartySelect = { select: { id: true, name: true, avatar: true } };

export async function getTransferHistory(
  userId: string,
  direction: TransferDirection,
  cursor: string | null,
) {
  const where =
    direction === 'sent'
      ? { senderId: userId }
      : direction === 'received'
        ? { recipientId: userId }
        : { OR: [{ senderId: userId }, { recipientId: userId }] };

  const rows = await prisma.coinTransfer.findMany({
    where,
    orderBy: [{ createdAt: 'desc' }, { id: 'desc' }],
    take: HISTORY_PAGE_SIZE + 1,
    ...(cursor && { cursor: { id: cursor }, skip: 1 }),
    select: {
      id: true,
      amount: true,
      createdAt: true,
      senderId: true,
      sender: counterpartySelect,
      recipient: counterpartySelect,
    },
  });

  const hasMore = rows.length > HISTORY_PAGE_SIZE;
  const page = hasMore ? rows.slice(0, HISTORY_PAGE_SIZE) : rows;

  const transfers = page.map(({ id, amount, createdAt, senderId, sender, recipient }) => {
    const isSent = senderId === userId;
    return {
      id,
      amount,
      createdAt,
      direction: isSent ? ('sent' as const) : ('received' as const),
      counterparty: isSent ? recipient : sender,
    };
  });

  return { transfers, nextCursor: hasMore ? page[page.length - 1].id : null };
}

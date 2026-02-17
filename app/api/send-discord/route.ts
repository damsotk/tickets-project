import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { username, message, avatarUrl } = await request.json();

  if (!username || !message) {
    return NextResponse.json({ error: 'Username and message are required' }, { status: 400 });
  }

  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;

  if (!webhookUrl) {
    return NextResponse.json({ error: 'Webhook URL not configured' }, { status: 500 });
  }

  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        content: message,
        avatar_url: avatarUrl || 'https://cdn.discordapp.com/embed/avatars/0.png',
      }),
    });

    if (!response.ok) {
      throw new Error('Discord API error');
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending to Discord:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}

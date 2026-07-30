import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;
    if (!telegramBotToken || !telegramChatId) {
      return NextResponse.json({ ok: false, error: "Telegram is not configured" }, { status: 503 });
    }
    const { message } = await req.json();
    if (!message?.trim()) {
      return NextResponse.json({ ok: false, error: "empty message" }, { status: 400 });
    }

    const text = `🌐 *zooin 사이트에서 요청*\n\n${message}`;

    const res = await fetch(
      `https://api.telegram.org/bot${telegramBotToken}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: telegramChatId,
          text,
          parse_mode: "Markdown",
        }),
      }
    );

    const data = await res.json();
    if (!data.ok) throw new Error(data.description);

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 });
  }
}

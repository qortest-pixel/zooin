import { NextRequest, NextResponse } from "next/server";

const TELEGRAM_BOT_TOKEN = "8254002875:AAEsgasUuHMDnnXMUZl_VEYmKH9kW5PpBrY";
const TELEGRAM_CHAT_ID = "6478080843";

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message?.trim()) {
      return NextResponse.json({ ok: false, error: "empty message" }, { status: 400 });
    }

    const text = `🌐 *zooin 사이트에서 요청*\n\n${message}`;

    const res = await fetch(
      `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: TELEGRAM_CHAT_ID,
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

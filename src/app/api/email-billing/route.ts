import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const { name, email, address } = await req.json();
  if (!name || !email || !address) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  await resend.emails.send({
    from: "billing@yourdomain.com",
    to: email,
    subject: "Your Billing Information",
    html: `<p>Hi ${name},</p><p>Here is your billing info:</p><pre>${address}</pre>`,
  });
  return NextResponse.json({ ok: true });
}



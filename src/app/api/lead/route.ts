import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { supabase } from "@/lib/supabase";

const Schema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().email(),
  company: z.string().max(120).optional().or(z.literal("")),
  message: z.string().min(1).max(4000),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = Schema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json({ error: "Invalid input" }, { status: 400 });
    }
    const { name, email, company, message } = parsed.data;

    // 1. Save to Supabase
    const { error: dbError } = await supabase.from("leads").insert({
      name,
      email,
      company: company || null,
      message,
      source: "makai.ai",
    });

    if (dbError) {
      console.error("[lead] supabase error", dbError);
      return NextResponse.json(
        { error: "Could not save lead" },
        { status: 500 },
      );
    }

    // 2. (Optional) email notification if Resend is configured
    const apiKey = process.env.RESEND_API_KEY;
    const to = process.env.LEAD_TO_EMAIL;
    if (apiKey && to) {
      try {
        const resend = new Resend(apiKey);
        await resend.emails.send({
          from: "MakAI Site <onboarding@resend.dev>",
          to,
          replyTo: email,
          subject: `New lead — ${name}${company ? ` (${company})` : ""}`,
          text: `Name: ${name}\nEmail: ${email}\nCompany: ${company || "-"}\n\n${message}`,
        });
      } catch (e) {
        console.error("[lead] resend error (non-fatal)", e);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("[lead] error", e);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

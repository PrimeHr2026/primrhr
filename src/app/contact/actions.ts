"use server";

import { z } from "zod";
import { Resend } from "resend";
import { SITE } from "@/lib/site";

const schema = z.object({
  name: z.string().min(2, "Please enter your name").max(120),
  email: z.string().email("Please enter a valid email").max(160),
  phone: z.string().max(40).optional().or(z.literal("")),
  company: z.string().max(160).optional().or(z.literal("")),
  interest: z.string().max(80).optional().or(z.literal("")),
  message: z.string().min(10, "Please add a short message").max(3000),
  // honeypot — must stay empty
  website: z.string().max(0).optional().or(z.literal("")),
});

export type ContactState = {
  ok: boolean;
  error?: string;
  fieldErrors?: Record<string, string>;
};

export async function submitContact(
  _prev: ContactState,
  formData: FormData,
): Promise<ContactState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = schema.safeParse(raw);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = issue.path[0];
      if (typeof key === "string" && !fieldErrors[key]) fieldErrors[key] = issue.message;
    }
    return { ok: false, error: "Please check the form and try again.", fieldErrors };
  }

  const d = parsed.data;
  if (d.website) return { ok: true }; // honeypot tripped — silently accept

  const body = [
    `New enquiry from the Prime HR Academy website`,
    ``,
    `Name: ${d.name}`,
    `Email: ${d.email}`,
    `Phone: ${d.phone || "—"}`,
    `Company: ${d.company || "—"}`,
    `Interest: ${d.interest || "—"}`,
    ``,
    d.message,
  ].join("\n");

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || SITE.email;
  const from = process.env.CONTACT_FROM || "Prime HR Website <onboarding@resend.dev>";

  if (!apiKey) {
    // No key configured yet — don't fail the user; log for local/demo.
    console.info("[contact] (no RESEND_API_KEY) enquiry:\n" + body);
    return { ok: true };
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: d.email,
      subject: `New enquiry — ${d.name}${d.company ? ` (${d.company})` : ""}`,
      text: body,
    });
    if (error) {
      console.error("[contact] resend error", error);
      return { ok: false, error: "Something went wrong sending your message. Please WhatsApp us instead." };
    }
    return { ok: true };
  } catch (e) {
    console.error("[contact] exception", e);
    return { ok: false, error: "Something went wrong. Please WhatsApp us instead." };
  }
}

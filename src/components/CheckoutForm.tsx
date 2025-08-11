"use client";
import { useState } from "react";

export default function CheckoutForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setStatus(null);
    const res = await fetch("/api/email-billing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, address }),
    });
    if (res.ok) setStatus("Sent! Check your inbox.");
    else setStatus("Failed to send. Try again.");
    setLoading(false);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <input className="w-full border rounded px-3 py-2" placeholder="Full name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input className="w-full border rounded px-3 py-2" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <textarea className="w-full border rounded px-3 py-2" placeholder="Billing address" value={address} onChange={(e) => setAddress(e.target.value)} required />
      <button disabled={loading} className="bg-black text-white px-4 py-2 rounded disabled:opacity-60">{loading ? "Sending..." : "Email billing info"}</button>
      {status && <p className="text-sm">{status}</p>}
    </form>
  );
}



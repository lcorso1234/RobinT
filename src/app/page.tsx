"use client";

import { useCallback } from "react";

export default function Home() {
  const contact = {
    firstName: "Robin",
    lastName: "Toomey",
    phoneRaw: "7735510684",
    phoneDisplay: "773.551.0684",
    email: "robintoomey@gmail.com",
  };

  const handleSaveContact = useCallback(() => {
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:${contact.lastName};${contact.firstName};;;`,
      `FN:${contact.firstName} ${contact.lastName}`,
      `TEL;TYPE=CELL,VOICE:${contact.phoneRaw}`,
      `EMAIL;TYPE=INTERNET:${contact.email}`,
      "END:VCARD",
    ].join("\n");

    const blob = new Blob([vcard], { type: "text/vcard" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${contact.firstName}-${contact.lastName}.vcf`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);

    const smsBody = encodeURIComponent(
      "Hi Robin, I just added you to my network."
    );
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const smsUrl = isIOS ? `sms:&body=${smsBody}` : `sms:?body=${smsBody}`;
    window.setTimeout(() => {
      window.location.href = smsUrl;
    }, 650);
  }, [contact.firstName, contact.lastName, contact.phoneRaw]);

  return (
    <div className="relative z-10 flex min-h-screen items-center justify-center px-5 py-10 sm:px-10">
      <main className="w-full max-w-md">
        <section className="card-surface card-rim relative overflow-hidden rounded-[28px] px-6 py-8 sm:px-8">
          <div className="flex items-center justify-between">
            <div className="font-mono text-xs uppercase tracking-[0.35em] text-[var(--text-soft)]">
              Mobile Business Card
            </div>
            <div className="h-2 w-2 rounded-full bg-[var(--accent-neon)] accent-glow" />
          </div>

          <div className="mt-6 space-y-2 text-left">
            <p className="text-[0.95rem] uppercase tracking-[0.2em] text-[var(--text-soft)]">
              First Name:{" "}
              <span className="text-[var(--text-strong)]">{contact.firstName}</span>
            </p>
            <p className="text-[0.95rem] uppercase tracking-[0.2em] text-[var(--text-soft)]">
              Last Name:{" "}
              <span className="text-[var(--text-strong)]">{contact.lastName}</span>
            </p>
            <p className="text-[0.95rem] uppercase tracking-[0.2em] text-[var(--text-soft)]">
              Phone Number:{" "}
              <span className="text-[var(--text-strong)]">
                {contact.phoneDisplay}
              </span>
            </p>
          </div>

          <div className="mt-6 h-[2px] w-16 bg-[var(--accent-neon)]" />

          <h1 className="mt-6 text-3xl font-semibold leading-tight text-[var(--text-strong)]">
            Robin Toomey
          </h1>
          <p className="mt-2 text-sm leading-6 text-[var(--text-soft)]">
            Tap below to save the contact and open a pre-filled text message.
          </p>

          <button
            type="button"
            onClick={handleSaveContact}
            className="animate-jiggle mt-7 w-full rounded-2xl border border-[rgba(183,255,44,0.6)] bg-[rgba(183,255,44,0.12)] px-5 py-4 text-base font-semibold uppercase tracking-[0.22em] text-[var(--text-strong)] shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-neon)]"
            aria-label="Save contact and open text message"
          >
            Save Contact
          </button>

          <div className="mt-8 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(15,18,22,0.8)] px-4 py-3 text-xs text-[var(--text-soft)]">
            Works on Android and iOS. If your browser blocks one of the steps,
            tap again after saving.
          </div>

          <footer className="mt-10 text-center text-xs tracking-[0.22em] text-[var(--text-soft)]">
            Built in America, on earth.
            <div className="mt-3 text-[0.7rem] italic tracking-[0.14em] text-[var(--text-soft)]">
              Making relationships built to last, the American Way.
            </div>
          </footer>
        </section>
      </main>
    </div>
  );
}

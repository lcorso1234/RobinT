"use client";

import { useCallback, useState } from "react";

export default function Home() {
  const [showSmsForm, setShowSmsForm] = useState(false);
  const [senderEmail, setSenderEmail] = useState("");
  const [senderPhone, setSenderPhone] = useState("");

  const contact = {
    firstName: "Robin",
    lastName: "Kearns",
    phoneRaw: "7735510684",
    phoneDisplay: "773.551.0684",
    email: "robintoomey@gmail.com",
    title: "Financial Consultant",
  };

  const handleSaveContact = useCallback(() => {
    const vcard = [
      "BEGIN:VCARD",
      "VERSION:3.0",
      `N:${contact.lastName};${contact.firstName};;;`,
      `FN:${contact.firstName} ${contact.lastName}`,
      `TITLE:${contact.title}`,
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

    setShowSmsForm(true);
  }, [contact.firstName, contact.lastName, contact.phoneRaw, contact.email]);

  const handleSendSms = useCallback(
    (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      const safeEmail = senderEmail.trim();
      const safePhone = senderPhone.trim();

      const messageLines = [
        "Hi Robin, I just added you to my network.",
        safeEmail ? `Email: ${safeEmail}` : null,
        safePhone ? `Phone: ${safePhone}` : null,
      ].filter(Boolean);

      const smsBody = encodeURIComponent(messageLines.join("\n"));
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      const smsTarget = contact.phoneRaw;
      const smsUrl = isIOS
        ? `sms:${smsTarget}&body=${smsBody}`
        : `sms:${smsTarget}?body=${smsBody}`;
      window.location.href = smsUrl;
    },
    [senderEmail, senderPhone, contact.phoneRaw]
  );

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
            <p className="text-[0.95rem] uppercase tracking-[0.2em] text-[var(--text-soft)]">
              Title:{" "}
              <span className="text-[var(--text-strong)]">{contact.title}</span>
            </p>
          </div>

          <div className="mt-6 h-[2px] w-16 bg-[var(--accent-neon)]" />

          <h1 className="mt-6 text-3xl font-semibold leading-tight text-[var(--text-strong)]">
            Robin Kearns
          </h1>
          <p className="mt-2 text-xs uppercase tracking-[0.3em] text-[var(--text-soft)]">
            {contact.title}
          </p>
          <p className="mt-3 text-sm leading-6 text-[var(--text-soft)]">
            Tap below to save the contact and open a pre-filled text message.
          </p>

          <button
            type="button"
            onClick={handleSaveContact}
            className="animate-jiggle mt-7 w-full rounded-2xl border border-[var(--accent-neon-60)] bg-[var(--accent-neon-12)] px-5 py-4 text-base font-semibold uppercase tracking-[0.22em] text-[var(--text-strong)] shadow-[0_12px_30px_rgba(0,0,0,0.35)] transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-neon)]"
            aria-label="Save contact and open text message"
          >
            Save Contact
          </button>

          <div className="mt-8 rounded-2xl border border-[rgba(255,255,255,0.06)] bg-[rgba(15,18,22,0.8)] px-4 py-3 text-xs text-[var(--text-soft)]">
            Works on Android and iOS. Save the contact, then confirm a quick
            text with your info.
          </div>

          <footer className="mt-10 text-center text-xs tracking-[0.22em] text-[var(--text-soft)]">
            Built in America, on earth.
            <div className="mt-3 text-[0.7rem] italic tracking-[0.14em] text-[var(--text-soft)]">
              Making relationships built to last, the American Way.
            </div>
          </footer>
        </section>

        {showSmsForm ? (
          <div className="fixed inset-0 z-20 flex items-center justify-center px-5 py-10">
            <div
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
              onClick={() => setShowSmsForm(false)}
            />
            <div className="card-surface card-rim relative z-10 w-full max-w-md rounded-[24px] px-6 py-7">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-soft)]">
                    Send Intro Text
                  </p>
                  <h2 className="mt-2 text-2xl font-semibold text-[var(--text-strong)]">
                    Add your info
                  </h2>
                  <p className="mt-2 text-sm text-[var(--text-soft)]">
                    We will open a pre-filled text message to Robin.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowSmsForm(false)}
                  className="rounded-full border border-[rgba(255,255,255,0.08)] px-3 py-1 text-xs uppercase tracking-[0.2em] text-[var(--text-soft)]"
                >
                  Close
                </button>
              </div>

              <form className="mt-6 space-y-4" onSubmit={handleSendSms}>
                <label className="block text-xs uppercase tracking-[0.25em] text-[var(--text-soft)]">
                  Your Email
                  <input
                    type="email"
                    value={senderEmail}
                    onChange={(event) => setSenderEmail(event.target.value)}
                    placeholder="you@email.com"
                    className="mt-2 w-full rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(15,18,22,0.6)] px-4 py-3 text-sm text-[var(--text-strong)] outline-none focus:border-[var(--accent-neon)]"
                  />
                </label>
                <label className="block text-xs uppercase tracking-[0.25em] text-[var(--text-soft)]">
                  Your Phone
                  <input
                    type="tel"
                    value={senderPhone}
                    onChange={(event) => setSenderPhone(event.target.value)}
                    placeholder="(000) 000-0000"
                    className="mt-2 w-full rounded-xl border border-[rgba(255,255,255,0.1)] bg-[rgba(15,18,22,0.6)] px-4 py-3 text-sm text-[var(--text-strong)] outline-none focus:border-[var(--accent-neon)]"
                  />
                </label>
                <button
                  type="submit"
                  className="w-full rounded-2xl border border-[var(--accent-neon-60)] bg-[var(--accent-neon-18)] px-5 py-4 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--text-strong)] transition-transform duration-200 hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent-neon)]"
                >
                  Open Text Message
                </button>
              </form>
            </div>
          </div>
        ) : null}
      </main>
    </div>
  );
}

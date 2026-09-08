"use client";
import { Suspense, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { ApiBranch, createReservation, ReservationConfirmation } from "@/lib/api";

const TIME_SLOTS = [
  "10:00", "10:30", "11:00", "11:30", "12:00", "12:30", "13:00", "13:30",
  "14:00", "14:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
  "20:00", "20:30", "21:00", "21:30",
];

function todayISO() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

function BookFormInner({ branches }: { branches: ApiBranch[] }) {
  const searchParams = useSearchParams();
  const preselect = searchParams.get("location");
  const locs = branches.length ? branches : [];

  const [location, setLocation] = useState(
    locs.some((l) => l.slug === preselect) ? preselect! : locs[0]?.slug ?? "baneshwor",
  );
  const [date, setDate] = useState(todayISO());
  const [timeSlot, setTimeSlot] = useState("19:00");
  const [partySize, setPartySize] = useState(2);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<ReservationConfirmation | null>(null);

  useEffect(() => {
    if (preselect && locs.some((l) => l.slug === preselect)) {
      setLocation(preselect);
    }
  }, [preselect, locs]);

  const canSubmit =
    name.trim().length >= 2 &&
    /^[+0-9\- ]{7,15}$/.test(phone.trim()) &&
    Boolean(date) &&
    !submitting;

  const loc = useMemo(() => locs.find((l) => l.slug === location), [location, locs]);

  const inputCls =
    "w-full border-b-2 border-rule bg-transparent py-3 font-mono text-sm text-ink outline-none transition placeholder:text-ink-faint/60 focus:border-tomato";
  const labelCls = "font-mono text-[0.55rem] tracking-[0.25em] text-tomato uppercase";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const conf = await createReservation({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim() || undefined,
        location,
        partySize,
        date,
        timeSlot,
        notes: notes.trim() || undefined,
      });
      setConfirmation(conf);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="bg-paper pt-14">
      <div className="mx-auto max-w-[900px] px-4 pb-24 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <p className="font-mono text-[0.6rem] tracking-[0.35em] text-tomato">
            ~ WALK-INS ALWAYS WELCOME · BOOKINGS GET THE BEST SEATS ~
          </p>
          <h1 className="mt-4 font-display text-[clamp(3rem,9vw,7rem)] uppercase leading-[0.92] text-ink">
            Book{" "}
            <em className="font-serif font-light normal-case italic text-tomato">
              a table
            </em>
          </h1>
        </motion.div>

        {confirmation ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mx-auto mt-12 max-w-[520px] border-[1.5px] border-ink bg-cream p-10 text-center shadow-[6px_6px_0_rgba(33,30,25,0.12)]"
          >
            <p className="font-mono text-[0.6rem] tracking-[0.3em] text-tomato">
              ~ TABLE BOOKED ~
            </p>
            <p className="mt-4 font-serif text-3xl font-semibold text-ink">
              {confirmation.bookingCode}
            </p>
            <div className="mx-auto my-6 h-px w-16 bg-rule" />
            <p className="font-sans text-[0.95rem] leading-relaxed text-ink-soft">
              {confirmation.partySize} {confirmation.partySize === 1 ? "guest" : "guests"} ·{" "}
              {confirmation.location} · {new Date(confirmation.date).toLocaleDateString("en-GB", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}{" "}
              at {confirmation.timeSlot}
            </p>
            <p className="mt-4 font-mono text-[0.55rem] tracking-[0.2em] text-ink-faint">
              WE HOLD TABLES FOR 15 MINUTES · SEE YOU SOON
            </p>
            <button
              onClick={() => setConfirmation(null)}
              className="mt-8 rounded-full bg-ink px-8 py-3 font-mono text-[0.62rem] font-bold tracking-[0.2em] text-paper transition hover:bg-tomato"
            >
              BOOK ANOTHER
            </button>
          </motion.div>
        ) : (
          <form onSubmit={submit} className="mx-auto mt-12 max-w-[640px]">
            {/* Location picker */}
            <div className="grid gap-3 sm:grid-cols-3">
              {locs.map((l) => (
                <button
                  type="button"
                  key={l.slug}
                  onClick={() => setLocation(l.slug)}
                  className={`border-[1.5px] p-4 text-left transition ${
                    location === l.slug
                      ? "border-ink bg-ink text-paper"
                      : "border-rule bg-cream text-ink hover:border-ink"
                  }`}
                >
                  <span className="font-display text-lg uppercase leading-none">{l.name}</span>
                  <span
                    className={`mt-1 block font-mono text-[0.5rem] tracking-[0.15em] ${
                      location === l.slug ? "text-paper/60" : "text-ink-faint"
                    }`}
                  >
                    {(l.tagline ?? "").toUpperCase()}
                  </span>
                </button>
              ))}
            </div>

            {/* Date / time / party */}
            <div className="mt-8 grid gap-6 sm:grid-cols-3">
              <div>
                <label className={labelCls}>Date</label>
                <input
                  type="date"
                  min={todayISO()}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className={inputCls}
                  required
                />
              </div>
              <div>
                <label className={labelCls}>Time</label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className={inputCls}
                >
                  {TIME_SLOTS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelCls}>Guests</label>
                <div className="flex items-center gap-4 border-b-2 border-rule py-2">
                  <button
                    type="button"
                    onClick={() => setPartySize(Math.max(1, partySize - 1))}
                    className="text-xl text-tomato"
                  >
                    −
                  </button>
                  <span className="flex-1 text-center font-serif text-xl font-semibold text-ink">
                    {partySize}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPartySize(Math.min(12, partySize + 1))}
                    className="text-xl text-tomato"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Contact */}
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              <div>
                <label className={labelCls}>Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="YOUR NAME"
                  className={inputCls}
                  required
                />
              </div>
              <div>
                <label className={labelCls}>Phone *</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="98XXXXXXXX"
                  className={inputCls}
                  required
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>Email (optional)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="FOR CONFIRMATION"
                  className={inputCls}
                />
              </div>
              <div className="sm:col-span-2">
                <label className={labelCls}>Anything we should know?</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="BIRTHDAY, HIGH CHAIR, QUIET CORNER…"
                  className={`${inputCls} min-h-[60px] resize-y font-sans`}
                />
              </div>
            </div>

            {error && (
              <p className="mt-6 border-[1.5px] border-tomato bg-tomato/5 p-3 font-mono text-[0.65rem] text-tomato">
                ⚠ {error}
              </p>
            )}

            <div className="mt-10 text-center">
              <button
                type="submit"
                disabled={!canSubmit}
                className={`rounded-full px-12 py-4 font-mono text-[0.7rem] font-bold tracking-[0.2em] transition ${
                  canSubmit
                    ? "bg-tomato text-white shadow-[5px_5px_0_var(--ink)] hover:brightness-110"
                    : "cursor-not-allowed bg-rule text-ink-faint"
                }`}
              >
                {submitting ? "HOLDING YOUR TABLE…" : `BOOK ${loc?.name.toUpperCase() ?? ""} →`}
              </button>
              <p className="mt-4 font-mono text-[0.55rem] tracking-[0.15em] text-ink-faint">
                {loc?.seats ? `${loc.seats} SEATS · ` : ""}KITCHEN TAKES ORDERS UNTIL {loc?.hours?.split("–")[1]?.trim() ?? "22:00"}
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default function BookForm({ branches }: { branches: ApiBranch[] }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[60vh] items-center justify-center font-mono text-xs tracking-[0.25em] text-ink-faint">
          SETTING THE TABLE…
        </div>
      }
    >
      <BookFormInner branches={branches} />
    </Suspense>
  );
}
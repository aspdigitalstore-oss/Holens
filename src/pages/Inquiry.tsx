import { useState } from "react";
import { Navigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { useInquiry } from "@/lib/inquiry";
import { Seo } from "@/lib/seo";

export default function Inquiry() {
  const { items, totalUnits, hasMinimum, updateQuantity, removeItem, clearInquiry } = useInquiry();
  const [submitted, setSubmitted] = useState(false);
  const [details, setDetails] = useState({
    companyName: "",
    contactPerson: "",
    businessEmail: "",
    country: "",
    phoneNumber: "",
    distributorType: "",
    estimatedMonthlyVolume: "",
    paymentPreference: "Bank Transfer",
    notes: "",
  });

  if (items.length === 0 && !submitted) {
    return <Navigate to="/brands" replace />;
  }

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const payload = {
      items,
      totalUnits,
      details,
      submittedAt: new Date().toISOString(),
    } as any;

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error((await res.json()).error || 'Failed to submit');

      setSubmitted(true);
      clearInquiry();
    } catch (err: any) {
      console.error(err);
      setError(err?.message || 'Server error');
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <div className="mx-auto max-w-[900px] p-10">
        <CheckCircle2 className="h-10 w-10 text-lime-dim" />
        <h2 className="mt-4 font-display text-3xl">Thank you for your bulk inquiry.</h2>
        <p className="mt-2 text-muted-foreground">Our international supply team will review your request and send you an official quotation/invoice shortly.</p>
      </div>
    );
  }

  return (
    <>
      <Seo title="Request Bulk Quote — Vitala Global" description="Submit your bulk inquiry for enterprise pricing and distribution." />
      <div className="mx-auto max-w-[1100px] px-6 py-20">
        <h1 className="font-display text-4xl">Request Bulk Quote</h1>
        <p className="mt-3 text-muted-foreground">Minimum Order Quantity (MOQ): 200 units total. You may mix across brands and products.</p>

        <div className="mt-8 grid gap-8 lg:grid-cols-2">
          <div>
            <h3 className="font-display text-2xl">Your inquiry</h3>
            <div className="mt-4 space-y-3">
              {items.map((it) => (
                <div key={it.id} className="flex items-center justify-between gap-4 rounded-md border p-4">
                  <div>
                    <div className="font-semibold">{it.brandName}</div>
                    <div className="text-sm text-muted-foreground">{it.productName}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input type="number" value={it.quantity} min={1} onChange={(e) => updateQuantity(it.id, Number(e.target.value))} className="input w-24" />
                    <button onClick={() => removeItem(it.id)} className="text-sm text-destructive">Remove</button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6">
              <div className="flex items-center justify-between">
                <div className="text-sm">Total units</div>
                <div className="font-semibold">{totalUnits}</div>
              </div>
              {!hasMinimum && <div className="mt-2 text-sm text-destructive">Minimum total of 200 units required to submit an inquiry.</div>}
            </div>
          </div>

          <form onSubmit={onSubmit} className="rounded-md border p-6">
            <h3 className="font-display text-2xl">Company details</h3>
            <div className="mt-4 grid gap-4">
              <input required placeholder="Company Name" className="input" value={details.companyName} onChange={(e) => setDetails((d) => ({ ...d, companyName: e.target.value }))} />
              <input required placeholder="Contact Person" className="input" value={details.contactPerson} onChange={(e) => setDetails((d) => ({ ...d, contactPerson: e.target.value }))} />
              <input required type="email" placeholder="Business Email" className="input" value={details.businessEmail} onChange={(e) => setDetails((d) => ({ ...d, businessEmail: e.target.value }))} />
              <input required placeholder="Country" className="input" value={details.country} onChange={(e) => setDetails((d) => ({ ...d, country: e.target.value }))} />
              <input required placeholder="Phone Number" className="input" value={details.phoneNumber} onChange={(e) => setDetails((d) => ({ ...d, phoneNumber: e.target.value }))} />
              <input required placeholder="Distributor Type" className="input" value={details.distributorType} onChange={(e) => setDetails((d) => ({ ...d, distributorType: e.target.value }))} />
              <input required placeholder="Estimated Monthly Volume" className="input" value={details.estimatedMonthlyVolume} onChange={(e) => setDetails((d) => ({ ...d, estimatedMonthlyVolume: e.target.value }))} />

              <label className="mt-2 text-sm">Preferred payment method (for quoting purposes only)</label>
              <select value={details.paymentPreference} onChange={(e) => setDetails((d) => ({ ...d, paymentPreference: e.target.value }))} className="input">
                <option>Bank Transfer</option>
                <option>Crypto Currency</option>
                <option>Card Payment</option>
              </select>

              <textarea placeholder="Additional notes" className="input min-h-[120px]" value={details.notes} onChange={(e) => setDetails((d) => ({ ...d, notes: e.target.value }))} />

              <div className="flex items-center gap-3">
                <button disabled={!hasMinimum || loading} type="submit" className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white hover:bg-ink/85">
                  {loading ? 'Submitting…' : 'Submit inquiry'}
                </button>
                <a href="/contact" className="inline-flex items-center gap-2 rounded-full border border-ink/20 px-4 py-2 text-sm font-medium text-ink hover:bg-ink hover:text-white">Contact sales</a>
              </div>
              {error && <div className="mt-2 text-sm text-destructive">{error}</div>}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

import { useState } from "react";
import { Navigate } from "react-router-dom";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { useInquiry } from "@/lib/inquiry";
import { Seo } from "@/lib/seo";
import { 
  createAccount, 
  validateCompanyDetails,
  DISTRIBUTOR_TYPES,
  VOLUME_RANGES,
  getAccountFromStorage 
} from "@/lib/account";

export default function Inquiry() {
  const { items, totalUnits, hasMinimum, updateQuantity, removeItem, clearInquiry } = useInquiry();
  const [submitted, setSubmitted] = useState(false);
  const [step, setStep] = useState<"account" | "details">("account");
  const existingAccount = getAccountFromStorage();
  
  const [accountErrors, setAccountErrors] = useState<string[]>([]);
  const [details, setDetails] = useState({
    companyName: existingAccount?.company.companyName || "",
    contactPerson: existingAccount?.company.contactPerson || "",
    businessEmail: existingAccount?.company.businessEmail || "",
    country: existingAccount?.company.country || "",
    phoneNumber: existingAccount?.company.phoneNumber || "",
    distributorType: existingAccount?.company.distributorType || "",
    estimatedMonthlyVolume: existingAccount?.company.estimatedMonthlyVolume || "",
    paymentPreference: "Bank Transfer",
    notes: "",
  });

  if (items.length === 0 && !submitted) {
    return <Navigate to="/brands" replace />;
  }

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle account creation/login step
  const handleAccountStep = (e: React.FormEvent) => {
    e.preventDefault();
    setAccountErrors([]);

    const validation = validateCompanyDetails({
      companyName: details.companyName,
      contactPerson: details.contactPerson,
      businessEmail: details.businessEmail,
      country: details.country,
      phoneNumber: details.phoneNumber,
      distributorType: details.distributorType,
      estimatedMonthlyVolume: details.estimatedMonthlyVolume,
    });

    if (!validation.valid) {
      setAccountErrors(validation.errors);
      return;
    }

    // Create account
    try {
      createAccount({
        companyName: details.companyName,
        contactPerson: details.contactPerson,
        businessEmail: details.businessEmail,
        country: details.country,
        phoneNumber: details.phoneNumber,
        distributorType: details.distributorType,
        estimatedMonthlyVolume: details.estimatedMonthlyVolume,
      });
      setStep("details");
    } catch (err: any) {
      setAccountErrors([err.message]);
    }
  };

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
        <h2 className="mt-4 font-display text-3xl">Thank you for your B2B inquiry.</h2>
        <p className="mt-2 text-muted-foreground">
          We've received your inquiry for <strong>{totalUnits} units</strong> of Haleon healthcare products.
        </p>
        <p className="mt-4 text-muted-foreground">
          Our supply team will review your request and send you an official quotation and invoice to <strong>{details.businessEmail}</strong> within 24-48 hours.
        </p>
        <p className="mt-4 text-sm text-muted-foreground">
          Once we send the invoice, you can arrange payment via your preferred method ({details.paymentPreference}).
        </p>
        <a href="/brands" className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white hover:bg-ink/85">
          Continue browsing products
        </a>
      </div>
    );
  }

  return (
    <>
      <Seo title="B2B Inquiry — Haleon Healthcare Wholesale" description="Submit your bulk inquiry for Haleon healthcare products. Minimum order: 200 units (mixed brands allowed)." />
      <div className="mx-auto max-w-[1100px] px-6 py-20">
        <h1 className="font-display text-4xl">B2B Bulk Inquiry</h1>
        <p className="mt-3 text-muted-foreground">
          Minimum Order Quantity (MOQ): <strong>200 units total</strong>. You may mix across any Haleon brands and products.
        </p>

        {step === "account" ? (
          <div className="mt-8 max-w-2xl">
            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4 mb-8">
              <h3 className="font-semibold text-blue-900">Step 1: Create or Use Your B2B Account</h3>
              <p className="mt-1 text-sm text-blue-800">
                We'll use this information to send your quotation and invoice.
              </p>
            </div>

            <form onSubmit={handleAccountStep} className="space-y-6">
              <div className="grid gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Company Name *</label>
                  <input
                    required
                    type="text"
                    placeholder="e.g., Pharma Distributors Ltd"
                    className="input w-full"
                    value={details.companyName}
                    onChange={(e) => setDetails((d) => ({ ...d, companyName: e.target.value }))}
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Contact Person *</label>
                  <input
                    required
                    type="text"
                    placeholder="Full name"
                    className="input w-full"
                    value={details.contactPerson}
                    onChange={(e) => setDetails((d) => ({ ...d, contactPerson: e.target.value }))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Business Email *</label>
                  <input
                    required
                    type="email"
                    placeholder="name@company.com"
                    className="input w-full"
                    value={details.businessEmail}
                    onChange={(e) => setDetails((d) => ({ ...d, businessEmail: e.target.value }))}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">Phone Number *</label>
                    <input
                      required
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      className="input w-full"
                      value={details.phoneNumber}
                      onChange={(e) => setDetails((d) => ({ ...d, phoneNumber: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Country *</label>
                    <input
                      required
                      type="text"
                      placeholder="e.g., United States"
                      className="input w-full"
                      value={details.country}
                      onChange={(e) => setDetails((d) => ({ ...d, country: e.target.value }))}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Distributor Type *</label>
                  <select
                    required
                    className="input w-full"
                    value={details.distributorType}
                    onChange={(e) => setDetails((d) => ({ ...d, distributorType: e.target.value }))}
                  >
                    <option value="">Select distributor type</option>
                    {DISTRIBUTOR_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Estimated Monthly Volume *</label>
                  <select
                    required
                    className="input w-full"
                    value={details.estimatedMonthlyVolume}
                    onChange={(e) => setDetails((d) => ({ ...d, estimatedMonthlyVolume: e.target.value }))}
                  >
                    <option value="">Select volume range</option>
                    {VOLUME_RANGES.map((range) => (
                      <option key={range} value={range}>
                        {range}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {accountErrors.length > 0 && (
                <div className="rounded-md bg-red-50 p-4 border border-red-200">
                  <div className="flex gap-3">
                    <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-red-800">
                      {accountErrors.map((err, i) => (
                        <div key={i}>{err}</div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white hover:bg-ink/85"
              >
                Continue to Order Details
              </button>
            </form>
          </div>
        ) : (
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div>
              <h3 className="font-display text-2xl">Your Inquiry</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Minimum mixed order: 200 units | Current: <strong>{totalUnits} units</strong>
              </p>
              <div className="mt-4 space-y-3">
                {items.map((it) => (
                  <div key={it.id} className="flex items-center justify-between gap-4 rounded-md border p-4 bg-gray-50">
                    <div>
                      <div className="font-semibold">{it.brandName}</div>
                      <div className="text-sm text-muted-foreground">{it.productName}</div>
                    </div>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        value={it.quantity}
                        min={1}
                        onChange={(e) => updateQuantity(it.id, Number(e.target.value))}
                        className="input w-24"
                      />
                      <button onClick={() => removeItem(it.id)} className="text-sm text-destructive">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 rounded-md border p-4 bg-amber-50 border-amber-200">
                <div className="flex items-center gap-2">
                  <div className="text-sm">
                    <div className="font-semibold text-amber-900">Total Units</div>
                    <div className="text-2xl font-bold text-amber-900 mt-1">{totalUnits}</div>
                  </div>
                </div>
                {!hasMinimum && (
                  <div className="mt-3 text-sm text-amber-800">
                    ⚠ Need {200 - totalUnits} more units to meet minimum order requirement.
                  </div>
                )}
              </div>
            </div>

            <form onSubmit={onSubmit} className="rounded-md border p-6 h-fit sticky top-6">
              <h3 className="font-display text-2xl">Confirm & Submit</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Sending to: <strong>{details.businessEmail}</strong>
              </p>
              
              <div className="mt-6 space-y-4 border-t pt-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Payment Method *</label>
                  <select
                    value={details.paymentPreference}
                    onChange={(e) => setDetails((d) => ({ ...d, paymentPreference: e.target.value }))}
                    className="input w-full"
                  >
                    <option>Bank Transfer</option>
                    <option>Crypto Currency</option>
                    <option>Card Payment</option>
                  </select>
                  <p className="mt-2 text-xs text-muted-foreground">
                    This is just your preference. We'll send you a formal quotation and invoice after review.
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Additional Notes (Optional)</label>
                  <textarea
                    placeholder="Any special requests, delivery instructions, or other information..."
                    className="input w-full min-h-[100px]"
                    value={details.notes}
                    onChange={(e) => setDetails((d) => ({ ...d, notes: e.target.value }))}
                  />
                </div>
              </div>

              <button
                disabled={!hasMinimum || loading}
                type="submit"
                className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white hover:bg-ink/85 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                {loading ? "Submitting Inquiry…" : "Submit Inquiry"}
              </button>

              {error && (
                <div className="mt-3 rounded-md bg-red-50 p-3 border border-red-200">
                  <div className="text-sm text-red-800 flex gap-2">
                    <AlertCircle className="h-4 w-4 flex-shrink-0 mt-0.5" />
                    {error}
                  </div>
                </div>
              )}

              <button
                type="button"
                onClick={() => setStep("account")}
                className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-full border border-ink/20 px-4 py-2 text-sm font-medium text-ink hover:bg-ink hover:text-white"
              >
                Back to Account Info
              </button>
            </form>
          </div>
        )}
      </div>
    </>
  );
}

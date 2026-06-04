import { useState, type FormEvent, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { AlertCircle, CheckCircle2 } from "lucide-react";
import { getAccountFromStorage, type Account, BUSINESS_TYPES } from "@/lib/account";
import AccountModal from "@/components/site/AccountModal";
import { COMPANY } from "@/lib/company";
import { useInquiry, type InquiryDetails, type InquiryPayload } from "@/lib/inquiry";
import { saveInquiryRecord } from "@/lib/inquiry-storage";
import { MIN_ORDER_QUANTITY, MOQ_NOTICE } from "@/lib/moq";
import { MOQNotice, WholesaleNotice } from "@/components/site/WholesaleNotice";
import { Seo } from "@/lib/seo";



const EMPTY_DETAILS: InquiryDetails = {
  companyName: "",
  contactPerson: "",
  email: "",
  phoneNumber: "",
  country: "",
  businessType: "",
  notes: "",
};

function detailsFromAccount(account: Account | null): InquiryDetails {
  return account ? { ...account.company, notes: "" } : EMPTY_DETAILS;
}

export default function Checkout() {
  const { items, totalUnits, hasMinimum, clearInquiry } = useInquiry();
  const [account, setAccount] = useState<Account | null>(() => getAccountFromStorage());
  const [details, setDetails] = useState<InquiryDetails>(() => detailsFromAccount(account));
  const [loading, setLoading] = useState(false);
  const [accountModalOpen, setAccountModalOpen] = useState(!account);
  const [error, setError] = useState<string | null>(null);
  const [reference, setReference] = useState<string | null>(null);

  useEffect(() => {
    if (!account) {
      setAccountModalOpen(true);
    }
  }, []);

  if ((!items.length || !hasMinimum) && !reference) return <Navigate to="/cart" replace />;

  function updateDetail<Key extends keyof InquiryDetails>(key: Key, value: InquiryDetails[Key]) {
    setDetails((current) => ({ ...current, [key]: value }));
  }

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    // login is handled in the modal; keep this for compatibility but open modal if called
    setError(null);
    setAccountModalOpen(true);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);

    if (!details.notes.trim()) {
      setError("Please add notes about your product, market or delivery requirements.");
      return;
    }

    setLoading(true);
    try {
      if (!account) {
        // require account creation/login via modal
        setAccountModalOpen(true);
        setLoading(false);
        return;
      }

      const payload: InquiryPayload = {
        items,
        totalUnits,
        details,
        submittedAt: new Date().toISOString(),
        accountId: account.id,
      };

      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(activeAccount?.sessionToken
            ? { Authorization: `Bearer ${activeAccount.sessionToken}` }
            : {}),
        },
        body: JSON.stringify(payload),
      });
      const data = (await response.json()) as { error?: string; reference?: string };
      if (!response.ok || !data.reference)
        throw new Error(data.error || "Unable to submit your inquiry.");

      saveInquiryRecord(payload);
      setReference(data.reference);
      clearInquiry();
    } catch (submissionError) {
      setError(
        submissionError instanceof Error
          ? submissionError.message
          : "Unable to submit your inquiry.",
      );
    } finally {
      setLoading(false);
    }
  }

  if (reference) {
    return (
      <section className="bg-bone pb-24 pt-24 lg:pt-32">
        <div className="mx-auto max-w-[760px] px-6 lg:px-10">
          <div className="rounded-md border border-black/10 bg-white p-8 md:p-12" role="status">
            <CheckCircle2 className="h-10 w-10 text-lime-dim" aria-hidden="true" />
            <p className="mt-6 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Inquiry Received
            </p>
            <h1 className="mt-3 font-display text-5xl">Thank you for your wholesale inquiry.</h1>
            <p className="mt-5 leading-7 text-muted-foreground">
              Your inquiry reference is <strong className="text-ink">{reference}</strong>. We have
              sent a confirmation email to <strong className="text-ink">{details.email}</strong>.
            </p>
            <p className="mt-4 leading-7 text-muted-foreground">
              Our partnership team will review your requested products, quantities and market
              requirements before contacting you {COMPANY.responseTime}.
            </p>
            <div className="mt-8 rounded-md bg-bone p-5 text-sm leading-6 text-muted-foreground">
              <strong className="text-ink">{COMPANY.name}</strong>
              <br />
              {COMPANY.email}
              <br />
              {COMPANY.addressLine1}, {COMPANY.addressLine2}
            </div>
            <Link
              to="/brands"
              className="mt-8 inline-flex rounded-full bg-ink px-6 py-3 text-sm font-medium text-white"
            >
              Continue browsing brands
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <>
      <Seo
        title="Submit Wholesale Inquiry | Vitala Global Holdings"
        description="Complete your Vitala Global Holdings wholesale inquiry. No direct online payment is required; an invoice will follow after review."
        noIndex
      />
      <section className="bg-bone pb-16 pt-24 lg:pt-32">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Wholesale checkout form
          </p>
          <h1 className="mt-4 font-display text-6xl leading-[0.95] md:text-7xl">
            Submit your business inquiry.
          </h1>
          <p className="mt-6 max-w-2xl leading-7 text-muted-foreground">
            No direct payment gateway is used. We review your inquiry and contact you with
            availability and commercial terms.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 lg:py-20">
        <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
          <div className="grid gap-4 md:grid-cols-2">
            <WholesaleNotice compact />
            <MOQNotice compact />
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-12">
            <form onSubmit={handleSubmit} className="space-y-8 lg:col-span-8">
              <section className="rounded-md border border-black/10 p-6 md:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">Account</p>
                    <h2 className="mt-2 font-display text-3xl">Create an account or log in</h2>
                    <p className="mt-2 text-sm text-muted-foreground">We require a business account to submit wholesale inquiries. Use the popup to create or log in.</p>
                  </div>
                  {account && (
                    <span className="rounded-full bg-lime/20 px-3 py-1 text-xs font-medium">Logged in: {account.company.email}</span>
                  )}
                </div>

                {!account && (
                  <div className="mt-6">
                    <p className="text-sm text-muted-foreground">The account dialog should be open above. If not, click the button below.</p>
                    <button type="button" onClick={() => setAccountModalOpen(true)} className="mt-3 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2 text-sm font-medium text-white">
                      Open account dialog
                    </button>
                  </div>
                )}
              </section>

              <section className="rounded-md border border-black/10 p-6 md:p-8">
                <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                  Required business details
                </p>
                <h2 className="mt-2 font-display text-3xl">Tell us who we are quoting.</h2>
                <div className="mt-6 grid gap-5 md:grid-cols-2">
                  <Field label="Company Name">
                    <input
                      required
                      value={details.companyName}
                      onChange={(event) => updateDetail("companyName", event.target.value)}
                      className="input"
                      autoComplete="organization"
                    />
                  </Field>
                  <Field label="Contact Person">
                    <input
                      required
                      value={details.contactPerson}
                      onChange={(event) => updateDetail("contactPerson", event.target.value)}
                      className="input"
                      autoComplete="name"
                    />
                  </Field>
                  <Field label="Email">
                    <input
                      type="email"
                      required
                      value={details.email}
                      onChange={(event) => updateDetail("email", event.target.value)}
                      className="input"
                      autoComplete="email"
                    />
                  </Field>
                  <Field label="Phone Number">
                    <input
                      type="tel"
                      required
                      value={details.phoneNumber}
                      onChange={(event) => updateDetail("phoneNumber", event.target.value)}
                      className="input"
                      autoComplete="tel"
                    />
                  </Field>
                  <Field label="Country">
                    <input
                      required
                      value={details.country}
                      onChange={(event) => updateDetail("country", event.target.value)}
                      className="input"
                      autoComplete="country-name"
                    />
                  </Field>
                  <Field label="Business Type">
                    <select
                      required
                      value={details.businessType}
                      onChange={(event) => updateDetail("businessType", event.target.value)}
                      className="input"
                    >
                      <option value="">Select business type</option>
                      {BUSINESS_TYPES.map((type) => (
                        <option key={type}>{type}</option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Notes" className="md:col-span-2">
                    <textarea
                      required
                      value={details.notes}
                      onChange={(event) => updateDetail("notes", event.target.value)}
                      className="input min-h-[140px]"
                      placeholder="Share your target market, preferred products, delivery requirements or private label goals."
                    />
                  </Field>
                </div>
              </section>

              {error && (
                <div
                  className="flex gap-3 rounded-md border border-red-200 bg-red-50 p-4 text-sm text-red-800"
                  role="alert"
                >
                  <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                  {error}
                </div>
              )}

              <button
                disabled={loading || !account}
                type="submit"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-7 py-3 text-sm font-medium text-white hover:bg-ink/85 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? "Submitting inquiry..." : "Submit Inquiry"}
              </button>
            </form>

            <aside className="h-fit rounded-md border border-black/10 bg-bone p-6 lg:col-span-4 lg:sticky lg:top-28">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                Inquiry summary
              </p>
              <p className="mt-4 font-display text-4xl">{totalUnits.toLocaleString()} units</p>
              <p className="mt-2 text-xs leading-5 text-muted-foreground">{MOQ_NOTICE}</p>
              <div className="mt-6 space-y-4 border-t border-black/10 pt-5">
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between gap-4 text-sm">
                    <span>
                      {item.brandName} / {item.productName}
                    </span>
                    <strong>{item.quantity.toLocaleString()}</strong>
                  </div>
                ))}
              </div>
              <p className="mt-6 border-t border-black/10 pt-5 text-xs leading-5 text-muted-foreground">
                Minimum required: {MIN_ORDER_QUANTITY.toLocaleString()} units. This checkout submits
                an inquiry only; no payment is collected.
              </p>
              <Link to="/cart" className="mt-5 block text-sm font-medium hover:underline">
                Back to inquiry cart
              </Link>
            </aside>
          </div>
        </div>
      </section>
      <AccountModal
        open={accountModalOpen}
        setOpen={setAccountModalOpen}
        initialMode="create"
        onAuthenticated={(acct) => {
          setAccount(acct);
          setDetails(detailsFromAccount(acct));
        }}
      />
    </>
  );
}

function Field({
  label,
  children,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block text-sm font-medium ${className}`}>
      {label} *<div className="mt-1">{children}</div>
    </label>
  );
}

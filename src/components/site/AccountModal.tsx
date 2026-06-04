import { useState, type FormEvent, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { LogIn, UserPlus } from "lucide-react";
import { BUSINESS_TYPES, type Account } from "@/lib/account";

export default function AccountModal({
  open,
  setOpen,
  initialMode = "create",
  onAuthenticated,
}: {
  open: boolean;
  setOpen: (v: boolean) => void;
  initialMode?: "create" | "login";
  onAuthenticated?: (account: Account) => void;
}) {
  const [mode, setMode] = useState<"create" | "login">(initialMode);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // create fields (simplified - company details filled in checkout)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [country, setCountry] = useState("");
  const [businessType, setBusinessType] = useState("");

  // login fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  useEffect(() => setMode(initialMode), [initialMode, open]);

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      // Simplified account creation - company details will be filled in checkout
      const response = await fetch("/api/accounts/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          details: {
            companyName: "Pending",
            contactPerson: "Pending",
            email,
            phoneNumber: "Pending",
            country,
            businessType,
          },
          password,
        }),
      });
      const data = (await response.json()) as { error?: string; account?: Account };
      if (!response.ok) throw new Error(data.error || "Unable to create account.");
      if (!data.account) throw new Error("Account response was incomplete.");

      setOpen(false);
      onAuthenticated?.(data.account);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const response = await fetch("/api/accounts/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: loginEmail,
          password: loginPassword,
        }),
      });
      const data = (await response.json()) as { error?: string; account?: Account };
      if (!response.ok) throw new Error(data.error || "Unable to log in.");
      if (!data.account) throw new Error("Account response was incomplete.");

      setOpen(false);
      onAuthenticated?.(data.account);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{mode === "create" ? "Create an account" : "Log in to your account"}</DialogTitle>
          <DialogDescription>
            {mode === "create"
              ? "Create a business account to start your wholesale inquiry. Complete your company details at checkout."
              : "Log in to continue to checkout and manage your inquiries."}
          </DialogDescription>
        </DialogHeader>

        {error && <div className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>}

        {mode === "create" ? (
          <form onSubmit={handleCreate} className="mt-4 space-y-4">
            <label className="block">
              <span className="text-sm font-medium">Business Email</span>
              <input required type="email" placeholder="you@company.com" value={email} onChange={(e) => setEmail(e.target.value)} className="input w-full mt-1" />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Password</span>
              <input required type="password" placeholder="Min 8 characters" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className="input w-full mt-1" />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Country</span>
              <input required placeholder="e.g., USA" value={country} onChange={(e) => setCountry(e.target.value)} className="input w-full mt-1" />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Business Type</span>
              <select required value={businessType} onChange={(e) => setBusinessType(e.target.value)} className="input w-full mt-1">
                <option value="">Select business type</option>
                {BUSINESS_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </label>
            <div className="flex items-center gap-3">
              <button disabled={loading} type="submit" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2 text-sm font-medium text-white">
                <UserPlus className="h-4 w-4" />
                {loading ? "Creating..." : "Create account"}
              </button>
              <button type="button" onClick={() => setMode("login")} className="text-sm underline">
                Already have an account? Log in
              </button>
            </div>
          </form>
        ) : (
          <form onSubmit={handleLogin} className="mt-4 space-y-4">
            <label className="block">
              <span className="text-sm font-medium">Business Email</span>
              <input required type="email" placeholder="you@company.com" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="input w-full mt-1" />
            </label>
            <label className="block">
              <span className="text-sm font-medium">Password</span>
              <input required type="password" placeholder="Your password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="input w-full mt-1" />
            </label>
            <div className="flex items-center gap-3">
              <button disabled={loading} type="submit" className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2 text-sm font-medium text-white">
                <LogIn className="h-4 w-4" />
                {loading ? "Logging in..." : "Log in"}
              </button>
              <button type="button" onClick={() => setMode("create")} className="text-sm underline">
                Create an account
              </button>
            </div>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

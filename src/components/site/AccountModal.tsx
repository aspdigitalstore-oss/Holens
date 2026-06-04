import { useState, type FormEvent, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { LogIn, UserPlus } from "lucide-react";
import { BUSINESS_TYPES, createAccount, loginAccount, type Account } from "@/lib/account";

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

  // create fields
  const [companyName, setCompanyName] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [country, setCountry] = useState("");
  const [businessType, setBusinessType] = useState("");
  const [password, setPassword] = useState("");

  // login fields
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  useEffect(() => setMode(initialMode), [initialMode, open]);

  async function handleCreate(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const account = await createAccount(
        {
          companyName,
          contactPerson,
          email,
          phoneNumber,
          country,
          businessType,
        },
        password,
      );
      setOpen(false);
      onAuthenticated?.(account);
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
      const account = await loginAccount(loginEmail, loginPassword);
      setOpen(false);
      onAuthenticated?.(account);
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
              ? "Create a business account to submit wholesale inquiries and view your submissions."
              : "Log in to continue to checkout and manage your inquiries."}
          </DialogDescription>
        </DialogHeader>

        {error && <div className="mt-4 rounded-md bg-red-50 p-3 text-sm text-red-700">{error}</div>}

        {mode === "create" ? (
          <form onSubmit={handleCreate} className="mt-4 space-y-4">
            <input required placeholder="Company name" value={companyName} onChange={(e) => setCompanyName(e.target.value)} className="input w-full" />
            <input required placeholder="Contact person" value={contactPerson} onChange={(e) => setContactPerson(e.target.value)} className="input w-full" />
            <input required type="email" placeholder="Business email" value={email} onChange={(e) => setEmail(e.target.value)} className="input w-full" />
            <input required placeholder="Phone number" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="input w-full" />
            <input required placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} className="input w-full" />
            <select required value={businessType} onChange={(e) => setBusinessType(e.target.value)} className="input w-full">
              <option value="">Select business type</option>
              {BUSINESS_TYPES.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
            <input required type="password" placeholder="Password (min 8 chars)" value={password} onChange={(e) => setPassword(e.target.value)} className="input w-full" />
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
            <input required type="email" placeholder="Business email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} className="input w-full" />
            <input required type="password" placeholder="Password" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} className="input w-full" />
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

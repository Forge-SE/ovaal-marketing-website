"use client";

import { Input } from "@base-ui/react/input";
import { Select } from "@base-ui/react/select";
import { useFormik } from "formik";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import * as yup from "yup";
import { LoadingButton } from "@/components/forms/loading-button";
import { InternationalPhoneInput } from "@/components/forms/phone-input";
import { HoverFill } from "@/components/marketing/hover-fill";
import { isPossiblePhoneNumber } from "libphonenumber-js/min";

const regions = ["Greater Accra", "Ashanti", "Western", "Western North", "Central", "Eastern", "Volta", "Oti", "Northern", "Savannah", "North East", "Upper East", "Upper West", "Bono", "Bono East", "Ahafo"];
const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"] as const;
const dayLabels: Record<string, string> = { monday: "Monday", tuesday: "Tuesday", wednesday: "Wednesday", thursday: "Thursday", friday: "Friday", saturday: "Saturday", sunday: "Sunday" };
const controlClass = "min-h-13 w-full rounded-full border border-primary-foreground/15 bg-white px-5 py-3 text-[15px] text-primary-foreground outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-primary-foreground/35 focus-visible:border-primary-foreground focus-visible:ring-2 focus-visible:ring-primary/60 aria-invalid:border-red-700";
const steps = ["Restaurant", "Admin", "Compliance"];

const hours = weekdays.map(day => ({ day, closed: day === "sunday", opens: "09:00", closes: "22:00" }));

const schema = yup.object({
  restaurantName: yup.string().trim().min(2, "Enter the restaurant name.").max(160).required("Enter the restaurant name."),
  description: yup.string().trim().max(800, "Keep the description under 800 characters."),
  slug: yup.string().matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers, and single hyphens.").required("Use lowercase letters, numbers, and single hyphens."),
  address: yup.string().trim().min(4, "Enter the street address.").max(255).required("Enter the street address."),
  city: yup.string().trim().min(2, "Enter the city or town.").max(120).required("Enter the city or town."),
  region: yup.string().oneOf(regions).required("Choose a region."),
  defaultDiningType: yup.string().oneOf(["TAKEAWAY", "DINE_IN"]).required(),
  openingHours: yup.array().test("hours", "Keep at least one day open, and make sure closing is later than opening.", value => {
    if (!Array.isArray(value) || value.length === 0) return false;
    const open = value.filter(entry => entry && !entry.closed);
    if (open.length === 0) return false;
    return open.every(entry => /^\d{2}:\d{2}$/.test(entry.opens) && /^\d{2}:\d{2}$/.test(entry.closes) && entry.opens < entry.closes);
  }),
  fullName: yup.string().trim().min(2, "Enter the admin’s name.").max(160).required("Enter the admin’s name."),
  email: yup.string().trim().email("Enter a valid email address.").max(254).required("Enter your email address."),
  phone: yup.string().trim().required("Enter your phone number.").test("phone", "Enter a valid phone number for the selected country.", value => !!value && value.startsWith("+") && isPossiblePhoneNumber(value)),
  ownerPin: yup.string().matches(/^\d{4}$/, "Enter a four-digit PIN.").required("Enter a four-digit PIN."),
  confirmOwnerPin: yup.string().required("The PINs do not match.").oneOf([yup.ref("ownerPin")], "The PINs do not match."),
  businessRegistrationNumber: yup.string().trim().max(80),
  tin: yup.string().trim().max(40),
  foodHygienePermit: yup.string().trim().max(80),
  districtAssemblyPermit: yup.string().trim().max(80),
  complianceNotes: yup.string().trim().max(800),
});

const initialValues = {
  restaurantName: "", description: "", slug: "", address: "", city: "", region: "",
  defaultDiningType: "TAKEAWAY", openingHours: hours,
  fullName: "", email: "", phone: "", ownerPin: "", confirmOwnerPin: "",
  businessRegistrationNumber: "", tin: "", foodHygienePermit: "", districtAssemblyPermit: "", complianceNotes: "",
};

function slugFrom(value: string) {
  return value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
}

export function PartnerForm({ initialCode = "" }: { initialCode?: string }) {
  const [code, setCode] = useState(initialCode);
  const [unlocked, setUnlocked] = useState("");
  const [checking, setChecking] = useState(false);
  const [codeError, setCodeError] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [slugEdited, setSlugEdited] = useState(false);
  const [complete, setComplete] = useState(false);
  const formik = useFormik({
    initialValues,
    validationSchema: schema,
    onSubmit: async (values, helpers) => {
      helpers.setStatus(undefined);
      const compliance = {
        businessRegistrationNumber: values.businessRegistrationNumber.trim() || null,
        tin: values.tin.trim() || null,
        foodHygienePermit: values.foodHygienePermit.trim() || null,
        districtAssemblyPermit: values.districtAssemblyPermit.trim() || null,
        notes: values.complianceNotes.trim() || null,
      };
      try {
        const response = await fetch("/api/partner/apply", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code: unlocked,
            restaurantName: values.restaurantName,
            description: values.description,
            slug: values.slug,
            address: values.address,
            city: values.city,
            region: values.region,
            defaultDiningType: values.defaultDiningType,
            openingHours: values.openingHours.map(row => ({
              day: row.day,
              closed: row.closed,
              opens: row.closed ? null : row.opens,
              closes: row.closed ? null : row.closes,
            })),
            fullName: values.fullName,
            email: values.email,
            phone: values.phone,
            ownerPin: values.ownerPin,
            compliance: Object.values(compliance).some(Boolean) ? compliance : null,
          }),
        });
        const result = await response.json();
        if (!response.ok || !result.ok) {
          helpers.setStatus(result.error || "We couldn’t send your application. Please try again.");
          return;
        }
        setComplete(true);
      } catch {
        helpers.setStatus("We couldn’t confirm your application. Please check your connection and try again.");
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  async function unlock(event: React.FormEvent) {
    event.preventDefault();
    setChecking(true);
    setCodeError(null);
    try {
      const response = await fetch("/api/partner/claim", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const result = await response.json();
      if (!response.ok) {
        setCodeError(result.error || "That partner code is not valid.");
        return;
      }
      if (result.alreadySubmitted) {
        setCodeError("An application for this code is already with the Ovaal team.");
        return;
      }
      setUnlocked(code.trim());
    } catch {
      setCodeError("We couldn’t check that code. Please try again.");
    } finally {
      setChecking(false);
    }
  }

  const stepFields: Record<number, string[]> = {
    0: ["restaurantName", "description", "slug", "address", "city", "region", "defaultDiningType", "openingHours"],
    1: ["fullName", "email", "phone", "ownerPin", "confirmOwnerPin"],
  };

  async function continueStep() {
    const names = stepFields[step] ?? [];
    const errors = await formik.validateForm();
    names.forEach(name => { void formik.setFieldTouched(name, true); });
    if (names.some(name => errors[name as keyof typeof errors])) return;
    setStep(current => current + 1);
  }

  const errorFor = (name: keyof typeof initialValues) => {
    const message = formik.errors[name];
    return formik.touched[name] && typeof message === "string" ? message : undefined;
  };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {complete ? (
        <motion.div key="done" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="py-12">
          <h1 className="text-4xl leading-[1.1] tracking-[-.045em] sm:text-5xl">Your application is with the Ovaal team.</h1>
          <p className="mt-5 max-w-md font-subtext leading-relaxed text-primary-foreground/70">We’ll review the restaurant, admin, and compliance details. The restaurant is created only after we approve it.</p>
          <Link href="/" className="group relative isolate mt-8 inline-flex min-h-12 items-center overflow-hidden rounded-full px-7 py-3 text-sm font-semibold hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-foreground"><HoverFill color="dark" /><span className="relative z-10">Back to Ovaal</span></Link>
        </motion.div>
      ) : !unlocked ? (
        <motion.div key="code">
          <Back />
          <p className="text-xs font-semibold tracking-[.14em] uppercase text-primary-foreground/55">Partner onboarding</p>
          <h1 className="mt-4 max-w-lg text-[clamp(2.2rem,3.7vw,3.6rem)] leading-[1.05] tracking-[-.05em]">Enter your partner code.</h1>
          <p className="mt-5 max-w-lg font-subtext text-[15px] leading-relaxed text-primary-foreground/65">We send this code when we’ve agreed to bring your restaurant onto Ovaal. After it checks out, you’ll share the same details we use to create a restaurant.</p>
          <form onSubmit={unlock} className="mt-9 max-w-md space-y-4">
            <div>
              <label htmlFor="partner-code" className="mb-2 block text-sm font-medium">Partner code</label>
              <Input id="partner-code" value={code} onChange={(event) => setCode(event.target.value.toUpperCase())} autoComplete="off" placeholder="Enter your code" aria-invalid={!!codeError} className={`${controlClass} tracking-[0.18em] uppercase`} />
              {codeError && <p className="mt-2 text-xs text-red-700">{codeError}</p>}
            </div>
            <LoadingButton type="submit" loading={checking} loadingLabel="Checking your code" className="min-h-13 w-full px-7 py-3.5">Continue</LoadingButton>
          </form>
        </motion.div>
      ) : (
        <motion.div key="application">
          <Back />
          <p className="text-xs font-semibold tracking-[.14em] uppercase text-primary-foreground/55">Partner onboarding</p>
          <h1 className="mt-4 max-w-lg text-[clamp(2.2rem,3.7vw,3.6rem)] leading-[1.05] tracking-[-.05em]">{step === 0 ? "Tell us about the restaurant." : step === 1 ? "Who administers it?" : "Compliance records."}</h1>
          <p className="mt-5 max-w-lg font-subtext text-[15px] leading-relaxed text-primary-foreground/65">{step === 2 ? "Optional. You can skip these and we can add them later. The restaurant is created only after we approve the application." : "This arrives with our team as a draft. We create the restaurant from these details once it’s approved."}</p>
          <ol className="mt-8 grid grid-cols-3" aria-label="Progress">
            {steps.map((label, index) => (
              <li key={label} className="text-xs font-medium">
                <span className={`mb-2 block h-1 rounded-full ${index <= step ? "bg-primary-foreground" : "bg-primary-foreground/15"}`} />
                {label}
              </li>
            ))}
          </ol>
          <form noValidate className="mt-9 space-y-5" onSubmit={(event) => { event.preventDefault(); if (step < 2) void continueStep(); else void formik.submitForm(); }}>
            {step === 0 && <>
              <Text id="restaurantName" label="Restaurant name" value={formik.values.restaurantName} error={errorFor("restaurantName")} onBlur={formik.handleBlur} onChange={(value) => { void formik.setFieldValue("restaurantName", value); if (!slugEdited) void formik.setFieldValue("slug", slugFrom(value)); }} placeholder="Ama’s Kitchen" />
              <label className="block" htmlFor="description"><span className="mb-2 block text-sm font-medium">Description<span className="ml-2 font-normal text-primary-foreground/45">Optional</span></span>
                <textarea id="description" name="description" value={formik.values.description} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="What guests should know about the restaurant" className={`${controlClass} min-h-28 rounded-3xl`} />
              </label>
              <Text id="slug" label="Workspace URL" value={formik.values.slug} error={errorFor("slug")} onBlur={formik.handleBlur} onChange={(value) => { setSlugEdited(true); void formik.setFieldValue("slug", slugFrom(value)); }} placeholder="amas-kitchen" />
              <Text id="address" label="Address" value={formik.values.address} error={errorFor("address")} onBlur={formik.handleBlur} onChange={(value) => { void formik.setFieldValue("address", value); }} placeholder="14 Oxford Street, Osu" />
              <div className="grid gap-5 sm:grid-cols-2">
                <Text id="city" label="City" value={formik.values.city} error={errorFor("city")} onBlur={formik.handleBlur} onChange={(value) => { void formik.setFieldValue("city", value); }} placeholder="Accra" />
                <Choice id="region" label="Region" value={formik.values.region} options={regions} error={errorFor("region")} onChange={(value) => { void formik.setFieldValue("region", value); }} />
              </div>
              <fieldset>
                <legend className="mb-2 text-sm font-medium">Default order type</legend>
                <div className="grid gap-3 sm:grid-cols-2">
                  {([["TAKEAWAY", "Takeaway"], ["DINE_IN", "Dine in"]] as const).map(([value, label]) => (
                    <button key={value} type="button" aria-pressed={formik.values.defaultDiningType === value} onClick={() => { void formik.setFieldValue("defaultDiningType", value); }} className={`min-h-13 rounded-full border px-5 text-left text-sm font-medium ${formik.values.defaultDiningType === value ? "border-primary-foreground bg-primary/40" : "border-primary-foreground/15 bg-white"}`}>{label}</button>
                  ))}
                </div>
              </fieldset>
              <fieldset>
                <legend className="mb-2 text-sm font-medium">Opening times</legend>
                <ul className="divide-y divide-primary-foreground/10 overflow-hidden rounded-3xl border border-primary-foreground/15 bg-white">
                  {formik.values.openingHours.map((row, index) => (
                    <li key={row.day} className="grid items-center gap-3 px-4 py-3 sm:grid-cols-[7.5rem_auto_1fr_1fr]">
                      <span className="text-sm font-medium">{dayLabels[row.day]}</span>
                      <button type="button" aria-pressed={!row.closed} onClick={() => { const next = formik.values.openingHours.map((entry, entryIndex) => entryIndex === index ? { ...entry, closed: !entry.closed } : entry); void formik.setFieldValue("openingHours", next); }} className="w-fit rounded-full bg-neutral-100 px-3 py-1.5 text-xs font-medium">{row.closed ? "Closed" : "Open"}</button>
                      <input type="time" aria-label={`${dayLabels[row.day]} opens`} value={row.opens} disabled={row.closed} onChange={(event) => patchHour(formik, index, { opens: event.target.value })} className={controlClass} />
                      <input type="time" aria-label={`${dayLabels[row.day]} closes`} value={row.closes} disabled={row.closed} onChange={(event) => patchHour(formik, index, { closes: event.target.value })} className={controlClass} />
                    </li>
                  ))}
                </ul>
                {typeof formik.errors.openingHours === "string" && formik.touched.openingHours && <p className="mt-2 text-xs text-red-700">{formik.errors.openingHours}</p>}
              </fieldset>
            </>}
            {step === 1 && <>
              <p className="font-subtext text-sm leading-relaxed text-primary-foreground/65">This person administers the restaurant and signs in with a four-digit PIN. Other staff choose their own PIN the first time they use their profile.</p>
              <Text id="fullName" label="Admin name" value={formik.values.fullName} error={errorFor("fullName")} onBlur={formik.handleBlur} onChange={(value) => { void formik.setFieldValue("fullName", value); }} placeholder="Ama Mensah" />
              <div className="grid gap-5 sm:grid-cols-2">
                <Text id="email" label="Email address" type="email" value={formik.values.email} error={errorFor("email")} onBlur={formik.handleBlur} onChange={(value) => { void formik.setFieldValue("email", value); }} placeholder="you@restaurant.com" />
                <InternationalPhoneInput id="phone" value={formik.values.phone} onChange={value => { void formik.setFieldValue("phone", value); }} onBlur={() => { void formik.setFieldTouched("phone", true); }} error={errorFor("phone")} />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Text id="ownerPin" label="PIN" value={formik.values.ownerPin} error={errorFor("ownerPin")} onBlur={formik.handleBlur} onChange={(value) => { void formik.setFieldValue("ownerPin", value.replace(/\D/g, "").slice(0, 4)); }} placeholder="4 digits" />
                <Text id="confirmOwnerPin" label="Confirm PIN" value={formik.values.confirmOwnerPin} error={errorFor("confirmOwnerPin")} onBlur={formik.handleBlur} onChange={(value) => { void formik.setFieldValue("confirmOwnerPin", value.replace(/\D/g, "").slice(0, 4)); }} placeholder="Repeat the PIN" />
              </div>
            </>}
            {step === 2 && <>
              <div className="grid gap-5 sm:grid-cols-2">
                <Text id="businessRegistrationNumber" label="Business registration" optional value={formik.values.businessRegistrationNumber} onBlur={formik.handleBlur} onChange={(value) => { void formik.setFieldValue("businessRegistrationNumber", value); }} placeholder="BN-123456789" />
                <Text id="tin" label="GRA TIN" optional value={formik.values.tin} onBlur={formik.handleBlur} onChange={(value) => { void formik.setFieldValue("tin", value); }} placeholder="C0012345678" />
                <Text id="foodHygienePermit" label="Food hygiene permit" optional value={formik.values.foodHygienePermit} onBlur={formik.handleBlur} onChange={(value) => { void formik.setFieldValue("foodHygienePermit", value); }} placeholder="Permit number" />
                <Text id="districtAssemblyPermit" label="District assembly permit" optional value={formik.values.districtAssemblyPermit} onBlur={formik.handleBlur} onChange={(value) => { void formik.setFieldValue("districtAssemblyPermit", value); }} placeholder="Permit number" />
              </div>
              <label className="block" htmlFor="complianceNotes"><span className="mb-2 block text-sm font-medium">Notes<span className="ml-2 font-normal text-primary-foreground/45">Optional</span></span>
                <textarea id="complianceNotes" name="complianceNotes" value={formik.values.complianceNotes} onChange={formik.handleChange} onBlur={formik.handleBlur} placeholder="Anything else on file, such as an FDA product registration" className={`${controlClass} min-h-28 rounded-3xl`} />
              </label>
            </>}
            {formik.status && <p className="text-sm text-red-700" role="alert">{formik.status}</p>}
            <div className="flex items-center justify-between gap-3 pt-2">
              <button type="button" onClick={() => setStep(current => Math.max(0, current - 1))} className={`rounded-full px-4 py-2 text-sm font-medium underline underline-offset-4 ${step === 0 ? "invisible" : ""}`}>Back</button>
              <div className="flex gap-3">
                {step === 2 && <button type="button" disabled={formik.isSubmitting} onClick={() => { void formik.setValues({ ...formik.values, businessRegistrationNumber: "", tin: "", foodHygienePermit: "", districtAssemblyPermit: "", complianceNotes: "" }).then(() => formik.submitForm()); }} className="min-h-13 rounded-full border border-primary-foreground/15 px-5 text-sm font-semibold">Skip for now</button>}
                <LoadingButton type="submit" loading={formik.isSubmitting} loadingLabel="Sending your application" className="min-h-13 px-7 py-3.5">{step === 2 ? "Send application" : "Continue"}</LoadingButton>
              </div>
            </div>
          </form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function patchHour(formik: ReturnType<typeof useFormik<typeof initialValues>>, index: number, patch: { opens?: string; closes?: string }) {
  const next = formik.values.openingHours.map((entry, entryIndex) => entryIndex === index ? { ...entry, ...patch } : entry);
  void formik.setFieldValue("openingHours", next);
  void formik.setFieldTouched("openingHours", true);
}

function Back() {
  return (
    <Link href="/" className="mb-10 inline-flex min-h-8 items-center gap-1.5 rounded-full bg-neutral-200 px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-neutral-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-foreground">
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4"><path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
      Back to home
    </Link>
  );
}

function Text({ id, label, value, onChange, onBlur, error, placeholder, type = "text", optional }: {
  id: string; label: string; value: string; onChange: (value: string) => void; onBlur: React.FocusEventHandler<HTMLInputElement>; error?: string; placeholder: string; type?: string; optional?: boolean;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">{label}{optional && <span className="ml-2 font-normal text-primary-foreground/45">Optional</span>}</label>
      <Input id={id} name={id} type={type} inputMode={id.toLowerCase().includes("pin") ? "numeric" : undefined} value={value} onChange={(event) => onChange(event.target.value)} onBlur={onBlur} placeholder={placeholder} aria-invalid={!!error} className={controlClass} />
      {error && <p className="mt-2 text-xs text-red-700">{error}</p>}
    </div>
  );
}

function Choice({ id, label, value, options, error, onChange }: { id: string; label: string; value: string; options: string[]; error?: string; onChange: (value: string) => void }) {
  return (
    <div>
      <Select.Root value={value || null} onValueChange={(next) => onChange(next ?? "")}>
        <Select.Label className="mb-2 block text-sm font-medium">{label}</Select.Label>
        <Select.Trigger id={id} aria-invalid={!!error} className={`${controlClass} flex items-center justify-between gap-2 text-left`}>
          <Select.Value placeholder="Choose region" />
          <Select.Icon><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4"><path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg></Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Positioner sideOffset={6} alignItemWithTrigger={false} className="z-50 outline-none">
            <Select.Popup className="max-h-[min(320px,var(--available-height))] min-w-[var(--anchor-width)] overflow-y-auto rounded-2xl border border-primary-foreground/10 bg-white p-1.5 text-primary-foreground shadow-xl outline-none">
              <Select.List>{options.map(option => <Select.Item key={option} value={option} className="cursor-default rounded-xl px-3 py-2.5 text-sm outline-none data-highlighted:bg-primary/30"><Select.ItemText>{option}</Select.ItemText></Select.Item>)}</Select.List>
            </Select.Popup>
          </Select.Positioner>
        </Select.Portal>
      </Select.Root>
      {error && <p className="mt-2 text-xs text-red-700">{error}</p>}
    </div>
  );
}

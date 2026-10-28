"use client";

import { Input } from "@base-ui/react/input";
import { NumberField } from "@base-ui/react/number-field";
import { Select } from "@base-ui/react/select";
import { useFormik } from "formik";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState, type ReactNode } from "react";
import Link from "next/link";
import { HoverFill } from "@/components/marketing/hover-fill";
import { betaSchema, initialValues, roles, restaurantTypes } from "./beta-schema";
import { BetaSuccess } from "./beta-success";

type FieldName = keyof typeof initialValues;
const controlClass = "min-h-13 w-full rounded-full border border-primary-foreground/15 bg-white px-5 py-3 text-[15px] text-primary-foreground outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-primary-foreground/35 focus-visible:border-primary-foreground focus-visible:ring-2 focus-visible:ring-primary/60 aria-invalid:border-red-700";

export function BetaForm() {
  const [complete, setComplete] = useState(false);
  const reduceMotion = useReducedMotion();
  const formik = useFormik({ initialValues, validationSchema: betaSchema, onSubmit: (_values, helpers) => { setComplete(true); helpers.setSubmitting(false); } });
  const errorFor = (name: FieldName) => formik.touched[name] ? formik.errors[name] : undefined;
  const row = (children: ReactNode, key: string) => (
    <motion.div key={key} variants={{ hidden: { opacity: 0, y: reduceMotion ? 0 : 20 }, visible: { opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : .45, ease: [.2, 0, 0, 1] } } }} className="grid gap-5 sm:grid-cols-2">{children}</motion.div>
  );
  const field = (name: FieldName, label: string, placeholder: string, type = "text", autoComplete?: string) => (
    <div className={name === "fullName" ? "sm:col-span-2" : ""}>
      <label htmlFor={name} className="mb-2 block text-sm font-medium">{label}{name === "branches" && <span className="ml-2 font-normal text-primary-foreground/45">Optional</span>}</label>
      <Input id={name} {...formik.getFieldProps(name)} type={type} autoComplete={autoComplete} placeholder={placeholder} min={type === "number" ? 1 : undefined} step={type === "number" ? 1 : undefined} aria-required={name !== "branches"} aria-invalid={!!errorFor(name)} aria-describedby={errorFor(name) ? `${name}-error` : undefined} className={controlClass} />
      {errorFor(name) && <p id={`${name}-error`} className="mt-2 text-xs text-red-700">{errorFor(name)}</p>}
    </div>
  );
  const select = (name: "role" | "restaurantType", label: string, options: string[]) => (
    <div>
      <Select.Root name={name} value={formik.values[name] || null} onValueChange={(value) => { void formik.setFieldValue(name, value ?? ""); }} items={options.map(value => ({ label: value, value }))}>
        <Select.Label className="mb-2 block text-sm font-medium">{label}</Select.Label>
        <Select.Trigger id={name} onBlur={() => { void formik.setFieldTouched(name, true); }} aria-required="true" aria-invalid={!!errorFor(name)} aria-describedby={errorFor(name) ? `${name}-error` : undefined} className={`${controlClass} flex items-center justify-between gap-2 text-left`}>
          <Select.Value placeholder="Select an option" />
          <Select.Icon><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4"><path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg></Select.Icon>
        </Select.Trigger>
        <Select.Portal><Select.Positioner sideOffset={6} alignItemWithTrigger={false} className="z-50 outline-none"><Select.Popup className="max-h-[min(320px,var(--available-height))] min-w-[var(--anchor-width)] overflow-y-auto rounded-2xl border border-primary-foreground/10 bg-white p-1.5 text-primary-foreground shadow-xl outline-none"><Select.List>{options.map(option => <Select.Item key={option} value={option} className="flex cursor-default items-center justify-between gap-4 rounded-xl px-3 py-2.5 text-sm outline-none data-highlighted:bg-primary/30"><Select.ItemText>{option}</Select.ItemText><Select.ItemIndicator>✓</Select.ItemIndicator></Select.Item>)}</Select.List></Select.Popup></Select.Positioner></Select.Portal>
      </Select.Root>
      {errorFor(name) && <p id={`${name}-error`} className="mt-2 text-xs text-red-700">{errorFor(name)}</p>}
    </div>
  );

  return (
    <AnimatePresence mode="wait" initial={false}>
      {complete ? <BetaSuccess key="complete" onEdit={() => setComplete(false)} /> : (
        <motion.div key="form" exit={{ opacity: 0, y: reduceMotion ? 0 : -8 }} transition={{ duration: .2 }}>
          <Link href="/" className="mb-10 inline-flex min-h-8 items-center gap-1.5 rounded-full bg-neutral-200 px-3 py-1.5 text-xs font-medium text-primary-foreground transition-colors hover:bg-neutral-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-foreground">
            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-4"><path d="m15 18-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
            Back to home
          </Link>
          <motion.div initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .4 }}>
            <p className="text-xs font-semibold tracking-[.14em] uppercase text-primary-foreground/55">Join the Ovaal beta</p>
            <h1 className="mt-4 max-w-lg text-[clamp(2.2rem,3.7vw,3.6rem)] leading-[1.05] tracking-[-.05em]">Your next chapter starts here.</h1>
            <p className="mt-5 max-w-lg font-subtext text-[15px] leading-relaxed text-primary-foreground/65">Tell us a little about you and your restaurant. Help shape a platform built around better service and room to grow.</p>
          </motion.div>
          <motion.form noValidate onSubmit={async (event) => { event.preventDefault(); const errors = await formik.validateForm(); void formik.submitForm(); const first = Object.keys(errors)[0]; if (first) document.getElementById(first)?.focus(); }} initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: reduceMotion ? 0 : .085, delayChildren: reduceMotion ? 0 : .12 } } }} className="mt-9 space-y-5">
            {row(field("fullName", "Full name", "Your full name", "text", "name"), "name")}
            {row(<>{field("email", "Email address", "you@restaurant.com", "email", "email")}{field("phone", "Phone number", "+233 24 000 0000", "tel", "tel")}</>, "contact")}
            {row(<>{field("restaurantName", "Restaurant name", "Your restaurant", "text", "organization")}{select("role", "Your role", roles)}</>, "restaurant")}
            {row(<>{select("restaurantType", "Type of restaurant", restaurantTypes)}{field("location", "Location", "City, country", "text", "off")}</>, "details")}
            {row(
              <div>
                <label htmlFor="branches" className="mb-2 block text-sm font-medium">Number of branches <span className="ml-2 font-normal text-primary-foreground/45">Optional</span></label>
                <NumberField.Root
                  id="branches"
                  name="branches"
                  min={1}
                  max={10000}
                  step={1}
                  smallStep={1}
                  value={formik.values.branches === "" ? null : Number(formik.values.branches)}
                  onValueChange={(value) => { void formik.setFieldValue("branches", value === null ? "" : String(value)); }}
                  onBlur={() => { void formik.setFieldTouched("branches", true); }}
                >
                  <NumberField.Group className={`flex min-h-13 items-center rounded-full border bg-white p-1 transition-[border-color,box-shadow] focus-within:border-primary-foreground focus-within:ring-2 focus-within:ring-primary/60 ${errorFor("branches") ? "border-red-700" : "border-primary-foreground/15"}`}>
                    <NumberField.Decrement aria-label="Decrease branches" className="flex size-11 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-primary-foreground transition-colors hover:bg-primary focus-visible:outline-2 focus-visible:outline-primary-foreground disabled:cursor-not-allowed disabled:opacity-35">
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5"><path d="M5 12h14" strokeLinecap="round" /></svg>
                    </NumberField.Decrement>
                    <NumberField.Input placeholder="1" aria-invalid={!!errorFor("branches")} aria-describedby={errorFor("branches") ? "branches-error" : undefined} className="min-w-0 flex-1 bg-transparent px-2 text-center text-[15px] text-primary-foreground outline-none placeholder:text-primary-foreground/35" />
                    <NumberField.Increment aria-label="Increase branches" className="flex size-11 shrink-0 items-center justify-center rounded-full bg-neutral-100 text-primary-foreground transition-colors hover:bg-primary focus-visible:outline-2 focus-visible:outline-primary-foreground disabled:cursor-not-allowed disabled:opacity-35">
                      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-5"><path d="M5 12h14M12 5v14" strokeLinecap="round" /></svg>
                    </NumberField.Increment>
                  </NumberField.Group>
                </NumberField.Root>
                {errorFor("branches") && <p id="branches-error" className="mt-2 text-xs text-red-700">{errorFor("branches")}</p>}
              </div>, "branches")}
            {row(<div className="sm:col-span-2"><button type="submit" disabled={formik.isSubmitting} className="group relative isolate mt-2 inline-flex min-h-13 w-full items-center justify-center gap-3 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold transition-colors hover:text-primary focus-visible:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-foreground disabled:opacity-60"><HoverFill color="dark" /><span className="relative z-10">Join the beta</span><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="relative z-10 size-5"><path d="M4 12h16m-6-6 6 6-6 6" strokeLinecap="round" strokeLinejoin="round" /></svg></button></div>, "submit")}
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

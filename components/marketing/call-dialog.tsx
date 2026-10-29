"use client";

import { Dialog } from "@base-ui/react/dialog";
import Link from "next/link";
import { Input } from "@base-ui/react/input";
import { useFormik } from "formik";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { FeatureLineArt } from "./feature-line-art";
import { HoverFill } from "./hover-fill";
import { LoadingButton } from "@/components/forms/loading-button";
import { MeetingDateTime } from "@/components/forms/meeting-date-time";
import { accraToday, isPastMeetingTime, parseMeetingDate } from "@/lib/meeting-time";

const fields = [
  { name: "fullName", label: "Full name", placeholder: "Your full name", type: "text", autoComplete: "name" },
  { name: "email", label: "Email address", placeholder: "you@restaurant.com", type: "email", autoComplete: "email" },
  { name: "restaurant", label: "Restaurant name", placeholder: "Your restaurant", type: "text", autoComplete: "organization" },
] as const;

const schema = yup.object({ fullName: yup.string().trim().max(120).required("Enter your full name."), email: yup.string().trim().email("Enter a valid email address.").max(254).required("Enter your email address."), restaurant: yup.string().trim().max(160).required("Enter your restaurant name."), date: yup.string().test("paired", "Choose a date for your preferred time.", function (value) { return !this.parent.time || !!value; }).test("date", "Choose today or a later date.", value => !value || !!parseMeetingDate(value) && value >= accraToday()), time: yup.string().test("paired", "Choose a time for your preferred date.", function (value) { return !this.parent.date || !!value; }).test("time", "Choose a valid time.", value => !value || /^([01]\d|2[0-3]):[0-5]\d$/.test(value)).test("future", "Choose a time in the future.", function (value) { return !value || !this.parent.date || !isPastMeetingTime(this.parent.date, value); }) });

function CallForm() {
  const [complete, setComplete] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const reduceMotion = useReducedMotion();
  const formik = useFormik({ initialValues: { fullName: "", email: "", restaurant: "", date: "", time: "" }, validationSchema: schema, onSubmit: (_values, helpers) => { setComplete(true); helpers.setSubmitting(false); } });
  useEffect(() => { if (complete) headingRef.current?.focus(); }, [complete]);

  return <>
    <Dialog.Close aria-label="Close call form" className="group absolute top-5 right-5 z-10 flex size-10 items-center justify-center overflow-hidden rounded-full text-primary-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-foreground"><HoverFill color="dark" /><svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="relative z-10 size-5 group-hover:text-primary"><path d="m6 6 12 12M6 18 18 6" strokeLinecap="round" /></svg></Dialog.Close>
    {complete ? <motion.div initial={{ opacity: 0, y: reduceMotion ? 0 : 12 }} animate={{ opacity: 1, y: 0 }} className="py-5">
      <div className="mb-7 w-32 rounded-[2rem] bg-primary p-2"><FeatureLineArt kind="receipt" className="w-full" /></div>
      <Dialog.Title ref={headingRef} tabIndex={-1} className="max-w-[16ch] text-3xl leading-[1.1] tracking-[-.045em] outline-none">Your call request is ready.</Dialog.Title>
      <Dialog.Description className="mt-5 font-subtext text-sm leading-relaxed text-primary-foreground/65">This is a preview of the booking experience. Your details haven’t been sent, and a call hasn’t been scheduled yet.</Dialog.Description>
      <Dialog.Close className="group relative isolate mt-8 inline-flex min-h-12 items-center justify-center overflow-hidden rounded-full px-7 py-3 text-sm font-semibold hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary-foreground"><HoverFill color="dark" /><span className="relative z-10">Back to the roadmap</span></Dialog.Close>
    </motion.div> : <>
      <p className="mb-4 pr-10 text-xs font-medium tracking-[.12em] text-primary-foreground/50 uppercase">Meet the Ovaal team</p>
      <Dialog.Title className="max-w-[17ch] text-3xl leading-[1.1] tracking-[-.045em] sm:text-4xl">See what’s next for your restaurant.</Dialog.Title>
      <Dialog.Description className="mt-5 font-subtext text-sm leading-relaxed text-primary-foreground/65">Tell us a little about you. Let’s talk about the full roadmap and where your restaurant fits.</Dialog.Description>
      <form noValidate onSubmit={async event => { event.preventDefault(); const errors = await formik.validateForm(); void formik.submitForm(); const first = Object.keys(errors)[0]; if (first) document.getElementById(`call-${first}`)?.focus(); }} className="mt-6 space-y-4">
        {fields.map(field => { const error = formik.touched[field.name] && formik.errors[field.name]; return <div key={field.name}><label htmlFor={`call-${field.name}`} className="mb-2 block text-sm font-medium">{field.label}{"optional" in field && <span className="ml-2 font-normal text-primary-foreground/45">Optional</span>}</label><Input id={`call-${field.name}`} {...formik.getFieldProps(field.name)} type={field.type} autoComplete={field.autoComplete} placeholder={field.placeholder} aria-required={!("optional" in field)} aria-invalid={!!error} aria-describedby={error ? `call-${field.name}-error` : undefined} className="min-h-12 w-full rounded-full border border-primary-foreground/15 bg-white px-5 py-3 text-sm outline-none placeholder:text-primary-foreground/35 focus-visible:border-primary-foreground focus-visible:ring-2 focus-visible:ring-primary/60 aria-invalid:border-red-700" />{error && <p id={`call-${field.name}-error`} className="mt-2 text-xs text-red-700">{error}</p>}</div>; })}
        <MeetingDateTime date={formik.values.date} time={formik.values.time} onDateChange={date => { void formik.setValues(current => ({ ...current, date, time: date && !isPastMeetingTime(date, current.time) ? current.time : "" })); }} onTimeChange={value => { void formik.setFieldValue("time", value); }} onDateBlur={() => { void formik.setFieldTouched("date", true, false); }} onTimeBlur={() => { void formik.setFieldTouched("time", true, false); }} dateError={formik.touched.date ? formik.errors.date : undefined} timeError={formik.touched.time ? formik.errors.time : undefined} />
        <LoadingButton type="submit" loading={formik.isSubmitting} loadingLabel="Preparing your call request" className="mt-2 min-h-12 w-full px-7 py-3">Request a call</LoadingButton>
        <p className="text-center font-subtext text-xs leading-relaxed text-primary-foreground/65"><Link href="/privacy-policy" className="rounded-sm underline underline-offset-4 focus-visible:outline-2">Privacy Policy</Link><span aria-hidden="true"> · </span><Link href="/terms-of-service" className="rounded-sm underline underline-offset-4 focus-visible:outline-2">Terms of Service</Link></p>
      </form>
    </>}
  </>;
}

export function CallDialogContent(props: { topic: string }) {
  return <Dialog.Portal><Dialog.Backdrop className="fixed inset-0 z-[80] bg-black/45 backdrop-blur-sm transition-opacity duration-200 data-starting-style:opacity-0 data-ending-style:opacity-0 motion-reduce:transition-none" /><Dialog.Viewport className="fixed inset-0 z-[81] flex items-start justify-center overflow-y-auto overscroll-contain px-4 py-6 sm:items-center sm:py-10"><Dialog.Popup className="relative my-auto w-full max-w-[540px] rounded-[2rem] bg-white p-6 text-primary-foreground outline-none transition-[opacity,scale] duration-200 data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0 motion-reduce:transition-none sm:p-9"><CallForm key={props.topic} /></Dialog.Popup></Dialog.Viewport></Dialog.Portal>;
}

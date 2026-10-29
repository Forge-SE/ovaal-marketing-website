"use client";

import { Combobox } from "@base-ui/react/combobox";
import { Input } from "@base-ui/react/input";
import { forwardRef, type ComponentProps } from "react";
import PhoneInput, { getCountryCallingCode, type Country } from "react-phone-number-input";
import flags from "react-phone-number-input/flags";

type CountryOption = { value?: Country; label: string; divider?: boolean };

function Flag({ country }: { country: Country }) {
  const Icon = flags[country];
  return <span aria-hidden="true" className="block w-5 shrink-0 overflow-hidden rounded-[3px] [&_svg]:block [&_svg]:w-full">{Icon && <Icon title="" />}</span>;
}

function CountrySelect({ value, onChange, options, disabled, readOnly }: {
  value?: Country;
  onChange: (value?: Country) => void;
  options: CountryOption[];
  disabled?: boolean;
  readOnly?: boolean;
}) {
  const countries = options.filter(option => option.value && !option.divider);
  return <Combobox.Root items={countries} value={countries.find(country => country.value === value) ?? null} onValueChange={item => { if (item?.value) onChange(item.value); }} itemToStringLabel={item => `${item.label} +${getCountryCallingCode(item.value!)}`} isItemEqualToValue={(a, b) => a.value === b.value} disabled={disabled || readOnly}>
    <Combobox.Trigger aria-label="Country calling code" title={countries.find(country => country.value === value)?.label} className="ml-2 inline-flex min-h-10 shrink-0 items-center gap-2 rounded-full px-2.5 text-xs font-medium outline-none hover:bg-primary/20 focus-visible:outline-2 focus-visible:outline-primary-foreground">
      {value && <><Flag country={value} /><span>+{getCountryCallingCode(value)}</span></>}
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="size-3"><path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" /></svg>
    </Combobox.Trigger>
    <Combobox.Portal><Combobox.Positioner sideOffset={8} align="start" className="z-[85] outline-none"><Combobox.Popup className="w-[min(320px,calc(100vw-2rem))] overflow-hidden rounded-2xl bg-white p-2 text-primary-foreground outline outline-primary-foreground/10">
      <Combobox.Input aria-label="Search countries" placeholder="Search country or code" className="mb-2 min-h-10 w-full rounded-full bg-neutral-100 px-4 text-sm outline-none focus-visible:ring-2 focus-visible:ring-primary" />
      <Combobox.Empty className="p-3 text-xs text-primary-foreground/60">No countries found.</Combobox.Empty>
      <Combobox.List className="max-h-[min(260px,50vh)] overflow-y-auto overscroll-contain">{(item: CountryOption) => <Combobox.Item key={item.value} value={item} className="flex cursor-default items-center gap-3 rounded-xl px-3 py-3 text-sm outline-none data-highlighted:bg-primary/25"><Flag country={item.value!} /><span className="min-w-0 flex-1">{item.label}</span><span className="text-xs text-primary-foreground/60">+{getCountryCallingCode(item.value!)}</span></Combobox.Item>}</Combobox.List>
    </Combobox.Popup></Combobox.Positioner></Combobox.Portal>
  </Combobox.Root>;
}

const NumberInput = forwardRef<HTMLInputElement, ComponentProps<typeof Input>>(function NumberInput(props, ref) {
  return <Input {...props} ref={ref} className="min-h-13 w-full min-w-0 flex-1 rounded-r-full bg-transparent py-3 pr-5 pl-2 text-[15px] outline-none placeholder:text-primary-foreground/35" />;
});

export function InternationalPhoneInput({ id, value, onChange, onBlur, error, label = "Phone number" }: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onBlur: () => void;
  error?: string;
  label?: string;
}) {
  return <div>
    <label htmlFor={id} className="mb-2 block text-sm font-medium">{label}</label>
    <PhoneInput id={id} value={value || undefined} onChange={next => onChange(next ?? "")} onBlur={onBlur} defaultCountry="GH" international={false} addInternationalOption={false} countrySelectComponent={CountrySelect} inputComponent={NumberInput} flags={flags} autoComplete="tel" placeholder="24 000 0000" aria-required="true" aria-invalid={!!error} aria-describedby={error ? `${id}-error` : undefined} className={`flex min-h-13 items-center rounded-full border bg-white text-primary-foreground transition-[border-color,box-shadow] focus-within:border-primary-foreground focus-within:ring-2 focus-within:ring-primary/60 ${error ? "border-red-700" : "border-primary-foreground/15"}`} />
    {error && <p id={`${id}-error`} className="mt-2 text-xs text-red-700">{error}</p>}
  </div>;
}

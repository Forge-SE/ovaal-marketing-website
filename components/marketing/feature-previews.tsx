import { useId, type ReactNode } from "react";
import type { FeatureKind } from "./feature-data";
import { FeatureLineArt } from "./feature-line-art";

const panelClass = "rounded-[1.25rem] bg-white p-5";

function Panel({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`${panelClass} ${className}`}>{children}</div>;
}

function Badge({ children, dark = false }: { children: ReactNode; dark?: boolean }) {
  return <span className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-medium ${dark ? "bg-primary-foreground text-primary" : "bg-primary/25 text-primary-foreground"}`}>{children}</span>;
}

function Row({ label, value, strong = false }: { label: ReactNode; value: ReactNode; strong?: boolean }) {
  return <div className={`flex items-center justify-between gap-3 py-2.5 text-xs ${strong ? "font-semibold" : "text-primary-foreground/60"}`}><span>{label}</span><span className="shrink-0 tabular-nums text-primary-foreground">{value}</span></div>;
}

function PreviewIcon({ kind, className = "size-5" }: { kind: "bell" | "check" | "arrow" | "card" | "cash" | "bank" | "lock" | "mail"; className?: string }) {
  const paths = {
    bell: "M14.857 17.082a23.85 23.85 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9a6 6 0 0 0-12 0v.75a8.967 8.967 0 0 1-2.311 6.022c1.733.64 3.56 1.084 5.454 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0",
    check: "m4.5 12.75 6 6 9-13.5",
    arrow: "M4.5 19.5 19.5 4.5m0 0H8.25m11.25 0v11.25",
    card: "M3 8.25h18M3 12h18m-13.5 4.5h3m-4.5 3h12a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3h-12a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3Z",
    cash: "M2.25 6.75h19.5v10.5H2.25V6.75Zm12 5.25a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0ZM6 9.75h.008M18 14.25h.008",
    bank: "M3 21h18M3 10.5h18M4.5 10.5V18m5-7.5V18m5-7.5V18m5-7.5V18M3 7.5 12 3l9 4.5V9H3V7.5Z",
    lock: "M16.5 10.5V6a4.5 4.5 0 0 0-9 0v4.5m-.75 0h10.5A2.25 2.25 0 0 1 19.5 12.75v6A2.25 2.25 0 0 1 17.25 21H6.75a2.25 2.25 0 0 1-2.25-2.25v-6A2.25 2.25 0 0 1 6.75 10.5ZM12 14.25v3",
    mail: "M3 6.75 12 13.5l9-6.75M5.25 4.5h13.5A2.25 2.25 0 0 1 21 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25H5.25A2.25 2.25 0 0 1 3 17.25V6.75A2.25 2.25 0 0 1 5.25 4.5Z",
  };
  return <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className}><path d={paths[kind]} /></svg>;
}

function Dish({ className = "size-12" }: { className?: string }) {
  return <svg viewBox="0 0 64 64" fill="none" className={className}><rect width="64" height="64" rx="14" fill="var(--primary)" fillOpacity=".2" /><ellipse cx="32" cy="36" rx="23" ry="17" fill="white" /><ellipse cx="32" cy="34" rx="18" ry="12" fill="#d6a44d" /><path d="m20 31 9-5 6 5 9-2-3 12-11 3-10-6Z" fill="#c88139" /><path d="m24 24 4-5 6 5m2 4 6-5 5 7m-30 4 6 4-4 5" stroke="var(--secondary)" strokeWidth="3" strokeLinecap="round" /><circle cx="36" cy="35" r="3" fill="#f4da86" /><circle cx="27" cy="36" r="2" fill="#f4da86" /></svg>;
}

function InsightsPreview() {
  const chartFillId = useId();
  return <div className="relative mx-auto w-[300px] max-w-[calc(100%-2rem)] pt-6">
    <Panel className="relative pb-4">
      <div className="flex items-center justify-between"><span className="text-[11px] text-primary-foreground/55">Today’s net sales</span><Badge>↑ 12.8%</Badge></div>
      <p className="mt-2 text-[30px] font-medium tracking-[-.05em]">GH₵ 4,820<span className="text-lg text-primary-foreground/40">.00</span></p>
      <p className="mt-1 text-[10px] text-primary-foreground/45">vs. the same weekday last week</p>
      <svg viewBox="0 0 280 110" fill="none" className="mt-4 w-full">
        <defs><linearGradient id={chartFillId} x1="0" y1="20" x2="0" y2="90" gradientUnits="userSpaceOnUse"><stop stopColor="#10b96b" stopOpacity=".18" /><stop offset="1" stopColor="#10b96b" stopOpacity="0" /></linearGradient></defs>
        {[12, 56, 100, 144, 188, 232, 276].map(x => <path key={x} d={`M${x} 0v90`} stroke="var(--primary-foreground)" strokeOpacity=".2" strokeWidth=".65" strokeDasharray="1 4" />)}
        <path d="M0 89H56L100 56H144L188 32L232 38L280 27V90H0Z" fill={`url(#${chartFillId})`} />
        <path d="M0 89H56L100 56H144L188 32L232 38L280 27" stroke="#10b96b" strokeWidth="1.2" strokeLinejoin="round" />
        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day, index) => <text key={day} x={12 + index * 44} y="104" fill="var(--primary-foreground)" fillOpacity=".4" fontSize="7" textAnchor="middle">{day}</text>)}
      </svg>
    </Panel>
    <div className="absolute -right-2 -bottom-8 flex items-center gap-2.5 rounded-2xl bg-white px-4 py-3 text-primary-foreground"><span className="flex size-8 items-center justify-center rounded-full bg-primary/25"><PreviewIcon kind="mail" className="size-4" /></span><div><p className="text-[11px] font-medium">Your daily digest</p><p className="mt-0.5 text-[9px] text-primary-foreground/55">A clearer start to service</p></div></div>
  </div>;
}

function AlertsPreview() {
  return <div className="relative mx-auto w-[310px] max-w-[calc(100%-2rem)] pt-8">
    <div className={`${panelClass} absolute inset-x-4 top-3 h-40 rotate-[-6deg] opacity-50`} />
    <Panel className="relative p-0!">
      <div className="flex items-center justify-between px-4 py-3.5"><span className="flex items-center gap-2 text-xs font-medium"><PreviewIcon kind="bell" className="size-4" />Notifications</span><Badge>3 new</Badge></div>
      {[{ title: "Low stock", text: "Chicken is below its reorder point.", time: "Now" }, { title: "Cash difference", text: "Review the latest shift close.", time: "2m" }, { title: "Payment failed", text: "A mobile money payment needs attention.", time: "5m" }].map((notice, index) => <div key={notice.title} className="flex gap-3 px-4 py-3"><span className={`mt-1 size-2 shrink-0 rounded-full ${index === 0 ? "bg-secondary" : "bg-primary"}`} /><div className="min-w-0 flex-1"><div className="flex justify-between gap-2"><span className="text-[11px] font-medium">{notice.title}</span><span className="text-[9px] text-primary-foreground/40">{notice.time}</span></div><p className="mt-1 text-[10px] leading-relaxed text-primary-foreground/55">{notice.text}</p></div></div>)}
    </Panel>
  </div>;
}

function InventoryPreview() {
  return <div className="relative mx-auto w-[290px] max-w-[calc(100%-2rem)] pt-4">
    <Panel className="rotate-[3deg]">
      <div className="flex items-center justify-between"><span className="text-sm font-medium">Chicken</span><Badge>In stock</Badge></div><p className="mt-1 text-[10px] text-primary-foreground/45">Stock balance</p>
      <p className="mt-5 text-[10px] text-primary-foreground/55">AVAILABLE NOW</p><p className="mt-1 text-[30px] font-medium tracking-[-.05em]">18 <span className="text-sm text-primary-foreground/50">kg</span></p><p className="mt-1 text-[10px] text-primary-foreground/45">of 24 kg on hand</p>
      <div className="mt-4 flex h-2.5 overflow-hidden rounded-full"><span className="w-3/4 bg-secondary" /><span className="w-1/4 bg-primary" /></div><div className="mt-2 flex justify-between text-[9px] text-primary-foreground/55"><span>● Available</span><span>● Reserved 6 kg</span></div>
    </Panel>
    <div className="absolute -right-2 -bottom-9 flex w-[238px] max-w-full items-center gap-2 overflow-hidden rounded-2xl bg-white py-3 pr-2 pl-4 text-primary-foreground">
      <div className="relative z-10 min-w-0 flex-1"><p className="text-[10px] text-primary-foreground/55">Cost per dish</p><p className="mt-1 text-[10px]">Jollof & chicken</p><p className="mt-1 text-lg tracking-tight">GH₵ 24.50</p></div>
      <FeatureLineArt kind="costing" className="size-[76px] shrink-0" />
    </div>
  </div>;
}

function DiscountsPreview() {
  return <div className="relative mx-auto w-[290px] max-w-[calc(100%-2rem)] pt-10">
    <Panel className="absolute inset-x-3 top-6 h-48 rotate-[7deg] opacity-60" > <span /></Panel>
    <Panel className="relative rotate-[-5deg]">
      <div className="flex items-center justify-between"><span className="text-xs font-medium">A little reason to return</span><Badge>Active</Badge></div>
      <p className="mt-6 text-4xl font-medium tracking-[-.06em]">10% <span className="text-lg text-primary-foreground/45">off</span></p>
      <div className="relative mt-5 flex items-center justify-between gap-2 overflow-hidden rounded-xl bg-primary/15 py-2 pr-2 pl-4"><span className="font-mono text-sm tracking-[.12em]">COMEBACK10</span><FeatureLineArt kind="ticket" className="size-11 shrink-0" /></div>
      <Row label="Apply at the counter" value={<PreviewIcon kind="check" className="size-4" />} />
    </Panel>
  </div>;
}

function OrderingPreview() {
  return <div className="relative mx-auto w-[300px] max-w-[calc(100%-2rem)] pt-4">
    <Panel className="rotate-[2deg]">
      <div className="flex gap-1 rounded-full bg-neutral-100 p-1 text-[9px]"><span className="flex-1 rounded-full bg-primary px-3 py-2 text-center font-medium">Dine-in</span><span className="flex-1 px-3 py-2 text-center text-primary-foreground/50">Pickup</span><span className="flex-1 px-3 py-2 text-center text-primary-foreground/50">Delivery</span></div>
      <div className="mt-5 flex items-center gap-3"><Dish /><div><p className="text-xs font-medium">Jollof & chicken</p><p className="mt-1 text-[10px] text-primary-foreground/50">Extra plantain · No onions</p><p className="mt-1 text-xs font-medium">GH₵ 65.00</p></div></div>
      <div className="mt-4 "><Row label="Subtotal" value="GH₵ 65.00" /><Row label="Tip" value="GH₵ 5.00" /></div>
      <div className="mt-2 flex items-center justify-between rounded-full bg-primary px-4 py-2.5 text-[11px] font-medium"><span>Place order</span><span>GH₵ 70.00 →</span></div>
    </Panel>
  </div>;
}

function PaymentsPreview() {
  return <div className="relative mx-auto w-[300px] max-w-[calc(100%-2rem)] pt-6">
    <Panel>
      <div className="flex items-center justify-between"><span className="text-xs font-medium">Payment</span><Badge>Split payment</Badge></div><p className="mt-4 text-[10px] text-primary-foreground/50">Amount to pay</p><p className="mt-1 text-[30px] font-medium tracking-[-.05em]">GH₵ 150.00</p>
      <div className="mt-5 grid grid-cols-3 gap-2">{([{ icon: "cash", label: "Cash" }, { icon: "bank", label: "Transfer" }, { icon: "card", label: "Mobile money" }] as const).map(({ icon, label }) => <div key={label} className={`flex flex-col items-center gap-2 rounded-2xl px-1 py-3 ${icon === "card" ? "bg-primary" : "bg-neutral-50"}`}><PreviewIcon kind={icon} /><span className="text-[9px]">{label}</span></div>)}</div>
      <div className="mt-4 flex items-center justify-center gap-2">{["MTN", "Telecel", "AT"].map(network => <span key={network} className="rounded-full bg-primary-foreground/5 px-3 py-1 text-[9px] font-medium">{network}</span>)}</div>
    </Panel>
  </div>;
}

function FeesPreview() {
  return <div className="relative mx-auto w-[285px] max-w-[calc(100%-2rem)] pt-6">
    <Panel className="rotate-[-3deg]">
      <div className="flex max-w-[145px] items-center gap-2 text-xs font-medium"><span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-primary"><PreviewIcon kind="check" className="size-4" /></span>Your sales. Your money.</div>
      <div className="mt-4  py-1"><Row label="Restaurant sales" value="GH₵ 4,820.00" /><Row label="Ovaal transaction fee" value={<span className="text-secondary">GH₵ 0.00</span>} strong /></div>
      <div className="mt-5 flex items-center justify-between"><span className="max-w-[100px] text-[11px] leading-relaxed text-primary-foreground/60">Straight to your payment account</span><span className="flex size-11 items-center justify-center rounded-full bg-primary"><PreviewIcon kind="arrow" /></span></div>
      <p className="mt-4 text-[9px] leading-relaxed text-primary-foreground/40">Payment provider fees still apply.</p>
    </Panel>
    <div className="absolute -top-1 -right-2 flex items-center gap-1 overflow-hidden rounded-2xl bg-[color-mix(in_oklab,var(--primary)_25%,white)] py-2 pr-1 pl-4 text-primary-foreground"><div><span className="text-3xl font-medium tracking-[-.06em]">0%</span><p className="text-[9px]">Ovaal cut</p></div><FeatureLineArt kind="receipt" className="h-[68px] w-14 shrink-0" /></div>
  </div>;
}

function KitchenPreview() {
  return <div className="relative mx-auto w-[330px] max-w-[calc(100%-1rem)] pt-5">
    <div className="mb-3 flex gap-1.5 text-[9px]">{["New", "Preparing", "Ready", "Completed"].map(status => <span key={status} className={`rounded-full px-2.5 py-1.5 ${status === "Preparing" ? "bg-primary-foreground text-primary" : "bg-primary-foreground/5 text-primary-foreground/50"}`}>{status}</span>)}</div>
    <div className="flex items-start gap-2.5">
      <Panel className="w-[205px] shrink-0 rotate-[-3deg] p-4!">
        <div className="flex items-center justify-between"><span className="text-xs font-semibold">#0028</span><Badge>Preparing</Badge></div><div className="mt-2 flex justify-between text-[9px] text-primary-foreground/45"><span>Dine-in · Table 04</span><span>04:32</span></div>
        <div className="mt-4 flex items-center gap-2.5  pt-4"><Dish className="size-10 shrink-0" /><div><p className="text-[10px] font-medium">1 × Jollof & chicken</p><p className="mt-1 text-[9px] text-primary-foreground/50">Extra plantain</p></div></div>
        <div className="mt-4 rounded-full bg-primary py-2 text-center text-[10px] font-medium">Mark ready</div>
      </Panel>
      <Panel className="mt-7 w-[160px] shrink-0 rotate-[4deg] p-4! opacity-65"><p className="text-xs font-semibold">#0029</p><p className="mt-2 text-[9px] text-primary-foreground/50">Pickup</p><Dish className="mt-4 size-12" /><p className="mt-3 text-[10px]">1 × Grilled chicken</p></Panel>
    </div>
  </div>;
}

function ShiftsPreview() {
  return <div className="relative mx-auto w-[290px] max-w-[calc(100%-2rem)] pt-5">
    <Panel className="rotate-[3deg]">
      <div className="flex items-center justify-between"><span className="text-xs font-medium">Closing shift</span><Badge>Reconciled</Badge></div><p className="mt-2 text-[10px] text-primary-foreground/45">Evening service</p>
      <div className="mt-4"><Row label="Expected cash" value="GH₵ 1,250.00" /><Row label="Counted cash" value="GH₵ 1,250.00" /><div className=""><Row label="Difference" value="GH₵ 0.00" strong /></div></div>
      <div className="mt-2 rounded-xl bg-primary/20 px-3 py-2 text-center text-[10px]">Everything adds up.</div>
    </Panel>
    <div className="absolute -bottom-8 -left-1 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-primary-foreground"><span className="flex size-8 items-center justify-center rounded-full bg-primary/25"><PreviewIcon kind="lock" className="size-4" /></span><div><p className="text-[9px] text-primary-foreground/55">Manager · PIN access</p><p className="mt-1 text-sm tracking-[.3em]">••••</p></div></div>
  </div>;
}

function TaxPreview() {
  return <div className="relative mx-auto w-[320px] max-w-[calc(100%-2rem)] pt-3">
    <Panel>
      <div className="flex items-center justify-between"><span className="text-xs font-medium">Tax & currency</span><Badge>Ghana · GHS</Badge></div>
      <p className="mt-5 text-[10px] text-primary-foreground/50">Tax profile</p>
      <div className="mt-2 space-y-1.5">{["Not registered", "Standard", "Custom"].map(profile => <div key={profile} className={`flex items-center justify-between rounded-xl px-3 py-2 text-[11px] ${profile === "Standard" ? "bg-primary/25" : "bg-neutral-50"}`}><span>{profile}</span><span className={`flex size-3.5 items-center justify-center rounded-full ${profile === "Standard" ? "bg-primary-foreground text-primary" : "bg-primary-foreground/10"}`}>{profile === "Standard" && <PreviewIcon kind="check" className="size-2.5" />}</span></div>)}</div>
      <div className="mt-4 flex items-center justify-between gap-2 text-[10px]"><span className="text-primary-foreground/55">Price display</span><span className="rounded-full bg-neutral-50 px-3 py-1.5">Tax-inclusive</span></div>
      <div className="mt-3 flex items-center justify-between text-xs"><span className="text-primary-foreground/55">Receipt currency</span><span className="font-medium">GH₵ · Ghana cedi</span></div>
    </Panel>
  </div>;
}

export function FeaturePreview({ kind }: { kind: FeatureKind }) {
  const previews = { insights: InsightsPreview, alerts: AlertsPreview, inventory: InventoryPreview, discounts: DiscountsPreview, ordering: OrderingPreview, payments: PaymentsPreview, fees: FeesPreview, kitchen: KitchenPreview, shifts: ShiftsPreview, tax: TaxPreview };
  const Preview = previews[kind];
  return <div aria-hidden="true" className="pointer-events-none relative h-[300px] w-full select-none font-sans text-primary-foreground transition-transform duration-500 ease-[cubic-bezier(0.2,0,0,1)] group-hover:-translate-y-1 motion-reduce:transition-none"><Preview /></div>;
}

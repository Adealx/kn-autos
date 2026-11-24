
import type { Metadata } from "next";
import Link from "next/link";
import ClearanceForm from "./ClearanceForm";
import MobileMenu from "../MobileMenu";

export const metadata: Metadata = {
  title: "Clearing & Forwarding Services | SAM-A AUTOS",
  description:
    "Speak with SAM-A AUTOS about vehicle clearing, vehicle importation, cargo clearing, freight forwarding and shipping logistics.",
  openGraph: {
    title: "Clearing & Forwarding | SAM-A AUTOS",
    description:
      "Professional assistance with vehicle clearing, cargo clearing, freight forwarding and shipping logistics.",
    type: "website",
  },
};

const WHATSAPP_NUMBER = "2348067491717";

const services = [
  {
    number: "01",
    title: "Vehicle Clearing",
    description:
      "Get assistance with the clearing process for imported vehicles and related documentation.",
  },
  {
    number: "02",
    title: "Vehicle Importation",
    description:
      "Discuss vehicle importation requirements, shipment arrangements and the steps involved.",
  },
  {
    number: "03",
    title: "Cargo Clearing",
    description:
      "Enquire about cargo clearing support and documentation for your shipment.",
  },
  {
    number: "04",
    title: "Freight Forwarding",
    description:
      "Discuss freight forwarding arrangements and shipment coordination.",
  },
  {
    number: "05",
    title: "Shipping & Logistics",
    description:
      "Get assistance planning shipping and logistics arrangements for your goods.",
  },
  {
    number: "06",
    title: "Import Documentation",
    description:
      "Get guidance on the documentation required for your importation process.",
  },
];

const process = [
  {
    number: "01",
    title: "Submit an enquiry",
    description:
      "Tell us about your vehicle, cargo or shipment requirements.",
  },
  {
    number: "02",
    title: "Discuss your requirements",
    description:
      "Our team will review your information and contact you for further details.",
  },
  {
    number: "03",
    title: "Receive guidance",
    description:
      "We'll discuss the relevant process, documentation and quotation where applicable.",
  },
  {
    number: "04",
    title: "Follow the process",
    description:
      "Stay in contact with our team as your agreed service progresses.",
  },
];

export default function ClearingForwardingPage() {
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(
    "Hello SAM-A AUTOS, I would like to enquire about your clearing and forwarding services."
  )}`;

  return (
    <main className="min-h-screen bg-white text-slate-900">
      <div className="bg-[#D7B779] px-4 py-3 text-center text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#08101F] sm:text-xs">
        SAM-A AUTOS | VEHICLE CLEARING & FORWARDING SERVICES
      </div>

      <header className="relative z-50 border-b border-white/10 bg-[#08101F] shadow-lg">
        <div className="mx-auto flex min-h-[76px] max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-xl font-extrabold tracking-tight text-white no-underline"
          >
            SAM-A <span className="text-[#D7B779]">AUTOS</span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            <Link href="/" className="text-sm font-semibold text-white hover:text-[#D7B779]">
              Home
            </Link>
            <Link href="/inventory" className="text-sm font-semibold text-white hover:text-[#D7B779]">
              Inventory
            </Link>
            <Link href="/clearing-forwarding" className="text-sm font-semibold text-[#D7B779]">
              Clearing & Forwarding
            </Link>
            <Link href="/#about" className="text-sm font-semibold text-white hover:text-[#D7B779]">
              About
            </Link>
            <Link
              href="/#contact"
              className="inline-flex min-h-11 items-center justify-center rounded-full bg-[#D7B779] px-6 py-3 text-sm font-bold text-[#08101F] no-underline hover:bg-[#EAD7AD]"
            >
              Contact Us
            </Link>
          </nav>

          <MobileMenu />
        </div>
      </header>

      <section className="relative overflow-hidden bg-[#0B1830]">
        <div className="absolute inset-0 bg-gradient-to-br from-[#142744] via-[#0B1830] to-[#08101F]" />
        <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full border border-[#D7B779]/20" />
        <div className="absolute -right-12 -top-12 h-56 w-56 rounded-full border border-[#D7B779]/20" />

        <div className="relative mx-auto max-w-7xl px-5 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-36">
          <div className="max-w-3xl">
            <p className="inline-flex rounded-full border border-[#D7B779]/40 bg-white/5 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-[#EAD7AD]">
              Clearing • Forwarding • Logistics
            </p>

            <h1 className="mt-7 text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl md:text-7xl">
              Moving your goods.
              <span className="mt-2 block text-[#E4C17F]">
                Simplifying the process.
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-base leading-8 text-slate-200 sm:text-lg">
              From vehicle clearing and importation to cargo clearing and
              freight forwarding, SAM-A AUTOS helps you discuss your shipment
              requirements and navigate the next steps with clarity.
            </p>

            <div className="mt-9 flex flex-col gap-4 sm:flex-row">
              <a
                href="#enquiry"
                className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#D7B779] px-8 py-4 text-sm font-bold text-[#08101F] no-underline transition hover:bg-[#EAD7AD]"
              >
                Request a Service
              </a>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/40 px-8 py-4 text-sm font-bold text-white no-underline transition hover:border-[#D7B779] hover:bg-white/10"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#98763B]">
            What we can help you with
          </p>
          <h2 className="mt-4 text-3xl font-black text-[#0B1830] sm:text-5xl">
            Our Services
          </h2>
          <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
            Tell us what you need. Our team will discuss your requirements and
            the appropriate next steps.
          </p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <article
              key={service.number}
              className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <span className="text-sm font-black tracking-widest text-[#98763B]">
                {service.number}
              </span>
              <h3 className="mt-5 text-xl font-black text-[#0B1830]">
                {service.title}
              </h3>
              <p className="mt-3 text-sm leading-7 text-slate-600">
                {service.description}
              </p>
              <a
                href="#enquiry"
                className="mt-6 inline-flex text-sm font-bold text-[#98763B] no-underline hover:text-[#0B1830]"
              >
                Enquire about this service →
              </a>
            </article>
          ))}
        </div>
      </section>

      <section className="bg-[#F8FAFC] py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#98763B]">
              How it works
            </p>
            <h2 className="mt-4 text-3xl font-black text-[#0B1830] sm:text-5xl">
              A clear process from enquiry to completion
            </h2>
          </div>

          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step) => (
              <div key={step.number}>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#0B1830] text-sm font-black text-[#D7B779]">
                  {step.number}
                </div>
                <h3 className="mt-5 text-lg font-black text-[#0B1830]">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-7 text-slate-600">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="enquiry" className="scroll-mt-8 bg-white py-20 sm:py-24">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#98763B]">
              Let's discuss your shipment
            </p>
            <h2 className="mt-4 text-3xl font-black leading-tight text-[#0B1830] sm:text-5xl">
              Tell us what you need.
            </h2>
            <p className="mt-6 text-sm leading-7 text-slate-600 sm:text-base">
              Complete the enquiry form with your details and shipment
              information. Our team will review your request and get in touch.
            </p>

            <div className="mt-9 rounded-2xl bg-[#0B1830] p-7 text-white">
              <p className="text-xs font-bold uppercase tracking-widest text-[#D7B779]">
                Prefer WhatsApp?
              </p>
              <h3 className="mt-3 text-xl font-black">
                Speak directly with our team.
              </h3>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex min-h-11 items-center rounded-full bg-[#D7B779] px-6 py-3 text-sm font-bold text-[#08101F] no-underline hover:bg-[#EAD7AD]"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>

          <ClearanceForm />
        </div>
      </section>

      <footer className="bg-[#08101F] px-5 py-9 text-slate-300 sm:px-6">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <Link href="/" className="text-xl font-black text-white no-underline">
              SAM-A <span className="text-[#D7B779]">AUTOS</span>
            </Link>
            <p className="mt-2 text-sm">Quality vehicles. Confident choices.</p>
          </div>

          <nav className="flex flex-wrap gap-5 text-sm">
            <Link href="/" className="text-slate-300 hover:text-[#D7B779]">Home</Link>
            <Link href="/inventory" className="text-slate-300 hover:text-[#D7B779]">Inventory</Link>
            <Link href="/clearing-forwarding" className="text-[#D7B779]">Clearing & Forwarding</Link>
          </nav>

          <p className="text-sm">
            © {new Date().getFullYear()} SAM-A AUTOS. All rights reserved.
          </p>
        </div>
      </footer>
    </main>
  );
}

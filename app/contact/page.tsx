import ContactForm from '@/components/ContactForm'
import SubmitTestimonyForm from '@/components/SubmitTestimonyForm'

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#fbf8ef] px-6 py-24 text-[#2a2a27]">
      <section className="mx-auto max-w-5xl">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#a57865]">
          Contact
        </p>

        <h1 className="text-4xl font-semibold md:text-6xl">
          Get in touch.
        </h1>

        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#2a2a27]/70">
          Have a question, want to connect, or feel called to share your testimony?
          Send us a message below.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <ContactForm />
          <SubmitTestimonyForm />
        </div>
      </section>
    </main>
  )
}
export default function Footer() {
  return (
    <footer className="border-t border-[#e6d7b8] bg-[#fbf8ef]">
      <div className="mx-auto max-w-6xl px-6 py-10">
        <p className="text-sm text-[#2f3f34]">
          © {new Date().getFullYear()} TSTMNY
        </p>

        <p className="mt-2 text-sm text-[#2a2a27]/70">
          Faith. Discipline. Movement.
        </p>
      </div>
    </footer>
  )
}
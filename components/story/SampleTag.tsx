/** Marks placeholder content so fictional stories are never mistaken for real testimony. */
export default function SampleTag({ className = '' }: { className?: string }) {
  return (
    <span className={`tag tag--sample ${className}`.trim()} title="Placeholder content — to be replaced with a real story">
      Sample story
    </span>
  )
}

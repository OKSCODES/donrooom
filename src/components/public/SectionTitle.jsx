export function SectionTitle({ eyebrow, title, description, center = false }) {
  return <div className={center ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>{eyebrow && <p className="mb-3 text-sm font-extrabold uppercase tracking-[0.22em] text-donroom-success">{eyebrow}</p>}<h2 className="text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">{title}</h2>{description && <p className="mt-4 text-base leading-7 text-black/65 sm:text-lg">{description}</p>}</div>
}

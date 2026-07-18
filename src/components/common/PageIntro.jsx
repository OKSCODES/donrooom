import { PageContainer } from './PageContainer'

export function PageIntro({ eyebrow, title, description }) {
  return <section className="py-20 sm:py-28"><PageContainer><div className="max-w-3xl"><p className="text-sm font-bold uppercase tracking-[0.2em] text-subtle">{eyebrow}</p><h1 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-6xl">{title}</h1><p className="mt-6 text-lg leading-8 text-black/65">{description}</p></div></PageContainer></section>
}

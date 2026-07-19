import { motion } from 'framer-motion'
import { BadgeCheck, HeartHandshake, ShieldCheck, Sparkles, WalletCards } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageContainer } from '../../components/common/PageContainer'
import { EmptyState } from '../../components/public/EmptyState'
import { PropertyCard } from '../../components/public/PropertyCard'
import { SearchBar } from '../../components/public/SearchBar'
import { SectionTitle } from '../../components/public/SectionTitle'
import { useSeo } from '../../hooks/useSeo'
import { buildPublicDestinations, buildPublicReviews, listApprovedProperties } from '../../services/publicPropertyService'

const reveal = { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.18 }, transition: { duration: 0.55 } }

export default function HomePage() {
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  useSeo({ title: 'Stay Local in Sohra', description: 'Discover verified homestays, cottages and boutique stays across Sohra with DONROOM.', path: '/' })

  useEffect(() => {
    let active = true
    listApprovedProperties()
      .then((rows) => { if (active) setProperties(rows) })
      .catch((err) => { if (active) setError(err.message || 'Properties could not be loaded.') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  const featured = properties.filter((property) => property.featured)
  const visibleProperties = (featured.length ? featured : properties).slice(0, 3)
  const destinations = buildPublicDestinations(properties)
  const reviews = buildPublicReviews(properties)

  return <>
    <section className="relative min-h-[720px] overflow-hidden"><img alt="Misty green hills around Sohra" className="absolute inset-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=2000&q=88"/><div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/45 to-black/15"/><PageContainer className="relative flex min-h-[720px] items-center py-20"><motion.div initial={{opacity:0,y:25}} animate={{opacity:1,y:0}} transition={{duration:.7}} className="max-w-4xl"><span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur"><Sparkles size={16}/>Locally hosted stays in Meghalaya</span><h1 className="mt-6 max-w-3xl text-5xl font-black leading-[1.02] tracking-tight text-white sm:text-7xl">Find your perfect stay in Sohra.</h1><p className="mt-6 max-w-2xl text-lg leading-8 text-white/80 sm:text-xl">Book trusted local accommodations close to waterfalls, caves, valleys and living root bridges.</p><div className="mt-9"><SearchBar/></div><div className="mt-7 flex flex-wrap gap-3"><Link className="rounded-full bg-primary-action px-6 py-3 font-extrabold text-heading transition hover:-translate-y-0.5" to="/properties">Explore properties</Link><Link className="rounded-full border border-white/35 bg-white/10 px-6 py-3 font-extrabold text-white backdrop-blur transition hover:bg-white/20" to="/register">Become a property owner</Link></div></motion.div></PageContainer><a aria-label="Scroll to featured stays" className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce rounded-full border border-white/35 p-3 text-white" href="#featured">↓</a></section>
    <section id="featured" className="py-20 sm:py-28"><PageContainer><motion.div {...reveal}><SectionTitle eyebrow="Handpicked for you" title="Featured stays in Sohra" description="Approved local properties with available rooms, loaded directly from DONROOM."/></motion.div>{loading?<p className="mt-10 rounded-3xl bg-cream p-8 text-center font-semibold text-muted">Loading approved properties…</p>:error?<EmptyState title="Properties are temporarily unavailable" description={error}/>:visibleProperties.length?<div className="mt-10 grid gap-7 lg:grid-cols-3">{visibleProperties.map((property,index)=><motion.div {...reveal} transition={{duration:.45,delay:index*.08}} key={property.id}><PropertyCard property={property}/></motion.div>)}</div>:<EmptyState title="No approved properties yet" description="Approved properties with available room information will appear here automatically."/>}</PageContainer></section>
    <section className="bg-cream py-20 sm:py-28"><PageContainer><SectionTitle eyebrow="Explore the region" title="Popular destinations" description="Choose a stay close to the landscapes and experiences that brought you to Sohra."/><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">{destinations.map(({name,description,image},i)=><motion.article {...reveal} transition={{duration:.45,delay:(i%3)*.06}} className="group relative min-h-80 overflow-hidden rounded-[2rem]" key={name}><img alt={name} loading="lazy" className="absolute inset-0 h-full w-full object-cover transition duration-500 group-hover:scale-105" src={image}/><div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"/><div className="absolute inset-x-0 bottom-0 p-6 text-white"><h3 className="text-2xl font-black">{name}</h3><p className="mt-2 text-sm leading-6 text-white/75">{description}</p><Link className="mt-4 inline-flex rounded-full bg-white px-4 py-2 text-sm font-bold text-black" to={`/properties?q=${encodeURIComponent(name)}`}>Explore stays</Link></div></motion.article>)}</div></PageContainer></section>
    <section className="py-20 sm:py-28"><PageContainer><SectionTitle center eyebrow="Why DONROOM" title="Trusted stays, genuine local hospitality" description="Designed to make discovering and booking local accommodation feel simple, secure and personal."/><div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{[[BadgeCheck,'Verified properties','Clear details and trusted local listings.'],[ShieldCheck,'Safe booking','Transparent information and secure accounts.'],[HeartHandshake,'Local hospitality','Stay with people who know Sohra best.'],[WalletCards,'Best value','Find options for every travel style and budget.']].map(([Icon,title,text])=><div className="rounded-[1.75rem] border border-default bg-white p-6 shadow-lg shadow-black/5" key={title}><span className="inline-grid h-12 w-12 place-items-center rounded-2xl bg-primary-action"><Icon size={23}/></span><h3 className="mt-5 text-xl font-black">{title}</h3><p className="mt-2 leading-7 text-muted">{text}</p></div>)}</div></PageContainer></section>
    <section className="bg-dark-surface py-20 text-white sm:py-28"><PageContainer><SectionTitle center eyebrow="Simple from start to stay" title="How DONROOM works" description="Five easy steps between inspiration and a memorable stay."/><div className="mt-12 grid gap-4 md:grid-cols-5">{['Search','Choose a room','Book','Receive confirmation','Stay'].map((step,i)=><div className="relative rounded-3xl border border-white/10 bg-white/5 p-6 text-center" key={step}><span className="mx-auto grid h-10 w-10 place-items-center rounded-full bg-primary-action font-black text-black">{i+1}</span><h3 className="mt-4 font-extrabold">{step}</h3></div>)}</div></PageContainer></section>
    <section className="py-20 sm:py-28"><PageContainer><SectionTitle eyebrow="Guest stories" title="Loved by travellers" description="Real reasons guests choose local stays and return to Meghalaya."/><div className="mt-10 grid gap-6 lg:grid-cols-3">{reviews.length ? reviews.map(review=><article className="rounded-[2rem] bg-white p-7 shadow-xl shadow-black/5" key={review.name}><p className="text-donroom-success">★★★★★</p><blockquote className="mt-4 text-lg leading-8">“{review.text}”</blockquote><p className="mt-6 font-black">{review.name}</p><p className="text-sm text-muted">{review.city}</p></article>) : <div className="lg:col-span-3 rounded-[2rem] bg-cream p-8 text-center text-muted">Guest reviews submitted for approved bookings will appear here.</div>}</div></PageContainer></section>
    <section className="pb-24"><PageContainer><div className="overflow-hidden rounded-[2.5rem] bg-primary-action p-8 sm:p-12 lg:flex lg:items-center lg:justify-between"><div><p className="font-extrabold uppercase tracking-widest text-donroom-success">Grow with local tourism</p><h2 className="mt-3 text-3xl font-black sm:text-5xl">Own a stay in Sohra?</h2><p className="mt-4 max-w-xl text-black/65">Create your account and begin the journey toward showcasing your property to thoughtful travellers.</p></div><Link className="mt-7 inline-flex rounded-full bg-dark-surface px-7 py-4 font-extrabold text-white lg:mt-0" to="/register">Register your interest</Link></div></PageContainer></section>
  </>
}

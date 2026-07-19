import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { PageContainer } from '../../components/common/PageContainer'
import { EmptyState } from '../../components/public/EmptyState'
import { PageHeader } from '../../components/public/PageHeader'
import { useSeo } from '../../hooks/useSeo'
import { buildPublicGallery, listApprovedProperties } from '../../services/publicPropertyService'

export default function GalleryPage() {
  useSeo({ title: 'Gallery', description: 'Explore approved property and room images from DONROOM stays.', path: '/gallery' })
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [category, setCategory] = useState('All')

  useEffect(() => {
    let active = true
    listApprovedProperties()
      .then((rows) => { if (active) setProperties(rows) })
      .catch((err) => { if (active) setError(err.message || 'Gallery could not be loaded.') })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [])

  const galleryImages = useMemo(() => buildPublicGallery(properties), [properties])
  const categories = useMemo(() => ['All', ...new Set(galleryImages.map((item) => item.category))], [galleryImages])
  const items = useMemo(() => category === 'All' ? galleryImages : galleryImages.filter((item) => item.category === category), [category, galleryImages])

  return <><PageHeader eyebrow="Visual journey" title="A glimpse of approved stays" description="Browse property and room images uploaded by approved DONROOM partners."/><PageContainer className="py-12"><div className="flex flex-wrap gap-2">{categories.map((item) => <button className={`rounded-full px-4 py-2 text-sm font-bold ${category === item ? 'bg-dark-surface text-white' : 'bg-white'}`} key={item} onClick={() => setCategory(item)}>{item}</button>)}</div>{loading ? <p className="mt-8 rounded-3xl bg-cream p-8 text-center text-muted">Loading gallery…</p> : error ? <EmptyState title="Gallery is temporarily unavailable" description={error}/> : items.length ? <div className="mt-8 columns-1 gap-5 sm:columns-2 lg:columns-3">{items.map((item, index) => <Link to={`/property/${item.propertyId}`} className="group relative mb-5 block break-inside-avoid overflow-hidden rounded-[1.75rem]" key={item.id}><img alt={`${item.propertyName} ${item.category}`} className={`w-full object-cover transition duration-500 group-hover:scale-105 ${index % 3 === 0 ? 'h-[430px]' : 'h-[300px]'}`} loading="lazy" src={item.image}/><span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 to-transparent p-5 pt-16 font-bold text-white">{item.propertyName}</span></Link>)}</div> : <EmptyState title="No approved gallery images yet" description="Images uploaded for approved properties will appear here automatically."/>}</PageContainer></>
}

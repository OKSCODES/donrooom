import { useEffect, useMemo, useState } from 'react'
import { PageContainer } from '../../components/common/PageContainer'
import { PropertyCard } from '../../components/public/PropertyCard'
import { useAuth } from '../../hooks/useAuth'
import { useSeo } from '../../hooks/useSeo'
import { clearRecentlyViewed, listRecentlyViewed, removeRecentlyViewed } from '../../services/guestService'
import { listApprovedProperties } from '../../services/publicPropertyService'

export default function RecentlyViewedPage() {
  const { user } = useAuth()
  const [items, setItems] = useState([])
  const [properties, setProperties] = useState([])
  useSeo({ title: 'Recently viewed', description: 'Properties you recently explored on DONROOM.', path: '/recently-viewed' })

  useEffect(() => {
    let active = true
    Promise.all([
      user ? listRecentlyViewed(user.uid) : Promise.resolve([]),
      listApprovedProperties(),
    ]).then(([history, approved]) => {
      if (active) {
        setItems(history)
        setProperties(approved)
      }
    }).catch(() => {})
    return () => { active = false }
  }, [user])

  const enriched = useMemo(() => {
    const byId = new Map(properties.map((property) => [property.id, property]))
    return items.map((item) => byId.get(item.propertyId || item.id)).filter(Boolean)
  }, [items, properties])

  return <PageContainer className="py-10"><div className="flex flex-wrap justify-between gap-4"><div><h1 className="text-4xl font-black">Recently viewed</h1><p className="mt-2 text-muted">Your latest approved property discoveries, limited to 20.</p></div>{items.length > 0 && user && <button onClick={async () => { await clearRecentlyViewed(user.uid); setItems([]) }} className="rounded-xl border border-black/15 px-4 py-2 font-bold">Clear all</button>}</div><div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">{enriched.map((property) => <div key={property.id}><PropertyCard property={property}/><button onClick={async () => { await removeRecentlyViewed(user.uid, property.id); setItems((value) => value.filter((item) => (item.propertyId || item.id) !== property.id)) }} className="mt-2 text-sm font-bold text-red-600">Remove from history</button></div>)}</div>{!enriched.length && <div className="mt-16 text-center text-muted">Approved properties you open will appear here.</div>}</PageContainer>
}

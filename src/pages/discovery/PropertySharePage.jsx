import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { PageContainer } from '../../components/common/PageContainer'
import { ShareModal } from '../../components/discovery/ShareModal'
import { getApprovedProperty } from '../../services/publicPropertyService'

export default function PropertySharePage() {
  const { id } = useParams()
  const [open, setOpen] = useState(true)
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let active = true
    getApprovedProperty(id)
      .then((item) => { if (active) setProperty(item) })
      .finally(() => { if (active) setLoading(false) })
    return () => { active = false }
  }, [id])

  if (loading) return <PageContainer className="py-20"><p className="text-center text-muted">Loading property…</p></PageContainer>
  if (!property) return <Navigate to="/properties" replace />
  if (!open) return <Navigate to={`/property/${id}`} replace />
  return <PageContainer className="py-20"><ShareModal property={property} onClose={() => setOpen(false)} /></PageContainer>
}

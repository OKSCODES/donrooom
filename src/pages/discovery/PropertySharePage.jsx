import { useState } from 'react'
import { Navigate,useParams } from 'react-router-dom'
import { PageContainer } from '../../components/common/PageContainer'
import { ShareModal } from '../../components/discovery/ShareModal'
import { properties } from '../../data/publicData'
export default function PropertySharePage(){const{id}=useParams();const[open,setOpen]=useState(true);const property=properties.find(p=>p.id===id);if(!property)return <Navigate to="/properties" replace/>;if(!open)return <Navigate to={`/property/${id}`} replace/>;return <PageContainer className="py-20"><ShareModal property={property} onClose={()=>setOpen(false)}/></PageContainer>}

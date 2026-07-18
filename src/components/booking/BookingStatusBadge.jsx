import { BOOKING_STATUS_LABELS } from '../../constants/booking'
const styles={pending:'bg-amber-100 text-amber-800',confirmed:'bg-green-100 text-green-800',rejected:'bg-red-100 text-red-800',cancelled:'bg-slate-100 text-slate-700',checked_in:'bg-blue-100 text-blue-800',checked_out:'bg-violet-100 text-violet-800',completed:'bg-emerald-100 text-emerald-800'}
export function BookingStatusBadge({status}){return <span className={`inline-flex rounded-full px-3 py-1 text-xs font-black ${styles[status]||styles.pending}`}>{BOOKING_STATUS_LABELS[status]||status}</span>}

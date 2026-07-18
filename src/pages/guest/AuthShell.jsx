import { Link } from 'react-router-dom'
import { PageContainer } from '../../components/common/PageContainer'

export function AuthShell({ title, description, alternateText, alternateLinkText, alternateTo }) {
  return <PageContainer className="max-w-lg"><section className="rounded-[2rem] border border-default bg-white p-8 shadow-[0_24px_80px_rgba(45,45,45,0.08)] sm:p-10"><p className="text-sm font-bold uppercase tracking-[0.2em] text-subtle">DONROOM</p><h1 className="mt-4 text-4xl font-extrabold tracking-tight">{title}</h1><p className="mt-4 leading-7 text-muted">{description}</p><div className="mt-8 rounded-2xl bg-donroom-cream p-5 text-sm leading-6 text-muted">Authentication UI and Firebase actions will be implemented in the authentication phase.</div><p className="mt-6 text-sm text-muted">{alternateText} <Link className="font-semibold text-black underline decoration-donroom-primary decoration-4 underline-offset-4" to={alternateTo}>{alternateLinkText}</Link></p></section></PageContainer>
}

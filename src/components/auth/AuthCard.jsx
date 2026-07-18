import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { PageContainer } from '../common/PageContainer'

export function AuthCard({ title, description, alternateText, alternateLinkText, alternateTo, children }) {
  return (
    <PageContainer className="max-w-xl">
      <motion.section
        animate={{ opacity: 1, y: 0 }}
        className="rounded-[2rem] border border-default bg-white p-6 shadow-[0_24px_80px_rgba(45,45,45,0.08)] sm:p-10"
        initial={{ opacity: 0, y: 18 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
      >
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-subtle">DONROOM</p>
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">{title}</h1>
        <p className="mt-3 leading-7 text-muted">{description}</p>
        <div className="mt-8">{children}</div>
        {alternateText ? <p className="mt-7 text-center text-sm text-muted">{alternateText} <Link className="font-semibold text-black underline decoration-donroom-primary decoration-4 underline-offset-4" to={alternateTo}>{alternateLinkText}</Link></p> : null}
      </motion.section>
    </PageContainer>
  )
}

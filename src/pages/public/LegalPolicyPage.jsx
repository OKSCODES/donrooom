import { PageContainer } from '../../components/common/PageContainer'
import { PageHeader } from '../../components/public/PageHeader'
import { useSeo } from '../../hooks/useSeo'

const policies = {
  cookies: {
    title: 'Cookie Policy',
    description: 'How DONROOM uses essential storage and optional analytics technologies.',
    sections: [
      ['Essential storage', 'DONROOM uses browser storage required for secure sessions, preferences, recently viewed stays, and reliable navigation. These technologies are necessary for the service to operate.'],
      ['Analytics', 'Analytics is disabled unless the production operator enables it. When enabled, aggregated usage events help improve search, booking conversion, and application reliability.'],
      ['Your choices', 'You may clear site data from your browser settings. Disabling essential storage can prevent authentication, saved preferences, and booking workflows from operating correctly.'],
      ['Retention', 'Browser-held preferences remain until they expire, are cleared, or are replaced. Server-side records follow the retention rules described in the Privacy Policy.'],
    ],
  },
  disclaimer: {
    title: 'Platform Disclaimer',
    description: 'Important information about accommodation listings and third-party services on DONROOM.',
    sections: [
      ['Marketplace role', 'DONROOM provides technology that connects guests with independent accommodation providers. Property owners remain responsible for the accuracy, safety, legality, and delivery of their listings and services.'],
      ['Travel information', 'Distances, nearby places, maps, photographs, availability, and local information may change. Guests should confirm critical travel and accessibility requirements before arrival.'],
      ['External services', 'Phone, email, WhatsApp, map, analytics, and Firebase services may be operated by third parties under their own terms and privacy practices.'],
      ['Service availability', 'We work to provide a reliable platform but cannot guarantee uninterrupted access during maintenance, network failures, emergencies, or events outside reasonable control.'],
    ],
  },
  refunds: {
    title: 'Cancellation & Refund Policy',
    description: 'How cancellations and refunds are handled for DONROOM bookings.',
    sections: [
      ['Property policy', 'Each property publishes its cancellation terms before booking. The policy shown in the booking summary and receipt governs cancellation eligibility unless consumer law requires otherwise.'],
      ['Payment status', 'DONROOM Version 1.0 prepares payment architecture but does not process an integrated payment gateway. Any payment or refund arranged directly with a property must be documented by the parties.'],
      ['Guest cancellations', 'Guests may cancel only while the booking status and property policy permit it. The cancellation is recorded in the booking timeline and the property owner is notified.'],
      ['Property cancellations', 'If a property rejects or cancels a confirmed stay, the guest should contact the property and DONROOM support promptly. Supporting booking records should be retained until the issue is resolved.'],
      ['Disputes', 'Submit disputes with the booking number, payment evidence, and communication history. DONROOM may review platform records but does not guarantee reimbursement for payments made outside supported platform processes.'],
    ],
  },
}

export default function LegalPolicyPage({ type = 'cookies' }) {
  const policy = policies[type] || policies.cookies
  useSeo({ title: `${policy.title} | DONROOM`, description: policy.description, canonicalPath: `/${type}` })
  return <><PageHeader eyebrow="Legal" title={policy.title} description={policy.description}/><PageContainer className="py-12 sm:py-16"><article className="prose-content mx-auto max-w-3xl rounded-3xl border border-default bg-white p-6 shadow-sm sm:p-10"><p className="text-sm font-bold text-muted">Effective: July 17, 2026</p>{policy.sections.map(([title, body])=><section key={title}><h2>{title}</h2><p>{body}</p></section>)}<h2>Contact</h2><p>Questions about this policy may be sent to support@donroom.in.</p></article></PageContainer></>
}

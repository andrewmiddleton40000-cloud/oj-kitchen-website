import { WhatsAppIcon } from './icons'
import { whatsappUrl, GENERAL_ENQUIRY } from '@/lib/order'

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl(GENERAL_ENQUIRY)}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with O.J KITCHEN on WhatsApp"
      className="group fixed right-4 bottom-4 z-40 flex items-center gap-2 rounded-full bg-forest p-3.5 text-white shadow-[0_10px_30px_-8px_rgba(39,107,69,0.6)] transition-transform hover:-translate-y-0.5 focus-visible:ring-4 focus-visible:ring-gold/60 focus-visible:outline-none motion-reduce:transition-none sm:right-6 sm:bottom-6"
    >
      <WhatsAppIcon className="size-7" />
      <span className="hidden pr-1 text-sm font-semibold sm:group-hover:inline">
        Chat with us
      </span>
    </a>
  )
}

'use client'

import {useState, useEffect, useMemo} from 'react'
import {motion} from 'motion/react'
import {stegaClean} from 'next-sanity'
import {Mail, MapPin, ChevronUp, MessageCircle} from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import {easing, duration, stagger} from '@/lib/animations'
import {openCalendly, SITE_CTA_FORM_URL} from '@/lib/site-cta'
import {urlFor} from '@/sanity/lib/image'
import type {SiteSettings} from '@/types/sanity'

interface FooterLink {
  text?: string | null
  url?: string | null
  newTab?: boolean | null
}

interface SocialLinks {
  facebook?: string | null
  instagram?: string | null
  linkedin?: string | null
  tiktok?: string | null
  x?: string | null
  youtube?: string | null
}

function isPopupCtaUrl(url: string | null | undefined) {
  const u = url?.trim() ?? ''
  if (!u) return true
  if (u.includes('calendly.com')) return true
  if (u.includes('forms.gle') || u.includes('docs.google.com/forms')) return true
  if (u === SITE_CTA_FORM_URL) return true
  return false
}

const FOOTER_SOCIAL_KEYS = new Set([
  'instagram',
  'facebook',
  'x',
  'youtube',
  'linkedin',
  'tiktok',
])

const DEFAULT_SOCIAL_LINKS: SocialLinks = {
  instagram: 'https://www.instagram.com/icollege.life',
  facebook: 'https://www.facebook.com/icollege.life',
  x: 'https://x.com/icollege_life',
  youtube: 'https://www.youtube.com/@icollegelife',
  linkedin: 'https://www.linkedin.com/company/icollege-life',
  tiktok: 'https://www.tiktok.com/@icollege.life',
}

function mapSocialLinks(settings: SiteSettings | null): SocialLinks {
  const result: SocialLinks = {}
  for (const link of settings?.socialLinks ?? []) {
    const platform = stegaClean(link.platform)
    const url = stegaClean(link.url)
    if (!platform || !url) continue
    const key = platform === 'twitter' ? 'x' : platform.toLowerCase()
    if (FOOTER_SOCIAL_KEYS.has(key)) {
      result[key as keyof SocialLinks] = url
    }
  }
  return result
}

function mapNavLinks(
  links?: Array<{text?: string | null; url?: string | null; newTab?: boolean | null}> | null,
): FooterLink[] {
  return (links ?? []).map((link) => ({
    text: link.text,
    url: link.url,
    newTab: link.newTab,
  }))
}

type FooterContentProps = {
  tagline?: string
  taglineLinkText?: string
  taglineLinkHref?: string
  aboutLinks?: FooterLink[]
  academyLinks?: FooterLink[]
  globalExperiencesLinks?: FooterLink[]
  contactAddress?: string
  contactCity?: string
  contactEmail?: string
  whatsappNumber?: string
  connectCtaText?: string
  connectCtaUrl?: string
  brandLine?: string
  socialLinks?: SocialLinks
  copyrightText?: string
  legalLinks?: FooterLink[]
  logoSrc?: string
  logoAlt?: string
}

function FooterContent({
  tagline,
  taglineLinkText,
  taglineLinkHref,
  aboutLinks = [],
  academyLinks = [],
  globalExperiencesLinks = [],
  contactAddress,
  contactCity,
  contactEmail,
  whatsappNumber,
  connectCtaText,
  connectCtaUrl,
  brandLine,
  socialLinks,
  copyrightText = 'iCollege Life',
  legalLinks = [],
  logoSrc = '/logo_nobg.png',
  logoAlt = 'iCollege Life',
}: FooterContentProps) {
  const [showBackToTop, setShowBackToTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => setShowBackToTop(window.scrollY > 500)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
  }

  const whatsappHref = (raw: string) => {
    const digits = raw.replace(/\D/g, '')
    if (!digits) return '#'
    return `https://wa.me/${digits}`
  }

  const validLegal = legalLinks.filter(
    (item): item is FooterLink & {text: string; url: string} =>
      Boolean(item?.text && item?.url),
  )

  type SocialLinkItem = {
    name: string
    href: string
    icon: React.ReactElement
  }

  const socialLinksArray: SocialLinkItem[] = [
    socialLinks?.instagram
      ? {
          name: 'Instagram',
          href: socialLinks.instagram,
          icon: (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          ),
        }
      : null,
    socialLinks?.facebook
      ? {
          name: 'Facebook',
          href: socialLinks.facebook,
          icon: (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
            </svg>
          ),
        }
      : null,
    socialLinks?.x
      ? {
          name: 'X',
          href: socialLinks.x,
          icon: (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
            </svg>
          ),
        }
      : null,
    socialLinks?.youtube
      ? {
          name: 'YouTube',
          href: socialLinks.youtube,
          icon: (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
            </svg>
          ),
        }
      : null,
    socialLinks?.linkedin
      ? {
          name: 'LinkedIn',
          href: socialLinks.linkedin,
          icon: (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          ),
        }
      : null,
    socialLinks?.tiktok
      ? {
          name: 'TikTok',
          href: socialLinks.tiktok,
          icon: (
            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
            </svg>
          ),
        }
      : null,
  ].filter((social): social is SocialLinkItem => social !== null)

  return (
    <>
      {showBackToTop && (
        <motion.button
          initial={{opacity: 0, scale: 0.8}}
          animate={{opacity: 1, scale: 1}}
          exit={{opacity: 0, scale: 0.8}}
          whileHover={{scale: 1.1}}
          whileTap={{scale: 0.9}}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-2xl transition-colors duration-300 hover:bg-primary/90"
          aria-label="Back to top"
        >
          <ChevronUp className="h-6 w-6" />
        </motion.button>
      )}

      <footer className="relative overflow-hidden bg-background text-foreground">
        <div className="absolute top-0 right-0 left-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

        <div className="container mx-auto px-6 py-14 sm:px-8 lg:px-12 md:py-16">
          {tagline && (
            <motion.div
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{duration: 0.6}}
              className="mb-10 text-center"
            >
              <p className="mx-auto max-w-3xl text-base text-foreground md:text-lg">
                {tagline}
              </p>
              {taglineLinkText && taglineLinkHref && (
                <p className="mx-auto mt-3 max-w-3xl">
                  <a
                    href={taglineLinkHref}
                    className="text-base text-primary underline underline-offset-4 transition-colors duration-200 hover:text-primary/80 md:text-lg"
                  >
                    {taglineLinkText}
                  </a>
                </p>
              )}
            </motion.div>
          )}

          <div className="mb-10 grid grid-cols-2 gap-8 md:grid-cols-4 lg:gap-10">
            <motion.div
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{delay: 0, duration: duration.slow, ease: easing.apple}}
            >
              <h3 className="mb-3 font-heading text-sm font-bold tracking-wider text-foreground uppercase">
                About
              </h3>
              <ul className="space-y-3">
                {aboutLinks
                  .filter((item) => item.text && item.url)
                  .map((item, index) => (
                    <motion.li
                      key={item.text || index}
                      initial={{opacity: 0, x: -10}}
                      whileInView={{opacity: 1, x: 0}}
                      viewport={{once: true}}
                      transition={{delay: index * stagger.list, duration: duration.fast}}
                    >
                      <Link
                        href={item.url || '#'}
                        target={item.newTab ? '_blank' : undefined}
                        rel={item.newTab ? 'noopener noreferrer' : undefined}
                        className="group relative inline-block text-sm text-foreground transition-colors duration-200 hover:text-foreground"
                      >
                        {item.text}
                        <span className="absolute bottom-0 left-0 h-px w-0 bg-border transition-all duration-300 group-hover:w-full" />
                      </Link>
                    </motion.li>
                  ))}
              </ul>
            </motion.div>

            <div>
              <h3 className="mb-3 font-heading text-sm font-bold tracking-wider text-foreground uppercase">
                Academy
              </h3>
              <ul className="space-y-3">
                {academyLinks
                  .filter((item) => item.text && item.url)
                  .map((item, index) => (
                    <li key={item.text || index}>
                      <Link
                        href={item.url || '#'}
                        target={item.newTab ? '_blank' : undefined}
                        rel={item.newTab ? 'noopener noreferrer' : undefined}
                        className="text-sm text-foreground transition-colors duration-200 hover:text-foreground"
                      >
                        {item.text}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 font-heading text-sm font-bold tracking-wider text-foreground uppercase">
                Global
              </h3>
              <ul className="space-y-3">
                {globalExperiencesLinks
                  .filter((item) => item.text && item.url)
                  .map((item, index) => (
                    <li key={item.text || index}>
                      <Link
                        href={item.url || '#'}
                        target={item.newTab ? '_blank' : undefined}
                        rel={item.newTab ? 'noopener noreferrer' : undefined}
                        className="text-sm text-foreground transition-colors duration-200 hover:text-foreground"
                      >
                        {item.text}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>

            <div>
              <h3 className="mb-3 font-heading text-sm font-bold tracking-wider text-foreground uppercase">
                Connect
              </h3>
              <ul className="space-y-3">
                {connectCtaText &&
                  (isPopupCtaUrl(connectCtaUrl) || Boolean(connectCtaUrl?.trim())) && (
                    <li>
                      {isPopupCtaUrl(connectCtaUrl) ? (
                        <button
                          type="button"
                          onClick={() =>
                            openCalendly(
                              connectCtaUrl?.trim() ? connectCtaUrl.trim() : undefined,
                            )
                          }
                          className="cursor-pointer text-left text-sm font-semibold text-primary transition-colors duration-200 hover:text-primary/85"
                        >
                          {connectCtaText}
                        </button>
                      ) : (
                        <Link
                          href={connectCtaUrl || '#'}
                          target={connectCtaUrl?.startsWith('http') ? '_blank' : undefined}
                          rel={
                            connectCtaUrl?.startsWith('http')
                              ? 'noopener noreferrer'
                              : undefined
                          }
                          className="text-sm font-semibold text-primary transition-colors duration-200 hover:text-primary/85"
                        >
                          {connectCtaText}
                        </Link>
                      )}
                    </li>
                  )}
                {contactEmail && (
                  <li className="flex items-center gap-2">
                    <Mail className="h-4 w-4 shrink-0 text-foreground/70" />
                    <a
                      href={`mailto:${contactEmail}`}
                      className="text-sm text-foreground transition-colors duration-200 hover:text-foreground"
                    >
                      {contactEmail}
                    </a>
                  </li>
                )}
                {whatsappNumber && (
                  <li className="flex items-center gap-2">
                    <MessageCircle
                      className="h-4 w-4 shrink-0 text-foreground/70"
                      aria-hidden
                    />
                    <a
                      href={whatsappHref(whatsappNumber)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-foreground transition-colors duration-200 hover:text-foreground"
                    >
                      {whatsappNumber}
                    </a>
                  </li>
                )}
                {(contactAddress || contactCity) && (
                  <li className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-foreground/70" />
                    <span className="text-sm text-foreground">
                      {contactAddress}
                      {contactAddress && contactCity ? (
                        <>
                          <br />
                          {contactCity}
                        </>
                      ) : (
                        contactCity
                      )}
                    </span>
                  </li>
                )}
              </ul>
            </div>
          </div>

          {brandLine && (
            <motion.div
              initial={{opacity: 0, y: 20}}
              whileInView={{opacity: 1, y: 0}}
              viewport={{once: true}}
              transition={{duration: 0.6}}
              className="mt-12 border-t border-border/40 pt-10"
            >
              <p className="mx-auto max-w-4xl text-center text-base leading-relaxed text-foreground md:text-lg">
                {brandLine}
              </p>
            </motion.div>
          )}

          <div className="mt-10 border-t border-border/40 pt-6">
            <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
              <Link
                href="/"
                className="shrink-0 transition-opacity duration-200 hover:opacity-80"
              >
                <Image
                  src={logoSrc}
                  alt={logoAlt}
                  width={160}
                  height={44}
                  className="h-7 w-auto lg:h-9"
                  priority
                />
              </Link>

              {socialLinksArray.length > 0 && (
                <div className="flex items-center gap-4">
                  {socialLinksArray.map((social, index) => (
                    <motion.a
                      key={social.name}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{opacity: 1, scale: 1}}
                      animate={{opacity: 1, scale: 1}}
                      transition={{
                        delay: index * 0.05,
                        duration: duration.fast,
                        ease: easing.bounce,
                      }}
                      whileHover={{
                        scale: 1.1,
                        y: -2,
                        rotate: 10,
                        transition: {duration: duration.fast, ease: easing.smooth},
                      }}
                      whileTap={{scale: 0.95}}
                      className="group relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-muted text-primary transition-all duration-200 hover:bg-muted/80"
                      aria-label={social.name}
                    >
                      <span className="absolute inset-0 scale-0 rounded-full bg-foreground/10 transition-transform duration-500 group-hover:scale-100" />
                      <span className="relative z-10">{social.icon}</span>
                    </motion.a>
                  ))}
                </div>
              )}
            </div>

            <nav
              className="mt-8 flex flex-wrap items-center justify-center gap-x-0 gap-y-2 text-center text-sm text-foreground/90"
              aria-label="Copyright and legal"
            >
              <span className="inline-flex flex-wrap items-center justify-center gap-x-0">
                <span className="text-foreground">
                  © {new Date().getFullYear()} {copyrightText}
                </span>
                {validLegal.map((item) => (
                  <span key={item.url + item.text} className="inline-flex items-center">
                    <span
                      className="px-1.5 text-foreground/40 select-none sm:px-2"
                      aria-hidden
                    >
                      |
                    </span>
                    <Link
                      href={item.url || '#'}
                      target={item.newTab ? '_blank' : undefined}
                      rel={item.newTab ? 'noopener noreferrer' : undefined}
                      className="whitespace-nowrap transition-colors duration-200 hover:text-primary"
                    >
                      {item.text}
                    </Link>
                  </span>
                ))}
              </span>
            </nav>
          </div>
        </div>
      </footer>
    </>
  )
}

export function Footer({settings}: {settings: SiteSettings | null}) {
  const logoSrc = settings?.logo?.asset
    ? urlFor(settings.logo).width(320).fit('max').url()
    : '/logo_nobg.png'

  const socialLinks = useMemo(() => {
    const mapped = mapSocialLinks(settings)
    const hasLinks = Object.values(mapped).some(Boolean)
    return hasLinks ? mapped : DEFAULT_SOCIAL_LINKS
  }, [settings])

  return (
    <FooterContent
      tagline={settings?.footerTagline ?? undefined}
      taglineLinkText={settings?.footerTaglineLinkText ?? undefined}
      taglineLinkHref={settings?.footerTaglineLinkHref ?? undefined}
      aboutLinks={mapNavLinks(settings?.footerAboutLinks)}
      academyLinks={mapNavLinks(settings?.footerAcademyLinks)}
      globalExperiencesLinks={mapNavLinks(settings?.footerGlobalLinks)}
      contactAddress={settings?.footerContactAddress ?? undefined}
      contactCity={settings?.footerContactCity ?? undefined}
      contactEmail={settings?.footerContactEmail ?? undefined}
      whatsappNumber={settings?.footerWhatsappNumber ?? undefined}
      connectCtaText={settings?.footerConnectCtaText ?? undefined}
      connectCtaUrl={settings?.footerConnectCtaUrl ?? undefined}
      brandLine={settings?.footerBrandLine ?? undefined}
      socialLinks={socialLinks}
      copyrightText={settings?.footerCopyrightName ?? settings?.siteName ?? 'iCollege Life'}
      legalLinks={mapNavLinks(settings?.footerLegalLinks)}
      logoSrc={logoSrc}
      logoAlt={settings?.logo?.alt || settings?.siteName || 'iCollege Life'}
    />
  )
}

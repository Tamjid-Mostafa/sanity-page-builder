import {PortableText, type PortableTextComponents} from 'next-sanity'
import type {PortableTextBlock} from 'next-sanity'

type PortableTextInput = PortableTextBlock[] | Array<Record<string, unknown>>
import {Image} from 'next-sanity/image'
import {urlFor} from '@/sanity/lib/image'

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

function extractText(children: React.ReactNode): string {
  if (typeof children === 'string') return children
  if (Array.isArray(children)) return children.map(extractText).join('')
  if (children && typeof children === 'object' && 'props' in children) {
    return extractText((children as {props: {children?: React.ReactNode}}).props.children)
  }
  return ''
}

const components: PortableTextComponents = {
  types: {
    image: ({value}) => {
      if (!value?.asset) return null
      return (
        <figure className="my-6">
          <Image
            src={urlFor(value).width(1200).fit('max').url()}
            alt={value.alt || ''}
            width={1200}
            height={750}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
            quality={75}
            className="rounded-lg"
          />
          {value.alt && (
            <figcaption className="mt-2 text-center text-sm text-muted">{value.alt}</figcaption>
          )}
        </figure>
      )
    },
  },
  marks: {
    strong: ({children}) => <strong className="font-medium">{children}</strong>,
    link: ({value, children}) => {
      const isExternal = value?.href?.startsWith('http')
      return (
        <a
          href={value?.href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-primary underline underline-offset-2 hover:text-primary/80"
        >
          {children}
        </a>
      )
    },
  },
  block: {
    h2: ({children}) => {
      const id = slugify(extractText(children))
      return (
        <h2 id={id} className="mt-0 mb-4 scroll-mt-20 font-heading text-3xl font-bold leading-[1.08] tracking-tight sm:text-4xl md:text-[2.625rem]">
          {children}
        </h2>
      )
    },
    h3: ({children}) => {
      const id = slugify(extractText(children))
      return <h3 id={id} className="mt-0 mb-3 scroll-mt-20 font-heading text-2xl font-semibold">{children}</h3>
    },
    h4: ({children}) => {
      const id = slugify(extractText(children))
      return <h4 id={id} className="mt-0 mb-2 scroll-mt-20 text-xl font-semibold">{children}</h4>
    },
    normal: ({children}) => <p className="mb-0 leading-relaxed">{children}</p>,
    blockquote: ({children}) => (
      <blockquote className="my-0 border-l-2 border-primary pl-4 font-semibold not-italic">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({children}) => <ul className="my-0 space-y-4">{children}</ul>,
    number: ({children}) => <ol className="my-0 ml-6 list-decimal space-y-1">{children}</ol>,
  },
  listItem: {
    bullet: ({children}) => (
      <li className="flex items-start gap-3 text-sm font-medium leading-relaxed sm:text-base">
        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
        <span>{children}</span>
      </li>
    ),
    number: ({children}) => <li className="mb-1">{children}</li>,
  },
}

export function PortableTextRenderer({value}: {value: PortableTextInput}) {
  if (!value || value.length === 0) return null
  return <PortableText value={value as PortableTextBlock[]} components={components} />
}

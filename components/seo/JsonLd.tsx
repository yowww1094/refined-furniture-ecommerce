import type { JSX } from 'react'

/**
 * Renders a single Schema.org JSON-LD <script> tag.
 *
 * Pass either a single schema object or an array of schemas — multiple
 * schemas are emitted as separate <script>s so crawlers can parse each
 * independently.
 *
 * Usage:
 *   <JsonLd schema={organizationSchema()} />
 *   <JsonLd schema={[organizationSchema(), websiteSchema()]} />
 *   <JsonLd schema={productSchema({...})} />
 */
export function JsonLd({
  schema,
  id,
}: {
  schema: Record<string, unknown> | Array<Record<string, unknown>>
  /** Optional DOM id for the <script>; useful for tests / hydration debugging. */
  id?: string
}): JSX.Element {
  const list = Array.isArray(schema) ? schema : [schema]

  return (
    <>
      {list.map((entry, idx) => {
        const key = id ?? `jsonld-${idx}`
        return (
          <script
            key={key}
            type="application/ld+json"
            id={id && list.length === 1 ? id : key}
            suppressHydrationWarning
            // Inner content is always a server-built JSON.stringify output —
            // no user-controlled input is ever interpolated raw.
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(entry).replace(/</g, '\\u003c'),
            }}
          />
        )
      })}
    </>
  )
}

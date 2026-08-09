// components/NotionBlock.tsx
'use client'

import { useState } from 'react'
import RichText from './RichText'

const calloutColors: Record<string, string> = {
  default: '#f1f1ef',
  gray_background: '#ebeced',
  brown_background: '#e9e5e3',
  orange_background: '#faebdd',
  yellow_background: '#fbf3db',
  green_background: '#edf3ec',
  blue_background: '#e7f3f8',
  purple_background: '#f6f3f9',
  pink_background: '#faf1f5',
  red_background: '#fdebec',
}

export default function NotionBlock({ block }: { block: any }) {
  const { type } = block
  const value = block[type]

  switch (type) {
    case 'paragraph':
      return (
        <p style={{ margin: '4px 0', lineHeight: 1.6 }}>
          <RichText text={value.rich_text} />
        </p>
      )

    case 'heading_1':
      return (
        <h1 style={{ fontSize: '1.875rem', fontWeight: 700, marginTop: '1.5rem' }}>
          <RichText text={value.rich_text} />
        </h1>
      )

    case 'heading_2':
      return (
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '1.25rem' }}>
          <RichText text={value.rich_text} />
        </h2>
      )

    case 'heading_3':
      return (
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '1rem' }}>
          <RichText text={value.rich_text} />
        </h3>
      )

    case 'bulleted_list_item':
      return (
        <li style={{ marginLeft: '1.5rem', lineHeight: 1.6 }}>
          <RichText text={value.rich_text} />
          {block.children?.map((c: any) => <NotionBlock key={c.id} block={c} />)}
        </li>
      )

    case 'numbered_list_item':
      return (
        <li style={{ marginLeft: '1.5rem', lineHeight: 1.6, listStyleType: 'decimal' }}>
          <RichText text={value.rich_text} />
          {block.children?.map((c: any) => <NotionBlock key={c.id} block={c} />)}
        </li>
      )

    case 'to_do':
      return (
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', margin: '4px 0' }}>
          <input type="checkbox" checked={value.checked} readOnly />
          <span style={{ textDecoration: value.checked ? 'line-through' : 'none' }}>
            <RichText text={value.rich_text} />
          </span>
        </div>
      )

    case 'quote':
      return (
        <blockquote
          style={{
            borderLeft: '3px solid #333',
            paddingLeft: '1rem',
            margin: '1rem 0',
            fontStyle: 'italic',
          }}
        >
          <RichText text={value.rich_text} />
        </blockquote>
      )

    case 'callout':
      return (
        <div
          style={{
            display: 'flex',
            gap: 12,
            padding: '1rem',
            borderRadius: 8,
            margin: '0.5rem 0',
            background: calloutColors[value.color] || calloutColors.default,
          }}
        >
          {value.icon?.emoji && <span>{value.icon.emoji}</span>}
          <div>
            <RichText text={value.rich_text} />
          </div>
        </div>
      )

    case 'toggle':
      return <Toggle block={block} />

    case 'divider':
      return <hr style={{ margin: '1.5rem 0', border: 'none', borderTop: '1px solid #eee' }} />

    case 'code':
      return (
        <pre
          style={{
            background: '#f7f6f3',
            padding: '1rem',
            borderRadius: 6,
            overflowX: 'auto',
            margin: '1rem 0',
          }}
        >
          <code>
            <RichText text={value.rich_text} />
          </code>
        </pre>
      )

    case 'image': {
      const src = value.type === 'external' ? value.external.url : value.file.url
      const caption = value.caption?.[0]?.plain_text
      return (
        <figure style={{ margin: '1rem 0' }}>
          <img src={src} alt={caption || ''} style={{ maxWidth: '100%', borderRadius: 8 }} />
          {caption && <figcaption style={{ fontSize: '0.85rem', color: '#888' }}>{caption}</figcaption>}
        </figure>
      )
    }

    case 'divider':
      return <hr />

    case 'bookmark':
      return (
        
          href={value.url}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'block',
            border: '1px solid #eee',
            borderRadius: 8,
            padding: '0.75rem 1rem',
            margin: '0.5rem 0',
            color: '#337ea9',
          }}
        >
          {value.url}
        </a>
      )

    case 'column_list':
      return (
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {block.children?.map((c: any) => <NotionBlock key={c.id} block={c} />)}
        </div>
      )

    case 'column':
      return (
        <div style={{ flex: 1 }}>
          {block.children?.map((c: any) => <NotionBlock key={c.id} block={c} />)}
        </div>
      )

    default:
      return null // block type belum di-handle, aman diabaikan
  }
}

function Toggle({ block }: { block: any }) {
  const [open, setOpen] = useState(false)
  return (
    <div style={{ margin: '4px 0' }}>
      <div
        onClick={() => setOpen(!open)}
        style={{ cursor: 'pointer', display: 'flex', gap: 6, alignItems: 'center' }}
      >
        <span style={{ transform: open ? 'rotate(90deg)' : 'none', display: 'inline-block' }}>▶</span>
        <RichText text={block.toggle.rich_text} />
      </div>
      {open && (
        <div style={{ marginLeft: '1.5rem' }}>
          {block.children?.map((c: any) => <NotionBlock key={c.id} block={c} />)}
        </div>
      )}
    </div>
  )
}
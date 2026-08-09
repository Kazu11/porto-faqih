// components/NotionBlock.tsx
'use client'

import { useState } from 'react'
import RichText from './RichText'

// Palet warna versi DARK MODE (sesuai tampilan Notion kamu yang gelap)
const bgColors: Record<string, string> = {
  gray_background: '#3f3f3f',
  brown_background: '#4a3228',
  orange_background: '#5c3b23',
  yellow_background: '#564328',
  green_background: '#243831',
  blue_background: '#143a4e',
  purple_background: '#3c2d49',
  pink_background: '#4e2c3c',
  red_background: '#522e2a',
}

const textColors: Record<string, string> = {
  gray: '#979A9B',
  brown: '#937264',
  orange: '#FFA344',
  yellow: '#FFDC49',
  green: '#4DAB9A',
  blue: '#529CCA',
  purple: '#9A6DD7',
  pink: '#E255A1',
  red: '#FF7369',
}

// Terapkan warna Notion (bisa background atau teks) ke style
function colorStyle(color: string | undefined): React.CSSProperties {
  if (!color || color === 'default') return {}
  if (color.endsWith('_background')) {
    return {
      background: bgColors[color] || 'transparent',
      padding: '2px 8px',
      borderRadius: 4,
      display: 'inline-block',
    }
  }
  return { color: textColors[color] || undefined }
}

export default function NotionBlock({ block }: { block: any }) {
  const { type } = block
  const value = block[type]

  switch (type) {
    case 'paragraph':
      return (
        <p style={{ margin: '4px 0', lineHeight: 1.6, ...colorStyle(value.color) }}>
          <RichText text={value.rich_text} />
        </p>
      )

    case 'heading_1':
      return (
        <h1 style={{ fontSize: '1.875rem', fontWeight: 700, marginTop: '1.5rem', ...colorStyle(value.color) }}>
          <RichText text={value.rich_text} />
        </h1>
      )

    case 'heading_2':
      return (
        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginTop: '1.25rem', ...colorStyle(value.color) }}>
          <RichText text={value.rich_text} />
        </h2>
      )

    case 'heading_3':
      return (
        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginTop: '1rem', ...colorStyle(value.color) }}>
          <RichText text={value.rich_text} />
        </h3>
      )

    case 'bulleted_list_item':
      return (
        <li style={{ marginLeft: '1.5rem', lineHeight: 1.6, ...colorStyle(value.color) }}>
          <RichText text={value.rich_text} />
          {block.children?.map((c: any) => <NotionBlock key={c.id} block={c} />)}
        </li>
      )

    case 'numbered_list_item':
      return (
        <li style={{ marginLeft: '1.5rem', lineHeight: 1.6, listStyleType: 'decimal', ...colorStyle(value.color) }}>
          <RichText text={value.rich_text} />
          {block.children?.map((c: any) => <NotionBlock key={c.id} block={c} />)}
        </li>
      )

    case 'to_do':
      return (
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', margin: '4px 0' }}>
          <input type="checkbox" checked={value.checked} readOnly />
          <span style={{ textDecoration: value.checked ? 'line-through' : 'none', ...colorStyle(value.color) }}>
            <RichText text={value.rich_text} />
          </span>
        </div>
      )

    case 'quote':
      return (
        <blockquote
          style={{
            borderLeft: '3px solid #555',
            paddingLeft: '1rem',
            margin: '1rem 0',
            fontStyle: 'italic',
            ...colorStyle(value.color),
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
            background: bgColors[value.color] || '#3f3f3f',
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
      return <hr style={{ margin: '1.5rem 0', border: 'none', borderTop: '1px solid #333' }} />

    case 'code':
      return (
        <pre
          style={{
            background: '#2b2b2b',
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

    case 'bookmark':
      return (
        
        <a href={value.url}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'block',
            border: '1px solid #333',
            borderRadius: 8,
            padding: '0.75rem 1rem',
            margin: '0.5rem 0',
            color: '#529CCA',
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
      return null
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
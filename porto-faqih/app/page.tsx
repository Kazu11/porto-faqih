// app/page.tsx
import { getBlocksWithChildren, notion } from '@/lib/notion-block'
import NotionBlock from '@/components/NotionBlock'
import SocialButtons from '@/components/SocialButtons'

export default async function Home() {
  const pageId = process.env.NOTION_PAGE_ID!

  const [page, blocks] = await Promise.all([
    notion.pages.retrieve({ page_id: pageId }) as any,
    getBlocksWithChildren(pageId),
  ])

  const icon = page.icon?.emoji
  const coverUrl = page.cover
    ? page.cover.type === 'external'
      ? page.cover.external.url
      : page.cover.file.url
    : null

  return (
    <main
      style={{
        maxWidth: 720,
        margin: '0 auto',
        fontFamily: 'sans-serif',
        color: '#e6e6e6',
        background: '#000',
        minHeight: '100vh',
      }}
    >
      {coverUrl && (
        <div style={{ width: '100%', height: 220, overflow: 'hidden' }}>
          <img
            src={coverUrl}
            alt="cover"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      )}

      <div style={{ padding: '0 2rem' }}>
        {icon && (
          <div style={{ fontSize: '3rem', marginTop: coverUrl ? -32 : '2rem' }}>
            {icon}
          </div>
        )}

        <div style={{ paddingBottom: '3rem' }}>
          {blocks.map((block) => (
            <NotionBlock key={block.id} block={block} />
          ))}

          <SocialButtons />
        </div>
      </div>
    </main>
  )
}
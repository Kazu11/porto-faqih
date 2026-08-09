import { getBlocksWithChildren } from '@/lib/notion-blocks'
import NotionBlock from '@/components/NotionBlock'

export default async function Home() {
  const pageId = process.env.NOTION_PAGE_ID!
  const blocks = await getBlocksWithChildren(pageId)

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '2rem', fontFamily: 'sans-serif' }}>
      {blocks.map((block) => (
        <NotionBlock key={block.id} block={block} />
      ))}
    </main>
  )
}
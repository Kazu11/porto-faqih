import { Client } from '@notionhq/client'
import { NotionToMarkdown } from 'notion-to-md'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const notion = new Client({ auth: process.env.NOTION_TOKEN })
const n2m = new NotionToMarkdown({ notionClient: notion })

export default async function Home() {
  const pageId = process.env.NOTION_PAGE_ID!

  const mdBlocks = await n2m.pageToMarkdown(pageId)
  const mdString = n2m.toMarkdownString(mdBlocks)

  return (
    <main style={{ maxWidth: 720, margin: '0 auto', padding: '2rem' }}>
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {mdString.parent}
      </ReactMarkdown>
    </main>
  )
}
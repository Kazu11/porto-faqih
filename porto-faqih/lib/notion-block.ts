// lib/notion-blocks.ts
import { Client } from '@notionhq/client'

export const notion = new Client({ auth: process.env.NOTION_TOKEN })

export async function getBlocksWithChildren(blockId: string): Promise<any[]> {
  const blocks: any[] = []
  let cursor: string | undefined = undefined

  do {
    const res: any = await notion.blocks.children.list({
      block_id: blockId,
      start_cursor: cursor,
      page_size: 100,
    })
    blocks.push(...res.results)
    cursor = res.next_cursor ?? undefined
  } while (cursor)

  for (const block of blocks) {
    if (block.has_children) {
      block.children = await getBlocksWithChildren(block.id)
    }
  }

  return blocks
}
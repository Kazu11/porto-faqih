// components/RichText.tsx
export default function RichText({ text }: { text: any[] }) {
  if (!text) return null

  return (
    <>
      {text.map((t, i) => {
        const {
          annotations: { bold, italic, strikethrough, underline, code, color },
          plain_text,
          href,
        } = t

        let el = <>{plain_text}</>

        if (code) el = <code style={{ background: '#eee', padding: '2px 4px', borderRadius: 4 }}>{plain_text}</code>
        if (bold) el = <strong>{el}</strong>
        if (italic) el = <em>{el}</em>
        if (strikethrough) el = <s>{el}</s>
        if (underline) el = <u>{el}</u>
        if (href) el = <a href={href} style={{ color: '#337ea9' }}>{el}</a>

        return (
          <span key={i} style={color !== 'default' ? { color } : undefined}>
            {el}
          </span>
        )
      })}
    </>
  )
}
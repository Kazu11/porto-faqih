const links = [
  { label: 'Github', href: 'https://github.com/Kazu11', icon: '🐙' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/abdullahfaqih4/', icon: '💼' },
  { label: 'Instagram', href: 'https://www.instagram.com/abd.fq', icon: '📸' },
]

export default function SocialButtons() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', margin: '1rem 0' }}>
      {links.map((l) => (
        
        <a  key={l.label}
          href={l.href}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            padding: '0.5rem 1rem',
            borderRadius: 8,
            border: '1px solid #333',
            background: '#1a1a1a',
            color: '#e6e6e6',
            textDecoration: 'none',
            fontWeight: 600,
          }}
        >
          <span>{l.icon}</span>
          {l.label}
        </a>
      ))}
    </div>
  )
}
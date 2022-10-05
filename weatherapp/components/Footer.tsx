import Link from 'next/link'

export default function Footer() {
  return (
    <footer>
      <h3>Gå til</h3>
      <nav>
        <Link href="/">Hjem</Link>
        <Link href="/about">Om oss</Link>
        <Link href="/contact">Kontakt</Link>
      </nav>
    </footer>
  )
}

import Link from 'next/link'

export default function Polls() {
  return (
    <>
      <h1>Polls</h1>
      <Link href="/polls/new">Lag ny poll</Link>
    </>
  )
}

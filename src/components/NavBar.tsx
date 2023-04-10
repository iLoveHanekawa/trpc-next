import Link from 'next/link'

export default function NavBar() {
    return <div className = 'w-screen bg-yellow-300'>
        <Link href={'/'}>Home</Link>
        <Link href={'/artists'}>Artists</Link>
        <Link href={'/albums'}>Albums</Link>
    </div>
}
import Link from 'next/link'

export default function NavBar() {
    return <div className = 'w-screen bg-yellow-300 py-2 shadow-sm shadow-gray-400 text-lg text-gray-700 tracking-wider pl-5 gap-3 flex'>
        <Link href={'/'}>Home</Link>
        <Link href={'/artists'}>Artists</Link>
        <Link href={'/albums'}>Albums</Link>
    </div>
}
import { client } from "@/utils/trpc"
import { useState, FormEvent } from 'react'
import Link from "next/link"

type Album = {
    title: string
    artistId: string
    delId: string
    updateId: string
    updateTitle: string
}

export default function AlbumsPage() {

    const [album, setAlbum] = useState<Album>({ title: '', artistId: '', delId: '', updateId: '', updateTitle: '' })

    const addMutation = client.album.create.useMutation()
    const delMutation = client.album.delete.useMutation()
    const { data } = client.album.findmany.useQuery()

    return <div className = 'flex flex-col mx-3 mt-3'>
    <div className = 'text-5xl mb-3 text-gray-700'>Albums</div>
    <hr />
    <ul className = 'my-5 border-2 border-gray-300 px-5 pb-2 flex flex-col'>
        <div className = 'w-full mb-3 py-3 tracking-wider font-semibold text-gray-700 border-b flex items-center'>
            <div className = 'w-1/3'>Album</div>
            <div className = 'w-1/3'>Artist</div>
            <div>ID</div>
        </div>
        {data?.map((val, i) => {
            return <li className = 'text-gray-500 pb-1 w-full flex items-center' key = {i}>
                <Link href = {`/albums/${val.id}`} className = 'w-1/3'>
                    {val.title}                 
                </Link>
                <Link href={`/artists/${val.artist.id}`} className = 'w-1/3'>
                    {val.artist.name}
                </Link>
                <div>
                    {val.id}
                </div>
            </li>
        })}
    </ul>
    <form onSubmit={(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        addMutation.mutate({ title: album.title, artistId: album.artistId })
        setAlbum({ ...album, title: '', artistId: ''})
    }}>
        <input placeholder="Title" value = {album.title} onChange = {event => {
            setAlbum({...album, title: event.currentTarget.value})
        }} className = 'border-2 py-1 border-gray-300 rounded-md mr-2 indent-2' />
        <input placeholder="Artist Id" value = {album.artistId} onChange = {event => {
            setAlbum({...album, artistId: event.currentTarget.value})
        }} className = 'border-2 py-1 border-gray-300 rounded-md mr-2 indent-2' />
        <button className = 'bg-blue-300 text-white text-sm rounded-full px-4 py-1'>Add Album</button>
    </form>
    <form onSubmit = {(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        delMutation.mutate({ id: album.delId })
        setAlbum({ ...album, delId: '' })
    }} className = 'mt-2'>
        <input placeholder="Delete Id" value = {album.delId} onChange = {event => {
            setAlbum({...album, delId: event.currentTarget.value})
        }} className = 'border-2 py-1 border-gray-300 rounded-md mr-2 indent-2' />
        <button className = 'bg-red-300 text-white text-sm rounded-full px-4 py-1'>Delete Album</button>
    </form>
    <form className = 'mt-2'>
        <input placeholder="Update Id" value = {album.updateId} onChange = {event => {
            setAlbum({...album, updateId: event.currentTarget.value})
        }} className = 'border-2 py-1 border-gray-300 rounded-md mr-2 indent-2' />
        <input placeholder="Update Title" value = {album.updateTitle} onChange = {event => {
            setAlbum({...album, updateTitle: event.currentTarget.value})
        }} className = 'border-2 py-1 border-gray-300 rounded-md mr-2 indent-2' />
        <button className = 'bg-green-300 text-white text-sm rounded-full px-4 py-1'>Update Album</button>
    </form>
</div>
}
import { client } from "@/utils/trpc"
import { useState, FormEvent } from 'react'
import Link from "next/link"

type Artist = {
    name: string,
    delId: string,
    updateId: string,
    updateName: string
}

export default function ArtistPage() {

    const [ artist, setArtist ] = useState<Artist>({ name: '', delId: '', updateId: '', updateName: '' })

    const addMutation = client.artist.create.useMutation()
    const delMutation = client.artist.delete.useMutation()
    const updateMutation = client.artist.update.useMutation()
    const { data } = client.artist.findmany.useQuery()

    return <div className = 'flex flex-col mx-3 mt-3'>
        <div className = 'text-5xl mb-3 text-gray-700'>Artists</div>
        <hr />
        <ul className = 'my-5 border-2 border-gray-300 px-5 pb-2 flex flex-col'>
            <div className = 'w-full mb-3 py-3 tracking-wider font-semibold text-gray-700 border-b flex items-center'>
                <div className = 'w-1/2'>Artist</div>
                <div>ID</div>
            </div>
            {data?.map((val, i) => {
                return <li className = 'text-gray-500 pb-1 w-full flex items-center' key = {i}>
                    <Link href = {`/artists/${val.id}`} className = 'w-1/2'>
                        {val.name}                 
                    </Link>
                    <div>
                        {val.id}
                    </div>
                </li>
            })}
        </ul>
        <form onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            addMutation.mutate({ name: artist.name })
            setArtist({ ...artist, name: '' })
        }}>
            <input placeholder="Name" value = {artist.name} onChange = {event => {
                setArtist({ ...artist, name: event.currentTarget.value })
            }} className = 'border-2 border-gray-300 py-1 rounded-md mr-2 indent-2' />
            <button className = 'bg-blue-300 text-white text-sm rounded-full px-4 py-1'>Add Artist</button>
        </form>
        <form onSubmit = {(event: FormEvent<HTMLFormElement>) => {
            event.preventDefault()
            delMutation.mutate({ id: artist.delId })
            setArtist({ ...artist, delId: '' })
        }} className = 'mt-2'>
            <input placeholder="Delete Id" value = {artist.delId} onChange = {event => {
                setArtist({...artist, delId: event.currentTarget.value})
            }} className = 'border-2 py-1 border-gray-300 rounded-md mr-2 indent-2' />
            <button className = 'bg-red-300 text-white text-sm rounded-full px-4 py-1'>Delete Artist</button>
        </form>
        <form onSubmit = {event => {
            event.preventDefault()
            updateMutation.mutate({ id: artist.updateId, name: artist.updateName })
            setArtist({...artist, updateId: '', updateName: ''})
        }} className = 'mt-2'>
            <input placeholder="Update Id" value = {artist.updateId} onChange = {event => {
                setArtist({...artist, updateId: event.currentTarget.value})
            }} className = 'border-2 py-1 border-gray-300 rounded-md mr-2 indent-2' />
            <input placeholder="Update Name" value = {artist.updateName} onChange = {event => {
                setArtist({...artist, updateName: event.currentTarget.value})
            }} className = 'border-2 py-1 border-gray-300 rounded-md mr-2 indent-2' />
            <button className = 'bg-green-300 text-white text-sm rounded-full px-4 py-1'>Update Artist</button>
        </form>
    </div>
}
import { client } from "@/utils/trpc"
import { useState, FormEvent } from 'react'

export default function ArtistPage() {

    const [ name, setName ] = useState<string>('')

    const addMutation = client.artist.create.useMutation()
    const { data } = client.artist.findmany.useQuery()

    return <div className = 'flex flex-col ml-3 mt-3'>
        <div>Artists</div>
        <ul>
            {data?.map((val, i) => {
                return <li key = {i}>
                    {val.name}
                </li>
            })}
        </ul>
        <form onSubmit={(e: FormEvent<HTMLFormElement>) => {
            e.preventDefault()
            addMutation.mutate({ name })
            setName('')
        }}>
            <input placeholder="Name" value = {name} onChange = {event => {
                setName(event.currentTarget.value)
            }} className = 'border-2 border-gray-300 rounded-md mr-2 indent-1' />
            <button className = 'bg-blue-300 text-white text-sm rounded-full px-4 py-1'>Add Artist</button>
        </form>
    </div>
}
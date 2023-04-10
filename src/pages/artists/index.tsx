import { client } from "@/utils/trpc"
import { useState, FormEvent } from 'react'

export default function ArtistPage() {

    const [ name, setName ] = useState<string>('')

    const addMutation = client.artist.create.useMutation()
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
                    <div className = 'w-1/2'>
                        {val.name}                 
                    </div>
                    <div>
                        {val.id}
                    </div>
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
            }} className = 'border-2 border-gray-300 py-1 rounded-md mr-2 indent-2' />
            <button className = 'bg-blue-300 text-white text-sm rounded-full px-4 py-1'>Add Artist</button>
        </form>
    </div>
}
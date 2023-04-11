import { client } from '@/utils/trpc'
import { useRouter } from 'next/router'

export default function Artist() {
    const router = useRouter()
    const { artistId } = router.query
    const { data, isLoading } = client.artist.findone.useQuery({ id: artistId as string})
    if(isLoading) return <div>Loading...</div>
    return <div className = 'flex flex-col ml-5 mt-5'>
        <div className = 'text-5xl text-gray-700 font-semibold pb-3'>{ data?.name }</div>
        <hr />
        <div className = 'text-3xl text-gray-600 mt-3 mb-1'>Albums</div>
        <ul className = 'pb-1'>
            {data?.albums.map((val, i) => {
                return <li className = 'ml-5 text-gray-500' key = {i}>
                    <div>{val.title}</div>
                </li>
            })}
        </ul>
        <hr />
    </div>
}
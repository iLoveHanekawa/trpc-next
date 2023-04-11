import { client } from "@/utils/trpc"
import { useRouter } from "next/router"

export default function Album() {

    const router = useRouter()
    const { albumId } = router.query as { albumId: string }
    const { data, isLoading } = client.album.findone.useQuery({ id: albumId })
    if(isLoading) return <div>Loading...</div>
    return <div className = 'flex flex-col ml-5 mt-5'>
        <div className = 'text-5xl text-gray-700 font-semibold pb-3'>{data?.title}</div>
        <hr />
        <div className = 'text-3xl text-gray-600 mt-3 mb-1'>Artist</div>
        <div className = 'ml-5 mb-1 text-gray-500'>{data?.artist.name}</div>
        <hr />
        <div className = 'text-3xl text-gray-600 mt-3 mb-1'>Other albums by {data?.artist.name}</div>
        <ul>
            {data?.artist.albums.map((val, i) => {
                return <li className = 'ml-5 text-gray-500' key = {i}>
                    <div>{val.title}</div>
                </li>
            })}
        </ul>
        <hr />
    </div>
}
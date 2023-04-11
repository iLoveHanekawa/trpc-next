import { client } from "@/utils/trpc"
import { useRouter } from "next/router"

export default function Album() {

    const router = useRouter()
    const { albumId } = router.query as { albumId: string }
    const { data, isLoading } = client.album.findone.useQuery({ id: albumId })
    if(isLoading) return <div>Loading...</div>
    return <div className = 'flex flex-col ml-3'>
        <div>{data?.title}</div>
    </div>
}
import { client } from "@/utils/trpc"
import { useRouter } from "next/router"

export default function Album() {

    const router = useRouter()
    const { albumId } = router.query as { albumId: string }
    const { data } = client.album.findone.useQuery({ id: albumId })
    return <div className = 'flex flex-col ml-3'>
        <div>{data?.title}</div>
    </div>
}
import { client } from '@/utils/trpc'
import { useRouter } from 'next/router'

export default function Artist() {
    const router = useRouter()
    const { artistId } = router.query
    const { data, isLoading } = client.artist.findone.useQuery({ id: artistId as string})
    if(isLoading) return <div>Loading...</div>
    return <div>{ data?.name }</div>
}
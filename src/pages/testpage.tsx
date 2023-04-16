import { client } from "@/utils/trpc"

export default function TestPage() {

    const { data, isLoading, error } = client.album.test.useQuery({ substring: 't' })

    if(isLoading) return <div>Loading...</div>
    else if(error instanceof Error) return <div>{error.message}</div>

    return <ul>
        {data?.map((val, i) => {
            return <li key = {i}>
                <div>{val.name}</div>
            </li>
        })}
    </ul>
}
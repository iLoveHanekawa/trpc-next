import { z } from 'zod'
import { procedure, router } from '../trpc'

export const appRouter = router({
    hello: procedure.input(z.object({
        text: z.string()
    })).query(req => {
        const { input } = req
        return {
            greeting: `hello ${input.text}`
        }
    })
})

export type AppRouter = typeof appRouter
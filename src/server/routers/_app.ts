import { z } from 'zod'
import { procedure, router } from '../trpc'
import { artistRouter } from './artist'

export const appRouter = router({
    hello: procedure.input(z.object({
        text: z.string()
    })).query(req => {
        const { input } = req
        return {
            greeting: `hello ${input.text}`
        }
    }),
    artist: artistRouter
})

export type AppRouter = typeof appRouter

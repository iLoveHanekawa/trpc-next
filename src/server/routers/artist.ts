import { prisma } from "../../../lib/prisma";
import { procedure, router } from "../trpc";
import { z } from 'zod'

export const artistRouter = router({
    create: procedure.input(z.object({
        name: z.string()
    })).mutation(async (req) => {
        const { input } = req
        const artist = await prisma.artist.create({
            data: {
                name: input.name
            },
            select: {
                name: true,
                id: true
            }
        }) 
        return artist
    }),
    findmany: procedure.query(async () => {
        const artists = await prisma.artist.findMany({
            select: {
                id: true,
                name: true,
            }
        })
        return artists
    })
})
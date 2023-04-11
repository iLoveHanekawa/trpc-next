import { prisma } from "../../../lib/prisma";
import { router, procedure } from "../trpc";
import { z } from 'zod'

export const albumRouter = router({
    create: procedure.input(z.object({
        title: z.string(),
        artistId: z.string()
    })).mutation(async (req) => {
        const { input } = req
        const album = await prisma.album.create({
            data: {
                title: input.title,
                artistId: input.artistId
            }
        })
        return album
    }),
    findmany: procedure.query(async() => {
        const albums = await prisma.album.findMany({
            select: {
                id: true,
                title: true,
                artist: {
                    select: {
                        id: true,
                        name: true
                    }
                }
            }
        })
        return albums
    }),
    findone: procedure.input(z.object({
        id: z.string()
    })).query(async(req) => {
        const { input } = req
        const album = await prisma.album.findUnique({
            select: {
                title: true,
                id: true,
                artist: {
                    select: {
                        name: true,
                        albums: {
                            select: {
                                title: true
                            }
                        }
                    }
                }
            },
            where: {
                id: input.id
            }
        })
        return album
    })
})
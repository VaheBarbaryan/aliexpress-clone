import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export default defineEventHandler(async (event) => {
    const address = await prisma.addresses.findFirst({
        where: { userId: Number(event.context.params.userId) },
    })

    return address
})
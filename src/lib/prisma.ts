import {PrismaClient} from '@prisma/client'

const prismaClientSingleton = () => {
    return new PrismaClient()
}

type prismaClientSingleton = ReturnType<typeof prismaClientSingleton>;

const globalForPrisma = globalThis as unknown as {prima: PrismaClient | undefined};

const prisma = globalForPrisma.prima ?? prismaClientSingleton();

if(process.env.NODE_ENV !== 'production') globalForPrisma.prima = prisma;

export default prisma;
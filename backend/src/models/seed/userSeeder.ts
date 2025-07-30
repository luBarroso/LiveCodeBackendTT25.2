import { fakerPT_BR } from "@faker-js/faker";
import { Prisma, PrismaClient } from "../../generated/prisma";

export async function userSeeder(prisma: PrismaClient, numUsers: number) {
    let users: Prisma.UserCreateInput[] = [];
    for (let i = 0; i < numUsers; i++) {
        users.push({
            name: fakerPT_BR.internet.username(),
            email: fakerPT_BR.internet.email(),
            password: "#123456A"
        });
    }

    await prisma.user.createMany({
        data: users
    })
}
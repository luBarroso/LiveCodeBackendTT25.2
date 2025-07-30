import { PrismaClient } from "../../generated/prisma";
import { userSeeder } from "./userSeeder";
import { postSeeder } from "./postSeeder";

const prisma = new PrismaClient();
async function main() {
    await prisma.$connect();
    await userSeeder(prisma, 20);
    await postSeeder(prisma, 20);
}

main().then(async () => {
    await prisma.$disconnect();
}).catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
})
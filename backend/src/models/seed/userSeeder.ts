import { fakerPT_BR } from "@faker-js/faker";
import { Prisma, PrismaClient } from "../../generated/prisma";
import auth from "../../config/auth";

export async function userSeeder(prisma: PrismaClient, numUsers: number) {
  let users: Prisma.UserCreateInput[] = [];
  for (let i = 0; i < numUsers; i++) {
    const { hash, salt } = auth.generatePassword("#123456A");
    users.push({
      name: fakerPT_BR.internet.username(),
      email: fakerPT_BR.internet.email(),
      hash: hash,
      salt: salt,
    });
  }

  await prisma.user.createMany({
    data: users,
  });
}

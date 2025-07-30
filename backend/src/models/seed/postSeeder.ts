import { fakerPT_BR } from "@faker-js/faker";
import { Prisma, PrismaClient, Status } from "../../generated/prisma";

export async function postSeeder(prisma: PrismaClient, numPosts: number) {
  const users = await prisma.user.findMany();

  if (users.length === 0) {
    throw new Error("Você precisa ter usuários para criar posts.");
  }

  const statuses: Status[] = ["PUBLIC", "PRIVATE"];
  const posts: Prisma.PostCreateManyInput[] = [];

  for (let i = 0; i < numPosts; i++) {
    const sender = fakerPT_BR.helpers.arrayElement(users);
    const recipient = fakerPT_BR.helpers.arrayElement(users);

    posts.push({
      tittle: fakerPT_BR.lorem.sentence(12),
      content: fakerPT_BR.lorem.paragraph(20),
      imageUrl: fakerPT_BR.image.urlPicsumPhotos(),
      status: fakerPT_BR.helpers.arrayElement(statuses),
      senderEmail: sender.email,
      recipientEmail: recipient.email === sender.email ? null : recipient.email,
    });
  }

  await prisma.post.createMany({ data: posts });
}

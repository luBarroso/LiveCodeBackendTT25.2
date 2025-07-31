import { Response, Request } from "express";
import { PrismaClient } from "../generated/prisma";
import { createPost, updatePost, postParams } from "../schemas/post.schema";

const prisma = new PrismaClient();

class PostagemController {
  public async create(req: Request, res: Response) {
    try {
      const id = req.user as string;
      const user = await prisma.user.findUnique({
        where: { id: id },
      });
      if (!user) {
        return res
          .status(404)
          .json({ message: "Usuário remetente não encontrado" });
      }

      const { tittle, content, status, recipientEmail } = createPost.parse(
        req.body
      );
      const file = req.file;

      const image = file ? `/uploads/photos/${file.filename}` : undefined;

      if (status === "PRIVATE" && recipientEmail) {
        const destinatario = await prisma.user.findUnique({
          where: { email: recipientEmail },
        });

        if (!destinatario) {
          return res
            .status(404)
            .json({ message: "Destinatário não encontrado." });
        }
      }

      const createdPostagem = await prisma.post.create({
        data: {
          tittle: tittle,
          content: content,
          imageUrl: image,
          status: status,
          senderEmail: user.email,
          recipientEmail: status === "PRIVATE" ? recipientEmail : null,
        },
      });

      return res.status(201).json(createdPostagem);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  public async read(req: Request, res: Response) {
    try {
      const { idPost } = postParams.parse(req.params);

      const foundPostagem = await prisma.post.findUnique({
        where: {
          id: Number(idPost),
        },
      });

      if (!foundPostagem) {
        return res.status(404).json({ message: "Postagem não encontrada." });
      }

      return res.status(200).json(foundPostagem);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  public async readAll(req: Request, res: Response) {
    try {
      const foundPostagens = await prisma.post.findMany({});

      return res.status(200).json(foundPostagens);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const id = req.user as string;
      const user = await prisma.user.findUnique({
        where: { id: id },
      });
      if (!user) {
        return res
          .status(404)
          .json({ message: "Usuário remetente não encontrado" });
      }

      const { idPost } = postParams.parse(req.params);
      const { tittle, content } = updatePost.parse(req.body);
      const file = req.file;

      const postagem = await prisma.post.findUnique({
        where: { id: Number(idPost) },
      });

      if (!postagem) {
        return res.status(404).json({ message: "Postagem não encontrada." });
      }

      if (postagem.senderEmail !== user.email) {
        return res
          .status(403)
          .json({ message: "Usuário não é o autor da postagem." });
      }

      const image = file
        ? `/uploads/photos/${file.filename}`
        : postagem.imageUrl;

      const updatedPostagem = await prisma.post.update({
        where: { id: Number(idPost) },
        data: {
          tittle: tittle,
          content: content,
          imageUrl: image,
        },
      });

      return res.status(200).json(updatedPostagem);
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const id = req.user as string;
      const user = await prisma.user.findUnique({
        where: { id: id },
      });
      if (!user) {
        return res
          .status(404)
          .json({ message: "Usuário remetente não encontrado" });
      }

      const { idPost } = postParams.parse(req.params);

      const postagem = await prisma.post.findUnique({
        where: { id: Number(idPost) },
      });

      if (!postagem) {
        return res.status(404).json({ message: "Postagem não encontrada." });
      }

      if (postagem.senderEmail !== user.email) {
        return res
          .status(403)
          .json({ message: "Usuário não é o autor da postagem." });
      }

      await prisma.post.delete({
        where: { id: Number(idPost) },
      });

      return res
        .status(200)
        .json({ message: "Postagem deletada com sucesso." });
    } catch (error: any) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default new PostagemController();

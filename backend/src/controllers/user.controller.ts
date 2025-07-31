import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";
import auth from "../config/auth";
import { createUser, updateUser, userParams } from "../schemas/user.schema";

const prisma = new PrismaClient();

class UserController {
  public async create(req: Request, res: Response) {
    try {
      const parsed = createUser.parse(req.body);

      const existingUser = await prisma.user.findUnique({
        where: { email: parsed.email },
      });

      if (existingUser) {
        res.status(409).json({ message: "Email já cadastrado" });
        return;
      }

      const { hash, salt } = auth.generatePassword(parsed.password);

      const createdUser = await prisma.user.create({
        data: {
          name: parsed.name,
          email: parsed.email,
          hash,
          salt,
        },
      });

      res.status(201).json(createdUser);
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  public async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      const user = await prisma.user.findUnique({
        where: { email: email },
      });

      if (!user)
        return res.status(404).json({ message: "Usuário não encontrado." });

      const { hash, salt } = user;

      if (!auth.checkPassword(password, hash, salt)) {
        return res.status(400).json({ message: "Senha incorreta" });
      }
      const token = auth.generateJWT(user);

      return res.status(200).json({ message: "Token enviado", token: token });
    } catch (error) {
      return res.status(500).json({ message: "Server Error" });
    }
  }

  async getData(req: Request, res: Response) {
    try {
      const id = req.user as string;
      const user = await prisma.user.findUnique({
        where: { id: id },
        include: { posts: true },
      });
      if (!user) {
        return res.status(404).json({ message: "Usuário não encontrado" });
      }
      const { hash, salt, ...returnData } = user;
      return res.status(200).json({ user: returnData });
    } catch (error) {
      return res.status(500).json({ error: error });
    }
  }

  public async read(req: Request, res: Response) {
    try {
      const { email } = req.params;

      const foundUser = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      res.status(200).json(foundUser);
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  public async readAll(req: Request, res: Response) {
    try {
      const foundUsers = await prisma.user.findMany();

      res.status(200).json(foundUsers);
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const { email } = userParams.parse(req.params);
      const data = updateUser.parse(req.body);

      const updatedUser = await prisma.user.update({
        where: {
          email: email,
        },
        data: data,
      });
      res.status(200).json(updatedUser);
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { email } = req.params;

      const deletedUsers = await prisma.user.delete({
        where: {
          email: email,
        },
      });

      res.status(200).json(deletedUsers);
    } catch (error: any) {
      res.status(500).json({
        message: error.message,
      });
    }
  }
}

export default new UserController();

import { Request, Response } from "express";
import { PrismaClient } from "../generated/prisma";
import { createUser, updateUser, userParams } from "../schemas/user.schema";

const prisma = new PrismaClient();

class UserController {
    public async create(req: Request, res: Response) {
        try {
            const parsed = createUser.parse(req.body);

            const createdUser = await prisma.user.create({
                data: parsed
            });

            res.status(201).json(createdUser);
        } catch (error: any) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    public async read(req: Request, res: Response) {
        try {
            const { email } = req.params;

            const foundUser = await prisma.user.findUnique({
                where: {
                    email: email
                }
            });

            res.status(200).json(foundUser);
        } catch (error: any) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    public async readAll(req: Request, res: Response) {
        try {
            const foundUsers = await prisma.user.findMany();

            res.status(200).json(foundUsers);

        } catch (error: any) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    public async update(req: Request, res: Response) {
        try {
            const { email } = userParams.parse(req.params);
            const data = updateUser.parse(req.body);

            const updatedUser = await prisma.user.update({
                where: {
                    email: email
                },
                data: data
            });
            res.status(200).json(updatedUser);
        } catch (error: any) {
            res.status(500).json({
                message: error.message
            });
        }
    }

    public async delete(req: Request, res: Response) {
        try {
            const { email } = req.params;

            const deletedUsers = await prisma.user.delete({
                where: {
                    email: email
                }
            });

            res.status(200).json(deletedUsers);
        } catch (error: any) {
            res.status(500).json({
                message: error.message
            });
        }
    }
}

export default new UserController();
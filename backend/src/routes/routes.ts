import { Router } from "express";
import usuarioController from "../controllers/user.controller";
import postagemController from "../controllers/post.controller";
import { photoUpload } from "../config/multer";

const router = Router();

router.post("/user/", usuarioController.create);
router.get("/user/:email", usuarioController.read);
router.get("/user/", usuarioController.readAll);
router.put("/user/:email", usuarioController.update);
router.delete("/user/:email", usuarioController.delete);

// -----------------

router.post("/post/:senderEmail",  photoUpload.single("image"), postagemController.create);
router.get("/post/:id", postagemController.read);
router.get("/post/", postagemController.readAll);
router.put("/post/:senderEmail/:id",  photoUpload.single("image"), postagemController.update);
router.delete("/post/:senderEmail/:id", postagemController.delete);

// -----------------

export default router
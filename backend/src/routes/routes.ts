import { Router } from "express";
import usuarioController from "../controllers/user.controller";
import postagemController from "../controllers/post.controller";
import { photoUpload } from "../config/multer";
import passport from "passport";

const router = Router();

// ----------------- Usuários

router.post("/user/", usuarioController.create);
router.post("/user/login/", usuarioController.login);
router.get(
  "/getData",
  passport.authenticate("jwt", { session: false }),
  usuarioController.getData
);

// -------- Testes

router.get("/user/", usuarioController.readAll);
router.put("/user/:email", usuarioController.update);
router.delete("/user/:email", usuarioController.delete);

// -----------------  Posts

router.post(
  "/post",
  passport.authenticate("jwt", { session: false }),
  photoUpload.single("image"),
  postagemController.create
);
router.get("/post/:idPost", postagemController.read);
router.get("/post/", postagemController.readAll);
router.put(
  "/post/:idPost",
  passport.authenticate("jwt", { session: false }),
  photoUpload.single("image"),
  postagemController.update
);
router.delete(
  "/post/:idPost",
  passport.authenticate("jwt", { session: false }),
  postagemController.delete
);

// -----------------

export default router;

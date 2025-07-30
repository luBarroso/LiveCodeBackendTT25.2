# Criação da pasta de backend

```bash
npm install -g lemon-pie-cli
lemon-pie create                #criação dos *modulos* e *pastas* que usaremos no back - **selecione a opção prisma**
```

```bash
npm install nodemailer @types/nodemailer
npm install dotenv
npm i zod multer nodemailer cors
npm i -D prisma tsx typescript @types/express @types/node

npm install --save-dev @types/cors
```

## Alterações no package.json

"prisma": {
    "schema": "src/models/schema.prisma"
},

---

"start": "npx ts-node-dev --transpile-only --no-notify server.ts"

## Alterações no tsconfig.json

"target": "es2016" *para* "target": "es2022"

## Alterações nas pastas

*Renomeie* a pasta **prisma** para **models**

---

*Delete* o arquivo: **src/.env.** Vamos utilizar um arquivo .env, mas ele deve ficar no diretório raiz, portanto altere **.env.example** para **.env**


# Criação do Banco do postgris

Crie um banco no postgris e após criar coloque os dados no .env

```.env
DATABASE_URL="postgresql://postgres:PASSWORD@localhost:5432/DATABASE?schema=public"
```

substitua PASSWORD pela senha colocada no banco e DATABASE pelo nome que você colocou no banco também

# Criação do Schema

Faça schema corresponder á modelagem


obs.: opós fazer o schema ou fazer alguma alteração dê o comando

```bash
npx prisma generate
```

# Criação das Controllers

```typescript
import { Resquest, Response } from "express";
import { PrismaClient } from "../generated/prisma";

const prisma = new PrismaClient();

class <Nome da Model>Controller {
    public async create(req: Request, res: Response){
        try{

            const { ... } = req.params;

            const createdModel = await prisma.model.create({
                data: {
                    ...
                }
            });

            res.status(201).json(createdModel);
        }catch(error: any){
            res.status(500).json({ message: error.message});
        }
    }

    public async read(req: Request, res: Response){
        try{
            const { id } = req.params;
            
            const foundModel = await prisma.model.findUnique({
                where: {
                    id: id
                }
            });

            res.status(200).json(foundModel);
        }catch(error: any){
            res.status(500).json({ message: error.message});
        }
    }

    public async readAll(req: Request, res: Response){
        try{
            const foundModels = await prisma.model.findmany();

            res.status(200).json(foundModels);
        }catch(error: any){
            res.status(500).json({ message: error.message});
        }
    }

    public async update(req: Request, res: Response){
        try{
            const { id } = req.params;
            const { ... } = req.body;
            
            const foundModel = await prisma.model.update({
                where: {
                    id: id
                },
                data: {
                    ...
                }
            });

            res.status(201).json(updatedModel);
        }catch(error: any){
            res.status(500).json({ message: error.message});
        }
    }

    public async delete(req: Request, res: Response){
        try{
            const { id } = req.params;

            const deletedModel = await model.model.delete({
                where:{
                    id: id
                }
            })
            res.status(200).json(deletedModel);
        }catch(error: any){
            res.status(500).json({ message: error.message});
        }
    } 

}
export default new <Nome da Model>Controller();
```

# Criação das Routes
```typescript
import { Router } from "express";
import { <Nome da Model>Controller } from "../controllers/model.controller.ts";

const router = Router();

router.post("/<model>", <Nome da Model>Controller.create());
router.get("/<model>/:id", <Nome da Model>Controller.read());
router.get("/<model>", <Nome da Model>Controller.readAll());
router.put("/<model>/:id", <Nome da Model>Controller.put());
router.delete("/<model>/:id", <Nome da Model>Controller.delete());

export default route<Model>;
```

# Criação do Zod
```bash
npm install zod
```

```typescript

```

# Criação do Multer

```bash
npm install multer @types/multer
```

```typescript

```


# Criação de seed
```bash
npm install @faker-js/faker -D
```

```typescript

```

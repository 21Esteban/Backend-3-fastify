// import { Router } from "express";

import postCtrol from "../controllers/post.controller.js";
import { upload } from "../middleware/imgUpload.js";
// import { check } from "express-validator";
// import { validFields } from "../middleware/ValidFields.js";

// const route = Router();

// route.get("/",postCtrol.listar)

// route.post("/",

// upload.single("img"),[
//     check("title","El campo title es obligatorio").notEmpty(),
//     check("description","El campo descripción es obligatorio").notEmpty().optional(),
// ],

// validFields,postCtrol.add)
// route.get("/:id",postCtrol.listarById)
// route.delete("/:id",postCtrol.delete)
// route.put("/:id",upload.single("img"),postCtrol.update)

// export default route;

export const postRoutes = (fastify, opts, done) => {
  fastify.get("/", postCtrol.listar);

  fastify.post(
    "/",
    {
      schema: {
        body: {
          type: "object",
          required: ["title", "description"],
          properties: {
            title: { type: "string", minLength: 1, maxLength: 20 },
          },
        },
      },
      preHandler: [upload.single("img")],
    },
    postCtrol.add
  );

  fastify.get("/:id", postCtrol.listarById);
  fastify.delete("/:id", postCtrol.delete);
  fastify.put("/:id", { preHandler: [upload.single("img")] }, postCtrol.update);

  done();
};

import Fastify from "fastify";
import cors from "@fastify/cors";
import formbody from "@fastify/formbody";
import multer from "fastify-multer"
import { connectDb } from "./database.js";
import { postRoutes } from "./routes/post.route.js";


connectDb()

const fastify = Fastify({logger:true})

fastify.register(cors,{origin:"*"})
fastify.register(formbody)
fastify.register(multer.contentParser)


//Routes

fastify.register(postRoutes,{prefix:"/post"})


const start = async ()=>{

    try {
        await fastify.listen({port:4000,host:"0.0.0.0"})
        console.log("Servidor conectado por el puerto 4000");
    } catch (error) {
        fastify.log.error(error)
        process.exit(1)
    }

}

start()
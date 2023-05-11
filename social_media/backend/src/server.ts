
//importa classe fastfy da dependecia fastfy
import Fastify from "fastify";
//importas as rotas
import { AppRoutes } from "./routes";
// importa a dependencia cors
import cors from '@fastify/cors'
//criar um objeto da classe fastfy
const server = Fastify()
//registra cors no server
server.register(cors)
//registra n rotas
server.register(AppRoutes)
//subir o servidor http e fica ouvindo na porta 3333
server.listen({
    port: 3333
})
    .then(() => {
        console.log('Http server running')
    })

// ORM(prisma) - Object-Relational Mapping(Mapeamento Objeto-Relacional) é uma técnica para aproximar o paradigma de desenvolvimento de aplicações orientadas a objetos ao paradigma do banco de dados relacional.
// Crud - Create(post),retriv
//npm install zod é usado para pegar as informações do frontend

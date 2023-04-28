
// importa classe fastfy da dependecia fastfy
import Fastify from "fastify";
//instaciar um objeto da classe fastfy
const server = Fastify()

//importa dependencia prisma
import { PrismaClient } from "@prisma/client";
// cria um objeto da classe prisma
const prisma = new PrismaClient()

// criar uma rota de api com o verbo get - consulta
server.get('/hello', () => {
    return 'Hello world, good night'
})


//Rota nova
server.get('/test', () => {
    return 'Teste de rota'
})


// rota para listar (consultar) os posts cadastrados no banco de dados
// a função é assiscrona, isto é, quem a chamar, pode continuar sem que tenha  resposta
server.get('/post', async () => {
    //await indica que a função somente continua depois que os dados vierem do BD 
    const posts = await prisma.post.findMany()
    return posts
})


server.get('/post/title', async () => {
    const posts = await prisma.post.findMany({
        where: {
            title: {
                startsWith: "teste"
            }
        }
    })
    return posts
})

//subir o servidor http e fica ouvindo na porta 3333
server.listen({
    port: 3333
})
    .then(() => {
        console.log('Http server running')
    })

// ORM(prisma) - Object-Relational Mapping(Mapeamento Objeto-Relacional) é uma técnica para aproximar o paradigma de desenvolvimento de aplicações orientadas a objetos ao paradigma do banco de dados relacional.


// Crud - Create(post),retriv


// importa classe fastfy da dependecia fastfy
import Fastify from "fastify";
//instaciar um objeto da classe fastfy
const server = Fastify()
//importa a dependencia zod
import { number, z } from "zod";
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
server.get('/posts', async () => {
    //await indica que a função somente continua depois que os dados vierem do BD 
    const posts = await prisma.post.findMany()
    return posts
})
server.get('/posts/title/:title', async (request) => {
    //define um objeto zod contando o esquema de dado
    const titleParam = z.object({
        title: z.string()
    })
    //recuperar o dado do frontend a partir do zod titleParam
    //request.params é para recuperar o dado da url
    //converte o texto enviando pelo frontend para a variavel teste
    const { title } = titleParam.parse(request.params)
    const posts = await prisma.post.findMany({
        where: {
            title: {
                startsWith: title
            }
        }
    })
    return posts
})
//rota para a criação de um post - verbo post
server.post('/post', async (request) => {
    //define um objeto zod contando o esquema de dado
    const postBody = z.object({
        title: z.string(),
        content: z.string(),
        published: z.boolean()
    })
    // reupera o dado do frontend a partir do zod postbody
    // converte o texto enviado pelo frontend para as variaveis title, content, published

    const { title, content, published } = postBody.parse(request.body)

    const newPost = await prisma.post.create({
        data: {
            title: title,
            content: content,
            published: published
        }
    })
    return newPost // retorna o novo post criado
})
//rota para atualizar o conteudo de um post
server.patch('/post/content', async (Request) => {
    //cria um objeto zod para definir um esquema de dados
    const contentBody = z.object({
        id: z.number(),
        content: z.string()
    })
    //recupera os dados do frontend 
    const { id, content } = contentBody.parse(Request.body)
    //atualiza no banco de dados
    const postUpdated = await prisma.post.update({
        where: {
            id: id
        },
        data: {
            content: content
        }
    })
    return postUpdated //retorna a atualização do post
})
// rota para publicar um artigo
server.patch('/post/content/published', async (request) => {
    //define um objeto zod contando o esquema de dado
    const postBody = z.object({
        title: z.string(),
        content: z.string(),
        published: z.boolean()
    })

    const { title, content, published } = postBody.parse(request.body)

    const newPostUpdate = await prisma.post.create({
        data: {
            title: title,
            content: content,
            published: published
        }
    })
    return newPostUpdate // retorna o novo post criado
})
//rota para deletar um post do banco de dados
server.delete('/post/content/:id', async (request) => {
    const postBody = z.object({
        id: z.string()
    })
    // recura o id do frontend
    const { id } = postBody.parse(request.params)
    const idNumber = Number(id)
    //atualiza no banco de dados
    const postDeleted = await prisma.post.delete({
        where:{
            id:idNumber
        }
    })
    return postDeleted // retorna o post que foi apagado
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
//npm install zod é usado para pegar as informações do frontend

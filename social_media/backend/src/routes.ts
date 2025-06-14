// importa classe fastfy da dependecia fastfy
import { FastifyInstance } from "fastify"
//importa a dependencia zod
import { z } from "zod"
//importar prisma do prisma.ts
import { prisma } from './lib/prisma'

export async function AppRoutes(server: FastifyInstance) {
    // criar uma rota de api com o verbo get - consulta
    // server.get('/hello', () => {
    //     return 'Hello world, good night'
    // })
    //Rota nova
    // server.get('/test', () => {
    //     return 'Teste de rota'
    // })
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
            published: z.boolean(),
            userId: z.number()
        })
        // recupera o dado do frontend a partir do zod postbody
        // converte o texto enviado pelo frontend para as variaveis title, content, published

        const { title, content, published, userId } = postBody.parse(request.body)

        const newPost = await prisma.post.create({
            data: {
                title,
                content,
                published,
                userId
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
    // rota para publicar um artigo patch
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
        // recupera o id do frontend
        const { id } = postBody.parse(request.params)
        const idNumber = Number(id)
        //atualiza no banco de dados
        const postDeleted = await prisma.post.delete({
            where: {
                id: idNumber
            }
        })
        return postDeleted // retorna o post que foi apagado
    })
    // rota para atualizar n campos do post
    server.put('/post/:id', async (Request) => {
        //objeto zod para o id de requisição
        const idParam = z.object({
            id: z.string()

        })
        // objeto zod para o corpo da requisição
        const putBody = z.object({
            "title": z.string(),
            "content": z.string()
        })
        // recupera os dados do frontend
        const { id } = idParam.parse(Request.params)
        const { title, content } = putBody.parse(Request.body)
        const variavel = await prisma.post.updateMany({
            where: {
                id: Number(id),
                published: true
            },
            data: {
                title: title,
                content: content
            }
        })
        return (variavel.count >= 1) ? 'atualização com sucesso' : 'nada foi alterado'

    })
    //rota certa para atualizar um post
    server.put('/post/', async (Request) => {

        // objeto zod para o corpo da requisição
        const putBody = z.object({
            "id": z.number(),
            "title": z.string(),
            "content": z.string(),
            "published": z.boolean()
        })
        // recupera os dados do frontend
        const { id, title, content, published } = putBody.parse(Request.body)
        const resposta = await prisma.post.updateMany({
            where: {
                id: Number(id),

            },
            data: {
                title,
                content,
                published: Boolean(published)
            }
        })
        return (resposta.count >= 1) ? 'atualização com sucesso' : 'nada foi alterado'

    })
    //rota para criar user
    server.post('/user', async (request) => {
        const userBody = z.object({
            username: z.string(),
            password: z.string(),
            email: z.string()
        })

        let { username, password, email } = userBody.parse(request.body)

        const newUser = await prisma.user.create({
            data: {
                username,
                password,
                email
            }
        })
        return newUser
    })
    //rota que consulta os usuarios
    server.get('/users', async () => {
        const users = await prisma.user.findMany()
        return users
    })
    server.get('/posts/user/:userId', async (request) => {
        //define um objeto zod contando o esquema de dado
        const userIdParam = z.object({
            userId: z.string()
        })
        //recuperar o dado do frontend a partir do zod titleParam
        //request.params é para recuperar o dado da url
        //converte o texto enviando pelo frontend para a variavel teste
        const { userId } = userIdParam.parse(request.params)
        const posts = await prisma.post.findMany({
            where: {
                userId: Number(userId)
            }
        })
        return posts
    })
}
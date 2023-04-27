
// importa classe fastfy da dependecia fastfy
import Fastify from "fastify";

//instaciar um objeto da classe fastfy
const app = Fastify()

// criar uma rota de api com o verbo get - consulta
app.get('/hello', ()=> {
    return 'Hello world, good night'
})

//Rota nova
app.get('/test',()=>{
    return 'Teste de rota'
})

//subir o servidor http
app.listen({
    port:3333
})
.then(()=>{
    console.log('Http server running')
})

// ORM(prisma) - Object-Relational Mapping(Mapeamento Objeto-Relacional) é uma técnica para aproximar o paradigma de desenvolvimento de aplicações orientadas a objetos ao paradigma do banco de dados relacional.




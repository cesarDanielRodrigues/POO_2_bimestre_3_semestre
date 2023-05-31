async function consultaPosts() {
    //consome a api e guarda o resultado em posts
    const posts = await fetch('http://localhost:3333/posts')
        .then(resposta => {
            return resposta.json()
        })

    let conteudoTabela = ''
    //percorre cada post presente em posts e monta o conteúdo da tabela
    posts.forEach(post => {
        //acumula na variavel conteudoTabela os dados de cada post
        conteudoTabela += `<tr> <td> ${post.id} </td> <td> ${post.title} </td> <td>${post.content} </td> <td> ${post.published} </td> <td> <button onclick="remover(${post.id})"> <i class="bi bi-trash"></i> </button> </td> <td> <button onclick="alterar(${post.id})" <i class="bi bi-pencil"></i> </button> </td> </tr>`
    });
    //vamos jogar os dados no html
    document.getElementById('corpoTabela').innerHTML = conteudoTabela
}
//consome a api que remove um post no banco de dados
async function remover(id) {
    const confirmacao = confirm('Confirma a exclusão do Post? ')
    if (!confirmacao) { // clicou em não
        return
    }
    // clicou em sim
    await fetch(`http://localhost:3333/post/content/${id}`, {
        method: 'DELETE'
    })
        .then(resposta => {
            alert('Remoção realizada')
        })
        .catch(error => {
            alert('Problema na remoção')
        })
    consultaPosts() // atualiza a tabela
}
//consome a api que cadastra um post no banco de dados
async function confirmar() {
    //recuperar os dados do formulario
    const title = document.getElementById('title').value
    const content = document.getElementById('content').value
    const published = document.getElementById('sim').checked
    // alert(published)
    const corpo = { title, content, published }
    //chama a api
    const post = await fetch('http://localhost:3333/post', {
        method: 'post',
        body: JSON.stringify(corpo), // JSON transformando em string
        headers: {
            "Content-Type": "application/json;charset=UTF-8"
        }

    })
        .then(resposta => {
            alert("Operação realizada com sucesso")
        })
        .catch(error => {
            alert("Operação Falhou")
        })
    //atuliza a tabela
    // console.log(corpo)
    consultaPosts()
    document.getElementById('title').value = ''
    document.getElementById('content'). value = ''
    document.getElementById('sim').checked = false
    document.getElementById('nao').checked = false
}
async function alterar(id){

}


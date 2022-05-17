const inputBox = document.querySelector('#entrada')
const addBtn =document.querySelector('.inputField button')
const todoLista = document.querySelector('.todoList')
const deleteAllBtn = document.querySelector('.footer button')

inputBox.onkeyup = _ =>{
    let userData = inputBox.value//esta pega o valor de entrada do usuário
    if(userData.trim() != 0){//se nos usuarios não forem apenas espaços
        addBtn.classList.add('active')
    }else{
        addBtn.classList.remove('active')
    }
}

showTasks()

addBtn.onclick = _ =>{
    let userData = inputBox.value
    let getlocalStorage = localStorage.getItem('New Todo')//pega o armazenamento local
    if(getlocalStorage == null){//verificando se o armazenamento local for nulo
        listArr = [] //cria um array em branco
    }else{
        listArr = JSON.parse(getlocalStorage)//estamos adicionando os dados na lista ToDo
    }
    listArr.push(userData)
    localStorage.setItem('New Todo', JSON.stringify(listArr))//transformando o obj js em fragmento js

    showTasks()
}

//função para adicionar tarefas na lista
function showTasks(){
    let getlocalStorage = localStorage.getItem('New Todo')
    if(getlocalStorage == null){//verificando se o armazenamento local for nulo
        listArr = [] //cria um array em branco
    }else{
        listArr = JSON.parse(getlocalStorage)//estamos adicionando os dados na lista ToDo
    }
    const pendingNum = document.querySelector('.pendingNum')
    pendingNum.textContent = listArr.length

    if(listArr.length > 0){//se o tamanho do array for maior que zero
        deleteAllBtn.classList.add('active')//ativa a classe active
    }else{
        deleteAllBtn.classList.remove('active')//desativa a classe active
    }

    let newLiTag = ''
    addBtn.classList.remove('active')
    listArr.forEach((element, index)=>{
        newLiTag += `<li>${element}<span onclick = "deleteTask()"> <i class="fa-solid fa-trash"></i> </span></li>`
    })
    todoLista.innerHTML = newLiTag //adicionando uma nova Li dentro da nossa lista no HTML
    inputBox.value = ''//uma vez que foi adicionada a tarefa, o campo de entrada volta a ficar em branco
}

//FUNCTION PARA DELETAR UM ELEMENTO ESPECIFICO DA MINHA LISTA
function deleteTask(index){
    let getlocalStorage = localStorage.getItem('New Todo')
    listArr = JSON.parse(getlocalStorage)
    listArr.splice(index, 1)//exclui ou remove o armazenamento local
    localStorage.setItem('New Todo', JSON.stringify(listArr))
    showTasks()
}

//FUNÇÃO QUE DELETA TODAS AS TAREFAS
deleteAllBtn.onclick =  _ => {
    listArr = []
    //apos deletar todas as tarefas atualiza novamente o armazenamento local
    localStorage.setItem('New Todo', JSON.stringify(listArr))
    showTasks()
}

/* // Query params

const express = require('express')

const port = 3000

const app = express()

// - Query params => meusite.com /users?nome=Tiago&age=39  // FILTROS
// - Route params => /users/2      // BUSCAR, OU DELETAR OU ATUALIZAR ALGO ESPECIFICO

/*
app.get('/users', (request, response) => {

    const {name, age, sex} = request.query

    console.log(name, age, sex)

    return response.json({name, age, sex})
})

app.listen(port, () => {

    console.log(`😎 🕵🏿 Codando tudo certo port ${port}`)

}) */
//no insominia usar: http://localhost:3000/users?name=Tiago&age=39

//segunda parte Route params

/*
const express = require('express')

const port = 3000

const app = express()

app.get('/users/:id', (request, response ) => {

    const {id} = request.params

    console.log(id)
    return response.json([id]) // ou usar esse: send('Hello Tiago blz')
}) 

app.listen(port, () => {
    console.log(`😎 Codando pra cima bora port ${port}`)
})
//nesse caso usar no isominia : http://localhost:3000/users/id

*/

//terceira parte Body params

/*
const express = require('express')

const port = 3000
const app = express()
app.use(express.json())

app.get('/users', (request, response) => {

    console.log(request.body)

    
    return response.json({message: "blz"})
})
app.listen(port, () => {
    console.log(` 😎 Bora bora codando ${port}`)
})
*/

//PROJETO NODE
//import express from 'express';
//mport {v4} from 'uuid';
//import cors from 'cors'
//const {request , response} = require('express')
const express = require('express')
const uuid = require('uuid')
const cors = require('cors')



const port = 3001;
const app = express();
app.use(express.json());
app.use(cors());

//GET    => BUSCA INFORMAÇÃO NO BACK END
//POST   => CRIAR INFORMAÇÃO NO BACK END
//PUT / PATCH  => ALTERA / ATUALIZA INFORMAÇÃO NO BACK END
//DELETE   => DELETA INFORMAÇÃO NO BACK END
// MIDDLEWARE  => INTERCEPTADOR / TEM O PODER DE PARAR OU ALTERAR DADOSDA REQUISIÇÃO


const  users = [];
const checkUserId = (request, response, next) => {
    const { id } = request.params;
   
    const  index = users.findIndex( (user) => user.id === id);

    if( index < 0){
        return response.status(404).json({error: "Not found"});
    }

    request.userIndex = index;
    request.userId = id;
    next();
};

//app.use(myFirstMiddleWare )

app.get('/users', (request, response) => {
  
    return response.json(users);
});

app.post('/users', (request, response) => {
    const {name, age} = request.body; 
    const user = { id:uuid.v4(), name, age};

    users.push(user);
    return response.status(201).json(user);
});

app.put('/users/:id',checkUserId, (request, response) => {

    const {name, age} = request.body;
    const index = request.userIndex;
    const id = request.userId;
     
    const updatedUser = {id, name, age};


    users[index] = updatedUser;

    return response.json(updatedUser);
});


app.delete('/users/:id',checkUserId, (request, response) => {
    const index = request.userIndex;


    users.splice(index, 1);

    return response.status(204).json();
});


app.listen(port, () => {

    console.log(`😎 🕵🏿 Codando Projetinho  port ${port}`);
});
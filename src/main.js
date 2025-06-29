import express from 'express'
//import do login
import logincontroller from './Controllers/login.js'

//cliente import
import {
  getClienteController,
  postClienteController,
  putClienteController,
  deleteClienteController
} from './Controllers/cliente.js'

//produto import
import{
  getProdutoController,
  postProdutoController,
  putProdutoController,
  deleteProdutoController
} from './Controllers/produto.js'

//pedido import
import{
  getPedidoController,
  postPedidoController,
  putPedidoController,
  deletePedidoController
} from './Controllers/pedido.js'
/////////////////////////////////////////
const app = express()
const port = 3000

app.use (express.json())

//ROTAS

//inicio
app.get('/', (req, res) => {
  res.send('Bem vindo a web API mercado')
})

//tela login
  app.post('/login', logincontroller)

//cliente
  app.get('/cliente', getClienteController)
  app.post('/cliente', postClienteController)
  app.put('/cliente', putClienteController)
  app.delete('/cliente', deleteClienteController)

//produto
app.get('/produto', getProdutoController)
app.post('/produto', postProdutoController)
app.put('/produto', putProdutoController)
app.delete('/produto', deleteProdutoController)

//pedidoS
app.get('/pedido', getPedidoController)
app.post('/pedido', postPedidoController)
app.put('/pedido', putPedidoController)
app.delete('/pedido', deletePedidoController )

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})


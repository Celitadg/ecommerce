const express = require ('express');
const { Router } =  express;
const Contenedor = require ('./contenedor')

const app = express()
const router = Router()

const PORT = process.env.PORT || 8080
const server = app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}`)
})

server.on('error', error => console.log(`Hubo un error en el servidor ${error}`))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const contenedor = new Contenedor (__dirname + '/productos.json'); 

router.get('/', async (request, response) => {
    const productos = await contenedor.getAll()
    response.json(productos)
})

router.get('/:id', async (request, response) => {
    let id = request.params.id
    const product = await contenedor.getById(id)
    response.send(product)
})

router.post('/', async (request, response) => {
    const obj = request.body
    const product = await contenedor.save(obj)
    response.send(product)
})

router.put('/:id', async (request, response) => {
    const obj = request.body
    const id = request.params.id
    const product = await contenedor.updateById(id, obj)
    response.send(product)
})

router.delete('/:id', async (request, response) => {
    const id = request.params.id
    const product = await contenedor.deleteById(id)
    response.send(product)
})

app.use('/api/productos', router)

app.use(express.static(__dirname + '/public'))
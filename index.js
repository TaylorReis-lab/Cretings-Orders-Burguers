const express = require("express")
const uuid = require("uuid")
const port = 3000
const app = express()
app.use(express.json())

const orders = []

const checkUserId = (request, response, next) => {
    const {id} = request.params
    const index = orders.findIndex(user => user.id === id)
    
    if(index < 0){
        return response.status(404).json({Error: "user not fund"})
    }

    request.orderIndexId = index
    request.orderId = id

    next()
}

app.get("/order", (request, response) => {
    return response.json(orders)
})

app.post("/order", (request, response) => {
    const { order, clienteName, price, status } = request.body
    const orderId = { id:uuid.v4(), order, clienteName, price, status}

    orders.push(orderId)
    return response.status(201).json(orderId)
})

app.put("/order/:id", checkUserId, (request, response) => {
    const { order, clienteName, price, status} = request.body
    const index = request.orderIndexId
    const id = request.orderId

    const updateOrder = {id, order,clienteName, price, status}

    orders[index] = updateOrder

    return response.json(updateOrder)
})

app.get("/order/:id", checkUserId,(request, response) => {
    return response.json(orders)
})

app.delete("/order/:id", checkUserId,(request, response) => {
    const index = request.orderIndexId

    orders.splice(index, 1)

    return response.status(204).json()
})

app.patch("/order/:id", checkUserId, (request, response) => {
    const index = request.orderIndexId

    orders[index].status = "Pronto"

    return response.json(orders)
})

app.listen(port, () => {
    console.log(`Server Started in port: ${port} 🤞`)
})
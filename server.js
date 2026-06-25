require('dotenv').config()

const express = require('express')
const peliculasRoutes = require('./src/routes/peliculasRoutes')


const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) 

// Rutas 
app.use('/peliculas', peliculasRoutes)


app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`)
})
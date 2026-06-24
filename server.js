const express = require('express')
const peliculasRoutes = require('./src/routes/peliculasRoutes')
const app = express()
const port = 3000

app.use(express.json()) 

// Rutas 
app.use('/peliculas', peliculasRoutes)


app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`)
})
require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const limiter = require('express-rate-limit')

const apiLimiter = limiter({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100, // Limite de solicitudes por IP
  message: 'Demasiadas solicitudes desde esta IP, por favor intente nuevamente más tarde.',
  standardHeaders: true, // Habilita los encabezados de límite de velocidad estándar
  legacyHeaders: false, // Deshabilita los encabezados de límite de velocidad heredados
})

const peliculasRoutes = require('./src/routes/peliculasRoutes')
const authRoutes = require('./src/routes/authRoutes')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) 
app.use(morgan('dev'))
app.use(cors())
app.use(helmet())
app.use(apiLimiter)

// Rutas 
app.use('/peliculas', peliculasRoutes)
app.use('/', authRoutes)

app.listen(port, () => {
  console.log(`Servidor iniciado en http://localhost:${port}`)
})
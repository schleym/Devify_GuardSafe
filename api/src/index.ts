import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { PrismaClient } from '@prisma/client'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000

// Initialize Prisma
const prisma = new PrismaClient()

app.use(cors())
app.use(express.json())

// Basic route
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Devify GuardSafe API is running' })
})

// Example route for Users
app.get('/api/users', async (req, res) => {
  try {
    const users = await prisma.user.findMany()
    res.json(users)
  } catch (error) {
    console.error('Prisma Error:', error)
    res.status(500).json({ error: 'Failed to fetch users' })
  }
})

// POST route with validation
app.post('/api/users', async (req, res) => {
  const { email, name } = req.body

  // Validaciones básicas
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Email inválido o ausente' })
  }

  if (!name || name.length < 3) {
    return res.status(400).json({ error: 'El nombre debe tener al menos 3 caracteres' })
  }

  try {
    const user = await prisma.user.create({
      data: { email, name }
    })
    res.status(201).json(user)
  } catch (error) {
    console.error('Create User Error:', error)
    res.status(400).json({ error: 'No se pudo crear el usuario (posiblemente el email ya existe)' })
  }
})

app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`)
})

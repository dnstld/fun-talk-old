import express from 'express'
import { Router, Request, Response } from 'express'
import cors from 'cors'

const app = express()
const route = Router()

app.use(cors())
app.use(express.json())

let stages: { id: string; speakers: { name: string; isAdmin: boolean }[] }[] = [];

route.post('/stage', (req: Request, res: Response) => {
  const data = req.body
  const stage = { id: '123', speakers: [{ name: data.name, isAdmin: data.isAdmin }] }

  stages.push(stage)

  res.json(stage)
})

route.get('/stage/:id', (req: Request, res: Response) => {
  const stageId = req.params.id

  const stage = stages.find(stage => stage.id === stageId)

  res.json(stage)
})

app.use(route)

app.listen(3001, () => console.log('server running on port 3001'))
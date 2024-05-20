import express from 'express'
import { json } from 'body-parser'

const app = express()
app.use(json())

app.get('/', (req, res) => {
  res.send('Welcome to the auth service')
})

app.get('/api/users/currentuser', (req, res) => {
  res.send('Hi there!')
})


app.listen(3000, () => {
  console.log('Server is running on port 3000')
})

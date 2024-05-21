import express from 'express'

const router = express.Router()

router.post('/api/users/signin', async (req, res) => {
  res.send('You are signed in!')
})

export { router as signinRouter }

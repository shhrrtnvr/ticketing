import express from 'express'

const router = express.Router()

router.get('/api/users/currentuser', async (req, res) => {
  res.send('You are logged in!')
})

export { router as currentUserRouter }

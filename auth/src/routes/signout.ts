import express from 'express'

const router = express.Router()

router.post('/api/users/signout', async (req, res) => {
  res.send('You are signed out!')
})

export { router as signoutRouter }

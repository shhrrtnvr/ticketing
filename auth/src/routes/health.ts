import express from 'express'

const router = express.Router()

router.get('/api/users/health', (req, res) => {
  res.send('OK')
})

export { router as healthRouter }


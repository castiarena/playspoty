import { config } from 'dotenv'

import express from 'express'
import { create } from 'apisauce'

config()

const app = express()

const { AUTH_URL, CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = process.env

const CLIENT_ID_AND_SECRET = `${CLIENT_ID}:${CLIENT_SECRET}`

const authApi = create({
  baseURL: AUTH_URL,
  headers: {
    Authorization: 'Basic ' + Buffer.from(CLIENT_ID_AND_SECRET).toString('base64'),
    'Content-Type': 'application/x-www-form-urlencoded',
  },
})

app.get('/auth', (req, res) => {
  const redirect_uri = `${req.protocol}://${req.get('host')}/login`

  res.redirect(
      `${AUTH_URL}/authorize?client_id=${CLIENT_ID}&response_type=code&scope=streaming&&redirect_uri=${redirect_uri}`
  )
})

app.get('/login', (req, res) => {
  res.json(req.query)
})


export const handler = app

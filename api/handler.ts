import express from 'express'
import { create } from 'apisauce'

const app = express()

const AUTH_URL = 'https://accounts.spotify.com'
const CLIENT_ID = 'b7d42e878d06477fb9d46f43efb5ef62'
const CLIENT_SECRET = '209d07f9c6b5487a83b04476fb981145'
const CLEINT_ID_AND_SECRET = `${CLIENT_ID}:${CLIENT_SECRET}`
const REDIRECT_URI = 'http://127.0.0.1:5173/'


const authApi = create({
    baseURL: AUTH_URL,
    headers: {
        'Authorization': 'Basic ' + (Buffer.from(CLEINT_ID_AND_SECRET).toString('base64')),
        'Content-Type':'application/x-www-form-urlencoded'
      },
  })


app.get('/auth', (req, res) => {

    authApi.post(
        '/api/token',
         `grant_type=client_credentials&redirect_uri${REDIRECT_URI}`
    ).then(({ data }) => {
        res.json(data)
    })

})

export const handler = app
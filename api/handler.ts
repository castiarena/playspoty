import {config} from  'dotenv'

import express from 'express'
import { create } from 'apisauce'

config()

const app = express()

const {AUTH_URL,  CLIENT_ID, CLIENT_SECRET,REDIRECT_URI} = process.env

const CLEINT_ID_AND_SECRET = `${CLIENT_ID}:${CLIENT_SECRET}`


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
         `grant_type=client_credentials&redirect_uri=${REDIRECT_URI}`
    ).then(({ data }) => {
        res.json(data)
    }).catch((e) => console.log(e) )

})

export const handler = app
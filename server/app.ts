import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

import { router } from './routes'

const app = express()
const PORT = process.env.PORT || 4000

app.use(bodyParser.json({ limit: "30mb" }))
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }))
app.use(cors())

app.use(router)

mongoose.connect(process.env.MONGODB_CONNECTION_URL)
    .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}🥵🥶🤡`)))
    .catch(err => console.log(err.message))

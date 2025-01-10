import express from 'express'
import userRouter from './routes/users.routes.js'
import mongoose from 'mongoose'

const app = express()
const PORT = 8080

await mongoose.connect("mongodb+srv://franciscopugh01:w3Z4DM51u11LAxZ9@cluster0.w0js7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("DB is connected"))

app.use(express.json())
app.use('/api/users', userRouter)

app.listen(PORT, () => {
    console.log("Server on port:", PORT)
})
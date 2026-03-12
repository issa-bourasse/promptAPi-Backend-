const express = require('express');
const dotenv = require('dotenv');
const cors  = require('cors');
const connectDB = require('./config/db');
const promptRoutes = require('./routes/promptRoutes');
const {errorHandler} = require('./middleware/errorMiddleware')

dotenv.config()
connectDB()
const app = express()

app.use(cors())

app.use(express.json())

app.get('/', (req, res) => {
    res.send('API is running...')
})

app.use('/api/prompts', promptRoutes)

app.use(errorHandler)

const PORT  = process.env.PORT || 5000

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})
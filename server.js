const express = require('express')
const errorHandler = require('./Middlewares/errorHandler')
const { connect } = require('./Routes/contactRoutes')

const dotenv=require("dotenv").config()
const connectDb=require('./Config/dbConnections')

connectDb()

const app=express()
const port=process.env.PORT || 5000

app.use(express.json())
app.use('/api/contacts',require('./Routes/contactRoutes'))
app.use('/api/users',require('./Routes/userRoutes'))

app.use(errorHandler)

app.listen(port,()=>{
    console.log(`Server running on ${port}`);
})
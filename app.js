const express = require('express')
const app = express()

require('dotenv').config()
require('express-async-errors')

const connectDB = require('./db/connect')

const notFound = require('./middlewares/not-found')
const errorHandlerMiddleware = require('./middlewares/error-handlers')

const categoryRouter = require('./routes/category')
const shopRouter = require('./routes/shop')

const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');

app.use(express.json())
app.use(cors({
  origin:"https://lambent-cucurucho-0dcb4f.netlify.app",
  credentials:"true"
}))
app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(helmet());

app.use(xss());
app.get('/', (req, res) => {
    res.send('home')
})
app.use('/category', categoryRouter)
app.use('/shop', shopRouter)


app.use(notFound)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5000

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log('server is listening .....')
        })
    }
    catch(error) {

    }
}
start()
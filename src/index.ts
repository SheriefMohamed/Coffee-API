import express, { NextFunction } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { PORT } from './config/config';
import { ItemsRoute } from './routes/items-route'
import errorHandler from './middlewares/errorHandler';

const app = express();

app.use(cookieParser())
app.use(bodyParser.json())

app.use('/items', ItemsRoute)
app.use(errorHandler);

app.listen(PORT, async () => {
    console.log(`Running on port ${PORT}`)
})

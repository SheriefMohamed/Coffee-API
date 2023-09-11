import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import { PORT, NODE_ENV } from './config/config';
import { ItemsRoute } from './routes/items-route'
import { CategoryRoute } from './routes/category-route'
import { PositionRoute } from './routes/position-route'
import { AuthRoute } from './routes/auth-routes'
import errorHandler from './middlewares/errorHandler';
import { StaffRoute } from './routes/staff-route';

const app = express();

app.use(cookieParser());
app.use(bodyParser.json());

app.use('/items', ItemsRoute);
app.use('/categories', CategoryRoute);
app.use('/positions', PositionRoute);
app.use('/staff', StaffRoute)
app.use('/auth', AuthRoute)
app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Running on port ${PORT} in ${NODE_ENV} mode`)
})

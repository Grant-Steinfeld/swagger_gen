import express, { ErrorRequestHandler } from 'express';
import bodyParser from 'body-parser';
import petRoutes from './routes/pets';
import { errorHandler } from './middlewares/errorHandler';
import { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'joi';

const app = express();
app.use(bodyParser.json());

app.use('/api/pets', petRoutes);
app.use(errorHandler);

export default app;

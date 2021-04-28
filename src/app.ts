import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import './database';
import { routes } from './routes';
import { AppError } from './errors/AppError';
import cors from 'cors';

const app = express();

app.use(cors());
app.use(express.json());

app.use((err: Error, request: Request, response: Response, _next: NextFunction) => {
   if (err instanceof AppError) {
      return response.status(err.statusCode).json({
         message: err.message
      });
   }

   return response.status(500).json({
      status: 'Error',
      message: `Internal Server Error: ${err.message}`
   });
});

export { app };
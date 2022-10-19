import express from 'express';
import authRoutes from './src/routes/auth';
import characterRoutes from './src/routes/characters';
import userRoutes from './src/routes/users';
import errorHandler from './src/middlewares/error-handler.middleware';
import authenticationHandler from './src/middlewares/authentication.middleware';
import {connectToDabase, connectToTestDabase} from './src/helpers/database';
import config from './config';
import cors from 'cors';

const app = express();
app.use(express.json());

app.use(cors());

if (config.NODE_ENV !== 'test') {
    connectToDabase();
} else {
    connectToTestDabase()
}

app.use('/auth', authRoutes);

app.use('/api', authenticationHandler)
app.use('/api/character', characterRoutes);
app.use('/api/user', userRoutes);

app.use(errorHandler);


export default app;

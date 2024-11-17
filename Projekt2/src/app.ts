import 'dotenv/config';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import indexRoutes from './routes/index.js';
import historyRoutes from './routes/history.js';
import newGameRoutes from './routes/new-game.js';
import gameRoutes from './routes/game.js';

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');

if (!process.env.MONGODB_CONNECT_URI) {
    console.warn('Using default MongoDB URI. Set MONGODB_CONNECT_URI in .env for production.');
}

const mongoUri = process.env.MONGODB_CONNECT_URI || 'mongodb://localhost/czolko';

mongoose
    .connect(mongoUri, {})
    .then(() => console.log('Connected to MongoDB'))
    .catch((err) => console.error('MongoDB connection error:', err));

app.use('/', indexRoutes);
app.use('/new-game', newGameRoutes);
app.use('/history', historyRoutes);
app.use('/game', gameRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});

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

console.log(process.env.MONGODB_CONNECT_URI )
mongoose.connect(process.env.MONGODB_CONNECT_URI || 'mongodb://localhost/czolko', {});

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use('/', indexRoutes);
app.use('/new-game', newGameRoutes);
app.use('/history', historyRoutes);
app.use('/game', gameRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

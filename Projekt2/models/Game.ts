import mongoose from 'mongoose';

const playerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    password: { type: String, required: true },
});

const gameSchema = new mongoose.Schema({
    players: [playerSchema],
    createdAt: { type: Date, default: Date.now },
});

const Game = mongoose.model('Game', gameSchema);

export default Game;

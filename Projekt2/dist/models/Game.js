import mongoose, { Schema } from 'mongoose';
const GameSchema = new Schema({
    players: [
        {
            name: { type: String, required: true },
            password: { type: String, required: true },
        },
    ],
    questions: [
        {
            question: { type: String, required: true },
            answer: { type: String, required: true },
            playerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Player' },
        },
    ],
    createdAt: { type: Date, default: Date.now },
});
const Game = mongoose.model('Game', GameSchema);
export default Game;

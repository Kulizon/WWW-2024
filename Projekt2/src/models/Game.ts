import mongoose, { Schema, Document } from 'mongoose';

interface Player {
  name: string;
  password: string;
  _id: mongoose.Types.ObjectId;
}

interface Question {
  question: string;
  answer: string;
  playerId: mongoose.Types.ObjectId;
  _id: mongoose.Types.ObjectId;
}

interface GameDocument extends Document {
  players: Player[];
  questions: Question[];
  createdAt: Date;
}

const GameSchema: Schema = new Schema({
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

const Game = mongoose.model<GameDocument>('Game', GameSchema);

export default Game;

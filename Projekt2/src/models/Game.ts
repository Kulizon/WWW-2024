import mongoose, { Schema, Document } from 'mongoose';

interface IPlayer {
  name: string;
  password: string;
}

interface IGame extends Document {
  players: IPlayer[];
  createdAt: Date;
}

const playerSchema = new Schema<IPlayer>({
  name: { type: String, required: true, minlength: 3 },
  password: { type: String, required: true, minlength: 3 },
});

const gameSchema = new Schema<IGame>({
  players: { type: [playerSchema], required: true },
  createdAt: { type: Date, default: Date.now },
});

const Game = mongoose.model<IGame>('Game', gameSchema);

export default Game;

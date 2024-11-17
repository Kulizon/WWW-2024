import mongoose from 'mongoose';
import Game from '../models/Game';

class QuestionService {
async addQuestion(gameId: string, playerId: string, question: string, questionId: mongoose.Types.ObjectId, answer: string) {
    try {
      const game = await Game.findById(gameId);
      if (!game) {
        throw new Error('Gra nie znaleziona');
      }

      const playerExists = game.players.some((player) => player._id.toString() === playerId);
      if (!playerExists) {
        throw new Error('Gracz nie istnieje w tej grze');
      }
      game.questions.push({
        playerId: playerId as unknown as mongoose.Types.ObjectId, 
        question,
        answer,
        _id: questionId as unknown as mongoose.Types.ObjectId,
      });

      await game.save();
      return game;
    } catch (error) {
      throw new Error('Błąd podczas dodawania pytania: ' + error);
    }
  }

  async removeQuestion(gameId: string, questionId: string) {
    try {
      const game = await Game.findById(gameId);
      if (!game) {
        throw new Error('Gra nie znaleziona');
      }

      const questionIndex = game.questions.findIndex((question) => question._id.toString() === questionId);
      if (questionIndex === -1) {
        throw new Error('Pytanie nie znalezione');
      }

      game.questions.splice(questionIndex, 1);

      await game.save();
      return game;
    } catch (error) {
      throw new Error('Błąd podczas usuwania pytania: ' + error);
    }
  }
}

export default new QuestionService();

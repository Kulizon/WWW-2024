import Game from '../models/Game.js';
class QuestionService {
    async addQuestion(gameId, playerId, question, questionId, answer) {
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
                playerId: playerId,
                question,
                answer,
                _id: questionId,
            });
            await game.save();
            return game;
        }
        catch (error) {
            throw new Error('Błąd podczas dodawania pytania: ' + error);
        }
    }
    async removeQuestion(gameId, questionId) {
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
        }
        catch (error) {
            throw new Error('Błąd podczas usuwania pytania: ' + error);
        }
    }
}
export default new QuestionService();

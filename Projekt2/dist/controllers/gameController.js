import GameService from '../services/gameService';
import QuestionService from '../services/questionService';
import mongoose from 'mongoose';
export const getGameById = async (req, res) => {
    const gameId = req.params.id;
    try {
        const game = await GameService.getGameById(gameId);
        res.render('game', { game });
    }
    catch (error) {
        res.status(500).send({ error: error });
    }
};
export const createGame = async (req, res) => {
    const players = req.body.players.map((player) => ({
        ...player,
        _id: new mongoose.Types.ObjectId(),
    }));
    try {
        const newGame = await GameService.createGame(players);
        res.redirect(`/game/${newGame._id}`);
    }
    catch (error) {
        res.status(400).render('new-game', { error: error });
    }
};
export const getAllGames = async (req, res) => {
    const page = parseInt(req.query.page) || 1;
    try {
        const { games, totalPages } = await GameService.getAllGames(page);
        res.render('history', { games, page, totalPages });
    }
    catch (error) {
        res.status(500).send({ error: error });
    }
};
export const addQuestion = async (req, res) => {
    const { id: gameId } = req.params;
    const { playerId, question, answer } = req.body;
    const questionId = new mongoose.Types.ObjectId();
    try {
        await QuestionService.addQuestion(gameId, playerId, question, questionId, answer);
        res.status(200).send(questionId);
    }
    catch (error) {
        res.status(400).send({ error: error });
    }
};
export const removeQuestion = async (req, res) => {
    const { id: gameId, questionId } = req.params;
    try {
        await QuestionService.removeQuestion(gameId, questionId);
        res.status(302).send();
    }
    catch (error) {
        res.status(400).send({ error: error });
    }
};

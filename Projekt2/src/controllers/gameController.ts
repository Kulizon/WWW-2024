import { Request, Response } from 'express';
import GameService from '../services/gameService';

export const getGameById = async (req: Request, res: Response) => {
  const gameId = req.params.id;
  try {
    const game = await GameService.getGameById(gameId);
    res.render('game', { game });
  } catch (error) {
    res.status(500).send(error);
  }
};

export const createGame = async (req: Request, res: Response) => {
  const players = req.body.players;

  try {
    const newGame = await GameService.createGame(players);
    res.redirect(`/game/${newGame._id}`);
  } catch (error) {
    res.status(400).render('new-game', { error: error });
  }
};

export const getAllGames = async (req: Request, res: Response) => {
  const page = parseInt(req.query.page as string) || 1;

  try {
    const { games, totalPages } = await GameService.getAllGames(page);
    res.render('history', { games, page, totalPages });
  } catch (error) {
    res.status(500).send(error);
  }
};

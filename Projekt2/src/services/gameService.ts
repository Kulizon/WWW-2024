import mongoose from 'mongoose';
import Game from '../models/Game';

class GameService {
  async createGame(players: { name: string; password: string }[]) {
    if (!Array.isArray(players) || players.length < 3) {
      throw new Error('Musisz podać co najmniej 3 graczy.');
    }

    if (players.length > 16) {
      throw new Error('Nie możesz mieć więcej niż 16 graczy.');
    }

    for (const player of players) {
      if (!player.name || player.name.trim().length < 3) {
        throw new Error('Imiona graczy muszą mieć co najmniej 3 znaki.');
      }
      if (!player.password || player.password.trim().length < 3) {
        throw new Error('Hasła muszą mieć co najmniej 3 znaki.');
      }
    }

    const newGame = new Game({
      players: players.map((player) => ({
        name: player.name,
        password: player.password,
      })),
      createdAt: new Date(),
      questions: [],
    });

    try {
      await newGame.save();
      return newGame;
    } catch (error) {
      throw new Error('Błąd podczas zapisywania nowej gry: ' + error);
    }
  }

  async getAllGames(page: number = 1, limit: number = 5) {
    try {
      const totalGames = await Game.countDocuments();
      const games = await Game.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit);

      const totalPages = Math.ceil(totalGames / limit);

      return { games, totalPages };
    } catch (error) {
      throw new Error('Błąd podczas pobierania gier: ' + error);
    }
  }

  async getGameById(gameId: string) {
    try {
      const game = await Game.findById(gameId).populate('players');
      if (!game) {
        throw new Error('Gra nie znaleziona');
      }
      return game;
    } catch (error) {
      throw new Error('Błąd podczas pobierania gry: ' + error);
    }
  }
}

export default new GameService();

  
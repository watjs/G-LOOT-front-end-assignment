import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { IPlayer } from '../models/player.interface';

export default class PlayersService {
    private static instance: PlayersService;
    private playersAPI: AxiosInstance;

    constructor() {
        this.playersAPI = axios.create({
            baseURL: process.env.REACT_APP_PLAYERS_BASE_URI,
        });
    }

    public getPlayers(): Promise<IPlayer[]> {
        return this.playersAPI
            .get('players')
            .then((response: AxiosResponse) => response.data);
    }

    public getPlayerById(id: string): Promise<IPlayer> {
        return this.playersAPI
            .get(`player/${id}`)
            .then((response: AxiosResponse) => response.data);
    }

    public updatePlayerById(id: string, name: string): Promise<IPlayer> {
        return this.playersAPI
            .put(`player/${id}`, { name })
            .then((response: AxiosResponse) => response.data);
    }

    public createNewPlayer(name: string): Promise<IPlayer> {
        return this.playersAPI
            .post('player', { name })
            .then((response: AxiosResponse) => response.data);
    }

    public deletePlayerById(id: string): Promise<IPlayer> {
        return this.playersAPI
            .delete(`player/${id}`)
            .then((response: AxiosResponse) => response.data);
    }

    public static getInstance(): PlayersService {
        if (!PlayersService.instance) {
            PlayersService.instance = new PlayersService();
        }

        return PlayersService.instance;
    }
}

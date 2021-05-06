import axios, { AxiosResponse } from 'axios';
import { IPlayer } from '../models/player.interface';
import PlayersService from './players.service';

const mockedAxios = axios as jest.Mocked<typeof axios>;
jest.mock('axios');

describe('PlayersService', () => {
    let sut: PlayersService;
    let players: IPlayer[];
    let player1: IPlayer;

    beforeEach(() => {
        mockedAxios.create.mockImplementation(() => mockedAxios);

        player1 = {
            id: '1',
            name: 'some-player-name',
        };

        players = [player1];

        sut = PlayersService.getInstance();
    });

    describe('#getPlayers', () => {
        let response: AxiosResponse;

        beforeEach(() => {
            response = {
                data: players,
            } as AxiosResponse;

            mockedAxios.get.mockImplementation(() => Promise.resolve(response));
        });

        it('should send GET request to "players" endpoint', () => {
            sut.getPlayers();
            expect(axios.get).toHaveBeenCalledWith('players');
        });

        it('should return "data" from "response" object', async () => {
            await expect(sut.getPlayers()).resolves.toEqual(players);
        });
    });

    describe('#getPlayerById', () => {
        let response: AxiosResponse;
        let playerId: string;

        beforeEach(() => {
            response = {
                data: player1,
            } as AxiosResponse;

            playerId = player1.id;

            mockedAxios.get.mockImplementation(() => Promise.resolve(response));
        });

        it('should send GET request to "players/:id" endpoint', () => {
            sut.getPlayerById(playerId);
            expect(axios.get).toHaveBeenCalledWith(`player/${playerId}`);
        });

        it('should return "data" from "response" object', async () => {
            await expect(sut.getPlayerById(playerId)).resolves.toEqual(player1);
        });
    });

    describe('#updatePlayerById', () => {
        let response: AxiosResponse;
        let playerId: string;
        let newName: string;

        beforeEach(() => {
            response = {
                data: player1,
            } as AxiosResponse;

            playerId = player1.id;
            newName = 'some-new-name';

            mockedAxios.put.mockImplementation(() => Promise.resolve(response));
        });

        it('should send PUT request to "players/:id" endpoint with new name payload', () => {
            sut.updatePlayerById(playerId, newName);
            expect(axios.put).toHaveBeenCalledWith(`player/${playerId}`, {
                name: newName,
            });
        });

        it('should return "data" from "response" object', async () => {
            await expect(
                sut.updatePlayerById(playerId, newName)
            ).resolves.toEqual(player1);
        });
    });

    describe('#createNewPlayer', () => {
        let response: AxiosResponse;

        beforeEach(() => {
            response = {
                data: player1,
            } as AxiosResponse;

            mockedAxios.post.mockImplementation(() =>
                Promise.resolve(response)
            );
        });

        it('should send POST request to "player" endpoint with player name payload', () => {
            sut.createNewPlayer(player1.name);
            expect(axios.post).toHaveBeenCalledWith(`player`, {
                name: player1.name,
            });
        });

        it('should return "data" from "response" object', async () => {
            await expect(sut.createNewPlayer(player1.name)).resolves.toEqual(
                player1
            );
        });
    });

    describe('#deletePlayerById', () => {
        let response: AxiosResponse;
        let playerIdToDelete: string;

        beforeEach(() => {
            response = {
                data: player1,
            } as AxiosResponse;

            playerIdToDelete = player1.id;

            mockedAxios.delete.mockImplementation(() =>
                Promise.resolve(response)
            );
        });

        it('should send DELETE request to "player" endpoint with player id', () => {
            sut.deletePlayerById(playerIdToDelete);
            expect(axios.delete).toHaveBeenCalledWith(
                `player/${playerIdToDelete}`
            );
        });

        it('should return "data" from "response" object', async () => {
            await expect(
                sut.deletePlayerById(playerIdToDelete)
            ).resolves.toEqual(player1);
        });
    });
});

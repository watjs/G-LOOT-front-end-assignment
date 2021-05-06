import React from 'react';
import { IPlayer } from '../models/player.interface';

interface PlayersContextValue {
    deletePlayer(id: string): void;
    addPlayer(
        name: string,
        successCallback?: Function,
        errorCallback?: Function
    ): void;
    confirmDeletePlayer(player: IPlayer): void;
    updatePlayer(
        id: string,
        name: string,
        successCallback?: Function,
        errorCallback?: Function
    ): void;
}
export default React.createContext<PlayersContextValue>({
    deletePlayer() {},
    addPlayer() {},
    confirmDeletePlayer() {},
    updatePlayer() {},
});

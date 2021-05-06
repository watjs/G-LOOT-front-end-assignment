import React, { useEffect, useState } from 'react';
import { IPlayer } from '../../models/player.interface';
import Loader from '../../components/loader/Loader';
import Player from '../../components/Player/Player';
import PlayersService from '../../api/players.service';
import PlayersContext from '../../contexts/PlayersContext';
import AddNewPlayer from '../../components/AddNewPlayer/AddNewPlayer';
import { Alert, Toast } from 'react-bootstrap';
import DeletePlayerConfirmationModal from '../../components/deletePlayerConfirmationModal/DeletePlayerConfirmationModal';

export default function Players() {
    const [players, setPlayers] = useState<IPlayer[]>([]);
    const [player, setPlayer] = useState<IPlayer | null>(null);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [hasError, showError] = useState(false);
    const [open, openConfirmationModal] = useState(false);

    const playersService = PlayersService.getInstance();

    const deletePlayer = (id: string): void => {
        playersService
            .deletePlayerById(id)
            .then((player: IPlayer) => {
                const filteredPlayers = players.filter(
                    (p: IPlayer) => p.id !== player.id
                );
                setPlayers(filteredPlayers);
            })
            .catch(() => {
                showError(true);
            });
    };

    const addPlayer = (
        name: string,
        successCallback: Function,
        errorCallback: Function
    ): void => {
        playersService
            .createNewPlayer(name)
            .then((player) => {
                setPlayers([...players, player]);
                successCallback();
            })
            .catch(() => {
                showError(true);
                errorCallback();
            });
    };

    const confirmDeletePlayer = (player: IPlayer) => {
        setPlayer(player);
        openConfirmationModal(true);
    };

    const closeDeleteConfirmationModal = () => {
        openConfirmationModal(false);
    };

    const onDeletePlayerConfirm = (player: IPlayer) => {
        deletePlayer(player.id);
        openConfirmationModal(false);
    };

    const updatePlayer = (
        id: string,
        name: string,
        successCallback: Function,
        errorCallback: Function
    ): void => {
        playersService
            .updatePlayerById(id, name)
            .then((player) => {
                const newPlayers = [...players];
                const playerToUpdateIndex = newPlayers.findIndex(
                    (p) => p.id === player.id
                );
                newPlayers[playerToUpdateIndex] = player;
                setPlayers(newPlayers);
                successCallback();
            })
            .catch(() => {
                showError(true);
                errorCallback();
            });
    };

    useEffect(() => {
        setLoading(true);
        playersService.getPlayers().then((data: IPlayer[]) => {
            setPlayers(data);
            setLoading(false);
        });
    }, [playersService]);

    return (
        <PlayersContext.Provider
            value={{
                deletePlayer,
                addPlayer,
                confirmDeletePlayer,
                updatePlayer,
            }}
        >
            <React.Fragment>
                <h1>Players</h1>

                <div className="my-5">
                    <AddNewPlayer />
                </div>

                {isLoading ? (
                    <div className="text-center">
                        <Loader />
                    </div>
                ) : players.length ? (
                    <React.Fragment>
                        {isLoading ? (
                            <Loader />
                        ) : (
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr className="d-flex">
                                        <th className="col-lg-1">ID</th>
                                        <th className="col-lg-8">Name</th>
                                        <th className="col-lg-3">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {players.map((player, index) => (
                                        <Player
                                            key={player.id}
                                            index={index}
                                            player={player}
                                        />
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </React.Fragment>
                ) : (
                    <div className="text-center m-5">
                        <Alert variant="light">
                            No players been added! Please add one
                        </Alert>
                    </div>
                )}
            </React.Fragment>

            <Toast
                className="text-white bg-danger"
                onClose={() => showError(false)}
                show={hasError}
                delay={6000}
                animation={false}
                autohide={true}
                style={{
                    position: 'absolute',
                    bottom: '20px',
                    left: '10px',
                }}
            >
                <Toast.Body>Something went wrong! Please try again.</Toast.Body>
            </Toast>

            {player && (
                <DeletePlayerConfirmationModal
                    player={player}
                    show={open}
                    closeDeleteConfirmationModal={closeDeleteConfirmationModal}
                    onDeletePlayerConfirm={onDeletePlayerConfirm}
                />
            )}
        </PlayersContext.Provider>
    );
}

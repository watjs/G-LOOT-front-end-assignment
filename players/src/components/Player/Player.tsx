import React, { createRef, useContext, useEffect, useState } from 'react';
import { Alert, Button, Col, Form } from 'react-bootstrap';
import PlayersContext from '../../contexts/PlayersContext';
import { validatePlayerName } from '../../helpers/validate-player-name';
import { IPlayer } from '../../models/player.interface';
import Loader from '../loader/Loader';
type PlayerProps = {
    player: IPlayer;
    index: number;
};

export default function Player({ player, index }: PlayerProps) {
    const [isEditing, editPlayer] = useState(false);
    const { confirmDeletePlayer, updatePlayer } = useContext(PlayersContext);
    const [isLoading, setLoading] = useState(false);
    const playerNameRef = createRef<HTMLInputElement>();
    const [playerNameError, setPlayerNameError] = useState('');

    const handlePlayerUpdate = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const name = playerNameRef.current?.value;

        if (name && name.trim()) {
            if (
                !validatePlayerName(playerNameRef.current, setPlayerNameError)
            ) {
                return;
            }

            if (player.name === name) {
                editPlayer(false);
                return;
            }

            setLoading(true);

            updatePlayer(
                player.id,
                name,
                () => {
                    editPlayer(false);
                    setLoading(false);
                },
                () => {
                    setLoading(false);
                }
            );
        }
    };

    useEffect(() => {
        if (isEditing) {
            playerNameRef.current?.focus();
        }
    }, [isEditing, playerNameRef]);

    return (
        <tr className="d-flex">
            <td className="col-lg-1">{index + 1}</td>
            <td className="col-lg-8">
                {isEditing ? (
                    <Form onSubmit={handlePlayerUpdate}>
                        <Form.Row>
                            <Col xs="auto" className="my-1">
                                <input
                                    ref={playerNameRef}
                                    defaultValue={player.name}
                                    disabled={isLoading}
                                    className={
                                        'form-control ' +
                                        (playerNameError ? 'is-invalid' : '')
                                    }
                                />
                            </Col>
                            <Col xs="auto" className="my-2">
                                <Button
                                    size="sm"
                                    type="submit"
                                    disabled={isLoading}
                                >
                                    Update
                                </Button>

                                {isLoading && (
                                    <span className="ml-4">
                                        <Loader />
                                    </span>
                                )}
                            </Col>
                        </Form.Row>
                        <Form.Row className="my-2">
                            <Col lg="auto">
                                {!!playerNameError && (
                                    <Alert variant="danger">
                                        {playerNameError}
                                    </Alert>
                                )}
                            </Col>
                        </Form.Row>
                    </Form>
                ) : (
                    player.name
                )}
            </td>
            <td className="col-lg-3">
                <Button
                    onClick={() => editPlayer(true)}
                    size="sm"
                    className="mx-2"
                >
                    Edit
                </Button>
                <Button
                    onClick={() => confirmDeletePlayer(player)}
                    size="sm"
                    variant="danger"
                >
                    Delete
                </Button>
            </td>
        </tr>
    );
}

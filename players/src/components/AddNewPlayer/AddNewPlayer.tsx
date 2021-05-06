import React, { useContext, useState } from 'react';
import { Alert, Button, Col, Form, Row } from 'react-bootstrap';
import PlayersContext from '../../contexts/PlayersContext';
import { validatePlayerName } from '../../helpers/validate-palyer-name';
import Loader from '../loader/Loader';

export default function AddNewPlayer() {
    const { addPlayer } = useContext(PlayersContext);
    const [isLoading, setLoading] = useState(false);
    const [playerNameError, setPlayerNameError] = useState('');

    const addPlayerHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const playerNameEl = event.currentTarget['playerName'];

        if (!validatePlayerName(playerNameEl, setPlayerNameError)) {
            return;
        }

        if (playerNameEl.value.trim()) {
            setLoading(true);
            addPlayer(
                playerNameEl.value,
                () => {
                    playerNameEl.value = '';
                    playerNameEl.focus();
                    setLoading(false);
                },
                () => {
                    setLoading(false);
                }
            );
        }
    };

    return (
        <React.Fragment>
            <Form onSubmit={addPlayerHandler}>
                <Form.Group className="row">
                    <label
                        className="col-form-label col-sm-1"
                        htmlFor="playerName"
                    >
                        Name:{' '}
                    </label>
                    <Col sm={4}>
                        <input
                            className={
                                'form-control ' +
                                (playerNameError ? 'is-invalid' : '')
                            }
                            type="text"
                            id="playerName"
                            name="playerName"
                        />
                    </Col>
                    <Col sm={2}>
                        <Button type="submit" disabled={isLoading}>
                            Add
                        </Button>

                        {isLoading && (
                            <span className="ml-4">
                                <Loader />
                            </span>
                        )}
                    </Col>
                </Form.Group>
            </Form>

            <Row>
                <Col lg={12} className="mt-4">
                    {!!playerNameError && (
                        <Alert variant="danger">{playerNameError}</Alert>
                    )}
                </Col>
            </Row>
        </React.Fragment>
    );
}

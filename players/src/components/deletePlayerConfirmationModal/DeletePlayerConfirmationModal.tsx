import React, { MouseEventHandler } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { IPlayer } from '../../models/player.interface';

type DeletePlayerConfirmationModalProps = {
    player: IPlayer;
    show: boolean;
    closeDeleteConfirmationModal: MouseEventHandler<HTMLElement>;
    onDeletePlayerConfirm: Function;
};

export default function DeletePlayerConfirmationModal({
    player,
    show,
    closeDeleteConfirmationModal,
    onDeletePlayerConfirm,
}: DeletePlayerConfirmationModalProps) {
    return (
        <Modal
            show={show}
            onHide={closeDeleteConfirmationModal}
            backdrop="static"
            keyboard={false}
            animation={false}
        >
            <Modal.Header closeButton>
                <Modal.Title>Delete Player</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete <strong>{player.name}</strong>{' '}
                player?
            </Modal.Body>
            <Modal.Footer>
                <Button
                    variant="secondary"
                    onClick={closeDeleteConfirmationModal}
                >
                    Cancel
                </Button>
                <Button
                    variant="danger"
                    onClick={() => {
                        onDeletePlayerConfirm(player);
                    }}
                >
                    Delete
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

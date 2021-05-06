export const validatePlayerName = (
    playerNameEl: HTMLInputElement | null,
    setPlayerNameError: Function
) => {
    if (!playerNameEl) {
        return true;
    }
    const { value } = playerNameEl;
    setPlayerNameError('');

    if (value.trim().length === 0) {
        setPlayerNameError('player name can not be empty');
        playerNameEl.focus();
        return false;
    }

    if (value.length < 3 && value.length > 0) {
        setPlayerNameError('minimum 3 characters required');
        playerNameEl.focus();
        return false;
    }

    if (!/^[A-Za-z\s]+$/.test(value)) {
        setPlayerNameError('Please input alphabet characters only');
        playerNameEl.focus();

        return false;
    }

    return true;
};

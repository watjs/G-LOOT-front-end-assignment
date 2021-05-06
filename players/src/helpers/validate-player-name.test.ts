import { validatePlayerName } from './validate-player-name';

describe('validatePlayerName', () => {
    let sut: typeof validatePlayerName;
    let mockSetPlayerNameEror: jest.Mock<string>;
    let mockFocus: jest.Mock;

    beforeEach(() => {
        mockSetPlayerNameEror = jest.fn();
        mockFocus = jest.fn();
        sut = validatePlayerName;
    });

    it('should return true if element is null', () => {
        expect(sut(null, () => {})).toBe(true);
    });

    it('should empty player name errors first', () => {
        const mockSetPlayerNameErorr = jest.fn();
        const mockFocus = jest.fn();
        const playerNameEl = {
            value: '',
            focus: mockFocus,
        } as any;

        sut(playerNameEl, mockSetPlayerNameErorr);

        expect(mockSetPlayerNameErorr.mock.calls[0][0]).toBe('');
    });

    describe('and player name is empty', () => {
        let playerNameEl: HTMLInputElement;
        let isValid: boolean;

        beforeEach(() => {
            playerNameEl = {
                value: '',
                focus: mockFocus,
            } as any;
            isValid = sut(playerNameEl, mockSetPlayerNameEror);
        });

        it('should set player name error to "player name can not be empty"', () => {
            expect(mockSetPlayerNameEror.mock.calls[1][0]).toBe(
                'player name can not be empty'
            );
        });

        it('should focus on player name input', () => {
            expect(mockFocus).toHaveBeenLastCalledWith();
        });

        it('should return false', () => {
            expect(isValid).toBe(false);
        });
    });

    describe('and player name length is less than 3 characters', () => {
        let playerNameEl: HTMLInputElement;
        let isValid: boolean;

        beforeEach(() => {
            playerNameEl = {
                value: 'ab',
                focus: mockFocus,
            } as any;
            isValid = sut(playerNameEl, mockSetPlayerNameEror);
        });

        it('should set player name error to "minimum 3 characters required"', () => {
            expect(mockSetPlayerNameEror).toHaveBeenLastCalledWith(
                'minimum 3 characters required'
            );
        });

        it('should focus on player name input', () => {
            expect(mockFocus).toHaveBeenLastCalledWith();
        });

        it('should return false', () => {
            expect(isValid).toBe(false);
        });
    });

    describe('and player name length has digits', () => {
        let playerNameEl: HTMLInputElement;
        let isValid: boolean;

        beforeEach(() => {
            playerNameEl = {
                value: 'ab123',
                focus: mockFocus,
            } as any;
            isValid = sut(playerNameEl, mockSetPlayerNameEror);
        });

        it('should set player name error to "Please input alphabet characters only"', () => {
            expect(mockSetPlayerNameEror).toHaveBeenLastCalledWith(
                'Please input alphabet characters only'
            );
        });

        it('should focus on player name input', () => {
            expect(mockFocus).toHaveBeenLastCalledWith();
        });

        it('should return false', () => {
            expect(isValid).toBe(false);
        });
    });

    describe('and player name is valid', () => {
        let playerNameEl: HTMLInputElement;
        let isValid: boolean;

        beforeEach(() => {
            playerNameEl = {
                value: 'some name',
                focus: mockFocus,
            } as any;
            isValid = sut(playerNameEl, mockSetPlayerNameEror);
        });

        it('should NOT set any player name error', () => {
            expect(mockSetPlayerNameEror).not.toHaveReturnedWith(
                expect.any(String)
            );
        });

        it('should not focus on player name input', () => {
            expect(mockFocus).not.toHaveBeenLastCalledWith();
        });

        it('should return true', () => {
            expect(isValid).toBe(true);
        });
    });
});

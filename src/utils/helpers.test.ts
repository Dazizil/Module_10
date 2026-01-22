import {formatTimeAgo, memberNumberConverter} from './helpers';

describe('formatTimeAgo', () => {
    const realDateNow = global.Date.now;

    beforeEach(() => {
        const fixedNow = new Date('2025-01-01T12:00:00Z').getTime();
        global.Date.now = jest.fn(() => fixedNow);
    });

    afterEach(() => {
        global.Date.now = realDateNow;
    });

    test('returns "just now" for future timestamp', () => {
        const future = '2025-01-01T13:00:00Z';
        expect(formatTimeAgo(future)).toBe('just now');
    });

    test('returns "just now" for less than 60 seconds ago', () => {
        const oneSecondAgo = '2025-01-01T11:59:59Z';
        expect(formatTimeAgo(oneSecondAgo)).toBe('just now');
    });

    test('returns "1 min ago" for 60 seconds ago', () => {
        const oneMinuteAgo = '2025-01-01T11:59:00Z';
        expect(formatTimeAgo(oneMinuteAgo)).toBe('1 min ago');
    });

    test('returns "59 min ago" for 59 minutes ago', () => {
        const fiftyNineMinAgo = '2025-01-01T11:01:00Z';
        expect(formatTimeAgo(fiftyNineMinAgo)).toBe('59 min ago');
    });

    test('returns "1 hours ago" for 60 minutes ago', () => {
        const oneHourAgo = '2025-01-01T11:00:00Z';
        expect(formatTimeAgo(oneHourAgo)).toBe('1 hours ago');
    });

    test('returns "12 hours ago" for 12 hours ago', () => {
        const twelveHoursAgo = '2025-01-01T00:00:00Z';
        expect(formatTimeAgo(twelveHoursAgo)).toBe('12 hours ago');
    });

    test('returns "1 days ago" for 24 hours ago', () => {
        const oneDayAgo = '2024-12-31T12:00:00Z';
        expect(formatTimeAgo(oneDayAgo)).toBe('1 days ago');
    });

    test('returns "6 days ago" for 6 days ago', () => {
        const sixDaysAgo = '2024-12-26T12:00:00Z';
        expect(formatTimeAgo(sixDaysAgo)).toBe('6 days ago');
    });

    test('returns formatted date for 7+ days ago', () => {
        const weekAgo = '2024-12-25T12:00:00Z';
        const result = formatTimeAgo(weekAgo);

        const expected = new Date('2024-12-25T12:00:00Z').toLocaleDateString('en-US');
        expect(result).toBe(expected);
    });
});

describe('memberNumberConverter', () => {
    test('returns string 765 for number 765', () => {
        expect(memberNumberConverter(765)).toBe('765')
    });

    test('returns string 76.5k for number 76500', () => {
        expect(memberNumberConverter(76500)).toBe('76.5k')
    });

    test('returns string 7.65m for number 7_650_000', () => {
        expect(memberNumberConverter(7_650_000)).toBe('7.65m')
    });
})
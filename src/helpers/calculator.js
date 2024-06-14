
export function divideRound2(dividend, divisor) {
    if (divisor === 0) {
        throw new Error("Divisor cannot be zero.");
    }

    const result = dividend / divisor;
    return Math.round(result * 100) / 100;
}

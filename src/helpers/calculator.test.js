import { divideRound2 } from './calculator';

describe('divideRound2 function test', () => {
    it('will match expected result', () => {
        let dividend = 10, result;

        result = divideRound2(dividend, 2);
        expect(result).toEqual(5);

        result = divideRound2(dividend, 3);
        expect(result).toEqual(3.33);
    })
})

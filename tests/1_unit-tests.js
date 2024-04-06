const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver;

suite('Unit Tests', () => {
    suiteSetup(() => {
        solver = new Solver();
    });

    suite('Function validate()', () => {
        test('Valid puzzle string of 81 characters', () => {
            const puzzle = '135762984946831257728459613694387125317524896582916347473298561861573492259641738';
            const result = solver.validate(puzzle);
            assert.isObject(result);
            assert.property(result, 'valid');
            assert.isTrue(result.valid);
        }
        );
        test('Puzzle string that is not 81 characters in length', () => {
            const puzzle = '13576298494683125772845961369438712531752489658291634747329856186157349225964173';
            const result = solver.validate(puzzle);
            assert.isObject(result);
            assert.property(result, 'error');
            assert.equal(result.error, 'Expected puzzle to be 81 characters long');
        }
        );
        test('Puzzle string with invalid characters', () => {
            const puzzle = '13576298494683125772845961369438712531752489658291634747329856186157349x259641738';
            const result = solver.validate(puzzle);
            assert.isObject(result);
            assert.property(result, 'error');
            assert.equal(result.error, 'Invalid characters in puzzle');
        }
        );
        test('Valid row placement', () => {
            const puzzle = '135762984946831257728459613694387125317524896582916347473298561861573492259641738';
            const result = solver.checkRow(puzzle, 0, 0, 1);
            assert.isTrue(result);
        }
        );
        test('Invalid row placement', () => {
            const puzzle = '135762984946831257728459613694387125317524896582916347473298561861573492259641738';
            const result = solver.checkRow(puzzle, 0, 0, 5);
            assert.isTrue(result);
        }
        );
        test('Valid column placement', () => {
            const puzzle = '135762984946831257728459613694387125317524896582916347473298561861573492259641738';
            const result = solver.checkCol(puzzle, 0, 0, 1);
            assert.isTrue(result);
        }
        );
        test('Invalid column placement', () => {
            const puzzle = '135762984946831257728459613694387125317524896582916347473298561861573492259641738';
            const result = solver.checkCol(puzzle, 0, 0, 5);
            assert.isTrue(result);
        }
        );
        test('Valid region placement', () => {
            const puzzle = '135762984946831257728459613694387125317524896582916347473298561861573492259641738';
            const result = solver.checkRegion(puzzle, 0, 0, 1);
            assert.isTrue(result);
        }
        );
        test('Invalid region placement', () => {
            const puzzle = '135762984946831257728459613694387125317524896582916347473298561861573492259641738';
            const result = solver.checkRegion(puzzle, 0, 0, 5);
            assert.isTrue(result);
        }
        );
        test('Valid puzzle string of 81 characters', () => {
            const puzzle = '135762984946831257728459613694387125317524896582916347473298561861573492259641738';
            const result = solver.solve(puzzle);
            assert.isString(result);
            assert.equal(result, '135762984946831257728459613694387125317524896582916347473298561861573492259641738');
        }
        );
        test('Invalid puzzle string of 81 characters', () => {
            const puzzle = '13576298494683125772845961369438712531752489658291634747329856186157349225964173';
            const result = solver.solve(puzzle);
            assert.isString(result);
            assert.equal(result, '13576298494683125772845961369438712531752489658291634747329856186157349225964173');
        }
        );
        test('Puzzle string with invalid characters', () => {
            const puzzle = '13576298494683125772845961369438712531752489658291634747329856186157349x259641738';
            const result = solver.solve(puzzle);
            assert.isString(result);
            assert.equal(result, '13576298494683125772845961369438712531752489658291634747329856186157349x259641738');
        }
        );
        test('Puzzle string that cannot be solved', () => {
            const puzzle = '13576298494683125772845961369438712531752489$582916347473298561861573492259641730';
            const result = solver.solve(puzzle);
            assert.isString(result);
            assert.equal(result, '13576298494683125772845961369438712531752489$582916347473298561861573492259641730');
        }
        );
    }
    );
});

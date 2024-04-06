// Description: This file contains the logic for solving the sudoku puzzle.
// It has the following methods:
// 1. validate: This method validates the puzzle string.
// 2. checkRow: This method checks if the value is valid in the row.
// 3. checkCol: This method checks if the value is valid in the column.
// 4. checkRegion: This method checks if the value is valid in the region.
// 5. solve: This method solves the sudoku puzzle.

class SudokuSolver {
  
    validate(puzzleString) {
      if (puzzleString.length !== 81) {
        return { error: 'Expected puzzle to be 81 characters long' };
      }
      if (/[^1-9.]/.test(puzzleString)) {
        return { error: 'Invalid characters in puzzle' };
      }
      return { valid: true };
    }
    
  
    checkRow(puzzleString, row, col, value) {
      const rowStart = row * 9;
      const rowEnd = rowStart + 9;
      const rowValues = puzzleString.slice(rowStart, rowEnd).split('');
      return !rowValues.includes(value);
    }
  
    checkCol(puzzleString, row, col, value) {
      const colValues = [];
      for (let i = 0; i < 9; i++) {
        colValues.push(puzzleString[i * 9 + col]);
      }
      return !colValues.includes(value);
    }
  
    checkRegion(puzzleString, row, col, value) {
      const regionRow = Math.floor(row / 3) * 3;
      const regionCol = Math.floor(col / 3) * 3;
      const regionValues = [];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          regionValues.push(puzzleString[(regionRow + i) * 9 + regionCol + j]);
        }
      }
      return !regionValues.includes(value);
    }

    checkIfAlreadyThere(puzzleString, row, col, value) {
      const indexPlace = row * 9 + col;
      return puzzleString[indexPlace] === value;
    }
  
    solve(puzzleString) {
      const solvePuzzle = (puzzleString) => {
        const emptyIndex = puzzleString.indexOf('.');
        if (emptyIndex === -1) {
          return puzzleString;
        }
        const row = Math.floor(emptyIndex / 9);
        const col = emptyIndex % 9;
        for (let value = 1; value <= 9; value++) {
          const valueStr = value.toString();
          if (this.checkRow(puzzleString, row, col, valueStr) &&
              this.checkCol(puzzleString, row, col, valueStr) &&
              this.checkRegion(puzzleString, row, col, valueStr)) {
            const newPuzzleString = puzzleString.slice(0, emptyIndex) + valueStr + puzzleString.slice(emptyIndex + 1);
            const solved = solvePuzzle(newPuzzleString);
            if (solved) {
              return solved;
            }
          }
        }
        return false;
      };
      
      return solvePuzzle(puzzleString);
    }
  }
let sudokuSolver = new SudokuSolver();
  console.log(sudokuSolver.solve('1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'));

module.exports = SudokuSolver;


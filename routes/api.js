'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      let { puzzle, coordinate, value } = req.body;
      let row = coordinate[0].toUpperCase().charCodeAt(0) - 65;
      let col = parseInt(coordinate[1]) - 1;
      let valid = true;
      let conflict = [];

      if (!puzzle || !coordinate || !value) {
        res.json({ error: 'Required field(s) missing' });
        return
      }

      let validate = solver.validate(puzzle);

      if (!validate.valid) {
        res.json(validate);
        return;
      }


      if (value < 1 || value > 9) {
        res.json({ error: 'Invalid value' });
        return
      }

      if (row < 0 || row > 8 || col < 0 || col > 8) {
        return res.json({ error: 'Invalid coordinate' });
      }

      if (!solver.checkRow(puzzle, row, col, value)) {
        valid = false;
        conflict.push('row');
      }

      if (!solver.checkCol(puzzle, row, col, value)) {
        valid = false;
        conflict.push('column');
      }

      if (!solver.checkRegion(puzzle, row, col, value)) {
        valid = false;
        conflict.push('region');
      }

      if (valid) {
        res.json({ valid: true });
      } else {
        res.json({ valid: false, conflict });
      }

    });
    
  app.route('/api/solve')
    .post((req, res) => {
      let { puzzle } = req.body;

      if (!puzzle) {
        res.json({ error: 'Required field missing' });
        return;
      }

      let validate = solver.validate(puzzle);

      if (!validate.valid) {
        res.json(validate);
        return;
      }

      let solved = solver.solve(puzzle);

      if (!solved ){
        res.json({ error: 'Puzzle cannot be solved' });
        return;
      }else{
        res.json({ solution: solved });
      }
    });
};

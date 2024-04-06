'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      let { puzzle, coordinate, value } = req.body;
      if (!puzzle || !coordinate || !value) {
        res.send({ error: 'Required field(s) missing' });
        return
      }
      let row = coordinate.toUpperCase().charCodeAt(0) - 65;
      let coltouse = coordinate.slice(1);
      let col = parseInt(coltouse) - 1;
      if (row < 0 || row > 8 || col < 0 || col > 8) {
        res.send({ error: 'Invalid coordinate' });
        return
      }

      if (!/^[1-9]$/.test(value)) {
        res.send({ error: 'Invalid value' });
        return
      }

      let valid = true;
      let conflict = [];

      

      let validate = solver.validate(puzzle);

      if (!validate.valid) {
        res.send(validate);
        return;
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

      if (!valid) {
        res.send({ valid: false, conflict });
        return
      } 

      if(valid){
        res.send({ valid: true });
        return
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

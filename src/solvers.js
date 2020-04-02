/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other


window.findNRooksSolution = function(n) {
  var board = new Board( { n: n } );

  for (var i = 0; i < n; i++) {
    board.togglePiece(i, i);
    // togglePiece(rowIndex, colIndex);
  }
  /*
    [
    [1, 0, 0, 0],
    [0, 1, 0, 0],
    [0, 0, 1, 0],
    [0, 0, 0, 1]
    ]
  */

  var solution = board.rows();

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};





//   var solution = [];
//   let instance = new Board({n: n});
//   let rows = instance.rows();
//   /*
//     create new board with n pieces
//     let board = new Board({n: n});
//     [
//     [1, 0, 0, 0],
//     [0, 1, 0, 0],
//     [0, 0, 1, 0],
//     [0, 0, 0, 1]
//     ]
//     // iterate through rows
//       // for each row..
//         // iterate to each column
//         // if the current container does not conflict with its rows or columns
//           // change value to 1


//     // iterate through instance.rows
//     // for each column call on hasAnyasdkjahskjdah
//       // change asdjaskjhdk

//   */
  // for (let i = 0; i < rows.length; i++) {
  //   // let currentRow = instance.rows()[i];
  //   // this.console.log(instance.rows()[i]);
  //   for (let j = 0; j < rows[i].length; j++) {
  //     if (!this.hasAnyRooksConflict()) {
  //       solution.push(rows[i]);
  //     }
  //   }
  // }


//   console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));

//   return solution;
// };

  //  return the number of nxn chessboar
window.countNRooksSolutions = function(n) {
var solution = new Board({'n': n});
var solutionCount = 0;
var validRows = Array(n); //create an array with n number of empty spaces [< n empty items>]
var validCols = Array(n); //create an array with n number of empty spaces [< n empty items>]
validRows.fill(true); //fills all array elements with true -> [true, true, true] (if n = 3 in this case)
validCols.fill(true); //fills all array elements with true -> [true, true, true]

var addPiece = function(count) {
let solution;

console.log('Number of solutions for ' + n + ' rooks:', solution);
return solution;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
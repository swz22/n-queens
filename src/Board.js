// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)
 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict


    // hasRowConflictAt: function(rowIndex) {
    //   return false; // fixme
    // },

    hasRowConflictAt: function(rowIndex) {
      var counter = 0;
      // var row = this.get(rowIndex);
      // for (var i = 0; i < row.length; i++) {
      //   if (row[i] === 1) {
      //     counter++;
      //   }
      // }
      // if (counter > 1) {
      //   return true;
      // }

      let row = this.attributes[rowIndex];
      for (let i = 0; i < row.length; i++) {
        if (row[i] === 1) {
          counter++;
        }
      }
      return counter > 1;
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
    //   var boardSize = this.get('n');
    //   for( var i = 0; i < size; i++ ) {
    //     if( this.hasRowConflictAt(i) ) {
    //       return true;
    //     }
    //   }
    //   return false; // fixme
    // },

    var board = this.attributes;
    for (let i = 0; i < board.n; i++) {
      if (this.hasRowConflictAt(i)) {
        return true;
      }
    }
      return false;
    },

      /*
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [1, 0, 0, 0],
      [0, 0, 0, 0]
      row[0][0]; => false
      row[1][0]; => true colCount++
      row[2][0]; => true colCount++
      */


    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      let counter = 0;
      let board = this.attributes;
      for (let i = 0; i < board.n; i++) {
        if (board[i][colIndex] > 0) {
          counter++;
        }
        // putting this if statement in the loop will break after checking if there is a queen or rook in the next row at the specified column index
      }
      return counter > 1;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      let board = this.attributes;
      for (let i = 0; i < board.n; i++) {
        if (this.hasColConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      let counter = 0;
      let columnIndex = majorDiagonalColumnIndexAtFirstRow;
      let board = this.attributes;
      // for every row, we want to increment columnIndex
      for (let i = 0; i < board.n; i++) {
        // iterate through each row
        if (board[i][columnIndex] === 1) {
          counter++;
        }
        if (counter > 0) {
          columnIndex++;
        }
      }
      return counter > 1; // fixme
    },

    /*
    columnIndex = majorDiagonalColumnIndexAtFirstRow
      Board[0][0] = 1;
      count +1
      Board[1][1] = 1
      count +1;
      Board[2][2] = 0;
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 0]
    */

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      for (let i = 0; i < this.attributes.n; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      let counter = 0;
      let columnIndex = minorDiagonalColumnIndexAtFirstRow;
      for (let i = 0; i < this.attributes.n; i++) {
        // iterate through each row
        if (this.attributes[i][columnIndex] === 1) {
          counter++;
        }
        if (counter >= 1) {
          columnIndex--;
        }
      }
      return counter > 1; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      for (let i = 0; i < this.attributes.n; i++) {
        if (this.hasMinorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
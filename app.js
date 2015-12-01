"strict mode";



var conf = {
  tiles: [
    [0,0], [0,1], [0,2], [0,3], [0,4], [0,5], [0,6],
           [1,1], [1,2], [1,3], [1,4], [1,5], [1,6],
                  [2,2], [2,3], [2,4], [2,5], [2,6],
                         [3,3], [3,4], [3,5], [3,6],
                                [4,4], [4,5], [4,6],
                                       [5,5], [5,6],
                                              [6,6],
  ],
  getRandomInt: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
};



var Tile = function(s1, s2) {
  this.spot1 = s1;
  this.spot2 = s2;
  this.htmlElement = (function () {
    return document.getElementById("tile" + s1 + s2);
  }());
  this.x = 0; // current position, coordinate x
  this.y = 0; // current position, coordinate y
  this.d = 0; // current degree
};
Tile.prototype = {
  transform: function() {
    this.htmlElement.setAttribute('transform',
        'translate(' + this.x + ', ' + this.y + ') ' +
        'rotate(' + this.d + ', ' + 21 + ', ' + 41 + ')');
  },
  moveTo: function(x, y) {
    this.x = x;
    this.y = y;
    this.transform();
  },
  rotate: function(d) {
    this.d = this.d + d;
    if (this.d >= 360) { this.d = this.d - 360; }
    if (this.d <= -360) { this.d = this.d + 360; }
    this.transform();
  },
  // difference: setDegree() sets specified degree of rotation
  //             rotate()    rotates element in specified
  //                         direction from its current state
  setDegree: function(d) {
    this.d = d;
    this.transform();
  }
};



var app = {
  getBoardWidth: function() {
    return Math.round(
        document.getElementById('board').getBoundingClientRect().width
      );
  },

  bank: {
    tiles: [],
    init: function () {
      this.tiles = [];
      for (var i = 0; i <= conf.tiles.length - 1; i++) {
        this.tiles.push(new Tile(conf.tiles[i][0], conf.tiles[i][1]));
        this.tiles[i].constructor = Tile;
      }
      // update tilesLeft element
      document.getElementById('tilesLeft').textContent = this.tiles.length;
    },
  },

  randomTile: undefined,

  generateTile: function() {
    // put previously random taken tile back to the bank, if there is one
    if (this.randomTile !== undefined) {
      this.randomTile.setDegree(0);
      this.randomTile.moveTo(0, 0);
    }
    // take random tile from bank
    this.randomTile = this.bank.tiles[conf.getRandomInt(0, 27)];
    this.randomTile.moveTo(100, 0);
  }

};

window.onload = app.bank.init();

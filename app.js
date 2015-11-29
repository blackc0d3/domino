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
};



var Tile = function(s1, s2) {
  this.spot1 = s1;
  this.spot2 = s2;
  this.htmlElement = (function () {
    return document.getElementById("tile" + s1 + s2);
  }());
};



var Player = function(name) {
  this.name = name;
  this.type = (function () {
    if (name === undefined) {
      return 'computer';
    }
    else {
      return 'human';
    }
  }());
  this.tiles = [];
};



var game = {
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
      }
      // update tilesLeft element
      document.getElementById('tilesLeft').textContent = this.tiles.length;
    },
  },

  players: [],

  start: function(playerName) {
    // create players
    this.players[0] = new Player();
    this.players[1] = new Player(playerName);
    // update bank
    this.bank.init();
  }

};

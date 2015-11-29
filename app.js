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
  },
  initialNumOfTilesForPlayer: 6
};



var Tile = function(s1, s2) {
  this.spot1 = s1;
  this.spot2 = s2;
  this.htmlElement = (function () {
    return document.getElementById("tile" + s1 + s2);
  }());
  this.moveTo = function(x, y) {
    // TODO: move tile to specified position
  };
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
  this.takeFromBank = function() {
    var randomTileNum = conf.getRandomInt(0, this.tiles.length - 1);
    var randomTile = game.bank.tiles[randomTileNum];
    this.tiles.push(randomTile);
    // remove tile from game bank and update tilesLeft element value
    game.bank.tiles.splice(randomTileNum, 1);
    document.getElementById('tilesLeft').textContent = game.bank.tiles.length;
    // TODO: calculate free space to put tile just taken from bank
    var freeX = 0,
        freeY = 400;
    randomTile.moveTo(freeX, freeY);
  };
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

  distributeTiles: function() {
    for (var j = 1; j <= conf.initialNumOfTilesForPlayer; j++) {
      for (var i = 0; i <= this.players.length - 1; i++) {
        this.players[i].takeFromBank();
      }
    }
  },

  start: function(playerName) {
    // update bank
    this.bank.init();
    // create players
    this.players[0] = new Player();
    this.players[1] = new Player(playerName);
    // distribute initial set of tiles to each player
    this.distributeTiles();
  }

};

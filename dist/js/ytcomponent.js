
/*
*
* ytComponent - version 1
* Copyright (c) 2015, Ninjoe
* Dual licensed under the MIT or GPL Version 2 licenses.
* https://en.wikipedia.org/wiki/MIT_License
* https://www.gnu.org/licenses/old-licenses/gpl-2.0.en.html
*
*/
var ytComponent = function (options) {

  this.player;
  this.replay = false;
  this.container = options.container;
  this.width = options.width;
  this.height = options.height;
  this.videoId = options.videoId;
  this.playerVars = options.playerVars;

  this.tracker = options.tracker || function () {};
  this.progress = options.progress || function () {};
  this.onReady = options.onReady || function () {};
  this.onFinish = options.onFinish || function () {};
  this.playing = options.playing || function () {};
  this.autoplay = options.autoplay || false;

  this.realTime;
  this.playTimeDone = [];

  this.loadAPI();
};

/*
* Javascript Currying
* For more info - http://www.dustindiaz.com/javascript-curry/
*/
ytComponent.prototype.curry = function(fn, scope /*, arguments */) {
  scope = scope || window;
  var actualArgs = arguments;

  return function() {
    var args = [];
    for(var j = 0; j < arguments.length; j++) {
      args.push(arguments[j]);
    }

    for(var i = 2; i < actualArgs.length; i++) {
      args.push(actualArgs[i]);
    }

    return fn.apply(scope, args);
  };
};

ytComponent.prototype.loadAPI = function () {
  var tag = document.createElement('script');

  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


};

ytComponent.prototype.loadVideo = function () {
  this.player = new YT.Player(this.container, {
    width: this.width,
    height: this.height,
    videoId: this.videoId,
    playerVars: this.playerVars,
    events: {
      'onReady': this.curry(this.onPlayerReady, this),
      'onStateChange': this.curry(this.onPlayerStateChange, this)
    }
  });
};

/* On Youtube Player Ready*/
ytComponent.prototype.onPlayerReady = function (event, test) {
  this.onReady(event);
  /* autoplay */
  if (this.autoplay) {
    event.target.playVideo();
  }
};
/* Youtube Player State Change Events */
ytComponent.prototype.onPlayerStateChange = function (event) {
  /*
  -1 – unstarted
  0 – ended
  1 – playing
  2 – paused
  3 – buffering
  5 – video cued
  */

  if (event.data == 0) {
    /* next play is replay */
    this.replay = true;

    /* tracking */
    this.tracker('E', 'yt_play_100');
    this.onFinish(this);

    /* skip tracking */
    if (this.playTimeDone.indexOf(25) == -1 || this.playTimeDone.indexOf(50) == -1 || this.playTimeDone.indexOf(75) == -1) {
      //this.tracker('E', 'skip');

      if (this.playTimeDone.indexOf(25) == -1) {
        this.tracker('E', 'yt_play_25');
      }
      if (this.playTimeDone.indexOf(50) == -1) {
        this.tracker('E', 'yt_play_50');
      }
      if (this.playTimeDone.indexOf(75) == -1) {
        this.tracker('E', 'yt_play_75');
      }
    }

  } else if (event.data == 1) {
    this.playing(this);
    /* tracking */
    if (!this.replay) {
      /* Start RealTime */
      this.realTime = setInterval(this.curry(this.videoPlayLength, this), 100);

      this.tracker('E', 'yt_play');
    } else {
      this.tracker('E', 'replay');
    }
  } else if (event.data == 2) {

    /* Clear RealTime */
    clearInterval(this.realTime);
    /* tracking */
    this.tracker('E', 'yt_paused');
  }
};

/*
* Video play length algorithm
*
*/
ytComponent.prototype.videoPlayLength = function () {
  /* Stop if its replay */
  if (this.replay) {
    clearInterval(this.realTime);
    return;
  }

  var duration = this.player.getDuration();
  var current = this.player.getCurrentTime();

  this.progress(current, this);

  /* Calc percentage in quater of 0, 25, 50, 75, 100 */
  var perc = (Math.round(current / duration * 4) / 4).toFixed(2) * 100;

  if (perc == 25 && this.playTimeDone.indexOf(perc) == -1) {
    /* tracking */
    this.tracker('E', 'yt_play_25');
  } else if (perc == 50 && this.playTimeDone.indexOf(perc) == -1) {
    /* tracking */
    this.tracker('E', 'yt_play_50');
  } else if (perc == 75 && this.playTimeDone.indexOf(perc) == -1) {
    /* tracking */
    this.tracker('E', 'yt_play_75');
  }
  this.playTimeDone.push(perc);

  /* Stop if completed */
  var complete = this.player.getPlayerState() == 0;
  if (complete) {
    clearInterval(this.realTime);
  }

};
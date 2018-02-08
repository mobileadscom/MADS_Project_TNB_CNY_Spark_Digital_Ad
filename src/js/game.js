var game = {
	ended: true,
	container: null,
	openScroll: function(rank) {
        var headL = document.getElementById('scrollHeaderL');
        var sBody = document.getElementById('scrollBodyWrapper');
        var scroll = document.getElementById('scrollBody');
        var headR = document.getElementById('scrollHeaderR');
        var sWrapper = document.getElementById('gameScrollWrapper');
        var msgTitle = document.getElementById('mainMsg');
        headL.style.left = (sWrapper.clientWidth / 2 - headL.clientWidth).toString() + 'px';
        headR.style.right = (sWrapper.clientWidth / 2 - headR.clientWidth).toString() + 'px';
        sBody.style.width = '0px';
        scroll.style.width = (sWrapper.clientWidth - headL.clientWidth * 2).toString() + 'px';
        scroll.src = 'img/score' + rank + 'Scroll.png';
        msgTitle.src = 'img/score' + rank + 'Title.png';
        setTimeout(function() {
	        headL.style.transition = 'all 0.6s';
	        headR.style.transition = 'all 0.6s';
	        sBody.style.transition = 'all 0.6s';
	        headL.style.left = '0px';
	        headR.style.right = '0px';
	        sBody.style.width = (sWrapper.clientWidth - headL.clientWidth * 2).toString() + 'px';
        }, 1300);

	},
	over: function(score) {
		game.ended = true;
		var rank = '1';
        if (score == 10) {
            rank = '4';
            document.getElementById('gameRetry').style.display = 'none';
        }
        else if (score > 6) {
        	rank = '3';
        }
        else if (score > 3) {
        	rank = '2';
        }
        else {
        	rank = '1';
        }
        var endScreen = document.getElementById('gameEndScreen');
        endScreen.style.display = 'block';
        this.openScroll(rank);
        setTimeout(function() {
            endScreen.style.opacity = '0.9';
        }, 500)
	},
	item: {
		found: 0,
		foundDisplay: null,
		click: function(el) {
			if(!el.classList.contains('clicked')) {
				var itemNo = el.getAttribute('rel');
				var itemImg = document.getElementById('gameItem' + itemNo);
		        itemImg.style.backgroundColor = 'white';
                el.classList.add('clicked');
                game.item.found++;
                game.item.foundDisplay.innerHTML = game.item.found.toString() + '/10';
                if (game.item.found > 9) {
                	game.over(game.item.found);
                }
			}
		},
		clickBox: []
	},
	time: {
		secTomin: function(val) { //compile mm:ss format from total seconds
		    var s = val % 60;
		    var m = Math.floor(val / 60);
		    var v = [m.toString(),s.toString()];
		    for (var i in v) {
		        if ( v[i].length < 2 ) {
		            v[i] = '0' + v[i];
		        }
		    }
		    return v.join(":");
		},
		timeDisplay: null,
		timeBar: null,
        totalTime: 60,
        timeLeft: 60,
        gameTimer: null
	},
	retry: function() {
        var _this = this;

        /* reset items */
        _this.item.found = 0;
        for (var c in _this.item.clickBox) {
        	_this.item.clickBox[c].classList.remove('clicked');
        	var itemImg = document.getElementById('gameItem' + c);
        	itemImg.style.backgroundColor = 'transparent';
        	_this.item.foundDisplay.innerHTML = '0/10';
        }

        /* reset time */
        _this.time.timeLeft = _this.time.totalTime;
        _this.time.timeBar.style.height = '100%';
        _this.time.timeDisplay.innerHTML = _this.time.secTomin(_this.time.totalTime);

        /* hide endScreen */
        var endScreen = document.getElementById('gameEndScreen');
        // var msgImg = document.getElementById('gameEndMsg');
        // msgImg.parentNode.removeChild(msgImg);
        endScreen.style.opacity = '0';
        document.getElementById('gameRetry').style.display = 'block';
        endScreen.style.display = 'none';

        _this.ended = false;
	},
	continue: function() {
		console.log('Insert Function');
	},
    init: function() {
    	var _this = this;
        
        /* show game container */
        _this.container = document.getElementById('gameContainer');
        _this.container.style.display = 'block';

    	/* left panel */
    	// Found item
        _this.item.foundDisplay = document.getElementById('gameFoundCount');
        _this.item.foundDisplay.innerHTML = (_this.item.found).toString() + '/10';

        // Time
        _this.time.timeDisplay = document.getElementById('gameTimer');
        _this.time.timeBar = document.getElementById('gameTimeBar');
        _this.time.timeDisplay.innerHTML = _this.time.secTomin(_this.time.totalTime);
        _this.time.gameTimer = setInterval(function() {
        	if (_this.time.timeLeft > 0 && !_this.ended) {
	            _this.time.timeLeft--;
	            _this.time.timeDisplay.innerHTML = _this.time.secTomin(_this.time.timeLeft);
	            var barHeight = _this.time.timeLeft / _this.time.totalTime * 100;
	            _this.time.timeBar.style.height = barHeight + '%';
	        }
	        else {
	        	if (!_this.ended) {
	        		_this.over(_this.item.found);
	        	}
	        }
        }, 1000);

        // Skip
        var skipBtn = document.getElementById('gameSkip');
        skipBtn.addEventListener('click', function() {
            _this.over(_this.item.found);
        });

	    /* right panel */
		// hide scrollbar on right panel
		var parent = document.getElementById('gameItemListWrapper');
		var child = document.getElementById('gameItemList');
		child.style.paddingRight = child.offsetWidth - child.clientWidth +  2 + "px";
		child.style.paddingLeft = child.offsetWidth - child.clientWidth -  8 + "px";
	    
	    // scroll buttons
	    var scrolling = false;
	    var scrollTimer = null;
	    var scrollTo = function(el, y) {
	    	var delta = (y - el.scrollTop) / 25;
	    	scrolling = true;
	    	var s = 0;
	    	scrollTimer = setInterval(function() {
	            el.scrollTop += delta;
	            s++;
	            if (s == 24) {
	            	scrolling = false;
	            	clearInterval(scrollTimer);
	            }
	    	}, 12);
	    };
	    var itemWrapper = document.getElementsByClassName('items')[0];
	    var downBtn = document.getElementsByClassName('down-btn')[0];
	    downBtn.addEventListener('click', function() {
	    	if (!scrolling && Math.ceil(itemWrapper.scrollHeight - itemWrapper.scrollTop) != itemWrapper.clientHeight) {
	    		scrollTo(itemWrapper, itemWrapper.scrollTop + 60);
	    	}
	    });
	    var upBtn = document.getElementsByClassName('up-btn')[0];
	    upBtn.addEventListener('click', function() {
	    	if (!scrolling && itemWrapper.scrollTop != 0) {
	    		scrollTo(itemWrapper, itemWrapper.scrollTop - 60);
	    	}
	    });

	    // create clickables on items
	    var bg = new Image();
	    var clickContainer = document.getElementById('gameBgWrapper');
	    bg.src = 'img/game-bg2.jpg';

        bg.onload = function() {
        	_this.ended = false;
		    var img = {
		    	nWidth: bg.naturalWidth,
		    	nHeight: bg.naturalHeight,
		    	width: bg.clientWidth,
		    	height: bg.clientHeight
		    }
		    var scaleX = img.width / img.nWidth;
		    var scaleY = img.height / img.nHeight;
		    var clickables = [
		        {
		        	top: 412,
		        	left: 436,
		        	width: 100,
		        	height: 100
		        },
		        {
		        	top: 363,
		        	left: 235,
		        	width: 127,
		        	height: 127
		        },{
		        	top: 640,
		        	left: 986,
		        	width: 188,
		        	height: 110
		        },{
		        	top: 690,
		        	left: 610,
		        	width: 110,
		        	height: 65
		        },{
		        	top: 430,
		        	left: 1300,
		        	width: 110,
		        	height: 195
		        },{
		        	top: 768,
		        	left: 713,
		        	width: 128,
		        	height: 98
		        },{
		        	top: 663,
		        	left: 403,
		        	width: 193,
		        	height: 100
		        },{
		        	top: 527,
		        	left: 1055,
		        	width: 133,
		        	height: 95
		        },{
		        	top: 67,
		        	left: 1131,
		        	width: 168,
		        	height: 346
		        },{
		        	top: 564,
		        	left: 842,
		        	width: 122,
		        	height: 94
		        }
		    ]

		    clickContainer.style.position = 'relative';
		    for ( var c in clickables ) {
		        var cBox = document.createElement('div');
		        cBox.style.position = 'absolute';
		        cBox.style.top = (bg.offsetTop + clickables[c].top * scaleY).toString() + 'px';
		        cBox.style.left = (bg.offsetLeft + clickables[c].left * scaleX).toString() + 'px';
		        cBox.style.width = (clickables[c].width * scaleX).toString() + 'px';
		        cBox.style.height = (clickables[c].height * scaleY).toString() + 'px';
		        cBox.style.transition = 'all 0.3s';
		        cBox.setAttribute('rel', c);
		        clickContainer.appendChild(cBox);
		        _this.item.clickBox.push(cBox);
		        cBox.addEventListener('click', function() {
		        	_this.item.click(this);
		        });
		    }

		    window.addEventListener("resize", function() {
		    	img.width = bg.clientWidth;
		    	img.height = bg.clientHeight;
		    	var scaleX = img.width / img.nWidth;
			    var scaleY = img.height / img.nHeight;
		        for ( var c in _this.item.clickBox) {
			        _this.item.clickBox[c].style.top = (bg.offsetTop + clickables[c].top * scaleY).toString() + 'px';
			        _this.item.clickBox[c].style.left = (bg.offsetLeft + clickables[c].left * scaleX).toString() + 'px';
			        _this.item.clickBox[c].style.width = (clickables[c].width * scaleX).toString() + 'px';
			        _this.item.clickBox[c].style.height = (clickables[c].height * scaleY).toString() + 'px';
			    }
		    });
        }
        bg.classList.add('bg');
        clickContainer.appendChild(bg);

	    /* End Screen Buttons */
	    var retryBtn = document.getElementById('gameRetry');
	    retryBtn.addEventListener('click', function(){
            _this.retry();
	    })

	    var continueBtn = document.getElementById('gameContinue');
	    continueBtn.addEventListener('click', function() {
	    	_this.continue();
	    })
    }
};


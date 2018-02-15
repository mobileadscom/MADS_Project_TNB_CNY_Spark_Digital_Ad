/* global window, document, $, require */
/* eslint-disable global-require */
/* eslint-disable */
import Mads, { fadeOutIn } from 'mads-custom';
import { contain } from 'intrinsic-scale';
import html2canvas from 'html2canvas';
import series from 'async/series';
// import ZingTouch from 'zingtouch';
import { trim } from './js/custom';
import './css/game.css';
import './main.css';

class AdUnit extends Mads {
  constructor() {
    super();

    this.allowContinue = false;
    this.mobileAndTabletCheck = () => {
      let check = false;
      // eslint-disable-next-line
      (function (a) {
        // eslint-disable-next-line
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
      })(navigator.userAgent || navigator.vendor || window.opera); // eslint-disable-line
      return check;
    };
    this.isMobile = this.mobileAndTabletCheck();
    this.orientation = 'portrait';
    this.title = 'The Coming Together';
    this.description = 'Our family is the light of our life. Tenaga National Berhad wishes Gong Xi Fa Cai to those celebrating.';
    if (window.location.hostname == "thecomingtogether.com.my") {
      this.custTracker = ['https://www.cdn.serving1.net/a/analytic.htm?uid=0&isNew={{isNew}}&referredUrl={{referredUrl}}&rmaId={{rmaId}}&domainId=0&pageLoadId={{pageLoadId}}&userId={{userId}}&pubUserId=0&campaignId={{campaignId}}&browser={{browser}}&os={{os}}&domain={{domain}}&callback=trackSuccess&callback=trackSuccess&type={{rmatype}}&tt={{rmatt}}&value={{rmavalue}}']
    }

    // this.loadCSS(this.resolve('css/game.css'));
  }

  render() {
    window.addEventListener('message', (event) => {
      if (window.parent) {
        if (event.data.auth && event.data.auth.type) {
          if (event.data.auth.type === 'landscape' && this.orientation !== 'landscape') {
            window.parent.postMessage({
              type: 'rotate-size',
            }, '*');
            this.orientation = 'landscape';
            this.tracker('E', 'tilt_landscape');
          } else if (event.data.auth.type === 'portrait' && this.orientation !== 'portrait') { // eslint-disable-line
            window.parent.postMessage({
              type: 'rotate-size',
            }, '*');
            this.orientation = 'portrait';
          }
          if (event.data.auth.type == 'closeExpandable') {
            if (this.video.player) {
              if (this.video.player.getPlayerState() == '1' || this.video.player.getPlayerState() == '3') {
                this.video.player.pauseVideo();
              }
            }
          }
        }
      }
    }, false);

    return `  
      <div id="portrait-page" class="portrait-show">
          <img src="img/the-coming-together2.svg" style="width:50%;" alt="">
          <img src="img/more-ong-tilt2.png" class="img-fluid" alt="">
          <img src="img/tenaga-nasional-logo.svg" style="width:40%;" alt="">
      </div>
      <div id="start">
        <div id="desktop-side">
          <img src="img/the-coming-together2.svg" id="desktop-logo" alt="">
          <img src="img/tenaga-nasional-logo.svg" alt="">
        </div>
        <div id="video-page" class="video-show"><div class="video-container"><button id="skip-video">Send A Greeting</button><div id="video-frame"></div></div></div>
        <div id="game-page" class="game-show">
            <div id="game-initial">
              <h1>HURRY!</h1>
              <h2>Find 10 items before the Ah Ma's feather duster comes!</h2>
              <h2 class="collect">Find all 10 items and there will be a <br><span style="color:yellow;">SPECIAL SURPRISE</span> for you at the end!</h2>
              <button class="start-now" id="btn-start-game">FIND NOW</button>
            </div>
        </div>
        <div class="game" id="gameContainer" >
            <div class="status">
              <div class="found-wrapper">
                <div class="found">
                    <p class="title">Found</p>
                  <div class="count" id="gameFoundCount">
                    0/10
                  </div>
                </div>
              </div>
              <div class="timer-wrapper">
                <div class="timer">
                <div class="time-wrapper">
                    <div class="time">
                        <p class="title">Time Left</p>
                      <div class="sec" id="gameTimer">
                        1:00
                      </div>
                    </div>
                  </div>
                  <div class="space">
                  </div>
                  <div class="bar-wrapper">
                          <div class="bar" id="gameTimeBar">
                          </div>
                  </div>
                </div>
              </div>
              <div class="skip-wrapper">
                <button class="skip" id="gameSkip">
                  SKIP
                </button>
              </div>
            </div>
            <div class="pic">
              <div class="img-wrapper" id="gameBgWrapper">
                </div>
            </div>
            <div class="item-status">
              <div class="btn-wrapper" style="position: relative;">
                <button class="up-btn" style="position: absolute;bottom: 0px;">
                    <img src="img/arrow-up.png" />
                </button>
              </div>
              <div class="items-wrapper" id="gameItemListWrapper">
                <div class="items" id="gameItemList">
                  <div class="item">
                    <div class="item-wrapper" rel="0" id="gameItem0">
                      <img src="img/item1.png" />
                    </div>
                  </div>
                  <div class="item">
                    <div class="item-wrapper" rel="1" id="gameItem1">
                      <img src="img/item2.png" />
                    </div>
                  </div>
                  <div class="item">
                    <div class="item-wrapper" rel="2" id="gameItem2">
                       <img src="img/item3.png" />
                    </div>
                  </div>
                  <div class="item">
                    <div class="item-wrapper" rel="3" id="gameItem3">
                       <img src="img/item4.png" />
                    </div>
                  </div>
                  <div class="item">
                    <div class="item-wrapper" rel="4" id="gameItem4">
                       <img src="img/item5.png" />
                    </div>
                  </div>
                  <div class="item">
                    <div class="item-wrapper" rel="5" id="gameItem5">
                       <img src="img/item6.png" />
                    </div>
                  </div>
                  <div class="item">
                    <div class="item-wrapper" rel="6" id="gameItem6">
                       <img src="img/item7.png" />
                    </div>
                  </div>
                  <div class="item">
                    <div class="item-wrapper" rel="7" id="gameItem7">
                       <img src="img/item8.png" />
                    </div>
                  </div>
                  <div class="item">
                    <div class="item-wrapper" rel="8" id="gameItem8">
                       <img src="img/item9.png" />
                    </div>
                  </div>
                  <div class="item">
                    <div class="item-wrapper" rel="9" id="gameItem9">
                       <img src="img/item10.png" />
                    </div>
                  </div>
                </div>
              </div>
              <div class="btn-wrapper">
                <button class="down-btn">
                  <img src="img/arrow-down.png" />
                </button>
              </div>
            </div>
            <div class="endScreen" id="gameEndScreen">
              <div class="end-wrapper">
                    <div class="msg-wrapper" id="gameMsgWrapper">
                      <img id="mainMsg" />
                      <div id="gameScrollWrapper" class="scroll-wrapper">
                        <img id="scrollHeaderL" src="img/scrollHeaderL.png" class="scrollHeader" />
                        <div id="scrollBodyWrapper" class="scroll"> <img id="scrollBody" /></div>
                        <img id="scrollHeaderR" src="img/scrollHeaderR.png" class="scrollHeader" />
                      </div>
                    </div>
                    <div class="menu">
                        <button class="continue" id="gameContinue">CONTINUE VIDEO</button>
                        <button class="retry" id="gameRetry">TRY AGAIN</button>
                    </div>
              </div>
            </div>
          </div>  
      </div>
      <div id="append-here"></div>
    `;
  }

  renderAfterTilt() {
    this.content.querySelector('#append-here').innerHTML = `
    <div id="sharing-intro-page" style="display:none;" class="sharing-intro-show">
          <div class="sharing-left">
            <h1>Chinese New Year becomes brighter when we are all in it together <small>Personalise your own greeting and share with friends in 3 simple steps!</small></h1>
            <div class="sharing-icons">
                <div class="camera">
                    <img src="img/icon-camera.svg" alt="">
                    <span>Upload Picture</span>
                </div>
                <div class="greeting">
                    <img src="img/icon-greeting.svg" alt="">
                    <span>Choose Greeting</span>
                </div>
                <div class="share">
                    <img src="img/icon-share.svg" alt="">
                    <span>Send Sparkly</span>
                </div>
            </div>
            <button class="start-now" id="btn-start-sharing">START NOW</button>
          </div>
          <div class="sharing-right">
            <img src="img/sharing-dragon.png" class="sharing-dragon" alt="">
            <img src="img/tenaga-nasional-logo.svg" class="sharing-logo" alt="">
          </div>
      </div>
      <div id="sharing-page" class="sharing-show" style="display:none;">
        <div id="upload-page" class="upload-show">
            <h1><small>STEP 1</small>PICK A PICTURE FOR SPARKY'S HEAD</h1>
            <div class="img-tools">
              <img id="rt-img" src="img/rotate.png" />
              <img id="zp-img" src="img/zoom_plus.png" />
              <img id="zm-img" src="img/zoom_minus.png" />
            </div>
            <canvas id="upload-canvas"></canvas>
            <img src="img/dragon-face.png" id="dragon-face" alt="">
            <video id="upload-video" style="display:none;"></video>
            <div class="sharing-actions">
                <div id="uploading">
                  <div class="wrapper-gallery-upload">
                    <button class="start-now invert" id="btn-gallery-upload">Snap A Picture / Upload Photo</button>
                    <input type="file" id="input-gallery-file" name="gallery-file" />
                  </div>
                  <!--<button class="start-now invert" id="btn-gallery-upload">GALLERY UPLOAD</button>-->
                </div>
                <button class="start-now invert" id="btn-upload-next" style="display:none;">CONTINUE</button>
            </div>
        </div>
        <div id="greeting-page" style="display:none;" class="greeting-show">
            <div style="height:100%;position: relative; min-height:320px;">
              <h1><small>STEP 2</small>MAKE A WISH FOR YOUR FRIEND</h1>
              <div id="slider">
                  <div><img src="img/sc05-text-white-01.svg" alt="" rel="1"></div>
                  <div><img src="img/sc05-text-white-02.svg" alt="" rel="2"></div>
                  <div><img src="img/sc05-text-white-03.svg" alt="" rel="3"></div>
                  <div><img src="img/sc05-text-white-04.svg" alt="" rel="4"></div>
                  <div><img src="img/sc05-text-white-05.svg" alt="" rel="5"></div>
                  <div><img src="img/sc05-text-white-06.svg" alt="" rel="6"></div>
                  <div><img src="img/sc05-text-white-07.svg" class="img-200" alt="" rel="7"></div>
                  <div><img src="img/sc05-text-white-08.svg" class="img-200" alt="" rel="8"></div>
              </div>
              <div class="greeting-actions">
                <div class="greeting-translation" id="greeting-translation">
                  <div class="first-greeting-text active">Happy Chinese New Year</div>
                  <div class="second-greeting-text"></div>
                </div>
                <button class="start-now invert" id="btn-greeting-next">CONTINUE</button>
              </div>
            </div>
        </div>
        <div id="share-page" style="display:none;" class="share-show">
            <h1><small>STEP 3</small>SPARKY'S READY TO GO!</h1>
            <div class="share-intent">
              <div class="share-left">
                  <span>Send him out and watch him dance in the Lunar New Year!</span>
                  <div class="sharing-icons-2" id="sharing-icons-2">
                     <a href="#" target="_blank" id="a-share-fb"><img id="share-fb" src="img/share-fb.png" alt=""></a>
                     <a href="#" target="_blank" id="a-share-twitter"><img id="share-twitter" src="img/share-twitter.png" alt=""></a>
                     <a href="data:image/jpeg;base64,/9j/4AAQSkZ..." target="_blank" id="share-download" download="tnb_share.gif"><img src="img/share-download.png" alt=""></a>
                     <a href="https://thecomingtogether.com.my/" target="_blank" id="clickthrough"><img src="img/clickthrough-icon.png" alt=""></a>
                  </div>
                  <button class="start-now invert" id="btn-edit-greeting">EDIT GREETING</button>
              </div>
              <div id="share-right" class="share-right">
              </div>
            </div>
        </div>
      </div>
      <div id="end-page" style="display:none;">
        <div class="left-end">
            <img src="img/the-coming-together2.svg" alt="" style="padding-bottom:30px;">
            <img src="img/tenaga-nasional-logo.svg" alt="">
        </div>
        <div class="right-end">
            <button id="btn-play-again" class="start-now invert">PLAY GAME AGAIN</button>
            <button id="btn-greeting-again" class="start-now invert">SEND ANOTHER GREETING</button>
        </div>
      </div>
      <div id="workspace"></div>
      <div id="loading-page" style="color:white;display:none;">
        <h1 id="loading-text">Loading...</h1>
        <div id="progressbar"><div id="progress" ><div id="pbaranim"></div></div></div>
      </div>
    `

    this.content.querySelector('#append-here').querySelectorAll('*').forEach((elem) => {
      if (elem.id) {
        this.elems[elem.id] = elem;
      }
    });
    this.ctx = this.elems['upload-canvas'].getContext('2d');
    this.cWidth = this.elems['upload-canvas'].offsetWidth;
    this.cHeight = this.elems['upload-canvas'].offsetHeight;
    this.elems['upload-canvas'].width = this.cWidth;
    this.elems['upload-canvas'].height = this.cHeight;

    this.elems['dragon-face'].onload = () => {
      const c = contain(this.cWidth, this.cHeight, this.elems['dragon-face'].width, this.elems['dragon-face'].height);
      this.ctx.drawImage(this.elems['dragon-face'], c.x, c.y, c.width, c.height);
    };
    this.applyEvents();
  }

  postRender() {
    if (!this.isMobile) {
      this.elems['video-page'].style.width = '80%';
      this.elems['video-page'].style.height = '80%';
      this.elems['desktop-logo'].style.width = '100%';
    }

    this.loadJS(this.resolve('js/ytcomponent.js')).then(() => {
      let nonce = false;
      this.video = new window.ytComponent({ // eslint-disable-line
        container: 'video-frame',
        videoId: 'jpqT1dNOAp8', // 'IGQBtbKSVhY', // 'jpqT1dNOAp8',
        playerVars: {
          controls: 1,
          playsinline: 1,
          showinfo: 0,
          rel: 0,
          enablejsapi: 1,
          modestbranding: 1,
          fs: 0
        },
        tracker: (...args) => {
          console.log('tracker', args);
          this.tracker(...args);
        },
        progress: (time, { player }) => {
          if (time > 35 && !this.allowContinue) {
            player.pauseVideo();
            this.elems['video-page'].style.zIndex = 0;
            this.elems['video-page'].style.display = 'none';
            this.elems['game-page'].style.zIndex = 1;
            this.elems['game-page'].style.visibility = 'visible';
            this.elems['skip-video'].style.display = 'block';
            this.renderAfterTilt();
          }
        },
        playing: () => {
          this.elems['video-page'].style.width = '100%';
          this.elems['video-page'].style.height = '100%';
        },
        onReady: () => {
          this.onResize();
          window.addEventListener('resize', this.onResize.bind(this));
        },
        onFinish: () => {
          if (!nonce) {
            fadeOutIn(this.elems.start, this.elems['sharing-intro-page'], { display: 'flex' });
            nonce = true;
          }
        },
      });

      window.onYouTubeIframeAPIReady = () => {
        this.video.loadVideo();
      };
    });
  }

  onResize() {
    if (this.elems['video-page'].childNodes && this.elems['video-page'].childNodes[0] && this.elems['video-page'].childNodes[0].style) {
      this.elems['video-page'].childNodes[0].style.paddingBottom = `${((this.elems['video-page'].clientHeight / this.elems['video-page'].clientWidth) * 100)}%`;
    }
  }

  style() {
    return [`
      @font-face {
        font-family: MyriadPro;
        src: url(fonts/MyriadPro-Regular.otf);
      }
      html, body, button {
        font-family: 'MyriadPro', sans-serif;
      }
      body, .portrait-show, #loading-page, #end-page {
        /* background: url(${this.resolve('img/bg1.png')}); */
        background-color: #e43222;
      }       
      .game-show:before {
        content: ' ';
        /* background: url(${this.resolve('img/bg1.png')}); */
        background-color: #e43222;
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        z-index: -1;
        opacity: 0.95;
       }
       #slider .slick-slide.slick-center:before {
        background-image: url(${this.resolve('img/sc06-textplace.png')})
       }
      @media screen and (orientation:landscape) {
        .portrait-show {
          display: none!important;
        }
        #workspace {
          display: block;
        }
      }
      @media screen and (orientation:portrait) {
        #workspace {
          display: none;
        }
        .video-show {
          display: none!important;
        }
      }
    `];
  }

  events() {
    this.elems['btn-start-game'].addEventListener('mousedown', () => {
      console.log('started gaming')
      this.tracker('E', 'start_game');
      this.elems['game-page'].style.display = 'none';
      this.elems.gameContainer.style.zIndex = 200;
      this.loadJS(this.resolve('js/game.js')).then(() => {
        console.log(typeof window.game !== 'undefined' ? 'game loaded' : 'game not loaded');
        window.game.init();
        window.game.continue = () => {
          this.elems['video-page'].style.zIndex = 1;
          this.elems['video-page'].style.display = 'block';
          this.elems['game-page'].style.zIndex = 0;
          this.allowContinue = true;
          this.video.player.playVideo();
          this.elems.gameContainer.style.zIndex = -100;
          setTimeout(() => {
            this.elems['skip-video'].style.left = '0px';
          }, 100);
        };
      });
    });
  };

  applyEvents() {
    console.log('applied events');
    if (window.location.hostname == "thecomingtogether.com.my") {
      this.elems['clickthrough'].style.display = 'none';
    }

    this.elems['btn-start-sharing'].addEventListener('mousedown', () => {
      this.tracker('E', 'start_sharing');
      this.elems['upload-page'].style.display = 'flex';
      this.elems['upload-page'].style.opacity = '1';
      fadeOutIn(this.elems['sharing-intro-page'], this.elems['sharing-page'], { display: 'block' });
      this.elems['upload-page'].style.display = 'flex';
      this.elems['upload-page'].style.opacity = 1;
      this.elems.uploading.style.display = 'flex';
      this.elems['btn-upload-next'].style.display = 'none';
      const input = this.elems['input-gallery-file'];
      input.value = '';
      if (input.reset) input.reset();

      setTimeout(() => {
        this.cWidth = this.elems['upload-canvas'].offsetWidth;
        this.cHeight = this.elems['upload-canvas'].offsetHeight;
        this.elems['upload-canvas'].width = this.cWidth;
        this.elems['upload-canvas'].height = this.cHeight;
        // this.ctx.translate(this.cWidth, 0);
        // this.ctx.scale(-1, 1);
        const c = contain(this.cWidth, this.cHeight, this.elems['dragon-face'].width, this.elems['dragon-face'].height);
        this.ctx.drawImage(this.elems['dragon-face'], c.x, c.y, c.width, c.height);
      }, 1000);
    });

    // this.elems['btn-turn-on-camera'].addEventListener('mousedown', () => {
    //   if (window.navigator.mediaDevices) {
    //     window.navigator.mediaDevices.getUserMedia({
    //       video: {
    //         width: this.elems['upload-canvas'].offsetWidth,
    //         height: this.elems['upload-canvas'].offsetHeight,
    //       },
    //     }).then((stream) => {
    //       this.elems['upload-video'].src = window.URL.createObjectURL(stream);
    //       this.elems['upload-video'].play();
    //       this.withCamera = true;
    //       this.stopVideo = () => {
    //         stream.getTracks()[0].stop();
    //       };
    //     }).catch((err) => {
    //       console.error(err);
    //     });
    //   }
    // });

    this.uploadNext = () => {
      this.elems['loading-page'].style.display = 'flex';
      this.elems['progressbar'].style.display = 'none';
      setTimeout(() => {
        fadeOutIn(this.elems['upload-page'], this.elems['greeting-page'], { display: 'block' });
        this.elems['sharing-page'].style.minHeight = '320px';
        if (this.withCamera) {
          this.elems['upload-video'].pause();
          if (this.stopVideo) this.stopVideo();
          this.camerashot = this.elems['upload-canvas'].toDataURL('image/png');
        }

        this.loadJS(this.resolve('js/jquery.min.js')).then(() => {
          this.loadJS(this.resolve('js/slick.min.js')).then(() => {
            $('#slider').slick({ // eslint-disable-line
              centerMode: true,
              centerPadding: '0px',
              slidesToShow: 5,
              adaptiveHeight: true,
              responsive: [],
            });

            this.elems['loading-page'].style.display = 'none';
            $('#slider')
            // .on('init', () => {
            //   applyStyleToSiblings();
            // })
              .on('beforeChange', (event, slick, currentSlide, nextSlide) => {
                $('.slick-slide').removeClass('slick-opac');
                /**/
                const rel = $('.slick-current img').attr('rel');
                $('.slick-current img').attr('src', `img/sc05-text-white-0${rel}.svg`);

                let translation = 'Happy Chinese New Year';
                switch (nextSlide) {
                  case 0:
                    translation = 'Happy Chinese New Year';
                    break;
                  case 1:
                    translation = 'Wishing You Steady Advancement In Career';
                    break;
                  case 2:
                    translation = 'Wishing You Everlasting Success';
                    break;
                  case 3:
                    translation = 'Wishing You A Thriving And Prosperous Business';
                    break;
                  case 4:
                    translation = 'Wishing You Great Luck In Everything You Do';
                    break;
                  case 5:
                    translation = 'Blessed New Year';
                    break;
                  case 6:
                    translation = 'Happy Chinese New Year';
                    break;
                  case 7:
                    translation = 'May All Your Wishes Come True';
                    break;
                  default:
                    translation = 'Wishing You And Your Family Health And Happiness';
                }
                /* english wish change and fade */
                if ($('.first-greeting-text').hasClass('active')) {
                  $('.first-greeting-text').fadeOut().removeClass('active');
                  $('.second-greeting-text').html(translation).fadeIn().addClass('active');
                } else {
                  $('.second-greeting-text').fadeOut().removeClass('active');
                  $('.first-greeting-text').html(translation).fadeIn().addClass('active');
                }
              });
            $('#slider').on('afterChange', () => {
              /**/
              $('.slick-active').first().addClass('slick-opac');
              $('.slick-active').last().addClass('slick-opac');
              const rel = $('.slick-current img').attr('rel');
              $('.slick-current img').attr('src', `img/sc05-text-yellow-0${rel}.svg`);
            });
            /* on init */
            $('.slick-slide').removeClass('slick-opac');
            $('.slick-current').prev().prev().addClass('slick-opac');
            $('.slick-current').next().next().addClass('slick-opac');
            const temp = $('.slick-current img').attr('rel');
            $('.slick-current img').attr('src', `img/sc05-text-yellow-0${temp}.svg`);
          });
        });
      }, 1000);
    };

    const uploadEverything = blob => new Promise((resolve) => {
      const timeNow = window.Math.floor(window.Date.now() / 1000);
      const data = new window.FormData();
      data.append('pic[]', blob);
      data.append('path', `4220/custom/tnb_cny/uploads/${timeNow}`);
      data.append('name', 'image.gif');

      const xhr = new window.XMLHttpRequest();
      xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4) {
          const htmlGIFUri = `http://share.thecomingtogether.com.my/4220/custom/tnb_cny/uploads/${timeNow}/image.gif`;
          const siteUri = 'https://tnb.com.my';

          const htmlToShare = `<!doctype html>
              <html lang="en">
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport"
                        content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
                  <meta http-equiv="X-UA-Compatible" content="ie=edge">
                  <meta property="og:site_name" content="${this.title}">
                  <meta property="og:url" content="${htmlGIFUri}">
                  <meta property="og:title" content="${this.title}">
                  <meta property="og:description" content="${this.description}">
                  <meta property="og:type" content="website">
                  <meta property="og:image" content="${htmlGIFUri}">
                  <meta property="og:image:width" content="${this.finishGifData.width}">
                  <meta property="og:image:height" content=${this.finishGifData.height}">

              
                  <meta name="DC.title" content="${this.title}">
              
                  <meta property="twitter:card" content="player">
                  <meta property="twitter:url" content="${htmlGIFUri}">
                  <meta property="twitter:site" content="@Tenaga_Nasional">
                  <meta property="twitter:title" content="${this.title}">
                  <meta property="twitter:description" content="${htmlGIFUri}">
                  <meta property="twitter:creator" content="@Tenaga_Nasional">
                  <meta property="twitter:image" content="${htmlGIFUri}">
                  <meta property="twitter:domain" content="tnb.com.my">
                  <title>${this.title}</title>
              </head>

              <body style="margin:0;padding:0;background:#E43222;">
                <a href="https://thecomingtogether.com.my" style="text-align:  center;"><img src="${htmlGIFUri}" style="width:100%;display:block;margin:auto;max-width:400px;" alt=""></a>
                <a href="https://thecomingtogether.com.my" style="text-align:center;display:block;margin:auto;color:white;font-size:16px;font-family:arial;text-decoration:underline;">
                  Send A Greeting
                </a>
              </body>
              </html>`;

          const uploadHTML = new window.Blob([htmlToShare], { type: 'text/html' });

          const htmlData = new window.FormData();
          htmlData.append('pic[]', uploadHTML);
          htmlData.append('path', `4220/custom/tnb_cny/uploads/${timeNow}`);
          htmlData.append('name', 'index.html');

          const htmlXhr = new window.XMLHttpRequest();
          htmlXhr.addEventListener('readystatechange', () => {
            if (htmlXhr.readyState === 4) {
              const htmlUri = `http://share.thecomingtogether.com.my/4220/custom/tnb_cny/uploads/${timeNow}/index.html`;
              this.elems['a-share-fb'].setAttribute('href', `https://www.facebook.com/sharer/sharer.php?u=${htmlUri}`);
              console.log(this.elems['a-share-twitter']);
              this.elems['a-share-twitter'].setAttribute('href', `https://twitter.com/intent/tweet?text=${this.description}&hashtags=TheComingTogether&original_referrer=${siteUri}&url=${htmlUri}&tw_p=tweetbutton&via=Tenaga_Nasional`);
              this.elems['loading-page'].style.display = 'none';
              this.elems['share-page'].style.display = 'none';
              this.elems['end-page'].style.display = 'flex';
              resolve();
            }
          });
          htmlXhr.open('POST', 'https://www.mobileads.com/upload-image-twtbk');
          htmlXhr.setRequestHeader('cache-control', 'no-cache');
          htmlXhr.send(htmlData);
        }
      });
      xhr.open('POST', 'https://www.mobileads.com/upload-image-twtbk');
      xhr.setRequestHeader('cache-control', 'no-cache');
      xhr.send(data);
    });

    this.elems['btn-greeting-next'].addEventListener('mousedown', () => {
      this.tracker('E', 'finish_greeting');
      this.elems['sharing-page'].style.minHeight = 'initial';
      this.elems['loading-page'].style.display = 'flex';
      this.elems['progressbar'].style.display = 'block';
      this.elems['progressbar'].style.bottom = (this.elems['loading-page'].clientHeight * 0.1 + 163).toString() + 'px';
      series({
        gif8: (callback) => {
          try {
            html2canvas($('#slider').find('.slick-current')[0], {
              backgroundColor: null,
            }).then((canvas) => {
              this.elems.workspace.style.backgroundImage = `url(${this.resolve('img/asset-8---background.png')})`;
              const dragon8 = new window.Image();
              dragon8.className = 'dragon8';
              dragon8.onload = () => {
                this.elems.workspace.appendChild(dragon8);
                const greetingImg = new window.Image();
                greetingImg.className = 'greetingImg';
                greetingImg.onload = () => {
                  this.elems.workspace.appendChild(greetingImg);
                  // this.elems['loading-page'].style.display = 'none';
                  html2canvas(this.elems.workspace).then((c) => {
                    callback(null, { result: trim(c).toDataURL('image/png') });
                  });
                };
                greetingImg.src = trim(canvas).toDataURL('image/png');
              };
              dragon8.src = this.resolve('img/asset-8---lion.png');
            });
          } catch (err) {
            callback(err);
          }
        },
        gif7: (callback) => {
          callback(null, { result: this.resolve('img/asset-7---full.png') });
        },
        gif6: (callback) => {
          try {
            this.elems.workspace.style.backgroundImage = 'none';
            this.elems.workspace.innerHTML = '';
            const bg6 = new window.Image();
            bg6.className = 'bg6';
            bg6.onload = () => {
              this.camerashotEl = new window.Image();
              this.camerashotEl.id = 'camerashot6';
              this.camerashotEl.onload = () => {
                this.elems.workspace.appendChild(bg6);
                this.elems.workspace.appendChild(this.camerashotEl);
                html2canvas(this.elems.workspace).then((c) => {
                  callback(null, { result: trim(c).toDataURL('image/png') });
                });
              };
              this.camerashotEl.src = this.camerashot;
            };
            bg6.src = this.resolve('img/Asset-6.png');
          } catch (err) {
            callback(err);
          }
        },
        gif5: (callback) => {
          try {
            this.elems.workspace.style.backgroundImage = 'none';
            this.elems.workspace.innerHTML = '';
            const bg5 = new window.Image();
            bg5.className = 'bg5';
            // bg5.style.opacity = '0.5';
            bg5.onload = () => {
              this.camerashotEl.id = 'camerashot5';
              this.elems.workspace.appendChild(bg5);
              this.elems.workspace.appendChild(this.camerashotEl);
              html2canvas(this.elems.workspace).then((c) => {
                callback(null, { result: trim(c).toDataURL('image/png') });
              });
            };
            bg5.src = this.resolve('img/Asset-5.png');
          } catch (err) {
            callback(err);
          }
        },
        // gif4: (callback) => {
        //   try {
        //     this.elems.workspace.style.backgroundImage = 'none';
        //     this.elems.workspace.innerHTML = '';
        //     const bg4 = new window.Image();
        //     // bg4.style.opacity = '0.5';
        //     bg4.className = 'bg4';
        //     bg4.onload = () => {
        //       this.camerashotEl.id = 'camerashot4';
        //       this.elems.workspace.appendChild(bg4);
        //       this.elems.workspace.appendChild(this.camerashotEl);
        //       html2canvas(this.elems.workspace).then((c) => {
        //         callback(null, { result: trim(c).toDataURL('image/png') });
        //       });
        //     };
        //     bg4.src = this.resolve('img/Asset-4.png');
        //   } catch (err) {
        //     callback(err);
        //   }
        // },
        // gif3: (callback) => {
        //   try {
        //     this.elems.workspace.style.backgroundImage = 'none';
        //     this.elems.workspace.innerHTML = '';
        //     const bg3 = new window.Image();
        //     // bg3.style.opacity = '0.5';
        //     bg3.className = 'bg3';
        //     bg3.onload = () => {
        //       this.camerashotEl.id = 'camerashot3';
        //       this.elems.workspace.appendChild(bg3);
        //       this.elems.workspace.appendChild(this.camerashotEl);
        //       html2canvas(this.elems.workspace).then((c) => {
        //         // console.log(c);
        //         callback(null, { result: trim(c).toDataURL('image/png') });
        //       });
        //     };
        //     bg3.src = this.resolve('img/Asset-3.png');
        //   } catch (err) {
        //     callback(err);
        //   }
        // },
        // gif2: (callback) => {
        //   try {
        //     this.elems.workspace.style.backgroundImage = 'none';
        //     this.elems.workspace.innerHTML = '';
        //     const bg2 = new window.Image();
        //     // bg2.style.opacity = '0.5';
        //     bg2.className = 'bg2';
        //     bg2.onload = () => {
        //       this.camerashotEl.id = 'camerashot2';
        //       this.elems.workspace.appendChild(bg2);
        //       this.elems.workspace.appendChild(this.camerashotEl);
        //       html2canvas(this.elems.workspace).then((c) => {
        //         callback(null, { result: trim(c).toDataURL('image/png') });
        //       });
        //     };
        //     bg2.src = this.resolve('img/Asset-2.png');
        //   } catch (err) {
        //     callback(err);
        //   }
        // },
        // gif1: (callback) => {
        //   try {
        //     this.elems.workspace.style.backgroundImage = 'none';
        //     this.elems.workspace.innerHTML = '';
        //     const bg1 = new window.Image();
        //     // bg1.style.opacity = '0.5';
        //     bg1.className = 'bg1';
        //     bg1.onload = () => {
        //       this.camerashotEl.id = 'camerashot1';
        //       this.elems.workspace.appendChild(bg1);
        //       this.elems.workspace.appendChild(this.camerashotEl);
        //       html2canvas(this.elems.workspace).then((c) => {
        //         // console.log(c);
        //         callback(null, { result: trim(c).toDataURL('image/png') });
        //       });
        //     };
        //     bg1.src = this.resolve('img/Asset-1.png');
        //   } catch (err) {
        //     callback(err);
        //   }
        // },
      }, (err, { gif8, gif7, gif6, gif5, gif4, gif3, gif2, gif1 }) => {
        console.log(err);

        this.loadJS(this.resolve('js/gif.js')).then(() => {
          const gif = new GIF({ // eslint-disable-line
            workers: 15,
            quality: 10,
            workerScript: this.resolve('js/gif.worker.js'),
          });
          // [gif1, gif2, gif3, gif4, gif5, gif6, gif7, gif8]
          [gif5, gif6, gif7, gif8].forEach((img, index) => {
            const i = new window.Image();
            i.onload = () => {
              gif.addFrame(i);
              console.log(index);
              if (index === 3) {
                gif.render();
              }
            };
            i.src = img.result;
          });
          gif.on('finished', (blob) => {
            $('#slider').slick('unslick');
            this.elems.workspace.style.backgroundImage = 'none';
            this.elems.workspace.innerHTML = '';
            this.elems.workspace.style.display = 'none';
            this.finishGifBlob = blob;
            this.finishGif = window.URL.createObjectURL(blob);
            this.finishGifEl = new window.Image();
            this.finishGifEl.onload = () => {
              this.finishGifData = {
                height: this.finishGifEl.height,
                width: this.finishGifEl.width,
              };
              this.elems['share-right'].innerHTML = '';
              this.elems['share-right'].appendChild(this.finishGifEl);
              uploadEverything(this.finishGifBlob).then(() => {
                this.elems['greeting-page'].style.display = 'none';
                this.elems['share-page'].style.display = 'block';
                this.elems['share-page'].style.opacity = '1';
                this.elems['share-page'].style.minHeight = '350px';
                this.elems['share-page'].style.overflow = 'auto';
                this.elems['end-page'].style.display = 'none';
                this.elems['loading-page'].style.display = 'none';
              });
            };
            this.finishGifEl.src = this.finishGif;
            this.elems['share-download'].setAttribute('href', this.finishGif);
          });
        });
      });
    });

    this.elems['upload-video'].addEventListener('play', () => {
      const _this = this; // eslint-disable-line
      this.elems.uploading.style.display = 'none';
      this.elems['btn-upload-next'].style.display = 'block';
      this.elems['btn-upload-next'].addEventListener('mousedown', this.uploadNext);

      (function loop() { // eslint-disable-line
        if (!_this.elems['upload-video'].paused && !_this.elems['upload-video'].ended) {
          const v = contain(_this.cWidth, _this.cHeight, _this.elems['dragon-face'].width, _this.elems['dragon-face'].height);
          _this.ctx.drawImage(_this.elems['upload-video'], v.x, v.y, v.width, v.height);
          const c = contain(_this.cWidth, _this.cHeight, _this.elems['dragon-face'].width, _this.elems['dragon-face'].height);
          _this.ctx.drawImage(_this.elems['dragon-face'], c.x, c.y, c.width, c.height);
        }

        if (_this.elems['upload-video'].paused || _this.elems['upload-video'].ended) {
          // const v = contain(_this.cWidth,
          // _this.cHeight, _this.elems['dragon-face'].width, _this.elems['dragon-face'].height);
          _this.ctx.drawImage(_this.elems['upload-video'], 0, 0, _this.cWidth, _this.cHeight); // , v.x, v.y, v.width, v.height);
          _this.camerashot = _this.elems['upload-canvas'].toDataURL('image/png');
        }

        setTimeout(loop, 1000 / 30);
      })();
    });

    const greetAgain = () => {
      this.tracker('E', 'edit_greeting');
      this.elems['end-page'].style.display = 'none';
      this.elems.workspace.style.display = 'block';
      fadeOutIn(this.elems['share-page'], this.elems['upload-page'], { display: 'flex' });
      const input = this.elems['input-gallery-file'];
      input.value = '';
      if (input.reset) input.reset();
      this.elems.uploading.style.display = 'flex';
      this.elems['btn-upload-next'].style.display = 'none';
      setTimeout(() => {
        this.cWidth = this.elems['upload-canvas'].offsetWidth;
        this.cHeight = this.elems['upload-canvas'].offsetHeight;
        this.elems['upload-canvas'].width = this.cWidth;
        this.elems['upload-canvas'].height = this.cHeight;
        // this.ctx.translate(this.cWidth, 0);
        // this.ctx.scale(-1, 1);
        const c = contain(this.cWidth, this.cHeight, this.elems['dragon-face'].width, this.elems['dragon-face'].height);
        this.ctx.drawImage(this.elems['dragon-face'], c.x, c.y, c.width, c.height);
      }, 1000);
    };

    this.elems['btn-edit-greeting'].addEventListener('mousedown', greetAgain);

    this.elems['btn-play-again'].addEventListener('mousedown', () => {
      this.tracker('E', 'play_again');
      this.elems.gameContainer.style.zIndex = 200;
      this.elems['end-page'].style.display = 'none';
      this.elems.start.style.display = 'block';
      this.elems.start.style.opacity = 1;
      // this.loadJS(this.resolve('js/game.js')).then(() => {
      //   console.log(typeof window.game !== 'undefined' ? 'game loaded' : 'game not loaded');
      this.elems.gameContinue.innerText = 'Continue';
      window.game.continue = () => {
        // this.elems['videoPage'].style.zIndex = 1;
        // this.elems['gamePage'].style.zIndex = 0;
        // this.allowContinue = true;
        // this.video.player.playVideo();
        this.elems.start.style.display = 'none';
        this.elems['end-page'].style.display = 'flex';
        // this.elems.gameContainer.style.zIndex = -100;
      };
      window.game.retry();
      // });
    });

    this.elems['btn-greeting-again'].addEventListener('mousedown', () => {
      this.elems['end-page'].style.display = 'none';
      this.elems['sharing-page'].style.display = 'flex';
      this.elems['upload-page'].style.display = 'none';
      this.elems['share-page'].style.display = 'block';
      this.elems['sharing-intro-page'].style.display = 'none';
    });

    this.elems['a-share-fb'].addEventListener('click', () => {
      this.tracker('E', 'share_facebook');
      this.elems['end-page'].style.display = 'flex';
    });

    this.elems['a-share-twitter'].addEventListener('click', () => {
      this.tracker('E', 'share_twitter');
      this.elems['end-page'].style.display = 'flex';
    });

    this.elems['share-download'].addEventListener('click', () => {
      this.tracker('E', 'download');
      this.elems['share-page'].style.display = 'none';
      this.elems['end-page'].style.display = 'flex';
    });

    this.elems['clickthrough'].addEventListener('click', () => {
      this.tracker('E', 'clickthrough');
    });

    this.elems['input-gallery-file'].addEventListener('change', () => {
      this.tracker('E', 'upload_photo');
      this.elems.uploading.style.display = 'none';
      this.elems['btn-upload-next'].style.display = 'block';
      const input = this.elems['input-gallery-file'];
      if (input.files && input.files[0]) {
        const reader = new window.FileReader();
        reader.onload = (e) => {
          const image = new window.Image();
          image.onload = () => {
            this.image = image;
            this.rect = this.elems['upload-canvas'].getBoundingClientRect();
            this.touchX = 0;
            this.touchY = 0;
            this.offsetX = 0;
            this.offsetY = 0;
            this.onDrag = false;
            this.rotation = 0;
            this.zoom = this.cWidth * 0.15;
            this.rt = document.getElementById('rt-img');
            this.zp = document.getElementById('zp-img');
            this.zm = document.getElementById('zm-img');
            const v = contain(this.cWidth, this.cHeight, this.elems['dragon-face'].width, this.elems['dragon-face'].height);
            // this.ctx.scale(-1, 1);
            // v.x = -this.cWidth;
            this.ctx.drawImage(image, v.x, v.y, v.width, v.height);
            // this.ctx.scale(-1, 1);
            const c = contain(this.cWidth, this.cHeight, this.elems['dragon-face'].width, this.elems['dragon-face'].height);
            this.ctx.drawImage(this.elems['dragon-face'], c.x, c.y, c.width, c.height);

            console.log('should write new face');
            this.drawRotatedimage = (dimage, midX, midY, angle, x, y, width, height) => {
              this.ctx.save();
              this.ctx.translate(midX, midY);
              this.ctx.rotate(angle * Math.PI / 180);
              this.ctx.drawImage(dimage, x, y, width, height);
              this.ctx.restore();
            };
            this.moveFace = () => {
              this.ctx.clearRect(0, 0, this.cWidth, this.cHeight);
              v.x = this.touchX - this.offsetX;
              v.y = this.touchY - this.offsetY;
              // this.ctx.scale(-1, 1);
              this.drawRotatedimage(this.image, (v.x + v.width / 2), v.y + v.height / 2, this.rotation, -v.width / 2, -v.height / 2, v.width, v.height);
              // this.ctx.scale(-1, 1);
              this.ctx.drawImage(this.elems['dragon-face'], c.x, c.y, c.width, c.height);
            };

            if (!this.addedEvent) {
              this.elems['upload-canvas'].addEventListener('mousedown', (ev) => {
                this.touchX = ev.clientX - this.rect.left;
                this.touchY = ev.clientY - this.rect.top;
                this.offsetX = this.touchX - v.x;
                this.offsetY = this.touchY - v.y;
                this.onDrag = true;
              });

              this.elems['upload-canvas'].addEventListener('touchstart', (ev) => {
                this.touchX = ev.touches[0].clientX - this.rect.left;
                this.touchY = ev.touches[0].clientY - this.rect.top;
                this.offsetX = this.touchX - v.x;
                this.offsetY = this.touchY - v.y;
                this.onDrag = true;
              });

              this.elems['upload-canvas'].addEventListener('mousemove', (ev) => {
                if (this.onDrag) {
                  this.touchX = ev.clientX - this.rect.left;
                  this.touchY = ev.clientY - this.rect.top;
                  this.moveFace();
                }
              });

              this.elems['upload-canvas'].addEventListener('touchmove', (ev) => {
                if (this.onDrag) {
                  e.preventDefault();
                  this.touchX = ev.touches[0].clientX - this.rect.left;
                  this.touchY = ev.touches[0].clientY - this.rect.top;
                  this.moveFace();
                }
              });

              this.elems['upload-canvas'].addEventListener('mouseup', () => {
                this.onDrag = false;
              });

              this.elems['upload-canvas'].addEventListener('touchend', () => {
                this.onDrag = false;
              });

              this.rt.addEventListener('click', () => {
                this.ctx.clearRect(0, 0, this.cWidth, this.cHeight);
                this.rotation += 30;
                // this.ctx.scale(-1, 1);
                this.drawRotatedimage(this.image, (v.x + v.width / 2), v.y + v.height / 2, this.rotation, -v.width / 2, -v.height / 2, v.width, v.height);
                // this.ctx.scale(-1, 1);
                this.ctx.drawImage(this.elems['dragon-face'], c.x, c.y, c.width, c.height);
              });

              this.zp.addEventListener('click', () => {
                this.ctx.clearRect(0, 0, this.cWidth, this.cHeight);
                v.width += this.zoom;
                v.height += this.zoom;
                v.x -= this.zoom / 2;
                v.y -= this.zoom / 2;
                // this.ctx.scale(-1, 1);
                this.drawRotatedimage(this.image, (v.x + v.width / 2), v.y + v.height / 2, this.rotation, -v.width / 2, -v.height / 2, v.width, v.height);
                // this.ctx.scale(-1, 1);
                this.ctx.drawImage(this.elems['dragon-face'], c.x, c.y, c.width, c.height);
              });

              this.zm.addEventListener('click', () => {
                this.ctx.clearRect(0, 0, this.cWidth, this.cHeight);
                v.width -= this.zoom;
                v.height -= this.zoom;
                v.x += this.zoom / 2;
                v.y += this.zoom / 2;
                // this.ctx.scale(-1, 1);
                this.drawRotatedimage(this.image, (v.x + v.width / 2), v.y + v.height / 2, this.rotation, -v.width / 2, -v.height / 2, v.width, v.height);
                // this.ctx.scale(-1, 1);
                this.ctx.drawImage(this.elems['dragon-face'], c.x, c.y, c.width, c.height);
              });
              this.addedEvent = true;
            }
            else {
              console.log('added');
            }
            // this.activeRegion = ZingTouch.Region(this.elems['upload-page']);

            // this.activeRegion.bind(this.elems['upload-canvas'], 'pan', (x) => {
            //   this.ctx.clearRect(0, 0, this.cWidth, this.cHeight);
            //   this.dragX = -(x.detail.events[0].x - (this.cWidth + v.x));
            //   this.dragY = x.detail.events[0].y - this.cHeight;
            //   this.ctx.drawImage(image, this.dragX,
            //     this.dragY, v.width, v.height);
            //   this.ctx.drawImage(this.elems['dragon-face'], c.x, c.y, c.width, c.height);
            // });

            this.elems['btn-upload-next'].addEventListener('click', () => {
              this.ctx.clearRect(0, 0, this.cWidth, this.cHeight);
              // this.ctx.scale(-1, 1);
              this.drawRotatedimage(image, (v.x + v.width / 2), v.y + v.height / 2, this.rotation, -v.width / 2, -v.height / 2, v.width, v.height);
              // this.ctx.scale(-1, 1);
              this.camerashot = trim(this.elems['upload-canvas']).toDataURL('image/png');
              this.uploadNext();
            });

            // this.activeRegion.bind(this.elems['btn-upload-next'], 'tap', () => {
            //   this.ctx.clearRect(0, 0, this.cWidth, this.cHeight);
            //   this.ctx.drawImage(image, this.dragX,
            //     this.dragY, v.width, v.height);
            //   this.camerashot = this.elems['upload-canvas'].toDataURL('image/png');
            //   this.uploadNext();
            // }, false);
          };
          image.src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    });

    this.elems['skip-video'].addEventListener('click', () => {
      if (!window.game) {
        this.loadJS(this.resolve('js/game.js')).then(() => {
          console.log(typeof window.game !== 'undefined' ? 'game loaded' : 'game not loaded');
          window.game.init();
          window.game.continue = () => {
            this.elems['video-page'].style.zIndex = 1;
            this.elems['game-page'].style.zIndex = 0;
            this.allowContinue = true;
            this.video.player.playVideo();
            this.elems.gameContainer.style.zIndex = -100;
          };
        });
      }
      this.tracker('E', 'skip_video');
      this.video.player.stopVideo();
      fadeOutIn(this.elems.start, this.elems['sharing-intro-page'], { display: 'flex' });
    });
  }
}

window.ad = new AdUnit();

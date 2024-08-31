// pages/3x3/3x3.js
const innerAudioContext = wx.createInnerAudioContext();
innerAudioContext.src = '/audio/click.mp3';
Page({
  data: {
    isWin: false,
    win:'',
    imageSrc: '',
    num: [
      ['00', '01', '02'],
      ['10', '11', '12'],
      ['20', '21', '22']
    ],
    w: 100
  },
  chooseMedia: function() {
    const that = this;
    wx.chooseMedia({
      count: 1,
      mediaType: ['image'],
      sourceType: ['album', 'camera'],
      success: function(res) {
        const tempFiles = res.tempFiles;
        if (tempFiles.length > 0) {
          that.setData({
            imageSrc: tempFiles[0].tempFilePath // 更新图片路径
          });
        }
      },
      fail: function(err) {
        console.log('选择图片失败', err);
      }
    });
  },
  isWin: function() {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.data.num[i][j] !== (i * 10 + j).toString().padStart(2, '0')) {
          return false;
        }
      }
    }
    this.setData({ isWin: true });
    return true;
  },
  shuffle: function() {
    let num = [['00', '01', '02'], ['10', '11', '12'], ['20', '21', '22']];
    let row = 2;
    let col = 2;
    for (let i = 0; i < 100; i++) {
      let direction = Math.floor(Math.random() * 4);
      if (direction === 0 && row !== 0) {
        num[row][col] = num[row - 1][col];
        num[row - 1][col] = '22';
        row -= 1;
      } else if (direction === 1 && row !== 2) {
        num[row][col] = num[row + 1][col];
        num[row + 1][col] = '22';
        row += 1;
      } else if (direction === 2 && col !== 0) {
        num[row][col] = num[row][col - 1];
        num[row][col - 1] = '22';
        col -= 1;
      } else if (direction === 3 && col !== 2) {
        num[row][col] = num[row][col + 1];
        num[row][col + 1] = '22';
        col += 1;
      }
    }
    this.setData({ num });
  },
  drawCanvas: function() {
    const ctx = this.ctx;
    const w = this.data.w;
    const num = this.data.num;
    const imgSrc = this.data.imageSrc;
    
    // 通过图片的实际宽度和高度来计算每个小块的绘制区域
    wx.getImageInfo({
      src: imgSrc,
      success: (res) => {
        const imgWidth = res.width;
        const imgHeight = res.height;
        const blockWidth = imgWidth / 3;
        const blockHeight = imgHeight / 3;
        
        ctx.clearRect(0, 0, 300, 300);
        
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (num[i][j] !== '22') {
            const blockIndex = parseInt(num[i][j]);
            const row = Math.floor(blockIndex / 10);
            const col = blockIndex % 10;
              // 绘制图片块
            ctx.drawImage(imgSrc, 
               col * blockWidth, row * blockHeight, blockWidth, blockHeight, 
                j * w, i * w, w, w
              );
            }
          }
        }
        
        ctx.draw();
      },
      fail: function(err) {
        console.log('获取图片信息失败', err);
      }
    });
  },
  touchBox: function(e) {
    if (this.data.isWin) {
      return;
    }
    const x = e.changedTouches[0].x;
    const y = e.changedTouches[0].y;
    const w = this.data.w;
    const num = this.data.num;
    const row = Math.floor(y / w);
    const col = Math.floor(x / w);

    if (num[row][col] !== '22') {
      this.moveBox(row, col);
      this.drawCanvas();
      if (this.isWin()) {
        const ctx = this.ctx;
        ctx.drawImage(this.data.imageSrc, 0, 0);
        var that = this;
    that.setData({
        win:'you win !'
      });
        ctx.draw();
      }
    }
  },
  moveBox: function(i, j) {
    const num = this.data.num;
    if (i > 0 && num[i - 1][j] === '22') {
      num[i - 1][j] = num[i][j];
      num[i][j] = '22';
    } else if (i < 2 && num[i + 1][j] === '22') {
      num[i + 1][j] = num[i][j];
      num[i][j] = '22';
    } else if (j > 0 && num[i][j - 1] === '22') {
      num[i][j - 1] = num[i][j];
      num[i][j] = '22';
    } else if (j < 2 && num[i][j + 1] === '22') {
      num[i][j + 1] = num[i][j];
      num[i][j] = '22';
    }
    innerAudioContext.play(); // 移动效果音乐
    this.setData({ num });
  },
  restartGame: function() {
    this.setData({ isWin: false });
    this.shuffle();
    this.drawCanvas();
    this.setData({
      win:''
    });
  },
  onLoad: function(options) {
    this.ctx = wx.createCanvasContext('myCanvas');
    this.shuffle();
    this.drawCanvas();
  }
});
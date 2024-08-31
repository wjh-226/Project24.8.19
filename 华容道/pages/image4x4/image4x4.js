// pages/image4x4/image4x4.js
const innerAudioContext = wx.createInnerAudioContext();
innerAudioContext.src = '/audio/click.mp3';
Page({
  data: {
    num: Array.from({ length: 16 }, (_, i) => i + 1),  // 用图片的编号初始化
    hidden: true,
    success: '',
    time: 0,
    t: '',              // 定时器
    images: [
      '/images/tile00.png',
      '/images/tile01.png',
      '/images/tile02.png',
      '/images/tile03.png',
      '/images/tile04.png',
      '/images/tile05.png',
      '/images/tile06.png',
      '/images/tile07.png',
      '/images/tile08.png',
      '/images/tile09.png',
      '/images/tile10.png',
      '/images/tile11.png',
      '/images/tile12.png',
      '/images/tile13.png',
      '/images/tile14.png',
      '/images/tile15.png'
    ]  // 图片资源路径
  },
  onLoad: function () {
    this.init();
  },
  // 随机打乱数组
  sortArr: function (arr) {
    return arr.sort(function () {
      return Math.random() - 0.5;
    });
  },
  onMoveTap: function (e) {
    var index = e.currentTarget.dataset.index;
    var item = e.currentTarget.dataset.item;
    const gridSize = 4;
    const zeroIndex = this.data.num.indexOf(gridSize * gridSize);  // 查找空白格（16）的索引

    // 根据当前点击的位置和空白格的位置判断移动方向
    if (index === zeroIndex - gridSize && zeroIndex >= gridSize) {  // 上
      this.move(e, zeroIndex, index);
    } else if (index === zeroIndex + gridSize && zeroIndex < gridSize * (gridSize - 1)) {  // 下
      this.move(e, zeroIndex, index);
    } else if (index === zeroIndex - 1 && index % gridSize !== gridSize - 1) {  // 左
      this.move(e, zeroIndex, index);
    } else if (index === zeroIndex + 1 && zeroIndex % gridSize !== gridSize - 1) {  // 右
      this.move(e, zeroIndex, index);
    }
  },
  move: function (e, zeroIndex, targetIndex) {
    var num = [...this.data.num];
    [num[zeroIndex], num[targetIndex]] = [num[targetIndex], num[zeroIndex]];  // 交换空白格和目标格的内容
    this.setData({
      num: num
    });
    innerAudioContext.play(); // 移动效果音乐
    if (this.isSuccess()) {
      this.success();
    }
  },
  isSuccess: function () {
    return this.data.num.toString() === Array.from({ length: 16 }, (_, i) => i + 1).toString();
  },
  success: function () {
    clearInterval(this.data.t);
    var that = this;
    that.setData({
      success: 'you win !'
    });
    wx.showToast({
      title: '闯关成功',
      icon: 'success',
      success: function () {
        that.init();
      }
    });
  },
  fail: function () {
    var that = this;
    that.setData({
      success: 'you lost !'
    });
    wx.showToast({
      title: '闯关失败',
      icon: 'loading',
      success: function () {
        that.init();
      }
    });
  },
  // 初始化拼图
  init: function () {
    let numbers = Array.from({ length: 16 }, (_, i) => i + 1);
    this.setData({
      num: numbers
    });
  },
  timeCount: function () {
    var that = this;
    var timer = that.data.time;
    that.setData({
      t: setInterval(function () {
        timer++;
        that.setData({
          time: timer
        });
      }, 1000)
    });
  },
  timeBegin: function () {
    clearInterval(this.data.t);
    this.setData({
      time: 0,
      success: ''  // 清除之前的成功或失败消息
    });
    let shuffledNumbers = this.sortArr(Array.from({ length: 16 }, (_, i) => i + 1));
    this.setData({
      num: shuffledNumbers
    });
    this.timeCount();
  },
  timeStop: function () {
    clearInterval(this.data.t);
    if (!this.isSuccess()) {
      this.fail();
    }
  }
});
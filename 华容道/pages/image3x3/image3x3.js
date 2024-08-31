// pages/image3x3/image3x3.js
const innerAudioContext = wx.createInnerAudioContext();
innerAudioContext.src = '/audio/click.mp3';
Page({
  data: {
    num: Array.from({ length: 9 }, (_, i) => i + 1),  // 用图片的编号初始化
    hidden: true,
    success: '',
    time: 0,
    t: '',              // 定时器
    images: [
      'https://6564-education-7guqb5vu81bc861e-1307366133.tcb.qcloud.la/audio/tile0.png?sign=cc8d0e469fa0fc61d86fb389a8ed256d&t=1724929330',
      'https://6564-education-7guqb5vu81bc861e-1307366133.tcb.qcloud.la/audio/tile1.png?sign=5a01b85411e3d80e898506ad28806693&t=1724929352',
      'https://6564-education-7guqb5vu81bc861e-1307366133.tcb.qcloud.la/audio/tile2.png?sign=92eb0034ce34266d3d36a6ef9649a6ea&t=1724929373',
      'https://6564-education-7guqb5vu81bc861e-1307366133.tcb.qcloud.la/audio/tile3.png?sign=dd82a3f6e0ce12627398f2e9cf3f9a60&t=1724929389',
      'https://6564-education-7guqb5vu81bc861e-1307366133.tcb.qcloud.la/audio/tile4.png?sign=e012cd2b3034ccd3cf47d220c2287c11&t=1724929402',
      'https://6564-education-7guqb5vu81bc861e-1307366133.tcb.qcloud.la/audio/tile5.png?sign=34551a3545abfb531033a66684615e2a&t=1724929415',
      'https://6564-education-7guqb5vu81bc861e-1307366133.tcb.qcloud.la/audio/tile6.png?sign=f4ccb560e7225069ef39107c96cf3df4&t=1724929428',
      'https://6564-education-7guqb5vu81bc861e-1307366133.tcb.qcloud.la/audio/tile7.png?sign=fad470659dc1468a4a6f098e3b44298f&t=1724929442',
      'https://6564-education-7guqb5vu81bc861e-1307366133.tcb.qcloud.la/audio/tile8.png?sign=c5ba100182d43f285da77064b4a9b2c3&t=1724929457'
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
    const gridSize = 3;
    const zeroIndex = this.data.num.indexOf(gridSize * gridSize);  // 查找空白格（9）的索引

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
    return this.data.num.toString() === Array.from({ length: 9 }, (_, i) => i + 1).toString();
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
    let numbers = Array.from({ length: 9 }, (_, i) => i + 1);
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
    let shuffledNumbers = this.sortArr(Array.from({ length: 9 }, (_, i) => i + 1));
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
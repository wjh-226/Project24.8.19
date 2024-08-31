// pages/image5x5/image5x5.js
const innerAudioContext = wx.createInnerAudioContext();
innerAudioContext.src = '/audio/click.mp3';
Page({
    data: {
      num: Array.from({ length: 25 }, (_, i) => i + 1),  // 用图片的编号初始化
      hidden: true,
      success: '',
      time: 0,
      t: '',              // 定时器
      images: [
        '/images/0.png',
        '/images/1.png',
        '/images/2.png',
        '/images/3.png',
        '/images/4.png',
        '/images/5.png',
        '/images/6.png',
        '/images/7.png',
        '/images/8.png',
        '/images/9.png',
        '/images/10.png',
        '/images/11.png',
        '/images/12.png',
        '/images/13.png',
        '/images/14.png',
        '/images/15.png',
        '/images/16.png',
        '/images/17.png',
        '/images/18.png',
        '/images/19.png',
        '/images/20.png',
        '/images/21.png',
        '/images/22.png',
        '/images/23.png',
        '/images/24.png'
      ]  // 图片资源路径
    },
    onLoad: function () {
      this.init();
    },
    // 随机打乱数组
    sortArr: function (arr) {
      return arr.sort(function () {
        return Math.random() - 0.5;
      });
    },
    onMoveTap: function (e) {
      var index = e.currentTarget.dataset.index;
      var item = e.currentTarget.dataset.item;
      const gridSize = 5;
      const zeroIndex = this.data.num.indexOf(gridSize * gridSize);  // 查找空白格（25）的索引
  
      // 根据当前点击的位置和空白格的位置判断移动方向
      if (index === zeroIndex - gridSize && zeroIndex >= gridSize) {  // 上
        this.move(e, zeroIndex, index);
      } else if (index === zeroIndex + gridSize && zeroIndex < gridSize * (gridSize - 1)) {  // 下
        this.move(e, zeroIndex, index);
      } else if (index === zeroIndex - 1 && index % gridSize !== gridSize - 1) {  // 左
        this.move(e, zeroIndex, index);
      } else if (index === zeroIndex + 1 && zeroIndex % gridSize !== gridSize - 1) {  // 右
        this.move(e, zeroIndex, index);
      }
    },
    move: function (e, zeroIndex, targetIndex) {
      var num = [...this.data.num];
      [num[zeroIndex], num[targetIndex]] = [num[targetIndex], num[zeroIndex]];  // 交换空白格和目标格的内容
      this.setData({
        num: num
      });
  innerAudioContext.play(); // 移动效果音乐
      if (this.isSuccess()) {
        this.success();
      }
    },
      isSuccess: function () {
        return this.data.num.toString() === Array.from({ length: 25 }, (_, i) => i + 1).toString();
      },
      success: function () {
      clearInterval(this.data.t);
        var that = this;
        that.setData({
          success: 'you win !'
        });
        wx.showToast({
          title: '闯关成功',
          icon: 'success',
          success: function () {
            that.init();
          }
        });
      },
      fail: function () {
        var that = this;
        that.setData({
          success: 'you lost !'
        });
        wx.showToast({
          title: '闯关失败',
          icon: 'loading',
          success: function () {
            that.init();
          }
        });
      },
      // 初始化拼图
      init: function () {
        let numbers = Array.from({ length: 25 }, (_, i) => i + 1);
        this.setData({
          num: numbers
        });
      },
      timeCount: function () {
        var that = this;
        var timer = that.data.time;
        that.setData({
          t: setInterval(function () {
            timer++;
            that.setData({
              time: timer
            });
          }, 1000)
        });
      },
      timeBegin: function () {
        clearInterval(this.data.t);
        this.setData({
          time: 0,
          success:''
        });
        let shuffledNumbers = this.sortArr(Array.from({ length: 25 }, (_, i) => i + 1));
        this.setData({
          num: shuffledNumbers
        });
        this.timeCount();
      },
      timeStop: function () {
        clearInterval(this.data.t);
        if (!this.isSuccess()) {
          this.fail();
        }
      }
    });
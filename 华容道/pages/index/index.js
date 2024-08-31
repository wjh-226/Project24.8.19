// index.js
const innerAudioContext = wx.createInnerAudioContext();
innerAudioContext.autoplay = true;
innerAudioContext.src = 'https://6564-education-7guqb5vu81bc861e-1307366133.tcb.qcloud.la/audio/%E5%A4%A9%E7%A9%BA%E4%B9%8B%E5%9F%8E.mp3?sign=720116abeb9a7f1f66cc455f1993eec3&t=1724929085';
innerAudioContext.loop =true;

Page({
  data: {
    isPlaying: true, // 用于控制音乐播放状态
  },
  togglePlay: function() {
    if (this.data.isPlaying) {
      innerAudioContext.pause();
    } else {
      innerAudioContext.play();
    }
    this.setData({
      isPlaying: !this.data.isPlaying // 切换播放状态
    });
  },
  goTo3x3: function () {
    wx.navigateTo({
      url: '/pages/page3x3/page3x3'
    });
  },

  goTo4x4: function () {
    wx.navigateTo({
      url: '/pages/page4x4/page4x4'
    });
  },

  goTo5x5: function () {
    wx.navigateTo({
      url: '/pages/page5x5/page5x5'
    });
  },
  goToindex2: function () {
    wx.navigateTo({
      url: '/pages/index2/index2'
    });
  }
});




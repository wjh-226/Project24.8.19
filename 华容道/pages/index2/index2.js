// pages/index2/index2.js

Page({
  
  goTo3x3s: function () {
    wx.navigateTo({
      url: '/pages/image3x3/image3x3'
    });
  },
  goTo4x4s: function () {
    wx.navigateTo({
      url: '/pages/image4x4/image4x4'
    });
  },

  goTo5x5s: function () {
    wx.navigateTo({
      url: '/pages/image5x5/image5x5'
    });
  },

  goTo3x3: function () {
    wx.navigateTo({
      url: '/pages/3x3/3x3'
    });
  },

  goToindex: function () {
    wx.navigateTo({
      url: '/pages/index/index'
    });
  }
});
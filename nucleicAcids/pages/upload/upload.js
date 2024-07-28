// pages/upload/upload.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tubeid:'111',
  },
  clicktube(){
     
    wx.scanCode({
      scanType:["barCode"],
      success:(e)=>{
        console.log(e);
        const tubeid = e.result
        
        this.setData({
          tubeid,
        })
        
      }
    })
  },
})
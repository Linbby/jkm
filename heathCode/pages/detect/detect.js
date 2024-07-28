// pages/detect/detect.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  getData(){
    app.myrequest({
      url: 'http://graywolf.top:6201/nucleic-acids/getNucleicAcidTestRecord',
      method:'GET',
      success:(res)=>{
        console.log(res);
      }})
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getData()
  },
})
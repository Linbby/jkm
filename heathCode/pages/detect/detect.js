// pages/detect/detect.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },

  getData(){
    app.myrequest({
      url: 'http://graywolf.top:6201/nucleic-acids/getNucleicAcidTestRecord',
      method:'GET',
      success:(res)=>{
        res.data.data.forEach(item=>{
          const temp =['green','red','organe']
          const text = ['阴性','阳性','未出']
          item.statuscolor = temp[item.result]
          item.text = text[item.result]
        })
        this.setData({
          list:res.data.data
        })
      }})
  },


  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getData()
  },
})
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    created_at:'',
    identity_card:'',
    places:[],
  },

  /**
   * 生命周期函数--监听页面显示
   */
  getData(){
    app.myrequest({
      url: 'http://graywolf.top:6201/itinerary-code/getItinerary',
      method:'GET',
      success:(res)=>{
        const places= res.data.data.places
        this.setData({
          created_at:res.data.data.created_at.slice(0,19).replace('T',' '),
          identity_card:res.data.data.identity_card,
          places:res.data.data.places
          // identity_card:'999999999999999999'
        })
        console.log(res);
      }
    })
  },
  onShow() {
    this.getData()
  },
})
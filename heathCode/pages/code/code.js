var wxbarcode = require('../../utils/index.js')
// pages/code/code.js
const app = getApp()
Page({

  data: {
    name:'',
    status:'',
    statuscolor:'',
    created_at:'',
    result:'',
    resulttext:'',
    resultcolor:'',
    testing_organization:''
  },
  goto(event){
    const page = event.currentTarget.dataset.page;
    wx.navigateTo({
      url: '/pages/'+page+'/'+page,
    })
  },
  unfinished(){
    wx.showToast({
      title: '功能未开放，尽情期待',
      icon:"none"
    })
  },
  getData(){
    this.getLastNucleicAcidTestRecord()
  },
  getHealthCode(){
    app.myrequest({
      url: 'http://graywolf.top:6201/health-code/getCode',
      method:'GET',
      success:(data=>{
        
        if(data.data.code==400)
        wx.showModal({
          content: '未检测到用户信息，请先注册', // 提示框的文字内容
          icon:'none',
          complete(){
            wx.navigateTo({
              url: '/pages/'+'regist'+'/'+'regist',
            })
          },
        })
        if(data.data.code==200){
          const status = data.data.data.status
          const temp = ['green','yellow','red']
          const statuscolor = temp[status]
          const color = [ '#1b824d','#FFD700','#f60909'][status]
          
          wxbarcode.qrcode('qrcode',app.globalData.token,408,408,color)
          this.setData({
            name:data.data.data.name,
            status:status,
            statuscolor:statuscolor
          })
          this.getData()
        }
      }),
    })
  },
  scanCode(){
    wx.scanCode({
      success (res) {
        app.myrequest({
          url:'http://graywolf.top:6201/place-code/scanCode',
          method:'POST',
          data:{
            pid:0
          },
          success:(data=>{
            if(data.data.code==200)
            wx.showToast({
              title: '场所码扫描成功',
              icon:'none'
            })
          })
        })
      },
    })
  },
  getLastNucleicAcidTestRecord(){
    app.myrequest({
      url: 'http://graywolf.top:6201/nucleic-acids/getLastNucleicAcidTestRecord',
      method:'GET',
      success:(data=>{
        // data.data.data = {
        //   created_at:'2022-01-01',
        //   result:0,
        //   testing_organization:'huaguoshan'
        // }
        if(data.data.code==200 && data.data.data){
          const created_at = data.data.data.created_at
          const temp = ['阴性','阳性','未出']
          const tempcolor = ['green','red','orange']
          const result = data.data.data.result
          const resulttext = temp[result]
          const resultcolor = tempcolor[result]
          const testing_organization = data.data.data.testing_organization

          this.setData({
            created_at,result,testing_organization,resulttext,resultcolor
          })
        }
      }),
    })
  },
  getCode(){
    const wxLogin = () => {
      return new Promise((resolve) => {
        wx.login({
          success(res) {
            resolve(res.code);
          }
        });
      });
    }
    wxLogin().then(code=>{
      this.getToken(code)
    })
  },
  getToken(code){
    app.myrequest({
      url: 'http://graywolf.top:6201/user/login',
      method:'POST',
      data:{
        code:code
      },
      success:(data=>{
        if(data.data.code==200){ 
         app.globalData.token = data.data.data
         
         this.getHealthCode()
        }
      })
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    this.getCode()
    
  },


})
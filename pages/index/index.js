// index.js
// 获取应用实例
const app = getApp()
const cpuListData = require('../../data/CPU');
const gpuListData = require('../../data/GPU');

Page({
  data: {
    cpuListData: cpuListData,
    gpuListData: gpuListData,
    cpuIndex: 0,
    gpuIndex: 0,
    cpuName: [],
    gpuName: []
  },
  // 事件处理函数
  bindViewTap() {
    wx.navigateTo({
      url: '../result/result'
    })
  },
  onLoad() {
    let cpuList = cpuListData.cpuList,
      gpuList = gpuListData.gpuList,
      cpuName = [],
      gpuName = [];
    cpuList.forEach((item) => {
      if (item.toString() === '[object Object]') {
        cpuName.push(item.name);
      }
    });
    gpuList.forEach(item => {
      if (item.toString() === '[object Object]') {
        gpuName.push(item.name);
      }
    })
    this.setData({
      cpuName,
      gpuName
    })
  },
  cal() {
    let {
      cpuIndex,
      gpuIndex
    } = this.data;
    let result = (Number(cpuListData.cpuList[cpuIndex].value) + Number(gpuListData.gpuList[gpuIndex].value) + 40) * 1.5;
    wx.navigateTo({
      url: '../result/result',
      success: function (res) {
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          data: result
        })
      }
    })
    console.log(result);
  },
  bindPickerChangeCPU: function (e) {
    this.setData({
      cpuIndex: e.detail.value
    })
  },
  bindPickerChangeGPU: function (e) {
    this.setData({
      gpuIndex: e.detail.value
    })
  }
})
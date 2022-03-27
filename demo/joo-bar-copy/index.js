var Event = require("bcore/event");
var $ = require("jquery");
var _ = require("lodash");
//var Chart = require('XXX');
var EChart = require("echarts");
var Utils = require("datav:/com/maliang-echarts-utils/0.0.18");

/**
 * 马良基础类
 */
module.exports = Event.extend(
  function Base(container, config) {
    console.log("base", container, config);
    this.config = {
      series: [],
      yAxis: { data: [], type: "value" },
      xAxis: { data: [], type: "category" },
      legend: { data: [] },
    };
    this.container = $(container); //容器
    this.apis = config.apis; //hook一定要有
    this._data = null; //数据
    this.chart = null; //图表
    this.init(config);
  },
  {
    /**
     * 公有初始化
     */
    init: function (config) {
      console.log("init", config);
      config = this.mergeConfig(config);
      this.chart = EChart.init(this.container[0]);
      this.chart.setOption(Utils.config2echartsOptions(config));
    },
    /**
     * 绘制
     */
    render: function (data, config) {
      console.log("render", data, config);
      config = this.mergeConfig(config);
      data = this.data(data);
      var cfg = Utils.config2echartsOptions(
        this.mergeConfig(Utils.data2echartsAxis(data, config))
      );
      this.chart.setOption(cfg);
      //emit
      this.container.on("click", () => {
        console.log("click");
        this.emit("click", { value: "test" });
      });
    },
    /**
     * 数据,设置和获取数据
     * @param data
     * @returns {*|number}
     */
    data: function (data) {
      console.log("data", data);
      if (data) {
        this._data = data;
      }
      return this._data;
    },
    /**
     * 合并配置
     */
    mergeConfig: function (config) {
      if (!config) {
        return this.config;
      }
      if (config.xAxis && config.xAxis.axisLine) {
        config.xAxis.name = config.xAxis.tName;
        config.xAxis.axisLine.lineStyle.type =
          config.xAxis.axisLine.lineStyle.sType;
        config.xAxis.axisTick.lineStyle.type =
          config.xAxis.axisTick.lineStyle.sType;
        config.xAxis.splitLine.lineStyle.type =
          config.xAxis.splitLine.lineStyle.sType;
        config.xAxis.axisPointer.type = config.xAxis.axisPointer.lType;
        config.xAxis.axisPointer.lineStyle.type =
          config.xAxis.axisPointer.lineStyle.sType;
      }
      if (config.yAxis && config.yAxis.axisLine) {
        config.yAxis.name = config.yAxis.tName;
        config.yAxis.axisLine.lineStyle.type =
          config.yAxis.axisLine.lineStyle.sType;
        config.yAxis.axisTick.lineStyle.type =
          config.yAxis.axisTick.lineStyle.sType;
        config.yAxis.splitLine.lineStyle.type =
          config.yAxis.splitLine.lineStyle.sType;
        config.yAxis.axisPointer.type = config.yAxis.axisPointer.lType;
        config.yAxis.axisPointer.lineStyle.type =
          config.yAxis.axisPointer.lineStyle.sType;
      }
      if (config.series) {
        config.series.forEach((d, i) => {
          if (d.data) {
            this.config.series[i].data = d.data;
          }
          this.config.series[i] = _.defaultsDeep(
            d || {},
            this.config.series[i]
          );
          this.config.series[i].type = "bar";
        });
        this.config.series = _.take(this.config.series, config.series.length);
      }
      if (config.xAxis.data) {
        this.config.xAxis.data = config.xAxis.data;
      }
      this.config = _.defaultsDeep(config || {}, this.config);
      this.config.legend.data = _.map(this.config.series, "name");
      console.log("merge", this.config);
      return this.config;
    },
    /**
     * 更新样式
     * 有些子组件控制不到的,但是需要控制改变的,在这里实现
     */
    updateStyle: function () {
      var cfg = this.config;
      // this.container.css({
      //   "font-size": cfg.size + "px",
      //   color: cfg.color || "#fff",
      // });
    },
    /**
     *缩放，当组件被拖拽、缩放时被调用。
     */
    resize: function (width, height) {
      this.chart.resize({
        width,
        height,
      });
    },
    /**
     * 清理，当组件被清理时被调用。
     */
    clear: function () {
      this.chart && this.chart.clear && this.chart.clear();
    },
    /**
     * 销毁组件
     */
    destroy: function () {
      this.chart && this.chart.dispose && this.chart.dispose();
    },
    /**
     * 处理自定义配置项的handler
     */
    handleCustomItem: function () {
      console.log("custom handler");
    },
    /**
     * select动作
     */
    select: function (data) {
      console.log("select data", data);
    },
  }
);

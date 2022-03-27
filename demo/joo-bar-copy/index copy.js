var Event = require("bcore/event");
var $ = require("jquery");
var _ = require("lodash");
//var Chart = require('XXX');
var echarts = require("echarts");

/**
 * 马良基础类
 */
module.exports = Event.extend(
  function Base(container, config) {
    console.log("base", container, config);
    this.config = {
      theme: {},
      custom: [
        {
          top: 8,
          left: 10,
        },
      ],
    };
    this.container = $(container); //容器
    this.apis = config.apis; //hook一定要有
    this._data = null; //数据
    this.chart = null; //图表
    this.init(config);
    //emit
    this.container.on("click", () => {
      this.emit("click", { name: "test" });
    });
  },
  {
    /**
     * 公有初始化
     */
    init: function (config) {
      console.log("init", config);
      //1.初始化,合并配置
      this.mergeConfig(config);
      //2.刷新布局,针对有子组件的组件 可有可无
      this.updateLayout();
      //3.子组件实例化
      //this.chart = new Chart(this.container[0], this.config);
      //4.如果有需要, 更新样式
      this.updateStyle();
    },
    /**
     * 绘制
     * @param data
     * @param options 不一定有
     * !!注意: 第二个参数支持config, 就不需要updateOptions这个方法了
     */
    render: function (data, config) {
      console.log("render", data, config);
      data = this.data(data);
      var cfg = this.mergeConfig(config);
      //更新图表
      //this.chart.render(data, cfg);
      this.container.html(data[0].value);
      //如果有需要的话,更新样式
      this.updateStyle();
    },

    /**
     * 每个组件根据自身需要,从主题中获取颜色 覆盖到自身配置的颜色中.
     * 暂时可以不填内容
     */
    setColors: function () {
      //比如
      //var cfg = this.config;
      //cfg.color = cfg.theme.series[0] || cfg.color;
    },
    /**
     * 数据,设置和获取数据
     * @param data
     * @returns {*|number}
     */
    data: function (data) {
      if (data) {
        this._data = data;
      }
      return this._data;
    },
    /**
     * 更新配置
     * 优先级: config.colors > config.theme > this.config.theme > this.config.colors
     * [注] 有数组的配置一定要替换
     * @param config
     * @private
     */
    mergeConfig: function (config) {
      if (!config) {
        return this.config;
      }
      this.config.theme = _.defaultsDeep(config.theme || {}, this.config.theme);
      this.setColors();
      this.config = _.defaultsDeep(config || {}, this.config);
      return this.config;
    },
    /**
     * 更新布局
     * 可有可无
     */
    updateLayout: function () {},
    /**
     * 更新样式
     * 有些子组件控制不到的,但是需要控制改变的,在这里实现
     */
    updateStyle: function () {
      var cfg = this.config;
      this.container.css({
        "font-size": cfg.size + "px",
        color: cfg.color || "#fff",
      });
    },
    /**
     * 更新配置 接收的入参config是修改后的新配置
     * !!注意:如果render支持第二个参数options, 那updateOptions不是必须的
     */
    //updateOptions: function (options) {},
    /**
     * 更新某些配置
     * 给可以增量更新配置的组件用
     */
    //updateXXX: function () {},

    /**
     * 设置主题配置，当配置组件的主题时被调用，返回主题与组件配置的映射关系，
     * 同时使⽤themeConfig中提供的主题配置项进行主题配置
     * 用前需要在组件配置中，使用supportTheme字段声明组件是否支持主题配置，设置为true表示支持
     */
    /**
     * themeConfig
     * {
          "bgColor": "#202020",        // 背景颜色
          "textColor": "#FFFFFF",     // 文本颜色
          "axisColor": "#FFFFFF",    // 坐标轴颜色
          "assistColor": "#FFFFFF", // 辅助信息颜色
          "palette": [             // 系列颜色
            "#85A5FF",
            "#597EF7",
            "#2F54EB",
            "#1D39C4",
            "#10239E",
            "#061178",
            "#030852"
          ]
      }
     */
    getThemableConfig: function (themeConfig) {
      console.log("themeConfig", themeConfig);
      if (!themeConfig) return null;
      const themeMap = {
        color: themeConfig.textColor,
        bgColor: palette[0],
      };
      return themeMap;
    },
    /**
     *缩放，当组件被拖拽、缩放时被调用。
     * @param width
     * @param height
     */
    resize: function (width, height) {
      this.updateLayout(width, height);
      //更新图表
      //this.chart.render({
      //  width: width,
      //  height: height
      //})
    },
    /**
     * 清理，当组件被清理时被调用。
     */
    clear: function () {},
    /**
     * 销毁组件
     */
    destroy: function () {
      console.log("请实现 destroy 方法");
    },
    /**
     * 处理自定义配置项的handler
     */
    handleCustomItem: function () {
      console.log("custom handler");
    },
  }
);

# DATAV

## package.json

### views

### config

### apis

### api_data

### events

### publicHandler



## 蓝图编辑器

### 交互类型

事件

动作

### 逻辑节点

全局节点



流程控制

1. 分支判断
2. 多路判断
3. 定时器



数据处理

1. 串行数据处理

2. 并行数据处理

3. 序列执行
4. WebSocket？



```记录日志
function (data,getCallbackValue,getLocalValue) {
  
}
```



记录日志



## 组件

### 自定义组件

#### 文件结构

| 文档名       | 描述             |
| :----------- | :--------------- |
| index.js     | 组件主入口       |
| package.json | 组件配置         |
| readme.md    | 组件描述         |
| history.md   | 组件更新历史描述 |

#### index.js规范

| 函数                                      | 说明                                                         |
| :---------------------------------------- | :----------------------------------------------------------- |
| `render(array: data)`                     | 默认渲染方法。当组件被初始化后，组件渲染逻辑被调用，入参为数据。需要能够支持重渲染，即保证同样的数据输入，能够渲染出同样的效果。 |
| `updateOptions(object: config)`           | 更新组件配置，接收的入参`config`是修改后的新配置。           |
| `emit(string: event_name, object: value)` | 抛出事件，抛出的`value`需要为object类型。此方法需要在package.json的events中声明后，节点编程中才会出现此事件。也可以在交互面板中使用。 |
| `resize(int: width, int: height)`         | 缩放，当组件被拖拽、缩放时被调用。                           |
| `clear()`                                 | 清理，当组件被清理时被调用。                                 |
| `destroy()`                               | 销毁，当组件被销毁时调用。                                   |
| `require(*)`                              | 支持 js、html。                                              |
| `getThemableConfig(themeConfig)`          | 设置主题配置，当配置组件的主题时被调用，返回主题与组件配置的映射关系，同时使⽤`themeConfig`中提供的主题配置项进行主题配置。调用前需要在组件配置中，使用`supportTheme`字段声明组件是否支持主题配置，设置为`true`表示支持，更多详情请参见[getThemableConfig(themeConfig)接口说明](https://help.aliyun.com/document_detail/86892.html#section-ck7-stj-ehj)。 |

#### events 事件

`package.json`

```json
{
  "events": {
  "click": {
    "description": "事件描述",
    "fields": {
      "value": {
        "description": "值描述"
      }
    }
  }
}
}
```

`index.js`

```javascript
//emit
this.container.on("click", () => {
  console.log("click");
  this.emit("click", { value: "test" });
});
```



#### publicHandler 动作

`package.json`

```json
{
  "publicHandler": {
  "select": {
    "name": "选择",
    "description": "publicHandler描述",
    "type": "object",
    "fields": {
      "data": {
        "name": "数据",
        "type": "array",
        "default": [
          {
            "value": "value",
            "url": "xxx.com"
          }
        ],
        "children": {
          "value": {
            "name": "值",
            "type": [
              "string",
              "number"
            ],
            "optional": false,
            "description": "值"
          },
          "url": {
            "name": "超链接地址",
            "type": "string",
            "optional": false,
            "description": "超链接地址"
          }
        }
      }
    }
  }}
}
```



![image-20220327201401777](https://tva1.sinaimg.cn/large/e6c9d24ely1h0opbcx0s2j20b105dq2z.jpg)

| 字段名                    | 含义             | 是否必选 | 备注                                                         |
| :------------------------ | :--------------- | :------- | :----------------------------------------------------------- |
| `name`                    | 事件名           | 是       | 在节点编程配置中使用。                                       |
| `description`             | 事件描述         | 否       | 无严格的字数限制。                                           |
| `type`                    | 事件第一入参类型 | 否       | 可选，固定为object。                                         |
| `fields`                  | 字段             | 否       | 无。                                                         |
| `fields.data.name`        | 字段名           | 是       | 无。                                                         |
| `fields.data.description` | 字段描述         | 否       | 无。                                                         |
| `fields.data.type`        | 字段类型         | 是       | 可选，包括number、string、boolean、object和array。           |
| `fields.data.children`    | 子节点           | 否       | 当`fields.data.type`为object或array时需要设置children 字段。 |
| `fields.data.default`     | 默认值           | 否       | 当`fields.data.type`为number、string或boolean时，需要填写默认值。 |
| `fields.data.optional`    | 是否可选         | 否       | 可选，为boolean类型。`true`表示对应字段为可选字段，`false`表示对应字段为必选字段。 |





# Q

开发版本



valuePath配置规则

[https://help.aliyun.com/document_detail/157253.html]

![image-20220327103053763](https://tva1.sinaimg.cn/large/e6c9d24ely1h0o8gnhl14j20mk0gimxk.jpg)





嵌套组件
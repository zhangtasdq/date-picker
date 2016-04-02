date-picker
===
一个非常简单的日期选择插件

效果图
---
![date-picker](./images/date_picker.png)

示例
---
1. 查看项目目录下的 `demo` 文件夹
2. [jsfiddle示例](https://jsfiddle.net/t8t0teyw/2/)

使用
---

###引入css

```html
<!-- 注意: 请替换为自己的文件路径 -->
<link rel="stylesheet" href="../css/date-picker.css" type="text/css" charset="utf-8" />

```

###引入javascript

```html
<!-- 注意: 请替换为自己的文件路径 -->
<script src="../bower_components/jquery/dist/jquery.js" type="text/javascript" charset="utf-8"></script>
<script src="../src/date_picker.js" type="text/javascript" charset="utf-8"></script>

```
###调用
```javascript
$("#date_picker").datepicker();
```

配置
---

####dateFormat

类型: `String`

默认值: "yyyy/MM/dd"

输入框中时间的格式

例子
```javascript
$("#date_picker").datepicker({
    dateFormat: "yyyy-MM-dd"
});
```

####monthFormat

类型: `String`

默认值: "yyyy/MM"

时间控件头部显示日期的格式

例子
```javascript
$("#date_picker").datepicker({
    monthFormat: "yyyy-MM"
});
```

####previousMonthIcon

类型: `String`

默认值: "图片的 Base64"

时间控件头部左边箭头图片的地址

例子
```javascript
$("#date_picker").datepicker({
    previousMonthIcon: "./images/left_icon.png"
});
```

####nextMonthIcon

类型: `String`

默认值: "图片的 Base64"

时间控件头部右边箭头图片的地址

例子
```javascript
$("#date_picker").datepicker({
    nextMonthIcon: "./images/right_icon.png"
});
```

####position

类型: `Object`

默认值: 无

时间控件绝对定位时的位置,是相对于 `body`进行定位,设置此参数后将忽略 `defaultRelativePosition` 的值

例子
```javascript
$("#date_picker").datepicker({
    position: {
        left: "100px",
        top: "200px"
    }
});
```

####defaultRelativePosition

类型: `Object`

默认值: `{left: 0, top: 10}`

时间控件相对于目标元素绝对定位时的偏移量

例子
```javascript
$("#date_picker").datepicker({
    defaultRelativePosition: {
        left: 10,
        top: 20
    }
});
```

####selectDate

类型: `Function`

默认值: `$.noop`

######参数
1. `currentDate` 选择后的日期
2. `previousDate` 之前的日期

点击一个日期后的回调函数

例子
```javascript
$("#date_picker").datepicker({
    selectDate: function() {
        console.log("selectDate");
    }
});
```

####selectOldDate

类型: `Function`

默认值: `function() { return true; }`

参数: 同 `selectDate`

当设置有初始日期时,点击早于初始日期的日期时的回调函数
会在 selectDate 之前调用,如果返回值为 `false` 将不会用选择的日期更新控件, 为 `true` 时将会更新控件

例子
```javascript
$("#date_picker").datepicker({
    selectOldDate: function() {
        console.log("selectOldDate");
        return true;
    }
});
```

####changeMonth

类型: `Function`

默认值: `$.noop`

######参数
1. `currentDate` 改变后的日期
2. `event` 事件对象
3. `operate` 点击的操作,值为 `previous-month` 或 `next-month`

点击箭头切换月份后的回调函数

例子
```javascript
$("#date_picker").datepicker({
    changeMonth: function() {
        console.log("changeMonth");
    }
});
```

####beforeShow

类型: `Function`

默认值: `$.noop`

参数: `无`

显示日期控件前的回调函数

例子
```javascript
$("#date_picker").datepicker({
    beforeShow: function() {
        console.log("beforeShow");
    }
});
```

####afterShow

类型: `Function`

默认值: `$.noop`

参数: `无`

显示日期控件后的回调函数

例子
```javascript
$("#date_picker").datepicker({
    afterShow: function() {
        console.log("afterShow");
    }
});
```

####beforeHide

类型: `Function`

默认值: `$.noop`

参数: `无`

隐藏日期控件前的回调函数

例子
```javascript
$("#date_picker").datepicker({
    beforeHide: function() {
        console.log("beforeHide");
    }
});
```

####afterHide

类型: `Function`

默认值: `$.noop`

参数: `无`

隐藏日期控件后的回调函数

例子
```javascript
$("#date_picker").datepicker({
    afterHide: function() {
        console.log("afterHide");
    }
});
```

编译和测试
---

###搭建环境

######安装 `grunt` 和 `bower`

######克隆项目
```
git clone https://github.com/zhangtasdq/date-picker.git/
```

######下载依赖包
```
// 在项目目录下运行
bower install
npm install
```

###编译
```
grunt
```

###运行测试
```
grunt test
```

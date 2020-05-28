export default {
  title: '', // <- 大屏的名称
  titleStyle: {}, // <- 大屏名称的样式
  gutter: 16, // <- 大屏每个组件之间的间距
  layout: [{
    name: 'Left', // <- 要渲染的组件名称
    flex: 3, // <- 左/中/右 布局占比
    rows: [{
      name: 'Row1', // <- 要渲染的组件名称
      height: 1, // <- 每行高度占比
      cols: [{
        name: 'Row1Col1', // <- 要渲染的组件名称
        flex: 1, // <- 每列宽度占比
        type: 'bar', // <- 列中元素的类型（图表、自定义、其他）
        chartConfig: {},
      }]
    }, {
      name: 'Row2', // <- 要渲染的组件名称
      height: 1,
      cols: [{
        name: 'Row2Col1', // <- 要渲染的组件名称
        flex: 1,
        type: 'bar',
        chartConfig: {},
      }]
    }, {
      name: 'Row3', // <- 要渲染的组件名称
      height: 1,
      cols: [{
        name: 'Row3Col1', // <- 要渲染的组件名称
        flex: 1,
        type: 'custom', // 自定义时，用一个div占位
        chartConfig: {},
      }]
    }]
  }],
}

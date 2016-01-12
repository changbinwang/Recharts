HTMLWidgets.widget({

  name: 'Pie',

  type: 'output',

  initialize: function(el, width, height) {
    document.getElementById(el.id).width = width;
    document.getElementById(el.id).height = height;
    var myChart = echarts.init(document.getElementById(el.id));
    return {
      chart: myChart
    }

  },

  renderValue: function(el, x, instance) {
    var text = x.title;
    var subtext = x.subtitle;
    var name = x.name;
    var cate = x.cate;
    var value = x.value;
    var data_pie = [];
    for (var i = cate.length - 1; i >= 0; i--) {
      var object = {
    		"name":cate[i],
    		"value":value[i]
      }
      data_pie.push(object);
    }
    var option = {
        title:{
          text:text,
          subtext:subtext,
          x:'center'
        },

        toolbox: {
          show : false,
          //x:'right',
          //y:'bottom',
          feature : {
              mark : {show: true},
              dataView : {show: false},
              magicType: {
                  show : false,
                  title : {
                      line : '折线图切换',
                      bar : '柱形图切换',
                      stack : '堆积',
                      tiled : '平铺'
                  },
                  option: {
                      // line: {...},
                      // bar: {...},
                      // stack: {...},
                      // tiled: {...},
                      // force: {...},
                      // chord: {...},
                      // pie: {...},
                      // funnel: {...}
                  },
                  type : ['line', 'bar', 'stack', 'tiled']
              },
              restore : {show: true},
              saveAsImage : {show: true}
              },
            },
        calculable : true,
        tooltip: {

          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },

        legend: {
            data:cate,
            orient: 'vertical',
            x: 'left', // 'center' | 'left' | {number},
        	  //y: 'bottom', // 'center' | 'bottom' | {number}
        },
        series : [
        {
            name:name,
            type:'pie',
            radius : '55%',
            center: ['50%', '60%'],
            data:data_pie,
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
    };

    // 为echarts对象加载数据
    instance.chart.setOption(option);

},

  resize: function(el, width, height, instance) {
    document.getElementById(el.id).width = width;
    document.getElementById(el.id).height = height;
    instance.chart.resize();
  }

});

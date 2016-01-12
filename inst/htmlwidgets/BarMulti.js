HTMLWidgets.widget({

  name: 'BarMulti',

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
    var avg = x.avg;
    var extremum = x.extremum;
    var hori = x.horizontal;
    var smooth = x.smooth;
    var subtext = x.subtitle;
    var type = x.type;
    var category = x.category;
    var data1 = x.data1;
    var data2 = x.data2;
    var legend1 = Object.keys(data1);
    var legend2 = Object.keys(data2);
    var yaxis = x.yaxis
    var series = [];
    for (var i = legend1.length - 1; i >= 0; i--) {
    	var object = {
    		"name":legend1[i],
    		"type":type,
    		"data":data1[legend1[i]],
        "smooth":smooth
      }

      if(extremum){
        object["markPoint"]= {
          "data" : [
                    {"type" : 'max', "name": '最大'},
                    {"type" : 'min', "name": '最小'}
                ]
            }
      }

      if(avg){
        object["markLine"]= {
            "data" : [
                {"type" : 'average', "name": '均值'}
            ]
        }
      }

    	series.push(object);
    };

    for (var i = legend2.length - 1; i >= 0; i--) {
      var object = {
        "name":legend2[i],
        "type":type,
        "yAxisIndex": 1,
        "data":data2[legend2[i]],
        "smooth":smooth
      }

      if(extremum){
        object["markPoint"]= {
          "data" : [
                    {"type" : 'max', "name": 'MAX'},
                    {"type" : 'min', "name": 'MIN'}
                ]
            }
      }

      if(avg){
        object["markLine"]= {
            "data" : [
                {"type" : 'average', "name": 'MEAN'}
            ]
        }
      }

      series.push(object);
    };
    var interval = x.interval;

    var option = {
        title:{
          text:text,
          subtext:subtext
        },

        toolbox: {
          show : true,
          //x:'right',
          //y:'bottom',
          feature : {
              mark : {show: true},
              dataView : {show: false},
              magicType: {
                  show : true,
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
              saveAsImage : {show: true},
              dataZoom : {
                show : true,
                title : {
                  dataZoom : '区域缩放',
                  dataZoomReset : '区域缩放后退'
                }
              },
            }
        },

        dataZoom : {
          show : true,
          realtime : true,
          //orient: 'vertical',   // 'horizontal'
          //x: 0,
          //y: 36,
          //width: 400,
          height: 20,
          //backgroundColor: 'rgba(221,160,221,0.5)',
          //dataBackgroundColor: 'rgba(138,43,226,0.5)',
          //fillerColor: 'rgba(38,143,26,0.6)',
          //handleColor: 'rgba(128,43,16,0.8)',
          //xAxisIndex:[],
          //yAxisIndex:[],
          start : 0,
          end : 100
        },

        calculable : true,

        tooltip: {

            show: true
        },

        legend: {
            data:legend1.concat(legend2),
            //orient: 'vertical',
            //x: 'right', // 'center' | 'left' | {number},
        	  //y: 'center', // 'center' | 'bottom' | {number}
        },
        series : series
    };

    if(!hori){
       option["xAxis"]=[
            {
                type : 'category',
                data : category,
                axisLabel : {interval:interval}

            }
        ];
        option["yAxis"] = [
          {
            type : 'value',
            name : yaxis[0],

          },
          {
            type : 'value',
            name : yaxis[1],

          }
        ];
    }else{
      option["xAxis"] = [
        {
          type : 'value',
          name : yaxis[0],

        },
        {
          type : 'value',
          name : yaxis[1],

        }
        ];
      option["yAxis"] = [
            {
                type : 'category',
                data : category,
                axisLabel : {interval:interval}
            }
        ];


    }

    // 为echarts对象加载数据
    instance.chart.setOption(option);

},

  resize: function(el, width, height, instance) {
    document.getElementById(el.id).width = width;
    document.getElementById(el.id).height = height;
    instance.chart.resize();
  }

});

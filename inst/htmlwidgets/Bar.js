HTMLWidgets.widget({

  name: 'Bar',

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
    var data = x.data;
    var legend = Object.keys(data);
    var series = [];
    for (var i = legend.length - 1; i >= 0; i--) {
    	var object = {
    		"name":legend[i],
    		"type":type,
    		"data":data[legend[i]],
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
    var interval = x.interval;
    
    var option = {
        title:{
          text:text,
          subtext:subtext
        },
        
        toolbox: {
          show : true,
          x:'right',
          y:'bottom',
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
          y: 36,
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
            data:legend,
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
                type : 'value'
            }
        ];
    }else{
      option["xAxis"] = [
            {
                type : 'value'
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

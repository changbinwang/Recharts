HTMLWidgets.widget({

  name: 'Recharts',

  type: 'output',

  initialize: function(el, width, height) {
    var myChart = echarts.init(document.getElementById(el.id)); 
    return {
      chart: myChart
    }

  },

  renderValue: function(el, x, instance) { 
    var type = x.type;
    var category = x.category;
    var data = x.data;
    var legend = Object.keys(data);
    var series = [];
    for (var i = legend.length - 1; i >= 0; i--) {
    	var object = {"name":legend[i],"type":type,"data":data[legend[i]]};
    	series.push(object);
    };
    var interval = x.interval;
    
    var option = {
        toolbox: {
          show : true,
          feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
              restore : {show: true},
              saveAsImage : {show: true}
            }
        },
        
        calculable : true,
        
        tooltip: {
            show: true
        },
        
        legend: {
            data:legend
        },
        
        xAxis : [
            {
                type : 'category',
                data : category,
                axisLabel : {interval:interval}
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : series
    };

    // 为echarts对象加载数据 
    instance.chart.setOption(option); 

},

  resize: function(el, width, height, instance) {

  }

});

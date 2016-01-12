HTMLWidgets.widget({

  name: 'Funnel',

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

    var title = x.title;
    var subtitle = x.subtitle;
    var legend = x.legend;
    var value = x.value;
    var sort = x.sort;
    var name = x.name;
    var position = x.position;
    var width = x.width;
    
    series = []
    for (var i=name.length-1;i>=0;i--){
        var data = [];
        for (var j = legend.length - 1; j >= 0; j--) {
          var temp = value[name[i]]
          data.push({"value":temp[j],"name":legend[j]})
        }
        series.push({"name":name[i],'type':'funnel','width':width,'x':position[i],'data':data})      
    }

    var option = {
      title : {
          text: title,
          subtext: subtitle
      },
      tooltip : {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c}%"
      },
      toolbox: {
          show : true,
          feature : {
              mark : {show: true},
              dataView : {show: true, readOnly: false},
              restore : {show: true},
              saveAsImage : {show: true}
          }
      },
      legend: {
            show:false,
            data:legend,
            orient: 'vertical',
            x: 'right', // 'center' | 'left' | {number},
            y: 'center', // 'center' | 'bottom' | {number}
      },
      calculable : true,
      series : series
    };
    instance.chart.setOption(option);
  },

  resize: function(el, width, height, instance) {
    document.getElementById(el.id).width = width;
    document.getElementById(el.id).height = height;
    instance.chart.resize();
  }

});

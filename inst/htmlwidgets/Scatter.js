HTMLWidgets.widget({

    name: 'Scatter',

    type: 'output',

    initialize: function (el, width, height) {

        document.getElementById(el.id).width = width;
        document.getElementById(el.id).height = height;
        var myChart = echarts.init(document.getElementById(el.id));
        return {
            chart: myChart
        }

    },

    renderValue: function (el, x, instance) {
        var text = x.title;
        var subtext = x.subtitle;
        var xlable = x.xlable;
        var ylable = x.ylable;
        var name = x.name;
        var data = x.data;


        var option = {
            title: {
                text: text,
                subtext: subtext
            },

            tooltip: {
                trigger: 'axis',
                showDelay: 0,
                formatter: function (params) {
                    return params.seriesName + ' :<br/>'
                        + params.value[0] + '  '
                        + params.value[1];


                },
                axisPointer: {
                    show: true,
                    type: 'cross',
                    lineStyle: {
                        type: 'dashed',
                        width: 1
                    }
                }
            },

            toolbox: {
                show: true,
                x: 'right',
                y: 'bottom',
                feature: {
                    mark: {show: true},
                    dataView: {show: false},
                    restore: {show: true},
                    saveAsImage: {show: true},
                    dataZoom: {
                        show: true,
                        title: {
                            dataZoom: '区域缩放',
                            dataZoomReset: '区域缩放后退'
                        }
                    },
                }
            },

            dataZoom: {
                show: true,
                realtime: true,
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
                start: 0,
                end: 100
            },

            calculable: true,
            xAxis: [
                {
                    type: 'value',
                    scale: true,
                    axisLabel: {
                        formatter: '{value} ' + xlable
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    scale: true,
                    axisLabel: {
                        formatter: '{value} ' + ylable
                    }
                }
            ],
            series: [
                {
                    name: name,
                    type: 'scatter',
                    data: data,
                    markPoint: {
                        data: [
                            {type: 'max', name: '最大值'},
                            {type: 'min', name: '最小值'}
                        ]
                    },
                    markLine: {
                        data: [
                            {type: 'average', name: '平均值'}
                        ]
                    }

                }
            ]
        };

        // 为echarts对象加载数据
        instance.chart.setOption(option);

    },


    resize: function (el, width, height, instance) {
        document.getElementById(el.id).width = width;
        document.getElementById(el.id).height = height;
        instance.chart.resize();
    }

});

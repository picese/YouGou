$(function () {
    myBarChart();
    myPieChart();
});

// 柱形图表
var myBarChart = function () {
    var data = [
        {
            name: '二月',
            value: 500
        },
        {
            name: '三月',
            value: 600
        },
        {
            name: '四月',
            value: 400
        },
        {
            name: '五月',
            value: 700
        },
        {
            name: '六月',
            value: 900
        },
        {
            name: '七月',
            value: 1200
        },
        {
            name: '八月',
            value: 2600
        }
    ];

    var xData = [], yData = [];
    data.forEach(function(item,i){
        xData.push(item.name);
        yData.push(item.value);
    });

    // 初始化柱形图
    var BarChart = echarts.init(document.getElementById('barChart'));
    option = {
        title: {
            text: '2019年注册人数'
        },
        tooltip: {},
        legend:{
            left: '50%',
            height: '348px',
            data:['注册人数']
        },
        xAxis: [{
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
            axisTick: {
                alignWithLabel: true
            }
        }],
        yAxis: [{
            type: 'value'
        }],
        series: [{
            name: '注册人数',
            type: 'bar',
            barWidth: '60%',
            data: [10, 52, 200, 334, 390, 330, 220]
        }]
    };
    option.xAxis[0].data = xData;
    option.series[0].data = yData; 
    BarChart.setOption(option);
    //window.onresize = BarChart.resize;
};

// 饼形图表
var myPieChart = function(){
    var picChart = echarts.init(document.getElementById('pieChart'));
    option = {
        title : {
            text: '本月热销品牌',
            subtext: '2019年8月',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'horizontal',
            top:'20%',
            left: 'left',
            data: ['阿迪达斯','耐克','新百伦','匡威','李宁']
        },
        series : [
            {
                name: '热销品牌',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:335, name:'阿迪达斯'},
                    {value:310, name:'耐克'},
                    {value:234, name:'新百伦'},
                    {value:135, name:'匡威'},
                    {value:1548, name:'李宁'}
                ],
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
    //window.onresize = picChart.resize;
    picChart.setOption(option);
}

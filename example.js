var flights = [];
var AllFlightsLines = [];
var BJFlights = [];
var BJ2Citys = []
var JNFlights = [];
var JN2Citys = [];
var QDFlights = [];
var QD2Citys = [];
var YTFlights = [];
var YT2Citys = [];
var CQFlights = [];
var CQ2Citys = [];
var XMFlights = [];
var XM2Citys = [];
var airportsName = [];

//大小超出wilddog要求，可以将抓取的数据量变少
var config = {
  syncURL: "https://sda-foc.wilddogio.com/foc/" //输入节点 URL
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref();
ref.once("value").then(function(snapshot){
  flights = snapshot.val();

  flights.forEach(function(flight) {
        for(airport1 in airports){
            if(airport1 == flight.place_dep){
                for(airport2 in airports){
                    if(airport2 == flight.place_arrive){
                        AllFlightsLines.push([{name:flight.place_dep},{name:flight.place_arrive}]); 
                    }
                }
            }
        }
  }, this);

function flightsIn(allFlights,localFlights,place,citys){
    AllFlightsLines.forEach(function(flight) {
        if(flight[0].name == place){
            localFlights.push(flight);
            citys.push({name:flight[1].name});
        }
    }, this);
}

flightsIn(AllFlightsLines,BJFlights,"北京",BJ2Citys);
flightsIn(AllFlightsLines,JNFlights,"济南",JN2Citys);
flightsIn(AllFlightsLines,QDFlights,"青岛",QD2Citys);
flightsIn(AllFlightsLines,YTFlights,"烟台",YT2Citys);
flightsIn(AllFlightsLines,CQFlights,"重庆",CQ2Citys);
flightsIn(AllFlightsLines,XMFlights,"厦门",XM2Citys);



  (function () {
    
        require.config({
            paths: {
                echarts: './js',
            },
            packages: [
                {
                    name: 'BMap',
                    location: './src',
                    main: 'main'
                }
            ]
        });
    
        require(
        [
            'echarts',
            'BMap',
            'echarts/chart/map',
        ],
        function (echarts, BMapExtension) {
            $('#main').css({
                height:$('body').height(),
                width: $('body').width()
            });
    
            // 初始化地图
            var BMapExt = new BMapExtension($('#main')[0], BMap, echarts,{
                enableMapClick: false
            });
            var map = BMapExt.getMap();
            var container = BMapExt.getEchartsContainer();
    
            var startPoint = {
                x: 104.114129,
                y: 37.550339
            };
    
            var point = new BMap.Point(startPoint.x, startPoint.y);
            map.centerAndZoom(point, 5);
            map.enableScrollWheelZoom(true);
            // 地图自定义样式
            map.setMapStyle(styleConfig);
    
            option = {
                color: ['gold','aqua','lime'],
                title : {
                    text: '山东航空航班',
                    subtext:'数据每日更新',
                    x:'center',
                    textStyle : {
                        color: '#fff'
                    }
                },
                tooltip : {
                    trigger: 'item',
                    formatter: function (v) {
                        return v[1].replace(':', ' > ');
                    }
                },
                legend: {
                    orient: 'vertical',
                    x:'left',
                    data:['北京', '济南', '青岛','厦门','烟台','重庆',],
                    selectedMode: 'single',
                    selected:{
                        '济南' : false,
                        '青岛' : false,
                        '厦门' : false,
                        '烟台' : false,
                        '重庆' : false
                    },
                    textStyle : {
                        color: '#fff'
                    }
                },
                toolbox: {
                    show : true,
                    orient : 'vertical',
                    x: 'right',
                    y: 'center',
                    feature : {
                        mark : {show: true},
                        dataView : {show: true, readOnly: false},
                        restore : {show: true},
                        saveAsImage : {show: true}
                    }
                },
                dataRange: {
                    min : 0,
                    max : 170,
                    range: {
                        start: 0,
                        end: 100
                    },
                    x: 'right',
                    calculable : true,
                    color: ['#ff3333', 'orange', 'yellow','lime','aqua'],
                    textStyle:{
                        color:'#fff'
                    }
                },
                series : [
                    {
                        name:'北京',
                        type:'map',
                        mapType: 'none',
                        data:[],
                        geoCoord: airports,
    
                        markLine : {
                            smooth:true,
                            effect : {
                                show: true,
                                scaleSize: 1,
                                period: 30,
                                color: '#fff',
                                shadowBlur: 10
                            },
                            itemStyle : {
                                normal: {
                                    borderWidth:1,
                                    lineStyle: {
                                        type: 'solid',
                                        shadowBlur: 10
                                    }
                                }
                            },
                            data : BJFlights
                        },
                        markPoint : {
                            symbol:'emptyCircle',
                            symbolSize : function (v){
                                return 10 + v/10
                            },
                            effect : {
                                show: true,
                                shadowBlur : 0
                            },
                            itemStyle:{
                                normal:{
                                    label:{show:true}
                                }
                            },
                            data : BJ2Citys
                        }
    
                    },
                    {
                        name:'济南',
                        type:'map',
                        mapType: 'none',
                        data:[],
                        markLine : {
                            smooth:true,
                            effect : {
                                show: true,
                                scaleSize: 1,
                                period: 30,
                                color: '#fff',
                                shadowBlur: 10
                            },
                            itemStyle : {
                                normal: {
                                    borderWidth:1,
                                    lineStyle: {
                                        type: 'solid',
                                        shadowBlur: 10
                                    }
                                }
                            },
                            data : JNFlights
                        },
                        markPoint : {
                            symbol:'emptyCircle',
                            symbolSize : function (v){
                                return 10 + v/10
                            },
                            effect : {
                                show: true,
                                shadowBlur : 0
                            },
                            itemStyle:{
                                normal:{
                                    label:{show:false}
                                }
                            },
                            data : JN2Citys
                        }
                    },
                    {
                        name:'青岛',
                        type:'map',
                        mapType: 'none',
                        data:[],
                        markLine : {
                            smooth:true,
                            effect : {
                                show: true,
                                scaleSize: 1,
                                period: 30,
                                color: '#fff',
                                shadowBlur: 10
                            },
                            itemStyle : {
                                normal: {
                                    borderWidth:1,
                                    lineStyle: {
                                        type: 'solid',
                                        shadowBlur: 10
                                    }
                                }
                            },
                            data : QDFlights
                        },
                        markPoint : {
                            symbol:'emptyCircle',
                            symbolSize : function (v){
                                return 10 + v/10
                            },
                            effect : {
                                show: true,
                                shadowBlur : 0
                            },
                            itemStyle:{
                                normal:{
                                    label:{show:false}
                                }
                            },
                            data : QD2Citys
                        }
                    },
                    {
                        name:'烟台',
                        type:'map',
                        mapType: 'none',
                        data:[],
                        markLine : {
                            smooth:true,
                            effect : {
                                show: true,
                                scaleSize: 1,
                                period: 30,
                                color: '#fff',
                                shadowBlur: 10
                            },
                            itemStyle : {
                                normal: {
                                    borderWidth:1,
                                    lineStyle: {
                                        type: 'solid',
                                        shadowBlur: 10
                                    }
                                }
                            },
                            data : YTFlights
                        },
                        markPoint : {
                            symbol:'emptyCircle',
                            symbolSize : function (v){
                                return 10 + v/10
                            },
                            effect : {
                                show: true,
                                shadowBlur : 0
                            },
                            itemStyle:{
                                normal:{
                                    label:{show:false}
                                }
                            },
                            data : YT2Citys
                        }
                    },
                    {
                        name:'厦门',
                        type:'map',
                        mapType: 'none',
                        data:[],
                        markLine : {
                            smooth:true,
                            effect : {
                                show: true,
                                scaleSize: 1,
                                period: 30,
                                color: '#fff',
                                shadowBlur: 10
                            },
                            itemStyle : {
                                normal: {
                                    borderWidth:1,
                                    lineStyle: {
                                        type: 'solid',
                                        shadowBlur: 10
                                    }
                                }
                            },
                            data : XMFlights
                        },
                        markPoint : {
                            symbol:'emptyCircle',
                            symbolSize : function (v){
                                return 10 + v/10
                            },
                            effect : {
                                show: true,
                                shadowBlur : 0
                            },
                            itemStyle:{
                                normal:{
                                    label:{show:false}
                                }
                            },
                            data : XM2Citys
                        }
                    },
                    {
                        name:'重庆',
                        type:'map',
                        mapType: 'none',
                        data:[],
                        markLine : {
                            smooth:true,
                            effect : {
                                show: true,
                                scaleSize: 1,
                                period: 30,
                                color: '#fff',
                                shadowBlur: 10
                            },
                            itemStyle : {
                                normal: {
                                    borderWidth:1,
                                    lineStyle: {
                                        type: 'solid',
                                        shadowBlur: 10
                                    }
                                }
                            },
                            data : CQFlights
                        },
                        markPoint : {
                            symbol:'emptyCircle',
                            symbolSize : function (v){
                                return 10 + v/10
                            },
                            effect : {
                                show: true,
                                shadowBlur : 0
                            },
                            itemStyle:{
                                normal:{
                                    label:{show:false}
                                }
                            },
                            data : CQ2Citys
                        }
                    },
                    {
                        name:'全国',
                        type:'map',
                        mapType: 'none',
                        data:[],
                        markLine : {
                            smooth:true,
                            symbol: ['none', 'circle'],
                            symbolSize : 1,
                            itemStyle : {
                                normal: {
                                    color:'#fff',
                                    borderWidth:1,
                                    borderColor:'rgba(30,144,255,0.5)'
                                }
                            },
                            data : AllFlightsLines
                        }
                    }
                ]
            };
    
            var myChart = BMapExt.initECharts(container);
            window.onresize = myChart.onresize;
            BMapExt.setOption(option);
        }
    );
    })();


}).catch(function(err){
  console.error(err);
})


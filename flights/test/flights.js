var flights = [];
var AllFlightsLines = [
  [{name:"北京"},{name:"厦门"}]
];

//大小超出wilddog要求，可以将抓取的数据量变少
var config = {
  syncURL: "https://sda-foc.wilddogio.com/board/" //输入节点 URL
};
wilddog.initializeApp(config);
var ref = wilddog.sync().ref();
ref.once("value").then(function(snapshot){
  flights = snapshot.val();

  flights.forEach(function(flight) {
      console.log(flight.flight_NO);
      AllFlightsLines.push([{name:flight.place_dep},{name:flight.place_arrive}]);
  }, this);

}).catch(function(err){
  console.error(err);
})
// var flights = [
//     {
//       "arrived": "",
//       "caption": "张纪伟",
//       "close_door": "06:45",
//       "flight_NO": "SC1155",
//       "getYuTime": "",
//       "isAlternative": "-",
//       "isCancel": "-",
//       "isDelay": "-",
//       "lundang": "09:00",
//       "num_person": "9",
//       "open_door": "09:02",
//       "place_arrive": "北京",
//       "place_dep": "重庆",
//       "plane": "B-1443",
//       "plane_type": "B738",
//       "seat": "328:",
//       "taxing": "06:52",
//       "time_COBT": "07:00",
//       "time_arrive_actual": "08:56",
//       "time_arrive_plan": "09:35",
//       "time_arrive_yu": "09:08",
//       "time_dep_actual": "07:00",
//       "time_dep_plan": "07:00",
//       "time_dep_yu": "---",
//       "time_wechat": "",
//       "type": "正班",
//       "un_lundang": "06:50",
//       "wechated": ""
//     }
//   ];




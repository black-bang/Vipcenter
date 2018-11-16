import { Modal, Button, WhiteSpace, WingBlank, Toast } from "antd-mobile";

const alert = Modal.alert;
// function getPosition() {

  //判断浏览器是否支持HTML5 定位
//   if (window.navigator.geolocation) {
//     const maximumAge =600000 
//     navigator.geolocation.getCurrentPosition(
//       successfulCallback,
//       failCallback,
//       {
//         maximumAge
//       }
//     );

//   } else {
//     alert("你的浏览器不能使用HTML5定位")

//   }

// }
// function successfulCallback(position) {
//   let longitude = position.coords.longitude;
//   let latitude = position.coords.latitude;
//   alert('获取位置信息成功', '经度' + position.coords.longitude + '维度' + position.coords.latitude);
 

// }

// function failCallback(error) {
// alert(error.code)
//   var text;

//   switch (error.code) {
//     case error.PERMISSION_DENIED:
//       text = "用户拒绝对获取地理位置的请求。";
//       break;
//     case error.POSITION_UNAVAILABLE:
//       text = "位置信息是不可用的。";
//       alert("位置信息是不可用的。");
//       break;
//     case error.TIMEOUT:
//       text = "请求用户地理位置超时。";
//       break;
//     case error.UNKNOWN_ERROR:
//       text = "未知错误。";
//       break;
//   }
// }
// getPosition();

function getPosition(){
  if (window.navigator.geolocation) {
   if(sessionStorage.getItem('lat')){
     return false
   }else{
     navigator.geolocation.getCurrentPosition(successCallback,
       errorCallback,
       { maximumAge: 60000, timeout: 1000 });
   }
  }else{
    alert('您的浏览器不支持定位功能')
  }
  function successCallback(position) {
    let longitude = position.coords.longitude;
    let latitude = position.coords.latitude;
    sessionStorage.setItem('lat', longitude)
    sessionStorage.setItem("ing", latitude);
   // alert('获取位置信息成功', '经度' + position.coords.longitude + '维度' + position.coords.latitude);

  }
  // function successCallback(position) {
  //   let lat = position.coords.latitude;
  //   let lng = position.coords.longitude;
  //   alert(this);
  //   const pointBak = new BMap.Point(lng, lat);

  //   const convertor = new BMap.Convertor();
  //   convertor.translate([pointBak], 1, 5, function (resPoint) {
  //     if (resPoint && resPoint.points && resPoint.points.length > 0) {
  //       lng = resPoint.points[0].lng;
  //       lat = resPoint.points[0].lat;
  //     }
  //     const point = new BMap.Point(lng, lat);
  //     const geo = new BMap.Geocoder();
  //     geo.getLocation(point, (res) => {
  //         alert(res)
  //     });
  //   });
  // };

  function errorCallback(error) {
    let text;
    //alert(error.TIMEOUT);
    switch (error.code) {
      case error.TIMEOUT:
        doFallback();
        navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
        throw "获取地址超时, 请刷新重试"
        break;
      case error.PERMISSION_DENIED:
        text = "用户拒绝对获取地理位置的请求。";
        throw"用户拒对获取地理位置的请求";
        break;
      case error.POSITION_UNAVAILABLE:
        text = "位置信息是不可用的。";
        throw '位置信息是不可用的';
        break;
      case error.UNKNOWN_ERROR:
        text = "未知错误。";
        throw "未知错误";
        break;
    };
  }
  function doFallback() {
  }
  }
getPosition() 
export default getPosition;

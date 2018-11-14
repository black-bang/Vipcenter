
import { Toast, WhiteSpace, WingBlank, Button } from "antd-mobile";
const getPosition = (
  timeout = 10000,
  maximumAge = 20000,
  enableHighAcuracy = false
) =>
  new Promise((resolve, reject) => {
    if (!navigator && !navigator.geolocation) {
      return reject(new Error("geolocation api not supported"));
    }

    const success = loc => {
      const location = {
        latitude: loc.coords.latitude, // 纬度
        longitude: loc.coords.longitude, // 经度
        accuracy: loc.coords.accuracy // 精确度
      };
      resolve(location);

        alert('维度'+loc.coords.latitude+'经度'+loc.coords.longitude)
      sessionStorage.setItem('latitude', loc.coords.latitude)
      sessionStorage.setItem('longitude', loc.coords.longitude);
    };

    const error = () => reject("出错了");

    navigator.geolocation.getCurrentPosition(success, error, {
        maximumAge,
        enableHighAcuracy, // 指示浏览器获取高精度的位置，默认为false
        timeout, // 指定获取地理位置的超时时间，默认不限时，单位为毫秒
     // 最长有效期，在重复获取地理位置时，此参数指定多久再次获取位置。
    });
  });

// 使用示例
getPosition()
  .then(pos => pos)
  .catch(err => console.log(err));

// const getPosition =(
//   window.onload = function () {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         function (position) {
//           latitude = position.coords.latitude;//获取纬度
//           longitude = position.coords.longitude;//获取经度
//           alert("维度" + position.coords.latitude + "经度" + position.coords.longitude);
//         });
     
//     } else {
//       alert("不支持定位功能");
//     }
//   }
// )


export default getPosition;

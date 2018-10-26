import icons from "./#Icon/CommonIcon.css"

const Grid1Data=[{
	text:"个人资料",
	icon:icons["MyMessage"],
	to:"VIPCenter/a"	
},{
	text:"我的卡券",
	icon:icons["MyCard"],
	href:"http://192.168.65.116:8084/#/CardList"
},{
	text:"在线客服",
	icon:icons["CustomerService"],
	href:"http://onlinecustomers.jzker.cn/#/?openId=oToWlwUkj8BdA4bOQCBPG4ksf7B0"
}]
export {Grid1Data}

const Grid2Data=[{
	text:"积分商城",
	icon:icons["Store"],
	to:"/PointsConvert"
},{
	text:"兑换记录",
	icon:icons["ConvertRecord"],
	href:"http://192.168.65.116:8084/#/Convert?accountId=200"
},{
	text:"积分查询",
	icon:icons["PointQuery"],
	href:"http://192.168.65.116:8084/#/Points?accountId=200&openId=oToWlwWxn7Q_DHvluR5ZIlPhIqkU"
}]
export {Grid2Data}

const Grid3Data=[{
	text:"我的订单",
	icon:icons["OrderForm"],
	to:"VIPCenter/a"
},{
	text:"我的权益",
	icon:icons["MyPower"],
	href:"http://192.168.65.116:8084/#/MyRights?openId=oToWlwWxn7Q_DHvluR5ZIlPhIqkU"
},{
	text:"适用门店",
	icon:icons["UseShop"],
	href:"http://192.168.65.116:8084/#/ApplicationStore?openId=oToWlwWxn7Q_DHvluR5ZIlPhIqkU"
}]

export {Grid3Data}
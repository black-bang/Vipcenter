
class storage {
	setVipInfo(userInfo){
		window.localStorage.setItem("VipInfo",JSON.stringify(userInfo))
	}
	get VipInfo(){
		return JSON.parse(window.localStorage.getItem("VipInfo"))||{}
	}

	setApplicationStoreInfo(userInfo) {
		window.localStorage.setItem("ApplicationStoreInfo", JSON.stringify(userInfo));
	}
	get ApplicationStoreInfo() {
		return JSON.parse(window.localStorage.getItem("ApplicationStoreInfo")) || {};
	}

	setSeleteAdressInfo(userInfo) {
		window.localStorage.setItem("SeleteAdressInfo", JSON.stringify(userInfo));
	}
	get SeleteAdressInfo() {
		return JSON.parse(window.localStorage.getItem("SeleteAdressInfo")) || {};
	}
	
}

export default new storage()
import { observable, action, flow, computed } from "mobx"
import { ajax } from "api"
import UpLoadFile from "../../../../page/UpLoad/UpLoadFile/UpLoadFile.jsx";
import { Toast } from 'antd-mobile'


export default class AddSubmissionState {
    constructor(query) {
        this.query = query
        this.UpLoadFileMC = new UpLoadFile.MC();
        this.UpLoadFileMC.AppendDefaultImage();
       // ["https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=550633143,1906543664&fm=11&gp=0.jpg"];
    }

    // submit = flow(function* () {
    //     try {
    //         if (this.UpLoadFileMC.hasFile) {
    //             const result = yield this.UpLoadFileMC.upLoad();
    //             console.log(result.toString());
    //         } else {
    //             Toast.info("请选择上传图片",.8);
    //         }
    //     } catch (error) {
    //         throw error;
    //     }
    // });


    @observable FormMap=new Map([
        ["goodName",""],
        ["costMoney", ""],
        ["goodType", ""],
        ["buyTime", ""],
        ["translateName", ""],
        ["remark", ""],   
    ])
    @computed get Form(){
        return this.FormMap.toJSON()
    }
    @action ChangeFormInfo(keyname, keyvalue) {
        this.FormMap.set(keyname, keyvalue);
    }
    getAddSubmissionList = flow(function* () {
        try {
            if (this.UpLoadFileMC.hasFile) {
                const photo = yield this.UpLoadFileMC.upLoad();
                //console.log(photo.toString());
                this.FormMap.set("evidence_Image",photo.toString());
                const result = yield ajax.post({
                    url: "/api/User_Account/FrontendUser_EvidenceAddAsync",
                    data: Object.assign({ 
                        openId: this.query['OpenId'],
                        user_AccountId: this.query['AccountId'],
                        wx_SeetingId: '1'
                    },this.Form)
                })
                console.log(Object)
            } else {
                Toast.info("请选择上传图片", .8);
            } 
        } catch (error) {
            throw error
        }
    })


    @observable  courentType=[]
    getcourentTypeList= flow(function *(){
        try{
            const result = yield ajax.get({
                url: "/api/Wx_Good_Catalog_Score/SelectWx_Good_Catalog_ScoreLIstAsync",
                data: { wx_SeetingId: localStorage.getItem('SeetingId')}
            })
            this.courentType= result.data
           // console.log(result);
        } catch (error) {
            throw error 
        }
    })
// getcount=flow(function *(){
//     let newOBJ = Object.assign({}, this.Form)
//     newOBJ["price"] = this.Form["costMoney"];
//     newOBJ["code"] = this.Form["goodType"];
//     console.log(newOBJ)
//  try{
//      const result = yield ajax.post({
//          url: '/api/Wx_Good_Catalog_Score/SelectWx_Good_Catalog_ScoreAsync',
//          data: Object.assign({ wx_SeetingId: '1' }, newOBJ)
//      })
//      console.log(result)
//     // localStorage.setItem('order', result)
//  }catch(error){
//      throw error
//  }
// })


}
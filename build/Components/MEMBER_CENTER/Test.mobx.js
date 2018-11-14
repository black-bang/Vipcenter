import { observable ,flow } from "mobx"
import UpLoadFile from "../page/UpLoad/UpLoadFile/UpLoadFile.jsx";

export default class TestState {
    constructor(){
        this.UpLoadFileMC=new UpLoadFile.MC()
        this.UpLoadFileMC.AppendDefaultImage([
          "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=550633143,1906543664&fm=11&gp=0.jpg"
        ]);
    }

    submit=flow(function*(){
        try{
           if(this.UpLoadFileMC.hasFile){
              const result=yield this.UpLoadFileMC.upLoad() 
              console.log(result);
           }else{
                throw "没有文件"
           }
        }catch(error){
            throw error
        }
    })
}
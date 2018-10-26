import { observable,flow,action,computed, observe } from 'mobx';
import { ajax } from 'api';
import { storage } from "api"

export default class CardState {
    // 默认现显示的卡券列表
    constructor(query){
        this.query = query
    }
    @observable defaultCardList =[];
    getdefaultCardListState = flow(function*(){
        try{
            const result = yield ajax.get({
                url: "",
                data: {}
            })
            this.defaultCardList = result;
        }catch(error){
            throw error
        }
    })
    //已经使用的卡券列表
    @observable alreadyCardList = [];
    getalreadyCardListState = flow(function* () {
        try {
            const result = yield ajax.get({
                url: "",
                data: {}
            })
            this.alreadyCardList = result;
        } catch (error) {
            throw error
        }
    })
    //已经过期的卡券列表
    @observable nullCardList = [];
    getnullCardListState = flow(function* () {
        try {
            const result = yield ajax.get({
                url: "",
                data: {}
            })
            this.nullCardList = result;
        } catch (error) {
            throw error
        }
    })
}
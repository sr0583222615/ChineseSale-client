import { GiftList } from "../list-gift/giftList.module"
import { User } from "./User.model"

export class orders{
    ordersId:number
    orderDate:Date
    giftId:number
    gift:GiftList
    UsersId:string
    user:User
    status:string
    // quantity?:number;

}








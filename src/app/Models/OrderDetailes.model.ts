import { orders } from "./Orders.model"
import { User } from "./User.model"

export class OrderDetailes{
    id:number
    dateTime:Date
    orders:orders[]
    user:User
    usersId:string
    ordersId:number

}

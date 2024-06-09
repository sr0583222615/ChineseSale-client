export class GiftList{
    giftId:number
    giftName:string
    giftTicketCost:number
    giftUrlImage?:string
    giftCatagory:string
    giftDiscription:string
    status:string="before"
    donorToGift:string[]=["1"]
    quantity?:number=1
}


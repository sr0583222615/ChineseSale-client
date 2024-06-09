import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { GiftList } from "../../list-gift/giftList.module";
import { GiftService } from "src/app/service/gift.service";


export function uniqueValidator(giftService: GiftService): ValidatorFn {
    return async (control: AbstractControl): Promise<ValidationErrors | null> => {
        try {
            const gifts = await giftService.getGift().toPromise();

            if (gifts && control.value) {
                for (let i = 0; i < gifts.length; i++) {
                    if (gifts[i].giftName === control.value) {
                        return { uniqueParam: { value: control.value } };
                    }
                }
            }

            return null;
        } catch (err) {
            console.error('An error occurred', err);
            return null; // or return an error object based on your needs
        }
    };
}
    // import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
    // import { GiftList } from "../../list-gift/giftList.module";
    // import { GiftService } from "src/app/service/gift.service";
    
    
    // export function uniqueValidator(giftService: GiftService): ValidatorFn {
    //     return (control: AbstractControl): ValidationErrors | null => {
            
    //         giftService.getGift().subscribe((gifts:any) => {
    //             if (gifts && control.value) {
    //                 for (let i = 0; i < gifts.length; i++) {
    //                     if (gifts[i].giftName == control.value)
    //                         return { uniquepParam: { value: control.value } };
    //                 }
    //             }
    //         },
    //              (err: any) => {
    //           console.error('occure error', err)
    //         })
    //         return null;
    //     };}
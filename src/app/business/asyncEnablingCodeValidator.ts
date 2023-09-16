import { AbstractControl } from "@angular/forms";
import { EnablingCodeService } from "../modules/user/services/codes/enabling-code.service";

export class AsyncEnablingCodeValidator{
    constructor(
        private service:EnablingCodeService
        ){

    }
    getValidator()
    {
        return async (control:AbstractControl)=>{
            let present=false
          await  this.service.items.subscribe(codes=>{
                present= codes.map(c=>c.code).includes(control.value)
                
            })
            return present?{"codeUsed":true}:null
        }
    }
}
import { BehaviorSubject, Observable } from "rxjs"
import { EnablingCode } from "src/app/modules/user/models/enablingCode"
import { EnablingCodeService } from "src/app/modules/user/services/codes/enabling-code.service"

export class EnablingCodeServiceMocker extends EnablingCodeService{
    items_list: Array<EnablingCode> = []
    _items: BehaviorSubject<Array<EnablingCode>> = new BehaviorSubject([])
    readonly items: Observable<Array<EnablingCode>> = this._items.asObservable()
    constructor(){
        super()
        this.items_list.push(new EnablingCode({
            code:"qwerty",
            customerKey:"asdfgh",
            creationDate:"2022-08-23",
            utilizationDate:"2022-08-24"
        }))
        this.items_list.push(new EnablingCode({
            code:"qwerty1",
            customerKey:"asdfgh",
            creationDate:"2022-08-23",
            utilizationDate:"2022-08-24"
        }))
        this.items_list.push(new EnablingCode({
            code:"qwerty2",
            customerKey:"asdfgh",
            creationDate:"2022-08-23",
            utilizationDate:"2022-08-24"
        }))
        this._items.next(this.items_list)
    }
}
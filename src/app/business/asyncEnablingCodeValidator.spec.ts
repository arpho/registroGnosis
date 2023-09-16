import { AbstractControl } from "@angular/forms"
import { AsyncEnablingCodeValidator } from "./asyncEnablingCodeValidator"
import { EnablingCodeServiceMocker } from "./mockers/EnablingCodeServiceMocker"

describe("testing asyncEnablingCodeValidator",()=>{
    it("should instantiate",()=>{
        const test = new AsyncEnablingCodeValidator(new EnablingCodeServiceMocker())
        expect(test).toBeDefined()
    })
    it("should getValidator",()=>{
        const test = new AsyncEnablingCodeValidator(new EnablingCodeServiceMocker())
        expect(test.getValidator()).toBeDefined()
        expect(test.getValidator()).toBeInstanceOf(Function)
    })
    it("validator works correctly",()=>{
        const validator = new AsyncEnablingCodeValidator(new EnablingCodeServiceMocker()).getValidator()
        let control= {value:"test"}
        validator(control as AbstractControl).then(result=>{
            expect(result).toBeNull()

            control.value="qwerty"
            validator(control as AbstractControl).then(result=>{
                expect(result.codeUsed).toBeTrue()
            })
        })
    })
})
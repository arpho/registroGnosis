import { Utilities4Date } from "src/app/modules/helpers/dateHelper"
import { CheckExpiration } from "./checkExpiration"

describe("should check expirationTime", () => {

  it("should  admit", () => {
    const test = new CheckExpiration()
    const expirationDate = Utilities4Date.addDays2Date(new Date, 3)
    const claims = { expirationTime: expirationDate.getTime() }
    expect(test.canAdd(claims)).toBeTrue()
  })
  it("should not admit", () => {
    const test = new CheckExpiration()
    const expirationDate = Utilities4Date.addDays2Date(new Date, -3,)
    const claims = {}
    expect(test.canAdd(claims,true)).toBeFalse()
    expect(test.canAdd({ expirationTime: expirationDate.getTime() },false)).toBeTrue()
    expect(test.canAdd({ expirationTime: expirationDate.getTime() },true)).toBeFalse()
  })
})
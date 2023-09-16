import { ExpectedConditions } from "protractor"
import { DateModel } from "../modules/user/models/birthDateModel"
import { Customer } from "./Customer"

describe("empty customer",()=>{
  it("should be intantiated correctly",()=>{
    const customer = new Customer()
    expect(customer).toBeDefined()
    expect(customer.role.value).toBe(3)
    expect(customer.level).toBe(3)
    expect(customer.role.value).toBe(3)
    expect(customer.serialize().level).toBe(3)
    expect(customer.address).toBeDefined()
    expect(customer.enablingCode).toBeUndefined()
    expect(customer.enablingCodeUsed).toBeFalse()
  })
  it("should serialize correctly",()=>{
    const customer = new Customer()
    expect(customer.serialize()).toBeDefined()
    expect(customer.serialize().firstName).toBe("")
    expect(customer.serialize().lastName).toBe("")
    expect(customer.serialize()['key']).toBeUndefined()
    expect(customer.serialize()['address']).toBeDefined()
    expect(customer.serialize().telephones.length).toBe(0)
    expect(customer.serialize().enablingCodeUsed).toBeFalse()
    expect(customer.serialize().enablingCode).toBe("")
  })

})

describe("customer with data",()=>{
  const data = {
    firstName:"joe",
    lastName:"friend",
    expirationDate:"12/25/2022",
    level:'1',
    enablingCode:"test",
    enablingCodeUsed:true,
    key:"key",
    email:"a@iol.it"
  }
  const customer = new Customer(data)
  it("should be intantiated correctly",()=>{
    
    expect(customer).toBeDefined()
    expect(customer.role.value).toBe(1)
    expect(customer.firstName).toBe(data.firstName)
    expect(customer.key).toBe(data.key)
    expect(customer.lastName).toBe(data.lastName)
    expect(customer.email).toBe(data.email)
    expect(customer.enablingCode).toBe(data.enablingCode)
    expect(customer.enablingCodeUsed).toBeTrue()
    expect(customer.level).toBe(1)
    expect(customer.role.value).toBe(1)
    expect(customer.serialize().level).toBe(1)
    expect(customer.address).toBeDefined()
  })
  it("should serialize correctly",()=>{
    expect(customer.serialize().level).toBe(1)
    expect(customer.serialize().firstName).toBe(data.firstName)
    expect(customer.key).toBe(data.key)
    expect(customer.serialize().lastName).toBe(data.lastName)
    expect(customer.serialize().email).toBe(data.email)
    expect(customer.serialize().level).toBe(1)
    expect(customer.address).toBeDefined()
    expect(customer.serialize().enablingCode).toBe(data.enablingCode)
    expect(customer.serialize().enablingCodeUsed).toBeTrue()
    expect(customer.serialize()["expirationDate"]).toBe("2022-12-25")
  })

 
})
describe("enabling customer",()=>{
  
  it("user not enabled yet",()=>{
    const data = {
      firstName:"joe",
      lastName:"friend",
      expirationDate:"12/25/2022",
      level:'1',
      enablingCodeUsed:false,
      key:"key",
      email:"a@iol.it",
      dor:"12/25/2021"
    }
    const customer = new Customer(data)
    expect(customer).toBeDefined()
    expect(customer.role.value).toBe(1)
    expect(customer.firstName).toBe(data.firstName)
    expect(customer.key).toBe(data.key)
    expect(customer.lastName).toBe(data.lastName)
    expect(customer.email).toBe(data.email)
    expect(customer.enablingCode).toBe(undefined)
    expect(customer.enablingCodeUsed).toBeFalse()
    expect(customer.dor.formatDate()).toBe(new DateModel(new Date(data.dor)).formatDate())
  })
  it("enablinguser",()=>{
    const data = {
      firstName:"joe",
      lastName:"friend",
      expirationDate:"12/25/2022",
      level:'1',
      enablingCodeUsed:false,
      key:"key",
      email:"a@iol.it"
    }
    const customer = new Customer(data)
customer.enablingCode="test"
customer.enablingCodeUsed=true
expect(customer.enablingCode).toBe("test")
expect(customer.enablingCodeUsed).toBeTrue()
expect(customer.dor.formatDate()).toBe(new DateModel(new Date()).formatDate())
  })

})
import { Component, OnInit } from '@angular/core';
import { Utilities4Date } from '../../../../modules/helpers/dateHelper';
import { Customer } from 'src/app/models/Customer';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { NewCustomerPage } from '../../create/new-customer/new-customer.page';
import { UpdateCustomerPage } from '../../edit/update-customer/update-customer.page';
import { UsersService } from 'src/app/modules/user/services/users.service';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.page.html',
  styleUrls: ['./customers.page.scss'],
})
export class CustomersPage implements OnInit {
  editModalPage = UpdateCustomerPage
  createModalPage = NewCustomerPage

  filterFunction(customer:Customer){
    return true
  }

  filterFields = [
    new TextboxQuestion({
      key:"nome",
      label:"filtra per nome",
      filterFunction:(value:string,customer:Customer)=>customer.
      firstName.trim().toUpperCase().includes(value.trim().toUpperCase())
    }),
    new TextboxQuestion({
      key:"surname",
      label:"filtra per cognome",
      filterFunction:(value:string,customer:Customer)=>customer.
      lastName.trim().toUpperCase().includes(value.trim().toUpperCase())
    }),
    new TextboxQuestion({
      key:"email",
      label:"filtra per email",
      filterFunction:(value:string,customer:Customer)=> customer.
      email.trim().toLowerCase().includes(value.trim().toLowerCase())
    })
  ]

  constructor(public service:UsersService) { 
  }
  ngAfterViewInit(): void {
    this.service.items.subscribe(items=> {
    })
  }

  ngOnInit() {
    const callback= function(data){
    }
    this.service.items.subscribe(callback)
  }
  
  expiringCustomers(){
    const today= new Date()
    const expirationDate = Utilities4Date.addDays2Date(today,31)
    this.filterFunction = (customer:Customer)=>customer.expirationTime<expirationDate.getTime()

  }

  setFilter(ev: (item: ItemModelInterface) => boolean) {
    this.filterFunction = ev
  }

}

import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { configs } from 'src/app/configs/configs';
import { Customer } from 'src/app/models/Customer';
import { DateQuestion } from 'src/app/modules/dynamic-form/models/question-date';
import { DropdownQuestion } from 'src/app/modules/dynamic-form/models/question-dropdown';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';
import { MyToastService } from 'src/app/modules/helpers/services/toaster/my-toast-service.service';
import { SwitchQuestion } from 'src/app/modules/item/models/question-switch';
import { UserModel } from 'src/app/modules/user/models/userModel';
import { UsersService } from 'src/app/modules/user/services/users.service';

@Component({
  selector: 'app-update-customer',
  templateUrl: './update-customer.page.html',
  styleUrls: ['./update-customer.page.scss'],
})


export class UpdateCustomerPage implements OnInit {
  formFields: any[]
  customer = new UserModel

  filter(ev) {
  }

  async submit(ev) {
    console.log(" submitting")
    this.customer.load(ev)
    console.log("submitting form", ev, this.customer)

    this.service.updateItem(this.customer)
    /*  const result = await this.service.addCustomClaim({
       email: this.customer.email,
       claims: {
         expirationTime: this.customer._expirationTime,
         enabled: this.customer.enabled,
         level: this.customer.level,
         userType: this.customer.userType
       }
     }) */
    console.log("done")
    this.toaster.presentToast("user updated")
    this.dismiss(this.customer)

  }


  dismiss(customer?: UserModel) {
    this.modalCtrl.dismiss(customer)
  }

  constructor(public navParams: NavParams,
    public modalCtrl: ModalController,
    public service: UsersService,
    public toaster: MyToastService) {
  }

  ngOnInit() {
    this.customer.load(this.navParams.get("item"))
    console.log("customer", this.customer)

    console.log("customer", this.customer)
    this.formFields = [
      new TextboxQuestion({
        key: "firstName",
        label: "nome",
        required: true,
        value: this.customer.firstName
      }),
      new TextboxQuestion({
        key: "lastName",
        label: "cognome",
        value: this.customer.lastName,
        required: true
      }),
      new TextboxQuestion({
        key: "displayName",
        label: " display name",
        value: this.customer.displayName
      }),
      new DropdownQuestion({
        key: "level",
        label: "privilegi utente",
        options: configs.accessLevel, value: this.customer.level
      }),
      new SwitchQuestion({
        key: "enabled",
        label: "abilitato",
        value: this.customer.enabled,
        iconTrue: "checkmark-circle",
        iconFalse: "close-circle",
        labelFalse: "utente non abilitato",
        labelTrue: "utente abilitato"
      }),
      new DateQuestion({
        key: "expirationDate",
        label: "scadenza Abbonamento",
        presentation: "date",
        value: this.customer.expirationDate
      })
    ]
  }

}

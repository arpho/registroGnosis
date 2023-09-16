import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { PasswordQuestion } from 'src/app/modules/dynamic-form/models/password-question';
import { CheckBoxQuestion } from 'src/app/modules/dynamic-form/models/question-checkBox';
import { EmailQuestion } from 'src/app/modules/dynamic-form/models/question-email';
import { TextboxQuestion } from 'src/app/modules/dynamic-form/models/question-textbox';

@Component({
  selector: 'app-complete-registration',
  templateUrl: './complete-registration.page.html',
  styleUrls: ['./complete-registration.page.scss'],
})
export class CompleteRegistrationPage implements OnInit {
usersFields:any
submitText="completa registrazione"
  constructor() { }
  ngOnInit(): void {

    this.usersFields = [
      new TextboxQuestion({
        key:"enablingCode",
        label:"codice di abilitazione",
        required:true,
        order:0
      }),
      new TextboxQuestion({
      key: 'firstName',
      label: 'nome',
      required: true,
      order: 1
  
    }), new TextboxQuestion({
      key: 'lastName',
      label: 'cognome',
      required: true,
      order: 2
  
    }), new EmailQuestion({
      key: 'email',
      label: 'email',
      required: true,
      order: 3
  
    }),
  
    new PasswordQuestion({
      key: 'password',
      label: 'password', required: true,
      retypePassword: true,
    }),
  new CheckBoxQuestion({
    key:"GDPR",
    label:"Autorizzazione alla gestione dei dati personali",
  text:"Autorizzo il trattamento dei miei dati personali "+
  " ai sensi dell’art. 13 del Decreto Legislativo 30 giugno 2003,"+
  " n. 196 “Codice in materia di protezione dei dati personali” e dell’art. 13 del GDPR (Regolamento UE 2016/679).x",
  required:true,
  value:false,
  validator:Validators.requiredTrue
  })
  ]
  }
  filter(ev){
    console.log("typing",ev)
  }
  submit(ev){
    console.log("submit",ev)
    //TODO retrieve code
    //TODO retrieve user by email
    //TODO check conditions
    //TODO update code
    //TODO register auth user
    //TODO update userProfile
  }


  

 

}

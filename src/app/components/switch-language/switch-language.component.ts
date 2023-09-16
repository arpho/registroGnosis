import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-switch-language',
  templateUrl: './switch-language.component.html',
  styleUrls: ['./switch-language.component.scss'],
})
export class SwitchLanguageComponent implements OnInit {
  language: string;

  async changeLanguage() {
    const actionSheet = await this.sheetController.create({
      header: 'Languages',
      buttons: [{
        text: 'English',
        icon: 'language-outline',
        handler: () => {
          this.language = 'en';
          this.service.use('en');
        }
      }, {
        text: 'Spanish',
        icon: 'language-outline',
        handler: () => {
          this.language = 'es';
          this.service.use("es")
        }
      }, {
        text: 'Italian',
        icon: 'language-outline',
        handler: () => {
          this.language = 'it';
          this.service.use("it")
        }
      }, {
        text: 'Português',
        icon: 'language-outline',
        handler: () => {
          this.language = 'pt';
          this.service.use("pt")
        }
      }, {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role, data } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role and data', role, data);
  }

  constructor(
    private sheetController: ActionSheetController,
    private service: TranslateService
  ) { }

  ngOnInit() { }

}

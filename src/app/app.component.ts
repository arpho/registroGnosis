import { Component, OnInit } from '@angular/core';
import { db } from "./../../functions/src/configs/firebase"
import { initializeApp } from "firebase/app"
import { getAuth, getIdToken, onAuthStateChanged } from "firebase/auth";
import { credentials } from './configs/credentials';
import { Router } from '@angular/router';
import { Piu2meno90 } from './business/piu2meno90';
import { Figura } from './business/figura';
import { Vertibile } from './business/vertibile';
import { MenuController } from '@ionic/angular';
import { CheckEnabled } from './modules/helpers/menu/models/business/checkers/checkEnabled';
import { CheckExpiration } from './modules/helpers/menu/models/business/checkers/checkExpiration';
import { CheckRole } from './modules/helpers/menu/models/business/checkers/checkRole';
import { menuComposer } from './modules/helpers/menu/models/business/menuComposer';
import { MenuItem2BeAdded } from './modules/helpers/menu/models/menuItem2BeAdded';
import { configs } from './configs/configs';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  transformationIndex = -1


  onOwnClick = (index: number, url?: string) => {
    const out = () => {
      if (index != -1) {
        this.transformationIndex = index
      }
      else {
        this.router.navigate([url])
      }

    }
    return out
  }

  menuItems: MenuItem2BeAdded[] = [
    {
      menuItem: {
        title: 'Algoritmo Genial',
        src: "/assets/icon/icons/genial.svg",
        url: '/magic',
        icon: 'mail',
        onClick: this.onOwnClick(-1, "/magic"),
        function: () => { }
      },
      orLogic: false,
      canAdd: [
        new CheckEnabled(),
        new CheckExpiration()
      ]
    },
    {
      menuItem: {
        title: "utenti",
        url: "/customers",
        icon: "people",
        onClick: this.onOwnClick(-1, "/customers")
      },
      canAdd: [
        new CheckEnabled(),
        new CheckExpiration(),
        new CheckRole(2)
      ],
      orLogic: false
    },
    {
      menuItem: {
        title: "Intervalli",
        url: "intervals",
        icon: "stats-chart",
        onClick: this.onOwnClick(-1, "/intervals")
      },
      canAdd: [
        new CheckEnabled(),
        new CheckExpiration()
      ],
      orLogic: false
    }
  ]

  isSelected(index) {
    return (index == this.transformationIndex) ? "selected" : "unselected"
  }
  public appPages: any[] = []
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];
  constructor(public router: Router,
    private languageService: TranslateService,
    public menu: MenuController,

  ) {

    languageService.use('it')
  }
  ngOnInit(): void {
    const isKarma = document.getElementsByTagName("title")[0].innerHTML === 'Karma';
    if (!isKarma) {
      const app = initializeApp(credentials.firebase)
      const auth = getAuth()

      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const token = await user.getIdTokenResult(true).then(result => {
            const menu = menuComposer.composeMenuByClaims(this.menuItems, result.claims, configs.locked)
            this.appPages = menu
            console.log("claims", result.claims)
          })


        } else {
          this.router.navigate(["/users/login"])
        }
      }

      )
    }
  }
}

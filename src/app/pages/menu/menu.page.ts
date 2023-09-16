import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { configs } from 'src/app/configs/configs';
import { credentials } from 'src/app/configs/credentials';
import { CheckEnabled } from 'src/app/modules/helpers/menu/models/business/checkers/checkEnabled';
import { CheckExpiration } from 'src/app/modules/helpers/menu/models/business/checkers/checkExpiration';
import { CheckRole } from 'src/app/modules/helpers/menu/models/business/checkers/checkRole';
import { menuComposer } from 'src/app/modules/helpers/menu/models/business/menuComposer';
import { MenuItem2BeAdded } from 'src/app/modules/helpers/menu/models/menuItem2BeAdded';
import { MessageBrokerService } from 'src/app/modules/helpers/services/messages/message-broker.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
  public appPages: any[] = []
  transformationIndex = -1
  onOwnClick = (index: number, url?: string) => {
    const out = () => {
      if (index == -1) {
        this.router.navigate([url])
      }
      if (index == -3) {
        window.location.href = url
      }

    }
    return out
  }


  menuItems: MenuItem2BeAdded[] = [
    {
      menuItem: {
        title: "UTENTI",
        url: "/customers",
        icon: "people",
        onClick: this.onOwnClick(-1, "/customers")
      },
      canAdd: [
        /*         new CheckEnabled(),
                new CheckExpiration(),
                new CheckRole(2) */
      ],
      orLogic: false
    },
  ]

  constructor(
    private router: Router,
    private messages: MessageBrokerService) { }


  ngOnInit() {
    const isKarma = document.getElementsByTagName("title")[0].innerHTML === 'Karma';
    if (!isKarma) {

      const app = initializeApp(credentials.firebase)
      const auth = getAuth()
      console.log("config", configs)

      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const token = await user.getIdTokenResult(true).then(async result => {
            const menu = menuComposer.composeMenuByClaims(this.menuItems, result.claims, configs.locked)
            console.log("user logged in", user)
            console.log("user logged in")
            console.log("token", await user.getIdTokenResult())
            this.appPages = menu
            console.log("claims", result.claims)

            if (!new CheckEnabled().canAdd(result.claims, configs.locked)) {
              this.router.navigate(["users/not-authorized", `contatta l'amministratore di ${configs.appName} per abilitare la tua utenza`]);
            }

            if (!new CheckExpiration().canAdd({ expirationTime: Number(result.claims["expirationTime"]) }, configs.locked)) {
              console.log('account scaduto')
              this.router.navigate(["users/not-authorized", "contatta l'amministratore di Genial Lotto per rinnovare il tuo abbonamento"]);

            }
          })


        } else {
          this.router.navigate(["/users/login"])
        }
      }

      )
    }
  }

}

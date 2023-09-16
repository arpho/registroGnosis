import { EnablingCodeService } from "../modules/user/services/codes/enabling-code.service";

export class enablingCodeMaker{
    constructor(private service:EnablingCodeService){}
     makeCode(length:number) {
        var result           = '';
        var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var charactersLength = characters.length;
        for ( var i = 0; i < length; i++ ) {
          result += characters.charAt(Math.floor(Math.random() * 
     charactersLength));
       }
       return result;
    }

    async makeUniqueCode(length:number){
        let code = this.makeCode(length)
        this.service.items.subscribe(codes=>{
            while(codes.map(c=>c.code).includes(code)){
                console.log("recalculating code")
                code =this.makeCode(length)
            }
        })
        return code
    }
}
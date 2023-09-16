import { DateModel } from "../modules/user/models/birthDateModel"

export class WorkingTime {
  key: string
  startingTime: DateModel
  finishingTime: DateModel
  get totalTimeInMSec(): number {
    return this.finishingTime.getTime() - this.startingTime.getTime()
  }/**
     * 
     * @param data:optional{key:string, finishingTime:string|number,startingTime:string|number} finishingTime and startingTime are number, the ms of the date of start and fend job
     */
  constructor(data?: { key: string, startingTime: string | number, finishingTIme: string | number }) {
    if (data) {
      this.key = data.key ? data.key : String(new Date().getTime())
      this.startingTime = new DateModel(new Date(Number(data.startingTime)))
      this.finishingTime = new DateModel(new DateModel(Number(data.finishingTIme)))
    }
    else {
      this.key = String(new Date().getTime())
    }


  }
}
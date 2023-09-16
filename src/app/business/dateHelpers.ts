import { SortableDate } from "../models/sortableDate"

export class DateHelpers {
  static sorterDescendingDate = (b: SortableDate, a: SortableDate) => a.dateInmmsec - b.dateInmmsec
  static sorterAscendingDate = (a: SortableDate, b: SortableDate) => a.dateInmmsec - b.dateInmmsec
}
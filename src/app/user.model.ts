export class User {
  constructor(public id: number,
    public bedroomMult: number,
    public diningMult: number,
    public seatingMult: number,
    public youthMult: number,
    public occasionalMult: number,
    public homeMult: number,
    public showSku: boolean,
    public showPrices: boolean,
    public round: boolean,
    public sortBy: string
  ) {

  }
}

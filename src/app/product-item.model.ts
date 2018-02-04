export class ProductItem {
  constructor(public description: string, public dimensions: string, public id: number, public number: string, public price: number, public numberSelected: number, public canSellQty: number) {}

  public canSell(): string {
    if (this.canSellQty === 0) {
      return "Out of stock"
    }
    else if (this.canSellQty  < 20 ) {
      return "Low stock"
    }
    else {
      return "In stock"
    }
  }

  public canSellClass(): string {
    if (this.canSellQty === 0) {
      return "text-danger"
    }
    else if (this.canSellQty  < 20 ) {
      return "text-warning"
    }
    else {
      return "text-success"
    }
  }
}

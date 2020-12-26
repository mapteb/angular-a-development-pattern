export class Product {
    id: number;
    name: string = "";
    price: number = 0.00;

    constructor(private _id?: number, private _name?: string, private _price?: number) {
        this.id = _id;
        this.name = _name;
        this.price = _price;
    }
}
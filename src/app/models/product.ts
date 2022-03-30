export class Product {

  constructor(
    public id?: number,
    public title?: string, 
    public cost?: number, //cents
    public idCategory?: number,
    public category?: string,
    public imagePath?: string) { }
}

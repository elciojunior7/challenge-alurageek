export class Product {

  constructor(
    public id?: number,
    public title?: string, 
    public cost?: number, //cents
    public category?: string,
    public imagePath?: string,
    /*public image?: File*/) { }
}

export enum Category {
  STARWARS = 'Star Wars',
  CONSOLES = "Consoles",
  STUFFS = "Stuffs",
}
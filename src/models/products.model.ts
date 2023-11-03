export type  ProductsModel = {
    id: number;
    title: string;
    price: number;
    description: string;
    image: string;
    rating: RatingModel;
}
export type RatingModel = {
    rate: number
    count: number
}


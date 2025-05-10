export interface IReview {
  rating: number;
  comment?: string;
  reviewerName?: string;
  reviewerEmail?: string;
}
export interface IProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discount: number;
  rating: number;
  stock: number;
  image: string;
  reviews: IReview[];
  quantity: number;
}

export interface ILoginInput {
  type: string;
  name: "password" | "email";
  placeholder?: string;
}
export interface ISignupInput {
  type: string;
  name: "name" | "password" | "email";
  placeholder?: string;
}
export interface IAddressInput {
  type: string;
  name: "country" | "city" | "street" | "postalCode";
  placeholder?: string;
}
export interface ILogin {
  email: string;
  password: string;
}
export interface ISignup {
  name: string;
  email: string;
  password: string;
}
export interface ICartProduct {
  id: number;
  product: IProduct;
  quantity: number;
}
export interface IWishlist {
  id: number;
  product: IProduct;
}

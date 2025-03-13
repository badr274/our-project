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
  discountPercentage: number;
  rating: number;
  stock: number;
  thumbnail: string;
  reviews: IReview[];
  quantity: number;
}

export interface IInput {
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
export interface ICreditCardInput {
  type: string;
  name: "creditNumber" | "holderName" | "expiry" | "cvc";
  placeholder?: string;
  maxLength?: number;
  pattern?: string;
}

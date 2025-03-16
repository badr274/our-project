import {
  IAddressInput,
  ICreditCardInput,
  ILoginInput,
  ISignupInput,
} from "@/interfaces";

export const LOGIN_FORM_INPUTS: ILoginInput[] = [
  {
    type: "email",
    name: "email",
    placeholder: "Enter your email",
  },
  {
    type: "password",
    name: "password",
    placeholder: "Enter your password",
  },
];
export const SIGNUP_FORM_INPUTS: ISignupInput[] = [
  {
    type: "text",
    name: "name",
    placeholder: "Enter your name",
  },
  {
    type: "email",
    name: "email",
    placeholder: "Enter your email",
  },
  {
    type: "password",
    name: "password",
    placeholder: "Enter your password",
  },
];
export const ADDRESS_INPUTS: IAddressInput[] = [
  {
    type: "text",
    name: "country",
    placeholder: "Enter your country",
  },
  {
    type: "text",
    name: "city",
    placeholder: "Enter your city",
  },
  {
    type: "text",
    name: "street",
    placeholder: "Enter your street",
  },
  {
    type: "text",
    name: "postalCode",
    placeholder: "Enter your postal code",
  },
];
export const CREDIT_CART_INPUTS: ICreditCardInput[] = [
  {
    type: "number",
    name: "creditNumber",
    placeholder: "Enter credit card number",
    maxLength: 16,
  },
  {
    type: "text",
    name: "holderName",
    placeholder: "Enter credit card holder name",
  },
  {
    type: "number",
    name: "expiry",
    placeholder: "Enter credit card expiry",
    maxLength: 4,
  },
  {
    type: "number",
    name: "cvc",
    placeholder: "Enter credit card cvc",
    maxLength: 3,
  },
];

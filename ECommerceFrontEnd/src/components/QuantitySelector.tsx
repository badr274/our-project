import { ChangeEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { useAddProductToCartMutation } from "@/app/services/CartSlice";
import { setCartItems } from "@/app/features/ShoppingCartSlice";

interface IProps {
  initialQuantity: number;
  id: number;
}
const QuantitySelector = ({ initialQuantity = 1, id }: IProps) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.shoppingCart.cartItems);
  const [quantity, setQuantity] = useState(initialQuantity);
  const [changeQuantityMutation] = useAddProductToCartMutation();
  const changeQuantity = ({
    id,
    quantity,
  }: {
    id: number;
    quantity: number;
  }) => {
    changeQuantityMutation({ product_id: id, quantity }).then((res) => {
      dispatch(setCartItems(res.data?.cart));
      console.log(cartItems);
    });
  };
  const increase = () => {
    setQuantity((prev) => prev + 1);
    changeQuantity({ id: id, quantity });
  };
  const decrease = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
      changeQuantity({ id: id, quantity });
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setQuantity(+value);
    changeQuantity({ id: id, quantity: +value });
  };
  return (
    <div className="flex items-center space-x-2">
      <Button variant="outline" size="icon" onClick={decrease}>
        −
      </Button>
      <Input
        type="number"
        value={quantity}
        className="w-12 text-center"
        min="1"
        onChange={handleChange}
      />
      <Button variant="outline" size="icon" onClick={increase}>
        +
      </Button>
    </div>
  );
};
export default QuantitySelector;

import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/app/hooks";
import { useUpdateProductInCartMutation } from "@/app/services/CartSlice";
import { setCartItems } from "@/app/features/ShoppingCartSlice";

interface IProps {
  initialQuantity: number;
  id: number;
}
const QuantitySelector = ({ initialQuantity = 1, id }: IProps) => {
  const dispatch = useAppDispatch();
  // const cartItems = useAppSelector((state) => state.shoppingCart.cartItems);
  const [quantity, setQuantity] = useState(initialQuantity);
  const [changeQuantityMutation] = useUpdateProductInCartMutation();

  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);

  const changeQuantity = async ({
    id,
    quantity,
  }: {
    id: number;
    quantity: number;
  }) => {
    await changeQuantityMutation({ product_id: id, quantity }).then((res) => {
      dispatch(setCartItems(res.data?.cart));
    });
  };
  const increase = async () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    await changeQuantity({ id, quantity: newQuantity });
  };
  const decrease = async () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      await changeQuantity({ id, quantity: newQuantity });
    }
  };

  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (+value < 1 || isNaN(+value)) return;
    setQuantity(+value);
    await changeQuantity({ id: id, quantity: +value });
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

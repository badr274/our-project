import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppDispatch } from "@/app/hooks";
import {
  changeQuantity,
  decreaseQuantity,
  increaseQuantity,
} from "@/app/features/ShoppingCartSlice";

interface IProps {
  initialQuantity: number;
  id: number;
}
const QuantitySelector = ({ initialQuantity = 1, id }: IProps) => {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState(initialQuantity);

  const increase = () => dispatch(increaseQuantity(id));
  const decrease = () => dispatch(decreaseQuantity(id));
  useEffect(() => {
    setQuantity(initialQuantity);
  }, [initialQuantity]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(changeQuantity({ id: id, value: +value }));
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

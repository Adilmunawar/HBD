"use client";

import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { FoodItem } from '@/components/ui/food-item';
import { NumberTicker } from '@/components/ui/number-ticker';
import { Popcorn, GlassWater, CupSoda, Cookie } from 'lucide-react';

const FriesIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="32"
      height="32"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-8 w-8"
    >
      <path d="M17.5 11H19v10H5V11h1.5" />
      <path d="M14.5 11.5L16 5" />
      <path d="M12 11.5L12.5 5" />
      <path d="M9.5 11.5L8 5" />
      <path d="M6.5 11.5L5 5" />
    </svg>
  );

const foodItemsList = [
    { id: 'lays', name: 'Lays', price: 70, icon: <Popcorn className="h-8 w-8" />, flavors: ['Salted', 'French Cheese', 'Yogurt and Herb'] },
    { id: 'juice', name: 'Juice', price: 50, icon: <GlassWater className="h-8 w-8" />, flavors: ['Slice', 'Nestle', 'Fruitien'] },
    { id: 'shake', name: 'Shake', price: 100, icon: <CupSoda className="h-8 w-8" />, flavors: ['Mango', 'Banana', 'Oreo'] },
    { id: 'chocolate', name: 'Chocolate', price: 50, icon: <Cookie className="h-8 w-8" /> },
    { id: 'fries', name: 'Fries', price: 100, icon: <FriesIcon /> },
  ];

type CartItem = {
  id: string;
  quantity: number;
  flavor?: string;
};

type Cart = {
  [key: string]: CartItem;
};

type FoodOrderDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProceed: () => void;
};

export function FoodOrderDialog({ open, onOpenChange, onProceed }: FoodOrderDialogProps) {
  const [cart, setCart] = useState<Cart>({});
  const [isShaking, setIsShaking] = useState(false);

  const subtotal = useMemo(() => {
    return Object.values(cart).reduce((acc, cartItem) => {
      const item = foodItemsList.find((i) => i.id === cartItem.id);
      if (!item) return acc;
      return acc + item.price * cartItem.quantity;
    }, 0);
  }, [cart]);

  const handleAdd = (itemId: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart[itemId];
      const foodItem = foodItemsList.find(i => i.id === itemId);
      if (existingItem) {
        return {
          ...prevCart,
          [itemId]: { ...existingItem, quantity: existingItem.quantity + 1 },
        };
      }
      return {
        ...prevCart,
        [itemId]: { id: itemId, quantity: 1, flavor: foodItem?.flavors?.[0] },
      };
    });
  };

  const handleRemove = (itemId: string) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[itemId].quantity > 1) {
        newCart[itemId].quantity -= 1;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const handleFlavorChange = (itemId: string, flavor: string) => {
    setCart((prevCart) => ({
      ...prevCart,
      [itemId]: { ...prevCart[itemId], flavor },
    }));
  };

  const handleProceed = () => {
    const hasUnselectedFlavor = Object.values(cart).some(cartItem => {
        const item = foodItemsList.find(i => i.id === cartItem.id);
        return item?.flavors && !cartItem.flavor;
    });

    if (subtotal > 0 && !hasUnselectedFlavor) {
      onProceed();
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

  const getButtonText = () => {
    if (subtotal === 0) return 'Add something first!';
    const hasUnselectedFlavor = Object.values(cart).some(cartItem => {
        const item = foodItemsList.find(i => i.id === cartItem.id);
        return item?.flavors && !cartItem.flavor;
    });
    if (hasUnselectedFlavor) return 'Please select a flavor!';
    return 'Proceed';
  }

  return (
    <>
      <Button
        onClick={() => onOpenChange(true)}
        variant="outline"
        className="mt-8 bg-transparent hover:bg-primary/10 border-primary text-primary hover:text-primary"
      >
        Haan hai
      </Button>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-center text-primary text-2xl font-bold">
              Aise Kahan!?
            </DialogTitle>
            <DialogDescription className="text-center text-lg text-foreground">
              Pehle kuch khilao mujhe...
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-1 py-4">
            <AnimatePresence>
              {foodItemsList.map((item) => (
                <FoodItem
                  key={item.id}
                  icon={item.icon}
                  name={item.name}
                  price={item.price}
                  quantity={cart[item.id]?.quantity || 0}
                  flavors={item.flavors}
                  selectedFlavor={cart[item.id]?.flavor}
                  onAdd={() => handleAdd(item.id)}
                  onRemove={() => handleRemove(item.id)}
                  onFlavorChange={(flavor) => handleFlavorChange(item.id, flavor)}
                />
              ))}
            </AnimatePresence>
          </div>
          <p className="text-center text-xs text-muted-foreground px-4">
            Recommendation: <span className="text-primary font-semibold">Yogurt and Herb Lays</span> and <span className="text-primary font-semibold">Slice Juice</span>!
          </p>
          <DialogFooter className="flex-col gap-2">
            <div className="flex justify-between items-center w-full font-bold text-lg">
              <span className="text-muted-foreground">Subtotal:</span>
              <div className="text-primary flex items-center">
                <span className="mr-1">Rs.</span>
                <NumberTicker value={subtotal} />
              </div>
            </div>
            <motion.div
              animate={isShaking ? { x: [0, -10, 10, -10, 10, 0] } : {}}
              transition={{ duration: 0.5 }}
              className="w-full"
            >
              <Button
                onClick={handleProceed}
                className="w-full"
                disabled={subtotal === 0 || getButtonText() !== 'Proceed'}
              >
                {getButtonText()}
              </Button>
            </motion.div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

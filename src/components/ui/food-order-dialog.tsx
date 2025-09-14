"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
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
      <path d="M14 11V5a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v6" />
      <path d="M17.5 11l-2-6" />
      <path d="M6.5 11l2-6" />
      <path d="M12 11V5" />
    </svg>
  );

const foodItemsList = [
  { id: 'lays', name: 'Lays', price: 70, icon: <Popcorn className="h-8 w-8" /> },
  { id: 'juice', name: 'Juice', price: 50, icon: <GlassWater className="h-8 w-8" /> },
  { id: 'shake', name: 'Shake', price: 100, icon: <CupSoda className="h-8 w-8" /> },
  { id: 'chocolate', name: 'Chocolate', price: 50, icon: <Cookie className="h-8 w-8" /> },
  { id: 'fries', name: 'Fries', price: 100, icon: <FriesIcon /> },
];

type Cart = {
  [key: string]: number;
};

type FoodOrderDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProceed: () => void;
};

export function FoodOrderDialog({ open, onOpenChange, onProceed }: FoodOrderDialogProps) {
  const [cart, setCart] = useState<Cart>({});
  const [isShaking, setIsShaking] = useState(false);

  const subtotal = Object.keys(cart).reduce((acc, itemId) => {
    const item = foodItemsList.find((i) => i.id === itemId);
    if (!item) return acc;
    return acc + item.price * cart[itemId];
  }, 0);

  const handleAdd = (itemId: string) => {
    setCart((prevCart) => ({
      ...prevCart,
      [itemId]: (prevCart[itemId] || 0) + 1,
    }));
  };

  const handleRemove = (itemId: string) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[itemId] > 1) {
        newCart[itemId] -= 1;
      } else {
        delete newCart[itemId];
      }
      return newCart;
    });
  };

  const handleProceed = () => {
    if (subtotal > 0) {
      onProceed();
    } else {
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
    }
  };

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
          <div className="grid gap-2 py-4">
            {foodItemsList.map((item) => (
              <FoodItem
                key={item.id}
                icon={item.icon}
                name={item.name}
                price={item.price}
                quantity={cart[item.id] || 0}
                onAdd={() => handleAdd(item.id)}
                onRemove={() => handleRemove(item.id)}
              />
            ))}
          </div>
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
                disabled={subtotal === 0}
              >
                {subtotal > 0 ? 'Proceed' : 'Add something first!'}
              </Button>
            </motion.div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

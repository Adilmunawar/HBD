
"use client";

import React, { useState, useMemo, useRef } from 'react';
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
import { ScrollArea } from '@/components/ui/scroll-area';
import { Popcorn, GlassWater, CupSoda, Cookie, Sandwich, IceCream2, ShoppingCart } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const BurgerIcon = () => (
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
    <path d="M8 6h8a2 2 0 0 1 1.73 1H6.27A2 2 0 0 1 8 6Z" />
    <path d="M6.27 18h11.46a2 2 0 0 1-1.73 1H8a2 2 0 0 1-1.73-1Z" />
    <path d="M5 14h14" />
    <path d="M5 10h14" />
    <path d="M3 14c0-2.5 4.5-5 9-5s9 2.5 9 5-4.5 5-9 5-9-2.5-9-5Z" />
    <path d="M4.21 9.42A7.63 7.63 0 0 1 3 7c0-2 4-3 9-3s9 1 9 3c0 .85-.79 1.63-2.07 2.33" />
  </svg>
);

const foodItemsList = [
  { id: 'lays', name: 'Lays', price: 70, icon: <Popcorn className="h-8 w-8" />, flavors: ['Salted', 'French Cheese', 'Yogurt and Herb'], recommendedFlavor: 'Yogurt and Herb' },
  { id: 'juice', name: 'Juice', price: 50, icon: <GlassWater className="h-8 w-8" />, flavors: ['Slice', 'Nestle', 'Fruitien'], recommendedFlavor: 'Slice' },
  { id: 'shake', name: 'Shake', price: 100, icon: <CupSoda className="h-8 w-8" />, flavors: ['Mango', 'Banana', 'Oreo'] },
  { id: 'chocolate', name: 'Chocolate', price: 50, icon: <Cookie className="h-8 w-8" /> },
  { id: 'burger', name: 'Burger', price: 350, icon: <BurgerIcon /> },
  { id: 'sandwich', name: 'Sandwich', price: 180, icon: <Sandwich className="h-8 w-8" />, flavors: ['Club', 'Chicken', 'Veggie'] },
  { id: 'icecream', name: 'Ice Cream', price: 120, icon: <IceCream2 className="h-8 w-8" />, flavors: ['Chocolate', 'Vanilla', 'Strawberry'] },
];

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  flavor?: string;
};

type FoodOrderDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProceed: (total: number) => void;
};

export function FoodOrderDialog({ open, onOpenChange, onProceed }: FoodOrderDialogProps) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const subtotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const totalItems = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const handleAddToCart = (item: typeof foodItemsList[0]) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
        );
      }
      const newItem: CartItem = { id: item.id, name: item.name, price: item.price, quantity: 1 };
      if (item.flavors) {
        newItem.flavor = item.recommendedFlavor || item.flavors[0];
      }
      return [...prevCart, newItem];
    });
  };

  const handleRemoveFromCart = (itemId: string) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === itemId);
      if (existingItem && existingItem.quantity > 1) {
        return prevCart.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity - 1 } : item
        );
      }
      return prevCart.filter((item) => item.id !== itemId);
    });
  };

  const handleFlavorChange = (itemId: string, flavor: string) => {
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === itemId ? { ...item, flavor } : item))
    );
  };
  
  const handleProceed = () => {
    onProceed(subtotal);
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl p-0 flex flex-col h-[90vh] max-h-[90vh]">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>Aise kahan ja rahain hain agy agyy?</DialogTitle>
          <DialogDescription>
            Kuch khilao mujhe. Select items to add them to the cart.
          </DialogDescription>
        </DialogHeader>
        
        <Separator />

        <ScrollArea className="flex-grow p-4">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {foodItemsList.map((item) => {
              const cartItem = cart.find((ci) => ci.id === item.id);
              return (
                <FoodItem
                  key={item.id}
                  item={item}
                  cartItem={cartItem}
                  onAdd={() => handleAddToCart(item)}
                  onRemove={() => handleRemoveFromCart(item.id)}
                  onFlavorChange={(flavor) => handleFlavorChange(item.id, flavor)}
                />
              );
            })}
          </div>
        </ScrollArea>
        
        <Separator />

        <DialogFooter className="p-4 flex-row justify-between items-center bg-secondary/20">
          <motion.div className="relative">
              <motion.div>
                  <ShoppingCart className="h-7 w-7 text-primary" />
                  {totalItems > 0 && 
                      <motion.div 
                        key={totalItems}
                        initial={{ scale: 0, y: -10 }}
                        animate={{ scale: 1, y: 0, transition: { type: 'spring', stiffness: 500, damping: 20 } }}
                        className="absolute -top-2 -right-3 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold"
                      >
                          {totalItems}
                      </motion.div>
                  }
              </motion.div>
          </motion.div>
          <div className="flex items-center gap-4">
            <div className="flex items-baseline gap-2 text-right">
                <span className="text-sm text-muted-foreground">Subtotal:</span>
                <span className="text-2xl font-bold text-primary">
                Rs. <NumberTicker value={subtotal} />
                </span>
            </div>
            <motion.div
              animate={{ scale: subtotal > 0 ? 1 : 0.8, opacity: subtotal > 0 ? 1 : 0.5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Button size="lg" onClick={handleProceed} disabled={subtotal === 0}>
                Proceed
              </Button>
            </motion.div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


"use client";

import React, { useState, useMemo, createRef, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
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
    <path d="M7.2 13.4 8.7 15s1.4 1.4 2.8 0l-4-4-1.5-1.5s-1.4-1.4 0-2.8l5.5-5.5s1.4-1.4 2.8 0L20 6.1s1.4 1.4 0 2.8l-5.5 5.5s-1.4 1.4-2.8 0L9.9 13.1" />
    <path d="m5.1 11.2 1.4 1.4" />
    <path d="m11.1 5.2 1.4 1.4" />
    <path d="m17.1 11.2 1.4 1.4" />
    <path d="m4.2 19.5 1-1" />
    <path d="M2 22v-5l2-2" />
    <path d="M22 15v5l-2 2" />
    <path d="m16.5 22-1-1" />
    <path d="m11.5 22-1-1" />
    <path d="M6.5 22-1-1" />
  </svg>
);

const PizzaIcon = () => (
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
    <path d="M15 11h.01" />
    <path d="M11 15h.01" />
    <path d="M16 16h.01" />
    <path d="M21.17 8.83a1.003 1.003 0 0 0-.17-1.09l-4.16-4.16a1 1 0 0 0-1.09-.17C12.9 5.34 10.16 6.9 8 9.05c-2.16 2.16-3.7 4.9-5.58 7.74.39.39.87.68 1.4.85l5.24-5.24a1 1 0 0 1 1.42 0l2.82 2.82a1 1 0 0 1 0 1.42l-5.24 5.24c.17.53.46 1.01.85 1.4 2.85-1.87 5.58-3.42 7.74-5.58 2.16-2.16 3.7-4.9 5.58-7.74Z" />
  </svg>
);

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
  { id: 'fries', name: 'Fries', price: 100, icon: <FriesIcon /> },
  { id: 'pizza', name: 'Pizza Slice', price: 250, icon: <PizzaIcon />, flavors: ['Fajita', 'Tikka', 'Pepperoni'], recommendedFlavor: 'Fajita' },
  { id: 'burger', name: 'Burger', price: 350, icon: <BurgerIcon /> },
  { id: 'sandwich', name: 'Sandwich', price: 180, icon: <Sandwich className="h-8 w-8" />, flavors: ['Club', 'Chicken', 'Veggie'] },
  { id: 'icecream', name: 'Ice Cream', price: 120, icon: <IceCream2 className="h-8 w-8" />, flavors: ['Chocolate', 'Vanilla', 'Strawberry'] },
];

type FoodOrderDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onProceed: (total: number) => void;
};

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  flavor?: string;
};

export function FoodOrderDialog({ open, onOpenChange, onProceed }: FoodOrderDialogProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const itemRefs = useMemo(() => Array.from({ length: foodItemsList.length }).map(() => createRef<HTMLDivElement>()), []);
  const cartRef = useRef<HTMLDivElement>(null);
  const cartControls = useAnimation();
  const [flyingIcons, setFlyingIcons] = useState<any[]>([]);

  const subtotal = useMemo(() => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cart]);

  const totalItems = useMemo(() => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  }, [cart]);

  const handleAddToCart = (item: typeof foodItemsList[0], itemIndex: number) => {
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

    const itemRef = itemRefs[itemIndex].current;
    const cartIconRef = cartRef.current;
    if (itemRef && cartIconRef) {
      const itemRect = itemRef.querySelector(`[data-food-icon="${item.name}"]`)!.getBoundingClientRect();
      const cartRect = cartIconRef.getBoundingClientRect();
      
      const newFlyingIconId = Date.now();
      const newFlyingIcon = {
        id: newFlyingIconId,
        icon: item.icon,
        from: {
          x: itemRect.left,
          y: itemRect.top,
          opacity: 1,
          scale: 1,
        },
        to: {
          x: cartRect.left + cartRect.width / 2 - 16,
          y: cartRect.top + cartRect.height / 2 - 16,
          opacity: 0,
          scale: 0.2,
        },
      };
      setFlyingIcons(prev => [...prev, newFlyingIcon]);
      
      setTimeout(() => {
        setFlyingIcons(prev => prev.filter(icon => icon.id !== newFlyingIconId));
        cartControls.start({
            scale: [1, 1.2, 1],
            transition: { duration: 0.4, type: 'spring', stiffness: 400, damping: 10 }
        });
      }, 600);
    }
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl p-0 flex flex-col h-full sm:h-auto max-h-[90vh]">
        <DialogHeader className="p-6 pb-2">
          <DialogTitle>Aise kahan ja rahy ho agy agy?</DialogTitle>
          <DialogDescription>
            Kuch khilao mujhe. Select items to add them to the cart.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-grow px-4">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 p-2">
            {foodItemsList.map((item, index) => {
              const cartItem = cart.find((ci) => ci.id === item.id);
              return (
                <FoodItem
                  key={item.id}
                  ref={itemRefs[index]}
                  item={item}
                  cartItem={cartItem}
                  onAdd={() => handleAddToCart(item, index)}
                  onRemove={() => handleRemoveFromCart(item.id)}
                  onFlavorChange={(flavor) => handleFlavorChange(item.id, flavor)}
                />
              );
            })}
          </div>
        </ScrollArea>

        {flyingIcons.map(({id, icon, from, to}) => (
            <motion.div
                key={id}
                initial={from}
                animate={to}
                transition={{ duration: 0.6, ease: "easeInOut" }}
                className="fixed z-50 text-primary"
                style={{
                  pointerEvents: 'none',
                }}
            >
                {icon}
            </motion.div>
        ))}

        <DialogFooter className="p-6 pt-4 flex-row justify-between items-center bg-secondary/30 mt-auto">
            <motion.div ref={cartRef} animate={cartControls} className="relative">
                <ShoppingCart className="h-6 w-6 text-primary" />
                {totalItems > 0 && 
                    <motion.div 
                      key={totalItems}
                      initial={{ scale: 0, y: 10 }}
                      animate={{ scale: 1, y: 0 }}
                      className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold"
                    >
                        {totalItems}
                    </motion.div>
                }
            </motion.div>
          <div className="flex items-center gap-4">
            <div className="flex items-baseline gap-2 text-right">
                <span className="text-sm text-muted-foreground">Subtotal:</span>
                <span className="text-xl font-bold text-primary">
                Rs. <NumberTicker value={subtotal} />
                </span>
            </div>
            <motion.div
              animate={{ scale: subtotal > 0 ? 1 : 0.8, opacity: subtotal > 0 ? 1 : 0.5 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            >
              <Button onClick={() => onProceed(subtotal)} disabled={subtotal === 0}>
                Proceed
              </Button>
            </motion.div>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

    
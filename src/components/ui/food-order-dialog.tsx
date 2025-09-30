
"use client";

import React, { useState, useMemo, createRef, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
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
import { Input } from '@/components/ui/input';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Popcorn, GlassWater, CupSoda, Cookie, Sandwich, IceCream2, ShoppingCart, Search, ChevronDown, Trash2 } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

const FriesIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
        <path d="M7.2 13.4 8.7 15s1.4 1.4 2.8 0l-4-4-1.5-1.5s-1.4-1.4 0-2.8l5.5-5.5s1.4-1.4 2.8 0L20 6.1s1.4 1.4 0 2.8l-5.5 5.5s-1.4 1.4-2.8 0L9.9 13.1" />
        <path d="m5.1 11.2 1.4 1.4" />
        <path d="m11.1 5.2 1.4 1.4" />
        <path d="m17.1 11.2 1.4 1.4" />
        <path d="m4.2 19.5 1-1" />
        <path d="M2 22v-5l2-2" />
        <path d="M22 15v5l-2 2" />
        <path d="m16.5 22-1-1" />
        <path d="m11.5 22-1-1" />
    </svg>
);

const PizzaIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8">
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

const categories = ['Snacks', 'Meals', 'Drinks', 'Desserts'];

const foodItemsList = [
  { id: 'lays', name: 'Lays', price: 70, icon: <Popcorn className="h-8 w-8" />, flavors: ['Salted', 'French Cheese', 'Yogurt and Herb'], recommendedFlavor: 'Yogurt and Herb', category: 'Snacks' },
  { id: 'fries', name: 'Fries', price: 150, icon: <FriesIcon />, category: 'Snacks' },
  { id: 'juice', name: 'Juice', price: 50, icon: <GlassWater className="h-8 w-8" />, flavors: ['Slice', 'Nestle', 'Fruitien'], recommendedFlavor: 'Slice', category: 'Drinks' },
  { id: 'shake', name: 'Shake', price: 100, icon: <CupSoda className="h-8 w-8" />, flavors: ['Mango', 'Banana', 'Oreo'], category: 'Drinks' },
  { id: 'chocolate', name: 'Chocolate', price: 50, icon: <Cookie className="h-8 w-8" />, category: 'Desserts' },
  { id: 'burger', name: 'Burger', price: 350, icon: <BurgerIcon />, category: 'Meals' },
  { id: 'sandwich', name: 'Sandwich', price: 180, icon: <Sandwich className="h-8 w-8" />, flavors: ['Club', 'Chicken', 'Veggie'], category: 'Meals' },
  { id: 'pizza', name: 'Pizza Slice', price: 250, icon: <PizzaIcon />, category: 'Meals' },
  { id: 'icecream', name: 'Ice Cream', price: 120, icon: <IceCream2 className="h-8 w-8" />, flavors: ['Chocolate', 'Vanilla', 'Strawberry'], category: 'Desserts' },
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
  icon: React.ReactNode;
};

export function FoodOrderDialog({ open, onOpenChange, onProceed }: FoodOrderDialogProps) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const itemRefs = useMemo(() => Array.from({ length: foodItemsList.length }).map(() => createRef<HTMLDivElement>()), []);
  const cartRef = useRef<HTMLDivElement>(null);
  const cartControls = useAnimation();
  const [flyingIcons, setFlyingIcons] = useState<any[]>([]);

  const filteredFoodItems = useMemo(() => {
    return foodItemsList.filter(item => 
      (item.category === activeCategory) &&
      (item.name.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [activeCategory, searchTerm]);

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
      const newItem: CartItem = { id: item.id, name: item.name, price: item.price, quantity: 1, icon: item.icon };
      if (item.flavors) {
        newItem.flavor = item.recommendedFlavor || item.flavors[0];
      }
      return [...prevCart, newItem];
    });

    const itemRef = itemRefs.find(ref => ref.current?.dataset.itemId === item.id)?.current;
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
            scale: [1, 1.25, 1],
            transition: { duration: 0.4, type: 'spring', stiffness: 500, damping: 15 }
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

  useEffect(() => {
    if(cart.length === 0) {
        setIsCartOpen(false);
    }
  }, [cart]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-3xl p-0 flex flex-col h-[90vh] max-h-[90vh] bg-background">
        <DialogHeader className="p-6 pb-4">
          <div className="flex justify-between items-center">
            <div>
              <DialogTitle>Aise kahan ja rahain hain agy agyy?</DialogTitle>
              <DialogDescription>
                Kuch khilao mujhe. Select items to add them to the cart.
              </DialogDescription>
            </div>
            <div className="relative w-full max-w-xs">
              <Input 
                placeholder="Search for food..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            </div>
          </div>
        </DialogHeader>

        <div className="px-6">
            <div className="flex space-x-1 border-b">
                {categories.map(category => (
                    <motion.button
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className="relative px-4 py-2 text-sm font-medium text-muted-foreground transition-colors"
                    >
                        {category}
                        {activeCategory === category && (
                            <motion.div
                                layoutId="active-category-underline"
                                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                            />
                        )}
                    </motion.button>
                ))}
            </div>
        </div>

        <ScrollArea className="flex-grow px-4">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 p-2"
            >
              {filteredFoodItems.map((item, index) => {
                const cartItem = cart.find((ci) => ci.id === item.id);
                const originalIndex = foodItemsList.findIndex(fi => fi.id === item.id);
                return (
                  <FoodItem
                    key={item.id}
                    ref={itemRefs[originalIndex]}
                    item={item}
                    cartItem={cartItem}
                    onAdd={() => handleAddToCart(item, originalIndex)}
                    onRemove={() => handleRemoveFromCart(item.id)}
                    onFlavorChange={(flavor) => handleFlavorChange(item.id, flavor)}
                  />
                );
              })}
            </motion.div>
          </AnimatePresence>
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

        <Collapsible open={isCartOpen} onOpenChange={setIsCartOpen} className="mt-auto flex flex-col" disabled={cart.length === 0}>
            <CollapsibleContent asChild>
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                >
                    <div className="p-4 border-t max-h-48">
                        <h4 className="font-semibold mb-2 px-2">Your Order</h4>
                        <ScrollArea className="max-h-36 pr-3">
                            <div className="space-y-2">
                                {cart.map(item => (
                                    <div key={item.id} className="flex items-center justify-between text-sm p-2 rounded-lg bg-muted/50">
                                        <div className="flex items-center gap-2">
                                            <div className="text-primary size-5">{item.icon}</div>
                                            <div>
                                                <p className="font-medium">{item.name} <span className="text-muted-foreground">x{item.quantity}</span></p>
                                                {item.flavor && <p className="text-xs text-muted-foreground">{item.flavor}</p>}
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <p className="font-mono">Rs. {item.price * item.quantity}</p>
                                            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => handleRemoveFromCart(item.id)}>
                                                <Trash2 className="h-3.5 w-3.5 text-destructive" />
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </ScrollArea>
                    </div>
                </motion.div>
            </CollapsibleContent>
            <DialogFooter className="p-4 flex-row justify-between items-center bg-secondary/30 border-t">
                <div className="flex items-center gap-4">
                  <motion.div ref={cartRef} animate={cartControls} className="relative">
                      <ShoppingCart className="h-6 w-6 text-primary" />
                      {totalItems > 0 && 
                          <motion.div 
                            key={totalItems}
                            initial={{ scale: 0, y: -10 }}
                            animate={{ scale: 1, y: 0, transition: { type: 'spring', stiffness: 500, damping: 20 } }}
                            className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold"
                          >
                              {totalItems}
                          </motion.div>
                      }
                  </motion.div>
                  {cart.length > 0 && (
                      <CollapsibleTrigger asChild>
                          <Button variant="ghost" size="sm" className="text-sm">
                              View Cart
                              <ChevronDown className="h-4 w-4 ml-1 transition-transform duration-300 data-[state=open]:rotate-180" />
                          </Button>
                      </CollapsibleTrigger>
                  )}
                </div>
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
                    <Button size="lg" onClick={() => onProceed(subtotal)} disabled={subtotal === 0}>
                      Proceed
                    </Button>
                  </motion.div>
                </div>
            </DialogFooter>
        </Collapsible>
      </DialogContent>
    </Dialog>
  );
}

    
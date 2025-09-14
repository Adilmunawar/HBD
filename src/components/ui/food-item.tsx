"use client";

import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import React from 'react';

type FoodItemProps = {
  icon: React.ReactNode;
  name: string;
  price: number;
  quantity: number;
  flavors?: string[];
  selectedFlavor?: string;
  onAdd: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onRemove: () => void;
  onFlavorChange: (flavor: string) => void;
};

export const FoodItem = React.forwardRef<HTMLDivElement, FoodItemProps>(({
  icon,
  name,
  price,
  quantity,
  flavors,
  selectedFlavor,
  onAdd,
  onRemove,
  onFlavorChange,
}, ref) => {
  return (
    <motion.div
      layout
      ref={ref}
      className="flex flex-col p-2 rounded-lg transition-colors hover:bg-secondary/50"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="text-primary size-8" data-food-icon={name}>{icon}</div>
          <div>
            <p className="font-semibold text-foreground">{name}</p>
            <p className="text-sm text-muted-foreground">Rs. {price}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <AnimatePresence>
            {quantity > 0 && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className='flex items-center gap-2'
              >
                <Button variant="outline" size="icon" className="h-7 w-7 rounded-full" onClick={onRemove}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-6 text-center font-bold text-primary">{quantity}</span>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div whileTap={{ scale: 0.9 }}>
            <Button variant="outline" size="icon" className="h-7 w-7 rounded-full" onClick={onAdd}>
              <Plus className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
      <AnimatePresence>
        {quantity > 0 && flavors && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="pt-2 pl-12 overflow-hidden"
          >
            <RadioGroup value={selectedFlavor} onValueChange={onFlavorChange}>
              <div className="flex flex-wrap gap-x-4 gap-y-2">
                {flavors.map((flavor) => (
                  <div key={flavor} className="flex items-center space-x-2">
                    <RadioGroupItem value={flavor} id={`${name}-${flavor}`} />
                    <Label htmlFor={`${name}-${flavor}`} className="text-xs font-normal">{flavor}</Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
});

FoodItem.displayName = 'FoodItem';

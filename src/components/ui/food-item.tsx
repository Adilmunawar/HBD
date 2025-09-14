"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';

type FoodItemProps = {
  icon: React.ReactNode;
  name: string;
  price: number;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
};

export function FoodItem({ icon, name, price, quantity, onAdd, onRemove }: FoodItemProps) {
  return (
    <div className="flex items-center justify-between p-2 rounded-lg transition-colors hover:bg-secondary/50">
      <div className="flex items-center gap-4">
        <div className="text-primary">{icon}</div>
        <div>
          <p className="font-semibold text-foreground">{name}</p>
          <p className="text-sm text-muted-foreground">Rs. {price}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <motion.div
          key={quantity}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 500, damping: 20 }}
          className={cn(
            'flex items-center gap-2 transition-all duration-300',
            quantity > 0 ? 'opacity-100' : 'opacity-0 -translate-x-4'
          )}
        >
          <Button variant="outline" size="icon" className="h-7 w-7 rounded-full" onClick={onRemove}>
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-6 text-center font-bold text-primary">{quantity}</span>
        </motion.div>
        <Button variant="outline" size="icon" className="h-7 w-7 rounded-full" onClick={onAdd}>
          <Plus className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}

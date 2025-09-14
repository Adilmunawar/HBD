"use client";

import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plus, Minus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';

type FoodItemProps = {
  icon: React.ReactNode;
  name: string;
  price: number;
  quantity: number;
  flavors?: string[];
  selectedFlavor?: string;
  onAdd: () => void;
  onRemove: () => void;
  onFlavorChange: (flavor: string) => void;
};

export function FoodItem({
  icon,
  name,
  price,
  quantity,
  flavors,
  selectedFlavor,
  onAdd,
  onRemove,
  onFlavorChange,
}: FoodItemProps) {
  return (
    <motion.div
      layout
      className="flex flex-col p-2 rounded-lg transition-colors hover:bg-secondary/50"
    >
      <div className="flex items-center justify-between">
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
          <motion.div whileTap={{ scale: 0.9 }}>
            <Button variant="outline" size="icon" className="h-7 w-7 rounded-full" onClick={onAdd}>
              <Plus className="h-4 w-4" />
            </Button>
          </motion.div>
        </div>
      </div>
      {quantity > 0 && flavors && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="pt-2 pl-12"
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
    </motion.div>
  );
}


"use client";

import { motion, AnimatePresence, useAnimation, useMotionValue, useTransform } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Plus, Minus, Star } from 'lucide-react';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import React, { useEffect, useRef } from 'react';

type Item = {
  id: string;
  name: string;
  price: number;
  icon: React.ReactNode;
  flavors?: string[];
  recommendedFlavor?: string;
};

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  flavor?: string;
};

type FoodItemProps = {
  item: Item;
  cartItem?: CartItem;
  onAdd: () => void;
  onRemove: () => void;
  onFlavorChange: (flavor: string) => void;
  onDragEnd: (info: any) => void;
};

export const FoodItem = React.forwardRef<HTMLDivElement, FoodItemProps>(({
  item,
  cartItem,
  onAdd,
  onRemove,
  onFlavorChange,
  onDragEnd,
}, ref) => {
  const controls = useAnimation();
  const quantity = cartItem?.quantity || 0;
  
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-150, 150], [15, -15]);
  const rotateY = useTransform(x, [-150, 150], [-15, 15]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (cardRef.current) {
        const rect = cardRef.current.getBoundingClientRect();
        x.set(event.clientX - (rect.left + rect.width / 2));
        y.set(event.clientY - (rect.top + rect.height / 2));
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    if (quantity > 0) {
      controls.start({
        scale: [1, 1.05, 1],
        transition: { duration: 0.3 }
      });
    }
  }, [quantity, controls]);

  return (
    <motion.div
        drag
        dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
        dragElastic={0.8}
        onDragEnd={(_event, info) => onDragEnd(info)}
        className="cursor-grab active:cursor-grabbing"
        style={{ perspective: 800 }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
    >
      <motion.div
        layout
        ref={cardRef}
        style={{ rotateX, rotateY, transition: 'transform 0.1s' }}
        animate={controls}
        className="relative flex flex-col justify-between rounded-xl border bg-card text-card-foreground shadow-sm transition-shadow hover:shadow-primary/20 overflow-hidden"
        onClick={quantity === 0 ? onAdd : undefined}
      >
        {item.recommendedFlavor && (
          <div className="absolute top-0 right-0 h-20 w-20">
              <div 
                  className="absolute transform rotate-45 bg-primary text-primary-foreground font-semibold text-[10px] leading-tight flex items-center justify-center"
                  style={{
                      width: '10rem',
                      height: '1.75rem',
                      right: '-2.5rem',
                      top: '0.75rem',
                  }}
              >
                  Recommended
              </div>
          </div>
        )}
        <div className="flex-grow p-4 flex flex-col items-center justify-center text-center gap-2 pointer-events-none">
          <div className="text-primary size-10" data-food-icon={item.name}>{item.icon}</div>
          <div>
            <p className="font-semibold text-foreground">{item.name}</p>
            <p className="text-sm text-muted-foreground">Rs. {item.price}</p>
          </div>
        </div>

        <AnimatePresence>
          {quantity > 0 && item.flavors && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="px-2 pb-2 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <RadioGroup value={cartItem?.flavor} onValueChange={onFlavorChange} className="p-2 bg-muted/50 rounded-md">
                <div className="flex flex-wrap gap-x-3 gap-y-1">
                  {item.flavors.map((flavor, i) => (
                    <motion.div
                      key={flavor}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.05 }}
                      className="flex items-center space-x-1.5"
                    >
                      <RadioGroupItem value={flavor} id={`${item.name}-${flavor}`} className="h-3.5 w-3.5" />
                      <Label htmlFor={`${item.name}-${flavor}`} className="text-xs font-normal flex items-center gap-1">
                        {flavor}
                        {flavor === item.recommendedFlavor && (
                          <Star className="h-3 w-3 text-primary" />
                        )}
                      </Label>
                    </motion.div>
                  ))}
                </div>
              </RadioGroup>
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="p-2 border-t bg-card" onClick={(e) => e.stopPropagation()}>
          <AnimatePresence mode="wait">
          {quantity > 0 ? (
              <motion.div
                key="quantity-controls"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className='flex items-center justify-between'
              >
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={onRemove}>
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="w-8 text-center font-bold text-lg text-primary">{quantity}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={onAdd}>
                  <Plus className="h-4 w-4" />
                </Button>
              </motion.div>
          ) : (
            <motion.div
              key="add-button"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Button variant="outline" size="sm" className="w-full h-9" onClick={onAdd}>
                <Plus className="mr-2 h-4 w-4"/>
                Add
              </Button>
            </motion.div>
          )}
          </AnimatePresence>
        </div>
      </motion.div>
    </motion.div>
  );
});

FoodItem.displayName = 'FoodItem';

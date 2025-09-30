
"use client"

import React from 'react';
import { motion } from 'framer-motion';
import { Separator } from './separator';

export type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  flavor?: string;
};

type ReceiptProps = {
  items: CartItem[];
};

export function Receipt({ items }: ReceiptProps) {
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div 
      className="bg-stone-50 p-6 font-mono text-sm text-stone-800"
      style={{
        backgroundImage: 
          'linear-gradient(to right, transparent 50%, rgba(0,0,0,0.05) 50%),' +
          'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.05) 50%)',
        backgroundSize: '20px 20px',
        maskImage: 'radial-gradient(ellipse at top, transparent 0%, black 10%), radial-gradient(ellipse at bottom, black 10%, transparent 0%)',
        maskComposite: 'intersect',
        WebkitMaskImage: 'radial-gradient(ellipse at top, transparent 0%, black 10%), radial-gradient(ellipse at bottom, black 10%, transparent 0%)',
        WebkitMaskComposite: 'xor',
      }}
    >
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold uppercase tracking-widest">Your Order</h3>
        <p className="text-xs text-stone-500">{new Date().toLocaleString()}</p>
      </div>
      
      <Separator className="my-2 border-dashed border-stone-300" />
      
      <div className="flex justify-between font-bold mb-1">
        <span>Item</span>
        <span>Price</span>
      </div>
      
      <Separator className="my-2 border-dashed border-stone-300" />
      
      {items.length === 0 ? (
        <motion.p variants={itemVariants} className="text-center text-stone-500 py-4">No items in cart</motion.p>
      ) : (
        <motion.ul variants={containerVariants} initial="hidden" animate="visible" className="space-y-2">
          {items.map((item) => (
            <motion.li key={item.id} variants={itemVariants} className="flex flex-col">
              <div className="flex justify-between">
                <span>{item.quantity}x {item.name}</span>
                <span>Rs. {item.price * item.quantity}</span>
              </div>
              {item.flavor && (
                <span className="text-xs text-stone-500 pl-4">- {item.flavor}</span>
              )}
            </motion.li>
          ))}
        </motion.ul>
      )}

      <Separator className="my-3 border-t-2 border-dashed border-stone-400" />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: items.length * 0.1 } }} className="space-y-2">
        <div className="flex justify-between font-bold text-base">
          <span>Subtotal</span>
          <span>Rs. {subtotal}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span>Taxes & Fees</span>
          <span>Rs. 0</span>
        </div>
      </motion.div>

      <Separator className="my-3 border-dashed border-stone-300" />

      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1, transition: { delay: items.length * 0.1 + 0.2 } }} className="flex justify-between font-extrabold text-lg text-primary">
        <span>TOTAL</span>
        <span>Rs. {subtotal}</span>
      </motion.div>

       <div className="text-center text-xs text-stone-500 mt-6">
        <p>Thank you for your order!</p>
        <p>Happy Birthday, Miss Samina!</p>
      </div>
    </div>
  );
}

    
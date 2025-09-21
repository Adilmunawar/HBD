
"use client";

import React, { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Wallet, ArrowLeft, Loader2, ChevronsRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { NumberTicker } from '@/components/ui/number-ticker';

const EthIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-current">
        <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.37 4.35h.001zM12.056 0L4.69 12.223l7.366 4.354 7.36-4.354L12.056 0z"/>
    </svg>
);

const cryptoOptions = [
  { id: 'eth', name: 'Ethereum', icon: <EthIcon />, address: '0x2817452fA66bFacFAD7e02703d63eDd4054A2c37' },
];

function PaymentComponent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoOptions[0].id);
  const [isPaying, setIsPaying] = useState(false);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const paymentAmount = sessionStorage.getItem('paymentAmount');
    if (paymentAmount) {
      setAmount(parseInt(paymentAmount, 10));
    } else {
        // If no amount is found, maybe redirect or show a message.
        // For this flow, we can just let it be 0 and disable the button.
    }
  }, []);

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: 'Copied to Clipboard!',
      description: 'The wallet address has been copied.',
    });
  };

  const handleProceed = () => {
    setIsPaying(true);
    setTimeout(() => {
        router.push('/birthday-wish');
    }, 2000);
  }

  const selectedCryptoData = cryptoOptions.find(c => c.id === selectedCrypto);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-background flex items-center justify-center p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <motion.div 
          className="hidden md:flex flex-col items-center justify-center"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Image
            src="/payment-thinking.gif"
            alt="Thinking about payment"
            width={400}
            height={400}
            unoptimized
          />
          <p className="mt-4 text-center text-lg text-muted-foreground">
            Just a moment, we're preparing your secure payment portal...
          </p>
        </motion.div>
        <motion.div 
          className="w-full"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <Card className="w-full shadow-2xl rounded-2xl bg-card/80 backdrop-blur-sm border-primary/20">
            <CardHeader className="text-center">
              <CardDescription>Amount Payable</CardDescription>
              <CardTitle className="text-4xl font-bold text-primary flex justify-center items-baseline">
                Rs. <NumberTicker value={amount} />
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="recommended" className="w-full">
                <TabsList className="grid w-full grid-cols-3 bg-muted/50 rounded-lg">
                  <TabsTrigger value="crypto">Crypto</TabsTrigger>
                  <TabsTrigger value="sadapay">SadaPay</TabsTrigger>
                  <TabsTrigger value="recommended" className="text-primary font-bold">Recommended</TabsTrigger>
                </TabsList>
                
                <AnimatePresence mode="wait">
                  <TabsContent key="crypto" value="crypto">
                    <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
                      <div className="text-center text-sm text-muted-foreground mb-4">Select a currency to view the payment address.</div>
                      <div className="flex justify-center gap-4 mb-4">
                        {cryptoOptions.map(crypto => (
                          <motion.button
                            key={crypto.id}
                            onClick={() => setSelectedCrypto(crypto.id)}
                            className={`p-3 rounded-lg border-2 transition-all ${selectedCrypto === crypto.id ? 'border-primary bg-primary/10' : 'border-border'}`}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {crypto.icon}
                          </motion.button>
                        ))}
                      </div>
                      {selectedCryptoData && (
                         <AnimatePresence mode="wait">
                          <motion.div
                            key={selectedCryptoData.id}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                          >
                              <div className="p-3 bg-muted/50 rounded-lg text-center">
                                  <p className="font-semibold text-foreground">{selectedCryptoData.name}</p>
                                  <div className="flex items-center justify-center gap-2 mt-2">
                                      <p className="text-xs text-muted-foreground truncate">{selectedCryptoData.address}</p>
                                      <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => handleCopyToClipboard(selectedCryptoData.address)}>
                                          <Copy className="h-4 w-4" />
                                      </Button>
                                  </div>
                              </div>
                          </motion.div>
                         </AnimatePresence>
                      )}
                    </motion.div>
                  </TabsContent>

                  <TabsContent key="sadapay" value="sadapay">
                      <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
                          <div className="text-center p-6 bg-muted/50 rounded-lg flex flex-col items-center gap-4">
                              <Image src="/sadapay-logo.png" alt="SadaPay" width={120} height={34} />
                              <p className="text-sm text-muted-foreground">Transfer to the following account:</p>
                              <div className="flex items-center gap-2 p-2 px-4 bg-background rounded-full">
                                  <p className="text-lg font-bold font-mono text-primary tracking-widest">03244965220</p>
                                  <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => handleCopyToClipboard('03244965220')}>
                                      <Copy className="h-4 w-4" />
                                  </Button>
                              </div>
                          </div>
                      </motion.div>
                  </TabsContent>

                  <TabsContent key="recommended" value="recommended">
                      <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.4, type: 'spring' }}>
                          <div className="text-center p-8 bg-primary/10 rounded-lg flex flex-col items-center gap-4">
                              <motion.div
                                  whileHover={{ scale: 1.1, rotate: 10 }}
                                  whileTap={{ scale: 0.9 }}
                                  animate={{ y: [0, -5, 0] }}
                                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                              >
                                  <Wallet className="h-16 w-16 text-primary" />
                              </motion.div>
                              <p className="text-lg font-bold text-foreground">Open your purse, take out the money and give it to me.</p>
                              <p className="text-sm text-muted-foreground">The fastest and most secure payment method. 100% success rate!</p>
                          </div>
                      </motion.div>
                  </TabsContent>
                </AnimatePresence>
              </Tabs>
              <div className="mt-6 flex justify-between items-center">
                <Button variant="outline" onClick={() => router.back()}>
                  <ArrowLeft className="mr-2" />
                  Go Back
                </Button>
                <Button onClick={handleProceed} disabled={isPaying || amount === 0} className="bg-primary hover:bg-primary/90">
                  {isPaying ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      Complete Order
                      <ChevronsRight className="ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}

export default function PaymentPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PaymentComponent />
    </Suspense>
  );
}

"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Bitcoin, Copy, CreditCard, Send, Wallet, CheckCircle, ArrowLeft, Loader2, ChevronsRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const EthIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 3l-9 10 9 5 9-5-9-10zM7 13l9 16 9-16-9 5-9-5z" /></svg>;
const TrxIcon = () => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M11.24 12.19l-1.42 1.41-4.24-4.24-1.42 1.41L9.82 16.4l-1.77 1.77 1.41 1.41 1.77-1.77 4.58 4.58L22 16.03l-7.95-7.95-2.81 2.81zm5.1-5.1a1.5 1.5 0 00-2.12 0L12.8 8.51l2.12 2.12 1.42-1.42zM2.52 14.2l5.65-5.65 1.41 1.41L3.93 15.6z"/></svg>;


const cryptoOptions = [
  { id: 'btc', name: 'Bitcoin', icon: <Bitcoin />, address: 'bc1q7vxt36yglcl0up0q4v77wc0ws2yp50h4mraq7a' },
  { id: 'eth', name: 'Ethereum', icon: <EthIcon />, address: '0x2817452fA66bFacFAD7e02703d63eDd4054A2c37' },
  { id: 'trx', name: 'Tron TRC20', icon: <TrxIcon />, address: 'TLsTFBCpErXsuMgKGLVYE2Y6z8qhhhtCvB' },
];

export default function PaymentPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [selectedCrypto, setSelectedCrypto] = useState(cryptoOptions[0].id);
  const [isPaying, setIsPaying] = useState(false);

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
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md"
      >
        <Card className="w-full shadow-2xl rounded-2xl bg-card/80 backdrop-blur-sm border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center justify-center text-2xl font-bold text-primary">
              <CreditCard className="mr-2" />
              Payment Gateway
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
                <TabsContent value="crypto">
                  <motion.div key="crypto" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
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

                <TabsContent value="sadapay">
                    <motion.div key="sadapay" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
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

                <TabsContent value="recommended">
                    <motion.div key="recommended" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.4, type: 'spring' }}>
                        <div className="text-center p-8 bg-primary/10 rounded-lg flex flex-col items-center gap-4">
                            <motion.div
                                animate={{ scale: [1, 1.1, 1], rotate: [-5, 5, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
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
              <Button onClick={handleProceed} disabled={isPaying} className="bg-primary hover:bg-primary/90">
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
  );
}

"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, CreditCard, Send, Wallet, CheckCircle, ArrowLeft, Loader2, ChevronsRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

const BtcIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-current">
        <path d="M12 24C5.373 24 0 18.627 0 12S5.373 0 12 0s12 5.373 12 12-5.373 12-12 12zM8.508 18.06h2.242v-2.24H8.508v2.24zm0-3.363h2.242v-6.72H8.508v6.72zm0-7.843h2.242V4.615H8.508v2.242zm3.362 11.203h2.242V15.82h-2.242v2.242zm0-3.362h2.242v-2.24h-2.242v2.24zm0-3.363h2.242v-2.24h-2.242v2.24zm0-3.362h2.242V5.73H11.87v2.242zm3.363 11.203H17.47V15.82h-2.238v2.242zm0-7.843H17.47V8.974h-2.238v2.242z"/>
    </svg>
);
const EthIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="fill-current">
        <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.37 4.35h.001zM12.056 0L4.69 12.223l7.366 4.354 7.36-4.354L12.056 0z"/>
    </svg>
);
const TrxIcon = () => (
    <svg role="img" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor">
      <path d="M2.66 11.025 12 5.64l9.34 5.385-9.34 5.385-9.34-5.385zM12 0l11.04 6.36L12 12.735.96 6.36 12 0zm0 24L.96 17.64 12 11.265l11.04 6.375L12 24z"/>
    </svg>
);


const cryptoOptions = [
  { id: 'btc', name: 'Bitcoin', icon: <BtcIcon />, address: 'bc1q7vxt36yglcl0up0q4v77wc0ws2yp50h4mraq7a' },
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

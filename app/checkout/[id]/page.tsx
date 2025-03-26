'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

type Template = {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  author: {
    name: string;
    avatar: string;
  };
};

type PaymentMethod = 'credit-card' | 'paypal' | 'stripe';

export default function CheckoutPage() {
  const params = useParams();
  const { id } = params;
  
  const [template, setTemplate] = useState<Template | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit-card');
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  
  // Form state
  const [email, setEmail] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvc, setCardCvc] = useState('');
  const [billingAddress, setBillingAddress] = useState('');
  const [city, setCity] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [country, setCountry] = useState('United States');
  
  useEffect(() => {
    // In a real app, fetch the template data from an API
    // For now, we'll simulate a fetch with setTimeout
    setTimeout(() => {
      setTemplate({
        id: id as string,
        title: 'Modern Portfolio Template',
        description: 'A sleek, minimalist portfolio template with dark mode support and smooth animations.',
        image: '/templates/portfolio-preview.jpg',
        price: 49,
        author: {
          name: 'Alex Johnson',
          avatar: '/avatars/alex.jpg'
        }
      });
      setLoading(false);
    }, 1000);
  }, [id]);
  
  const applyCoupon = () => {
    // In a real app, validate the coupon code with an API
    if (couponCode.toLowerCase() === 'welcome20') {
      setCouponApplied(true);
      setDiscount(template ? template.price * 0.2 : 0);
    } else {
      alert('Invalid coupon code');
    }
  };
  
  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    
    if (parts.length) {
      return parts.join(' ');
    } else {
      return value;
    }
  };
  
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCardNumber(formatCardNumber(value));
  };
  
  const handleCardExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    
    if (v.length <= 2) {
      setCardExpiry(v);
    } else {
      setCardExpiry(`${v.substring(0, 2)}/${v.substring(2, 4)}`);
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, process the payment here
    alert('Payment processed successfully!');
    // Redirect to success page or dashboard
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-neon-blue"></div>
      </div>
    );
  }
  
  if (!template) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">Template not found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The template you're looking for doesn't exist or has been removed.</p>
          <Link href="/templates" className="btn-primary">Browse Templates</Link>
        </div>
      </div>
    );
  }
  
  const subtotal = template.price;
  const total = subtotal - discount;
  
  return (
    <div className="min-h-screen pt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">Checkout</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">Complete your purchase</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-heading font-bold mb-6">Payment Method</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="credit-card"
                    name="payment-method"
                    value="credit-card"
                    checked={paymentMethod === 'credit-card'}
                    onChange={() => setPaymentMethod('credit-card')}
                    className="h-4 w-4 text-neon-blue focus:ring-neon-blue border-gray-300"
                  />
                  <label htmlFor="credit-card" className="ml-2 flex items-center">
                    <span className="mr-2">Credit Card</span>
                    <div className="flex space-x-1">
                      <div className="w-8 h-6 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                        <svg className="h-4 w-4 text-blue-600" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M22 4H2c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H2V6h20v12z" />
                          <path d="M7 15h10v2H7z" />
                        </svg>
                      </div>
                      <div className="w-8 h-6 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                        <svg className="h-4 w-4 text-red-600" viewBox="0 0 24 24" fill="currentColor">
                          <circle cx="12" cy="12" r="10" />
                          <circle cx="8" cy="12" r="3" fill="white" />
                          <circle cx="16" cy="12" r="3" fill="white" />
                        </svg>
                      </div>
                      <div className="w-8 h-6 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                        <svg className="h-4 w-4 text-yellow-500" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M22 4H2c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h20c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 14H2V6h20v12z" />
                          <path d="M12 10.99l-1.52-1.52-2.12 2.12L12 15.24l3.64-3.64-2.12-2.12z" />
                        </svg>
                      </div>
                    </div>
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="paypal"
                    name="payment-method"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={() => setPaymentMethod('paypal')}
                    className="h-4 w-4 text-neon-blue focus:ring-neon-blue border-gray-300"
                  />
                  <label htmlFor="paypal" className="ml-2 flex items-center">
                    <span className="mr-2">PayPal</span>
                    <div className="w-8 h-6 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                      <svg className="h-4 w-4 text-blue-800" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 0 0-.794.68l-.04.22-.63 4.876-.03.2a.81.81 0 0 1-.794.68h-2.52a.428.428 0 0 1-.42-.353c-.02-.12.05-.237.111-.343l.059-.1.93-6.57a.25.25 0 0 1 .247-.206h.764c.265 0 .524.062.764.176.24.115.448.282.614.492.166.21.286.452.357.713.07.262.09.535.056.805.798 0 1.5-.145 2.122-.428.622-.282 1.13-.67 1.522-1.16.392-.49.673-1.05.84-1.678.168-.628.224-1.285.168-1.95-.056-.665-.224-1.237-.504-1.713-.28-.476-.644-.838-1.092-1.085-.448-.247-.95-.38-1.512-.38h-4.662c-.224 0-.42.09-.588.27-.168.18-.308.431-.42.752L4.016 18.748a.63.63 0 0 0 .56.795h3.697a.606.606 0 0 0 .592-.512l.672-4.853a.804.804 0 0 1 .794-.68h.5c3.238 0 5.774-1.313 6.514-5.12.246-1.313.182-2.446-.308-3.327a3.34 3.34 0 0 0-.7-.752z" />
                        <path d="M9.826 7.22c.056-.503.246-.927.57-1.273.325-.345.77-.518 1.33-.518h4.662c.56 0 1.063.133 1.51.38.448.248.812.61 1.093 1.086.28.476.448 1.048.504 1.713.056.665 0 1.322-.168 1.95-.168.628-.448 1.19-.84 1.68-.392.49-.9.877-1.522 1.16-.622.282-1.324.427-2.122.427.034-.27.014-.543-.056-.805a2.19 2.19 0 0 0-.357-.713 2.18 2.18 0 0 0-.614-.492 1.89 1.89 0 0 0-.764-.176h-.764a.25.25 0 0 0-.247.206l-.93 6.57c-.01.02-.01.04-.02.061a.428.428 0 0 0 .42.353h2.52a.81.81 0 0 0 .795-.68l.03-.2.63-4.876.04-.22a.805.805 0 0 1 .793-.68h.5c3.238 0 5.774-1.313 6.513-5.12.257-1.313.193-2.447-.299-3.327-.07-.14-.159-.271-.258-.392-.208-.262-.453-.49-.73-.669-.277-.18-.582-.317-.903-.41a5.121 5.121 0 0 0-1.064-.16h-6.12c-.29 0-.57.088-.806.25-.236.163-.413.39-.53.683l-1.438 6.99c-.01.03-.01.06-.01.1a.25.25 0 0 0 .25.25h1.437a.804.804 0 0 0 .793-.68l.04-.22.63-4.876.04-.22a.804.804 0 0 1 .793-.68h.5c.265 0 .524.062.764.176.24.115.448.282.614.492.166.21.286.452.357.713.07.262.09.535.056.805a.25.25 0 0 0 .247-.206l.93-6.57z" />
                      </svg>
                    </div>
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="stripe"
                    name="payment-method"
                    value="stripe"
                    checked={paymentMethod === 'stripe'}
                    onChange={() => setPaymentMethod('stripe')}
                    className="h-4 w-4 text-neon-blue focus:ring-neon-blue border-gray-300"
                  />
                  <label htmlFor="stripe" className="ml-2 flex items-center">
                    <span className="mr-2">Stripe</span>
                    <div className="w-8 h-6 bg-gray-200 dark:bg-gray-700 rounded flex items-center justify-center">
                      <svg className="h-4 w-4 text-purple-600" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M13.479 9.883c-1.626-.604-2.512-1.067-2.512-1.803 0-.622.518-1.034 1.363-1.034 1.555 0 3.152.622 4.247 1.175l.622-3.802c-.865-.398-2.635-.848-4.506-.848-1.522 0-2.789.398-3.693 1.175-.934.795-1.415 1.945-1.415 3.369 0 2.532 1.555 3.621 4.089 4.537 1.626.57 2.169 1.067 2.169 1.768 0 .675-.587 1.103-1.522 1.103-1.209 0-3.221-.604-4.558-1.415l-.622 3.89c1.14.675 3.255 1.243 5.457 1.243 1.59 0 2.927-.364 3.83-1.103 1.002-.813 1.522-1.997 1.522-3.532-.035-2.584-1.59-3.655-4.471-4.723z" />
                        <path d="M19.695 4.59L17.664 17.1c-.173 1.067-.76 1.243-1.59.76l-5.18-3.89 6.82-7.865c.38-.433-.069-.813-.553-.433l-8.446 6.316-3.567-1.175c-.795-.26-.83-.83.173-1.243L19.176 3.35c.76-.295 1.485.26 1.243 1.243h-.724z" />
                      </svg>
                    </div>
                  </label>
                </div>
              </div>
              
              {paymentMethod === 'credit-card' && (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                      placeholder="your@email.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="card-name" className="block text-sm font-medium mb-2">Name on Card</label>
                    <input
                      type="text"
                      id="card-name"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="card-number" className="block text-sm font-medium mb-2">Card Number</label>
                    <input
                      type="text"
                      id="card-number"
                      value={cardNumber}
                      onChange={handleCardNumberChange}
                      required
                      maxLength={19}
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                      placeholder="1234 5678 9012 3456"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="card-expiry" className="block text-sm font-medium mb-2">Expiry Date</label>
                      <input
                        type="text"
                        id="card-expiry"
                        value={cardExpiry}
                        onChange={handleCardExpiryChange}
                        required
                        maxLength={5}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                        placeholder="MM/YY"
                      />
                    </div>
                    <div>
                      <label htmlFor="card-cvc" className="block text-sm font-medium mb-2">CVC</label>
                      <input
                        type="text"
                        id="card-cvc"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value.replace(/\D/g, '').slice(0, 3))}
                        required
                        maxLength={3}
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                        placeholder="123"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="billing-address" className="block text-sm font-medium mb-2">Billing Address</label>
                    <input
                      type="text"
                      id="billing-address"
                      value={billingAddress}
                      onChange={(e) => setBillingAddress(e.target.value)}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                      placeholder="123 Main St"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="city" className="block text-sm font-medium mb-2">City</label>
                      <input
                        type="text"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                        placeholder="New York"
                      />
                    </div>
                    <div>
                      <label htmlFor="zip-code" className="block text-sm font-medium mb-2">ZIP Code</label>
                      <input
                        type="text"
                        id="zip-code"
                        value={zipCode}
                        onChange={(e) => setZipCode(e.target.value)}
                        required
                        className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                        placeholder="10001"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="country" className="block text-sm font-medium mb-2">Country</label>
                    <select
                      id="country"
                      value={country}
                      onChange={(e) => setCountry(e.target.value)}
                      required
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                    >
                      <option value="United States">United States</option>
                      <option value="Canada">Canada</option>
                      <option value="United Kingdom">United Kingdom</option>
                      <option value="Australia">Australia</option>
                      <option value="Germany">Germany</option>
                      <option value="France">France</option>
                      <option value="Japan">Japan</option>
                    </select>
                  </div>
                  
                  <motion.button
                    type="submit"
                    className="w-full btn-primary py-3"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Complete Purchase
                  </motion.button>
                </form>
              )}
              
              {paymentMethod === 'paypal' && (
                <div className="text-center py-8">
                  <p className="mb-6 text-gray-600 dark:text-gray-400">You will be redirected to PayPal to complete your purchase.</p>
                  <motion.button
                    className="w-full btn-primary py-3 bg-blue-600 hover:bg-blue-700"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Pay with PayPal
                  </motion.button>
                </div>
              )}
              
              {paymentMethod === 'stripe' && (
                <div className="text-center py-8">
                  <p className="mb-6 text-gray-600 dark:text-gray-400">You will be redirected to Stripe to complete your purchase.</p>
                  <motion.button
                    className="w-full btn-primary py-3 bg-purple-600 hover:bg-purple-700"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Pay with Stripe
                  </motion.button>
                </div>
              )}
            </div>
          </div>
          
          <div>
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6 mb-6">
              <h2 className="text-2xl font-heading font-bold mb-6">Order Summary</h2>
              
              <div className="flex items-center mb-6">
                <div className="relative w-24 h-24 rounded-lg overflow-hidden mr-4">
                  <Image
                    src={template.image}
                    alt={template.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-heading font-bold">{template.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">{template.description.substring(0, 60)}...</p>
                  <div className="flex items-center">
                    <Image
                      src={template.author.avatar}
                      alt={template.author.name}
                      width={20}
                      height={20}
                      className="rounded-full mr-2"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">by {template.author.name}</span>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-800 pt-4 mb-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                {couponApplied && (
                  <div className="flex justify-between mb-2 text-green-600">
                    <span>Discount (20% off)</span>
                    <span>-${discount.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="flex justify-between font-bold text-lg mt-4">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
              
              <div className="mb-6">
                <div className="flex">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 px-4 py-2 rounded-l-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-neon-blue"
                    disabled={couponApplied}
                  />
                  <button
                    onClick={applyCoupon}
                    className={`px-4 py-2 rounded-r-lg font-medium ${
                      couponApplied
                        ? 'bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400 cursor-not-allowed'
                        : 'bg-neon-blue text-dark hover:bg-opacity-90'
                    }`}
                    disabled={couponApplied}
                  >
                    {couponApplied ? 'Applied' : 'Apply'}
                  </button>
                </div>
                {couponApplied && (
                  <p className="text-sm text-green-600 mt-1">Coupon "WELCOME20" applied successfully!</p>
                )}
              </div>
              
              <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 mb-6">
                <h3 className="font-medium mb-2">What's included:</h3>
                <ul className="space-y-2">
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Full source code</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Documentation</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>6 months of updates</span>
                  </li>
                  <li className="flex items-center">
                    <svg className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Email support</span>
                  </li>
                </ul>
              </div>
              
              <div className="text-sm text-gray-600 dark:text-gray-400">
                <p className="mb-2">By completing this purchase, you agree to our <Link href="/terms" className="text-neon-blue hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-neon-blue hover:underline">Privacy Policy</Link>.</p>
                <p>Need help? <Link href="/contact" className="text-neon-blue hover:underline">Contact our support team</Link>.</p>
              </div>
            </div>
            
            <div className="bg-white dark:bg-gray-900 rounded-xl shadow-lg p-6">
              <h3 className="font-medium mb-4">Secure Checkout</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                We use industry-standard encryption to protect your personal information and payment details.
              </p>
              <div className="flex items-center space-x-2">
                <svg className="h-5 w-5 text-gray-600 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-sm text-gray-600 dark:text-gray-400">Secure SSL Encryption</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
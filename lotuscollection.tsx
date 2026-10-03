import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, Heart, Search, Menu, X, ChevronRight, 
  MapPin, Phone, Instagram, Star, ShieldCheck, Truck, 
  ArrowLeft, Plus, Minus, Check, PlayCircle, Eye
} from 'lucide-react';

// --- CONFIGURATION ---
const WHATSAPP_NUMBER = "ADD_NUMBER_HERE"; // e.g., "919876543210"
const INSTAGRAM_HANDLE = "ADD_HANDLE_HERE"; // e.g., "lotuscollection"
const STORE_ADDRESS = "Bolmaal Galli Corner, Khade Bazar, Shahpur, Belgaum, Karnataka, India";

// --- THEME COLORS (Reference) ---
// Deep Red: #6a040f
// Metallic Gold: #D4AF37
// Warm Cream: #fdfbf7
// Black: #0a0a0a

// --- DUMMY PRODUCT DATA ---
const CATEGORIES = ["All", "Earrings", "Necklaces", "Bangles", "Rings", "Bridal"];
const COLLECTIONS = ["The Golden Classics", "Bridal Royalty", "Everyday Elegance", "Diamond Glow", "Temple Treasures"];

const PRODUCTS = [
  {
    id: 1,
    name: "Royal Kundan Bridal Set",
    price: 45000,
    originalPrice: 55000,
    category: "Bridal",
    collection: "Bridal Royalty",
    image: "https://images.unsplash.com/photo-1599643478524-fb66f7220023?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1599643478524-fb66f7220023?auto=format&fit=crop&q=80&w=800",
      "https://images.unsplash.com/photo-1599643477839-a937a05ebf36?auto=format&fit=crop&q=80&w=800"
    ],
    description: "An exquisite 1 gram gold bridal set featuring intricate Kundan work, perfect for your special day. Includes a majestic choker, long haram, earrings, and maang tikka.",
    isNew: true,
    isBestseller: true,
    material: "1 Gram Gold Plated, Kundan, Pearls"
  },
  {
    id: 2,
    name: "Classic Antique Jhumkas",
    price: 3200,
    originalPrice: 4000,
    category: "Earrings",
    collection: "Temple Treasures",
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Traditional temple design jhumkas with a beautiful antique finish, adorned with ruby red stones and pearl drops.",
    isNew: false,
    isBestseller: true,
    material: "Antique Gold Polish, Semi-precious stones"
  },
  {
    id: 3,
    name: "American Diamond Solitaire Ring",
    price: 1800,
    originalPrice: 2500,
    category: "Rings",
    collection: "Diamond Glow",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b2548e?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b2548e?auto=format&fit=crop&q=80&w=800"
    ],
    description: "A stunning modern solitaire ring featuring a brilliant American Diamond, crafted for elegance and everyday wear.",
    isNew: true,
    isBestseller: false,
    material: "Rhodium Plated, American Diamonds"
  },
  {
    id: 4,
    name: "Lakshmi Coin Bangles Set",
    price: 4500,
    originalPrice: 5000,
    category: "Bangles",
    collection: "The Golden Classics",
    image: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Set of 2 beautifully crafted bangles featuring Goddess Lakshmi motifs, perfect for festivals and traditional occasions.",
    isNew: false,
    isBestseller: true,
    material: "1 Gram Gold Plated"
  },
  {
    id: 5,
    name: "Emerald Drop Choker",
    price: 8500,
    originalPrice: 10000,
    category: "Necklaces",
    collection: "Everyday Elegance",
    image: "https://images.unsplash.com/photo-1599643477839-a937a05ebf36?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1599643477839-a937a05ebf36?auto=format&fit=crop&q=80&w=800"
    ],
    description: "A delicate choker necklace studded with emerald green stones and fine American diamonds.",
    isNew: true,
    isBestseller: false,
    material: "Gold Finish, Emerald Simulants"
  },
  {
    id: 6,
    name: "Meenakari Chandbali",
    price: 2800,
    originalPrice: 3500,
    category: "Earrings",
    collection: "The Golden Classics",
    image: "https://images.unsplash.com/photo-1632731057404-516d2baee6db?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1632731057404-516d2baee6db?auto=format&fit=crop&q=80&w=800"
    ],
    description: "Hand-painted meenakari chandbalis combining traditional art with contemporary design.",
    isNew: false,
    isBestseller: false,
    material: "Brass, Enamel, Pearls"
  },
  {
    id: 7,
    name: "Rose Gold Floral Ring",
    price: 1500,
    originalPrice: null,
    category: "Rings",
    collection: "Everyday Elegance",
    image: "https://images.unsplash.com/photo-1605100804763-247f67b2548e?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b2548e?auto=format&fit=crop&q=80&w=800"
    ],
    description: "A delicate rose gold plated ring with a floral motif, ideal for casual wear or gifting.",
    isNew: true,
    isBestseller: false,
    material: "Rose Gold Plated, Zirconia"
  },
  {
    id: 8,
    name: "Temple Motif Long Haram",
    price: 12000,
    originalPrice: 15000,
    category: "Necklaces",
    collection: "Temple Treasures",
    image: "https://images.unsplash.com/photo-1599643478524-fb66f7220023?auto=format&fit=crop&q=80&w=800",
    images: [
      "https://images.unsplash.com/photo-1599643478524-fb66f7220023?auto=format&fit=crop&q=80&w=800"
    ],
    description: "A magnificent long necklace featuring elaborate temple carvings, a statement piece for South Indian weddings.",
    isNew: false,
    isBestseller: true,
    material: "Antique Gold Finish"
  }
];

// --- HOOKS ---
const useLocalStorage = (key, initialValue) => {
  const [value, setValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(error);
    }
  }, [key, value]);

  return [value, setValue];
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);
};

// --- MAIN COMPONENT ---
export default function App() {
  // Navigation State
  const [currentView, setCurrentView] = useState('home'); // 'home', 'shop', 'product'
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  // UI State
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Commerce State
  const [cart, setCart] = useLocalStorage('lotus_cart', []);
  const [wishlist, setWishlist] = useLocalStorage('lotus_wishlist', []);
  const [toastMessage, setToastMessage] = useState(null);

  // Scroll listener for Navbar
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toast helper
  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Cart & Wishlist Logic
  const addToCart = (product, quantity = 1) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item);
      }
      return [...prev, { ...product, quantity }];
    });
    showToast(`${product.name} added to cart`);
  };

  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
  
  const updateCartQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const toggleWishlist = (product) => {
    setWishlist(prev => {
      const exists = prev.some(item => item.id === product.id);
      if (exists) {
        showToast(`Removed from wishlist`);
        return prev.filter(item => item.id !== product.id);
      }
      showToast(`Added to wishlist`);
      return [...prev, product];
    });
  };

  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // Navigation Helper
  const navigateTo = (view, product = null) => {
    setCurrentView(view);
    if (product) setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  const handleWhatsAppEnquiry = (product = null) => {
    let message = "Hello Lotus Collection, ";
    if (product) {
      message += `I am interested in the *${product.name}* (${formatPrice(product.price)}). Please share more details.`;
    } else {
      message += `I would like to place an order for my cart items.\n\n`;
      cart.forEach(item => {
        message += `- ${item.name} x${item.quantity} (${formatPrice(item.price * item.quantity)})\n`;
      });
      message += `\n*Total: ${formatPrice(cartTotal)}*`;
    }
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] text-[#0a0a0a] font-sans selection:bg-[#D4AF37] selection:text-white">
      {/* Toast Notification */}
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 50, x: '-50%' }}
            className="fixed bottom-8 left-1/2 z-50 bg-[#0a0a0a] text-[#fdfbf7] px-6 py-3 rounded-full shadow-2xl shadow-[#D4AF37]/20 border border-[#D4AF37]/30 flex items-center gap-3"
          >
            <Check size={18} className="text-[#D4AF37]" />
            <span className="text-sm font-medium tracking-wide">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation Bar */}
      <nav className={`fixed w-full z-40 transition-all duration-500 ${isScrolled ? 'bg-[#fdfbf7]/95 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-6'} ${currentView === 'home' && !isScrolled ? 'text-white' : 'text-[#0a0a0a]'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Mobile Menu Toggle */}
          <button onClick={() => setIsMenuOpen(true)} className="md:hidden">
            <Menu size={24} />
          </button>

          {/* Logo */}
          <div 
            onClick={() => navigateTo('home')}
            className="cursor-pointer flex items-center justify-center flex-1 md:flex-none" 
> 
  <img 
       src="https://i.imgur.com/KrhDMkU.png" 
       alt="Lotus Collection" 
       className="h-10 md:h-12 w-auto object-contain" 
  /> 
</div>
          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-widest uppercase">
            <button onClick={() => navigateTo('home')} className="hover:text-[#D4AF37] transition-colors">Home</button>
            <button onClick={() => navigateTo('shop')} className="hover:text-[#D4AF37] transition-colors">Shop</button>
            <button onClick={() => { navigateTo('shop'); /* Implement scroll to collection later if needed */ }} className="hover:text-[#D4AF37] transition-colors">Collections</button>
            <button onClick={() => window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'})} className="hover:text-[#D4AF37] transition-colors">Contact</button>
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4 md:gap-6">
            <button onClick={() => setIsSearchOpen(true)} className="hover:text-[#D4AF37] transition-colors">
              <Search size={20} />
            </button>
            <button onClick={() => setIsWishlistOpen(true)} className="relative hover:text-[#D4AF37] transition-colors hidden md:block">
              <Heart size={20} />
              {wishlist.length > 0 && <span className="absolute -top-2 -right-2 bg-[#6a040f] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">{wishlist.length}</span>}
            </button>
            <button onClick={() => setIsCartOpen(true)} className="relative hover:text-[#D4AF37] transition-colors">
              <ShoppingBag size={20} />
              {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-[#D4AF37] text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full">{cart.reduce((a,b) => a+b.quantity, 0)}</span>}
            </button>
          </div>
        </div>
      </nav>

      {/* Search Overlay */}
      <AnimatePresence>
        {isSearchOpen && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#fdfbf7]/95 backdrop-blur-md flex flex-col items-center justify-center p-4"
          >
            <button onClick={() => setIsSearchOpen(false)} className="absolute top-8 right-8 text-[#0a0a0a] hover:text-[#D4AF37]"><X size={32} /></button>
            <div className="w-full max-w-2xl">
              <div className="relative border-b-2 border-[#D4AF37]">
                <Search size={24} className="absolute left-0 top-1/2 -translate-y-1/2 text-[#D4AF37]" />
                <input 
                  type="text" 
                  placeholder="Search for jewellery..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-2xl md:text-4xl py-4 pl-12 pr-4 outline-none text-[#0a0a0a] placeholder:text-gray-400 font-serif"
                  autoFocus
                />
              </div>
              <p className="mt-4 text-gray-500 tracking-wider uppercase text-sm">Press Enter to search</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Drawers (Cart & Wishlist) */}
      <Drawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} title="Your Cart">
        {cart.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-4">
            <ShoppingBag size={48} className="opacity-20" />
            <p className="uppercase tracking-widest text-sm">Your cart is empty</p>
            <button onClick={() => {setIsCartOpen(false); navigateTo('shop');}} className="mt-4 bg-[#6a040f] text-[#fdfbf7] px-8 py-3 tracking-widest text-sm uppercase hover:bg-[#50030b] transition-colors">Start Shopping</button>
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <div className="flex-1 overflow-y-auto py-4 space-y-6">
              {cart.map(item => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="w-20 h-20 bg-gray-100 rounded-sm overflow-hidden border border-gray-200">
                    <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-serif text-sm">{item.name}</h4>
                    <p className="text-[#D4AF37] text-sm font-medium mt-1">{formatPrice(item.price)}</p>
                    <div className="flex items-center gap-3 mt-2 border border-gray-200 w-max px-2 py-1">
                      <button onClick={() => updateCartQuantity(item.id, -1)} className="text-gray-500 hover:text-[#0a0a0a]"><Minus size={14}/></button>
                      <span className="text-sm w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateCartQuantity(item.id, 1)} className="text-gray-500 hover:text-[#0a0a0a]"><Plus size={14}/></button>
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500 p-2"><X size={18}/></button>
                </div>
              ))}
            </div>
            <div className="pt-6 border-t border-gray-200 mt-4">
              <div className="flex justify-between items-center mb-6 text-lg font-serif">
                <span>Subtotal</span>
                <span className="text-[#6a040f] font-bold">{formatPrice(cartTotal)}</span>
              </div>
              <button 
                onClick={() => handleWhatsAppEnquiry()}
                className="w-full bg-[#6a040f] text-[#fdfbf7] py-4 uppercase tracking-widest text-sm hover:bg-[#D4AF37] transition-colors flex items-center justify-center gap-2"
              >
                Checkout via WhatsApp
              </button>
            </div>
          </div>
        )}
      </Drawer>

      <Drawer isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} title="Your Wishlist">
        {wishlist.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500 gap-4">
            <Heart size={48} className="opacity-20" />
            <p className="uppercase tracking-widest text-sm">Your wishlist is empty</p>
          </div>
        ) : (
          <div className="flex flex-col h-full overflow-y-auto py-4 space-y-6">
            {wishlist.map(item => (
              <div key={item.id} className="flex gap-4 items-center">
                <div className="w-20 h-20 bg-gray-100 rounded-sm overflow-hidden border border-gray-200">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <h4 className="font-serif text-sm">{item.name}</h4>
                  <p className="text-[#D4AF37] text-sm font-medium mt-1">{formatPrice(item.price)}</p>
                  <button 
                    onClick={() => { addToCart(item); toggleWishlist(item); }}
                    className="text-xs uppercase tracking-wider text-[#6a040f] mt-2 underline"
                  >
                    Move to Cart
                  </button>
                </div>
                <button onClick={() => toggleWishlist(item)} className="text-gray-400 hover:text-red-500 p-2"><X size={18}/></button>
              </div>
            ))}
          </div>
        )}
      </Drawer>

      {/* Main Content Area */}
      <main className="pt-0">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <HomeView navigateTo={navigateTo} toggleWishlist={toggleWishlist} addToCart={addToCart} wishlist={wishlist} />
            </motion.div>
          )}
          {currentView === 'shop' && (
            <motion.div key="shop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <ShopView navigateTo={navigateTo} toggleWishlist={toggleWishlist} addToCart={addToCart} wishlist={wishlist} />
            </motion.div>
          )}
          {currentView === 'product' && selectedProduct && (
            <motion.div key="product" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <ProductDetailView 
                product={selectedProduct} 
                addToCart={addToCart} 
                toggleWishlist={toggleWishlist} 
                wishlist={wishlist}
                handleWhatsAppEnquiry={handleWhatsAppEnquiry}
                onBack={() => navigateTo('shop')}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating WhatsApp Button */}
      <a 
        href={`https://wa.me/${WHATSAPP_NUMBER}?text=Hello%20Lotus%20Collection,%20I%20am%20interested%20in%20your%20jewellery%20collection.`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform flex items-center justify-center group"
      >
        <Phone size={24} />
        <span className="absolute right-full mr-4 bg-white text-[#0a0a0a] text-sm font-medium py-1 px-3 rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Chat with us</span>
      </a>
    </div>
  );
}

// --- HOME VIEW ---
function HomeView({ navigateTo, toggleWishlist, addToCart, wishlist }) {
  return (
    <div>
      {/* Cinematic Hero */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-[#0a0a0a]">
        {/* Background Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-[#0a0a0a] z-10" />
        
        {/* Animated 3D-like Jewelry Background (Simulated) */}
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.6 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute inset-0 z-0"
        >
          <img src="https://images.unsplash.com/photo-1599643478524-fb66f7220023?auto=format&fit=crop&q=80&w=2000" alt="Luxury Jewellery" className="w-full h-full object-cover blur-[2px]" />
        </motion.div>

        {/* Floating Particles/Glows */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
           <motion.div 
             animate={{ y: [-20, 20, -20], opacity: [0.3, 0.6, 0.3] }} 
             transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
             className="absolute top-1/4 left-1/4 w-64 h-64 bg-[#D4AF37]/20 rounded-full blur-[100px]" 
           />
           <motion.div 
             animate={{ y: [20, -20, 20], opacity: [0.2, 0.5, 0.2] }} 
             transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
             className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#6a040f]/30 rounded-full blur-[120px]" 
           />
        </div>

        {/* Hero Content */}
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto mt-20">
          <motion.p 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8 }}
            className="text-[#D4AF37] uppercase tracking-[0.3em] text-sm md:text-base font-medium mb-6"
          >
            Welcome to
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif text-[#fdfbf7] mb-6 uppercase tracking-wider"
          >
            Lotus Collection
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1, duration: 1 }}
            className="text-lg md:text-2xl text-gray-300 font-light mb-12 font-serif italic"
          >
            “Timeless Jewellery. Made to Shine.”
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.8 }}
            className="flex flex-col sm:flex-row gap-6 justify-center"
          >
            <button onClick={() => navigateTo('shop')} className="bg-[#D4AF37] text-[#0a0a0a] px-8 py-4 uppercase tracking-widest text-sm font-semibold hover:bg-[#fdfbf7] hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(212,175,55,0.4)]">
              Shop Collection
            </button>
            <button onClick={() => { document.getElementById('collections').scrollIntoView({behavior: 'smooth'})}} className="bg-transparent border border-[#D4AF37] text-[#D4AF37] px-8 py-4 uppercase tracking-widest text-sm font-semibold hover:bg-[#D4AF37] hover:text-[#0a0a0a] transition-all duration-300">
              Explore Jewellery
            </button>
          </motion.div>
        </div>
      </section>

      {/* Collections Section */}
      <section id="collections" className="py-24 bg-[#fdfbf7]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <SectionHeader title="Our Collections" subtitle="Discover elegant categories" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            {COLLECTIONS.slice(0,3).map((coll, idx) => (
              <motion.div 
                key={coll}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                whileHover={{ scale: 1.02, rotateY: 5, rotateX: 5 }}
                className="group relative h-[400px] cursor-pointer overflow-hidden shadow-lg border border-gray-100 perspective-1000"
                onClick={() => navigateTo('shop')}
              >
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors duration-500 z-10" />
                <img 
                  src={PRODUCTS.find(p => p.collection === coll)?.image || PRODUCTS[idx].image} 
                  alt={coll} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                />
                <div className="absolute bottom-8 left-8 right-8 z-20 text-center">
                  <h3 className="text-2xl font-serif text-white uppercase tracking-wider mb-2">{coll}</h3>
                  <div className="w-12 h-[2px] bg-[#D4AF37] mx-auto group-hover:w-24 transition-all duration-500" />
                </div>
                {/* Subtle Gold Glow on Hover */}
                <div className="absolute inset-0 shadow-[inset_0_0_50px_rgba(212,175,55,0)] group-hover:shadow-[inset_0_0_50px_rgba(212,175,55,0.3)] transition-all duration-500 z-10 pointer-events-none" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-[#0a0a0a] text-[#fdfbf7]">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="flex justify-between items-end mb-16">
            <SectionHeader title="Featured Jewellery" subtitle="Handpicked for you" dark />
            <button onClick={() => navigateTo('shop')} className="hidden md:flex items-center gap-2 text-[#D4AF37] hover:text-white uppercase tracking-widest text-sm transition-colors">
              View All <ChevronRight size={16} />
            </button>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {PRODUCTS.filter(p => p.isBestseller).map((product, idx) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                delay={idx * 0.1} 
                onClick={() => navigateTo('product', product)}
                onWishlist={() => toggleWishlist(product)}
                onAdd={() => addToCart(product)}
                isWishlisted={wishlist.some(w => w.id === product.id)}
                dark
              />
            ))}
          </div>
          <div className="mt-12 text-center md:hidden">
             <button onClick={() => navigateTo('shop')} className="border border-[#D4AF37] text-[#D4AF37] px-8 py-3 uppercase tracking-widest text-sm hover:bg-[#D4AF37] hover:text-[#0a0a0a] transition-colors">
              View All
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-24 bg-[#6a040f] text-[#fdfbf7] overflow-hidden relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#D4AF37] rounded-full blur-[150px] opacity-20 pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 md:px-8 grid md:grid-cols-2 gap-16 items-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-serif uppercase tracking-wider">About Lotus Collection</h2>
            <div className="w-16 h-1 bg-[#D4AF37]" />
            <p className="text-lg text-[#fdfbf7]/90 leading-relaxed font-light">
              LOTUS COLLECTION brings together timeless Indian jewellery with a modern sense of elegance. From traditional designs to contemporary styles, every piece is selected to add beauty, confidence and a touch of luxury to every occasion.
            </p>
            <ul className="space-y-3 font-serif italic text-xl">
              <li className="flex items-center gap-3"><Star size={16} className="text-[#D4AF37]"/> 1 Gram Gold & American Diamond</li>
              <li className="flex items-center gap-3"><Star size={16} className="text-[#D4AF37]"/> Premium Bridal Jewellery</li>
              <li className="flex items-center gap-3"><Star size={16} className="text-[#D4AF37]"/> Traditional & Modern Designs</li>
            </ul>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            className="relative h-[500px]"
          >
            <div className="absolute inset-0 border-2 border-[#D4AF37] translate-x-4 translate-y-4" />
            <img src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=800" alt="About us" className="absolute inset-0 w-full h-full object-cover z-10 shadow-2xl" />
          </motion.div>
        </div>
      </section>
    </div>
  );
}

// --- SHOP VIEW ---
function ShopView({ navigateTo, toggleWishlist, addToCart, wishlist }) {
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const filteredProducts = useMemo(() => {
    let res = [...PRODUCTS];
    if (activeCategory !== "All") res = res.filter(p => p.category === activeCategory);
    
    if (sortBy === "lowHigh") res.sort((a,b) => a.price - b.price);
    if (sortBy === "highLow") res.sort((a,b) => b.price - a.price);
    if (sortBy === "newest") res.sort((a,b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
    
    return res;
  }, [activeCategory, sortBy]);

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <h1 className="text-4xl md:text-5xl font-serif text-center uppercase tracking-wider mb-4 text-[#6a040f]">The Collection</h1>
        <div className="w-16 h-[2px] bg-[#D4AF37] mx-auto mb-12" />

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-4">
            {CATEGORIES.map(cat => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2 rounded-full border text-sm uppercase tracking-widest transition-all ${activeCategory === cat ? 'bg-[#6a040f] text-white border-[#6a040f]' : 'bg-transparent text-[#0a0a0a] border-gray-300 hover:border-[#D4AF37]'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sorting */}
          <select 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-transparent border-b border-[#0a0a0a] py-2 pr-8 text-sm uppercase tracking-widest outline-none focus:border-[#D4AF37] cursor-pointer"
          >
            <option value="featured">Featured</option>
            <option value="newest">New Arrivals</option>
            <option value="lowHigh">Price: Low to High</option>
            <option value="highLow">Price: High to Low</option>
          </select>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-12">
          <AnimatePresence>
            {filteredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ProductCard 
                  product={product}
                  onClick={() => navigateTo('product', product)}
                  onWishlist={() => toggleWishlist(product)}
                  onAdd={() => addToCart(product)}
                  isWishlisted={wishlist.some(w => w.id === product.id)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
        
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            <p className="text-xl font-serif">No products found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
}

// --- PRODUCT DETAIL VIEW ---
function ProductDetailView({ product, addToCart, toggleWishlist, wishlist, handleWhatsAppEnquiry, onBack }) {
  const [activeImage, setActiveImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [show3DViewer, setShow3DViewer] = useState(false); // Placeholder state

  return (
    <div className="pt-28 pb-24 bg-[#fdfbf7] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <button onClick={onBack} className="flex items-center gap-2 text-gray-500 hover:text-[#6a040f] uppercase tracking-widest text-xs font-semibold mb-8 transition-colors">
          <ArrowLeft size={16} /> Back to Shop
        </button>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
          {/* Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-[4/5] bg-gray-100 overflow-hidden group">
              <img 
                src={product.images[activeImage] || product.image} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 cursor-zoom-in"
              />
              <button 
                onClick={() => setShow3DViewer(true)}
                className="absolute bottom-4 left-4 bg-white/90 backdrop-blur text-[#0a0a0a] px-4 py-2 text-xs uppercase tracking-widest font-semibold flex items-center gap-2 shadow-lg hover:bg-[#D4AF37] hover:text-white transition-colors"
              >
                <PlayCircle size={16} /> View in 3D
              </button>
            </div>
            {product.images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {product.images.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setActiveImage(idx)}
                    className={`flex-shrink-0 w-24 h-24 border-2 transition-colors ${activeImage === idx ? 'border-[#D4AF37]' : 'border-transparent hover:border-gray-300'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div className="flex flex-col">
            <div className="mb-2 flex items-center gap-3 text-xs uppercase tracking-widest text-gray-500 font-semibold">
              <span>{product.category}</span>
              <span className="w-1 h-1 bg-[#D4AF37] rounded-full" />
              <span>{product.collection}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-serif text-[#0a0a0a] mb-4">{product.name}</h1>
            
            <div className="flex items-end gap-4 mb-6 border-b border-gray-200 pb-6">
              <span className="text-3xl font-medium text-[#6a040f]">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="text-xl text-gray-400 line-through mb-1">{formatPrice(product.originalPrice)}</span>
              )}
            </div>

            <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

            <div className="mb-8 p-4 bg-[#f4ebd9]/50 border border-[#D4AF37]/20 rounded flex flex-col gap-2">
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold uppercase tracking-wider w-24">Material:</span>
                <span className="text-gray-700">{product.material}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-semibold uppercase tracking-wider w-24">Status:</span>
                <span className="text-[#25D366] flex items-center gap-1"><Check size={14}/> In Stock</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-4 mt-auto">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#0a0a0a] h-14">
                  <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-4 text-gray-500 hover:text-[#0a0a0a]"><Minus size={18}/></button>
                  <span className="w-8 text-center font-medium">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-4 text-gray-500 hover:text-[#0a0a0a]"><Plus size={18}/></button>
                </div>
                <button 
                  onClick={() => addToCart(product, quantity)}
                  className="flex-1 bg-[#6a040f] text-[#fdfbf7] h-14 uppercase tracking-widest text-sm font-semibold hover:bg-[#0a0a0a] transition-colors"
                >
                  Add to Cart
                </button>
                <button 
                  onClick={() => toggleWishlist(product)}
                  className={`h-14 w-14 flex items-center justify-center border transition-colors ${wishlist.some(w => w.id === product.id) ? 'border-[#6a040f] bg-[#6a040f] text-white' : 'border-[#0a0a0a] text-[#0a0a0a] hover:border-[#D4AF37] hover:text-[#D4AF37]'}`}
                >
                  <Heart size={24} fill={wishlist.some(w => w.id === product.id) ? "currentColor" : "none"} />
                </button>
              </div>
              
              <button 
                onClick={() => handleWhatsAppEnquiry(product)}
                className="w-full bg-[#25D366] text-white h-14 uppercase tracking-widest text-sm font-semibold hover:bg-[#1DA851] transition-colors flex items-center justify-center gap-2"
              >
                <Phone size={18} /> Buy / Enquire on WhatsApp
              </button>
            </div>

            {/* Trust Badges */}
            <div className="flex justify-between border-t border-gray-200 mt-10 pt-6">
              <div className="flex flex-col items-center text-center gap-2 text-gray-500">
                <ShieldCheck size={24} className="text-[#D4AF37]" />
                <span className="text-xs uppercase tracking-wider">Premium<br/>Quality</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 text-gray-500">
                <Truck size={24} className="text-[#D4AF37]" />
                <span className="text-xs uppercase tracking-wider">Secure<br/>Shipping</span>
              </div>
              <div className="flex flex-col items-center text-center gap-2 text-gray-500">
                <Star size={24} className="text-[#D4AF37]" />
                <span className="text-xs uppercase tracking-wider">Authentic<br/>Design</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3D Viewer Modal Placeholder */}
      <AnimatePresence>
        {show3DViewer && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex flex-col items-center justify-center p-4"
          >
            <button onClick={() => setShow3DViewer(false)} className="absolute top-8 right-8 text-white hover:text-[#D4AF37] z-10"><X size={32} /></button>
            <div className="text-center text-white space-y-4 max-w-md relative z-10">
              <div className="w-32 h-32 border-4 border-t-[#D4AF37] border-white/20 rounded-full animate-spin mx-auto mb-8" />
              <h3 className="text-2xl font-serif">3D Viewer Loading...</h3>
              <p className="text-gray-400 text-sm">In a production environment, this overlay would initialize a Three.js / @react-three/fiber canvas to display the .GLB/.GLTF model of: <br/><strong className="text-[#D4AF37]">{product.name}</strong></p>
            </div>
            
            {/* Cinematic Background for 3D fake */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#D4AF37]/10 to-transparent pointer-events-none" />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- REUSABLE COMPONENTS ---
function ProductCard({ product, onClick, onWishlist, onAdd, isWishlisted, dark = false, delay = 0 }) {
  const textColor = dark ? 'text-white' : 'text-[#0a0a0a]';
  const cardBg = dark ? 'bg-[#111]' : 'bg-white';
  const borderColor = dark ? 'border-gray-800' : 'border-transparent';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className={`group relative flex flex-col ${cardBg} border ${borderColor} hover:border-[#D4AF37]/50 transition-all duration-300 rounded-sm overflow-hidden`}
    >
      {/* Badges */}
      <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
        {product.isNew && <span className="bg-[#D4AF37] text-white text-[10px] uppercase tracking-widest px-2 py-1 font-bold">New</span>}
        {product.originalPrice && <span className="bg-[#6a040f] text-white text-[10px] uppercase tracking-widest px-2 py-1 font-bold">Sale</span>}
      </div>

      {/* Wishlist Toggle */}
      <button 
        onClick={(e) => { e.stopPropagation(); onWishlist(); }}
        className="absolute top-3 right-3 z-10 p-2 bg-white/80 backdrop-blur rounded-full text-[#0a0a0a] hover:text-[#6a040f] transition-colors shadow-sm"
      >
        <Heart size={16} fill={isWishlisted ? "#6a040f" : "none"} className={isWishlisted ? "text-[#6a040f]" : ""} />
      </button>

      {/* Image Container */}
      <div className="relative aspect-[4/5] overflow-hidden bg-gray-100 cursor-pointer" onClick={onClick}>
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Quick actions overlay */}
        <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-gradient-to-t from-black/60 to-transparent flex justify-center">
          <button 
            onClick={(e) => { e.stopPropagation(); onAdd(); }}
            className="bg-[#D4AF37] text-[#0a0a0a] px-6 py-2 uppercase tracking-widest text-xs font-bold hover:bg-white transition-colors"
          >
            Add to Cart
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex flex-col flex-1 cursor-pointer" onClick={onClick}>
        <p className="text-[10px] uppercase tracking-widest text-gray-500 mb-1">{product.category}</p>
        <h3 className={`font-serif text-lg mb-2 ${textColor} line-clamp-1`}>{product.name}</h3>
        <div className="mt-auto flex items-center gap-3">
          <span className="font-semibold text-[#D4AF37]">{formatPrice(product.price)}</span>
          {product.originalPrice && <span className="text-xs text-gray-400 line-through">{formatPrice(product.originalPrice)}</span>}
        </div>
      </div>
    </motion.div>
  );
}

function SectionHeader({ title, subtitle, dark = false }) {
  return (
    <div className={`text-center max-w-2xl mx-auto ${dark ? 'text-white' : 'text-[#0a0a0a]'}`}>
      <motion.p 
        initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        className="text-[#D4AF37] uppercase tracking-[0.2em] text-sm font-semibold mb-4"
      >
        {subtitle}
      </motion.p>
      <motion.h2 
        initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
        className="text-3xl md:text-5xl font-serif uppercase tracking-wider mb-6"
      >
        {title}
      </motion.h2>
      <motion.div 
        initial={{ width: 0 }} whileInView={{ width: '4rem' }} viewport={{ once: true }} transition={{ delay: 0.2, duration: 0.8 }}
        className="h-[2px] bg-[#D4AF37] mx-auto"
      />
    </div>
  );
}

function Drawer({ isOpen, onClose, title, children }) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={onClose}
          />
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'tween', duration: 0.3 }}
            className="fixed inset-y-0 right-0 w-full max-w-md bg-[#fdfbf7] shadow-2xl z-50 flex flex-col border-l border-[#D4AF37]/20"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-200">
              <h2 className="text-2xl font-serif uppercase tracking-wider text-[#0a0a0a]">{title}</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-[#6a040f] transition-colors"><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-hidden p-6">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0a0a0a] text-gray-300 pt-20 pb-10 border-t border-[#D4AF37]/30">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <h3 className="text-2xl font-serif uppercase tracking-widest text-[#D4AF37]">Lotus Collection</h3>
            <p className="text-sm leading-relaxed text-gray-400">
              Timeless Indian jewellery designed for the modern woman. Experience the luxury of 1 gram gold, American diamonds, and intricate bridal collections.
            </p>
            <div className="flex gap-4">
              <a href={`https://instagram.com/${INSTAGRAM_HANDLE}`} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center hover:bg-[#D4AF37] hover:text-[#0a0a0a] hover:border-[#D4AF37] transition-all">
                <Instagram size={18} />
              </a>
              {/* Add other socials as needed */}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white uppercase tracking-widest text-sm font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Home</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Shop All</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Bridal Collection</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="text-white uppercase tracking-widest text-sm font-semibold mb-6">Customer Care</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Shipping Information</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Returns & Exchanges</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Jewellery Care</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Terms of Service</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white uppercase tracking-widest text-sm font-semibold mb-6">Visit Our Store</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-[#D4AF37] mt-1 shrink-0" />
                <span className="leading-relaxed">{STORE_ADDRESS}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-[#D4AF37] shrink-0" />
                <span>+91 {WHATSAPP_NUMBER === "ADD_NUMBER_HERE" ? "7996957565, 7996953111" : WHATSAPP_NUMBER}</span>
              </li>
            </ul>
            <a 
              href="https://maps.google.com/?q=Bolmaal+Galli+Corner,+Khade+Bazar,+Shahpur,+Belgaum" 
              target="_blank" rel="noreferrer"
              className="inline-block mt-6 border-b border-[#D4AF37] text-[#D4AF37] uppercase tracking-widest text-xs pb-1 hover:text-white hover:border-white transition-colors"
            >
              Get Directions
            </a>
          </div>
        </div>

        <div className="text-center border-t border-gray-800 pt-8 text-xs text-gray-500 uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Lotus Collection. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

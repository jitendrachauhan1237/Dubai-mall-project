import { motion } from 'framer-motion';

const brands = [
  { 
    name: 'Louis Vuitton', 
    type: 'Fashion', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/76/Louis_Vuitton_logo_and_wordmark.svg/250px-Louis_Vuitton_logo_and_wordmark.svg.png', // Local path or optimized URL
    bgImage: 'https://mygemma.com/cdn/shop/articles/Copy_of_myGemma_Blog_Featured_Image-25_3de014f1-c684-4d1a-8f34-da19b427265f.png?v=1696262514', // Premium store/product shot
    description: 'Luxury fashion and accessories', 
    size: 'large' 
  },
  { 
    name: 'Gucci', 
    type: 'Heritage', 
    logo: 'https://www.pngall.com/wp-content/uploads/13/Gucci-Logo-PNG-Clipart.png',
    bgImage: 'https://media.gq.com/photos/5f7b495f42eaff594a28939a/16:9/w_2560%2Cc_limit/1-gucci-gets-into-the-resale-game-with-the-real-real-gq-october-2020.jpg',
    description: 'Italian luxury brand', 
    size: 'small' 
  },
  { 
    name: 'Rolex', 
    type: 'Timepieces', 
    logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f4/Logo_da_Rolex.png/1280px-Logo_da_Rolex.png',
    bgImage: 'https://revolutionwatch.com/wp-content/uploads/2024/04/Rolex-mobile-banner.jpg',
    description: 'Swiss luxury watchmaker', 
    size: 'small' 
  },
  { 
    name: 'Tiffany & Co.', 
    type: 'Jewelry', 
    logo: 'https://www.pngplay.com/wp-content/uploads/9/Tiffany-Logo-PNG-HD-Quality.png',
    bgImage: 'https://media.tiffany.com/is/image/tiffanydm/2025_BlueBox_WOTBlueBoxLP_FWMH_1_Desktop?$tile$&wid=2992',
    description: 'American luxury jewelry', 
    size: 'large' 
  },
  // Add more brands here following the same structure
];

export function Retail({ isReady = false }) {
  return (
    <section id="retail" className="py-32 bg-[#0a0a0a] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* Header - No changes here, kept the premium B2B flow */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-24">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="text-[10px] font-bold tracking-[0.8em] text-white/50 uppercase block mb-6">
              The Commercial Stage
            </span>
            <h2 className="text-6xl md:text-8xl font-serif leading-[0.9] tracking-tighter italic">
              Luxury <br /> <span className="not-italic text-slate-400">Partners</span>
            </h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 1 }}
            className="space-y-8 border-l border-white/10 pl-10"
          >
            <p className="text-xl text-slate-400 font-light leading-relaxed">
              Position your brand alongside the world's most iconic maisons. We provide the infrastructure for <span className="text-white">heritage launches</span> and high-impact storytelling.
            </p>
            
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
              <div>
                <p className="text-4xl font-serif">200+</p>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-2">Flagship Stores</p>
              </div>
              <div>
                <p className="text-4xl font-serif">98%</p>
                <p className="text-[10px] uppercase tracking-widest text-slate-500 mt-2">Occupancy Rate</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Dynamic Brand Grid - Images/Logos Integrated */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {brands.map((brand, index) => (
            <BrandCard key={brand.name} brand={brand} index={index} isReady={isReady} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BrandCard({ brand, index }) {
  const isLarge = brand.size === 'large';

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className={`group relative overflow-hidden bg-[#111] border border-white/5 rounded-sm cursor-pointer ${
        isLarge ? 'md:col-span-2 aspect-[16/9]' : 'aspect-[4/5]'
      }`}
    >
      {/* Background Image - Revealed on Hover */}
      <img 
        src={brand.bgImage} 
        alt={brand.name}
        loading="lazy"
        decoding="async"
        width="800"
        height="600"
        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-40 transition-opacity duration-1000 scale-110 group-hover:scale-100 transform-gpu"
      />
      
      {/* Visual Container: Content on top of background */}
      <div className="absolute inset-0 p-10 flex flex-col justify-between z-10">
        <div className="flex justify-between items-start">
          <span className="text-[10px] tracking-[0.4em] uppercase text-slate-500 group-hover:text-white transition-colors">
            {brand.type}
          </span>
          {/* Status Dot */}
          <div className="w-2 h-2 rounded-full bg-white/20 group-hover:bg-white transition-all scale-0 group-hover:scale-100" />
        </div>

        <div className="flex flex-col items-start gap-6">
          {/* LOGO INTEGRATION: Show logo if exists, else fallback to text */}
          {brand.logo ? (
             <img 
               src={brand.logo} 
               alt={brand.name}
               loading="lazy"
               decoding="async"
               width="120"
               height="40"
               className="h-10 w-auto grayscale brightness-0 invert opacity-60 group-hover:opacity-100 transition-opacity"
             />
          ) : (
             <h3 className="text-3xl md:text-5xl font-serif group-hover:italic transition-all">
                {brand.name}
             </h3>
          )}
          
          <p className="text-sm text-slate-300 max-w-xs opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-700 font-light leading-relaxed">
            {brand.description}
          </p>
        </div>
      </div>

      {/* Luxury Hover Overlay (Glassmorphism + Darkening) */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/30 to-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      
      {/* Bottom Border Animation */}
      <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-white transition-all duration-700 group-hover:w-full" />
    </motion.div>
  );
}

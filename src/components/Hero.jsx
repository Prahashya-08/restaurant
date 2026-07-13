import React from 'react';
import { Star, ShieldCheck, Flame, Zap, Compass } from 'lucide-react';
import { Button } from './ui/Button';

export default function Hero({ onOrderNowClick, onViewCombosClick }) {
  return (
    <section className="relative overflow-hidden py-12 lg:py-20 bg-gradient-to-b from-primary/5 via-transparent to-transparent">
      {/* Decorative backdrop blobs */}
      <div className="absolute top-0 right-0 -w-96 -h-96 bg-primary/10 rounded-full blur-3xl -z-10 transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 -w-80 -h-80 bg-amber-500/5 rounded-full blur-3xl -z-10 transform -translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary border border-primary/20 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide uppercase select-none">
              <Flame className="w-3.5 h-3.5 fill-primary" />
              <span>Sizzling Hot From The Tawa</span>
            </div>

            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-charcoal font-sans leading-tight">
              Authentic Punjabi <br />
              <span className="text-primary font-sans relative">
                Stuffed Parathas
                <span className="absolute bottom-1.5 left-0 w-full h-2 bg-primary/15 -z-10 rounded-full"></span>
              </span>
            </h2>

            <p className="text-base sm:text-lg text-charcoal-muted max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
              Hand-rolled whole wheat flatbreads stuffed generously with organic potatoes, fresh farm cottage cheese, herbs, and secret spices. Cooked to golden crispiness in pure Desi Ghee.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Button
                variant="primary"
                size="lg"
                onClick={onOrderNowClick}
                className="w-full sm:w-auto rounded-2xl group shadow-lg shadow-primary/30"
              >
                <span>Order Online Now</span>
                <Zap className="w-4 h-4 ml-2 group-hover:translate-x-0.5 transition-transform" />
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                onClick={onViewCombosClick}
                className="w-full sm:w-auto rounded-2xl group hover:border-primary hover:text-primary transition-colors"
              >
                <Compass className="w-4 h-4 mr-2" />
                <span>View Special Combos</span>
              </Button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-charcoal-muted/10 max-w-md mx-auto lg:mx-0">
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-xl sm:text-2xl font-black text-charcoal font-sans">100%</span>
                <span className="text-xs text-charcoal-muted mt-0.5 text-center lg:text-left font-sans">Whole Wheat</span>
              </div>
              <div className="flex flex-col items-center lg:items-start border-x border-charcoal-muted/15 px-4">
                <span className="text-xl sm:text-2xl font-black text-charcoal font-sans">Pure</span>
                <span className="text-xs text-charcoal-muted mt-0.5 text-center lg:text-left font-sans">Desi Ghee Cooked</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <span className="text-xl sm:text-2xl font-black text-charcoal font-sans">Clay</span>
                <span className="text-xs text-charcoal-muted mt-0.5 text-center lg:text-left font-sans">Tandoor & Tawa</span>
              </div>
            </div>
          </div>

          {/* Right Image/Graphic Column */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-tr from-primary/20 to-amber-500/10 flex items-center justify-center p-3 animate-scale-in">
              {/* Outer ring */}
              <div className="absolute inset-0 border-2 border-dashed border-primary/20 rounded-full animate-[spin_60s_linear_infinite]"></div>
              
              {/* Premium image container */}
              <div className="w-full h-full rounded-full overflow-hidden shadow-2xl border-4 border-white relative group">
                <img
                  src="https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=800&q=80"
                  alt="Delicious Punjabi Stuffed Paratha served on brass plate"
                  className="w-full h-full object-cover transform scale-105 group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal/30 to-transparent"></div>
              </div>

              {/* Floating Review Card */}
              <div className="absolute -bottom-4 right-2 sm:right-6 bg-white py-3 px-4 rounded-2xl shadow-xl border border-charcoal-muted/5 flex items-center gap-3 animate-bounce-slow">
                <div className="w-10 h-10 rounded-full bg-amber-500/10 flex items-center justify-center text-amber-500">
                  <Star className="w-5 h-5 fill-amber-500" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-sm font-bold text-charcoal font-sans">4.8</span>
                    <span className="text-xs text-charcoal-muted font-sans">(1.2k+ reviews)</span>
                  </div>
                  <p className="text-[10px] text-charcoal-muted font-semibold tracking-wide uppercase font-sans">Bengaluru's Best rated</p>
                </div>
              </div>

              {/* Floating Trust Pill */}
              <div className="absolute -top-3 left-2 sm:left-6 bg-charcoal text-white py-2 px-3.5 rounded-full shadow-lg flex items-center gap-2 border border-white/10">
                <ShieldCheck className="w-4 h-4 text-green-400" />
                <span className="text-[11px] font-bold font-sans tracking-wide">Hygiene Certified</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

# Desi Parathas 🫓

A premium, high-converting standalone food ordering web application built for the restaurant brand **"Desi parathas"** (Sarjapura - Attibele Rd). 

Featuring a modern, ultra-clean UI inspired by the best UX patterns of Zomato and Swiggy, this website includes a reactive cart system, customized promo codes, an interactive multi-step checkout form, and a live simulated delivery progress tracker. Pre-integrated and ready to connect with Supabase.

---

## 🌟 Key Features

* **Warm North Indian / Desi Tech Aesthetic**: Premium color palette featuring Earthy Saffron (`#ea580c`) accents, Charcoal Typography (`#0f172a`), and Cream background (`#fdfbf7`) with subtle glassmorphism and slide/bounce micro-animations.
* **Zomato/Swiggy-Style Menu Layout**:
  * Quick Category sidebar navigation (sticky on desktop, horizontal scrollable cards on mobile).
  * Real-time search by name/description.
  * Veg/Non-Veg symbol indicators and quick toggles.
  * Spicy level filter with flame rating indicators.
  * Morphing **ADD** button that transforms dynamically into a quantity selector `(- 1 +)`.
* **Interactive Cart System**:
  * Real-time bill calculation: Subtotals, Restaurant packing charges, 5% GST taxes, and delivery fees.
  * Free Delivery progress bar (Free delivery for orders above ₹299).
  * Coupon accordion validation:
    * `PARATHA20`: Get 20% off up to ₹80.
    * `DESITREAT`: Get 15% off up to ₹150 (Requires minimum ₹349 cart).
    * `FREECHAACH`: Get a free Masala Buttermilk worth ₹49 (Requires minimum ₹199 cart).
* **Live Stepper Order Tracker**:
  * Multi-step checkout modal with phone number regex validation and payment method toggle (UPI, Card, Cash).
  * Simulated payment gateway skeleton loader ("Processing Payment...").
  * Confetti celebration on completion.
  * Auto-advancing live delivery progress tracker (Received ➡️ Cooking ➡️ En Route ➡️ Delivered).
* **Smart Supabase Dual-Mode**:
  * Automatically detects environment variables.
  * Falls back to a local storage database mockup with realistic network latency (300ms–800ms) so you can test all features offline without configuration.
* **Fully Responsive**:
  * Desktop: Split layout showing category navigation, item grid, and cart.
  * Mobile: Grid items with a floating sticky bottom "View Cart" action bar.

---

## 🛠️ Tech Stack & Dependencies

* **Core**: React, Vite, ES Modules
* **Styling**: Tailwind CSS v3, PostCSS, Autoprefixer
* **Icons**: Lucide React
* **Effects**: Canvas Confetti
* **Backend Link**: Supabase JS Client library (`@supabase/supabase-js`)

---

## 🚀 Getting Started

### 1. Setup Active Workspace
Make sure you open the project directory in your editor:
```
C:\Users\Hp\.gemini\antigravity\scratch\desi-parathas
```

### 2. Start the Development Server
Install dependencies and launch the hot-reload server:
```bash
npm install
npm run dev
```
Open **[http://localhost:5173](http://localhost:5173)** in your browser.

### 3. Build for Production
To bundle the application assets:
```bash
npm run build
```

---

## ⚡ Supabase Setup (Optional)

To link a live database, create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=https://your-project-reference.supabase.co
VITE_SUPABASE_ANON_KEY=your-anonymous-key-here
```

Then create the following tables in your Supabase SQL Editor:

### 1. `menu_items` Table
```sql
create table menu_items (
  id text primary key,
  name text not null,
  description text,
  price numeric not null,
  category text not null,
  is_veg boolean default true,
  spicy_level integer default 0,
  image_url text,
  rating numeric default 4.5,
  reviews_count integer default 0,
  is_popular boolean default false
);
```

### 2. `orders` Table
```sql
create table orders (
  id text primary key,
  customer_name text not null,
  customer_phone text not null,
  delivery_address text not null,
  items jsonb not null,
  total_amount numeric not null,
  payment_method text not null,
  status text default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);
```

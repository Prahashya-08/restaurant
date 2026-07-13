export const menuItems = [
  // Classic Parathas
  {
    id: "m1",
    name: "Classic Aloo Paratha",
    description: "Golden tawa-fried whole wheat flatbread stuffed with spiced mashed potatoes, coriander, and green chilies. Served with fresh mint chutney.",
    price: 119,
    category: "Classic Parathas",
    is_veg: true,
    spicy_level: 2, // 1-3 scale
    image_url: "https://images.unsplash.com/photo-1601050690597-df056fb4ce78?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    reviews_count: 320,
    is_popular: true
  },
  {
    id: "m2",
    name: "Gobhi Shahi Paratha",
    description: "Wholesome flatbread stuffed with finely grated spiced cauliflower, ginger, and roasted cumin seeds. Crispy on the outside, soft on the inside.",
    price: 129,
    category: "Classic Parathas",
    is_veg: true,
    spicy_level: 1,
    image_url: "https://images.unsplash.com/photo-1626132647523-66f5bf380027?auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    reviews_count: 185,
    is_popular: false
  },
  {
    id: "m3",
    name: "Teekha Onion Pyaz Paratha",
    description: "Stuffed with crunchy chopped onions, tangy chat masala, fresh coriander, and a kick of green chilies. A spicy breakfast favorite.",
    price: 119,
    category: "Classic Parathas",
    is_veg: true,
    spicy_level: 2,
    image_url: "https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=600&q=80",
    rating: 4.5,
    reviews_count: 142,
    is_popular: false
  },
  {
    id: "m4",
    name: "Punjabi Mooli Paratha",
    description: "Authentic Punjabi recipe featuring grated white radish seasoned with red chili flakes, ajwain (carom seeds), and coriander leaves.",
    price: 129,
    category: "Classic Parathas",
    is_veg: true,
    spicy_level: 1,
    image_url: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=600&q=80",
    rating: 4.4,
    reviews_count: 98,
    is_popular: false
  },

  // Special Stuffed Parathas
  {
    id: "m5",
    name: "Amritsari Paneer Pyaz Paratha",
    description: "Rich stuffing of crumbled fresh paneer, finely chopped onions, kasuri methi, and special Amritsari garam masala. Baked to golden perfection.",
    price: 159,
    category: "Special Stuffed Parathas",
    is_veg: true,
    spicy_level: 1,
    image_url: "https://images.unsplash.com/photo-1596797038530-2c107229654b?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviews_count: 412,
    is_popular: true
  },
  {
    id: "m6",
    name: "Aloo Cheese Burst Paratha",
    description: "A modern twist. Traditional aloo paratha loaded with premium molten mozzarella and cheddar cheese that pulls apart beautifully.",
    price: 169,
    category: "Special Stuffed Parathas",
    is_veg: true,
    spicy_level: 2,
    image_url: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviews_count: 518,
    is_popular: true
  },
  {
    id: "m7",
    name: "Chili Cheese Garlic Paratha",
    description: "Infused with roasted garlic cloves, spicy green bird's eye chilies, and a double portion of melted processed cheese. Bold and buttery.",
    price: 179,
    category: "Special Stuffed Parathas",
    is_veg: true,
    spicy_level: 3,
    image_url: "https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80",
    rating: 4.8,
    reviews_count: 289,
    is_popular: true
  },
  {
    id: "m8",
    name: "Special Mughlai Egg Paratha",
    description: "Wheat flatbread folded with whisked egg, chopped onions, green chilies, and minced chicken spices, pan-fried with pure ghee.",
    price: 189,
    category: "Special Stuffed Parathas",
    is_veg: false,
    spicy_level: 2,
    image_url: "https://images.unsplash.com/photo-1627308595229-7830a5c91f9f?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    reviews_count: 215,
    is_popular: true
  },

  // Beverages & Lassi
  {
    id: "m9",
    name: "Kesar Pista Shahi Lassi",
    description: "Thick, creamy yogurt drink flavored with premium saffron strands (kesar), cardamom, and topped with crushed pistachios & almonds.",
    price: 89,
    category: "Beverages & Lassi",
    is_veg: true,
    spicy_level: 0,
    image_url: "https://images.unsplash.com/photo-1571115177098-24ec420951d5?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviews_count: 380,
    is_popular: true
  },
  {
    id: "m10",
    name: "Sweet Punjabi Lassi",
    description: "Traditional sweet and frothy yogurt shake served chilled in a clay-style mug, topped with a thick layer of fresh malai (cream).",
    price: 79,
    category: "Beverages & Lassi",
    is_veg: true,
    spicy_level: 0,
    image_url: "https://images.unsplash.com/photo-1630953899906-d16511a72558?auto=format&fit=crop&w=600&q=80",
    rating: 4.7,
    reviews_count: 245,
    is_popular: false
  },
  {
    id: "m11",
    name: "Masala Chaach (Buttermilk)",
    description: "Refreshing, light, and salted buttermilk blended with fresh coriander, mint leaves, roasted cumin powder, and black salt.",
    price: 49,
    category: "Beverages & Lassi",
    is_veg: true,
    spicy_level: 1,
    image_url: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=600&q=80",
    rating: 4.6,
    reviews_count: 172,
    is_popular: false
  },

  // Sides & Raitas
  {
    id: "m12",
    name: "Chatpata Boondi Raita",
    description: "Chilled whipped yogurt mixed with crispy chickpea flour droplets (boondi), seasoned with roasted cumin and red chili powder.",
    price: 59,
    category: "Sides & Raitas",
    is_veg: true,
    spicy_level: 1,
    image_url: "https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?auto=format&fit=crop&w=600&q=80",
    rating: 4.5,
    reviews_count: 110,
    is_popular: false
  },
  {
    id: "m13",
    name: "Extra Amul White Butter",
    description: "A scoop of rich, creamy home-style unsalted butter. The quintessential companion for a hot Punjabi paratha.",
    price: 25,
    category: "Sides & Raitas",
    is_veg: true,
    spicy_level: 0,
    image_url: "https://images.unsplash.com/photo-1589985270826-4b7bb135bc9d?auto=format&fit=crop&w=600&q=80",
    rating: 4.9,
    reviews_count: 450,
    is_popular: true
  }
];

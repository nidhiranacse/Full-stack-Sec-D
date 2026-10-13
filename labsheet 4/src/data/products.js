export const PRODUCTS = [
  {
    id: 1,
    title: 'Sony WH-1000XM5 Wireless Headphones',
    price: 349.99,
    category: 'Electronics',
    rating: 4.8,
    reviewsCount: 1420,
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
    description: 'Industry-leading noise canceling with two processors and 8 microphones for unprecedented noise canceling and exceptional call quality.',
    features: ['30-hour battery life', 'Ultra-comfortable lightweight design', 'Crystal clear hands-free calling', 'Multipoint connection']
  },
  {
    id: 2,
    title: 'Apple Watch Series 9 GPS 45mm',
    price: 429.00,
    category: 'Wearables',
    rating: 4.9,
    reviewsCount: 890,
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
    description: 'Smarter, brighter, and mightier. Featuring the S9 SiP chip, double tap gesture, and carbon neutral case and band combinations.',
    features: ['Always-On Retina display', 'ECG app & Blood Oxygen sensor', 'Crash Detection', 'Water resistant to 50 meters']
  },
  {
    id: 3,
    title: 'Keychron Q1 Pro Wireless Mechanical Keyboard',
    price: 199.99,
    category: 'Accessories',
    rating: 4.7,
    reviewsCount: 460,
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&auto=format&fit=crop&q=80',
    description: 'A fully customizable 75% layout mechanical keyboard with CNC machined aluminum body, hot-swappable switches, and QMK/VIA support.',
    features: ['Bluetooth 5.1 & Type-C wired', 'Hot-swappable PCB', 'Double-gasket design', 'Compatible with Mac and Windows']
  },
  {
    id: 4,
    title: 'Logitech MX Master 3S Ergonomic Mouse',
    price: 99.99,
    category: 'Accessories',
    rating: 4.8,
    reviewsCount: 2310,
    image: 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&auto=format&fit=crop&q=80',
    description: 'An iconic mouse remastered with quiet clicks and an 8,000 DPI track-on-glass sensor for ultimate speed and precision.',
    features: ['MagSpeed electromagnetic scrolling', '8K DPI optical sensor', '90% quieter clicks', 'Cross-computer control (Flow)']
  },
  {
    id: 5,
    title: 'Bose SoundLink Revolve+ II Bluetooth Speaker',
    price: 229.00,
    category: 'Electronics',
    rating: 4.6,
    reviewsCount: 710,
    image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&auto=format&fit=crop&q=80',
    description: 'True 360-degree sound for consistent, uniform coverage. Durable, water- and dust-resistant design with a flexible fabric handle.',
    features: ['Up to 17 hours of battery life', 'IP55 water and dust resistant', 'Built-in microphone for speakerphone', 'Pair two for Stereo or Party Mode']
  },
  {
    id: 6,
    title: 'Minimalist Matte Leather Backpack',
    price: 119.50,
    category: 'Lifestyle',
    rating: 4.5,
    reviewsCount: 315,
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&auto=format&fit=crop&q=80',
    description: 'Sleek waterproof commuter backpack crafted with vegan micro-fiber leather and dedicated padded compartment for 16-inch laptops.',
    features: ['Fits up to 16" laptop', 'Waterproof finish', 'Hidden anti-theft pocket', 'Ergonomic breathable back panel']
  }
];

// Helper to simulate asynchronous API delay to demonstrate the loading state
export const fetchProducts = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(PRODUCTS);
    }, 600);
  });
};

export const fetchProductById = (id) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const numericId = parseInt(id, 10);
      const product = PRODUCTS.find((p) => p.id === numericId);
      resolve(product || null);
    }, 500);
  });
};

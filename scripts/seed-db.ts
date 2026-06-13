import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const SEED_PRODUCTS = [
  // Crisis / Emergency
  { id: "c1", name: "First Aid Kit (50 items)", category: "Emergency", price: 399, original_price: 599, image_keyword: "first-aid-kit", is_vegetarian: true, is_eco: false, brand: "Apollo", eta_minutes: 8 },
  { id: "c2", name: "LED Rechargeable Torch", category: "Emergency", price: 449, original_price: 650, image_keyword: "led-torch", is_vegetarian: true, is_eco: false, brand: "Philips", eta_minutes: 8 },
  { id: "c3", name: "Bisleri Water 2L (4-pack)", category: "Beverages", price: 160, original_price: 200, image_keyword: "water-bottles", is_vegetarian: true, is_eco: false, brand: "Bisleri", eta_minutes: 10 },
  { id: "c4", name: "Battery-Powered Fan", category: "Emergency", price: 799, original_price: 1100, image_keyword: "battery-fan", is_vegetarian: true, is_eco: false, brand: "Bajaj", eta_minutes: 10 },
  { id: "c5", name: "Ready-to-Eat Meals (5)", category: "Emergency", price: 450, original_price: 600, image_keyword: "ready-meals", is_vegetarian: true, is_eco: false, brand: "MTR", eta_minutes: 10 },
  { id: "c6", name: "Power Bank 20,000 mAh", category: "Electronics", price: 1599, original_price: 2200, image_keyword: "power-bank", is_vegetarian: true, is_eco: false, brand: "Mi", eta_minutes: 8 },
  
  // Daily Groceries / Produce
  { id: "d1", name: "Amul Toned Milk 1L", category: "Dairy", price: 64, original_price: null, image_keyword: "milk-carton", is_vegetarian: true, is_eco: false, brand: "Amul", eta_minutes: 10 },
  { id: "d2", name: "Whole Wheat Bread", category: "Bakery", price: 50, original_price: null, image_keyword: "brown-bread-loaf", is_vegetarian: true, is_eco: true, brand: "Modern", eta_minutes: 10 },
  { id: "d3", name: "Tata Salt 1kg", category: "Pantry", price: 28, original_price: null, image_keyword: "salt-bag", is_vegetarian: true, is_eco: false, brand: "Tata", eta_minutes: 10 },
  { id: "d4", name: "Fresh Bananas (1 dozen)", category: "Produce", price: 60, original_price: null, image_keyword: "banana-bunch", is_vegetarian: true, is_eco: true, brand: "Local", eta_minutes: 10 },
  { id: "d5", name: "Farm Eggs (12-pack)", category: "Dairy", price: 96, original_price: null, image_keyword: "farm-eggs", is_vegetarian: false, is_eco: true, brand: "Local", eta_minutes: 10 },
  { id: "d6", name: "Premium Basmati Rice 5kg", category: "Staples", price: 549, original_price: 750, image_keyword: "basmati-rice", is_vegetarian: true, is_eco: false, brand: "Daawat", eta_minutes: 12 },
  { id: "d7", name: "Tata Sampann Toor Dal 1kg", category: "Staples", price: 169, original_price: 210, image_keyword: "toor-dal", is_vegetarian: true, is_eco: false, brand: "Tata Sampann", eta_minutes: 12 },
  { id: "d8", name: "Fresh Mixed Vegetables 2kg", category: "Produce", price: 280, original_price: null, image_keyword: "mixed-vegetables", is_vegetarian: true, is_eco: true, brand: "Local", eta_minutes: 10 },
  
  // Pharmacy / Wellness
  { id: "w1", name: "ORS Hydration Sachets (10-pack)", category: "Wellness", price: 120, original_price: null, image_keyword: "ors-sachet", is_vegetarian: true, is_eco: false, brand: "Electral", eta_minutes: 8 },
  { id: "w2", name: "Paracetamol 500mg (15 tablets)", category: "Pharmacy", price: 35, original_price: null, image_keyword: "paracetamol-tablets", is_vegetarian: true, is_eco: false, brand: "Crocin", eta_minutes: 8 },
  { id: "w3", name: "Vicks VapoRub 25g", category: "Pharmacy", price: 90, original_price: null, image_keyword: "vicks-vaporub-jar", is_vegetarian: true, is_eco: false, brand: "Vicks", eta_minutes: 8 },
  { id: "w4", name: "Tissue Box (200 pulls)", category: "Household", price: 80, original_price: null, image_keyword: "tissue-box", is_vegetarian: true, is_eco: true, brand: "Origami", eta_minutes: 10 },
  
  // Snacks & Hosting
  { id: "s1", name: "Lay's Party Pack (6 flavours)", category: "Snacks", price: 299, original_price: 349, image_keyword: "potato-chips-bowl", is_vegetarian: true, is_eco: false, brand: "Lay's", eta_minutes: 10 },
  { id: "s2", name: "Coca-Cola 1.25L (2-pack)", category: "Beverages", price: 180, original_price: 220, image_keyword: "coca-cola-bottle", is_vegetarian: true, is_eco: false, brand: "Coca-Cola", eta_minutes: 10 },
  { id: "s3", name: "Britannia Cake Tray", category: "Bakery", price: 250, original_price: null, image_keyword: "chocolate-cake", is_vegetarian: false, is_eco: false, brand: "Britannia", eta_minutes: 10 },
  { id: "s4", name: "Amul Vanilla Ice Cream 1L", category: "Frozen", price: 280, original_price: 310, image_keyword: "vanilla-icecream", is_vegetarian: true, is_eco: false, brand: "Amul", eta_minutes: 12 },
  { id: "s5", name: "Haldiram's Mixed Namkeen 400g", category: "Snacks", price: 165, original_price: null, image_keyword: "indian-snacks-bowl", is_vegetarian: true, is_eco: false, brand: "Haldiram's", eta_minutes: 10 },
  
  // Quick Meals
  { id: "q1", name: "Maggi 2-min Noodles (4-pack)", category: "Quick Meals", price: 96, original_price: null, image_keyword: "instant-noodles", is_vegetarian: true, is_eco: false, brand: "Nestle", eta_minutes: 10 },
  { id: "q2", name: "Frozen Pizza (Margherita)", category: "Frozen", price: 320, original_price: 380, image_keyword: "frozen-pizza", is_vegetarian: true, is_eco: false, brand: "McCain", eta_minutes: 12 },
  
  // Household / Eco
  { id: "h1", name: "Insulated Lunch Box Set", category: "Household", price: 449, original_price: 699, image_keyword: "lunch-box-tiffin", is_vegetarian: true, is_eco: true, brand: "Milton", eta_minutes: 10 },
  { id: "h2", name: "Dettol Handwash 750ml (2-pack)", category: "Household", price: 199, original_price: 280, image_keyword: "handwash-bottle", is_vegetarian: true, is_eco: false, brand: "Dettol", eta_minutes: 10 },
  { id: "h3", name: "Colgate MaxFresh 150g (3-pack)", category: "Household", price: 198, original_price: 270, image_keyword: "toothpaste", is_vegetarian: true, is_eco: false, brand: "Colgate", eta_minutes: 10 }
];

async function seedDatabase() {
  console.log("Seeding database...");

  // 1. First, you'll need a products table.
  // We can create it via SQL or assume the user runs it in the Supabase UI.
  // The schema is:
  /*
    create table public.products (
      id uuid default gen_random_uuid() primary key,
      product_id text unique,
      name text not null,
      category text,
      price numeric not null,
      original_price numeric,
      image_keyword text,
      is_vegetarian boolean default true,
      is_eco boolean default false,
      brand text,
      eta_minutes integer default 10
    );
  */

  for (const product of SEED_PRODUCTS) {
    const { data, error } = await supabase
      .from("products")
      .upsert({
        product_id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        original_price: product.original_price,
        image_keyword: product.image_keyword,
        is_vegetarian: product.is_vegetarian,
        is_eco: product.is_eco,
        brand: product.brand,
        eta_minutes: product.eta_minutes
      }, { onConflict: "product_id" });

    if (error) {
      console.error(`Error inserting ${product.name}:`, error.message);
      // Wait, if table doesn't exist it will error here
      if (error.code === '42P01') {
         console.error("The 'products' table does not exist. Please create it in the Supabase UI with the SQL schema commented in this file.");
         process.exit(1);
      }
    } else {
      console.log(`✓ Upserted ${product.name}`);
    }
  }

  console.log("Database seeding complete.");
}

seedDatabase();

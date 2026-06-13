import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log("Testing connection to Supabase...");
  console.log(`URL: ${supabaseUrl}`);

  // Test the connection by trying to fetch a single row from 'products' 
  // or just checking if the table exists
  try {
    const { data, error } = await supabase.from("products").select("*").limit(1);

    if (error) {
      if (error.code === '42P01') {
        console.log("✅ Connection SUCCESSFUL!");
        console.log("⚠️ However, the 'products' table does NOT exist yet.");
        console.log("Please create the table in the Supabase SQL editor using the provided schema before we seed the database.");
      } else {
        console.error("❌ Connection failed with error:", error.message);
      }
    } else {
      console.log("✅ Connection SUCCESSFUL!");
      console.log("✅ The 'products' table exists!");
      console.log(`Found ${data.length} rows.`);
    }
  } catch (err) {
    console.error("❌ Unexpected error during connection test:", err);
  }
}

testConnection();

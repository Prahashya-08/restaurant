import { createClient } from '@supabase/supabase-js';
import { menuItems } from './data/menuItems';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

const isRealSupabaseConfigured = supabaseUrl.trim() !== '' && supabaseAnonKey.trim() !== '';

let supabaseClientInstance = null;

if (isRealSupabaseConfigured) {
  try {
    supabaseClientInstance = createClient(supabaseUrl, supabaseAnonKey);
    console.log("Supabase Client initialized successfully.");
  } catch (err) {
    console.error("Failed to initialize real Supabase client. Falling back to local storage database:", err);
  }
}

class MockSupabaseService {
  constructor() {
    console.info("%cDesi Parathas: Running in Mock Supabase Fallback mode. All order transactions will persist to LocalStorage.", "color: #ea580c; font-weight: bold; font-size: 11px;");
    
    // Seed menu items in localStorage if not exists
    if (!localStorage.getItem('desi_parathas_menu')) {
      localStorage.setItem('desi_parathas_menu', JSON.stringify(menuItems));
    }
    // Initialize orders list in localStorage if not exists
    if (!localStorage.getItem('desi_parathas_orders')) {
      localStorage.setItem('desi_parathas_orders', JSON.stringify([]));
    }
  }

  from(table) {
    return {
      select: async (query = '*') => {
        // Simulate network latency (300ms) for high-fidelity loading states
        await new Promise((resolve) => setTimeout(resolve, 300));
        
        if (table === 'menu_items') {
          const storedMenu = JSON.parse(localStorage.getItem('desi_parathas_menu'));
          return { data: storedMenu, error: null };
        }
        
        if (table === 'orders') {
          const storedOrders = JSON.parse(localStorage.getItem('desi_parathas_orders'));
          return { data: storedOrders, error: null };
        }
        
        return { data: null, error: { message: `Table '${table}' not found in Mock DB.` } };
      },

      insert: async (records) => {
        // Simulate network latency (800ms) to show checkout spinners and skeleton screen
        await new Promise((resolve) => setTimeout(resolve, 800));
        
        if (table === 'orders') {
          const storedOrders = JSON.parse(localStorage.getItem('desi_parathas_orders')) || [];
          
          const normalizedRecords = (Array.isArray(records) ? records : [records]).map(record => ({
            id: record.id || `order-${Math.random().toString(36).substring(2, 11).toUpperCase()}`,
            created_at: new Date().toISOString(),
            status: record.status || 'pending',
            ...record
          }));
          
          const updatedOrders = [...storedOrders, ...normalizedRecords];
          localStorage.setItem('desi_parathas_orders', JSON.stringify(updatedOrders));
          return { data: normalizedRecords, error: null };
        }
        
        return { data: null, error: { message: `Mock DB does not support inserts into table '${table}'.` } };
      }
    };
  }
}

export const supabase = isRealSupabaseConfigured && supabaseClientInstance
  ? supabaseClientInstance
  : new MockSupabaseService();

export const isMock = !(isRealSupabaseConfigured && supabaseClientInstance);

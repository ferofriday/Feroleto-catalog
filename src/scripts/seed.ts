/**
 * Seed the Feroleto catalog database with categories, crop types, and varieties.
 * Run: npm run seed
 * Requires: .env.local with NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY
 */
import { readFileSync, existsSync } from 'fs';
import { resolve } from 'path';
import { createClient } from '@supabase/supabase-js';

// Load .env.local from project root
const envPath = resolve(process.cwd(), '.env.local');
if (existsSync(envPath)) {
  const content = readFileSync(envPath, 'utf-8');
  content.split('\n').forEach((line) => {
    const m = line.match(/^([^#=]+)=(.*)$/);
    if (m) process.env[m[1].trim()] = m[2].trim().replace(/^["']|["']$/g, '');
  });
}
import type { Database } from '../types/database';
import { SEED_CATEGORIES, SEED_CROP_TYPES } from '../data/seed-data';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in environment.');
  process.exit(1);
}

const supabase = createClient<Database>(supabaseUrl, serviceKey);

async function seed() {
  console.log('Seeding categories...');
  const categoryIds: Record<string, string> = {};
  for (let i = 0; i < SEED_CATEGORIES.length; i++) {
    const { data, error } = await supabase
      .from('categories')
      .insert({ name: SEED_CATEGORIES[i].name, sort_order: i })
      .select('id, name')
      .single();
    if (error) {
      console.error('Category insert error:', error);
      throw error;
    }
    if (data) categoryIds[data.name] = data.id;
  }
  console.log('Categories done:', Object.keys(categoryIds).length);

  console.log('Seeding crop types and varieties...');
  for (let ctIndex = 0; ctIndex < SEED_CROP_TYPES.length; ctIndex++) {
    const ct = SEED_CROP_TYPES[ctIndex];
    const categoryId = categoryIds[ct.category];
    if (!categoryId) {
      console.error('Unknown category:', ct.category);
      continue;
    }
    const { data: cropType, error: ctError } = await supabase
      .from('crop_types')
      .insert({
        category_id: categoryId,
        name: ct.name,
        description: ct.description,
        season: ct.season,
        sort_order: ctIndex,
      })
      .select('id')
      .single();
    if (ctError) {
      console.error('Crop type insert error:', ct.name, ctError);
      throw ctError;
    }
    if (!cropType) continue;
    for (let vIndex = 0; vIndex < ct.varieties.length; vIndex++) {
      const v = ct.varieties[vIndex];
      const { error: vError } = await supabase.from('varieties').insert({
        crop_type_id: cropType.id,
        name: v.name,
        type_subtype: v.type_subtype || null,
        days_to_maturity: v.days_to_maturity || null,
        note: v.note || null,
        sort_order: vIndex,
      });
      if (vError) {
        console.error('Variety insert error:', v.name, vError);
        throw vError;
      }
    }
  }
  console.log('Crop types and varieties done.');
  console.log('Seed complete.');
}

seed().catch((e) => {
  console.error(e);
  process.exit(1);
});

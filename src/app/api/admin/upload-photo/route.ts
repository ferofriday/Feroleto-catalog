import { NextRequest, NextResponse } from 'next/server';
import { getAdminSession } from '@/lib/admin-auth';
import { createServerClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const formData = await request.formData();
  const file = formData.get('file') as File | null;
  const cropTypeId = formData.get('cropTypeId') as string | null;
  if (!file || !cropTypeId) {
    return NextResponse.json({ error: 'Missing file or cropTypeId' }, { status: 400 });
  }
  const supabase = createServerClient();
  const ext = file.name.split('.').pop() || 'jpg';
  const path = `crop-types/${cropTypeId}.${ext}`;
  const buf = await file.arrayBuffer();
  const { error: uploadError } = await supabase.storage
    .from('crop-images')
    .upload(path, buf, { contentType: file.type, upsert: true });
  if (uploadError) {
    return NextResponse.json({ error: uploadError.message }, { status: 500 });
  }
  const { data: urlData } = supabase.storage.from('crop-images').getPublicUrl(path);
  const { error: updateError } = await supabase
    .from('crop_types')
    .update({ image_url: urlData.publicUrl, updated_at: new Date().toISOString() })
    .eq('id', cropTypeId);
  if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 });
  return NextResponse.json({ url: urlData.publicUrl });
}

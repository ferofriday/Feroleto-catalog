import { NextRequest, NextResponse } from 'next/server';
import { createServerClient } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { clientName, selections } = body as {
      clientName: string;
      selections: { cropTypeId: string; varietyId?: string | null; note?: string | null }[];
    };
    if (!clientName?.trim() || !Array.isArray(selections)) {
      return NextResponse.json(
        { error: 'Missing clientName or selections' },
        { status: 400 }
      );
    }
    const supabase = createServerClient();
    const { data: submission, error: subError } = await supabase
      .from('client_submissions')
      .insert({ client_name: clientName.trim(), status: 'new' })
      .select('id')
      .single();
    if (subError || !submission) {
      console.error(subError);
      return NextResponse.json({ error: 'Failed to create submission' }, { status: 500 });
    }
    if (selections.length > 0) {
      const rows = selections.map((s) => ({
        submission_id: submission.id,
        crop_type_id: s.cropTypeId,
        variety_id: s.varietyId || null,
        note: s.note?.trim() || null,
      }));
      const { error: selError } = await supabase.from('submission_selections').insert(rows);
      if (selError) {
        console.error(selError);
        return NextResponse.json({ error: 'Failed to save selections' }, { status: 500 });
      }
    }
    return NextResponse.json({ submissionId: submission.id });
  } catch (e) {
    console.error(e);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}

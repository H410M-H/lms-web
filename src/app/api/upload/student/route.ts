import { type NextRequest, NextResponse } from 'next/server';
import { parse } from 'csv-parse/sync';



export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const csvFile = formData.get('csvFile') as File | null;

    if (!csvFile) {
      return NextResponse.json({ message: 'No CSV file provided' }, { status: 400 });
    }

    const csvContent = await csvFile.text();

    const records = parse(csvContent, {
      columns: true,
      skip_empty_lines: true,
    }) as string[];

    for(const record of records){
        console.log(record)
    }

    return NextResponse.json({ message: 'CSV processed successfully'}, { status: 200 });
  } catch (error) {
    console.error('Error processing CSV:', error);
    return NextResponse.json({ message: 'Error processing CSV file' }, { status: 500 });
  }
}
import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { AuthorModel } from '@/lib/Models';


export const GET = async () => {
  try {
    await Connect();
    const authors = await AuthorModel.find({}).populate('postId').sort({_id:'desc'});
    return NextResponse.json( authors );
  } catch (error) {
    console.error('GET Error:', error);
    return NextResponse.json({ message: 'Failed to fetch authors' }, { status: 500 });
  }
}



export const POST = async (Request) => {
  try {
    await Connect();
    const { name, postId } = await Request.json();
    const authors = await AuthorModel.create({ name, postId });
    return NextResponse.json(authors);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "POST Error", err }, { status: 500 });
  }
}
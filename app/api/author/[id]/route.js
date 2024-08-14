import { NextResponse } from 'next/server';
import { Connect } from '@/lib/utils/Db';
import { AuthorModel } from '@/lib/Models';


export const GET = async (Request, { params }) => {
  try {
    await Connect();
    const { id } = params;
    const authors = await PostModel.findById(id);
    return NextResponse.json(authors);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}    


export const PUT = async (Request,{ params }) => {
  try {
    await Connect();
    const {id} = params;
    const { name, postId } = await Request.json();
    const authors = await AuthorModel.findOneAndUpdate({ _id: id }, { name, postId });
    return NextResponse.json(authors);
  } catch (err) {
    return NextResponse.json({ message: "PUT Error", err }, { status: 500 });
  }
}


export const DELETE = async ( Request, { params }) => {
  try {
    await Connect();
    const {id} = params;
    const authors = await AuthorModel.findOneAndDelete({_id: id});
    return NextResponse.json(authors);
  } catch (err) {
    return NextResponse.json({ message: "DELETE Error", err }, { status: 500 });
  }
} 
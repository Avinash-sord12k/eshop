import { NextResponse } from 'next/server';
import Reviews from '@/models/Reviews';
import User from '@/models/Users';
import { connect } from '@/database/connect';


export const POST = async (req) => {
  connect();
  const { email, productId, title, rating, comment } = await req.json();
  const user = await User.findOne({ email });

  try {
    const review = await Reviews.create({
      userId: user._id,
      productId,
      title,
      rating,
      comment,
    });

    return NextResponse.json({
      status: 200,
      body: {
        message: 'Review created successfully',
        success: true,
        data: review,
      }
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      body: {
        message: error.message,
        success: false,
      }
    });
  }
};


export const GET = async (req) => {
  connect();
  const { productId } = req.query;
  try {
    const reviews = await Reviews.find({ productId })
      .populate('userId', 'name email')
      .lean();

    return NextResponse.json({
      status: 200,
      body: {
        message: 'Reviews retrieved successfully',
        success: true,
        data: reviews,
      }
    });
  } catch (error) {
    return NextResponse.json({
      status: 500,
      body: {
        message: error.message,
        success: false,
      }
    });
  }
}
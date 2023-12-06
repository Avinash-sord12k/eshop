import { NextResponse } from 'next/server';
import Reviews from '@/models/Reviews';
import User from '@/models/Users';
import { connect } from '@/database/connect';
import Products from '@/models/Products';


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

    const Product = await Products.findById(productId);
    const allReviews = await Reviews.find({ productId });
    const totalReviews = allReviews.length;
    const totalRating = allReviews.reduce((acc, item) => acc + (item.rating || 0), 0);
    const averageRating = totalRating / totalReviews;
    await Product.updateOne({
      productId,
      rating: averageRating,
      totalReviews,
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
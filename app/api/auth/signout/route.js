import { NextResponse } from 'next/server';

export const POST = async (req) => {
  console.log(process.env.NEXT_PUBLIC_CURRENT_DOMAIN + '/auth/signin');
  const response = NextResponse.json({
    status: 200,
    body: {
      message: 'Signout successful',
      success: true,
    },
  });
  response.cookies.set('token', '', { httpOnly: true });
  return response;
}
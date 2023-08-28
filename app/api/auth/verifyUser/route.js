import { connect } from "@/database/connect";
import { NextResponse } from "next/server";
import Users from "@/models/Users";
import { sendMail, getRandomString } from "@/utils/auth/auth";

connect();
export const POST = async (req) => {
  try {
    const { email } = await req.json();
    console.log("Verification Email Requested By: ", email);
    if (!email) return NextResponse.json({
      status: 400,
      body: {
        message: "Email is required",
        success: false
      },
    });

    const user = await Users.findOne({ email });
    if (!user) return NextResponse.json({
      status: 404,
      body: {
        message: "User not found",
        success: false
      },
    });

    const verificationToken = getRandomString();
    const verificationTokenExpiry = Date.now() + 15 * 60 * 1000;

    user.verificationToken = verificationToken;
    user.verificationTokenExpiry = verificationTokenExpiry;

    await user.save();


    const subject = `Email verification for ${"e-commerce-website"}`;
    const content = `<!DOCTYPE html>
    // <html>
    // <head>
    //   <meta charset="UTF-8">
    //   <title>Email Verification</title>
    // </head>
    // <body>
    //   <table width="100%" border="0" cellspacing="0" cellpadding="0">
    //     <tr>
    //       <td align="center" style="padding: 20px; background-color: #1e1e1e;">
    //         <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px;">
    //           <tr>
    //             <td align="center" style="padding: 40px; background-color: #242424;">
    //               <h1 style="font-size: 24px; margin-bottom: 20px; color: #00bcd4;">Email Verification</h1>
    //               <p style="color: #ffffff;">Hello <strong style="text-transform: capitalize;">${user.username}</strong>,</p>
    //               <p style="color: #ffffff;">Please click the following link to verify your email:</p>
    //               <a href="${process.env.NEXT_PUBLIC_CURRENT_DOMAIN}/auth/verify-user-token?token=${verificationToken}&email=${email}" style="font-size: 16px; color: #00bcd4; text-decoration: none;">Verify Email</a>
    //               <p style="color: #ffffff;">This link will expire in 15 minutes.</p>
    //               <p style="color: #ffffff;">If you didn't request this verification, please ignore this email.</p>
    //               <p style="color: #ffffff;">Thank you,<br>YourFriendlyApp</p>
    //             </td>
    //           </tr>
    //           <tr>
    //             <td align="center" style="padding: 20px; background-color: #1e1e1e;">
    //               <p style="color: #ffffff;">© 2023 ${"e-commerce-app"}. All rights reserved.</p>
    //             </td>
    //           </tr>
    //         </table>
    //       </td>
    //     </tr>
    //   </table>
    // </body>
    // </html>
    // `;
    const mailStatus = await sendMail(email, subject, content);
    console.log("mailStatus is: ", mailStatus);

    return NextResponse.json({
      status: 200,
      body: {
        message: "Email sent successfully",
        success: true
      },
    });

  } catch (error) {
    console.log("error is occuring: ", error);
    return NextResponse.json({
      status: 500,
      body: {
        message: "Internal server error",
        success: false
      },
    });
  }
}

export const GET = async (req) => {
  try {
    const { email, token } = await req.json();
    console.log("This user want to verify: ", email, token);
    if (!email || !token) return NextResponse.json({
      status: 400,
      body: {
        message: "Email and token are required",
        success: false
      },
    });

    const user = Users.findOne({ email });
    if (!user) return NextResponse.json({
      status: 404,
      body: {
        message: "User not found",
        success: false
      },
    });

    if (user.verificationToken !== token) return NextResponse.json({
      status: 400,
      body: {
        message: "Invalid token",
        success: false
      },
    });

    if (user.verificationTokenExpiry < Date.now()) return NextResponse.json({
      status: 400,
      body: {
        message: "Token expired",
        success: false
      },
    });

    user.verified = true;
    user.verificationToken = null;
    user.verificationTokenExpiry = null;

    console.log("+  user verified: ", user);

    await user.save();

    return NextResponse.json({
      status: 200,
      body: {
        message: "Email verified successfully",
        success: true
      },
    });


  } catch (error) {
    console.log("error is occuring: ", error);
  }
}
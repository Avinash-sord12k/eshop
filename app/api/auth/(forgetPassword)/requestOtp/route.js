import { connect } from "@/database/connect";
import { NextResponse } from "next/server";
import Users from "@/models/Users";
import { genOtp, sendMail } from "@/utils/auth/auth";


connect();
export const POST = async (request) => {
  try {
    const { email } = await request.json();
    if (!email) {
      return NextResponse.json({
        status: 400,
        body: {
          message: "Email is required",
          success: false,
        }
      });
    }
    const otp = genOtp();
    const user = await Users.findOne({ email });
    if (!user) {
      return NextResponse.json({
        status: 400,
        body: {
          message: "Email is not registered",
          success: false,
        }
      });
    }
    user.resetOtp = otp;
    user.resetOtpExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();

    const subject = "Reset Password";
    const content = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <title>Password Reset</title>
    </head>
    <body>
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
        <tr>
          <td align="center" style="padding: 20px; background-color: #1e1e1e;">
            <table width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px;">
              <tr>
                <td align="center" style="padding: 40px; background-color: #242424;">
                  <h1 style="font-size: 24px; margin-bottom: 20px; color: #00bcd4;">Password Reset</h1>
                  <p style="color: #ffffff;">Hello <strong style="text-transform: capitalize;">${user.username}</strong>,</p>
                  <p style="color: #ffffff;">We have received a request to reset your password. Please use the following OTP (One-Time Password) to proceed:</p>
                  <div style="font-size: 36px; font-weight: bold; color: #00bcd4;">${otp}</div>
                  <p style="color: #ffffff;">This OTP is valid for 5 minutes only.</p>
                  <p style="color: #ffffff;">If you didn't request a password reset, please ignore this email.</p>
                  <p style="color: #ffffff;">Thank you,<br>E-commerce-website</p>
                </td>
              </tr>
              <tr>
                <td align="center" style="padding: 20px; background-color: #1e1e1e;">
                  <p style="color: #ffffff;">© 2023 MelosynthiaAI. All rights reserved.</p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>`

    await sendMail(email, subject, content);

    return NextResponse.json({
      status: 200,
      body: {
        message: "Otp sent successfully",
        success: true,
      }
    });

  } catch (error) {
    console.log("error in requesting otp: ", error);
    return NextResponse.json({
      status: 500,
      body: {
        message: "Internal Server Error",
        success: false,
      }
    })
  }
}
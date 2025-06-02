import nodemailer from "nodemailer"
export async function sendVerificationEmail(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const verifyUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/auth/verify?token=${token}`;

  await transporter.sendMail({
    from: '"Cricket App" <no-reply@cricket.com>',
    to: email,
    subject: "Verify your email",
    html: `
      <h2>Welcome to Cricket Manager!</h2>
      <p>Please click the link below to verify your email:</p>
      <a href="${verifyUrl}" style="padding: 10px 20px; background: #1d4ed8; color: white; text-decoration: none;">Verify Email</a>
      <p>This link expires in 1 hour.</p>
    `,
  });
}

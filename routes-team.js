// ============================================
// routes/team.js
// Add this file to your backend routes folder
// ============================================

import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER || "nexlume.co@gmail.com",
    pass: process.env.EMAIL_PASS, // Use Gmail App Password here
  },
});

// POST /api/team/enroll - Send enrollment email to user
router.post("/enroll", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ 
        success: false,
        message: "Email is required" 
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ 
        success: false,
        message: "Invalid email format" 
      });
    }

    // Extract name from email
    const emailName = email.split("@")[0];
    const displayName = emailName.charAt(0).toUpperCase() + emailName.slice(1);

    // Email template
    const mailOptions = {
      from: `"NexLume Team" <${process.env.EMAIL_USER || "nexlume.co@gmail.com"}>`,
      to: email,
      subject: "Internship Application - NexLume",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #C80000, #8B0000); color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
            .button { display: inline-block; padding: 12px 30px; background: #C80000; color: white; text-decoration: none; border-radius: 5px; margin: 20px 0; }
            .footer { text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px; }
            ul { list-style: none; padding: 0; }
            li { padding: 8px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome to NexLume!</h1>
            </div>
            <div class="content">
              <p>Dear ${displayName},</p>
              
              <p>Thank you for showing interest in NexLume! We are excited to offer internship opportunities for passionate individuals like you who are eager to gain hands-on experience in a fast-growing startup environment.</p>
              
              <p>At NexLume, we believe in empowering fresh talent by providing real-world exposure, mentorship, and the chance to work on impactful projects. If you're ready to grow with us, we'd love to hear from you!</p>
              
              <h2>🌟 How to Apply?</h2>
              
              <p>📌 Fill out our Internship Application Form: <a href="#" class="button">Apply Here</a></p>
              
              <p>It only takes a few minutes! Once submitted, our team will review your application and reach out to you.</p>
              
              <h2>💡 Why Intern at NexLume?</h2>
              
              <ul>
                <li>✅ Work on real projects with industry professionals</li>
                <li>✅ Gain practical experience in a dynamic startup environment</li>
                <li>✅ Receive mentorship and career growth opportunities</li>
                <li>✅ Potential for full-time placement based on performance</li>
              </ul>
              
              <h2>📞 Need Assistance? We're Here to Help!</h2>
              
              <p>📞 Phone: <a href="tel:+919834248447">+91 9834248447</a></p>
              <p>📧 Email: <a href="mailto:nexlume.co@gmail.com">nexlume.co@gmail.com</a></p>
              <p>⏰ Business Hours: Monday - Saturday | 9 AM - 6 PM IST</p>
              
              <p>Follow us on our social media channels for the latest updates and opportunities! <a href="#">Connect with us</a></p>
              
              <p>We look forward to reviewing your application and potentially welcoming you to the NexLume team!</p>
              
              <p>Best regards,<br><strong>The NexLume Team</strong></p>
            </div>
            <div class="footer">
              <p>© ${new Date().getFullYear()} NexLume. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.json({
      success: true,
      message: "Email sent successfully",
    });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send email. Please try again later.",
    });
  }
});

export default router;


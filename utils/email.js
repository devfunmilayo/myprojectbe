const nodemailer = require("nodemailer");

// ✅ Using your actual .env variable names
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_MAIL,
    pass: process.env.APP_PASSWORD,
  },
});

const sendWelcomeEmail = async (user) => {
  await transporter.sendMail({
    from: `"Mercova" <${process.env.APP_MAIL}>`,
    to: user.email,
    subject: "Welcome to Mercova 🎉",
    html: `
      <!DOCTYPE html>
      <html>
        <head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0"/></head>
        <body style="margin:0;padding:0;background-color:#f8f9fa;font-family:'Segoe UI',Arial,sans-serif;">
          <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f9fa;padding:40px 0;">
            <tr>
              <td align="center">
                <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.08);">

                  <!-- Header -->
                  <tr>
                    <td style="background:linear-gradient(135deg,#0F172A 0%,#1E3A5F 100%);padding:40px;text-align:center;">
                      <h1 style="color:#ffffff;font-size:28px;font-weight:800;margin:0;">Mercova</h1>
                      <p style="color:#94A3B8;font-size:13px;margin:6px 0 0;">The premium infrastructure for digital visionaries</p>
                    </td>
                  </tr>

                  <!-- Hero -->
                  <tr>
                    <td style="padding:40px 40px 0;text-align:center;">
                      <div style="font-size:48px;margin-bottom:16px;">🎉</div>
                      <h2 style="color:#111827;font-size:24px;font-weight:800;margin:0 0 12px;">
                        Welcome aboard, ${user.firstname}!
                      </h2>
                      <p style="color:#6B7280;font-size:14px;line-height:1.7;margin:0;">
                        You've just joined <strong>50,000+ creators and learners</strong> on Mercova. We're excited to have you here!
                      </p>
                    </td>
                  </tr>

                  <!-- Cards -->
                  <tr>
                    <td style="padding:32px 40px;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td width="48%" style="background:#EFF6FF;border-radius:14px;padding:20px;vertical-align:top;">
                            <div style="font-size:28px;margin-bottom:10px;">🛒</div>
                            <h3 style="color:#1D4ED8;font-size:14px;font-weight:800;margin:0 0 6px;">Browse & Buy</h3>
                            <p style="color:#6B7280;font-size:12px;line-height:1.6;margin:0;">Discover thousands of eBooks, courses and templates from top creators.</p>
                          </td>
                          <td width="4%"></td>
                          <td width="48%" style="background:#F0FDF4;border-radius:14px;padding:20px;vertical-align:top;">
                            <div style="font-size:28px;margin-bottom:10px;">💰</div>
                            <h3 style="color:#16A34A;font-size:14px;font-weight:800;margin:0 0 6px;">Sell & Earn</h3>
                            <p style="color:#6B7280;font-size:12px;line-height:1.6;margin:0;">Upload your own digital products and start earning from your knowledge.</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                  <!-- Trending -->
                  <tr>
                    <td style="padding:0 40px 32px;">
                      <h3 style="color:#111827;font-size:15px;font-weight:800;margin:0 0 16px;">🔥 Trending on Mercova</h3>
                      <table width="100%" cellpadding="0" cellspacing="0">
                        ${[
                          { emoji: "💻", title: "Growth Hacking Mastery", price: "$149", badge: "COURSE" },
                          { emoji: "📘", title: "The Solopreneur Playbook", price: "$39", badge: "EBOOK" },
                          { emoji: "🎨", title: "Elite UI Component Kit", price: "$89", badge: "ASSETS" },
                        ].map((p) => `
                          <tr>
                            <td style="padding:10px 0;border-bottom:1px solid #F3F4F6;">
                              <table width="100%" cellpadding="0" cellspacing="0">
                                <tr>
                                  <td width="40" style="font-size:24px;">${p.emoji}</td>
                                  <td>
                                    <div style="font-size:13px;font-weight:700;color:#111827;">${p.title}</div>
                                    <span style="font-size:10px;font-weight:800;color:#1D4ED8;background:#DBEAFE;padding:2px 8px;border-radius:20px;">${p.badge}</span>
                                  </td>
                                  <td align="right" style="font-size:14px;font-weight:800;color:#111827;">${p.price}</td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        `).join("")}
                      </table>
                    </td>
                  </tr>

                  <!-- CTA -->
                  <tr>
                    <td style="padding:0 40px 40px;text-align:center;">
                      <a href="http://localhost:5173/buyer"
                        style="display:inline-block;background:#2563EB;color:#ffffff;font-size:15px;font-weight:800;padding:16px 40px;border-radius:14px;text-decoration:none;">
                        Start Exploring Mercova →
                      </a>
                      <p style="color:#9CA3AF;font-size:12px;margin:16px 0 0;">Questions? Reply to this email — we're happy to help.</p>
                    </td>
                  </tr>

                  <!-- Footer -->
                  <tr>
                    <td style="background:#F9FAFB;padding:24px 40px;border-top:1px solid #E5E7EB;">
                      <table width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                          <td><span style="font-size:16px;font-weight:800;color:#2563EB;">Mercova</span></td>
                          <td align="right"><span style="font-size:12px;color:#9CA3AF;">Explore · Sell · Learn</span></td>
                        </tr>
                        <tr>
                          <td colspan="2" style="padding-top:8px;">
                            <p style="font-size:11px;color:#D1D5DB;margin:0;">© 2026 Mercova. Built for the Digital Curator.</p>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>

                </table>
              </td>
            </tr>
          </table>
        </body>
      </html>
    `,
  });
};

module.exports = { sendWelcomeEmail };
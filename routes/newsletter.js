const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.APP_MAIL,
    pass: process.env.APP_PASSWORD,
  },
});

// ── POST /newsletter/subscribe ─────────────────────────────────────────────
// Saves email and sends first newsletter immediately
router.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // Send the first newsletter immediately
    await transporter.sendMail({
      from: `"Mercova Weekly" <${process.env.APP_MAIL}>`,
      to: email,
      subject: "🔥 Your First Mercova Digest is Here!",
      html: `
        <!DOCTYPE html>
        <html>
          <head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width, initial-scale=1.0"/></head>
          <body style="margin:0;padding:0;background:#f8f9fa;font-family:'Segoe UI',Arial,sans-serif;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f9fa;padding:40px 0;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:20px;overflow:hidden;box-shadow:0 4px 24px rgba(0,0,0,0.07);">

                    <!-- Header -->
                    <tr>
                      <td style="background:linear-gradient(135deg,#0F172A,#1E3A5F);padding:36px 40px;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td>
                              <p style="color:#94A3B8;font-size:12px;margin:0 0 4px;text-transform:uppercase;letter-spacing:1px;">MERCOVA WEEKLY</p>
                              <h1 style="color:#fff;font-size:26px;font-weight:800;margin:0;">The Digital Creator Digest</h1>
                            </td>
                            <td align="right">
                              <span style="background:#F59E0B;color:#78350F;font-size:11px;font-weight:800;padding:6px 14px;border-radius:20px;">ISSUE #1</span>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Welcome note -->
                    <tr>
                      <td style="padding:32px 40px 0;">
                        <p style="color:#6B7280;font-size:14px;line-height:1.8;margin:0;">
                          Hey there! 👋 Welcome to the Mercova Weekly Digest — your Monday dose of trending products, creator tips, and exclusive deals. Here's what's hot this week 🔥
                        </p>
                      </td>
                    </tr>

                    <!-- Divider -->
                    <tr><td style="padding:24px 40px 0;"><hr style="border:none;border-top:1px solid #F3F4F6;"/></td></tr>

                    <!-- Section: This week's picks -->
                    <tr>
                      <td style="padding:24px 40px 0;">
                        <h2 style="color:#111827;font-size:18px;font-weight:800;margin:0 0 20px;">🏆 This Week's Top Picks</h2>

                        <!-- Product 1 -->
                        <table width="100%" cellpadding="0" cellspacing="0" style="background:#EFF6FF;border-radius:14px;padding:20px;margin-bottom:14px;">
                          <tr>
                            <td width="60" style="font-size:36px;vertical-align:top;padding-right:16px;">💻</td>
                            <td style="vertical-align:top;">
                              <span style="background:#DBEAFE;color:#1D4ED8;font-size:10px;font-weight:800;padding:3px 10px;border-radius:20px;">COURSE</span>
                              <h3 style="color:#111827;font-size:15px;font-weight:800;margin:8px 0 4px;">Growth Hacking Mastery 2024</h3>
                              <p style="color:#6B7280;font-size:12px;line-height:1.6;margin:0 0 10px;">The #1 rated course on scaling your SaaS business from zero to $1M ARR. Students are reporting 3x revenue in 90 days.</p>
                              <table cellpadding="0" cellspacing="0">
                                <tr>
                                  <td style="font-size:18px;font-weight:800;color:#111827;padding-right:16px;">$149</td>
                                  <td><a href="http://localhost:5173/product/1" style="background:#2563EB;color:#fff;font-size:12px;font-weight:800;padding:8px 18px;border-radius:8px;text-decoration:none;">View Course →</a></td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>

                        <!-- Product 2 -->
                        <table width="100%" cellpadding="0" cellspacing="0" style="background:#FFF7ED;border-radius:14px;padding:20px;margin-bottom:14px;">
                          <tr>
                            <td width="60" style="font-size:36px;vertical-align:top;padding-right:16px;">📘</td>
                            <td style="vertical-align:top;">
                              <span style="background:#FEF3C7;color:#92400E;font-size:10px;font-weight:800;padding:3px 10px;border-radius:20px;">EBOOK</span>
                              <h3 style="color:#111827;font-size:15px;font-weight:800;margin:8px 0 4px;">The Solopreneur Playbook</h3>
                              <p style="color:#6B7280;font-size:12px;line-height:1.6;margin:0 0 10px;">150 pages of pure strategy. Build a one-person business that earns while you sleep — no team required.</p>
                              <table cellpadding="0" cellspacing="0">
                                <tr>
                                  <td style="font-size:18px;font-weight:800;color:#111827;padding-right:16px;">$39</td>
                                  <td><a href="http://localhost:5173/product/2" style="background:#D97706;color:#fff;font-size:12px;font-weight:800;padding:8px 18px;border-radius:8px;text-decoration:none;">Get the Book →</a></td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>

                        <!-- Product 3 -->
                        <table width="100%" cellpadding="0" cellspacing="0" style="background:#F5F3FF;border-radius:14px;padding:20px;margin-bottom:0;">
                          <tr>
                            <td width="60" style="font-size:36px;vertical-align:top;padding-right:16px;">🎨</td>
                            <td style="vertical-align:top;">
                              <span style="background:#EDE9FE;color:#6D28D9;font-size:10px;font-weight:800;padding:3px 10px;border-radius:20px;">ASSETS</span>
                              <h3 style="color:#111827;font-size:15px;font-weight:800;margin:8px 0 4px;">Elite UI Component Kit</h3>
                              <p style="color:#6B7280;font-size:12px;line-height:1.6;margin:0 0 10px;">500+ production-ready React & Figma components. Ship beautiful products 10x faster. Used by 2,000+ developers.</p>
                              <table cellpadding="0" cellspacing="0">
                                <tr>
                                  <td style="font-size:18px;font-weight:800;color:#111827;padding-right:16px;">$89</td>
                                  <td><a href="http://localhost:5173/product/3" style="background:#7C3AED;color:#fff;font-size:12px;font-weight:800;padding:8px 18px;border-radius:8px;text-decoration:none;">Get the Kit →</a></td>
                                </tr>
                              </table>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Divider -->
                    <tr><td style="padding:28px 40px 0;"><hr style="border:none;border-top:1px solid #F3F4F6;"/></td></tr>

                    <!-- Creator tip section -->
                    <tr>
                      <td style="padding:24px 40px 0;">
                        <h2 style="color:#111827;font-size:18px;font-weight:800;margin:0 0 16px;">💡 Creator Tip of the Week</h2>
                        <table width="100%" cellpadding="0" cellspacing="0" style="background:#F0FDF4;border-left:4px solid #16A34A;border-radius:0 12px 12px 0;padding:20px;">
                          <tr>
                            <td>
                              <h3 style="color:#15803D;font-size:14px;font-weight:800;margin:0 0 8px;">"Price your knowledge, not your time"</h3>
                              <p style="color:#4B5563;font-size:13px;line-height:1.7;margin:0;">
                                Most creators underprice their digital products because they compare them to freelance hourly rates. But a course or eBook can sell 10,000 times without extra work. Package your expertise into a product once — earn from it forever. Start with what you already know.
                              </p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- Divider -->
                    <tr><td style="padding:28px 40px 0;"><hr style="border:none;border-top:1px solid #F3F4F6;"/></td></tr>

                    <!-- Stats section -->
                    <tr>
                      <td style="padding:24px 40px 0;">
                        <h2 style="color:#111827;font-size:18px;font-weight:800;margin:0 0 16px;">📊 Mercova This Week</h2>
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td width="33%" align="center" style="background:#F9FAFB;border-radius:12px;padding:16px 8px;">
                              <div style="font-size:24px;font-weight:800;color:#2563EB;">1,247</div>
                              <div style="font-size:11px;color:#6B7280;margin-top:4px;">Products Sold</div>
                            </td>
                            <td width="4%"></td>
                            <td width="33%" align="center" style="background:#F9FAFB;border-radius:12px;padding:16px 8px;">
                              <div style="font-size:24px;font-weight:800;color:#16A34A;">843</div>
                              <div style="font-size:11px;color:#6B7280;margin-top:4px;">New Creators</div>
                            </td>
                            <td width="4%"></td>
                            <td width="33%" align="center" style="background:#F9FAFB;border-radius:12px;padding:16px 8px;">
                              <div style="font-size:24px;font-weight:800;color:#D97706;">$42K</div>
                              <div style="font-size:11px;color:#6B7280;margin-top:4px;">Creator Earnings</div>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>

                    <!-- CTA -->
                    <tr>
                      <td style="padding:32px 40px;text-align:center;">
                        <a href="http://localhost:5173/buyer"
                          style="display:inline-block;background:#2563EB;color:#fff;font-size:15px;font-weight:800;padding:16px 40px;border-radius:14px;text-decoration:none;">
                          Browse All Products →
                        </a>
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
                              <p style="font-size:11px;color:#D1D5DB;margin:0;">
                                © 2026 Mercova. Built for the Digital Curator. · You're receiving this because you subscribed to our weekly digest.
                              </p>
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

    res.json({ message: "Subscribed! Your first digest is on its way 🎉" });
  } catch (err) {
    console.error("Newsletter error:", err);
    res.status(500).json({ message: "Could not subscribe. Try again." });
  }
});

module.exports = router;
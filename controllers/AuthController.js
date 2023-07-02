const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");

const Admin = mongoose.model("Admin");
const Customer = mongoose.model("Customer");

exports.adminLogin = (req, res, next) => {
    let token;
    let validTokens;
    let stayLoggedIn = req.body.stayLoggedIn || false;
    let expirationTime;
    let numOfDays = 1;
    stayLoggedIn
        ? (expirationTime = null)
        : (expirationTime = { expiresIn: numOfDays + "d" });
    Admin.findOne({
        username: req.body.username,
    })
        .then((admin) => {
            if (!admin)
            {
                let error = new Error("Invalid email or password.");
                error.status = 422;
                throw error;
            }
            if (bcrypt.compareSync(req.body.password, admin.password))
            {
                token = jwt.sign(
                    {
                        username: admin.username,
                        id: admin._id,
                        role: "admin",
                    },
                    process.env.secretKey,
                    expirationTime
                );
                validTokens = admin.tokens || [];
                validTokens = validTokens.filter((t) => {
                    try
                    {
                        jwt.verify(t, process.env.secretKey);
                        return true;
                    } catch (error)
                    {
                        return false;
                    }
                });
                return Admin.findByIdAndUpdate(admin._id, {
                    tokens: [...validTokens, token],
                });
            } else
            {
                const error = new Error("Invalid email or password.");
                error.status = 422;
                throw error;
            }
        })
        .then((admin) => {
            res.status(200).json({ data: "ok", token });
        })
        .catch((error) => next(error));
};

exports.login = (req, res, next) => {
    let token;
    let validTokens;
    let stayLoggedIn = req.body.stayLoggedIn || false;
    let expirationTime;
    let numOfDays = 1;
    stayLoggedIn
        ? (expirationTime = { expiresIn: "1y" })
        : (expirationTime = { expiresIn: numOfDays + "d" });
    Customer.findOne({
        email: req.body.email,
    })
        .then((customer) => {
            if (!customer)
            {
                let error = new Error("Invalid email or password.");
                error.status = 422;
                throw error;
            }
            if (bcrypt.compareSync(req.body.password, customer.password))
            {
                token = jwt.sign(
                    {
                        email: customer.email,
                        id: customer._id,
                        role: "customer",
                    },
                    process.env.secretKey,
                    expirationTime
                );
                validTokens = customer.tokens || [];
                validTokens = validTokens.filter((t) => {
                    try
                    {
                        jwt.verify(t, process.env.secretKey);
                        return true;
                    } catch (error)
                    {
                        return false;
                    }
                });
                return Customer.findByIdAndUpdate(customer._id, {
                    tokens: [...validTokens, token],
                });
            } else
            {
                const error = new Error("Invalid email or password.");
                error.status = 422;
                throw error;
            }
        })
        .then((customer) => {
            res.status(200).json({ data: "ok", token });
        })
        .catch((error) => next(error));
};

exports.logout = (req, res, next) => {
    try
    {
        const token = req.get("authorization").split(" ")[1];
        if (req.decodedToken.role === "customer")
        {
            Customer.findOneAndUpdate(
                { _id: req.decodedToken.id },
                { $pull: { tokens: token } }
            )
                .then((customer) => {
                    res.status(200).json({ message: "logged out" });
                })
                .catch((error) => next(error));
        }
        else if (req.decodedToken.role === "admin")
        {
            Admin.findOneAndUpdate(
                { _id: req.decodedToken.id },
                { $pull: { tokens: token } }
            )
                .then((admin) => {
                    res.status(200).json({ message: "logged out" });
                })
                .catch((error) => next(error));
        }
    } catch (error)
    {
        next(error);
    }
};

exports.verify = (req, res, next) => {
    let mailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'mixsupplementsiti@gmail.com',
            pass: 'fostpsxyomjcjhgx'
        }
    });

    let mailDetails = {
        from: 'mixsupplementsiti@gmail.com',
        to: req.body.to,
        subject: 'Welcome to Mix Supplements',
        html: `
        <!DOCTYPE html>
        <html>
        <head>
        
          <meta charset="utf-8">
          <meta http-equiv="x-ua-compatible" content="ie=edge">
          <title>Email Confirmation</title>
          <meta name="viewport" content="width=device-width, initial-scale=1">
          <style type="text/css">
          /**
           * Google webfonts. Recommended to include the .woff version for cross-client compatibility.
           */
          @media screen {
            @font-face {
              font-family: 'Source Sans Pro';
              font-style: normal;
              font-weight: 400;
              src: local('Source Sans Pro Regular'), local('SourceSansPro-Regular'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/ODelI1aHBYDBqgeIAH2zlBM0YzuT7MdOe03otPbuUS0.woff) format('woff');
            }
            @font-face {
              font-family: 'Source Sans Pro';
              font-style: normal;
              font-weight: 700;
              src: local('Source Sans Pro Bold'), local('SourceSansPro-Bold'), url(https://fonts.gstatic.com/s/sourcesanspro/v10/toadOcfmlt9b38dHJxOBGFkQc6VGVFSmCnC_l7QZG60.woff) format('woff');
            }
          }
          /**
           * Avoid browser level font resizing.
           * 1. Windows Mobile
           * 2. iOS / OSX
           */
          body,
          table,
          td,
          a {
            -ms-text-size-adjust: 100%; /* 1 */
            -webkit-text-size-adjust: 100%; /* 2 */
          }
          /**
           * Remove extra space added to tables and cells in Outlook.
           */
          table,
          td {
            mso-table-rspace: 0pt;
            mso-table-lspace: 0pt;
          }
          /**
           * Better fluid images in Internet Explorer.
           */
          img {
            -ms-interpolation-mode: bicubic;
          }
          /**
           * Remove blue links for iOS devices.
           */
          a[x-apple-data-detectors] {
            font-family: inherit !important;
            font-size: inherit !important;
            font-weight: inherit !important;
            line-height: inherit !important;
            color: inherit !important;
            text-decoration: none !important;
          }
          /**
           * Fix centering issues in Android 4.4.
           */
          div[style*="margin: 16px 0;"] {
            margin: 0 !important;
          }
          body {
            width: 100% !important;
            height: 100% !important;
            padding: 0 !important;
            margin: 0 !important;
          }
          /**
           * Collapse table borders to avoid space between cells.
           */
          table {
            border-collapse: collapse !important;
          }
          a {
            color: #1a82e2;
          }
          img {
            height: auto;
            line-height: 100%;
            text-decoration: none;
            border: 0;
            outline: none;
          }
          </style>
        
        </head>
        <body style="background-color: #e9ecef;">
        
          <!-- start preheader -->
          <div class="preheader" style="display: none; max-width: 0; max-height: 0; overflow: hidden; font-size: 1px; line-height: 1px; color: #fff; opacity: 0;">
            A preheader is the short summary text that follows the subject line when an email is viewed in the inbox.
          </div>
          <!-- end preheader -->
        
          <!-- start body -->
          <table border="0" cellpadding="0" cellspacing="0" width="100%">
        
            <!-- start logo -->
            <tr>
              <td align="center" bgcolor="#e9ecef">
                <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                <tr>
                <td align="center" valign="top" width="600">
                <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                  <tr>
                    <td align="center" valign="top" style="padding: 36px 24px;">
                    </td>
                  </tr>
                </table>
                <!--[if (gte mso 9)|(IE)]>
                </td>
                </tr>
                </table>
                <![endif]-->
              </td>
            </tr>
            <!-- end logo -->
        
            <!-- start hero -->
            <tr>
              <td align="center" bgcolor="#e9ecef">
                <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                <tr>
                <td align="center" valign="top" width="600">
                <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                  <tr>
                    <td align="left" bgcolor="#ffffff" style="padding: 36px 24px 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; border-top: 3px solid #d4dadf;">
                      <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Confirm Your Email Address</h1>
                    </td>
                  </tr>
                </table>
                <!--[if (gte mso 9)|(IE)]>
                </td>
                </tr>
                </table>
                <![endif]-->
              </td>
            </tr>
            <!-- end hero -->
        
            <!-- start copy block -->
            <tr>
              <td align="center" bgcolor="#e9ecef">
                <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                <tr>
                <td align="center" valign="top" width="600">
                <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
        
                  <!-- start copy -->
                  <tr>
                    <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;">
                      <p style="margin: 0;">Tap the button below to confirm your email address. If you didn't create an account with <a href="http://localhost:3000/">Mix Supplements</a>, you can safely delete this email.</p>
                    </td>
                  </tr>
                  <!-- end copy -->
        
                  <!-- start button -->
                  <tr>
                    <td align="left" bgcolor="#ffffff">
                      <table border="0" cellpadding="0" cellspacing="0" width="100%">
                        <tr>
                          <td align="center" bgcolor="#ffffff" style="padding: 12px;">
                            <table border="0" cellpadding="0" cellspacing="0">
                              <tr>
                                <td align="center" bgcolor="#FFF200" style="border-radius: 6px;">
                                  <a href="http://localhost:3000/login" target="_blank" style="display: inline-block; padding: 16px 36px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; color: black; text-decoration: none; border-radius: 6px;">Confirm Email</a>
                                </td>
                              </tr>
                            </table>
                          </td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                  <!-- end button -->
        
                  <!-- start copy -->
                  <tr>
                    <td align="left" bgcolor="#ffffff" style="padding: 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px; border-bottom: 3px solid #d4dadf">
                      <p style="margin: 0;">Cheers,<br> Mix Supplements Team</p>
                    </td>
                  </tr>
                  <!-- end copy -->
        
                </table>
                <!--[if (gte mso 9)|(IE)]>
                </td>
                </tr>
                </table>
                <![endif]-->
              </td>
            </tr>
            <!-- end copy block -->
        
            <!-- start footer -->
            <tr>
              <td align="center" bgcolor="#e9ecef" style="padding: 24px;">
                <!--[if (gte mso 9)|(IE)]>
                <table align="center" border="0" cellpadding="0" cellspacing="0" width="600">
                <tr>
                <td align="center" valign="top" width="600">
                <![endif]-->
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
        
                  <!-- start permission -->
                  <tr>
                    <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                      <p style="margin: 0;">You received this email because we received a request for registeration for your account. If you didn't request registeration you can safely delete this email.</p>
                    </td>
                  </tr>
                  <!-- end permission -->
        
                  <!-- start unsubscribe -->
                  <tr>
                    <td align="center" bgcolor="#e9ecef" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                      <p style="margin: 0;">To stop receiving these emails, you can <a href="https://www.blogdesire.com" target="_blank">unsubscribe</a> at any time.</p>
                      <p style="margin: 0;">Mix Supplements Team, ITI - Mansoura</p>
                    </td>
                  </tr>
                  <!-- end unsubscribe -->
        
                </table>
                <!--[if (gte mso 9)|(IE)]>
                </td>
                </tr>
                </table>
                <![endif]-->
              </td>
            </tr>
            <!-- end footer -->
        
          </table>
          <!-- end body -->
        
        </body>
        </html>
        `
    };

    mailTransporter.sendMail(mailDetails, function(err, data) {
        if(err) {
            console.log(err);
            res.status(500).send(err);
        } else {
            console.log('Email sent successfully');
            res.send('email sent successfully')
        }
    });
}
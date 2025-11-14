import nodemailer from "nodemailer";

// Enable body parsing for HTML form POST (URL-encoded)
export const config = {
  api: {
    bodyParser: {
      sizeLimit: "1mb",
    },
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // All fields from HTML <form> come here as plain text
    const {
      date,
      patient_name,
      date_of_birth,
      patient_address,
      patient_phone,
      medical_conditions,
      reason_for_referral,
      special_requests,
      referring_dentist,
      dentist_address,
      dentist_phone,
    } = req.body;

    // Radiographs come as radiographs[] → array OR string
    let radiographs = req.body["radiographs[]"] || [];
    if (!Array.isArray(radiographs)) radiographs = [radiographs];
    const radiographsFormatted = radiographs.length
      ? radiographs.join(", ")
      : "No selection";

    // Create SMTP transporter for Hostinger
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST, // smtp.hostinger.com
      port: Number(process.env.SMTP_PORT), // 465
      secure: Number(process.env.SMTP_PORT) === 465, // SSL
      auth: {
        user: process.env.EMAIL, // info@drgebril.com
        pass: process.env.PASSWORD, // Hostinger email password
      },
    });

    // Prepare email message
    await transporter.sendMail({
      from: process.env.EMAIL,
      to: "info@drgebril.com",
      subject: "Doctors Referral Form",
      text: `
Date: ${date}
Patient Name: ${patient_name}
Date Of Birth: ${date_of_birth}
Patient Address: ${patient_address}
Patient Phone: ${patient_phone}
Medical Conditions: ${medical_conditions}
Reason for Referral: ${reason_for_referral}
Special Requests: ${special_requests}
Radiographs: ${radiographsFormatted}
Referring Dentist: ${referring_dentist}
Dentist Address: ${dentist_address}
Dentist Phone: ${dentist_phone}
      `,
    });

    return res.status(200).json({ message: "Form sent successfully" });
  } catch (error) {
    console.error("Email Error:", error);
    return res.status(500).json({
      message: "Error sending email",
      error: error.toString(),
    });
  }
}

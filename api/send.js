import nodemailer from "nodemailer";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const {
      date,
      patient_name,
      date_of_birth,
      patient_address,
      patient_phone,
      medical_conditions,
      reason_for_referral,
      special_requests,
      radiographs,
      referring_dentist,
      dentist_address,
      dentist_phone
    } = req.body;

    const radiographsFormatted = Array.isArray(radiographs)
      ? radiographs.join(", ")
      : "No selection";

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: true, // 465 is secure
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      }
    });

    await transporter.sendMail({
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
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
      `
    });

    return res.status(200).json({ message: "Form sent successfully" });

  } catch (error) {
    console.error("Email Error:", error);
    return res.status(500).json({ message: "Error sending email", error });
  }
}

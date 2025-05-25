require("dotenv").config();
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "mail.privateemail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
    },
    tls: {
        rejectUnauthorized: false
    }
});

const app = express();
// ✅ Must be present to parse FormData from fetch
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.post("/submit", async (req, res) => {
    const { name, email, selectDate, selectTime, serviceType } = req.body;
    try {
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: "Appointment Booked via Website",
            html: `
                <h2>New Appointment Booked via Website</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Selected Date:</strong> ${selectDate}</p>
                <p><strong>Selected Time:</strong> ${selectTime}</p>
                <p><strong>Service Type:</strong> ${serviceType}</p>
              `
        });
        return res.status(200).json("Success")
    } catch (error) {
        return res.status(400).json("Bad Input");
    }
});

app.post("/contact-form", async (req, res) => {
    const { name, email, subject, message } = req.body;
    try {
        await transporter.sendMail({
            from: process.env.EMAIL,
            to: process.env.EMAIL,
            subject: "New Web Form Submission",
            html: `
                <h2>New Web Form Submission</h2>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Subject:</strong> ${subject}</p>
                <p><strong>Message:</strong> ${message}</p>
              `
        });
        return res.status(200).json("Success")
    } catch (error) {
        return res.status(400).json("Bad Input");
    }
});

app.listen(3000, () => console.log("Courier server running and listening on port 3000"));

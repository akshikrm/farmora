const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const handlebars = require("handlebars");

// Configure transporter
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Function to compile Handlebars template
const compileTemplate = (templateName, data) => {
    const filePath = path.join(__dirname, `templates/${templateName}.hbs`);
    const source = fs.readFileSync(filePath, "utf8");
    const template = handlebars.compile(source);
    return template(data);
};

// Send Email Function
exports.sendMail = async (to, subject, templateName, templateData) => {
    try {
        const htmlContent = compileTemplate(templateName, templateData);

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to,
            subject,
            html: htmlContent, // Use HTML instead of plain text
        };

        await transporter.sendMail(mailOptions);
        return { success: true, message: "Email sent successfully" };
    } catch (error) {
        console.error("Error sending email:", error);
        return { success: false, error: error.message };
    }
};

const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender.js");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");
const OTPSchema = new mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	otp: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
		expires: 60*15, // The document will be automatically deleted after 5 minutes of its creation time
	},
});

// Define a function to send emails
async function sendVerificationEmail(email, otp) {
	// Create a transporter to send emails

	// Define the email options

	// Send the email
	try {
		console.log('Sending mail');
		const mailResponse = await mailSender(
			email,
			"Verification Email",
			emailTemplate(otp)
		);
		console.log("Email sent successfully: ", mailResponse.response);
	} catch (error) {
		console.log("Error occurred while sending email: ", error);
		throw error;
	}
}

// Define a post-save hook to send email after the document has been saved
OTPSchema.pre("save", async function (next) {
	console.log("New document saved to database");

	// Only send an email when a new document is created
		await sendVerificationEmail(this.email, this.otp);
	next();
});
// OTPSchema.pre("findOneAndUpdate", async function (next) {
// 	console.log("document updated in database");

// 	// Only send an email when a new document is created
// 		await sendVerificationEmail(this.getFilter().email, this.getUpdate().otp);
// 	next();
// });

const OTP = mongoose.model("OTP", OTPSchema);

module.exports = OTP;

const express = require('express');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware to parse JSON bodies
app.use(express.json());

// POST endpoint for sending emails
app.post('/send-email', async (req, res) => {
  const { firstName, lastName, cellNumber, personalEmail, jobDetails } = req.body;

  try {
    // Create a Nodemailer transporter
    let transporter = nodemailer.createTransport({
      // Configure email service provider here
      // For example, Gmail SMTP settings:
      service: 'gmail',
      auth: {
        user: 'omorfarukrony2@gmail.com', // Your email address
        pass: 'sunvi@#12'   // Your email password
      }
    });

    // Compose email
    let mailOptions = {
      from: 'your-email@gmail.com',   // Sender address
      to: 'chris@holtzandbernard.com', // Recipient address
      subject: 'Job Board Inquiry',   // Subject line
      text: `Hey Chris,${firstName} ${lastName} is interested in the ${jobDetails.JobPostTitle} opportunity with ${jobDetails.Firm} in ${jobDetails.City}, ${jobDetails.State}.
      Call him at ${cellNumber} or Email him at ${personalEmail} to discuss.
      
      Job details:
      Firm: ${jobDetails.Firm}
      Job Title: ${jobDetails.JobPostTitle}
      City: ${jobDetails.City}
      State: ${jobDetails.State}
      Practice area: ${jobDetails.PracticeArea}
      Specialties: ${jobDetails.Specialties}
      Link to job: ${jobDetails.JobLink}
      Contact info:
      First name: ${firstName}
      Last name: ${lastName}
      Cell number: ${cellNumber}
      Personal email: ${personalEmail}
      Date: ${new Date().toLocaleDateString()}`,
      };
          // Send email
    let info = await transporter.sendMail(mailOptions);
    console.log('Email sent: %s', info.messageId);

    // Respond with success
    res.status(200).send('Email sent successfully!');
  } catch (error) {
    console.error('Error sending email:', error);
    // Respond with error
    res.status(500).send('Error sending email');
  }
});
console.log(express.text)
// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



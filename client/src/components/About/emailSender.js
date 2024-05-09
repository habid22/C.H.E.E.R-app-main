import React, { useState } from "react";
import "./EmailForm.css"; // Import the CSS file

export default function EmailForm({ baseUrl = "https://my-api-service-qokrqcvrpa-uc.a.run.app/" }) {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const sendEmail = async () => {
    setIsSubmitting(true);
    setError("");

    // Use the email from the state instead of the hardcoded email address
    let dataSend = {
      email :"cheer.group.connect@gmail.com", // This now uses the email state which is set by the user's input
      subject,
      message: `email = ${email}\n\n${message}`, // Concatenate the email with the message
    };

    try {
      const response = await fetch(`${baseUrl}/api/email/sendEmail`, {
        method: "POST",
        body: JSON.stringify(dataSend),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        alert("Send Successfully !");
      } else {
        setError("Failed to send email. Please try again later.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="emailFormContainer">
      <div className="formBox">
        <h2>CHEER Contact Form</h2>
        <p> __________________________________</p>
        {error && <p className="errorMessage">{error}</p>}
        <div>
          <div className="formField">
            <label htmlFor="email" className="formLabel">Email address</label>
            <input id="email" type="email" className="formInput" placeholder="Your Email Address" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="formField">
            <label htmlFor="subject" className="formLabel">Subject</label>
            <input id="subject" type="text" className="formInput" placeholder="Enter the subject here..." onChange={(e) => setSubject(e.target.value)} />
          </div>
          <div className="formField">
            <label htmlFor="message" className="formLabel">Message</label>
            <textarea id="message" className="formTextarea" placeholder="Enter your message here..." onChange={(e) => setMessage(e.target.value)} />
          </div>
          <button type="button" onClick={sendEmail} disabled={isSubmitting} className="formButton">
            {isSubmitting ? 'Sending...' : 'Send Email'}
          </button>
        </div>
      </div>
    </div>
  );
}

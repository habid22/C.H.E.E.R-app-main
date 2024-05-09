import React, { useState } from 'react';
import './newsletter.css';
import Navbar from "../Navbar/navbar";
import { db } from '../../Firebase/firebase';
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const baseUrl = "https://my-api-service-qokrqcvrpa-uc.a.run.app/";


//ADD EMAIL TO A LIST ON FIREBASE

const NewsletterSignup = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const saveEmailToDatabase = async (email) => {
    try {
      await addDoc(collection(db, 'subscribers'), {
        email: email,
        subscribedAt: serverTimestamp(),
      });
      console.log('Email saved to Firestore');
      setMessage('Thank you for subscribing!');
    } catch (error) {
      console.error('Error saving email to Firestore:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };


  const sendEmail = async (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    saveEmailToDatabase(email); // Store
    const subject = "Welcome to the C.H.E.E.R Newsletter!";
    const welcomeMessage = `
    Hello there!

    Welcome and thank you for joining the C.H.E.E.R newsletter! I'm Ivey, and it's my pleasure to have you with us. Your support is vital to our mission to create a more inclusive and educated community, and we can't wait to share our journey with you.

    Here's a sneak peek at what you'll get:
    - The latest on our projects and how you can be part of them.
    - Exclusive invites to our events.
    - Tips and insights on community building and education.

    Your engagement is what powers our work, and we’re thrilled to have you onboard. If you have ideas, questions, or just want to say hi, feel free to reach out at any time.

    Thank you for signing up. Here’s to making a difference together!

    Best wishes,

    Ivey
    Founder, C.H.E.E.R
    contact@cheer.org
  `;


    let dataSend = {

        email: email,
        subject: subject,
        message: welcomeMessage,
    };
    try {
      const res = await fetch(`${baseUrl}/api/email/sendEmail`, {
        method: "POST",
        body: JSON.stringify(dataSend),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      console.log(res);
      if (res.status >= 200 && res.status < 300) {
        setMessage("Sent Successfully!");
      } else {
        setMessage("Failed to send. Please try again.");
      }
    } catch (error) {
      console.error("Error sending email:", error);
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="newsletter-container">
        <h1>Sign up for our newsletter & get the latest updates!</h1>
        <div className="form">
          <form onSubmit={sendEmail}>
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="Enter your email"
              className="email-input"
              required
            />
            <button type="submit" className="button">Subscribe</button>
          </form>
        </div>
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
};

export default NewsletterSignup;

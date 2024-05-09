import Navbar from "../Navbar/navbar";
import { useNavigate } from "react-router-dom";


import React from "react";
import "./about.css";
import ContactUsComponent1 from "./ContactUsComponent1";
import ContactUsComponent2 from "./ContactUsComponent2";
import ContactUsComponent3 from "./ContactUsComponent3";
//import aboutUsImage from "./aboutUsImage";
import ContactUsTitle from "./contactUsTitle";
import AboutUsTitle from "./titleCode";
import AboutUsText from "./aboutUsCode2";
import AboutUsImage from "./aboutUsImage";
//import OppurtunityCode from "./oppurtunityCode";
import OurPartner1 from "./ourPartner1";
import OurPartner2 from "./ourPartner2";
import OurPartner3 from "./OurPartner3";
import OurPartner4 from "./ourPartner4";
import phone from "./phoneIcon.png";
import map from "./map.png";
import linkedin from "./linkedin.png";
import phoneIcon from "./phoneIcon.png";

import Mission1 from "./Mission1";
import Mission2 from "./Mission2";
import Mission3 from "./Mission3";

import email from "./email.png";

import EmailForm from "./emailSender.js";

import caregiver from './aboutUsImages/caregiver.png';
import church from './aboutUsImages/church.png';
import rockGlen from './aboutUsImages/rockGlen.png';
import sunset from './aboutUsImages/sunset.png';

// about page component


function FacebookButton({ url }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-block', backgroundColor: '#617243', color: 'white', padding: '10px 20px', textDecoration: 'none', borderRadius: '5px', margin: '10px 0' }}>
      Connect on Facebook
    </a>
  );
}
export default function About() {

  return (
    <div>
      {<Navbar />}
      <div class="mainBody">
        <AboutUsTitle />
        <AboutUsText />
        <AboutUsImage />
        <Mission1 />
        <Mission2 />
        <Mission3 />

        <div className="about-us-info">
          <h1>O.L.L.I.</h1>
          <p>Ongoing Living & Learning Inc. is a registered not-for-profit caregiver-driven company with three areas of focus: Cheer Group; Cheer Works; Cheer Connections. Vision Statement: To be a community of inclusion and a circle of friendship that supports and enhances the lives of our loved ones with intellectual disabilities as well as the whole family.</p>

          <h1>CHEER Group</h1>
          <p>CHEER Group consists of families caring for an adult with higher functioning intellectual disabilities. We pool our resources to share in hiring support workers on a 4:1 ratio. We have the beautiful facilities of Rock Glen Family Resort at our fingertips. This includes an indoor pool, sauna, fitness center, hall, and kitchen. Some of our projects are integrated with the wider community and there are planned special outings each month. We focus on building life skills, social skills, and leisure skills. We aim to build in as much community inclusion as possible with a focus on the “normal”. Attendees must be able to look after their own self-care needs.</p>
          <FacebookButton url="https://www.facebook.com/cheer.2023?mibextid=PzaGJu" />

          <h1>CHEER Connections</h1>
          <p>Cheer Connections is a group of parents and caregivers; we are all in a similar situation, knowing of someone who has a form of disability. We meet at least once a month to offer each other support and share our knowledge. Our monthly meetings have been funded by the Ontario Caregivers Association, which provided a relaxing day, a nice lunch, and great guest speakers. This group helps reduce isolation for caregivers as well. It is a requirement of the CHEER Group that family members become involved with Cheer Connections.</p>
          <FacebookButton url="https://www.facebook.com/familyconnectionscheer?mibextid=ZbWKwL" />

          <h1>CHEER Works</h1>
          <p>CHEER Works employs members of the CHEER Group who have been developing their job skills. There are many different jobs available considering differing abilities. This is a safe and assisted working environment providing paid employment for our community members with intellectual disabilities. Caregivers and community supporters volunteer to help with this initiative.</p>
          <FacebookButton url="https://www.facebook.com/profile.php?id=100057044577232&mibextid=ZbWKwL" />
        </div>


        <div className="our-partners">
          <h2>Our Partnerships / Key Contributors:</h2>
          <div className="grid-container">
            <div className="grid-item">
              <img src={caregiver} alt="Ontario Caregivers Association" className="partner-logo" />
              <p className="partner-name">Ontario Caregivers Association</p>
            </div>
            <div className="grid-item">
              <img src={church} alt="Algarva 168 Grand Bend" className="partner-logo" />
              <p className="partner-name">Algarva 168 Grand Bend</p>
            </div>
            <div className="grid-item">
              <img src={rockGlen} alt="Rock Glen Family Resort" className="partner-logo" />
              <p className="partner-name">Rock Glen Family Resort</p>
            </div>
            <div className="grid-item">
              <img src={sunset} alt="Sunset Foundation" className="partner-logo" />
              <p className="partner-name">Sunset Foundation</p>
            </div>
          </div>
        </div>


        <div className="hours-container">
            <h2>Hours:</h2>
            <h3>CHEER Group</h3>
            <p>Monday: 8:00-4:00</p>
            <p>Tuesday: 8:00-4:00</p>
            <p>Wednesday: 10:00-4:00</p>
            <p>Thursday: 8:00-4:00</p>
            <p>Friday: 8:00-4:00</p>
            <p>Saturday: CLOSED</p>
            <p>Sunday: CLOSED</p>
            <em>*outing times may differ*</em>

            <h3>CHEER Connections</h3>
            <p>Friday Summer Nights from 5:00-9:00 pm</p>

            <h3>CHEER Works</h3>
            <p>Monday: CLOSED</p>
            <p>Tuesday: CLOSED</p>
            <p>Wednesday: 10:00-8:00</p>
            <p>Thursday: 10:00-8:00</p>
            <p>Friday: 10:00-8:00</p>
            <p>Saturday: 8:00-8:00</p>
            <p>Sunday: 8:00-8:00</p>
            <em>*Hours may differ for long weekends*</em>
            <em>*Store opens May 18th, 2024*</em>
        </div>

        <br/>
        <ContactUsTitle />



        <div className="contact-us-container">
          <img src={phone} alt="Phone" />
          <img src={map} alt="Map" />
          <img src={linkedin} alt="LinkedIn" />
        </div>



        <ContactUsTitle text="   " />
        <ContactUsTitle text="  -  " />
        <ContactUsTitle text="  Our Location  " />
        <ContactUsTitle text="  ________________  " />




        <div className="email-us-container">
          <p><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2913.971529970654!2d-81.82342482383153!3d43.08409388905274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882f13a841b4229b%3A0x66f06e35c9ded4ab!2s8685%20Rock%20Glen%20Rd%2C%20Arkona%2C%20ON%20N0M%201B0!5e0!3m2!1sen!2sca!4v1711314529685!5m2!1sen!2sca"
            width="600" height="450" style={{ border: "0" }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
          </p>

          <div class='sk-ww-google-reviews' data-embed-id='25390861'></div><script src='https://widgets.sociablekit.com/google-reviews/widget.js' async defer></script>
        </div>


      </div>
      <ContactUsTitle text="  ________________  " />

      <ContactUsTitle text="Email Us!" />

      <div className="email-us-container" >


        <a href="mailto:cheer.group.connect@gmail.com" target="_blank" rel="noopener noreferrer">
          <img src={email} alt="Email" />
        </a>



      </div>
      <ContactUsTitle text="  ________________  " />

      <div>{<EmailForm />}</div>
    </div>
  );
}

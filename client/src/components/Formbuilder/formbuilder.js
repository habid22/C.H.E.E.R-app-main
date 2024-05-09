import React, { useState } from 'react';
import Navbar from '../Navbar/navbar';
import { jsPDF } from 'jspdf';
import './formbuilder.css';

const TextEditor = () => {
  const template = `CHEER [EVENT NAME] PERMISSION FORM

  Date: _______________
  
  Child's Information:
  
  Name: _________________________________________
  Date of Birth: _________________________________
  School/Class: __________________________________
  
  Parent/Guardian Information:
  
  Name: _________________________________________
  Relationship to Child: _________________________
  Contact Number: _______________________________
  Email Address: ________________________________
  
  Address:
  
  Street Address: ________________________________
  City: _________________________________________
  State/Province: _______________________________
  ZIP/Postal Code: ______________________________
  
  Event Details:
  
  Name of Event: ________________________________
  Date of Event: _________________________________
  Location of Event: _____________________________
  Time of Event: _________________________________
  
  Transportation:
  
  [ ] I will provide transportation for my child.
  [ ] I permit my child to be transported by the organization.
  
  Medical Information:
  
  Allergies (if any): _____________________________
  Medications (if any): ___________________________
  Special Instructions: ___________________________
  
  Emergency Contact:
  
  Name: _________________________________________
  Relationship to Child: _________________________
  Contact Number: _______________________________
  
  Consent:
  I, [Parent/Guardian Name], give my permission for [Child's Name] to participate in [Event Name] on [Event Date]. I understand that all precautions will be taken to ensure the safety and well-being of my child during this event. In the case of an emergency, I authorize the staff to seek medical treatment for my child as deemed necessary.
  
  Parent/Guardian Signature:________________________ Date: _______________`;

  const [text, setText] = useState(template);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const saveTextAsPDF = () => {
    const doc = new jsPDF();
    const margins = {
      top: 10,
      bottom: 10,
      left: 10,
      width: 190
    };

    doc.setFontSize(10);

    const lines = doc.splitTextToSize(text, margins.width - margins.left * 2);

    let y = margins.top;
    const lineHeight = 5;

    lines.forEach((line) => {
      if (y > doc.internal.pageSize.height - margins.bottom) {
        doc.addPage();
        y = margins.top;
      }
      doc.text(line, margins.left, y);
      y += lineHeight;
    });

    doc.save('document.pdf');
  };

  return (
    <div>
    <Navbar/>
    <div className="text-editor-container">
      <h2 className="text-editor-title">C.H.E.E.R. Permission Form Builder</h2>
      <textarea
        className="text-editor-textarea"
        value={text}
        onChange={handleChange}
        rows="30"
        placeholder="Type something..."
      />
      <button className="text-editor-button" onClick={saveTextAsPDF}>
        Save as PDF
      </button>
    </div>
    </div>
  );
};

export default TextEditor;

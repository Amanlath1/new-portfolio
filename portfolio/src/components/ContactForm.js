// /src/components/ContactForm.js

import React, { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export const ContactForm = () => {
  const form = useRef();
  const [status, setStatus] = useState('Send Message');

  const sendEmail = (e) => {
    e.preventDefault();
    setStatus('Sending...');

    emailjs
      .sendForm(
        process.env.REACT_APP_EMAILJS_SERVICE_ID,
        process.env.REACT_APP_EMAILJS_TEMPLATE_ID,
        form.current,
        process.env.REACT_APP_EMAILJS_PUBLIC_KEY
      )
      .then(
        (result) => {
          console.log('SUCCESS!', result.text);
          setStatus('Message Sent!');
          form.current.reset(); // Clear the form
          setTimeout(() => setStatus('Send Message'), 3000); // Reset button text
        },
        (error) => {
          console.log('FAILED...', error.text);
          setStatus('Failed. Try Again.');
          setTimeout(() => setStatus('Send Message'), 3000);
        }
      );
  };

  return (
    <form ref={form} onSubmit={sendEmail} className="contact-form">
      <input type="text" name="from_name" placeholder="Your Name" required />
      <input type="email" name="from_email" placeholder="Your Email" required />
      <textarea name="message" placeholder="Your Message" required />
      <button type="submit">{status}</button>
    </form>
  );
};

export default ContactForm;
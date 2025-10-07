import React, { useState } from "react";
import emailjs from "emailjs-com";
import "../App.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_36acbyk", // Service ID
        "template_x60omcy", // Template ID
        formData,
        "1u3FyzO9TTWhaMBLl" // Public Key
      )
      .then(
        (result) => {
          console.log(result.text);
          setStatus("THE MESSAGE SENT SUCCESSEFULY✅");
          setFormData({ name: "", email: "", message: "" });
        },
        (error) => {
          console.error(error.text);
          setStatus("THERE IS ERROR ❌");
        }
      );
  };

  return (
    <div className="contact-container">
      <h2><p className="vrwa">Find Us :</p>
“Find us in the heart of Dubai. Our team is ready to assist you with your architecture, interior, and landscape design needs. Let’s build something remarkable together.”</h2>
      <form onSubmit={handleSubmit} className="contact-form">
        <input
          className="soao"
          type="text"
          name="name"
          placeholder="Your Name Please "
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
        className="soao"
          type="email"
          name="email"
          placeholder="Your email goes here"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <textarea
        className="soao"
          name="message"
          placeholder="Type your message here"
          value={formData.message}
          onChange={handleChange}
          required
        ></textarea>

        <button className="dwa" type="submit">
          Send
        </button>
      </form>

      {status && <p className="status-message">{status}</p>}
    </div>
  );
}

import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { FaFacebook, FaInstagram } from "react-icons/fa";
import { MdAccessTime } from "react-icons/md";
import emailjs from "emailjs-com";
import "./ContactUs.css";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    from_name: "",
    to_name: "",
    message: "",
  });
  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs
      .send(
        "service_qg2a35k", // Replace with your EmailJS service ID
        "template_pahe16d", // Replace with your EmailJS template ID
        formData,
        "8kiMpxzwvFPn7G1xz" // Replace with your EmailJS public key
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setStatus("Message sent successfully!");
          setFormData({ from_name: "", to_name: "", message: "" });
        },
        (error) => {
          console.error("FAILED...", error);
          setStatus("Failed to send message. Please try again later.");
        }
      );
  };

  return (
    <section className="contact text-dark" id="contact">
      <Container className="contact-us-container mt-5">
        <Row className="text-center">
          <Col>
            <h1 className="contact-us-header">Contact Us</h1>
          </Col>
        </Row>
        <Row className="mt-4 text-start">
          <Col>
            <h3>Social Media</h3>
            <div className="social-media-icons">
              <div className="d-block mb-3">
                <FaFacebook size={32} /> Cineplexplus
              </div>
              <div className="d-block">
                <FaInstagram size={32} /> Cineplexplus
              </div>
            </div>
            <br />

            <div className="open-hours">
              <p>
                <MdAccessTime size={24} />
                Open: Setiap hari, pukul:
                <b> 09.00 - 11.00 WIB.</b>
              </p>
            </div>
          </Col>
          <Col>
            <h2>Send us a message</h2>
            <Form
              onSubmit={handleSubmit}
              className="contact-form"
              id="contact-form">
              <input type="hidden" name="contact_number" value="697483" />
              <Form.Group controlId="formName" className="mb-3">
                <Form.Control
                  type="text"
                  name="from_name"
                  placeholder="Enter your name"
                  required
                  value={formData.from_name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Control
                  type="email"
                  name="to_name"
                  placeholder="Enter email"
                  required
                  value={formData.to_name}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formMessage" className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={3}
                  name="message"
                  placeholder="Enter your message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Send
              </Button>
            </Form>
            {status && <div className="mt-3 status-message">{status}</div>}
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default ContactUs;

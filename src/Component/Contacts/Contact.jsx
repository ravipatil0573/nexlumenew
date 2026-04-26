import React, { useState, useEffect } from "react";
import "./Contact.css";

const defaultSocialLinks = [
  {
    id: "1",
    name: "X",
    iconSrc:
      "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/x.svg",
    href: "https://www.instagram.com/nexlume",
  },
  {
    id: "2",
    name: "Instagram",
    iconSrc:
      "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/instagram.svg",
    href: "https://www.instagram.com/nexlume",
  },
  {
    id: "3",
    name: "LinkedIn",
    iconSrc:
      "https://cdn.jsdelivr.net/gh/simple-icons/simple-icons/icons/linkedin.svg",
    href: "https://www.linkedin.com/in/nexlume-co-463256384/",
  },
];

const API_BASE = import.meta.env.VITE_API_BASE;

const ContactSection = ({
  title = "We can turn your dream project into reality",
  contactEmail = "nexlume.co@gmail.com",
  socialLinks = defaultSocialLinks,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    businessName: "",
    email: "",
    phone: "",
    countryCode: "+91",
    socialMedia: "",
    budget: "",
    services: [],
    message: "",
  });

  // Auto detect country code based on browser locale
  useEffect(() => {
    const getCountryCode = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();

        if (data && data.country_calling_code) {
          setFormData((prev) => ({
            ...prev,
            countryCode: data.country_calling_code,
          }));
        } else {
          setFormData((prev) => ({ ...prev, countryCode: "+91" }));
        }
      } catch (error) {
        console.error("Error detecting country code:", error);
        setFormData((prev) => ({ ...prev, countryCode: "+91" }));
      }
    };

    getCountryCode();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (service, checked) => {
    setFormData((prev) => {
      const updated = checked
        ? [...prev.services, service]
        : prev.services.filter((s) => s !== service);
      return { ...prev, services: updated };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${API_BASE}/api/contact/submit`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.message || "Something went wrong. Please try again.");
        return;
      }

      // ✅ FREE beginner setup message
      alert("Thanks for contacting NexLume. Our team will reach out soon.");

      // OPTIONAL: reset form
      setFormData({
        name: "",
        businessName: "",
        email: "",
        phone: "",
        countryCode: "+91",
        socialMedia: "",
        budget: "",
        services: [],
        message: "",
      });
    } catch (error) {
      console.error("Contact submit failed:", error);
      alert("Network error. Please try again later.");
    }
  };

  const serviceOptions = [
    "Website",
    "Mobile App",
    "Web App",
    "E-Commerce",
    "Brand Identity",
    "SEO",
    "Social Media Marketing",
    "Brand Strategy & Consulting",
    "Other",
  ];

  const budgetOptions = [
    "₹5,000 - ₹10,000",
    "₹10,000 - ₹15,000",
    "₹15,000 - ₹20,000",
  ];

  return (
    <section className="contact-section">
      {/* Background elements */}
      <div className="contact-bg-gradient"></div>
      <div className="contact-noise"></div>

      <div className="contact-wrapper">
        {/* Header Section */}
        <div className="contact-header-section">
          <div className="header-label">Get In Touch</div>
          <h1 className="header-main-title">{title}</h1>
          <p className="header-description">
            Ready to transform your ideas into reality? Let's collaborate and
            create something extraordinary together.
          </p>
        </div>

        <div className="contact-main-grid">
          {/* Left Column - Contact Info */}
          <div className="contact-info-column">
            <div className="info-block">
              <h3 className="info-title">Direct Contact</h3>
              <a href={`mailto:${contactEmail}`} className="email-link">
                {contactEmail}
              </a>
              <p className="info-subtitle">
                We typically respond within 24 hours
              </p>
            </div>

            <div className="info-block">
              <h3 className="info-title">Connect With Us</h3>
              <div className="socials-grid">
                {socialLinks.map((link) => (
                  <a
                    key={link.id}
                    href={link.href}
                    className="social-item"
                    title={link.name}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={link.iconSrc} alt={link.name} />
                    <span>{link.name}</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="info-block">
              <h3 className="info-title">Why Choose Us</h3>
              <ul className="benefits-list">
                <li>Custom solutions tailored to your needs</li>
                <li>Expert team with proven track record</li>
                <li>Transparent communication always</li>
                <li>Timely delivery and support</li>
              </ul>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="contact-form-column">
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-section">
                <h3 className="form-section-title">Your Information</h3>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      id="name"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="name@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label htmlFor="businessName">Company Name</label>
                    <input
                      id="businessName"
                      name="businessName"
                      placeholder="Your Company"
                      value={formData.businessName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <div className="phone-input-group">
                      <span className="country-code">
                        {formData.countryCode}
                      </span>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        placeholder="1234567890"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="socialMedia">
                    Social Media{" "}
                    <span className="optional-text">(Optional)</span>
                  </label>
                  <input
                    id="socialMedia"
                    name="socialMedia"
                    placeholder="@yourhandle or profile link"
                    value={formData.socialMedia}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-section">
                <h3 className="form-section-title">Project Details</h3>

                <div className="form-group full-width">
                  <label htmlFor="budget">Budget Range</label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select your budget</option>
                    {budgetOptions.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group full-width">
                  <label>What services interest you?</label>
                  <div className="services-checkboxes">
                    {serviceOptions.map((service) => (
                      <label key={service} className="checkbox-label">
                        <input
                          type="checkbox"
                          checked={formData.services.includes(service)}
                          onChange={(e) =>
                            handleCheckboxChange(service, e.target.checked)
                          }
                        />
                        <span>{service}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="form-group full-width">
                  <label htmlFor="message">Tell us about your project</label>
                  <textarea
                    id="message"
                    name="message"
                    placeholder="Describe your vision, goals, timeline, and any specific requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                  />
                </div>
              </div>

              <div className="form-actions">
                <button type="submit" className="submit-button">
                  Send Inquiry
                  <svg
                    className="button-icon"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;

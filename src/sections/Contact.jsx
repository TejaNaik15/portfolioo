import React, { useRef, useState } from 'react';
import SocialWrapper from '../components/SocialWrapper';
import useScrollReveal from '../hooks/useScrollReveal';
import { FaPhone, FaEnvelope, FaMapMarkedAlt } from 'react-icons/fa';
import { Globe } from '@/components/magicui/globe.jsx';
import Particles from '../components/Particles';
import { BorderBeam } from '@/components/magicui/border-beam.jsx';
// Removed @emailjs/browser to avoid build-time dependency issues on Vercel

const Contact = () => {
  const sectionRef = useScrollReveal({ threshold: 0.1 }); 
  const formRef = useRef(null);
  const [status, setStatus] = useState('');
  
  // Add relative positioning to fix scroll offset warning
  React.useEffect(() => {
    if (sectionRef.current) {
      sectionRef.current.style.position = 'relative';
    }
  }, []);

  const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

  const sendEmail = async (e) => {
    e.preventDefault();
    setStatus('');
    try {
      // TEMP DEBUG: verify env vars presence in runtime (booleans only)
      console.warn('EMAILJS env present?', {
        service: !!SERVICE_ID,
        template: !!TEMPLATE_ID,
        key: !!PUBLIC_KEY,
      });
      if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
        setStatus('⚠️ Email service not configured.');
        return;
      }
      // Build form data for EmailJS REST API
      const formData = new FormData(formRef.current);
      formData.append('service_id', SERVICE_ID);
      formData.append('template_id', TEMPLATE_ID);
      formData.append('user_id', PUBLIC_KEY);

      const res = await fetch('https://api.emailjs.com/api/v1.0/email/send-form', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        setStatus('✅ Message sent successfully!');
        e.target.reset();
      } else {
        setStatus('❌ Failed to send message. Try again.');
      }
    } catch (err) {
      setStatus('❌ Failed to send message. Try again.');
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="relative min-h-screen bg-primary-dark text-white p-8 flex flex-col items-center justify-center transition-opacity-transform overflow-hidden scroll-mt-28 md:scroll-mt-40">
      <div className="absolute inset-0 z-0 pointer-events-none">
        <Particles className="w-full h-full" alphaParticles={true} particleCount={160} speed={0.1} particleBaseSize={70} sizeRandomness={1} />
      </div>
      <div className="relative container mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-10 text-accent-blue">Contact Me</h1>

        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Write me an email using the form below — I usually reply within 24 hours. Prefer socials? You can also reach me on LinkedIn.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">
          <div className="relative flex w-full h-[360px] md:h-[460px] items-center justify-center overflow-hidden rounded-lg order-2 md:order-1">
            <Globe className="top-16 md:top-20" />
          </div>
          <div className="bg-gray-800/60 backdrop-blur-sm p-6 rounded-lg shadow-lg text-left order-1 md:order-2 w-full">
            <h2 className="text-2xl font-semibold mb-4 text-accent-blue">Send a Message</h2>
            <form ref={formRef} onSubmit={sendEmail} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-lg font-medium text-text-muted mb-1">Name</label>
                <input
                  type="text"
                  name="user_name"
                  id="name"
                  className="w-full p-3 rounded-md bg-gray-700/70 border border-gray-600 focus:border-accent-pink focus:ring focus:ring-accent-pink focus:ring-opacity-50 outline-none"
                  placeholder="Your Name"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-lg font-medium text-text-muted mb-1">Email</label>
                <input
                  type="email"
                  name="user_email"
                  id="email"
                  className="w-full p-3 rounded-md bg-gray-700/70 border border-gray-600 focus:border-accent-pink focus:ring focus:ring-accent-pink focus:ring-opacity-50 outline-none"
                  placeholder="your.email@example.com"
                  required
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-lg font-medium text-text-muted mb-1">Message</label>
                <textarea
                  name="message"
                  id="message"
                  rows="5"
                  className="w-full p-3 rounded-md bg-gray-700/70 border border-gray-600 focus:border-accent-pink focus:ring focus:ring-accent-pink focus:ring-opacity-50 outline-none"
                  placeholder="Your message..."
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="relative w-full bg-accent-blue text-white px-6 py-3 rounded-full text-lg hover:bg-accent-purple transition-colors duration-300 overflow-hidden"
              >
                <span className="relative z-10">Send Message</span>
                <span className="absolute inset-0 rounded-full pointer-events-none" aria-hidden>
                  <BorderBeam duration={8} size={120} colors={["#13ADC7","#945DD6","#FF3C78"]} />
                </span>
              </button>
              {status && <p className="mt-2 text-sm text-center">{status}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

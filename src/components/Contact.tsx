import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';

type FormState = {
  name: string;
  email: string;
  company: string;
  message: string;
  interest: string;
};

const initialFormState: FormState = {
  name: '',
  email: '',
  company: '',
  message: '',
  interest: 'products',
};

const Contact = () => {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    
    // Google Apps Script web app URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbyQtJ2nNpL_qAAMrKs_Wuxo6LPAdaAQjZHqZAdgDBOrFxXk7NGvzew9ItWJSjfkfzgb/exec';
    
    try {
      // Create form data to send
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('company', formData.company);
      formDataToSend.append('interest', formData.interest);
      formDataToSend.append('message', formData.message);
      
      // Send data to Google Sheet via the Apps Script
      const response = await fetch(scriptURL, {
        method: 'POST',
        body: formDataToSend,
        mode: 'no-cors'
      });
      
      // Handle success
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData(initialFormState);
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err) {
      // Handle error
      console.error('Error submitting form:', err);
      setIsSubmitting(false);
      setError('There was an error submitting your form. Please try again.');
      
      // Reset error message after 5 seconds
      setTimeout(() => setError(null), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden bg-slate-900 min-h-screen">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}></div>
      </div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-800 to-slate-900 opacity-50"></div>
      <div className="absolute top-40 -right-40 w-80 h-80 rounded-full bg-purple-500/10 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-blue-500/10 blur-3xl"></div>
      
      <div className="container px-4 mx-auto relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent mb-6">
              Get in Touch
            </h2>
            <p className="text-gray-300 mb-6">
              Ready to explore how AI can transform your business? Our team is here to help you
              navigate the possibilities and find the right solution for your needs.
            </p>
            
            <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-6 mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">Headquarters</h3>
              <p className="text-gray-300">                atkind inc Center<br />
                Pune, Maharashtra 411057<br />
                India
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
                <a 
                  href="mailto:theayushant@gmail.com" 
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  theayushant@gmail.com
                </a>
              </div>
              <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Phone</h3>
                <a 
                  href="tel:+919021027889" 
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  +91 9021027889
                </a>
              </div>
            </div>
          </div>
          
          <div className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Send us a message</h3>
            
            {submitted ? (
              <div className="bg-purple-500/20 border border-purple-500/30 rounded-lg p-4 text-center">
                <h4 className="text-xl font-semibold text-white mb-2">Thank you!</h4>
                <p className="text-gray-300">
                  We've received your message and will get back to you shortly.
                </p>
              </div>
            ) : error ? (
              <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-4 text-center mb-4">
                <h4 className="text-xl font-semibold text-white mb-2">Error</h4>
                <p className="text-gray-300">{error}</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-300 mb-2 text-sm">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 text-white placeholder-gray-400 transition-all"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-300 mb-2 text-sm">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 text-white placeholder-gray-400 transition-all"
                      placeholder="john@company.com"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-gray-300 mb-2 text-sm">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 text-white placeholder-gray-400 transition-all"
                    placeholder="Your Company"
                  />
                </div>
                
                <div>
                  <label htmlFor="interest" className="block text-gray-300 mb-2 text-sm">
                    I'm interested in
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 text-white transition-all"
                  >
                    <option value="products" className="bg-slate-800 text-white">AI Products</option>
                    <option value="services" className="bg-slate-800 text-white">AI Services</option>
                    <option value="partnership" className="bg-slate-800 text-white">Partnership</option>
                    <option value="careers" className="bg-slate-800 text-white">Careers</option>
                    <option value="other" className="bg-slate-800 text-white">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-gray-300 mb-2 text-sm">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 focus:outline-none focus:ring-1 focus:ring-purple-500 text-white placeholder-gray-400 resize-none transition-all"
                    placeholder="Tell us about your project or requirements..."
                  />
                </div>
                
                <button
                  type="submit"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                  className={`w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3 px-6 rounded-lg transition-all duration-200 flex items-center justify-center space-x-2 ${
                    isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-lg hover:shadow-purple-500/25'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <span>Send Message</span>
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
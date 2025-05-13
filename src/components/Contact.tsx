
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData(initialFormState);
      
      // Reset success message after 5 seconds
      setTimeout(() => setSubmitted(false), 5000);
    }, 1500);
  };

  return (
    <section id="contact" className="py-20 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 grid-bg opacity-10"></div>
      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-navy to-navy-100 opacity-50"></div>
      <div className="absolute top-40 -right-40 w-80 h-80 rounded-full bg-techpurple/10 blur-3xl"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-elecblue/10 blur-3xl"></div>
      
      <div className="container px-4 mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold heading-gradient mb-6">Get in Touch</h2>
            <p className="text-white/70 mb-6">
              Ready to explore how AI can transform your business? Our team is here to help you
              navigate the possibilities and find the right solution for your needs.
            </p>
            
            <div className="glass-card p-6 mb-6">
              <h3 className="text-xl font-semibold text-white mb-4">Headquarters</h3>
              <p className="text-white/80">
                TodaysAi Innovation Center<br />
                Hinjewadi Phase II<br />
                Pune, Maharashtra 411057<br />
                India
              </p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Email</h3>
                <a href="mailto:connect@todaysai.com" className="text-elecblue hover:text-elecblue-light">
                  connect@todaysai.com
                </a>
              </div>
              <div className="glass-card p-6">
                <h3 className="text-lg font-semibold text-white mb-2">Phone</h3>
                <a href="tel:+918800123456" className="text-elecblue hover:text-elecblue-light">
                  +91 88001 23456
                </a>
              </div>
            </div>
          </div>
          
          <div className="glass-card p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Send us a message</h3>
            
            {submitted ? (
              <div className="bg-techpurple/20 border border-techpurple/30 rounded-lg p-4 text-center">
                <h4 className="text-xl font-semibold text-white mb-2">Thank you!</h4>
                <p className="text-white/80">
                  We've received your message and will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-white/80 mb-2 text-sm">
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-techpurple focus:outline-none focus:ring-1 focus:ring-techpurple text-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-white/80 mb-2 text-sm">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-techpurple focus:outline-none focus:ring-1 focus:ring-techpurple text-white"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-white/80 mb-2 text-sm">
                    Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-techpurple focus:outline-none focus:ring-1 focus:ring-techpurple text-white"
                  />
                </div>
                
                <div>
                  <label htmlFor="interest" className="block text-white/80 mb-2 text-sm">
                    I'm interested in
                  </label>
                  <select
                    id="interest"
                    name="interest"
                    value={formData.interest}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-techpurple focus:outline-none focus:ring-1 focus:ring-techpurple text-white"
                  >
                    <option value="products" className="bg-navy-200">AI Products</option>
                    <option value="services" className="bg-navy-200">AI Services</option>
                    <option value="partnership" className="bg-navy-200">Partnership</option>
                    <option value="careers" className="bg-navy-200">Careers</option>
                    <option value="other" className="bg-navy-200">Other</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-white/80 mb-2 text-sm">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={4}
                    className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-techpurple focus:outline-none focus:ring-1 focus:ring-techpurple text-white resize-none"
                  ></textarea>
                </div>
                
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full bg-gradient-to-r from-techpurple to-elecblue hover:from-techpurple-dark hover:to-elecblue-dark text-white py-3 rounded-lg transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      Send Message <ArrowRight size={16} className="ml-2" />
                    </span>
                  )}
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

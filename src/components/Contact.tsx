import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { Send, Mail, Phone, MapPin, CheckCircle, AlertCircle, Building, MessageCircle, Sparkles, Globe } from 'lucide-react';
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
  const [isHovering, setIsHovering] = useState(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);

  // Mouse tracking for premium glow effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const mouseXSpring = useSpring(mouseX, { stiffness: 100, damping: 30 });
  const mouseYSpring = useSpring(mouseY, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 60, scale: 0.9 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: {
      y: -5,
      scale: 1.02,
      transition: { type: "spring", stiffness: 400, damping: 10 }
    }
  };

  const glowVariants = {
    initial: { scale: 1, opacity: 0.6 },
    animate: { 
      scale: [1, 1.2, 1], 
      opacity: [0.6, 1, 0.6],
      transition: { duration: 3, repeat: Infinity, ease: "easeInOut" }
    }
  };

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
    <motion.section
      id="contact"
      className="py-20 relative overflow-hidden bg-slate-950 min-h-screen"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      {/* Premium Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <motion.div
          className="absolute -top-40 -left-40 w-96 h-96 rounded-full opacity-20"
          style={{
            background: 'conic-gradient(from 0deg at 50% 50%, #8b5cf6 0deg, #3b82f6 120deg, #06b6d4 240deg, #8b5cf6 360deg)',
          }}
          animate={{
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 8, repeat: Infinity, ease: "easeInOut" }
          }}
        />
        
        <motion.div
          className="absolute -bottom-40 -right-40 w-80 h-80 rounded-full opacity-15"
          style={{
            background: 'conic-gradient(from 180deg at 50% 50%, #ec4899 0deg, #8b5cf6 120deg, #3b82f6 240deg, #ec4899 360deg)',
          }}
          animate={{
            rotate: -360,
            scale: [1, 1.1, 1],
          }}
          transition={{
            rotate: { duration: 25, repeat: Infinity, ease: "linear" },
            scale: { duration: 10, repeat: Infinity, ease: "easeInOut" }
          }}
        />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)',
            backgroundSize: '40px 40px'
          }}></div>
        </div>

        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Interactive mouse glow */}
      <motion.div
        className="fixed w-96 h-96 rounded-full pointer-events-none z-0"
        style={{
          background: 'radial-gradient(circle, rgba(139,92,246,0.1) 0%, transparent 70%)',
          left: mouseXSpring,
          top: mouseYSpring,
          transform: 'translate(-50%, -50%)',
        }}
        animate={{
          scale: isHovering ? 1.5 : 1,
          opacity: isHovering ? 0.3 : 0.1,
        }}
        transition={{ type: "spring", stiffness: 100, damping: 30 }}
      />

      <div className="container px-4 mx-auto relative z-10 max-w-7xl">
        {/* Premium Header */}
        <motion.div 
          className="text-center mb-16"
          variants={cardVariants}
        >
          <div className="relative inline-block mb-6">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-2xl"
              variants={glowVariants}
              initial="initial"
              animate="animate"
            />
            <motion.div
              className="relative backdrop-blur-sm bg-white/5 border border-white/10 rounded-full p-4"
              whileHover={{ scale: 1.05 }}
            >
              <MessageCircle className="h-8 w-8 text-purple-400 mx-auto" />
            </motion.div>
          </div>
          
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Let's Connect
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Ready to explore how AI can transform your business? Our team is here to help you
            navigate the possibilities and find the right solution for your needs.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            className="space-y-8"
            variants={cardVariants}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Headquarters Card */}
            <motion.div
              className="relative group"
              whileHover="hover"
              variants={cardVariants}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
              <div className="relative backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-8 hover:border-purple-500/30 transition-all duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-500/20 to-blue-500/20 flex items-center justify-center">
                      <Building className="h-6 w-6 text-purple-400" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-3">Headquarters</h3>
                    <p className="text-gray-300 leading-relaxed">
                      atkind inc Center<br />
                      Pune, Maharashtra 411057<br />
                      India
                    </p>
                  </div>
                </div>
                <motion.div
                  className="absolute top-4 right-4"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                >
                  <Sparkles className="h-4 w-4 text-purple-400/30" />
                </motion.div>
              </div>
            </motion.div>

            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Email Card */}
              <motion.div
                className="relative group"
                whileHover="hover"
                variants={cardVariants}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
                <div className="relative backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-6 hover:border-blue-500/30 transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-3">
                    <Mail className="h-5 w-5 text-blue-400" />
                    <h3 className="text-lg font-semibold text-white">Email</h3>
                  </div>
                  <a 
                    href="mailto:theayushant@gmail.com" 
                    className="text-blue-400 hover:text-blue-300 transition-colors break-all"
                  >
                    theayushant@gmail.com
                  </a>
                </div>
              </motion.div>

              {/* Phone Card */}
              <motion.div
                className="relative group"
                whileHover="hover"
                variants={cardVariants}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
                <div className="relative backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-6 hover:border-purple-500/30 transition-all duration-300">
                  <div className="flex items-center space-x-3 mb-3">
                    <Phone className="h-5 w-5 text-purple-400" />
                    <h3 className="text-lg font-semibold text-white">Phone</h3>
                  </div>
                  <a 
                    href="tel:+919021027889" 
                    className="text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    +91 9021027889
                  </a>
                </div>
              </motion.div>
            </div>

            {/* Global Reach Indicator */}
            <motion.div
              className="relative group"
              whileHover="hover"
              variants={cardVariants}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 to-blue-600/10 rounded-xl blur-lg group-hover:blur-xl transition-all duration-300" />
              <div className="relative backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-xl p-6 hover:border-cyan-500/30 transition-all duration-300">
                <div className="flex items-center space-x-3">
                  <Globe className="h-5 w-5 text-cyan-400" />
                  <span className="text-gray-300">Serving clients globally from India</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
          
          {/* Premium Contact Form */}
          <motion.div
            className="relative group"
            variants={cardVariants}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            {/* Form background with animated border */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-blue-500/10 rounded-2xl" />
            <div className="relative backdrop-blur-xl bg-white/[0.03] border border-white/10 rounded-2xl p-8 hover:border-purple-500/30 transition-all duration-300">
              <div className="flex items-center space-x-3 mb-8">
                <Send className="h-6 w-6 text-purple-400" />
                <h3 className="text-2xl font-bold text-white">Send us a message</h3>
              </div>
              
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl p-6 text-center"
                  >
                    <div className="absolute inset-0 bg-green-500/5 rounded-xl blur-xl" />
                    <div className="relative">
                      <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-3" />
                      <h4 className="text-xl font-semibold text-white mb-2">Thank you!</h4>
                      <p className="text-gray-300">
                        We've received your message and will get back to you shortly.
                      </p>
                    </div>
                  </motion.div>
                ) : error ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative bg-gradient-to-r from-red-500/10 to-pink-500/10 border border-red-500/30 rounded-xl p-6 text-center mb-6"
                  >
                    <div className="absolute inset-0 bg-red-500/5 rounded-xl blur-xl" />
                    <div className="relative">
                      <AlertCircle className="h-8 w-8 text-red-400 mx-auto mb-3" />
                      <h4 className="text-xl font-semibold text-white mb-2">Error</h4>
                      <p className="text-gray-300">{error}</p>
                    </div>
                  </motion.div>
                ) : (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="space-y-6"
                    onSubmit={handleSubmit}
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <motion.div
                        className="relative"
                        whileFocus={{ scale: 1.02 }}
                        onFocusCapture={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                      >
                        <label htmlFor="name" className="block text-gray-300 mb-2 text-sm font-medium">
                          Your Name
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-white placeholder-gray-400 transition-all duration-300"
                            placeholder="John Doe"
                          />
                          {focusedField === 'name' && (
                            <motion.div
                              className="absolute inset-0 border-2 border-purple-500/30 rounded-xl pointer-events-none"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            />
                          )}
                        </div>
                      </motion.div>
                      
                      <motion.div
                        className="relative"
                        whileFocus={{ scale: 1.02 }}
                        onFocusCapture={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                      >
                        <label htmlFor="email" className="block text-gray-300 mb-2 text-sm font-medium">
                          Email Address
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-white placeholder-gray-400 transition-all duration-300"
                            placeholder="john@company.com"
                          />
                          {focusedField === 'email' && (
                            <motion.div
                              className="absolute inset-0 border-2 border-purple-500/30 rounded-xl pointer-events-none"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              exit={{ opacity: 0 }}
                            />
                          )}
                        </div>
                      </motion.div>
                    </div>
                    
                    <motion.div
                      className="relative"
                      whileFocus={{ scale: 1.02 }}
                      onFocusCapture={() => setFocusedField('company')}
                      onBlur={() => setFocusedField(null)}
                    >
                      <label htmlFor="company" className="block text-gray-300 mb-2 text-sm font-medium">
                        Company
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          id="company"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-white placeholder-gray-400 transition-all duration-300"
                          placeholder="Your Company"
                        />
                        {focusedField === 'company' && (
                          <motion.div
                            className="absolute inset-0 border-2 border-purple-500/30 rounded-xl pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          />
                        )}
                      </div>
                    </motion.div>
                    
                    <motion.div
                      className="relative"
                      whileFocus={{ scale: 1.02 }}
                      onFocusCapture={() => setFocusedField('interest')}
                      onBlur={() => setFocusedField(null)}
                    >
                      <label htmlFor="interest" className="block text-gray-300 mb-2 text-sm font-medium">
                        I'm interested in
                      </label>
                      <div className="relative">
                        <select
                          id="interest"
                          name="interest"
                          value={formData.interest}
                          onChange={handleChange}
                          className="w-full px-4 py-3 bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-white transition-all duration-300"
                        >
                          <option value="products" className="bg-slate-800 text-white">AI Products</option>
                          <option value="services" className="bg-slate-800 text-white">AI Services</option>
                          <option value="partnership" className="bg-slate-800 text-white">Partnership</option>
                          <option value="careers" className="bg-slate-800 text-white">Careers</option>
                          <option value="other" className="bg-slate-800 text-white">Other</option>
                        </select>
                        {focusedField === 'interest' && (
                          <motion.div
                            className="absolute inset-0 border-2 border-purple-500/30 rounded-xl pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          />
                        )}
                      </div>
                    </motion.div>
                    
                    <motion.div
                      className="relative"
                      whileFocus={{ scale: 1.02 }}
                      onFocusCapture={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                    >
                      <label htmlFor="message" className="block text-gray-300 mb-2 text-sm font-medium">
                        Message
                      </label>
                      <div className="relative">
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={4}
                          className="w-full px-4 py-3 bg-white/[0.02] backdrop-blur-sm border border-white/10 rounded-xl focus:border-purple-500/50 focus:outline-none focus:ring-2 focus:ring-purple-500/20 text-white placeholder-gray-400 resize-none transition-all duration-300"
                          placeholder="Tell us about your project or requirements..."
                        />
                        {focusedField === 'message' && (
                          <motion.div
                            className="absolute inset-0 border-2 border-purple-500/30 rounded-xl pointer-events-none"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                          />
                        )}
                      </div>
                    </motion.div>
                    
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="relative w-full group overflow-hidden"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl" />
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/80 to-blue-600/80 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      <div className="relative flex items-center justify-center space-x-3 py-4 px-6 text-white font-medium">
                        {isSubmitting ? (
                          <>
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            />
                            <span>Sending...</span>
                          </>
                        ) : (
                          <>
                            <span>Send Message</span>
                            <Send className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </div>
                    </motion.button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};

export default Contact;
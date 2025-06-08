// Sample project data to be loaded dynamically
const projects = [
  {
    id: 'fairplace',
    title: 'FairPlace',
    url: 'https://fairplace.in',
    type: 'Real Estate Marketplace',
    category: 'Real Estate',
    description: 'Comprehensive real estate platform connecting buyers, sellers, and agents with advanced property search and management capabilities.',
    techStack: ['React', 'Node.js', 'MongoDB', 'Google Maps API', 'Responsive Design'],
    features: [
      'Advanced property search with filters and map view',
      'User profiles for buyers, sellers, and agents',
      'Secure messaging system between parties',
      'Property management dashboard',
      'Automated pricing suggestions based on market trends'
    ],
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop',
    metrics: {
      users: '10K+',
      transactions: '500+',
      performance: '95% uptime'
    },
    date: 'Jan 2023'
  },
  {
    id: 'makemycrop',
    title: 'MakeMyCrop',
    url: 'https://makemycrop.com',
    type: 'Agricultural Investment & FinTech',
    category: 'FinTech',
    description: 'Revolutionary AgTech investment platform enabling users to invest in agricultural projects with transparent ROI tracking and KYC integration.',
    techStack: ['React', 'TypeScript', 'Firebase', 'Stripe API', 'KYC Integration'],
    features: [
      'Agricultural project investments with detailed analytics',
      'Real-time ROI tracking and reporting',
      'Secure KYC verification process',
      'Investment portfolio management',
      'Seasonal crop performance forecasting'
    ],
    image: 'https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=800&auto=format&fit=crop',
    metrics: {
      users: '5K+',
      transactions: '₹10L+',
      performance: 'Real-time tracking'
    },
    date: 'Mar 2023'
  },
  {
    id: 'adityasir',
    title: 'Aditya Sir German Classes',
    url: 'https://adityasirgermanclasses.netlify.app',
    type: 'Language Learning Platform',
    category: 'Education',
    description: 'Interactive German language learning platform with structured courses, student portal, and comprehensive learning materials.',
    techStack: ['React', 'Firebase', 'Video Streaming', 'PWA', 'Cloud Functions'],
    features: [
      'Structured language learning curriculum with progress tracking',
      'Interactive exercises and quizzes with instant feedback',
      'Live and recorded video lessons with subtitles',
      'Student community forum for practice and discussion',
      'Offline access to learning materials'
    ],
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop',
    metrics: {
      users: '1K+',
      performance: 'Interactive learning',
      transactions: '95% completion rate'
    },
    date: 'Jun 2023'
  },
  {
    id: 'wordpressna',
    title: 'WordPressNA',
    url: 'https://wordpressna.com',
    type: 'WordPress Plugin Marketplace',
    category: 'E-commerce',
    description: 'Specialized marketplace for premium WordPress plugins with integrated licensing and support system.',
    techStack: ['WordPress', 'PHP', 'MySQL', 'WooCommerce', 'JavaScript'],
    features: [
      'Secure digital product delivery system',
      'License key generation and management',
      'Developer dashboard for sales analytics',
      'Customer support ticketing integration',
      'Automated plugin updates for customers'
    ],
    image: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=800&auto=format&fit=crop',
    metrics: {
      users: '2K+',
      transactions: '1K+',
      performance: '99.9% uptime'
    },
    date: 'Nov 2023'
  },
  {
    id: 'nextgenai',
    title: 'NextGen AI',
    url: 'https://nextgen-ai.vercel.app',
    type: 'AI Content Platform',
    category: 'AI',
    description: 'Cutting-edge AI content generation platform for marketers and content creators with advanced customization and brand voice training.',
    techStack: ['Next.js', 'TypeScript', 'OpenAI API', 'Vercel Edge Functions', 'Tailwind CSS'],
    features: [
      'AI-powered content generation with brand voice training',
      'Template library for various content types',
      'SEO optimization suggestions for generated content',
      'Content performance analytics',
      'Collaborative team workspaces'
    ],
    image: 'https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&auto=format&fit=crop',
    metrics: {
      users: '3K+',
      transactions: '50K+ generations',
      performance: 'Real-time processing'
    },
    date: 'Feb 2024'
  },
  {
    id: 'smartcommerce',
    title: 'SmartCommerce',
    url: 'https://smart-commerce.app',
    type: 'E-commerce Platform',
    category: 'E-commerce',
    description: 'All-in-one e-commerce solution with headless architecture, multi-channel selling, and advanced inventory management.',
    techStack: ['React', 'Node.js', 'GraphQL', 'MongoDB', 'Stripe'],
    features: [
      'Headless architecture for flexible frontend implementation',
      'Multi-channel selling across web, mobile, and marketplaces',
      'Advanced inventory and order management',
      'Customer segmentation and personalized marketing',
      'Real-time analytics dashboard'
    ],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop',
    metrics: {
      users: '15K+',
      transactions: '₹25L+ monthly',
      performance: '99.8% uptime'
    },
    date: 'Apr 2024'  },
  {
    id: 'srinc',
    title: 'SR Inc',
    url: 'https://srinc.in/',
    type: 'Corporate Website',
    category: 'E-commerce',
    description: 'Professional corporate website for SR Inc with modern design, comprehensive service portfolio, and client testimonials.',
    techStack: ['React', 'TypeScript', 'Responsive Design', 'SEO Optimization', 'Contact Forms'],
    features: [
      'Modern and responsive corporate website design',
      'Comprehensive service and product portfolio',
      'Client testimonials and case studies',
      'Contact forms with inquiry management',
      'SEO optimized content and structure',
      'Mobile-first responsive design'
    ],
    image: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop',
    metrics: {
      users: '2K+',
      transactions: '500+ inquiries',
      performance: '98% uptime'
    },
    date: 'May 2024'
  },
  {
    id: 'sportsgearswag',
    title: 'Sports Gear Swag',
    url: 'https://www.sportsgearswag.com/',
    type: 'E-commerce Platform',
    category: 'E-commerce',
    description: 'Premium sports gear and merchandise e-commerce platform with advanced product filtering, secure payments, and inventory management.',
    techStack: ['WooCommerce', 'WordPress', 'PHP', 'MySQL', 'Payment Gateway Integration'],
    features: [
      'Comprehensive sports gear catalog with advanced search',
      'Secure payment processing and order management',
      'User accounts with order history and tracking',
      'Inventory management with low-stock alerts',
      'Customer reviews and rating system',
      'Mobile-optimized shopping experience'
    ],
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&auto=format&fit=crop',
    metrics: {
      users: '8K+',
      transactions: '₹15L+ monthly',
      performance: '99.5% uptime'
    },
    date: 'Mar 2024'
  },
  {
    id: 'wristband',
    title: 'Wristband Store',
    url: 'https://www.wristband.com/',
    type: 'Specialized E-commerce',
    category: 'E-commerce',
    description: 'Specialized e-commerce platform for custom wristbands and accessories with design tools, bulk ordering, and corporate solutions.',
    techStack: ['React', 'Node.js', 'Express', 'MongoDB', 'Custom Design Tools'],
    features: [
      'Custom wristband design tool with real-time preview',
      'Bulk ordering system for corporate clients',
      'Material and color customization options',
      'Quote generation for large orders',
      'Account management for repeat customers',
      'Integration with manufacturing workflows'
    ],
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop',
    metrics: {
      users: '5K+',
      transactions: '2K+ orders',
      performance: '99.2% uptime'
    },
    date: 'Jul 2024'
  },
  {
    id: 'wordpressna-netlify',
    title: 'WordPress NA Portal',
    url: 'https://wordpressna.netlify.app/',
    type: 'WordPress Resource Hub',
    category: 'Education',
    description: 'Comprehensive WordPress learning and resource platform with tutorials, plugins, themes, and developer tools.',
    techStack: ['Gatsby', 'React', 'GraphQL', 'Netlify', 'Markdown', 'JAMstack'],
    features: [
      'Extensive WordPress tutorial library with step-by-step guides',
      'Plugin and theme reviews with detailed comparisons',
      'Developer resources and code snippets',
      'Community forum for WordPress developers',
      'Regular blog updates on WordPress trends',
      'Fast static site generation with Netlify'
    ],
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop',
    metrics: {
      users: '12K+',
      transactions: '25K+ page views',
      performance: '99.8% uptime'
    },
    date: 'Aug 2024'
  }
];

export default projects;

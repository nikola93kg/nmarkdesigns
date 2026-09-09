import type { Dictionary } from "./types";

const en = {
  navigation: {
    home: "Home", portfolio: "Portfolio", services: "Services",
    about: "About", contact: "Contact", pricing: "Pricing",
  },
  accessibility: {
    skipLink: "Skip to content",
    homeLink: "NMark Designs - home",
    mainNavigation: "Main navigation",
    mobileNavigation: "Mobile navigation",
    footerNavigation: "Footer navigation",
    menu: "Main menu",
    backToTop: "Back to top",
    languageNavigation: "Site language",
    languageLabels: { sr: "Srpski - Serbian", en: "English" },
  },
  actions: {
    quote: "Request a quote",
    contact: "Get in touch",
    allProjects: "All projects",
    viewProject: "View project",
  },
  footer: {
    description: "Professional websites for small businesses, freelancers, and local brands. Built around modern design, speed, and a solid SEO foundation.",
    quickLinks: "Quick links",
    contact: "Contact",
    copyright: "All rights reserved.",
  },
  portfolio: {
    metadata: {
      title: "Portfolio - selected website projects",
      description: "Explore NMark Designs website projects for different industries, each tailored to the client's needs. View our work and get in touch about your website.",
    },
    intro: {
      eyebrow: "Selected work",
      title: "Portfolio",
      description: "Websites for different industries and different needs. Each project reflects our approach to design and the individual needs of the client.",
    },
    contactTitle: "Let's talk about your website.",
    visitWebsite: "Visit website",
  },
  about: {
    metadata: {
      title: "About",
      description: "Meet NMark Designs and founder Nikola Marković. An individual approach to web design, with a focus on user experience, performance and maintainability.",
    },
    intro: {
      eyebrow: "NMark Designs",
      title: "About us",
      description: "We turn ideas into modern, fast and functional websites. Instead of generic solutions, we create thoughtfully designed websites that help your business grow and stand out.",
    },
    profile: {
      eyebrow: "Who we are",
      title: "Who is behind NMark Designs?",
      paragraphs: [
        "NMark Designs was founded by Nikola Marković, a frontend developer with several years of experience building modern, fast and functional websites.",
        "Whether the project uses WordPress, custom code or an e-commerce platform, the goal is the same: a visually appealing, technically stable website optimized for performance.",
        "NMark Designs began with the idea of offering practical, high-quality solutions without unnecessary complexity. The focus is on clarity, sound structure and user experience, making each website easy to use, maintain and extend.",
        "We approach every project individually, taking the time to understand the client's needs and the website's goals: presenting services, strengthening an online presence or increasing sales.",
      ],
      imageAlt: "Nikola Marković, founder of NMark Designs.",
      caption: "Nikola Marković / Founder and frontend developer",
    },
    approach: {
      title: "Our mission",
      principles: [
        "Websites that work for you",
        "User experience comes first",
        "SEO and performance without compromise",
        "Long-term support and improvement",
      ],
      contactTitle: "Let's talk about your website.",
    },
  },
  contact: {
    metadata: {
      title: "Contact",
      description: "Contact NMark Designs about website development, working together or maintenance. Email info@nmarkdesigns.com or call +381 64 300 5654.",
    },
    intro: {
      eyebrow: "Let's start a conversation",
      title: "Contact us",
      description: "Have a question about our services, want to discuss working together or need help maintaining your website? We're here to help.",
    },
    details: {
      title: "We're here for you",
      description: "Have a question, an idea or a request for a quote? Give us a call or write to us.",
      email: "Email",
      phone: "Phone",
      whatsapp: "Message us on WhatsApp",
    },
    form: {
      title: "Interested in working together?",
      labels: { name: "Name", email: "Email", phone: "Phone", message: "Message" },
      optional: "optional",
      required: "Required fields are marked with an asterisk (*).",
      submit: "Send message",
      pending: "Processing message…",
      unavailableNotice: "Form delivery is not currently available. Please contact us directly by email, phone or WhatsApp.",
      validation: {
        required: "Complete this field.",
        tooLong: "This entry exceeds the allowed length. Please shorten it.",
        invalidValue: "Enter a valid text value.",
        invalidEmail: "Enter a valid email address.",
        invalidPhone: "Enter a valid phone number or leave this field empty.",
      },
      status: {
        invalid: "Check the marked fields. Your message has not been sent.",
        unavailable: "Your message has not been sent. Form delivery is not available yet. Please email us directly or give us a call.",
        error: "Your message could not be sent. Please try again or contact us directly.",
        success: "Your message has been accepted for sending.",
      },
    },
  },
  caseStudy: {
    eyebrow: "Website project",
    client: "Client",
    location: "Location",
    category: "Industry",
    services: "Services",
    technologies: "Technologies and tools",
    challenge: "Challenge",
    solution: "Solution",
    results: "Results",
    gallery: "Project views",
    navigation: "Project navigation",
    nextProject: "Next project",
  },
  home: {
    metadata: {
      title: "Professional website design and development",
      description: "NMark Designs builds modern, fast, SEO-friendly websites for small businesses, freelancers, and local brands. Explore our work and request a free quote.",
    },
    hero: {
      eyebrow: "A website that works for your business",
      title: "Professional website design and development",
      subtitle: "Modern, fast, and built for search.",
      description: "Websites for small businesses, freelancers, and local brands. Explore our pricing or request a free quote.",
      imageAlt: "NMark Designs website design montage featuring a tablet, phone, and printed mockups.",
    },
    projects: {
      eyebrow: "Selected work",
      title: "Web design that makes a difference.",
      description: "Every website we create is tailored to our client's needs. Explore a selection of our latest projects.",
    },
    services: {
      eyebrow: "Your online presence deserves more",
      title: "Modern websites.\nA thoughtful approach.",
      description: "From design and SEO to a responsive experience across devices and ongoing maintenance.",
      imageAlt: "The Mađioničar Bojan website displayed on a laptop beside a coffee cup on a desk.",
      items: [
        {
          id: "design",
          title: "Modern web design",
          description: "Every detail is designed to reflect what your brand stands for and capture the attention of your audience.",
        },
        {
          id: "seo",
          title: "Search engine optimization",
          description: "Our approach to SEO helps improve your brand's visibility in search results and connect you with the right audience.",
        },
        {
          id: "responsive",
          title: "Made for every device",
          description: "Our designs adapt to phones, tablets, and computers. We want every visitor to have a great experience on your website, whatever their screen size.",
        },
      ],
      maintenance: {
        id: "maintenance",
        title: "Maintenance and updates",
        description: "The web keeps changing, and we keep up with it for you. We regularly update your website, with technical support and security checks.",
      },
    },
    cta: {
      eyebrow: "Don't let your business go unseen",
      title: "A website that works for you.",
      description: "Get in touch for a free consultation and find out how we can improve your online presence together.",
    },
    faq: {
      eyebrow: "Help center",
      title: "Have a question? Find your answer.",
      description: "Answers to common questions about our services and working together.",
      items: [
        {
          id: "services",
          question: "What services does NMark Designs offer?",
          paragraphs: ["NMark Designs provides website design and development, maintenance, optimization, and other digital solutions tailored to each client's needs."],
        },
        {
          id: "timeline",
          question: "How long does it take to build a website?",
          paragraphs: ["The timeline depends on the complexity of the website and how soon the client provides the required materials. Work begins once you have supplied all the necessary content."],
        },
        {
          id: "payment",
          question: "How does payment work?",
          paragraphs: [],
          list: [
            "A 50% deposit is paid before work begins.",
            "The remaining 50% is paid when the project is completed, before the website goes live and access is handed over.",
            "Maintenance can be paid monthly, quarterly, or annually, as agreed.",
          ],
        },
        {
          id: "hosting",
          question: "Are domain and hosting costs included?",
          paragraphs: ["No. Domain and hosting costs are paid separately, directly to the provider, according to your needs and preferences."],
        },
        {
          id: "maintenance",
          question: "Do you offer website maintenance and optimization?",
          paragraphs: ["Yes, we offer:"],
          list: [
            "Maintenance, including technical support, content updates, and security checks.",
            "Optimization, which can include SEO, website speed improvements, and mobile-friendly adjustments.",
          ],
        },
      ],
    },
  },
} satisfies Dictionary;

export default en;

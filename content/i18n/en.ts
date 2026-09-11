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
    label: "NMarkDesigns footer",
    socialLabel: "NMarkDesigns on social media",
    portfolioLabel: "Portfolio / Projects",
    description: "Professional websites for small businesses, freelancers, and local brands. A focus on modern design, speed, and essential SEO helps your website truly work for you.",
    quickLinks: "Quick links",
    contact: "Contact",
    copyright: "All Rights Reserved",
  },
  portfolio: {
    metadata: {
      title: "Portfolio - selected website projects",
      description: "Explore the NMark Designs website portfolio, with project screenshots, client details, tools used and links to the published client websites.",
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
      title: "About - Nikola Marković",
      description: "Meet Nikola Marković, founder of NMark Designs and frontend developer, and learn about his approach to website design, development and ongoing maintenance.",
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
      description: "Discuss website development or maintenance with NMark Designs and request a quote. Get in touch by email, phone or WhatsApp.",
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
  pricing: {
    metadata: {
      title: "Website pricing",
      description: "View NMark Designs website package pricing for Basic plan, Standard Plan, and Premium plan. Final pricing depends on project complexity and requirements.",
    },
    intro: {
      eyebrow: "Website pricing",
      title: "Find the plan that fits your project",
      description: "Prices are indicative and may vary depending on the complexity and specific requirements of your project. Although the plans are grouped by included services, the final price may also be lower for simpler projects, regardless of the selected package.",
    },
    packageLabel: "Package",
    packageFeaturesLabel: "What you get in this package:",
    packageCta: "Send an inquiry",
    excludedLabel: "Not included",
    packages: {
      basic: {
        features: [
          "Build time up to 15 days",
          "Website optimization",
          "Up to 5 pages",
          "Blog creation",
          "Basic SEO optimization",
          "Content creation",
          "Responsive design",
        ],
        excluded: ["Online store development"],
      },
      standard: {
        features: [
          "Build time up to 20 days",
          "Website optimization",
          "Multilingual support",
          "Blog creation",
          "Image editing: up to 20 images",
          "Basic SEO optimization",
          "Content creation",
          "Responsive design",
        ],
        excluded: ["Online store development"],
      },
      premium: {
        features: [
          "Build period up to 30 days",
          "Website optimization",
          "Multilingual support",
          "Advanced SEO optimization",
          "Automated payment system (PayPal, Stripe, etc...)",
          "Website maintenance",
          "Personalized design with custom functionality",
          "Responsive design",
          "Online store development",
          "Advanced analytics and reports",
        ],
      },
    },
    notes: {
      title: "Important notes",
      items: [
        "Timelines begin when the client provides all required materials.",
        "Domain and hosting costs are not included in the website price and are paid separately according to the selected package specification.",
        "The 50% advance payment is non-refundable if the collaboration is terminated.",
      ],
    },
    cta: {
      title: "Not sure which package fits your project?",
      description: "Send us a short message and we can review your website needs together.",
      label: "Contact us",
    },
    faq: {
      eyebrow: "Help center",
      title: "Common pricing questions",
      description: "Answers about indicative prices, timelines, payment, domain and hosting.",
      items: [
        {
          id: "price-flexibility",
          question: "Are the listed prices fixed?",
          paragraphs: ["Every project is unique, so prices may change depending on complexity and your needs. If your project is simpler, the final price may be lower than the prices listed in the packages."],
        },
        {
          id: "timeline",
          question: "How long does it take to build a website?",
          paragraphs: ["Website build time depends on the scope of work and the site structure. Basic plan includes a timeline of up to 15 days, although depending on complexity the site may be completed earlier. Standard Plan includes a timeline of up to 20 days, while Premium plan includes a period of up to 30 days. Timelines begin when the client provides all required materials."],
        },
        {
          id: "payment",
          question: "How does payment work?",
          paragraphs: ["Payment is made in two phases: the client pays 50% in advance before work begins, and the remaining 50% is paid when the project is completed, before the website is handed over. For regular website maintenance, payment can be arranged monthly, quarterly, or annually, by prior agreement."],
        },
        {
          id: "domain-hosting",
          question: "Does the price include domain and hosting costs?",
          paragraphs: ["NMark Designs handles the purchase and registration of domain and hosting, making the process easier for clients. These costs are not included in the website price because they depend on the type and purpose of the project. After choosing the right solution together, the client pays them separately, directly according to the selected package specification."],
        },
        {
          id: "cancellation",
          question: "What happens if I want to stop the project during website development?",
          paragraphs: ["If the collaboration is terminated, the 50% advance payment is non-refundable. If the client does not pay the remaining agreed amount, NMark Designs reserves the right to stop work or take the website offline until the obligation is fully settled."],
        },
      ],
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
      description: "Professional design and development of modern, fast, SEO-friendly websites for small businesses, freelancers and local brands. Explore work by NMark Designs.",
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

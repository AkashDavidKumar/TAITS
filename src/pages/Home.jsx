import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/logo.jpeg';
import { MagneticAnchor, MagneticButton } from '../components/MagneticElement';
import { EmailContext } from '../context/EmailContext';
import FloatingCards from '../components/FloatingCards';
import ServiceCard from '../components/ServiceCard';
import Infographic from '../components/Infographic';
import ProcessTracker from '../components/ProcessTracker';
import MastermindCard from '../components/MastermindCard';
import StatsTracker from '../components/StatsTracker';
import Marquee from '../components/Marquee';
import { revealVariants, revealLeftVariants, revealRightVariants, revealScaleVariants, staggerContainer } from '../utils/motion';

/**
 * Main TAITS Tech single-page layout content.
 * Wraps content blocks in Framer Motion triggers to supply fluid fade-ups.
 */
export default function Home() {
  const { openSchedule, openContact } = useContext(EmailContext);
  const services = [
    {
      title: 'Educational ERP Solutions',
      desc: 'Complete school and college management systems designed for seamless administration.',
      linkText: 'Explore ERP →',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 22h14a2 2 0 0 0 2-2V7.5L14.5 2H6a2 2 0 0 0-2 2v4" />
          <polyline points="14 2 14 8 20 8" />
          <path d="M2 15h10" />
          <path d="m9 18 3-3-3-3" />
        </svg>
      ),
    },
    {
      title: 'Custom Software',
      desc: 'Tailor-made software built strictly according to your specific business requirements.',
      linkText: 'View Solutions →',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
    {
      title: 'AI-Powered Solutions',
      desc: 'Intelligent applications leveraging Artificial Intelligence and Machine Learning automation.',
      linkText: 'Discover AI →',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
          <path d="M12 12 2.1 7.1" />
          <path d="m12 12 9.9 4.9" />
        </svg>
      ),
    },
    {
      title: 'Website Development',
      desc: 'Professional, responsive, and high-converting websites for businesses and organizations.',
      linkText: 'See Portfolio →',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10" />
          <line x1="2" y1="12" x2="22" y2="12" />
          <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        </svg>
      ),
    },
    {
      title: 'Mobile App Development',
      desc: 'High-performance native and cross-platform mobile applications for Android and iOS.',
      linkText: 'App Services →',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
          <line x1="12" y1="18" x2="12.01" y2="18" />
        </svg>
      ),
    },
    {
      title: 'Cloud Solutions',
      desc: 'Secure, scalable, and reliable cloud infrastructure setup, deployment, and management.',
      linkText: 'Explore Cloud →',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
        </svg>
      ),
    },
    {
      title: 'CRM Solutions',
      desc: 'Manage customer relationships and streamline business operations efficiently.',
      linkText: 'Learn More →',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      ),
    },
    {
      title: 'Training & Workshops',
      desc: 'Technology training, AI workshops, webinars, and project-based learning sessions.',
      linkText: 'View Programs →',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
    },
  ];

  const founders = [
    {
      name: 'Founder One',
      role: 'Co-Founder',
      bio: 'A passionate tech leader driving the strategic vision. Specializes in scaling AI and bringing enterprise solutions to market efficiently.',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
    },
    {
      name: 'Founder Two',
      role: 'Co-Founder',
      bio: 'The architectural mind behind our cloud and CRM solutions, ensuring highly reliable, scalable performance for global clients.',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    },
    {
      name: 'Founder Three',
      role: 'Co-Founder',
      bio: 'A creative force focusing on user experience, mobile app development, and delivering top-tier UI/UX across all projects.',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    },
    {
      name: 'Founder Four',
      role: 'Co-Founder',
      bio: 'Driving our educational initiatives and ERP software mapping, bringing years of technical experience and process automation.',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    },
    {
      name: 'Founder Five',
      role: 'Co-Founder',
      bio: 'Spearheads business relationships and ensures client success. Passionate about linking technology to real-world impact.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    },
  ];

  return (
    <div style={{ position: 'relative', zIndex: 1 }}>
      {/* HERO SECTION */}
      <section className="hero">
        <div className="container" style={{ display: 'flex', alignItems: 'center' }}>
          <div className="hero-content">
            <motion.h1
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
              variants={revealVariants}
              className="hero-title"
            >
              Transforming Ideas Into <br />
              <span className="gradient-text">Digital Solutions</span>
            </motion.h1>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.15}
              variants={revealVariants}
              className="hero-subtitle"
            >
              Empowering Institutions, Businesses, and Startups through AI, ERP, Software Development, and Digital Innovation.
            </motion.p>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.3}
              variants={revealVariants}
              className="hero-actions"
            >
              <MagneticAnchor href="#services" className="btn btn-primary">
                Get Started
              </MagneticAnchor>
              <MagneticButton onClick={openSchedule} className="btn btn-outline">
                Book Consultation
              </MagneticButton>
            </motion.div>
          </div>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={0.4}
            variants={revealVariants}
            className="hero-visual"
          >
            <FloatingCards />
          </motion.div>
        </div>
      </section>

      {/* ABOUT US SECTION */}
      <section id="about" className="section-padding">
        <div className="container about-grid">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            className="about-visual"
          >
            <div className="abstract-sphere" />
          </motion.div>
          <div className="about-text">
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={revealVariants}
              className="section-title"
            >
              About <span className="gradient-text">TAITS Tech</span>
            </motion.h2>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.1}
              variants={revealVariants}
            >
              TAITS Tech is a technology startup focused on delivering modern software solutions that simplify management, improve productivity, and accelerate digital transformation.
            </motion.p>
            <motion.p
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.2}
              variants={revealVariants}
            >
              Our expertise includes ERP systems, AI-powered applications, website development, custom software solutions, training programs, and technology consulting.
            </motion.p>

            <div className="mission-vision-cards">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "0px 0px -150px 0px" }}
                custom={0.2}
                variants={revealRightVariants}
                className="mv-card"
              >
                <div className="mv-icon">🎯</div>
                <h4>Our Mission</h4>
                <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>
                  To develop affordable and impactful technology solutions that help organizations grow smarter.
                </p>
              </motion.div>
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "0px 0px -150px 0px" }}
                custom={0.3}
                variants={revealLeftVariants}
                className="mv-card"
              >
                <div className="mv-icon">👁️</div>
                <h4>Our Vision</h4>
                <p style={{ fontSize: '0.9rem', marginTop: '10px' }}>
                  To become a trusted technology partner for institutions and businesses across India.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section id="services" className="section-padding" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            className="section-header"
          >
            <h2 className="section-title">
              Our <span className="gradient-text">Services</span>
            </h2>
            <p className="section-subtitle">Comprehensive technological solutions tailored for your growth and efficiency.</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "0px 0px -150px 0px" }}
            variants={staggerContainer(0.08, 0)}
            className="services-grid"
          >
            {services.map((service, idx) => {
              const variants = [revealVariants, revealLeftVariants, revealRightVariants, revealScaleVariants];
              const selectedVariant = variants[idx % variants.length];
              return (
                <motion.div key={idx} variants={selectedVariant} custom={idx * 0.05}>
                  <ServiceCard
                    icon={service.icon}
                    title={service.title}
                    desc={service.desc}
                    linkText={service.linkText}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* WHY CHOOSE US SECTION */}
      <section className="section-padding why-choose-section">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            className="section-header"
          >
            <h2 className="section-title">
              Why Choose <span className="gradient-text">TAITS Tech?</span>
            </h2>
            <p className="section-subtitle">We don't just build software; we build partnerships for sustainable digital growth.</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
          >
            <Infographic />
          </motion.div>
        </div>
      </section>

      {/* PROCESS SECTION */}
      <section id="process" className="section-padding" style={{ background: 'rgba(3,7,18,0.5)' }}>
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            className="section-header"
          >
            <h2 className="section-title">
              Our Development <span className="gradient-text">Process</span>
            </h2>
            <p className="section-subtitle">We follow a transparent, agile methodology to deliver the best results.</p>
          </motion.div>

          <ProcessTracker />
        </div>
      </section>

      {/* INDUSTRIES SECTION */}
      <section id="industries" className="section-padding">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            className="section-header"
          >
            <h2 className="section-title">
              Industries We <span className="gradient-text">Serve</span>
            </h2>
          </motion.div>

          <div className="industries-grid">
            <div className="industry-card reveal-left">
              <svg viewBox="0 0 24 24">
                <path d="M12 3L1 9l4 2.18v6L12 21l7-3.82v-6l2-1.09V17h2V9L12 3zm6.82 6L12 12.72 5.18 9 12 5.28 18.82 9zM17 15.99l-5 2.73-5-2.73v-3.72l5 2.73 5-2.73v3.72z" />
              </svg>
              <h4>Education</h4>
            </div>
            <div className="industry-card reveal-right reveal-delay-1">
              <svg viewBox="0 0 24 24">
                <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z" />
              </svg>
              <h4>Businesses</h4>
            </div>
            <div className="industry-card reveal-scale reveal-delay-2">
              <svg viewBox="0 0 24 24">
                <path d="M20.57 14.86L22 13.43 20.57 12 17 15.57 8.43 7 12 3.43 10.57 2 9.14 3.43 7.71 2 5.57 4.14 4.14 2.71 2.71 4.14l1.43 1.43L2 7.71l1.43 1.43L2 10.57 3.43 12 7 8.43 15.57 17 12 20.57 13.43 22l1.43-1.43L16.29 22l2.14-2.14 1.43 1.43 1.43-1.43-1.43-1.43L22 16.29z" />
              </svg>
              <h4>Fitness Centers</h4>
            </div>
            <div className="industry-card reveal-up">
              <svg viewBox="0 0 24 24">
                <path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z" />
              </svg>
              <h4>Hotels</h4>
            </div>
            <div className="industry-card reveal-rotate reveal-delay-1">
              <svg viewBox="0 0 24 24">
                <path d="M13.13 22.19l-1.63-3.83c3.61-.98 6.47-3.84 7.45-7.45l3.83 1.63c-1.37 5.34-5.31 9.28-10.65 10.65zM5.64 12.5C4.21 12.02 3 10.81 2.5 9.38l-1.89 4.41c1.37 5.34 5.31 9.28 10.65 10.65l-1.63-3.83c-1.47-.48-2.68-1.69-3.16-3.12zM12 2C6.48 2 2 6.48 2 12c0 1.33.26 2.61.74 3.77l2.84-2.84c-.38-.93-.58-1.93-.58-2.93 0-3.87 3.13-7 7-7s7 3.13 7 7c0 1-.2 2-.58 2.93l2.84 2.84c.48-1.16.74-2.44.74-3.77 0-5.52-4.48-10-10-10z" />
              </svg>
              <h4>Startups</h4>
            </div>
            <div className="industry-card reveal-left reveal-delay-2">
              <svg viewBox="0 0 24 24">
                <path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z" />
              </svg>
              <h4>Retail</h4>
            </div>
          </div>
        </div>
      </section>

      {/* INITIATIVES (Bento Grid) */}
      <section id="initiatives" className="section-padding" style={{ background: 'rgba(255,255,255,0.01)' }}>
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            className="section-header"
          >
            <h2 className="section-title">
              Recent <span className="gradient-text">Initiatives</span>
            </h2>
            <p className="section-subtitle">Empowering learners and building the future through practical engagement.</p>
          </motion.div>

          <div className="bento-grid reveal">
            <div className="bento-item item-1">
              <div className="bento-content">
                <h3 className="bento-title">Computer Vision Webinar</h3>
                <p className="bento-desc">Hands-on session on real world computer vision projects.</p>
              </div>
            </div>
            <div className="bento-item item-2">
              <div className="bento-content">
                <h3 className="bento-title">AI Workshops</h3>
                <p className="bento-desc">Practical AI workshops for students and educators.</p>
              </div>
            </div>
            <div className="bento-item item-3">
              <div className="bento-content">
                <h3 className="bento-title">Student Programs</h3>
                <p className="bento-desc">Project based training for skill development.</p>
              </div>
            </div>
            <div className="bento-item item-4" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div className="bento-content" style={{ transform: 'none' }}>
                <h3 className="bento-title" style={{ marginBottom: 0 }}>Upcoming Events</h3>
                <p className="bento-desc" style={{ opacity: 1, color: '#fff' }}>Exciting webinars coming soon.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="section-padding">
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            className="section-header"
          >
            <h2 className="section-title">
              Our <span className="gradient-text">Values</span>
            </h2>
          </motion.div>
          <div className="industries-grid">
            <div className="industry-card reveal">
              <div className="float-icon" style={{ marginBottom: '1rem', borderRadius: '50%', width: '60px', height: '60px' }}>
                💡
              </div>
              <h4 style={{ marginBottom: '0.5rem' }}>Innovation</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>We embrace new ideas and technologies.</p>
            </div>
            <div className="industry-card reveal reveal-delay-1">
              <div className="float-icon" style={{ marginBottom: '1rem', borderRadius: '50%', width: '60px', height: '60px' }}>
                🛡️
              </div>
              <h4 style={{ marginBottom: '0.5rem' }}>Integrity</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>We work with honesty and transparency.</p>
            </div>
            <div className="industry-card reveal reveal-delay-2">
              <div className="float-icon" style={{ marginBottom: '1rem', borderRadius: '50%', width: '60px', height: '60px' }}>
                🤝
              </div>
              <h4 style={{ marginBottom: '0.5rem' }}>Collaboration</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>We believe in teamwork & partnerships.</p>
            </div>
            <div className="industry-card reveal">
              <div className="float-icon" style={{ marginBottom: '1rem', borderRadius: '50%', width: '60px', height: '60px' }}>
                ⭐
              </div>
              <h4 style={{ marginBottom: '0.5rem' }}>Customer Success</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>We are committed to delivering real value.</p>
            </div>
            <div className="industry-card reveal reveal-delay-1">
              <div className="float-icon" style={{ marginBottom: '1rem', borderRadius: '50%', width: '60px', height: '60px' }}>
                📚
              </div>
              <h4 style={{ marginBottom: '0.5rem' }}>Continuous Learning</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>We learn, adapt and grow every day.</p>
            </div>
          </div>
        </div>
      </section>

      {/* THE VISIONARIES */}
      <section className="section-padding" style={{ paddingTop: 0 }}>
        <div className="container">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={revealVariants}
            className="visionaries-header"
          >
            <h2 className="section-title">
              The <span className="gradient-text">Masterminds</span>
            </h2>
            <p className="section-subtitle">
              Meet the visionary leaders driving innovation and digital transformation at TAITS Tech.
            </p>
          </motion.div>

          <div className="visionaries-grid">
            {founders.map((founder, idx) => {
              const revealClasses = ['reveal-left', 'reveal-right', 'reveal-scale', 'reveal-up', 'reveal-rotate'];
              return (
                <MastermindCard
                  key={idx}
                  name={founder.name}
                  role={founder.role}
                  bio={founder.bio}
                  image={founder.image}
                  revealClass={revealClasses[idx % revealClasses.length]}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="section-padding" style={{ paddingTop: 0 }}>
        <div className="container">
          <StatsTracker />
        </div>
      </section>

      {/* TESTIMONIALS SECTION */}
      <section className="section-padding" style={{ paddingTop: 0, overflow: 'hidden' }}>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={revealVariants}
          className="section-header"
        >
          <h2 className="section-title">
            Client <span className="gradient-text">Trust</span>
          </h2>
        </motion.div>
        <Marquee />
      </section>

      {/* CTA SECTION */}
      <section className="container reveal">
        <div className="cta-section">
          <h2 className="cta-title">
            Let's Build the <span className="gradient-text">Future Together</span>
          </h2>
          <p className="section-subtitle">
            Ready to transform your ideas into reality? Contact us today to start your digital journey.
          </p>
          <div className="cta-buttons">
            <MagneticButton onClick={openSchedule} className="btn btn-primary">
              Schedule Meeting
            </MagneticButton>
            <MagneticButton onClick={openContact} className="btn btn-outline">
              Contact Us
            </MagneticButton>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact">
        <div className="container">
          <div className="footer-grid">
            <div className="footer-brand">
              <div className="nav-logo">
                <img src={logo} alt="TAITS Logo" />
                <span>TAITS TECH</span>
              </div>
              <p>Transforming Ideas Into Digital Solutions. Empowering learners and building the future through innovative technology.</p>
              <div className="footer-socials">
                <a href="#" className="social-btn">in</a>
                <a href="#" className="social-btn">gh</a>
                <a href="#" className="social-btn">ig</a>
                <a href="#" className="social-btn">yt</a>
              </div>
            </div>

            <div>
              <h4 className="footer-title">Services</h4>
              <ul className="footer-links">
                <li><a href="#services">Educational ERP</a></li>
                <li><a href="#services">Custom Software</a></li>
                <li><a href="#services">AI Solutions</a></li>
                <li><a href="#services">Cloud & CRM</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-title">Contact Info</h4>
              <ul className="footer-links">
                <li><a href="tel:+919894547420">📞 +91 9894547420</a></li>
                <li><a href="mailto:hello@taitstech.com">✉️ hello@taitstech.com</a></li>
                <li><a href="https://www.taitstech.com">🌐 www.taitstech.com</a></li>
                <li><a href="#">📍 GitHub: taitstech</a></li>
              </ul>
            </div>

            <div>
              <h4 className="footer-title">Scan to Connect</h4>
              <div className="qr-code">
                <svg viewBox="0 0 100 100" fill="#030712">
                  <rect width="100" height="100" fill="#fff" />
                  <path d="M10 10h25v25H10zM15 15h15v15H15zM65 10h25v25H65zM70 15h15v15H70zM10 65h25v25H10zM15 70h15v15H15zM45 10h10v10H45zM45 25h10v10H45zM25 45h10v10H25zM10 45h10v10H10zM40 40h20v20H40zM65 45h10v10H65zM80 45h10v10H80zM45 65h10v10H45zM45 80h10v10H45zM65 65h10v10H65zM80 65h10v10H80zM65 80h10v10H65zM80 80h10v10H80z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2026 TAITS Tech. All rights reserved.</p>
            <p>Innovate. Integrate. Elevate.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

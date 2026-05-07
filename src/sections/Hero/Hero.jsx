import { useState } from 'react';
import styles from './Hero.module.css';
import defaultHeroImage from '../../assets/hero-image.png';

// SVG Icons as components
const MenuIcon = ({ className }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3 12H21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 6H21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 18H21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronDownIcon = ({ className }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 9L12 15L18 9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const SearchIcon = ({ className }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="11"
      cy="11"
      r="7"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M20 20L16 16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

const ShoppingBagIcon = ({ className }) => (
  <svg
    className={className}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 6H21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const UserIcon = ({ className }) => (
  <svg
    className={className}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <circle
      cx="12"
      cy="7"
      r="4"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ArrowRightIcon = ({ className }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M5 12H19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12 5L19 12L12 19"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * Logo component
 */
const Logo = ({ className }) => (
  <a href="/" className={className} aria-label="Decor Home">
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 105 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <text
        x="0"
        y="18"
        fontFamily="Manrope, system-ui, sans-serif"
        fontWeight="700"
        fontSize="18"
        fill="#3B3B3E"
      >
        DECOR
      </text>
    </svg>
  </a>
);

/**
 * Navigation Link component
 */
const NavLink = ({ children, hasDropdown = false }) => (
  <a className={styles.navLink} href="#">
    {children}
    {hasDropdown && (
      <span className={styles.navLinkIcon}>
        <ChevronDownIcon />
      </span>
    )}
  </a>
);

/**
 * Hero Section Component
 *
 * A responsive hero section with navbar and CTA
 * Supports Desktop (1440px+), Tablet (768px-1439px), and Mobile (<768px) layouts
 */
export function Hero({
  headline = "Masterpieces crafted from solid wood",
  subheading = "Our company is happy to take up production of custom-made wooden furniture according to individual sizes.",
  ctaText = "Explore",
  ctaHref = "#",
  heroImageUrl = defaultHeroImage,
  cartItemCount = 2,
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <section className={styles.hero} role="banner" aria-label="Hero section">
      {/* Hero Background Image */}
      <div className={styles.heroImageContainer}>
        <img
          src={heroImageUrl}
          alt="Beautiful wooden furniture in a modern living room"
          className={styles.heroImage}
          loading="eager"
        />
        <div className={styles.heroOverlay} aria-hidden="true" />
      </div>



      {/* Content */}
      <div className={styles.content}>
        <div className={styles.texts}>
          <h1 className={styles.headline}>{headline}</h1>
          <p className={styles.subheading}>{subheading}</p>
        </div>
        <a
          href={ctaHref}
          className={styles.ctaButton}
          role="button"
          aria-label={ctaText}
        >
          {ctaText}
          <ArrowRightIcon className={styles.ctaIcon} />
        </a>
      </div>
    </section>
  );
}

export default Hero;

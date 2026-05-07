import { useState, useRef, useEffect } from 'react';
import styles from './Navbar.module.css';

// Import icons from existing icon library
import MenuLeftAltIcon from '../../icons/line_icons/line_menu-left-alt.svg?react';
import SearchIcon from '../../icons/line_icons/line_search.svg?react';
import ShoppingBagIcon from '../../icons/line_icons/line_shopping-bag.svg?react';
import UserAltIcon from '../../icons/line_icons/line_user-alt.svg?react';
import AngleDownIcon from '../../icons/line_icons/line_angle-down.svg?react';
import BrandLogo from '../../assets/brand-logo.svg?react';

/**
 * Logo Component
 * Simple text-based logo following the design
 */
const Logo = ({ className, size = 'medium' }) => (
  <a href="/" className={`${styles.logo} ${className || ''}`} aria-label="Decor Home">
    <BrandLogo className={size === 'small' ? styles.logoSmall : styles.logoMedium} aria-hidden="true" />
  </a>
);

/**
 * Cart Icon with Badge Component
 */
const CartIcon = ({ count, size = 'medium' }) => (
  <div className={size === 'small' ? styles.cartIconSmall : styles.cartIcon}>
    <ShoppingBagIcon
      className={styles.cartIconImg}
      aria-hidden="true"
    />
    {count > 0 && (
      <span className={styles.cartBadge} aria-label={`${count} items in cart`}>
        {count}
      </span>
    )}
  </div>
);

/**
 * Navigation Link Component
 */
const NavLink = ({ children, href = '#', hasDropdown = false, isActive = false }) => (
  <a
    href={href}
    className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
  >
    {children}
    {hasDropdown && (
      <AngleDownIcon className={styles.navLinkIcon} aria-hidden="true" />
    )}
  </a>
);

/**
 * Icon Button Component
 */
const IconButton = ({ icon: Icon, label, onClick, className }) => (
  <button
    className={`${styles.iconButton} ${className || ''}`}
    onClick={onClick}
    aria-label={label}
    type="button"
  >
    <Icon className={styles.iconButtonImg} aria-hidden="true" />
  </button>
);

/**
 * Mobile Menu Component
 */
const MobileMenu = ({ isOpen, onClose, navLinks }) => {
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Trap focus within menu
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = '';
    };
  }, [isOpen, onClose]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={styles.mobileMenuOverlay} aria-hidden="false">
      <nav
        ref={menuRef}
        className={styles.mobileMenu}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation menu"
      >
        <div className={styles.mobileMenuHeader}>
          <Logo size="medium" />
          <button
            className={styles.mobileMenuClose}
            onClick={onClose}
            aria-label="Close menu"
            type="button"
          >
            ×
          </button>
        </div>
        <div className={styles.mobileMenuLinks}>
          {navLinks.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className={styles.mobileMenuLink}
              onClick={onClose}
            >
              {link.label}
            </a>
          ))}
        </div>
      </nav>
    </div>
  );
};

/**
 * Navbar Component
 *
 * Responsive navigation bar with Desktop, Tablet, and Mobile layouts
 * - Desktop (1440px+): Full horizontal layout with navigation links
 * - Tablet (768px-1439px): Hamburger menu + condensed right nav
 * - Mobile (<768px): Hamburger menu + minimal right nav
 */
export function Navbar({
  cartItemCount = 2,
  currentLanguage = 'Eng',
  activeLink = 'Home',
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Home', href: '/', hasDropdown: false },
    { label: 'Shop', href: '/shop', hasDropdown: true },
    { label: 'Deals', href: '/deals', hasDropdown: false },
    { label: 'About', href: '/about', hasDropdown: false },
    { label: 'Contact', href: '/contact', hasDropdown: false },
    { label: 'Docs', href: '/docs', hasDropdown: false },
  ];

  return (
    <>
      <header className={styles.navbar} role="banner">
        <div className={styles.navbarContainer}>
          {/* Desktop Layout */}
          <div className={styles.desktopLayout}>
            {/* Logo */}
            <Logo />

            {/* Center Navigation */}
            <nav className={styles.desktopNav} aria-label="Main navigation">
              {navLinks.map((link, index) => (
                <NavLink
                  key={index}
                  href={link.href}
                  hasDropdown={link.hasDropdown}
                  isActive={link.label === activeLink}
                >
                  {link.label}
                </NavLink>
              ))}
            </nav>

            {/* Right Navigation */}
            <div className={styles.desktopRightNav}>
              <a href="/shop" className={styles.navLink}>
                <SearchIcon className={styles.navLinkIcon} aria-hidden="true" />
                <span>Shop</span>
              </a>
              <button className={styles.iconWrap} aria-label="Shopping cart" type="button">
                <CartIcon count={cartItemCount} size="medium" />
              </button>
              <IconButton
                icon={UserAltIcon}
                label="User account"
                className={styles.iconWrap}
              />
              <div className={styles.divider} aria-hidden="true" />
              <a href="#" className={styles.navLink}>
                <span>{currentLanguage}</span>
                <AngleDownIcon className={styles.navLinkIcon} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Tablet Layout */}
          <div className={styles.tabletLayout}>
            <div className={styles.tabletLeft}>
              <button
                className={styles.menuButton}
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open navigation menu"
                type="button"
              >
                <MenuLeftAltIcon className={styles.menuIconLarge} aria-hidden="true" />
              </button>
              <Logo />
            </div>
            <div className={styles.tabletRightNav}>
              <a href="/shop" className={styles.navLinkSmall}>
                <SearchIcon className={styles.navLinkIconSmall} aria-hidden="true" />
                <span>Shop</span>
              </a>
              <button className={styles.iconWrap} aria-label="Shopping cart" type="button">
                <CartIcon count={cartItemCount} size="small" />
              </button>
              <IconButton
                icon={UserAltIcon}
                label="User account"
                className={styles.iconWrap}
              />
              <div className={styles.divider} aria-hidden="true" />
              <a href="#" className={styles.navLinkSmall}>
                <span>{currentLanguage}</span>
                <AngleDownIcon className={styles.navLinkIconSmall} aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Mobile Layout */}
          <div className={styles.mobileLayout}>
            <button
              className={styles.menuButton}
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              type="button"
            >
              <MenuLeftAltIcon className={styles.menuIcon} aria-hidden="true" />
            </button>
            <Logo size="small" />
            <div className={styles.mobileRightNav}>
              <a href="/shop" className={styles.navLinkSmall}>
                <SearchIcon className={styles.navLinkIconSmall} aria-hidden="true" />
                <span>Shop</span>
              </a>
              <button className={styles.iconWrap} aria-label="Shopping cart" type="button">
                <CartIcon count={cartItemCount} size="small" />
              </button>
              <IconButton
                icon={UserAltIcon}
                label="User account"
                className={styles.iconWrap}
              />
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={navLinks}
      />
    </>
  );
}

export default Navbar;

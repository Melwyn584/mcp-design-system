import BrandLogo from '../../assets/brand-logo.svg?react';
import EnvelopeIcon from '../../icons/line_icons/line_envelope_line.svg?react';
import PhoneIcon from '../../icons/line_icons/line_phone-call_line.svg?react';
import flagUS from '../../icons/flag_icons/flag_US.svg';
import styles from './footer.module.css';

const DEFAULT_LINKS = {
  info: [
    { label: 'About',     href: '/about' },
    { label: 'Policy',    href: '/policy' },
    { label: 'Terms',     href: '/terms' },
    { label: 'Our Story', href: '/our-story' },
  ],
  shop: [
    { label: 'Sofa',      href: '/shop/sofa' },
    { label: 'Chair',     href: '/shop/chair' },
    { label: 'Beds',      href: '/shop/beds' },
    { label: 'Out Doors', href: '/shop/outdoors' },
    { label: 'Lighting',  href: '/shop/lighting' },
    { label: 'View All',  href: '/shop' },
  ],
  customer: [
    { label: 'FAQs',     href: '/faqs' },
    { label: 'Returns',  href: '/returns' },
    { label: 'Exchange', href: '/exchange' },
    { label: 'Sizing',   href: '/sizing' },
    { label: 'Shipping', href: '/shipping' },
  ],
};

/**
 * Footer — full-width site footer with contact info, link columns, and bottom bar.
 *
 * @param {ReactNode}  [logo]           — custom logo node; defaults to BrandLogo SVG
 * @param {string}     [mission]        — mission statement text
 * @param {string}     [email]          — contact email address
 * @param {string}     [phone]          — contact phone number
 * @param {object}     [links]          — { info, shop, customer } arrays of { label, href }
 * @param {string}     [language]       — language label shown in the bottom bar
 * @param {string}     [copyrightText]  — copyright / powered-by text
 * @param {Array}      [paymentCards]   — array of { src, alt } for payment icons
 */
export function Footer({
  logo,
  mission = 'Our mission is to empower individuals in creating personalized living spaces.',
  email = 'contact@urban.com',
  phone = '+1 234 567 890',
  links = DEFAULT_LINKS,
  language = 'ENGLISH',
  copyrightText = '© 2022 URBAN Theme | Powered by Shopify',
  paymentCards = [],
}) {
  return (
    <footer className={styles.footer}>

      {/* ── Main body ───────────────────────────────────────────── */}
      <div className={styles.body}>
        <div className={styles.bodyInner}>

          {/* About column: logo + mission + contact */}
          <div className={styles.about}>
            <div className={styles.logoWrap} aria-label="Decor Home">
              {logo ?? <BrandLogo aria-hidden="true" className={styles.logoSvg} />}
            </div>

            <p className={styles.mission}>{mission}</p>

            <address className={styles.contact}>
              <a href={`mailto:${email}`} className={styles.contactItem}>
                <EnvelopeIcon className={styles.contactIcon} aria-hidden="true" />
                <span className={styles.contactText}>{email}</span>
              </a>
              <a href={`tel:${phone}`} className={styles.contactItem}>
                <PhoneIcon className={styles.contactIcon} aria-hidden="true" />
                <span className={styles.contactText}>{phone}</span>
              </a>
            </address>
          </div>

          {/* Link columns grid: Info · Shop · Customer */}
          <div className={styles.linksGrid}>

            <nav aria-label="Info links" className={styles.linkCol}>
              <p className={styles.colHeading}>Info</p>
              <ul className={styles.linkList}>
                {links.info.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className={styles.link}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Shop links" className={styles.linkCol}>
              <p className={styles.colHeading}>Shop</p>
              <ul className={styles.linkList}>
                {links.shop.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className={styles.link}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </nav>

            <nav aria-label="Customer service links" className={styles.linkCol}>
              <p className={styles.colHeading}>Customer</p>
              <ul className={styles.linkList}>
                {links.customer.map((item) => (
                  <li key={item.href}>
                    <a href={item.href} className={styles.link}>{item.label}</a>
                  </li>
                ))}
              </ul>
            </nav>

          </div>
        </div>
      </div>

      {/* ── Bottom bar ──────────────────────────────────────────── */}
      <div className={styles.bar}>
        <div className={styles.barInner}>

          <div className={styles.language}>
            <img
              src={flagUS}
              alt="US flag"
              className={styles.flagIcon}
            />
            <span className={styles.languageText}>{language}</span>
          </div>

          <div className={styles.divider} aria-hidden="true" />

          <p className={styles.copyright}>{copyrightText}</p>

          {paymentCards.length > 0 && (
            <div className={styles.paymentCards}>
              {paymentCards.map((card) => (
                <img
                  key={card.alt}
                  src={card.src}
                  alt={card.alt}
                  className={styles.paymentCard}
                />
              ))}
            </div>
          )}

        </div>
      </div>

    </footer>
  );
}

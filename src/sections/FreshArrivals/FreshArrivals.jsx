import { Button } from '../../components/Button/Button';
import { ProductCard } from '../../components/ProductCard/ProductCard';
import styles from './freshArrivals.module.css';

function ArrowUpRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path
        d="M13.1665 3.33301V9.99967C13.1665 10.2757 12.9425 10.4997 12.6665 10.4997C12.3905 10.4997 12.1665 10.2757 12.1665 9.99967V4.54036L4.35321 12.3537C4.25587 12.451 4.12785 12.5003 3.99985 12.5003C3.87185 12.5003 3.74383 12.4517 3.6465 12.3537C3.45117 12.1583 3.45117 11.8417 3.6465 11.6463L11.4598 3.83301H5.99985C5.72385 3.83301 5.49985 3.60901 5.49985 3.33301C5.49985 3.05701 5.72385 2.83301 5.99985 2.83301H12.6665C12.7319 2.83301 12.7966 2.84641 12.8579 2.87174C12.9799 2.92241 13.0773 3.01975 13.1286 3.14242C13.1533 3.20308 13.1665 3.26767 13.1665 3.33301Z"
        fill="currentColor"
      />
    </svg>
  );
}

/**
 * FreshArrivals — responsive product listing section.
 *
 * @param {string}   [title]       Section heading
 * @param {string}   [subtitle]    Section subheading
 * @param {Array}    products      Array of { id, name, price, image, slug }
 * @param {function} [onViewAll]   Called when the "View All" button is clicked
 * @param {number}   [maxVisible]  Limit number of displayed products
 */
export function FreshArrivals({
  title = 'Fresh Arrivals',
  subtitle = 'Fresh styles, new beginnings: discover our latest arrivals!',
  products = [],
  onViewAll,
  maxVisible,
}) {
  const visibleProducts = maxVisible ? products.slice(0, maxVisible) : products;

  const viewAllButton = (
    <Button
      type="primary"
      buttonStyle="filled"
      size="large"
      showIconRight
      iconRight={<ArrowUpRightIcon />}
      onClick={onViewAll}
      aria-label="View all fresh arrival products"
    >
      View All
    </Button>
  );

  return (
    <section className={styles.section} aria-labelledby="fresh-arrivals-title">
      <div className={styles.container}>

        {/* Desktop / Tablet: inline header row */}
        <header className={styles.header}>
          <div className={styles.heading}>
            <h2 id="fresh-arrivals-title" className={styles.title}>{title}</h2>
            <p className={styles.subtitle}>{subtitle}</p>
          </div>
          {viewAllButton}
        </header>

        {/* Mobile: title + subtitle stacked above grid */}
        <div className={styles.mobileHeading}>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        {/* Product grid */}
        <ul className={styles.grid} aria-label="Fresh arrival products">
          {visibleProducts.map((product) => (
            <li key={product.id}>
              <ProductCard
                {...product}
                onClick={product.onClick}
              />
            </li>
          ))}
        </ul>

        {/* Mobile: View All button at bottom center */}
        <div className={styles.mobileViewAll}>
          {viewAllButton}
        </div>

      </div>
    </section>
  );
}

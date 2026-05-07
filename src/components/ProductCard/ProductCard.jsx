import styles from './productCard.module.css';

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
 * ProductCard — displays a single product in the Fresh Arrivals grid.
 *
 * @param {string}   id
 * @param {string}   name
 * @param {number}   price
 * @param {string}   image       — URL for the product image
 * @param {string}   slug        — used to build the product link
 * @param {function} [onClick]   — called when the card is clicked
 */
export function ProductCard({ id, name, price, image, slug, onClick }) {
  const formattedPrice = typeof price === 'number'
    ? `$ ${price.toFixed(2)}`
    : price;

  return (
    <article
      className={styles.card}
      aria-label={name}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') onClick(e); } : undefined}
    >
      <div className={styles.imageWrap}>
        <img
          className={styles.image}
          src={image}
          alt={name}
          loading="lazy"
        />
      </div>

      <div className={styles.content}>
        <div className={styles.text}>
          <p className={styles.name}>{name}</p>
          <p className={styles.price}>{formattedPrice}</p>
        </div>
        <span className={styles.arrowIcon}>
          <ArrowUpRightIcon />
        </span>
      </div>
    </article>
  );
}

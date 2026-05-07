import styles from './categories.module.css';

/**
 * Categories — horizontal pill-filter bar for product category navigation.
 *
 * @param {Array<{id: string, label: string, slug: string}>} categories
 * @param {string} [activeCategory] - slug of the currently selected category
 * @param {(slug: string) => void} [onCategoryChange]
 */
export function Categories({ categories = [], activeCategory, onCategoryChange }) {
  return (
    <section className={styles.section}>
      <nav aria-label="Browse categories">
        <ul className={styles.pillList}>
          {categories.map((cat) => (
            <li key={cat.id}>
              <button
                type="button"
                className={[
                  styles.pill,
                  activeCategory === cat.slug ? styles.pillActive : '',
                ]
                  .filter(Boolean)
                  .join(' ')}
                aria-current={activeCategory === cat.slug ? 'true' : undefined}
                onClick={() => onCategoryChange?.(cat.slug)}
              >
                {cat.label}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}

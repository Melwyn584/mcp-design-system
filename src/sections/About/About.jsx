import styles from './about.module.css';

const DEFAULT_HEADING =
  'We are passionate about creating furniture that enriches lives and transforms spaces.';

const DEFAULT_BODY =
  'We are passionate about creating furniture that enriches lives and transforms spaces. ' +
  'With a deep appreciation for craftsmanship and a commitment to exceptional quality, we ' +
  'strive to offer furniture pieces that combine timeless elegance with modern functionality.';

const DEFAULT_STATS = [
  { value: '2465', label: 'Total Products' },
  { value: '14782', suffix: '+', label: 'Happy Customers' },
  { value: '20', suffix: '+', label: 'Across the Country' },
];

/**
 * About — responsive "About us" section.
 *
 * @param {string}  image        Image URL (required)
 * @param {string}  [imageAlt]   Alt text for the image
 * @param {string}  [heading]    Section heading
 * @param {string}  [body]       Description paragraph
 * @param {Array}   [stats]      [{ value, suffix?, label }]
 */
export function About({
  image,
  imageAlt = 'Furniture design sketches in progress',
  heading = DEFAULT_HEADING,
  body = DEFAULT_BODY,
  stats = DEFAULT_STATS,
}) {
  return (
    <section className={styles.section} aria-label="About us">
      <div className={styles.inner}>
        <div className={styles.group}>
          <div className={styles.imageWrap}>
            <img className={styles.image} src={image} alt={imageAlt} />
          </div>
          <div className={styles.text}>
            <h2 className={styles.heading}>{heading}</h2>
            <p className={styles.body}>{body}</p>
          </div>
        </div>

        <dl className={styles.stats}>
          {stats.map((stat) => (
            <div className={styles.stat} key={stat.label}>
              <dd className={styles.statValue}>
                {stat.suffix ? `${stat.value} ${stat.suffix}` : stat.value}
              </dd>
              <dt className={styles.statLabel}>{stat.label}</dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

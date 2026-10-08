import styles from './blog.module.css'

/**
 * THE HEAD THE BLOG AND EVERY CATEGORY PAGE SHARE.
 *
 * The search field and the filter row live in BlogBrowser, which is a client
 * component: they change what is listed, so they belong with the list. This is
 * only the words above them.
 */
export function BlogMasthead() {
  return (
    <header className={styles.masthead}>
      <p className="mono">The duck pond</p>
      <h1 className="d d-xl">Notes from the kitchen table.</h1>
      {/* NO `measure` ON THIS ONE. The class caps a paragraph at a reading
          width, which is right for prose and wrong for a standfirst: it broke
          a single sentence over two lines with half the page empty beside it.
          It still wraps on a phone, where it has to. */}
      <p className={`lead ${styles.lede}`}>
        Two parents building a water bottle, writing down what they learn on the way.
      </p>
    </header>
  )
}

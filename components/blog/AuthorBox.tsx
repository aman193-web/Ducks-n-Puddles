import { Picture } from '@/components/Picture'
import { defaultAuthor } from '@/content/journal'
import styles from './blog-extras.module.css'

/**
 * WHO WROTE IT, at the foot of the article — the reference's author card.
 *
 * One author, because one is the truth: both founders write these and neither
 * has asked for a separate byline. The name, role and bio all live in
 * content/journal.ts, and every word of them is the client's own, assembled
 * from their first post and from brand.why rather than written here.
 */
export function AuthorBox() {
  return (
    <aside className={styles.author} aria-label="About the author">
      {/* A circle, at the client's call. The crop is 1.6:1, so `object-fit:
          cover` shows its middle — which is where both faces are. */}
      <span className={styles.authorAvatar}>
        <Picture id={defaultAuthor.avatar} sizes="(min-width: 560px) 116px, 96px" alt="" />
      </span>
      <div className={styles.authorBody}>
        <p className={styles.authorKicker}>Written by</p>
        <p className={styles.authorName}>{defaultAuthor.name}</p>
        <p className={styles.authorRole}>{defaultAuthor.role}</p>
        <p className={styles.authorBio}>{defaultAuthor.bio}</p>
      </div>
    </aside>
  )
}

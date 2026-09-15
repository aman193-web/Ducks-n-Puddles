'use client'
import { useEffect, useState } from 'react'
import { initSound, setSound, subscribe } from '@/lib/sound'
import styles from './SoundToggle.module.css'

export function SoundToggle() {
  const [on, setOn] = useState(false)
  useEffect(() => { setOn(initSound()); return subscribe(setOn) }, [])

  return (
    <button
      type="button"
      className={styles.btn}
      aria-pressed={on}
      onClick={() => setSound(!on)}
      title={on ? 'Turn duck sounds off' : 'Turn duck sounds on'}
    >
      <span className="vh">
        {on ? 'Turn duck sounds off' : 'Turn duck sounds on'}
      </span>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor"
           strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M11 5 6 9H3v6h3l5 4V5Z" />
        {on
          ? <><path d="M15.5 8.5a5 5 0 0 1 0 7" /><path d="M18.5 5.5a9 9 0 0 1 0 13" /></>
          : <><path d="m17 9 4 6" /><path d="m21 9-4 6" /></>}
      </svg>
    </button>
  )
}

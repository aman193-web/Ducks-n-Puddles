'use client'
import { useRef, useState } from 'react'
import styles from './HeroSpin.module.css'

interface Props {
  /** The client's 360° export, in public/3d. */
  src: string
  name: string
}

/**
 * THE 360° BOTTLE — the stage the model turns on, at the centre of the hero.
 *
 * The model is the client's own file (public/3d), served exactly as delivered
 * and shown in an iframe. Nothing about it is rebuilt here, so a new export
 * drops straight in.
 *
 * The file's own "Take the sleeve off" button and "Drag to spin" label are
 * turned off (?button=0&hint=0). The button is drawn here instead, in the
 * site's own pill, with the file's own wording, and drives the model through
 * the messages the file already listens for: 'sleeve-off' / 'sleeve-on'. The
 * label is not drawn at all (the client's call).
 *
 * Where the stage sits — the words to its left, the duck and the chips to its
 * right — is the page's layout (duck.module.css, "the hero").
 */
export function HeroSpin({ src, name }: Props) {
  const [sleeveOff, setSleeveOff] = useState(false)
  const frame = useRef<HTMLIFrameElement>(null)

  const post = (msg: string) => frame.current?.contentWindow?.postMessage(msg, window.location.origin)
  const flipSleeve = () => {
    const off = !sleeveOff
    setSleeveOff(off)
    post(off ? 'sleeve-off' : 'sleeve-on')
  }

  return (
    <div className={styles.stage}>
      {/* The name, huge and quiet, behind the bottle. */}
      <span className={`d ${styles.ghost}`} aria-hidden="true">{name}</span>
      <iframe
        ref={frame}
        className={styles.frame}
        src={`${src}?button=0&hint=0`}
        title={`The ${name} bottle in 3D. Drag, or use the arrow keys, to spin it.`}
        onLoad={() => { if (sleeveOff) post('sleeve-off') }}
      />
      <div className={styles.controls}>
        <button type="button" className={styles.sleeve} aria-pressed={sleeveOff} onClick={flipSleeve}>
          {sleeveOff ? 'Put the sleeve on' : 'Take the sleeve off'}
        </button>
      </div>
    </div>
  )
}

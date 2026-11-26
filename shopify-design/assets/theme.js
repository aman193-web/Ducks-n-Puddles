/* =============================================================================
   DUCKS 'N PUDDLES — SHOPIFY THEME (design prototype) · interactions

   Everything here maps to a small Shopify custom element in the real build
   (<header-drawer>, <collection-tabs>, <duck-finder>, <variant-picks>,
   <sticky-atc>). The REVIEW block at the end is prototype-only.
   ========================================================================== */
(() => {
  const $ = (s, r = document) => r.querySelector(s)
  const $$ = (s, r = document) => [...r.querySelectorAll(s)]
  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim())
  const icon = (id) => `<svg class="icon" aria-hidden="true"><use href="#i-${id}"/></svg>`

  /* ---- header: hairline once the page scrolls under it ---------------- */
  const hdr = $('.hdr')
  if (hdr) {
    const onScroll = () => hdr.classList.toggle('is-stuck', window.scrollY > 64)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
  }

  /* ---- menu sheet (the main site's full-screen mobile menu) ------------ */
  const sheet = $('#mobile-menu')
  if (sheet) {
    const opener = $('[data-drawer-open]')
    const open = (on) => {
      sheet.hidden = !on
      document.body.style.overflow = on ? 'hidden' : ''
      opener?.setAttribute('aria-expanded', String(on))
      if (on) $('.sheet-close', sheet)?.focus()
      else opener?.focus()
    }
    opener?.addEventListener('click', () => open(true))
    $$('[data-drawer-close], a', sheet).forEach((b) => b.addEventListener('click', () => open(false)))
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !sheet.hidden) open(false) })
  }

  /* ---- scrapbook gallery: arrows page the rail, one clip plays at a time - */
  const rail = $('[data-rail]')
  if (rail) {
    const arrows = $$('[data-rail-step]')
    const ends = () => {
      const max = rail.scrollWidth - rail.clientWidth
      arrows[0].disabled = rail.scrollLeft <= 2
      arrows[1].disabled = rail.scrollLeft >= max - 2
    }
    arrows.forEach((b) => b.addEventListener('click', () => {
      const card = $('li', rail)
      const step = card ? card.getBoundingClientRect().width + parseFloat(getComputedStyle(rail).columnGap || '0') : rail.clientWidth * 0.8
      rail.scrollBy({ left: step * Number(b.dataset.railStep), behavior: 'smooth' })
    }))
    rail.addEventListener('scroll', ends, { passive: true })
    window.addEventListener('resize', ends)
    ends()
    $$('[data-play]', rail).forEach((btn) => {
      const v = btn.parentElement.querySelector('video')
      const label = $('.vh', btn)
      const cap = label.textContent.replace(/^(Play|Pause) — /, '')
      v.addEventListener('play', () => { btn.classList.add('is-playing'); label.textContent = `Pause — ${cap}` })
      v.addEventListener('pause', () => { btn.classList.remove('is-playing'); label.textContent = `Play — ${cap}` })
      btn.addEventListener('click', () => {
        if (v.paused) {
          $$('video', rail).forEach((o) => { if (o !== v && !o.paused) o.pause() })
          v.play()
        } else v.pause()
      })
    })
  }

  /* ---- collection tabs (product type / tag filter) --------------------- */
  const grid = $('[data-grid]')
  if (grid) {
    const pills = $$('[data-filter]')
    const count = $('[data-result-count]')
    const apply = (f) => {
      let n = 0
      $$('[data-cat]', grid).forEach((el) => {
        const show = f === 'all' || el.dataset.cat === f
        el.hidden = !show
        if (show && el.dataset.cat !== 'promo') n++
      })
      pills.forEach((p) => p.setAttribute('aria-pressed', String(p.dataset.filter === f)))
      if (count) count.textContent = `${n} product${n === 1 ? '' : 's'}`
    }
    pills.forEach((p) => p.addEventListener('click', () => apply(p.dataset.filter)))
    $$('[data-jump]').forEach((a) => a.addEventListener('click', () => apply(a.dataset.jump)))
    apply('all')
  }

  /* ---- email capture ----------------------------------------------------
     In Shopify: {% form 'customer' %} with contact[tags] set per form, so the
     list can be split later — "prelaunch", "notify:<product>", "newsletter". */
  const success = (form, msg) => {
    const ok = document.createElement('p')
    ok.className = 'form-ok'
    ok.setAttribute('role', 'status')
    ok.innerHTML = `${icon('checkcircle')}<span>${msg}</span>`
    form.replaceWith(ok)
  }
  const wireCapture = (form) => {
    form.addEventListener('submit', (e) => {
      e.preventDefault()
      const input = $('input[type=email]', form)
      if (!input || !isEmail(input.value)) {
        input?.classList.add('invalid')
        input?.focus()
        return
      }
      success(form, form.dataset.ok || 'You’re on the list. Watch your inbox for launch news.')
    })
    $('input[type=email]', form)?.addEventListener('input', (e) => e.target.classList.remove('invalid'))
  }
  $$('form[data-capture]').forEach(wireCapture)

  /* "Notify me" on coming-soon cards opens an inline field in place. */
  $$('[data-notify]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const name = btn.dataset.notify
      const wrap = document.createElement('div')
      wrap.className = 'notify'
      wrap.innerHTML = `
        <form class="inline-form" data-capture data-ok="We’ll email you when ${name} is ready." novalidate>
          <label class="vh" for="n-${btn.id}">Email for ${name}</label>
          <input class="field" id="n-${btn.id}" type="email" placeholder="Your email" autocomplete="email" required>
          <button class="btn btn-sm btn-plain" type="submit" style="--bg:var(--sun-soft)">Notify</button>
        </form>`
      btn.replaceWith(wrap)
      wireCapture($('form', wrap))
      $('input', wrap).focus()
    })
  })

  /* ---- duck finder -------------------------------------------------------- */
  const FINDER = {
    vincey: {
      name: 'Vincey', role: 'The Calm Companion', core: 'Calm + Gentle',
      saying: '“Take your time. I’ll be right here.”',
      body: 'Vincey is the friend who takes his time. Calm, gentle, and always close by, he reminds little ones to trust themselves, go at their own pace, and find courage within.',
      art: 'assets/img/vincey-wink-520.webp', soft: 'var(--vincey-soft)',
    },
    'chi-chi': {
      name: 'Chi Chi', role: 'The Brave Spark', core: 'Bold + Brave',
      saying: '“Let’s do it!”',
      body: 'Chi Chi is the friend who’s always ready for the next adventure. Bold, imaginative, and proudly herself, she reminds little ones to follow their curiosity, try new things, and have the confidence to shine.',
      art: 'assets/img/chichi-wave-680.webp', soft: 'var(--chichi-soft)',
    },
    goosey: {
      name: 'Goosey', role: 'The Sunshine Friend', core: 'Optimistic + Comforting',
      saying: '“There’s always room for one more friend!”',
      body: 'Goosey is the friend who believes there’s always room for one more. Warm, cheerful, and welcoming, he reminds little ones to choose kindness, include others, and help everyone feel like they belong.',
      art: 'assets/img/goosey-cheer-600.webp', soft: 'var(--goosey-soft)',
    },
  }
  const finder = $('[data-finder]')
  if (finder) {
    const set = (k) => {
      const d = FINDER[k]
      finder.classList.add('is-swapping')
      setTimeout(() => {
        finder.dataset.duck = k
        $('[data-f=art]', finder).src = d.art
        $('[data-f=art]', finder).alt = `${d.name}, waving`
        $('[data-f=role]', finder).textContent = d.role
        $('[data-f=name]', finder).textContent = d.name
        $('[data-f=core]', finder).textContent = d.core
        $('[data-f=saying]', finder).textContent = d.saying
        $('[data-f=body]', finder).textContent = d.body
        const cta = $('[data-f=cta]', finder)
        cta.href = `reserve.html?duck=${k}`
        $('span', cta).textContent = `Reserve ${d.name} for $1`
        $('[data-f=cta]', finder).style.setProperty('--bg', 'var(--paper)')
        const meet = $('[data-f=meet]', finder)
        meet.href = `https://ducksnpuddles.com/ducks/${k}`
        $('span', meet).textContent = `Meet ${d.name}`
        finder.classList.remove('is-swapping')
      }, 180)
    }
    $$('input[name=kid]', finder).forEach((r) => r.addEventListener('change', () => set(r.value)))
  }

  /* ---- reservation page: duck pick drives the gallery ------------------- */
  const DUCKS = {
    vincey: { name: 'Vincey', line: 'The Calm Companion', file: 'vincey', soft: 'var(--vincey-soft)', field: 'var(--vincey-field)' },
    'chi-chi': { name: 'Chi Chi', line: 'The Brave Spark', file: 'chichi', soft: 'var(--chichi-soft)', field: 'var(--chichi-field)' },
    goosey: { name: 'Goosey', line: 'The Sunshine Friend', file: 'goosey', soft: 'var(--goosey-soft)', field: 'var(--goosey-field)' },
    trio: { name: 'All three', line: 'Vincey, Chi Chi & Goosey', multi: true, soft: 'var(--sky-soft)', field: 'var(--vincey-field)' },
  }
  const stage = $('[data-stage]')
  if (stage) {
    const slides = $$('.stage-slide', stage)
    const thumbs = $$('[data-thumb]')
    const dots = $$('.stage-nav button', stage)
    const go = (i) => {
      slides.forEach((s, n) => s.classList.toggle('is-active', n === i))
      thumbs.forEach((t, n) => t.setAttribute('aria-current', String(n === i)))
      dots.forEach((t, n) => t.setAttribute('aria-current', String(n === i)))
    }
    thumbs.forEach((t, i) => t.addEventListener('click', () => go(i)))
    dots.forEach((t, i) => t.addEventListener('click', () => go(i)))

    const label = $('[data-picked]')
    const ctaLabel = $('[data-cta-label]')
    const sb = $('.sticky-buy')
    const pick = (k, { jump = true } = {}) => {
      const d = DUCKS[k] || DUCKS.vincey
      stage.dataset.duck = k
      document.documentElement.style.setProperty('--picked-field', d.field)
      $$('[data-single]').forEach((el) => { el.hidden = !!d.multi })
      $$('[data-multi]').forEach((el) => { el.hidden = !d.multi })
      if (!d.multi) {
        $$('[data-img=front]').forEach((img) => { img.src = `assets/img/${d.file}-621.webp`; img.alt = `The ${d.name} bottle, front` })
        $$('[data-img=back]').forEach((img) => { img.src = `assets/img/${d.file}-back-621.webp`; img.alt = `The ${d.name} bottle, back` })
        $$('[data-img=peek]').forEach((img) => { img.src = `assets/img/${d.file}-peeking-320.webp` })
      }
      $$('.thumbs button').forEach((b) => b.style.setProperty('--field', d.field))
      if (label) label.textContent = d.name
      if (ctaLabel) ctaLabel.textContent = 'Reserve for $1'
      if (sb) {
        $('img', sb).src = d.multi ? 'assets/img/trio-walk-560.webp' : `assets/img/${d.file}-idle-420.webp`
        sb.style.setProperty('--sb-bg', d.soft)
        $('b', sb).textContent = d.multi ? `$1 reservation · ${d.name}` : `$1 reservation · ${d.name}`
      }
      if (jump) go(0)
    }
    $$('input[name=duck]').forEach((r) => r.addEventListener('change', () => pick(r.value)))
    const fromUrl = new URLSearchParams(location.search).get('duck')
    if (fromUrl && DUCKS[fromUrl]) {
      const r = $(`input[name=duck][value="${fromUrl}"]`)
      if (r) r.checked = true
    }
    /* No colour fade on first paint when ?duck= preselects another duck. */
    document.documentElement.classList.add('no-anim')
    pick($('input[name=duck]:checked')?.value || 'vincey', { jump: false })
    go(0)
    requestAnimationFrame(() => requestAnimationFrame(() => document.documentElement.classList.remove('no-anim')))
  }

  /* ---- reserve submit: validate, then hand over to checkout -------------
     The $1 goes through native Shopify checkout (the reservation is a $1
     product). Checkout is out of scope for this phase, so the prototype
     stops at a toast instead of a page. */
  const toast = $('.toast')
  const showToast = () => {
    if (!toast) return
    toast.classList.add('is-on')
    clearTimeout(showToast.t)
    showToast.t = setTimeout(() => toast.classList.remove('is-on'), 6000)
  }
  $('.toast button')?.addEventListener('click', () => toast.classList.remove('is-on'))
  const buyForm = $('[data-reserve-form]')
  if (buyForm) {
    buyForm.addEventListener('submit', (e) => {
      e.preventDefault()
      const input = $('input[type=email]', buyForm)
      if (!isEmail(input.value)) {
        input.classList.add('invalid')
        $('[data-email-err]', buyForm).hidden = false
        input.focus()
        return
      }
      $('[data-email-err]', buyForm).hidden = true
      showToast()
    })
    $('input[type=email]', buyForm).addEventListener('input', (e) => {
      e.target.classList.remove('invalid')
      $('[data-email-err]', buyForm).hidden = true
    })
    $$('[data-sticky-cta]').forEach((b) => b.addEventListener('click', () => {
      buyForm.scrollIntoView({ behavior: 'smooth', block: 'center' })
      setTimeout(() => $('input[type=email]', buyForm).focus({ preventScroll: true }), 500)
    }))
  }

  /* ---- sticky add-to-cart bar on phones ---------------------------------- */
  const sticky = $('.sticky-buy')
  const anchor = $('[data-sticky-anchor]')
  /* On once the main button has scrolled up out of view. A scroll check, not
     an IntersectionObserver: an anchor jump (FAQ, How it works) carries the
     button from below the viewport to above it without ever intersecting, so
     an observer never fires. */
  if (sticky && anchor) {
    let queued = false
    const check = () => {
      queued = false
      sticky.classList.toggle('is-on', anchor.getBoundingClientRect().bottom < 0)
    }
    window.addEventListener('scroll', () => {
      if (!queued) { queued = true; requestAnimationFrame(check) }
    }, { passive: true })
    check()
  }

  /* =============================================================================
     FOOTER DUCKS — the main site's FooterDucks.tsx without GSAP.
     The video never plays: its timeline IS the head-turn, so the pointer's X
     maps onto currentTime and the heads follow the cursor. Touch and reduced
     motion get the straight-ahead middle frame and nothing is bound.
     ========================================================================== */
  const duckStage = $('[data-follow-ducks]')
  const duckVid = duckStage && $('video', duckStage)
  if (duckVid) {
    const st = { t: NaN, cur: NaN, x: 0, y: 0, tx: 0, ty: 0 }
    const apply = () => {
      if (!Number.isFinite(st.cur) || duckVid.readyState < 1 || duckVid.seeking) return
      if (Math.abs(duckVid.currentTime - st.cur) < 1 / 48) return
      duckVid.currentTime = st.cur
    }
    const park = () => {
      if (!Number.isFinite(duckVid.duration) || !duckVid.duration) return
      if (!Number.isFinite(st.t)) { st.t = st.cur = duckVid.duration / 2 }
      apply()
    }
    ;['loadedmetadata', 'loadeddata', 'canplay'].forEach((e) => duckVid.addEventListener(e, park))
    duckVid.addEventListener('seeked', apply)
    park()

    if (!matchMedia('(prefers-reduced-motion: reduce)').matches && matchMedia('(pointer: fine)').matches) {
      let onScreen = false
      let raf = 0
      new IntersectionObserver(([en]) => { onScreen = en.isIntersecting }, { rootMargin: '160px 0px' }).observe(duckStage)
      const tick = () => {
        raf = 0
        st.cur += (st.t - st.cur) * 0.18
        st.x += (st.tx - st.x) * 0.08
        st.y += (st.ty - st.y) * 0.08
        apply()
        duckStage.style.transform = `translate(${st.x.toFixed(2)}px, ${st.y.toFixed(2)}px)`
        if (Math.abs(st.t - st.cur) > 0.005 || Math.abs(st.tx - st.x) > 0.1 || Math.abs(st.ty - st.y) > 0.1) raf = requestAnimationFrame(tick)
      }
      const aim = (nx, ny) => {
        if (!Number.isFinite(duckVid.duration) || !duckVid.duration) return
        st.t = nx * duckVid.duration
        if (!Number.isFinite(st.cur)) st.cur = st.t
        st.tx = (0.5 - nx) * 14
        st.ty = (0.5 - ny) * 8
        if (!raf) raf = requestAnimationFrame(tick)
      }
      window.addEventListener('pointermove', (e) => {
        if (!onScreen) return
        aim(Math.min(Math.max(e.clientX / innerWidth, 0), 1), Math.min(Math.max(e.clientY / innerHeight, 0), 1))
      }, { passive: true })
      document.addEventListener('pointerleave', () => aim(0.5, 0.5))
    }
  }

  /* =============================================================================
     REVIEW MODE — prototype only.
     ========================================================================== */
  /* Hidden by default (Nov 2026, client review): the button and the orange
     outlines only appear when the URL has ?review. The open items stay in the
     markup as data-tbc and in README.md — nothing is lost, just not shown. */
  const items = $$('[data-tbc]')
  const reviewOn = new URLSearchParams(location.search).has('review')
  if (items.length && reviewOn) {
    const btn = document.createElement('button')
    btn.className = 'review-toggle'
    btn.type = 'button'
    btn.setAttribute('aria-pressed', 'false')
    btn.setAttribute('aria-controls', 'review-panel')
    /* One row per open question, however many places on the page it shows;
       clicking a row steps through those places in turn. */
    const groups = new Map()
    items.forEach((el) => {
      const k = el.dataset.tbc
      if (!groups.has(k)) groups.set(k, [])
      groups.get(k).push(el)
    })
    const keys = [...groups.keys()]
    btn.innerHTML = `<span class="dot" aria-hidden="true"></span>Open items <b>${keys.length}</b>`
    const panel = document.createElement('aside')
    panel.className = 'review-panel'
    panel.id = 'review-panel'
    panel.hidden = true
    panel.innerHTML = `<h2>Open items — need client confirmation</h2>
      <p>Outlined on the page in orange. Placeholder copy is written so it stays true until each item is confirmed.</p>
      <ol>${keys.map((k, i) => {
        const n = groups.get(k).length
        return `<li><button type="button" data-goto="${i}">${k}${n > 1 ? ` <em style="font-style:normal;opacity:.6">(${n} places)</em>` : ''}</button></li>`
      }).join('')}</ol>`
    document.body.append(btn, panel)

    const setReview = (on) => {
      document.body.classList.toggle('review', on)
      btn.setAttribute('aria-pressed', String(on))
      panel.hidden = !on
      items.forEach((el) => {
        if (on && getComputedStyle(el).position === 'static') el.style.position = 'relative'
        if (!on && el.style.position === 'relative') el.style.position = ''
      })
    }
    btn.addEventListener('click', () => setReview(btn.getAttribute('aria-pressed') !== 'true'))
    panel.addEventListener('click', (e) => {
      const b = e.target.closest('[data-goto]')
      if (!b) return
      const list = groups.get(keys[Number(b.dataset.goto)])
      const step = Number(b.dataset.step || 0)
      b.dataset.step = String((step + 1) % list.length)
      const el = list[step]
      el.scrollIntoView({ behavior: 'smooth', block: 'center' })
      el.classList.remove('tbc-flash')
      void el.offsetWidth
      el.classList.add('tbc-flash')
    })
    setReview(true)
  }
})()

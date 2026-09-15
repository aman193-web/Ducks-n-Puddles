/**
 * Colour grades, baked at build time (never CSS filters — those break colour
 * management and cost paint time on every frame).
 *
 * Two named grades so two very different sources read as one shoot.
 */

/**
 * CHLORINE — the professional shoot.
 * Already well exposed. The one real problem is that green turf and hedge dominate
 * roughly half the shoot and fight the blue/yellow/orange palette. The recomb matrix
 * bleeds green into blue so foliage drifts toward teal and sits with Splash Blue,
 * while leaving skin and sand largely alone.
 */
export const chlorine = (img) =>
  img
    .linear(1.06, -6)                                    // contrast, slight black crush
    .modulate({ brightness: 1.0, saturation: 1.06 })
    .recomb([
      [1.00, -0.05, 0.03],
      [0.00,  0.95, 0.04],
      [0.00,  0.14, 0.90],                               // green -> teal
    ])

/**
 * OVERCAST — the iPhone dune session.
 * Flat, low-contrast, slightly grey dusk. Needs contrast, warmth in the midtones and
 * saturation on the brand colours, plus a shadow lift because the child is backlit
 * or top-lit in most frames.
 */
export const overcast = (img) =>
  img
    .linear(1.16, -8)                                    // contrast
    .modulate({ brightness: 1.05, saturation: 1.18 })
    .gamma(1.06)                                         // midtone / shadow lift
    .recomb([
      [1.04, 0.02, 0.00],                                // warm the greys
      [0.00, 1.00, 0.00],
      [0.00, 0.02, 0.94],
    ])

export const none = (img) => img

export const grades = { chlorine, overcast, none }

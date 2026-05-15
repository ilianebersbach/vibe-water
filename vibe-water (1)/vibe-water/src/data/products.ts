export const products = [
  {
    id: 1,
    name: 'Original',
    tagline: 'The classic vibe',
    colorTop: '#C0392B',
    colorBottom: '#2980B9',
    accentColor: '#e8836f',
    glowColor: 'rgba(192,57,43,0.4)',
    calories: 0,
  },
  {
    id: 2,
    name: 'Sparkling',
    tagline: 'Bubbles with a vibe',
    colorTop: '#1A5276',
    colorBottom: '#85C1E9',
    accentColor: '#85C1E9',
    glowColor: 'rgba(133,193,233,0.4)',
    calories: 0,
  },
  {
    id: 3,
    name: 'Infused',
    tagline: 'Flavor without the guilt',
    colorTop: '#6C3483',
    colorBottom: '#2980B9',
    accentColor: '#c084fc',
    glowColor: 'rgba(108,52,131,0.4)',
    calories: 0,
  },
]

export type Product = typeof products[number]

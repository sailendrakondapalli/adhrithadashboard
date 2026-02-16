# Background Image Setup

## To Add the Aadhrita x HackerRank Background:

1. **Save the image** you provided to: `frontend/public/bg.jpg`

2. **Update** `frontend/src/index.css` - find the `body::before` section and change:

```css
body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url('/bg.jpg') center center / cover no-repeat;
  opacity: 0.3;  /* Adjust this to make image more/less visible (0.1 to 0.5) */
  z-index: -1;
}
```

3. **Redeploy**:
```bash
cd frontend
vercel --prod
```

## Current Setup:

Currently using an animated gradient background that mimics the Aadhrita colors:
- Red/Crimson glow (left side)
- Green glow (right side)  
- Gold glow (center)

This provides a similar effect while the actual image is being added.

## Opacity Levels:

- `0.1` - Very subtle, barely visible
- `0.2` - Subtle background
- `0.3` - Balanced (current)
- `0.4` - More visible
- `0.5` - Quite visible

Adjust based on text readability preference.

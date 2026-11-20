const fs = require('fs');
const path = require('path');

const imgPath = path.resolve('frontend/public/logo.png');
const imgBase64 = fs.readFileSync(imgPath).toString('base64');
const dataUri = `data:image/png;base64,${imgBase64}`;

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <defs>
    <clipPath id="circleClip">
      <circle cx="256" cy="256" r="236" />
    </clipPath>
    <linearGradient id="ringGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#34D399" />
      <stop offset="50%" stop-color="#10B981" />
      <stop offset="100%" stop-color="#047857" />
    </linearGradient>
    <radialGradient id="bgGrad" cx="50%" cy="40%" r="60%">
      <stop offset="0%" stop-color="#FFFFFF" />
      <stop offset="85%" stop-color="#F0FDF4" />
      <stop offset="100%" stop-color="#DCFCE7" />
    </radialGradient>
    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="6" stdDeviation="10" flood-color="#059669" flood-opacity="0.3"/>
    </filter>
  </defs>

  <!-- Outer circular card background -->
  <circle cx="256" cy="256" r="248" fill="url(#bgGrad)" filter="url(#softGlow)" />
  <circle cx="256" cy="256" r="248" fill="none" stroke="url(#ringGrad)" stroke-width="12" />

  <!-- Inner Clipped UT Logo -->
  <g clip-path="url(#circleClip)">
    <rect width="512" height="512" fill="url(#bgGrad)" />
    <image href="${dataUri}" x="22" y="22" width="468" height="468" preserveAspectRatio="xMidYMid meet" />
  </g>

  <!-- Accent Inner Ring -->
  <circle cx="256" cy="256" r="236" fill="none" stroke="#FFFFFF" stroke-width="4" opacity="0.8" />
</svg>`;

fs.writeFileSync('frontend/public/logo-circle.svg', svgContent, 'utf8');
fs.writeFileSync('frontend/public/favicon.svg', svgContent, 'utf8');
fs.writeFileSync('frontend/public/apple-touch-icon.svg', svgContent, 'utf8');
console.log('Successfully generated standalone circular logo SVG! Output size:', svgContent.length);

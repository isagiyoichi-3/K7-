import sharp from 'sharp'

const SRC = 'src/assets/portrait.jpg'
const OUT = 'src/assets/portrait-glow.webp'

const meta = await sharp(SRC).metadata()
const w = meta.width ?? 640
const h = meta.height ?? 800

const fade = Buffer.from(`<svg width="${w}" height="${h}">
  <defs>
    <radialGradient id="r" cx="50%" cy="32%" r="64%">
      <stop offset="50%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="90%" stop-color="#000000" stop-opacity="1"/>
    </radialGradient>
    <linearGradient id="ll" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#000000" stop-opacity="1"/>
      <stop offset="16%" stop-color="#000000" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="lr" x1="1" y1="0" x2="0" y2="0">
      <stop offset="0%" stop-color="#000000" stop-opacity="1"/>
      <stop offset="16%" stop-color="#000000" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="lt" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#000000" stop-opacity="1"/>
      <stop offset="12%" stop-color="#000000" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="l" x1="0" y1="0" x2="0" y2="1">
      <stop offset="80%" stop-color="#000000" stop-opacity="0"/>
      <stop offset="100%" stop-color="#000000" stop-opacity="1"/>
    </linearGradient>
  </defs>
  <rect width="100%" height="100%" fill="url(#r)"/>
  <rect width="100%" height="100%" fill="url(#lt)"/>
  <rect width="100%" height="100%" fill="url(#ll)"/>
  <rect width="100%" height="100%" fill="url(#lr)"/>
  <rect width="100%" height="100%" fill="url(#l)"/>
</svg>`)

const { data, info } = await sharp(SRC)
  .greyscale()
  .gamma(1.8)
  .linear(1.15, -18)
  .modulate({ brightness: 0.98 })
  .composite([{ input: fade, blend: 'over' }])
  .raw()
  .toBuffer({ resolveWithObject: true })

// True photographic greys in RGB keep the face authentic; alpha opens up only
// where luminance exists, so dark regions and the faded edge stay transparent.
const rgba = Buffer.alloc(info.width * info.height * 4)
for (let i = 0; i < data.length; i++) {
  const v = data[i]
  rgba[i * 4] = v
  rgba[i * 4 + 1] = v
  rgba[i * 4 + 2] = v
  rgba[i * 4 + 3] = Math.min(255, Math.max(0, v * 4 - 12))
}

await sharp(rgba, { raw: { width: info.width, height: info.height, channels: 4 } })
  .webp({ quality: 88 })
  .toFile(OUT)

console.log('wrote', OUT)

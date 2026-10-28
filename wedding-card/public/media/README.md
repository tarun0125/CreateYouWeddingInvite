# 🎬 Media Assets

Place your media files here to enhance the royal wedding experience.

## Required Files

| File | Format | Description |
|------|--------|-------------|
| `royal-palace-intro.mp4` | H.264 MP4, ≤ 50 MB | Cinematic palace intro video (16:9 or 9:16 portrait) |
| `wedding-music.mp3` | MP3, 128–320 kbps | Background instrumental music (loops automatically) |

The application works gracefully without these files — it uses a beautifully crafted CSS/SVG fallback.

## Recommended Specifications

### Video (`royal-palace-intro.mp4`)
- **Resolution**: 1920×1080 (landscape) or 1080×1920 (portrait for mobile-first)
- **Duration**: 30–90 seconds (it loops)
- **Frame rate**: 24 or 30 fps
- **Codec**: H.264 + AAC, muted (audio is separate)
- **Aspect ratio**: 16:9

### Music (`wedding-music.mp3`)
- **Duration**: 3–5 minutes (loops automatically)
- **Format**: MP3, stereo, 192 kbps
- **Type**: Royalty-free instrumental Indian classical or Bollywood-inspired

### Poster Image (`../images/royal-palace-poster.webp`)
- **Resolution**: 1920×1080
- **Format**: WebP for best compression
- Used as the video thumbnail while video loads

## Recommended Free Sources

### Royalty-Free Music
- [Pixabay Music](https://pixabay.com/music/) — search "indian classical" or "sitar"
- [Free Music Archive](https://freemusicarchive.org/)
- [Incompetech](https://incompetech.com/) — Kevin MacLeod's Indian-inspired compositions

### Royalty-Free Video
- [Pexels Videos](https://www.pexels.com/videos/) — search "india palace" or "bollywood wedding"
- [Pixabay Videos](https://pixabay.com/videos/)

## AI-Generated Assets

You can use AI video tools (e.g., Runway, Kling, Sora) to generate a bespoke cinematic palace scene.

Suggested prompt:
> "Cinematic 4K drone shot of a royal Rajasthani palace at dusk, warm golden lanterns illuminating Mughal arches, floating rose petals, slow panning movement, 24fps, photorealistic."

After generating, place the video at `public/media/royal-palace-intro.mp4`.

## Updating the Music/Video Path

If you rename files, update `src/config/wedding.ts`:

```ts
mediaVideoPath: "/media/your-video.mp4",
mediaMusicPath: "/media/your-music.mp3",
mediaPosterPath: "/images/your-poster.webp",
```

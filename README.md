# Her Birthday Universe

A birthday website made with plain HTML, CSS and JavaScript. No frameworks, no build step, no installs, no backend, no paid services.

## Open it

Double-click `index.html`. It runs from your computer in any modern browser (Chrome, Edge, Firefox, Safari). Everything uses relative paths, so you can move the folder anywhere.

Everything works offline. Nothing is loaded from the internet.

## What's inside

| Section | What it does |
|---|---|
| Home | Animated "Happy Birthday" with her name and floating balloons |
| Memories | Photo gallery with a full-screen viewer (arrows, Prev/Next, Esc) |
| Music | Play/pause, volume and animated bars |
| Gift | Tap the gift box to open it, with confetti |
| Letter | Tap the envelope to read your letter |
| Wishes | Tap each star to light up a constellation |
| Finale | Light the candles, blow them out, fireworks |

## Customise it

1. **Words:** open `js/content.js` in Notepad (or any text editor). Change her name, your name, the letter, the wishes, the gift message and the final message. Save and refresh the browser.
2. **Photos:** put your photos in `assets/images/`. Either name them `memory-1.jpg` ... `memory-6.jpg` and update the `src` lines in `js/content.js` (the placeholders are `.svg`), or use any file names and point `src` at them. Add or remove lines in `memories` to change how many photos show.
3. **Music:** copy a song you own, or have permission to use, to `assets/audio/song.mp3`. If the file is missing, the site plays a short built-in "Happy Birthday" tune instead. To use a different file name, change `audioFile` in `js/content.js`.
4. **Videos (optional):** `assets/videos/` is ready for any video you want to add. Link it from `index.html` with a `<video controls src="assets/videos/yourfile.mp4"></video>` tag.
5. **Colours:** change the values at the top of `css/style.css`.

Please don't add copyrighted music or photos you don't have permission to use.

## Notes

- Browsers only start sound after a tap or click, so the music begins when she presses "Enter the Universe" or the Play button.
- If a song file doesn't load when opened directly from disk, check that the name matches `audioFile` exactly. If you ever want to run it through a local server, open a terminal in this folder and run `python3 -m http.server 8000`, then visit `http://localhost:8000`. This is optional and not needed for normal use.

## Put it online (free)

Upload the whole folder to any static host: Netlify Drop (drag the folder onto app.netlify.com/drop), GitHub Pages, or Cloudflare Pages. Share the link with her.

## Folder layout

```
Her_Birthday_Universe/
  index.html
  README.md
  css/        style.css, animations.css, responsive.css
  js/         content.js (your text), main.js, music.js, gallery.js, constellation.js
  assets/     images/, audio/, videos/, icons/
```

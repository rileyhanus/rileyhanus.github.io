# Music Section

This folder contains all the music-related content for the website.

## Local Development

**Important:** This site must be run from a local server (not by double-clicking the HTML file) because it uses `fetch()` to load sections and video data, which requires HTTP/HTTPS.

### Option 1: Python Simple Server (Easiest)

From the project root directory:

```bash
cd /path/to/rileyhanus.github.io
python3 -m http.server 8000
```

Then open: http://localhost:8000/music/music.html

### Option 2: Node.js http-server

If you have Node.js installed:

```bash
npm install -g http-server
cd /path/to/rileyhanus.github.io
http-server -p 8000
```

Then open: http://localhost:8000/music/music.html

### Option 3: VS Code Live Server

If using VS Code, install the "Live Server" extension and right-click `music/music.html` → "Open with Live Server"

## Structure

- `music.html` - Main music page
- `sections/` - Individual section HTML files that are loaded dynamically
- `promo/videos/` - Video files for the video gallery
- `setlist.csv` - CSV file containing all songs in the setlist

## Adding New Videos

1. Add your video file to `promo/videos/` with a number prefix to control the order:

   - Example: `9_New Video.mp4`
   - The number determines the display order (sorted numerically)

2. Run the video generator script to update the video list:

   ```bash
   cd music
   node generate-videos-json.js
   ```

3. The website will automatically display the new video in the correct order!

## Video Naming Convention

- Format: `N_Title.mp4` (where N is a number)
- The script automatically:
  - Sorts videos by number prefix
  - Extracts the title (removes number and extension)

## Editing the Setlist

The setlist is loaded dynamically from `setlist.csv`. Simply edit the CSV file to add, remove, or update songs:

1. Open `setlist.csv` in any text editor or spreadsheet application
2. Format: `SongName,Artist` (one song per line)
   - Example: `Wonderwall,Oasis`
   - If no artist: `Wonderwall,` (leave artist field empty)
   - For songs with commas in the name or artist, wrap in quotes: `"Come Together > I Will Survive > Tainted","The Beatles > Gloria Gaynor > Soft Cell"`
3. Save the file - the website will automatically display the updated setlist!
4. The song count updates automatically

## Example

To add a new video as the 9th item:

1. Save it as: `promo/videos/9_New Performance.mp4`
2. Run: `node generate-videos-json.js`
3. Commit both the video file and `promo/videos/videos.json`

To add a new song to the setlist:

1. Open `setlist.csv`
2. Add a new line: `New Song Name,Artist Name`
3. Save the file
4. Refresh the website - the new song appears automatically!

# Address Region Finder

A web tool that lets users type in an address and instantly find out which of 5 predefined regions it belongs to. Perfect for embedding in Linktree or other websites.

## Features

✅ Simple address input form
✅ Real-time region detection using Google Geocoding API
✅ Beautiful, responsive UI
✅ Color-coded regions for easy identification
✅ Embeddable as an iframe

## Setup Instructions

### 1. Get Google Maps API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project
3. Enable these APIs:
   - Geocoding API
4. Create an API Key (type: Unrestricted)
5. Copy the API key

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment

Create a `.env.local` file in the root directory:

```
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_api_key_here
```

Replace `your_api_key_here` with your actual Google API key.

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Adding Your Regions

### Step 1: Create regions in Google My Maps
1. Go to [Google My Maps](https://www.google.com/maps/d/)
2. Create a new map with 5 regions
3. For each region, note the polygon coordinates (corners of the region)

### Step 2: Update `lib/regions.js`

Edit the `REGIONS` array in `lib/regions.js`:

```javascript
export const REGIONS = [
  {
    id: 1,
    name: "Your Region Name",
    color: "#FF6B6B",  // Hex color for the badge
    polygon: [
      { lat: 51.5, lng: -0.2 },  // Corner 1
      { lat: 51.5, lng: 0.2 },   // Corner 2
      { lat: 51.8, lng: 0.2 },   // Corner 3
      { lat: 51.8, lng: -0.2 },  // Corner 4
    ],
  },
  // ... repeat for other regions
];
```

### How to get polygon coordinates from Google My Maps:
1. Right-click on a location in your map → click "What's here?"
2. The coordinates appear at the bottom
3. Add coordinates for each corner of your region polygon

## Deployment

### Option 1: Deploy to Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Follow the prompts and add your `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` as an environment variable in Vercel.

### Option 2: Deploy to Netlify

1. Push to GitHub
2. Connect repo to Netlify
3. Add environment variable: `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`

### Option 3: Deploy to any Node.js host

```bash
npm run build
npm start
```

## Embedding in Linktree

Once deployed, you can embed this as an iframe in Linktree:

```html
<iframe
  src="https://your-deployed-url.vercel.app"
  width="100%"
  height="600"
  frameborder="0"
  style="border-radius: 12px;"
></iframe>
```

Or add it as a custom link that opens in a modal/new window.

## How It Works

1. User enters an address
2. Frontend sends address to backend API
3. Backend uses Google Geocoding API to convert address → coordinates
4. Backend checks which region polygon contains those coordinates
5. Result displayed to user with region name and color

## File Structure

```
address-region-finder/
├── pages/
│   ├── api/
│   │   └── find-region.js      # Backend API endpoint
│   ├── _app.js                  # App wrapper
│   └── index.js                 # Main page
├── lib/
│   └── regions.js               # Region definitions & logic
├── styles/
│   └── globals.css              # Styling
├── .env.local                   # Environment variables (create this)
├── package.json
└── README.md
```

## Troubleshooting

**"API key not configured"**
- Make sure `.env.local` exists with `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY`
- Restart development server after adding the key

**"Address not found"**
- Try entering a more complete address
- Check that Google Geocoding API is enabled in your Google Cloud project

**Address found but not in any region**
- Make sure your region polygons are set up correctly
- Check that polygon coordinates create a valid closed shape
- Test with coordinates you know should be in a region

## Next Steps

1. ✅ Test locally with placeholder data
2. 📍 Create your regions in Google My Maps
3. 🔄 Update `lib/regions.js` with your actual region coordinates
4. 🚀 Deploy to Vercel/Netlify
5. 📎 Add iframe to Linktree

Questions? Check the inline comments in the code!

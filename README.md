# Yugoslav Meteorological Bureau - London Weather

**Retro 1978 weather station aesthetic for London weather forecasts**

## Overview

Web interface for the weather-bot project. Displays daily weather forecasts with full Yugoslav Meteorological Bureau aesthetic.

## Features

- **Full retro design:** 1970s Soviet weather station vibe
- **Analog gauges:** Temperature, humidity, and wind visualizations
- **Cyrillic headers:** Authentic atmosphere (МЕТЕОРОЛОГИЧЕСКОЕ БЮРО)
- **Vibrant palette:** Burnt oranges, mustard yellows, olive greens
- **Faded paper texture:** Authentic aged document feel
- **Yugoslav commentary:** Put-upon, sardonic forecaster personality
- **PWA-ready:** Add to home screen support

## Tech Stack

- Vanilla HTML/CSS/JavaScript (no frameworks)
- Supabase for data (public read-only access)
- Netlify hosting
- ESM imports for Supabase client

## Local Development

1. Open `index.html` in a browser (needs a local server for ESM imports to work)
2. Or use: `python3 -m http.server 8000`
3. Visit: `http://localhost:8000`

## Deployment

Deploy to Netlify:

```bash
cd /Users/poppet/code/weather-bot-web
# Use Netlify CLI or drag-and-drop to Netlify dashboard
```

Site name: `meteo-bureau`

## Data Source

Fetches today's forecast from Supabase `weather_forecasts` table (populated daily by weather-bot GitHub Actions).

## Future Modules

Planned additions (scaffolded in UI):
- Tides (London)
- Word of the Day
- AI-generated weather illustration
- Historical archive view

---

**Last Updated:** 2025-11-24
**Status:** ✅ Ready to deploy

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Missing latitude or longitude' });
  }

  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,is_day,weather_description`;

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      console.error('Open-Meteo error:', response.status, response.statusText);
      return res.status(response.status).json({ error: 'Weather API error: ' + response.statusText });
    }

    const data = await response.json();
    res.setHeader('Cache-Control', 'public, max-age=600'); // Cache for 10 minutes
    return res.status(200).json(data);
  } catch (error) {
    console.error('Weather proxy error:', error.message);
    return res.status(500).json({ error: 'Failed to fetch weather data: ' + error.message });
  }
}


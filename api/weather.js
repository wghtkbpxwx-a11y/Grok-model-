export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Missing latitude or longitude' });
  }

  try {
    // Try wttr.in API (more reliable, no API key needed)
    const url = `https://wttr.in/${lat},${lon}?format=j1`;

    const response = await fetch(url, {
      headers: { 'User-Agent': 'Dashboard/1.0' }
    });

    if (response.ok) {
      const data = await response.json();
      res.setHeader('Cache-Control', 'public, max-age=600');

      // Transform to Open-Meteo format for compatibility
      const current = data.current_condition[0];
      return res.status(200).json({
        current: {
          temperature_2m: parseFloat(current.temp_C),
          weather_code: parseInt(current.weatherCode),
          weather_description: current.weatherDesc[0].value,
          is_day: current.is_day ? 1 : 0
        }
      });
    }

    // Fallback to Open-Meteo
    const fallbackUrl = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,weather_code,is_day,weather_description`;
    const fallback = await fetch(fallbackUrl);

    if (fallback.ok) {
      const data = await fallback.json();
      res.setHeader('Cache-Control', 'public, max-age=600');
      return res.status(200).json(data);
    }

    return res.status(500).json({ error: 'Weather APIs unavailable' });
  } catch (error) {
    console.error('Weather error:', error.message);
    return res.status(500).json({ error: 'Weather service error' });
  }
}



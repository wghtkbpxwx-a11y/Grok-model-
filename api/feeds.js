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

  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'Missing feed URL' });
  }

  try {
    // If it's an RSS URL, use RSS2JSON proxy
    const feedUrl = url.includes('rss2json')
      ? url
      : `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(url)}`;

    const response = await fetch(feedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Feed API error' });
    }

    const data = await response.json();
    res.setHeader('Cache-Control', 'public, max-age=600'); // Cache for 10 minutes
    return res.status(200).json(data);
  } catch (error) {
    console.error('Feed proxy error:', error);
    return res.status(500).json({ error: 'Failed to fetch feed data' });
  }
}

// Vercel Serverless Function: Subscribe lead to Brevo
// POST /api/subscribe

module.exports = async function handler(req, res) {
  // CORS headers - allow both www and non-www
  const origin = req.headers.origin || '';
  const allowedOrigins = ['https://nicolasgenise.org', 'https://www.nicolasgenise.org'];
  if (allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  try {
    const { name, email, profession, source } = req.body || {};

    if (!email || !name) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const BREVO_API_KEY = (process.env.BREVO_API_KEY || '').trim();
    if (!BREVO_API_KEY) {
      console.error('BREVO_API_KEY not configured');
      return res.status(500).json({ error: 'Server configuration error' });
    }

    const contactData = {
      email: email.toLowerCase().trim(),
      attributes: {
        NOMBRE: name.split(' ')[0],
        APELLIDOS: name.split(' ').slice(1).join(' ') || '',
        JOB_TITLE: profession || '',
        TIPO: source || 'guia-download'
      },
      listIds: [23],
      updateEnabled: true
    };

    // Create contact in Brevo
    const brevoRes = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY
      },
      body: JSON.stringify(contactData)
    });

    const status = brevoRes.status;
    // Read response body ONCE (stream can only be consumed once)
    const responseText = await brevoRes.text();

    // Parse JSON from the already-read text
    let responseBody = {};
    try { responseBody = JSON.parse(responseText); } catch (e) {}

    // 201 = created, 204 = updated, 200 = ok
    if (status === 201 || status === 204 || status === 200) {
      return res.status(200).json({ success: true });
    }

    // 400 = duplicate or validation error
    if (status === 400 && responseBody.code === 'duplicate_parameter') {
      // Update existing contact via PUT
      try {
        await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(contactData.email)}`, {
          method: 'PUT',
          headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'api-key': BREVO_API_KEY
          },
          body: JSON.stringify({
            attributes: contactData.attributes,
            listIds: [23]
          })
        });
      } catch (e) {
        console.error('Brevo PUT update error:', e.message);
      }
      return res.status(200).json({ success: true });
    }

    // Any other error - log but return success to user (graceful degradation)
    console.error('Brevo error:', status, responseText);
    return res.status(200).json({ success: true });

  } catch (error) {
    console.error('Server error:', error.message || error);
    return res.status(500).json({ error: 'Server error. Please try again.' });
  }
}

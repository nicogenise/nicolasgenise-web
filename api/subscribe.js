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

  // TEMPORARY DIAGNOSTIC MODE - remove after confirming Brevo works
  const diagnostic = {};

  try {
    const { name, email, profession, source } = req.body || {};

    if (!email || !name) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const BREVO_API_KEY_RAW = process.env.BREVO_API_KEY;
    const BREVO_API_KEY = BREVO_API_KEY_RAW ? BREVO_API_KEY_RAW.trim() : '';
    diagnostic.hasKey = !!BREVO_API_KEY;
    diagnostic.keyLenRaw = BREVO_API_KEY_RAW ? BREVO_API_KEY_RAW.length : 0;
    diagnostic.keyLenTrimmed = BREVO_API_KEY.length;
    diagnostic.keyPrefix = BREVO_API_KEY ? BREVO_API_KEY.substring(0, 12) : 'NONE';
    diagnostic.keySuffix = BREVO_API_KEY ? BREVO_API_KEY.substring(BREVO_API_KEY.length - 8) : 'NONE';
    diagnostic.hadWhitespace = BREVO_API_KEY_RAW !== BREVO_API_KEY;

    if (!BREVO_API_KEY) {
      diagnostic.error = 'BREVO_API_KEY not configured';
      return res.status(200).json({ success: false, diagnostic });
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

    diagnostic.sentPayload = contactData;

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

    diagnostic.brevoStatus = status;
    diagnostic.brevoResponse = responseText;

    // Parse JSON from the already-read text
    let responseBody = {};
    try { responseBody = JSON.parse(responseText); } catch (e) {}

    // 201 = created, 204 = updated, 200 = ok
    if (status === 201 || status === 204 || status === 200) {
      diagnostic.result = 'CREATED_OR_UPDATED';
      return res.status(200).json({ success: true, diagnostic });
    }

    // 400 = duplicate or validation error
    if (status === 400 && responseBody.code === 'duplicate_parameter') {
      diagnostic.result = 'DUPLICATE_UPDATING';
      // Update existing contact via PUT
      try {
        const putRes = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(contactData.email)}`, {
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
        diagnostic.putStatus = putRes.status;
      } catch (e) {
        diagnostic.putError = e.message;
      }
      return res.status(200).json({ success: true, diagnostic });
    }

    // Any other error
    diagnostic.result = 'BREVO_ERROR';
    return res.status(200).json({ success: false, diagnostic });

  } catch (error) {
    diagnostic.result = 'SERVER_ERROR';
    diagnostic.errorMessage = error.message || String(error);
    return res.status(200).json({ success: false, diagnostic });
  }
}

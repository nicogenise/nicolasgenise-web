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

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, profession, source } = req.body || {};

    if (!email || !name) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    const BREVO_API_KEY = process.env.BREVO_API_KEY;
    console.log('DEBUG_ENV: BREVO_API_KEY exists:', !!BREVO_API_KEY, 'len:', BREVO_API_KEY ? BREVO_API_KEY.length : 0);
    if (!BREVO_API_KEY) {
      console.error('BREVO_API_KEY not set');
      return res.status(500).json({ error: 'Server configuration error', debug: 'BREVO_API_KEY missing' });
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
    let responseText = '';
    try { responseText = await brevoRes.text(); } catch(e) {}
    console.log('DEBUG_BREVO: status:', status, 'body:', responseText);

    // 201 = created, 204 = updated
    if (status === 201 || status === 204 || status === 200) {
      return res.status(200).json({ success: true, debug_status: status });
    }

    // 400 = duplicate or validation error
    if (status === 400) {
      let errBody = {};
      try { errBody = await brevoRes.json(); } catch(e) {}

      if (errBody.code === 'duplicate_parameter') {
        // Update existing contact
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
        } catch(e) {
          console.error('Update error:', e);
        }
        return res.status(200).json({ success: true });
      }

      console.error('Brevo 400:', JSON.stringify(errBody));
      return res.status(200).json({ success: true }); // Still success for user
    }

    // Any other error - log but still return success to user
    let errText = '';
    try { errText = await brevoRes.text(); } catch(e) {}
    console.error('Brevo error:', status, errText);
    return res.status(200).json({ success: true }); // Graceful degradation

  } catch (error) {
    console.error('Server error:', error.message || error);
    return res.status(500).json({ error: 'Server error. Please try again.' });
  }
}

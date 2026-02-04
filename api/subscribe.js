// Vercel Serverless Function: Subscribe lead to Brevo
// Handles guide download form and modal form submissions
// POST /api/subscribe

export default async function handler(req, res) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'https://nicolasgenise.org');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, email, profession, source } = req.body;

  // Validation
  if (!email || !name) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  const BREVO_API_KEY = process.env.BREVO_API_KEY;
  if (!BREVO_API_KEY) {
    console.error('BREVO_API_KEY environment variable not set');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  // List IDs: 23 = Suscriptores Blog (general leads)
  const LIST_ID = 23;

  try {
    // Create/update contact in Brevo
    const brevoResponse = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'content-type': 'application/json',
        'api-key': BREVO_API_KEY
      },
      body: JSON.stringify({
        email: email.toLowerCase().trim(),
        attributes: {
          FIRSTNAME: name.split(' ')[0],
          LASTNAME: name.split(' ').slice(1).join(' ') || '',
          NOMBRE: name,
          PROFESION: profession || '',
          SOURCE: source || 'guia-download',
          SIGNUP_DATE: new Date().toISOString().split('T')[0]
        },
        listIds: [LIST_ID],
        updateEnabled: true
      })
    });

    if (brevoResponse.ok || brevoResponse.status === 204) {
      return res.status(200).json({ success: true, message: 'Contact created successfully' });
    }

    // Handle duplicate contact (already exists) - still success for user
    if (brevoResponse.status === 400) {
      const errorData = await brevoResponse.json();
      if (errorData.code === 'duplicate_parameter') {
        // Contact already exists, try to update their lists
        await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email.toLowerCase().trim())}`, {
          method: 'PUT',
          headers: {
            'accept': 'application/json',
            'content-type': 'application/json',
            'api-key': BREVO_API_KEY
          },
          body: JSON.stringify({
            attributes: {
              NOMBRE: name,
              PROFESION: profession || '',
              SOURCE: source || 'guia-download'
            },
            listIds: [LIST_ID]
          })
        });
        return res.status(200).json({ success: true, message: 'Contact updated successfully' });
      }
      return res.status(400).json({ error: errorData.message || 'Failed to create contact' });
    }

    const errorText = await brevoResponse.text();
    console.error('Brevo API error:', brevoResponse.status, errorText);
    return res.status(500).json({ error: 'Failed to subscribe. Please try again.' });

  } catch (error) {
    console.error('Server error:', error);
    return res.status(500).json({ error: 'Server error. Please try again later.' });
  }
}

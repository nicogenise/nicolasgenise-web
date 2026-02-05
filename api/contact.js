// Vercel Serverless Function: Contact form handler
// Sends data to n8n webhook AND creates contact in Brevo
// POST /api/contact

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

  const { name, email, subject, message } = req.body;

  // Validation
  if (!email || !name || !message) {
    return res.status(400).json({ error: 'Name, email, and message are required' });
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }

  const BREVO_API_KEY = (process.env.BREVO_API_KEY || '').trim();
  const N8N_WEBHOOK_URL = process.env.N8N_WEBHOOK_URL;

  const results = { brevo: false, n8n: false, email: false };

  // 1. Create contact in Brevo (if API key available)
  if (BREVO_API_KEY) {
    try {
      const brevoRes = await fetch('https://api.brevo.com/v3/contacts', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'api-key': BREVO_API_KEY
        },
        body: JSON.stringify({
          email: email.toLowerCase().trim(),
          attributes: {
            NOMBRE: name.split(' ')[0],
            APELLIDOS: name.split(' ').slice(1).join(' ') || '',
            TIPO: 'contact-form'
          },
          listIds: [23],
          updateEnabled: true
        })
      });
      const brevoStatus = brevoRes.status;
      const brevoText = await brevoRes.text();
      let brevoBody = {};
      try { brevoBody = JSON.parse(brevoText); } catch (e) {}

      if (brevoStatus === 201 || brevoStatus === 204 || brevoStatus === 200) {
        results.brevo = true;
      } else if (brevoStatus === 400 && brevoBody.code === 'duplicate_parameter') {
        // Contact exists, update it
        try {
          const updateRes = await fetch(`https://api.brevo.com/v3/contacts/${encodeURIComponent(email.toLowerCase().trim())}`, {
            method: 'PUT',
            headers: { 'accept': 'application/json', 'content-type': 'application/json', 'api-key': BREVO_API_KEY },
            body: JSON.stringify({ attributes: { NOMBRE: name.split(' ')[0], APELLIDOS: name.split(' ').slice(1).join(' ') || '', TIPO: 'contact-form' }, listIds: [23] })
          });
          await updateRes.text(); // consume stream
          results.brevo = true;
        } catch (e) { console.error('Brevo PUT update error:', e.message); }
      } else {
        console.error('Brevo create error:', brevoStatus, brevoText);
      }
    } catch (error) {
      console.error('Brevo error:', error.message || error);
    }
  }

  // 2. Send to n8n webhook (if webhook URL available)
  if (N8N_WEBHOOK_URL) {
    try {
      const n8nRes = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email: email.toLowerCase().trim(),
          subject: subject || 'Consulta general',
          message,
          source: 'nicolasgenise.org',
          timestamp: new Date().toISOString()
        })
      });
      await n8nRes.text(); // consume stream
      results.n8n = n8nRes.status >= 200 && n8nRes.status < 300;
    } catch (error) {
      console.error('n8n webhook error:', error.message || error);
    }
  }

  // 3. Send notification email via Brevo transactional API
  if (BREVO_API_KEY) {
    try {
      const emailRes = await fetch('https://api.brevo.com/v3/smtp/email', {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'content-type': 'application/json',
          'api-key': BREVO_API_KEY
        },
        body: JSON.stringify({
          sender: { name: 'Web nicolasgenise.org', email: 'contacto@nicolasgenise.org' },
          to: [{ email: 'ngenise@gmail.com', name: 'Nicolás Genise' }],
          replyTo: { email: email.toLowerCase().trim(), name: name },
          subject: `[Web] ${subject || 'Consulta'} - ${name}`,
          htmlContent: `
            <h2>Nuevo mensaje desde nicolasgenise.org</h2>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Asunto:</strong> ${subject || 'No especificado'}</p>
            <p><strong>Mensaje:</strong></p>
            <p>${message.replace(/\n/g, '<br>')}</p>
            <hr>
            <p><small>Enviado desde el formulario de contacto de nicolasgenise.org - ${new Date().toLocaleString('es-AR')}</small></p>
          `
        })
      });
      const emailStatus = emailRes.status;
      await emailRes.text(); // consume stream
      results.email = emailStatus >= 200 && emailStatus < 300;
    } catch (error) {
      console.error('Email notification error:', error.message || error);
    }
  }

  // If at least one channel worked, it's a success
  if (results.brevo || results.n8n || results.email) {
    return res.status(200).json({ success: true, message: 'Message sent successfully' });
  }

  return res.status(500).json({ error: 'Failed to process your message. Please try again.' });
}

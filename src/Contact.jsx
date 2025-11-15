import { useEffect, useState } from 'react';
import Container from './Components/Container/Container';
import { getConsent } from './utils/cookieConsent';

const emailIsValid = (email) => {
  return /^[\w.%+-]+@[\w.-]+\.[A-Za-z]{2,}$/.test(String(email).trim());
};

const loadReCaptcha = (siteKey) => {
  if (!siteKey) return Promise.resolve(null);
  if (window.grecaptcha) return Promise.resolve(window.grecaptcha);

  return new Promise((resolve, reject) => {
    const existing = document.getElementById('recaptcha-script');
    if (existing) {
      existing.addEventListener('load', () => {
        resolve(window.grecaptcha || null);
      });
      return;
    }

    const script = document.createElement('script');
    script.id = 'recaptcha-script';
    script.src = `https://www.google.com/recaptcha/api.js?render=${siteKey}`;
    script.async = true;
    script.defer = true;
    script.onload = () => {
      resolve(window.grecaptcha || null);
    };
    script.onerror = () => resolve(null);
    document.body.appendChild(script);
  });
};

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '', website: '' }); // website is honeypot
  const [status, setStatus] = useState(null); // null | 'sending' | 'success' | 'error'
  const [errors, setErrors] = useState({});
  const [recaptchaLoaded, setRecaptchaLoaded] = useState(false);

  const siteKey = import.meta.env.VITE_RECAPTCHA_KEY || null;

  useEffect(() => {
    if (siteKey) {
      loadReCaptcha(siteKey).then((gre) => {
        if (gre) setRecaptchaLoaded(true);
      });
    }
  }, [siteKey]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const validate = () => {
    const err = {};
    if (!form.name || !form.name.trim()) err.name = 'Name is required';
    if (!form.email || !emailIsValid(form.email)) err.email = 'Please enter a valid email';
    if (!form.message || form.message.trim().length < 10) err.message = 'Message must be at least 10 characters';
    // honeypot should be empty
    if (form.website && form.website.trim() !== '') err.website = 'Spam detected';
    return err;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    const err = validate();
    if (Object.keys(err).length) {
      setErrors(err);
      return;
    }

    setStatus('sending');

    try {
      let recaptchaToken = null;
      if (siteKey && window.grecaptcha) {
        // ensure grecaptcha ready and execute (v3)
        recaptchaToken = await new Promise((resolve) => {
          try {
            window.grecaptcha.ready(() => {
              window.grecaptcha.execute(siteKey, { action: 'contact' }).then(resolve).catch(() => resolve(null));
            });
          } catch (err) {
            resolve(null);
          }
        });
      }

      const payload = { name: form.name.trim(), email: form.email.trim(), message: form.message.trim(), recaptchaToken };

      // Replace this simulated send with a real API call to your server
      // Example:
      // const res = await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      // if (!res.ok) throw new Error('Network error');

      // For now we simulate server send
      await new Promise((r) => setTimeout(r, 700));
      console.log('Contact payload (simulated send):', payload);

      setStatus('success');
      setForm({ name: '', email: '', message: '', website: '' });
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <Container>
      <div className="py-12 md:py-20">
        <div className="mb-16 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Contact Us</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Have a suggestion or want to share a hidden gem? Send me a message — I'd love to hear from you.
          </p>
        </div>

        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-8">
          <div className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Get In Touch</h2>
            <p className="text-gray-700 mb-4">
              I’m a solo creator building Unhide Nepal. If you found a place that should be on the map,
              or if you have feedback, please drop a note below. I aim to reply within a few days.
            </p>

            <p className="text-sm text-gray-600 mb-2">
              Prefer email? <a href="mailto:rishi@example.com" className="text-cyan-600 underline">rishi@example.com</a>
            </p>

            <p className="text-sm text-gray-600">Or check the project on <a href="https://github.com/Rishi-Rijal" target="_blank" rel="noreferrer" className="text-cyan-600 underline">GitHub</a>.</p>
            {siteKey && (
              <p className="text-xs text-slate-500 mt-4">reCAPTCHA is enabled on this form for spam protection.</p>
            )}
          </div>

          <div className="p-6 bg-white border border-slate-200 rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              {/* Honeypot field (bots often fill) */}
              <input type="text" name="website" value={form.website} onChange={handleChange} autoComplete="off" tabIndex={-1} style={{display: 'none'}} />

              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  id="name"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${errors.name ? 'border-red-300' : ''}`}
                  placeholder="Your name"
                />
                {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${errors.email ? 'border-red-300' : ''}`}
                  placeholder="you@example.com"
                />
                {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 ${errors.message ? 'border-red-300' : ''}`}
                  placeholder="Tell me about the place, your idea, or feedback..."
                />
                {errors.message && <p className="text-red-600 text-sm mt-1">{errors.message}</p>}
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  className="px-5 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700 disabled:opacity-60"
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setForm({ name: '', email: '', message: '', website: '' });
                    setStatus(null);
                    setErrors({});
                  }}
                  className="px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200"
                >
                  Reset
                </button>
              </div>

              {status === 'success' && (
                <div className="p-3 mt-2 bg-green-50 border border-green-200 text-green-800 rounded">
                  Thanks — your message has been sent. I’ll get back to you soon.
                </div>
              )}

              {status === 'error' && (
                <div className="p-3 mt-2 bg-red-50 border border-red-200 text-red-800 rounded">
                  Oops — something went wrong. Please try again or email me directly.
                </div>
              )}
            </form>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 italic">Thanks for helping make Nepal more visible.</p>
        </div>
      </div>
    </Container>
  );
};

export default Contact;

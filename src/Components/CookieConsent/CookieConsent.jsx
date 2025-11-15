import { useEffect, useState } from 'react';
import { getConsent, setConsent } from '../../utils/cookieConsent';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [preferences, setPreferences] = useState({ analytics: false, marketing: false });

  useEffect(() => {
    const stored = getConsent();
    if (!stored) {
      setVisible(true);
    } else {
      setPreferences({
        analytics: !!stored.analytics,
        marketing: !!stored.marketing,
      });
    }
  }, []);

  const acceptAll = () => {
    const newPref = { essential: true, analytics: true, marketing: true };
    setConsent(newPref);
    setPreferences({ analytics: true, marketing: true });
    setVisible(false);
    window.dispatchEvent(new CustomEvent('cookie-consent-changed', { detail: newPref }));
  };

  const declineAll = () => {
    const newPref = { essential: true, analytics: false, marketing: false };
    setConsent(newPref);
    setPreferences({ analytics: false, marketing: false });
    setVisible(false);
    window.dispatchEvent(new CustomEvent('cookie-consent-changed', { detail: newPref }));
  };

  const savePreferences = () => {
    const newPref = { essential: true, analytics: !!preferences.analytics, marketing: !!preferences.marketing };
    setConsent(newPref);
    setVisible(false);
    setShowModal(false);
    window.dispatchEvent(new CustomEvent('cookie-consent-changed', { detail: newPref }));
  };

  if (!visible) return null;

  return (
    <>
      {/* Banner */}
      <div className="fixed left-4 right-4 bottom-6 z-50 md:left-auto md:right-8 md:bottom-8">
        <div className="bg-white border border-slate-200 shadow-lg rounded-lg p-4 md:p-6 max-w-3xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="text-sm text-slate-700">
              We use cookies to improve your experience. By clicking "Accept all" you agree to our use
              of analytics and marketing cookies. You can choose your preferences.
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={declineAll}
                className="px-4 py-2 rounded-lg bg-gray-100 text-gray-800 hover:bg-gray-200"
              >
                Decline
              </button>
              <button
                onClick={() => setShowModal(true)}
                className="px-4 py-2 rounded-lg bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
              >
                Manage
              </button>
              <button
                onClick={acceptAll}
                className="px-4 py-2 rounded-lg bg-cyan-600 text-white hover:bg-cyan-700"
              >
                Accept all
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal for preferences */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
          <div className="bg-white rounded-lg p-6 max-w-xl w-full">
            <h3 className="text-lg font-semibold mb-4">Cookie Preferences</h3>
            <p className="text-sm text-slate-700 mb-4">
              Choose which cookies you allow. Essential cookies are required for basic site functionality and cannot be disabled.
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-between border rounded p-3">
                <div>
                  <div className="font-medium">Essential</div>
                  <div className="text-sm text-slate-600">Required for core functionality</div>
                </div>
                <div className="text-sm text-slate-600">Always Active</div>
              </div>

              <label className="flex items-center justify-between border rounded p-3">
                <div>
                  <div className="font-medium">Analytics</div>
                  <div className="text-sm text-slate-600">Helps us improve the site (anonymous)</div>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.analytics}
                  onChange={(e) => setPreferences((p) => ({ ...p, analytics: e.target.checked }))}
                  className="w-5 h-5"
                />
              </label>

              <label className="flex items-center justify-between border rounded p-3">
                <div>
                  <div className="font-medium">Marketing</div>
                  <div className="text-sm text-slate-600">Personalized ads and content</div>
                </div>
                <input
                  type="checkbox"
                  checked={preferences.marketing}
                  onChange={(e) => setPreferences((p) => ({ ...p, marketing: e.target.checked }))}
                  className="w-5 h-5"
                />
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button onClick={() => setShowModal(false)} className="px-4 py-2 rounded-lg bg-gray-100">Cancel</button>
              <button onClick={savePreferences} className="px-4 py-2 rounded-lg bg-cyan-600 text-white">Save preferences</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CookieConsent;

const STORAGE_KEY = 'unhide_cookie_consent_v1';

export function getConsent() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch (e) {
    return null;
  }
}

export function setConsent(obj) {
  try {
    const payload = {
      ...obj,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    return true;
  } catch (e) {
    return false;
  }
}

export function clearConsent() {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (e) {
    return false;
  }
}

export function hasConsent(category) {
  const c = getConsent();
  if (!c) return false;
  if (category === 'essential') return true;
  return !!c[category];
}

export default {
  getConsent,
  setConsent,
  clearConsent,
  hasConsent,
};

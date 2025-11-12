// Simple favorites utility using localStorage
const STORAGE_KEY = "unhide:favorites";

export function getFavorites() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to read favorites", e);
    return [];
  }
}

export function saveFavorites(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch (e) {
    console.error("Failed to save favorites", e);
  }
}

export function isFavorited(id) {
  if (!id) return false;
  return getFavorites().some((it) => it.id === id);
}

export function toggleFavorite(item) {
  if (!item || !item.id) return;
  const current = getFavorites();
  const exists = current.find((it) => it.id === item.id);
  let next;
  if (exists) {
    next = current.filter((it) => it.id !== item.id);
  } else {
    next = [item, ...current];
  }
  saveFavorites(next);
  return next;
}

export default { getFavorites, saveFavorites, isFavorited, toggleFavorite };

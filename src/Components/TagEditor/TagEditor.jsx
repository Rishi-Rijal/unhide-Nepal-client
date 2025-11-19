import { useState } from 'react';

export default function TagEditor({ value = [], onChange, placeholder = 'Add a tag and press Enter' }) {
  const [input, setInput] = useState('');

  const addTag = (tag) => {
    const t = (tag || input || '').trim();
    if (!t) return;
    if ((value || []).includes(t)) return;
    onChange?.([...value, t]);
    setInput('');
  };

  const removeTag = (idx) => {
    const next = [...(value || [])];
    next.splice(idx, 1);
    onChange?.(next);
  };

  const onKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      addTag(input);
    } else if (e.key === 'Backspace' && !input && value.length) {
      // remove last
      removeTag(value.length - 1);
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-wrap gap-2">
        {(value || []).map((t, i) => (
          <span key={t + i} className="flex items-center gap-2 bg-amber-100 text-amber-800 px-2 py-1 rounded-md text-sm">
            <span>{t}</span>
            <button type="button" onClick={() => removeTag(i)} className="text-amber-700 hover:text-amber-900">✕</button>
          </span>
        ))}
      </div>

      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className="mt-2 w-full border rounded-md px-3 py-2 text-sm"
      />
    </div>
  );
}

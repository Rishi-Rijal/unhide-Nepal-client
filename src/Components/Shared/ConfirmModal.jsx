import { useState, useEffect } from 'react';

const ConfirmModal = ({ open, title = 'Confirm', message, onConfirm, onCancel, confirmText = 'Yes', requireText = '' }) => {
  const [input, setInput] = useState('');

  useEffect(() => {
    if (!open) setInput('');
  }, [open]);

  if (!open) return null;

  const requires = typeof requireText === 'string' && requireText.length > 0;
  const ok = requires ? input.trim() === requireText : true;

  return (
    <div className="fixed inset-0 z-60 grid place-items-center bg-black/50">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-4">
        <div className="font-semibold text-slate-900">{title}</div>
        <div className="mt-2 text-sm text-slate-700">{message}</div>
        {requires && (
          <div className="mt-3">
            <label className="text-xs text-slate-600">Type <span className="font-mono">{requireText}</span> to confirm</label>
            <input value={input} onChange={(e) => setInput(e.target.value)} className="mt-1 w-full rounded border px-2 py-1" />
          </div>
        )}
        <div className="mt-4 flex justify-end gap-2">
          <button className="px-3 py-1 rounded border" onClick={onCancel}>Cancel</button>
          <button className="px-3 py-1 rounded bg-rose-600 text-white" onClick={onConfirm} disabled={!ok}>{confirmText}</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;

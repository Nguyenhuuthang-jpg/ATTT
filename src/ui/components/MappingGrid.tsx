import React from 'react';

interface MappingGridProps {
  mapping: Record<string, string>;
  onChange: (letter: string, value: string) => void;
  disabled?: boolean;
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const MappingGrid: React.FC<MappingGridProps> = ({ mapping, onChange, disabled }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>, letter: string) => {
    let val = e.target.value.toUpperCase().replace(/[^A-Z]/g, '');
    if (val.length > 1) val = val.charAt(val.length - 1);
    onChange(letter, val);
  };

  return (
    <div className="mapping-grid" id="mapping-grid" aria-label="Lưới ánh xạ">
      {ALPHABET.map((letter) => {
        const value = mapping[letter] || '';
        const isMapped = value.length > 0;
        
        return (
          <div key={letter} className={`mapping-cell ${isMapped ? 'mapped' : ''}`}>
            <div className="mapping-cell-label" aria-hidden="true">{letter}</div>
            <div className="mapping-cell-arrow" aria-hidden="true">↓</div>
            <input
              type="text"
              className="mapping-cell-input"
              value={value}
              onChange={(e) => handleChange(e, letter)}
              disabled={disabled}
              maxLength={1}
              aria-label={`Chữ cái ánh xạ cho ${letter}`}
              id={`mapping-input-${letter}`}
            />
          </div>
        );
      })}
    </div>
  );
};

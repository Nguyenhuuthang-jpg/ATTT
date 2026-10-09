import React from 'react';

interface AlphabetStripProps {
  shift: number;
}

const ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const AlphabetStrip: React.FC<AlphabetStripProps> = ({ shift }) => {
  const normalizedShift = ((shift % 26) + 26) % 26;
  
  return (
    <div className="alphabet-strip" id="alphabet-strip" aria-label="Bảng chữ cái">
      <div className="alphabet-row top-row" aria-hidden="true">
        {ALPHABET.map((letter) => (
          <div key={`plain-${letter}`} className="alphabet-cell-plain">
            {letter}
          </div>
        ))}
      </div>
      <div className="alphabet-arrows" aria-hidden="true">
        {ALPHABET.map((letter) => (
          <div key={`arrow-${letter}`} className="alphabet-arrow">
            ↓
          </div>
        ))}
      </div>
      <div className="alphabet-row bottom-row" aria-hidden="true" style={{ transition: 'all 0.3s ease-in-out' }}>
        {ALPHABET.map((_, index) => {
          const shiftedIndex = (index + normalizedShift) % 26;
          return (
            <div key={`cipher-${ALPHABET[shiftedIndex]}`} className="alphabet-cell-cipher">
              {ALPHABET[shiftedIndex]}
            </div>
          );
        })}
      </div>
    </div>
  );
};

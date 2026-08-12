import { useState } from 'react';

export default function InteractiveTitle({ text, className, style }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);

  if (typeof text !== 'string' || !text) {
    return (
      <h2 className={className} style={style}>
        {text}
      </h2>
    );
  }

  const baseColor = (style && style.color) || '#0f172a';
  const words = text.split(' ');
  let globalCharIdx = 0;

  return (
    <h2
      className={className}
      style={{
        ...style,
        position: 'relative',
        lineHeight: style?.lineHeight || 1.3
      }}
      onMouseLeave={() => setHoveredIdx(null)}
    >
      {words.map((word, wordIdx) => {
        const wordChars = word.split('');
        const wordStartIndex = globalCharIdx;
        globalCharIdx += wordChars.length + 1;

        return (
          <span
            key={wordIdx}
            style={{
              display: 'inline-block',
              whiteSpace: 'nowrap'
            }}
          >
            {wordChars.map((char, charInWordIdx) => {
              const charIdx = wordStartIndex + charInWordIdx;
              let charColor = baseColor;
              if (hoveredIdx !== null) {
                const dist = Math.abs(hoveredIdx - charIdx);
                if (dist === 0) charColor = '#2563eb';
                else if (dist === 1) charColor = '#3b82f6';
                else if (dist === 2) charColor = '#93c5fd';
              }

              return (
                <span
                  key={charInWordIdx}
                  onMouseEnter={() => setHoveredIdx(charIdx)}
                  style={{
                    display: 'inline',
                    transition: 'color 0.15s ease-out',
                    color: charColor,
                    cursor: 'default'
                  }}
                >
                  {char}
                </span>
              );
            })}
            {wordIdx < words.length - 1 && (
              <span style={{ display: 'inline', whiteSpace: 'pre' }}> </span>
            )}
          </span>
        );
      })}
    </h2>
  );
}

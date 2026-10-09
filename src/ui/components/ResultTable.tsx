import React from 'react';

interface ResultItem {
  key: number;
  plaintext: string;
  score: number;
}

interface ResultTableProps {
  results: ResultItem[];
  onSelect?: (key: number) => void;
}

export const ResultTable: React.FC<ResultTableProps> = ({ results, onSelect }) => {
  if (!results.length) return null;

  return (
    <div className="table-responsive">
      <table className="result-table" id="result-table" aria-label="Bảng kết quả">
        <thead>
          <tr>
            <th id="col-key">Khóa (k)</th>
            <th id="col-plaintext">Bản rõ ứng viên (Candidate Plaintext)</th>
            <th id="col-score">Điểm χ² (Chi-square Score)</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => {
            const isBest = index === 0;
            const rowClass = isBest ? 'result-best' : 'result-row';
            
            return (
              <tr 
                key={result.key} 
                className={rowClass}
                onClick={() => onSelect && onSelect(result.key)}
                style={{ cursor: onSelect ? 'pointer' : 'default' }}
                tabIndex={0}
                aria-label={`Khóa ${result.key}, điểm ${result.score.toFixed(2)}`}
              >
                <td>{result.key}</td>
                <td className="result-plaintext" style={{ fontFamily: 'monospace' }}>{result.plaintext}</td>
                <td>{result.score.toFixed(2)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

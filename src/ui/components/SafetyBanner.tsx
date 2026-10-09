import React from 'react';

export const SafetyBanner: React.FC = () => {
  return (
    <div className="safety-banner" id="safety-banner" aria-label="Cảnh báo an toàn">
      ⚠️ Chỉ dùng để học. Không dùng các mã này để bảo vệ dữ liệu thật.
    </div>
  );
};

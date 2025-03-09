"use client"

import { QRCodeSVG } from 'qrcode.react';

interface QRCodeGeneratorProps {
  value: string;
  size?: number;
  className?: string;
}

const QRCodeGenerator = ({ value, size = 128, className }: QRCodeGeneratorProps) => {
  return (
    <div className={className}>
      <QRCodeSVG
        value={value}
        size={size}
        bgColor={"#ffffff"}
        fgColor={"#000000"}
        level={"L"}
        includeMargin={false}
      />
    </div>
  );
};

export default QRCodeGenerator;

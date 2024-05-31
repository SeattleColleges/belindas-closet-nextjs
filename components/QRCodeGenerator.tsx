import React from 'react';
import { QRCodeSVG, QRCodeCanvas } from 'qrcode.react';

interface QRCodeGeneratorProps {
    value: string;
    size?: number;
    bgColor?: string;
    fgColor?: string;
    level?: 'L' | 'M' | 'Q' | 'H';
    renderAs?: 'svg' | 'canvas';
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({
    value,
    size = 128,
    bgColor = "#ffffff",
    fgColor = "#000000",
    level = "L",
    renderAs = 'svg',
}) => {
    const QRCodeComponent = renderAs === 'svg' ? QRCodeSVG : QRCodeCanvas;

    return (
        <div>
            <QRCodeComponent
            value={value}
            size={size}
            bgColor={bgColor}
            fgColor={fgColor}
            level={level}
            />
        </div>
    );
};

export default QRCodeGenerator;
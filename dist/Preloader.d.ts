import React, { CSSProperties } from 'react';
export interface LoaderProps {
    strokeWidth: number;
    strokeColor: string;
    duration: number;
}
interface Props {
    className?: string;
    style?: CSSProperties;
    use: React.FC<LoaderProps>;
    size?: number | string;
    strokeWidth?: number;
    strokeColor?: string;
    duration?: number;
}
declare const Preloader: React.FC<Props>;
export default Preloader;

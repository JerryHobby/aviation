import React from 'react';

interface FlexibleFrameProps {
    children: React.ReactNode;
    className?: string; // Optional prop for custom classes
}

const FlexibleFrame: React.FC<FlexibleFrameProps> = ({ children, className }) => {
    return (
        <div className={`rounded-box border-gray-300 p-4 mb-10 flex flex-col items-center justify-center ${className}`}>
            {children}
        </div>
    );
};

export default FlexibleFrame;

import React from 'react';

interface Props {
    children: React.ReactNode,
    className?: string
}

const ContentBox = ({children, className}: Props) => {
    return (
        <div className={className + " border rounded-md drop-shadow-xl p-3"}>
            {children}
        </div>
    );
};

export default ContentBox;
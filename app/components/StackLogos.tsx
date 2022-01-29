import React from 'react';

const StackLogos: React.FC<{ logos?: Record<string, string>, size: number }> = ({ logos, size }) => {
    if (!logos || Object.keys(logos).length < 1) return null;
    return (
        <>
            {Object.keys(logos).length > 0 && Object.keys(logos).map((key: string) => {
                return logos[key] && (
                    <div key={key} data-tooltip aria-description={key}>
                        <img
                            src={`data:image/png;base64, ${logos[key]}`}
                            alt={key}
                            height={`${size}px`}
                            width={`${size}px`}
                            style={{ padding: '4px' }}
                        />
                    </div>
                )
            })}
        </>
    )
}

export default StackLogos;

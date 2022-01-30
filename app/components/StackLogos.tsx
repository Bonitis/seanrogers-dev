import React from 'react';
import Image from './Image';

const StackLogos: React.FC<{ logos?: string[], size: number }> = ({ logos, size }) => {
    if (!logos || logos.length < 1) return null;
    return (
        <>
            {logos.map((key: string) => {
                return (
                    <div key={key} data-tooltip aria-description={key}>
                        <Image
                            src={`logos/${key}-logo.png`}
                            alt={key}
                            height={size}
                            width={size}
                            className="p-1"
                        />
                    </div>
                )
            })}
        </>
    )
}

export default StackLogos;

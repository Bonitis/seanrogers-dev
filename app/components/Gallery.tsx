import React from 'react';

const Gallery: React.FC<{ gallery?: Record<string, string> }> = ({ gallery }) => {
    if (!gallery) return null;

    return (
        <div className="flex flex-wrap justify-center">
            {Object.keys(gallery).map((key) => (
                <img
                    key={key}
                    src={`data:image/png;base64, ${gallery[key]}`}
                    alt={key}
                    className="w-full lg:w-72 h-fit m-4 rounded-md p-2 bg-slate-300 object-scale-down hover:shadow-md lg:hover:scale-150 transition-transform"
                />
            ))}
        </div>
    );
}

export default Gallery;

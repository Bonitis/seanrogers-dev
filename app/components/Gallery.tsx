import React from 'react';
import Image from './Image';

const Gallery: React.FC<{ gallery?: string[] }> = ({ gallery }) => {
    if (!gallery) return null;
    return (
        <div className="flex flex-wrap justify-center">
            {gallery.map((path) => (
                <Image
                    key={path}
                    src={path}
                    alt={path}
                    width={300}
                    height={300}
                    fit="contain"
                    className="w-full lg:w-72 h-fit m-4 rounded-md p-2 bg-slate-300 object-scale-down hover:shadow-md lg:hover:scale-150 transition-transform"
                />
            ))}
        </div>
    );
}

export default Gallery;

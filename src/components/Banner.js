import React from 'react';

export { Banner };

function Banner({ text }) {

    return (
        <div
            className='relative overflow-hidden flex items-center border border-default-200 dark:border-default-100 px-2 py-4 rounded-lg bg-gradient-to-r bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-center mb-5'
            shadow="sm">
            <h2 data-testid="lblBanner" className="font-semibold text-xl text-foreground/90 w-full text-center">{text}</h2>
        </div>
    );
}
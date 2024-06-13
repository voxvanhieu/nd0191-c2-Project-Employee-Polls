import React from 'react';


export { Container };

function Container({ children }) {
    return (
        <div className="container mx-auto min-h-svh mt-8">
            {children}
        </div>
    );
}

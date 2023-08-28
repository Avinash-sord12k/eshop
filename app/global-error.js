'use client';
import React from 'react';

const GlobalError = ({ error, reset }) => {
  return (
    <html>
      <body>
        Oops, something went wrong!
        {error.message}
        An error occurred while trying to load the content.
        <button onClick={() => reset()}>Try Again</button>
      </body>
    </html>
  )
}

export default GlobalError
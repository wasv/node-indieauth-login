import React from 'react';

export default (props) => (
    <html>
      <head>
        <title>{props.title}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="./stylesheets/style.css" />
      </head>
      <body>{props.children}</body>
    </html>
)

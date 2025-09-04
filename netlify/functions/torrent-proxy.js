// netlify/functions/torrent-proxy.js
const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const { query } = event.queryStringParameters;
  
  if (!query) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Query parameter is required' })
    };
  }

  try {
    // Apibay API (Pirate Bay mirror)
    const response = await fetch(`https://apibay.org/q.php`, {
      headers: {
        "x-requested-with": "XMLHttpRequest" // required header
      }
    });

    if (!response.ok) {
      throw new Error(`API responded with status ${response.status}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(data)
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};

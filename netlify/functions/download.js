const fetch = require('node-fetch');

exports.handler = async (event) => {
    // Enable CORS
    const headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS'
    };

    // Handle OPTIONS request
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers,
            body: ''
        };
    }

    // Only allow GET requests
    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method Not Allowed' })
        };
    }

    const { path, name } = event.queryStringParameters || {};

    if (!path || !name) {
        return {
            statusCode: 400,
            headers,
            body: JSON.stringify({ error: 'Missing path or name parameter' })
        };
    }

    try {
        console.log(`Downloading: ${name} from ${path}`);

        // Make POST request to cubeecraft.com
        const response = await fetch(`https://www.cubeecraft.com${path}`, {
            method: 'POST',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
            }
        });

        if (!response.ok) {
            throw new Error(`Download failed: ${response.status} ${response.statusText}`);
        }

        // Get the PDF data as buffer
        const buffer = await response.buffer();

        // Return PDF with proper headers
        const filename = `${name.replace(/[^a-z0-9]/gi, '_')}.pdf`;

        return {
            statusCode: 200,
            headers: {
                ...headers,
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${filename}"`
            },
            body: buffer.toString('base64'),
            isBase64Encoded: true
        };
    } catch (error) {
        console.error('Download error:', error.message);
        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: 'Download failed',
                message: error.message
            })
        };
    }
};

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
        console.log(`[Download] Starting: ${name} from path: ${path}`);

        // Make POST request to cubeecraft.com to trigger download
        const response = await fetch(`https://www.cubeecraft.com${path}`, {
            method: 'POST',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Accept': 'application/pdf,*/*',
                'Referer': 'https://www.cubeecraft.com/'
            },
            redirect: 'follow'
        });

        console.log(`[Download] Response status: ${response.status}`);

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }

        // Check content type
        const contentType = response.headers.get('content-type');
        console.log(`[Download] Content-Type: ${contentType}`);

        // Get PDF as ArrayBuffer then convert to Buffer
        const arrayBuffer = await response.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        console.log(`[Download] Buffer size: ${buffer.length} bytes`);

        if (buffer.length === 0) {
            throw new Error('Empty response received');
        }

        // Clean filename
        const filename = `${name.replace(/[^a-z0-9\s-]/gi, '_').replace(/\s+/g, '_')}.pdf`;

        console.log(`[Download] Success: ${filename} (${buffer.length} bytes)`);

        return {
            statusCode: 200,
            headers: {
                ...headers,
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${filename}"`,
                'Content-Length': buffer.length.toString()
            },
            body: buffer.toString('base64'),
            isBase64Encoded: true
        };
    } catch (error) {
        console.error('[Download] Error:', error.message);
        console.error('[Download] Stack:', error.stack);

        return {
            statusCode: 500,
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                error: 'Download failed',
                message: error.message,
                path: path,
                name: name
            })
        };
    }
};

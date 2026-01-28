const fetch = require('node-fetch');

exports.handler = async (event) => {
    // Only allow POST requests
    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            body: 'Method Not Allowed'
        };
    }

    const { path, name } = event.queryStringParameters;

    if (!path) {
        return {
            statusCode: 400,
            body: 'Missing download path'
        };
    }

    try {
        console.log(`Downloading: ${name}`);

        // Make POST request to cubeecraft.com
        const response = await fetch(`https://www.cubeecraft.com${path}`, {
            method: 'POST',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
        });

        if (!response.ok) {
            throw new Error(`Download failed: ${response.statusText}`);
        }

        // Get the PDF data
        const buffer = await response.buffer();

        // Return as downloadable file
        const filename = `${name.replace(/[^a-z0-9]/gi, '_')}.pdf`;

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': `attachment; filename="${filename}"`,
                'Access-Control-Allow-Origin': '*'
            },
            body: buffer.toString('base64'),
            isBase64Encoded: true
        };
    } catch (error) {
        console.error('Download error:', error.message);
        return {
            statusCode: 500,
            body: `Download failed: ${error.message}`
        };
    }
};

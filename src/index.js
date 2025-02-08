export default {
    async fetch(request) {
        const url = new URL(request.url);
        const backendUrl = `http://localhost:3000${url.pathname}`;

        const modifiedRequest = new Request(backendUrl, {
            method: request.method,
            headers: request.headers,
            body: request.method !== 'GET' ? await request.text() : null
        });

        return fetch(modifiedRequest);
    }
};

export default {
    async fetch(request) {
        const backendUrl = `https://9c33-2405-4803-b482-9040-6972-4a00-d81e-831d.ngrok-free.app`;

        const modifiedRequest = new Request(backendUrl, {
            method: request.method,
            headers: request.headers,
            body: request.method !== 'GET' ? await request.text() : null
        });

        return fetch(modifiedRequest);
    }
};

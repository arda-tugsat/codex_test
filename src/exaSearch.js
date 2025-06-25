/**
 * Small helper to query the Exa Search API.
 */
export async function exaSearch(query) {
    const apiKey = localStorage.getItem('exa_key');
    if (!apiKey) throw new Error('Missing Exa API key');

    const response = await fetch(`https://exa.ai/api/search?q=${encodeURIComponent(query)}`, {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
        }
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }

    return response.json();
}

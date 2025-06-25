/**
 * Wrapper for interacting with the OpenRouter API.
 * Configure your API key and model to customize responses.
 */
export async function fetchAIResponse(messages, model = 'openrouter/auto') {
    const apiKey = localStorage.getItem('openrouter_key');
    if (!apiKey) throw new Error('Missing OpenRouter API key');

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model,
            messages,
        }),
    });

    if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
    }

    const data = await response.json();
    return data.choices[0].message.content;
}

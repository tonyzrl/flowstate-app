// API Keys Configuration
// Copy this file to config/api-keys.js and add your actual API keys
// Make sure to add config/api-keys.js to your .gitignore file

export const API_KEYS = {
    // Anthropic API Key (for Claude)
    ANTHROPIC_API_KEY: process.env.ANTHROPIC_API_KEY || 'your_anthropic_api_key_here',
    
    // Hugging Face Access Token
    HF_ACCESS_TOKEN: process.env.HF_ACCESS_TOKEN || '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',
};

// Note: Never commit your actual API keys to version control
// Add config/api-keys.js to your .gitignore file if you store keys there 
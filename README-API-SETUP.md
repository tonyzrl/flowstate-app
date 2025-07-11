# API Integration Setup Guide

This guide will help you set up the Hugging Face and Anthropic API integrations for your FlowState app.

## Prerequisites

1. **Hugging Face Account**: Sign up at [huggingface.co](https://huggingface.co)
2. **Anthropic Account**: Sign up at [anthropic.com](https://anthropic.com)

## Getting API Keys

### Hugging Face Access Token
1. Go to [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
2. Click "New token"
3. Give it a name (e.g., "FlowState App")
4. Select "Read" role
5. Copy the generated token

### Anthropic API Key
1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Sign in to your account
3. Navigate to "API Keys"
4. Create a new API key
5. Copy the generated key

## Environment Setup

### Option 1: Environment Variables (Recommended)
Create a `.env` file in your project root:

```bash
# .env
ANTHROPIC_API_KEY=your_anthropic_api_key_here
HF_ACCESS_TOKEN=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
```

### Option 2: Direct Configuration
Update `config/api-keys.js` with your actual keys:

```javascript
export const API_KEYS = {
    ANTHROPIC_API_KEY: 'your_actual_anthropic_key',
    HF_ACCESS_TOKEN: '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',
};
```

⚠️ **Important**: Never commit your actual API keys to version control!

## Testing the Integration

1. **Add the test component** to any screen:
```javascript
import AITestComponent from '@/components/AITestComponent';

// In your screen component:
<AITestComponent />
```

2. **Test the APIs**:
   - Recipe Generator: Enter ingredients and generate recipes
   - Wellbeing Insights: Get AI-powered wellbeing advice
   - Study Tips: Get personalized study recommendations

## Available API Functions

### Recipe Generation
```javascript
import { getRecipeFromMistral } from '@/services/api';

const recipe = await getRecipeFromMistral(['chicken', 'rice', 'vegetables']);
```

### Wellbeing Insights
```javascript
import { getWellbeingInsights } from '@/services/api';

const insights = await getWellbeingInsights(moodData, studyData);
```

### Study Tips
```javascript
import { getStudyTips } from '@/services/api';

const tips = await getStudyTips('Mathematics', 'intermediate');
```

## Security Notes

1. **Never expose API keys** in client-side code for production
2. **Use environment variables** for local development
3. **Create a backend** for production deployments
4. **Add .env to .gitignore** to prevent accidental commits

## Troubleshooting

### Common Issues:
1. **"API key not found"**: Check your environment variables
2. **"Network error"**: Verify your internet connection
3. **"Rate limit exceeded"**: Wait and try again later

### Debug Steps:
1. Check console logs for error messages
2. Verify API keys are correctly set
3. Test with the AITestComponent
4. Check network requests in browser dev tools

## Next Steps

1. **Integrate into existing screens**:
   - Add recipe suggestions to a food/meal planning screen
   - Add wellbeing insights to the wellbeing screen
   - Add study tips to the study screen

2. **Enhance functionality**:
   - Add more AI models
   - Implement caching for responses
   - Add user preference learning

3. **Production considerations**:
   - Set up a backend API
   - Implement proper error handling
   - Add rate limiting
   - Set up monitoring 
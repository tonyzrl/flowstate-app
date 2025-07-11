import Anthropic from "@anthropic-ai/sdk";
import { HfInference } from '@huggingface/inference';

// Specific prompts for different functions
const STUDY_ASSISTANT_PROMPT = `
You are a focused study assistant. Provide quick, actionable advice in 2-3 sentences maximum. Be direct and practical. Focus on immediate, implementable tips. Keep responses under 100 words.

Use markdown formatting:
- Use **bold** for key points and important tips
- Use bullet points for lists
- Use *italic* for emphasis
- Structure your response clearly
`;

const RECIPE_ASSISTANT_PROMPT = `
You are a creative culinary assistant. Provide simple, delicious recipes using available ingredients. Include cooking time, difficulty level, and clear steps. Keep responses concise but complete.

Use markdown formatting:
- Use **bold** for recipe titles and key steps
- Use bullet points for ingredients and steps
- Use *italic* for cooking tips
- Structure your response clearly
`;

const WELLBEING_ASSISTANT_PROMPT = `
You are a compassionate mental health supporter. Provide gentle, supportive advice for stress, anxiety, and study-life balance. Focus on practical self-care techniques and when to seek professional help.

Use markdown formatting:
- Use **bold** for key coping strategies
- Use bullet points for actionable steps
- Use *italic* for gentle reminders
- Structure your response clearly
`;

const TIME_MANAGEMENT_PROMPT = `
You are a productivity expert specializing in study time management. Provide specific, actionable strategies for organizing study time, prioritizing tasks, and maintaining focus. Keep advice practical and implementable.

Use markdown formatting:
- Use **bold** for key time management techniques
- Use bullet points for actionable steps
- Use *italic* for important tips
- Structure your response clearly
`;

const FOCUS_ASSISTANT_PROMPT = `
You are a concentration specialist. Provide specific techniques to improve focus and attention during study sessions. Include environmental, mental, and physical strategies that work immediately.

Use markdown formatting:
- Use **bold** for key focus techniques
- Use bullet points for actionable steps
- Use *italic* for important tips
- Structure your response clearly
`;

// 🚨👉 ALERT: Read message below! You've been warned! 👈🚨
// If you're following along on your local machine instead of
// here on Scrimba, make sure you don't commit your API keys
// to any repositories and don't deploy your project anywhere
// live online. Otherwise, anyone could inspect your source
// and find your API keys/tokens. If you want to deploy
// this project, you'll need to create a backend of some kind,
// either your own or using some serverless architecture where
// your API calls can be made. Doing so will keep your
// API keys private.

const anthropic = new Anthropic({
    // Make sure you set an environment variable in Scrimba 
    // for ANTHROPIC_API_KEY
    apiKey: process.env.ANTHROPIC_API_KEY || 'demo-key',
    dangerouslyAllowBrowser: true,
});


// Make sure you set an environment variable in Scrimba 
// for HF_ACCESS_TOKEN
const hf = new HfInference('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');


// Additional function for wellbeing insights using Hugging Face
export async function getWellbeingInsights(moodData, studyData, userMessage = '') {
    const wellbeingPrompt = userMessage
        ? `${WELLBEING_ASSISTANT_PROMPT} User asked: "${userMessage}". User's recent mood: ${moodData}. Study patterns: ${studyData}. Please provide supportive insights and practical self-care advice that directly addresses their specific question.`
        : `${WELLBEING_ASSISTANT_PROMPT} User's recent mood: ${moodData}. Study patterns: ${studyData}. Please provide supportive insights and practical self-care advice.`;

    try {
        console.log('Calling Hugging Face API for wellbeing insights...');
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "user", content: wellbeingPrompt }
            ],
            parameters: {
                max_new_tokens: 200,
                temperature: 0.7,
                top_p: 0.9,
                do_sample: true,
            }
        });
        console.log('HF Wellbeing Response:', response);
        return response.choices[0].message.content;
    } catch (err) {
        console.error('Wellbeing API Error:', err.message);
        console.error('Full wellbeing error:', err);
        return 'I understand you\'re going through a challenging time. Here are some general wellbeing tips:\n\n🧘 Take deep breaths and practice mindfulness\n💧 Stay hydrated and get enough sleep\n🏃‍♂️ Take short breaks and move around\n📞 Talk to someone you trust\n\nRemember, it\'s okay to ask for help when you need it.';
    }
}

// Test function to verify API connection
export async function testHuggingFaceAPI(userMessage = '') {
    const testPrompt = userMessage
        ? `You are a study assistant. The user asked: "${userMessage}". Please provide a helpful response.`
        : "You are a study assistant. Give me one quick study tip.";

    try {
        console.log('Testing Hugging Face API connection...');
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "user", content: testPrompt }
            ],
            parameters: {
                max_new_tokens: 100,
                temperature: 0.7,
                do_sample: true,
            }
        });
        console.log('Test API Response:', response);
        
        if (response.choices && response.choices[0] && response.choices[0].message) {
            return response.choices[0].message.content;
        } else {
            console.log('Response structure:', JSON.stringify(response, null, 2));
            return 'API responded but with unexpected structure';
        }
    } catch (err) {
        console.error('Test API Error:', err.message);
        console.error('Full test error:', err);
        return 'API test failed';
    }
}

// Function for study tips using Hugging Face
export async function getStudyTips(subject, difficulty, userMessage = '') {
    const studyPrompt = userMessage 
        ? `${STUDY_ASSISTANT_PROMPT} User asked: "${userMessage}". Please provide 2-3 quick study tips for ${subject} at ${difficulty} level that directly address their specific question. Be specific and actionable.`
        : `${STUDY_ASSISTANT_PROMPT} Give me 2-3 quick study tips for ${subject} at ${difficulty} level. Be specific and actionable.`;

    try {
        console.log('Calling Hugging Face API for study tips...');
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "user", content: studyPrompt }
            ],
            parameters: {
                max_new_tokens: 150,
                temperature: 0.7,
                top_p: 0.9,
                do_sample: true,
            }
        });
        console.log('HF Response:', response);
        
        let content = null;
        if (response.choices && response.choices[0] && response.choices[0].message) {
            content = response.choices[0].message.content;
        } else {
            console.log('Full response structure:', JSON.stringify(response, null, 2));
            throw new Error('Unexpected response structure');
        }
        
        return content;
    } catch (err) {
        console.error('Study Tips API Error:', err.message);
        console.error('Full error:', err);
        return `Quick study tips for ${subject}:\n\n📚 Break topics into 20-minute chunks\n⏰ Use Pomodoro: 25min study, 5min break\n📝 Write key points in your own words`;
    }
} 

export async function getTimeManagementTips(userMessage = '') {
    const timePrompt = userMessage
        ? `${TIME_MANAGEMENT_PROMPT} User asked: "${userMessage}". Please provide 2-3 quick time management tips for studying that directly address their specific question. Be specific and actionable.`
        : `${TIME_MANAGEMENT_PROMPT} Give me 2-3 quick time management tips for studying. Be specific and actionable.`;

    try {
        console.log('Calling Hugging Face API for time management...');
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "user", content: timePrompt }
            ],
            parameters: {
                max_new_tokens: 150,
                temperature: 0.7,
                top_p: 0.9,
                do_sample: true,
            }
        });
        
        let content = null;
        if (response.choices && response.choices[0] && response.choices[0].message) {
            content = response.choices[0].message.content;
        } else {
            throw new Error('Unexpected response structure');
        }
        
        return content;
    } catch (err) {
        console.error('Time Management API Error:', err.message);
        return `Quick time management tips:\n\n⏰ Use Pomodoro Technique (25min/5min)\n📅 Block specific times for each subject\n📚 Prioritize hardest subjects first`;
    }
}

export async function getFocusTips(userMessage = '') {
    const focusPrompt = userMessage
        ? `${FOCUS_ASSISTANT_PROMPT} User asked: "${userMessage}". Please provide 2-3 quick tips to improve focus while studying that directly address their specific question. Be specific and actionable.`
        : `${FOCUS_ASSISTANT_PROMPT} Give me 2-3 quick tips to improve focus while studying. Be specific and actionable.`;

    try {
        console.log('Calling Hugging Face API for focus tips...');
        const response = await hf.chatCompletion({
            model: "mistralai/Mixtral-8x7B-Instruct-v0.1",
            messages: [
                { role: "user", content: focusPrompt }
            ],
            parameters: {
                max_new_tokens: 150,
                temperature: 0.7,
                top_p: 0.9,
                do_sample: true,
            }
        });
        
        let content = null;
        if (response.choices && response.choices[0] && response.choices[0].message) {
            content = response.choices[0].message.content;
        } else {
            throw new Error('Unexpected response structure');
        }
        
        return content;
    } catch (err) {
        console.error('Focus Tips API Error:', err.message);
        return `Quick focus tips:\n\n🔇 Turn off phone notifications\n🌿 Study in a quiet, well-lit space\n🧠 Take 2-minute breaks every 30 minutes`;
    }
} 
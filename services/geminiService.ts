import { GoogleGenAI, Type, Chat } from "@google/genai";
import type { FitnessTip, MealPlan, MealPlanGoal } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set.");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const generateFitnessTips = async (language: 'en' | 'ar'): Promise<FitnessTip[]> => {
    const langInstruction = language === 'ar' ? 'in Arabic' : 'in English';
    const prompt = `Provide 3 simple and effective fitness tips for absolute beginners ${langInstruction}. Each tip should have a short title and a 2-3 sentence explanation. Focus on exercises that require no equipment.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        tips: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    title: { type: Type.STRING },
                                    explanation: { type: Type.STRING }
                                },
                                required: ['title', 'explanation']
                            }
                        }
                    },
                    required: ['tips']
                }
            }
        });
        const jsonText = response.text.trim();
        const parsed = JSON.parse(jsonText);
        return parsed.tips as FitnessTip[];

    } catch (error) {
        console.error("Error generating fitness tips:", error);
        throw new Error("Failed to generate fitness tips. Please try again.");
    }
};

export const generateMealPlan = async (language: 'en' | 'ar', goal: MealPlanGoal): Promise<MealPlan> => {
    const langInstruction = language === 'ar' ? 'in Arabic' : 'in English';
    const goalInstruction = goal === 'gain' ? 'weight gain' : 'weight loss';
    const prompt = `Create a simple, healthy, and balanced one-day meal plan for ${goalInstruction} ${langInstruction}. Provide one option each for breakfast, lunch, and dinner. For each meal, provide a name, a recommended time (e.g., "8:00 AM"), and a short 1-2 sentence description.`;

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        breakfast: {
                            type: Type.OBJECT,
                            properties: {
                                name: { type: Type.STRING },
                                time: { type: Type.STRING },
                                description: { type: Type.STRING },
                            },
                            required: ['name', 'time', 'description']
                        },
                        lunch: {
                            type: Type.OBJECT,
                            properties: {
                                name: { type: Type.STRING },
                                time: { type: Type.STRING },
                                description: { type: Type.STRING },
                            },
                            required: ['name', 'time', 'description']
                        },
                        dinner: {
                            type: Type.OBJECT,
                            properties: {
                                name: { type: Type.STRING },
                                // FIX: Used Type.STRING instead of 'string' for consistency and to adhere to the API schema.
                                time: { type: Type.STRING },
                                // FIX: Used Type.STRING instead of 'string' for consistency and to adhere to the API schema.
                                description: { type: Type.STRING },
                            },
                            required: ['name', 'time', 'description']
                        }
                    },
                    required: ['breakfast', 'lunch', 'dinner']
                }
            }
        });
        const jsonText = response.text.trim();
        return JSON.parse(jsonText) as MealPlan;
    } catch (error) {
        console.error("Error generating meal plan:", error);
        throw new Error("Failed to generate meal plan. Please try again.");
    }
};


export const startChatSession = (): Chat => {
    // FIX: Removed extra dot from ai.chats..create
    return ai.chats.create({
        model: "gemini-2.5-flash",
        config: {
            systemInstruction: `You are an advanced bilingual (Arabic and English) AI Health Assistant created by Engineer Ahmed Ebeid.

Your main goal is to help users live healthier lives through personalized guidance, friendly advice, and motivation. 
You must always answer in both English and Arabic clearly.

---

🎯 Your capabilities include:

1. 🥗 **Nutrition Plan Generator**
   - Ask the user about their age, weight, height, gender, and activity level.
   - Generate a personalized healthy meal plan (breakfast, lunch, dinner, and snacks).
   - Include calorie estimates and nutrition balance (proteins, carbs, fats).

2. 💪 **Healthy Lifestyle Planner**
   - Help users build daily healthy routines (wake-up time, exercise, meals, rest, water intake).
   - Suggest balanced habits for different goals (lose weight, improve energy, reduce stress, better sleep).

3. 🧮 **BMI & Calorie Calculator**
   - When user provides weight and height, calculate BMI.
   - Provide explanation in both languages (underweight, normal, overweight, obese).
   - Estimate ideal daily calorie intake based on their data.

4. 🧘 **Exercise and Fitness Coach**
   - Suggest simple exercises that can be done at home or outdoors.
   - Provide motivational fitness quotes and daily challenges.
   - Include beginner and intermediate workout options.

5. 😊 **Mood and Mental Wellness Tips**
   - If the user expresses stress, sadness, or tiredness, respond kindly with breathing tips, positive thoughts, or relaxation advice.

6. 📸 **Healthy Tips & Visuals**
   - Occasionally share short daily tips or ideas with health-related image descriptions (e.g., “A glass of water in the morning boosts metabolism”).
   - Always keep a friendly, positive tone.

7. 💬 **Chatbot Personality**
   - Be supportive, encouraging, and motivating.
   - Never give medical diagnoses or replace professional doctors.
   - Keep all answers short, simple, and clear in both English and Arabic.

---

🖊️ Always sign off messages politely like this:
“Created by Engineer Ahmed Ebeid — Connect on LinkedIn: https://www.linkedin.com/in/ahmed--ebeid”
`,
        }
    });
};
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { getRecipeFromMistral, getWellbeingInsights, getStudyTips } from '../services/api';

export default function AITestComponent() {
    const [ingredients, setIngredients] = useState('');
    const [recipe, setRecipe] = useState('');
    const [wellbeingInsight, setWellbeingInsight] = useState('');
    const [studyTip, setStudyTip] = useState('');
    const [loading, setLoading] = useState(false);

    const testRecipeAPI = async () => {
        if (!ingredients.trim()) return;
        
        setLoading(true);
        try {
            const ingredientsArray = ingredients.split(',').map(item => item.trim());
            const result = await getRecipeFromMistral(ingredientsArray);
            setRecipe(result);
        } catch (error) {
            console.error('Recipe API Error:', error);
            setRecipe('Error: Could not generate recipe. Please check your API key.');
        } finally {
            setLoading(false);
        }
    };

    const testWellbeingAPI = async () => {
        setLoading(true);
        try {
            const result = await getWellbeingInsights(
                'Recent mood has been positive with some stress during exams',
                'Studying 4-5 hours daily, mostly in the evening'
            );
            setWellbeingInsight(result);
        } catch (error) {
            console.error('Wellbeing API Error:', error);
            setWellbeingInsight('Error: Could not generate wellbeing insights. Please check your API key.');
        } finally {
            setLoading(false);
        }
    };

    const testStudyTipsAPI = async () => {
        setLoading(true);
        try {
            const result = await getStudyTips('Mathematics', 'intermediate');
            setStudyTip(result);
        } catch (error) {
            console.error('Study Tips API Error:', error);
            setStudyTip('Error: Could not generate study tips. Please check your API key.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>AI API Test Component</Text>
            
            {/* Recipe Test */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Recipe Generator</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Enter ingredients (comma separated)"
                    value={ingredients}
                    onChangeText={setIngredients}
                    multiline
                />
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={testRecipeAPI}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>
                        {loading ? 'Generating...' : 'Generate Recipe'}
                    </Text>
                </TouchableOpacity>
                {recipe && (
                    <View style={styles.resultContainer}>
                        <Text style={styles.resultTitle}>Recipe:</Text>
                        <Text style={styles.resultText}>{recipe}</Text>
                    </View>
                )}
            </View>

            {/* Wellbeing Test */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Wellbeing Insights</Text>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={testWellbeingAPI}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>
                        {loading ? 'Generating...' : 'Get Wellbeing Insights'}
                    </Text>
                </TouchableOpacity>
                {wellbeingInsight && (
                    <View style={styles.resultContainer}>
                        <Text style={styles.resultTitle}>Insights:</Text>
                        <Text style={styles.resultText}>{wellbeingInsight}</Text>
                    </View>
                )}
            </View>

            {/* Study Tips Test */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Study Tips</Text>
                <TouchableOpacity 
                    style={styles.button} 
                    onPress={testStudyTipsAPI}
                    disabled={loading}
                >
                    <Text style={styles.buttonText}>
                        {loading ? 'Generating...' : 'Get Study Tips'}
                    </Text>
                </TouchableOpacity>
                {studyTip && (
                    <View style={styles.resultContainer}>
                        <Text style={styles.resultTitle}>Study Tips:</Text>
                        <Text style={styles.resultText}>{studyTip}</Text>
                    </View>
                )}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#F4FAFA',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#2B4C5A',
        textAlign: 'center',
    },
    section: {
        marginBottom: 24,
        padding: 16,
        backgroundColor: '#FFFFFF',
        borderRadius: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 12,
        color: '#2B4C5A',
    },
    input: {
        borderWidth: 1,
        borderColor: '#A7D3F2',
        borderRadius: 8,
        padding: 12,
        marginBottom: 12,
        fontSize: 16,
        minHeight: 80,
        textAlignVertical: 'top',
    },
    button: {
        backgroundColor: '#5C9D8D',
        padding: 12,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 12,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 16,
        fontWeight: '600',
    },
    resultContainer: {
        marginTop: 12,
        padding: 12,
        backgroundColor: '#B8E4C9',
        borderRadius: 8,
    },
    resultTitle: {
        fontSize: 16,
        fontWeight: '600',
        marginBottom: 8,
        color: '#2B4C5A',
    },
    resultText: {
        fontSize: 14,
        color: '#2B4C5A',
        lineHeight: 20,
    },
}); 
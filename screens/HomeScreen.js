import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator, StyleSheet, ImageBackground } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const FACEPP_API_KEY = '';
const FACEPP_API_SECRET = '';
const FACEPP_URL = 'https://api-us.faceplusplus.com/facepp/v3/detect';

const HomeScreen = () => {
    const [image, setImage] = useState(null);
    const [emotion, setEmotion] = useState(null);
    const [loading, setLoading] = useState(false);

    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            base64: true,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
            analyzeImage(result.assets[0].base64);
        }
    };

    const analyzeImage = async (base64Image) => {
        setLoading(true);
        setEmotion(null);

        const formData = new FormData();
        formData.append('api_key', FACEPP_API_KEY);
        formData.append('api_secret', FACEPP_API_SECRET);
        formData.append('image_base64', base64Image);
        formData.append('return_attributes', 'emotion');

        try {
            const response = await axios.post(FACEPP_URL, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });

            if (response.data.faces.length > 0) {
                setEmotion(response.data.faces[0].attributes.emotion);
            } else {
                setEmotion({ error: 'No face detected' });
            }
        } catch (error) {
            console.error('Error analyzing image:', error);
            setEmotion({ error: 'Analysis failed' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <ImageBackground  resizeMode='stretch '  source={require('../assets/face_emotion.png')} style={styles.background}>
            <View style={styles.container}>
               
              
                <TouchableOpacity style={styles.button} onPress={pickImage}>
                    <Text style={styles.buttonText}>Pick an Image</Text>
                </TouchableOpacity>

                {image && (
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: image }} style={styles.image} />
                    </View>
                )}

                {loading && <ActivityIndicator size="large" color="#0000ff" />}

                {emotion && (
                    <View style={styles.resultContainer}>
                        {emotion.error ? (
                            <Text style={styles.errorText}>{emotion.error}</Text>
                        ) : (
                            Object.entries(emotion).map(([key, value]) => (
                                <Text key={key} style={styles.emotionText}>
                                    {key.toUpperCase()}: {value.toFixed(2)}
                                </Text>
                            ))
                        )}
                    </View>
                )}
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        resizeMode: 'cover',
    },
    container: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        paddingTop: 40,
    },
    logo: { 
        width: 120, 
        height: 120, 
        resizeMode: 'contain', 
        marginBottom: 10 
    }, 
    title: { 
        fontSize: 24, 
        fontWeight: 'bold', 
        color: '#FFF', // White text for better contrast
        marginBottom: 20 
    },
    button: { 
        backgroundColor: '#6200EE', 
        padding: 12, 
        borderRadius: 8, 
        marginBottom: 10 
    },
    buttonText: { 
        color: '#FFF', 
        fontSize: 16, 
        fontWeight: 'bold' 
    },
    imageContainer: {
        backgroundColor: '#E0E0E0',
        padding: 10,
        borderRadius: 15,
        marginVertical: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
        
        
    },
   
    resultContainer: { 
        marginTop: 20, 
        alignItems: 'center' 
    },
    emotionText: { 
        fontSize: 18, 
        fontWeight: 'bold', 
        color: 'black', // White text for contrast
        marginTop: 5 
    },
    errorText: { 
        fontSize: 16, 
        color: 'red', 
        fontWeight: 'bold' 
    },
});

export default HomeScreen;

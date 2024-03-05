import * as Speech from 'expo-speech';

const speak = (text: string, language: string = 'ko-KR') => {
    Speech.speak(text, {
        language, 
    });
};

export default speak;

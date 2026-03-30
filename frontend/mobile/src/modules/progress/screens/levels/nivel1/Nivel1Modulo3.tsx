import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import SubLevelScreen, {
    MascotBubble, MultipleChoice, OpenQuestion, ReflectivePhrase,
} from '../SubLevelScreen';
import { colors, fontSizes, spacing, borderRadius } from '../../../../../constants/theme';

const MASCOT = require('../../../../../assets/images/mascotacorazon.png');

type Step = 'intro' | 'complete' | 'frase1' | 'dificultad' | 'frase2' | 'open' | 'frase3' | 'accion' | 'reflexion';
const STEPS: Step[] = ['intro', 'complete', 'frase1', 'dificultad', 'frase2', 'open', 'frase3', 'accion', 'reflexion'];

export default function Nivel1Modulo3({ navigation }: any) {
    const [stepIndex, setStepIndex] = useState(0);
    const [completion, setCompletion] = useState('');
    const [dificultad, setDificultad] = useState<string | null>(null);
    const [openAnswer, setOpenAnswer] = useState('');
    const [reflexion, setReflexion] = useState('');
    const step = STEPS[stepIndex];
    const isLast = stepIndex === STEPS.length - 1;

    const handleContinue = () => {
        if (isLast) navigation.navigate('LevelComplete', {
            levelNumber: 1,
            message: 'El cambio empieza al admitir que ya no tenía control.',
        });
        else setStepIndex(stepIndex + 1);
    };

    const handleBack = () => {
        if (stepIndex === 0) navigation.goBack();
        else setStepIndex(stepIndex - 1);
    };

    const { TextInput } = require('react-native');

    return (
        <SubLevelScreen
            currentStep={stepIndex}
            totalSteps={STEPS.length - 1}
            moduleNumber={3}
            mascot={MASCOT}
            onBack={handleBack}
            onContinue={handleContinue}
            continueLabel={isLast ? 'Finalizar nivel' : 'Continuar'}
            showIntro={step === 'intro'}
            introTitle="Rendirme a la verdad"
            introDescription="Hay un punto en el que dejar de resistirte se vuelve necesario. Rendirte no es perder, es aceptar que esto te supera tal como lo has estado manejando."
        >
            {step === 'complete' && (
                <>
                    <MascotBubble text="Completa esta frase:" />
                    <View style={styles.completionWrapper}>
                        <Text style={styles.completionPrefix}>"Hoy reconozco que..."</Text>
                        <TextInput
                            style={styles.completionInput}
                            placeholder="Escribe aquí..."
                            placeholderTextColor={colors.border}
                            value={completion}
                            onChangeText={setCompletion}
                            multiline
                            textAlignVertical="top"
                        />
                    </View>
                </>
            )}

            {step === 'frase1' && (
                <ReflectivePhrase text="El primer paso no es vencer, es rendirse a la verdad." />
            )}

            {step === 'dificultad' && (
                <>
                    <MascotBubble text="¿Qué tan difícil es aceptar esto?" />
                    <MultipleChoice
                        options={['Muy difícil', 'Difícil', 'Neutral', 'Aliviador']}
                        selected={dificultad}
                        onSelect={setDificultad}
                    />
                </>
            )}

            {step === 'frase2' && (
                <ReflectivePhrase text="Aceptar lo que pasa no te debilita, te posiciona para cambiar." />
            )}

            {step === 'open' && (
                <>
                    <MascotBubble text="¿Qué cambia en ti al admitirlo?" />
                    <OpenQuestion
                        placeholder="Escribe aquí..."
                        value={openAnswer}
                        onChange={setOpenAnswer}
                    />
                </>
            )}

            {step === 'frase3' && (
                <ReflectivePhrase text="Dejar de negarlo es empezar a avanzar." />
            )}

            {step === 'accion' && (
                <>
                    <MascotBubble text="¿Estás listo para dar este paso?" />
                    <TouchableOpacity style={styles.acceptButton} onPress={handleContinue}>
                        <Text style={styles.acceptButtonText}>Acepto la realidad</Text>
                    </TouchableOpacity>
                </>
            )}

            {step === 'reflexion' && (
                <>
                    <MascotBubble text="¿Qué significa para ti dar este primer paso?" />
                    <OpenQuestion
                        placeholder="Escribe aquí..."
                        value={reflexion}
                        onChange={setReflexion}
                    />
                </>
            )}
        </SubLevelScreen>
    );
}

const styles = StyleSheet.create({
    completionWrapper: {
        marginVertical: spacing.sm,
    },
    completionPrefix: {
        fontSize: fontSizes.md,
        fontWeight: '600',
        color: colors.text,
        marginBottom: spacing.sm,
    },
    completionInput: {
        backgroundColor: colors.white,
        borderRadius: borderRadius.md,
        padding: spacing.md,
        fontSize: fontSizes.md,
        color: colors.text,
        height: 100,
        borderWidth: 1,
        borderColor: colors.border,
        textAlignVertical: 'top',
    },
    acceptButton: {
        backgroundColor: colors.accent,
        borderRadius: borderRadius.full,
        paddingVertical: spacing.md,
        alignItems: 'center',
        marginTop: spacing.lg,
        elevation: 3,
        shadowColor: colors.accent,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.3,
        shadowRadius: 6,
    },
    acceptButtonText: {
        color: colors.white,
        fontSize: fontSizes.lg,
        fontWeight: '700',
    },
});
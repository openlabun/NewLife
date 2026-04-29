import React, { useState } from 'react';
import { Alert } from 'react-native';
import SubLevelScreen, {
    MascotBubble, MultipleChoice, OpenQuestion, ReflectivePhrase,
} from '../SubLevelScreen';
import { useLevelProgress } from '../../../../../hooks/useLevelProgress';

const MASCOT = require('../../../../../assets/images/mascotalibro.png');

const CURRENT_LEVEL = 12;
const CURRENT_SUBLEVEL = 2;

type Step = 'intro' | 'q1' | 'frase1' | 'q2' | 'frase2' | 'reflexion';
const STEPS: Step[] = ['intro', 'q1', 'frase1', 'q2', 'frase2', 'reflexion'];

export default function Nivel12Modulo2({ navigation }: any) {
    const [stepIndex, setStepIndex] = useState(0);
    const [q1, setQ1] = useState<string | null>(null);
    const [q2, setQ2] = useState('');
    const [advancing, setAdvancing] = useState(false);

    const { progress, advance } = useLevelProgress();

    const step = STEPS[stepIndex];
    const isLast = stepIndex === STEPS.length - 1;

    const handleContinue = async () => {
        if (isLast) {
            setAdvancing(true);
            try {
                const newProgress = await advance(CURRENT_LEVEL, CURRENT_SUBLEVEL);
                console.log('âœ… MÃ³dulo completado. Nuevo progreso:', newProgress);

                Alert.alert(
                    'Â¡Felicidades!',
                    `Has completado el MÃ³dulo ${CURRENT_SUBLEVEL}. ${
                        newProgress.subnivel > CURRENT_SUBLEVEL
                            ? 'Siguiente mÃ³dulo desbloqueado.'
                            : 'Completa los anteriores para continuar.'
                    }`,
                    [{ text: 'OK', onPress: () => navigation.navigate('Path') }]
                );
            } catch (error) {
                console.error('âŒ Error guardando progreso:', error);
                Alert.alert('Error', 'No se pudo guardar tu progreso. Intenta de nuevo.');
            } finally {
                setAdvancing(false);
            }
        } else {
            setStepIndex(stepIndex + 1);
        }
    };

    const handleBack = () => {
        if (stepIndex === 0) {
            navigation.navigate('Path');
        } else {
            setStepIndex(stepIndex - 1);
        }
    };

    return (
        <SubLevelScreen
            currentStep={stepIndex}
            totalSteps={STEPS.length - 1}
            moduleNumber={CURRENT_SUBLEVEL}
            mascot={MASCOT}
            onBack={handleBack}
            onContinue={handleContinue}
            continueLabel={isLast ? 'Completar mÃ³dulo' : 'Continuar'}
            showIntro={step === 'intro'}
            introTitle="Paso 12, MÃ³dulo 2"
            introDescription="ContinÃºa tu camino en los 12 pasos de recuperaciÃ³n."
        >
            {step === 'q1' && (
                <>
                    <MascotBubble text="Â¿CÃ³mo te sientes en este momento?" />
                    <MultipleChoice
                        options={['Bien', 'Neutral', 'DifÃ­cil', 'Reflexivo']}
                        selected={q1}
                        onSelect={setQ1}
                    />
                </>
            )}

            {step === 'frase1' && (
                <ReflectivePhrase text="Cada paso te acerca mÃ¡s a tu recuperaciÃ³n." />
            )}

            {step === 'q2' && (
                <>
                    <MascotBubble text="Â¿QuÃ© aprendiste en este mÃ³dulo?" />
                    <OpenQuestion
                        placeholder="Escribe aquÃ­..."
                        value={q2}
                        onChange={setQ2}
                    />
                </>
            )}

            {step === 'frase2' && (
                <ReflectivePhrase text="Tu compromiso con ti mismo es el mÃ¡s importante." />
            )}

            {step === 'reflexion' && (
                <ReflectivePhrase text="Sigue adelante, cada paso cuenta." />
            )}
        </SubLevelScreen>
    );
}

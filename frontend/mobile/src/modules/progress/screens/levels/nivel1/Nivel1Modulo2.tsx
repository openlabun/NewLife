import React, { useState } from 'react';
import SubLevelScreen, {
    MascotBubble, MultipleChoice, OpenQuestion, ReflectivePhrase,
} from '../SubLevelScreen';

const MASCOT = require('../../../../../assets/images/mascotaestrella.png');

type Step = 'intro' | 'areas' | 'frase1' | 'open1' | 'frase2' | 'reaccion' | 'frase3';
const STEPS: Step[] = ['intro', 'areas', 'frase1', 'open1', 'frase2', 'reaccion', 'frase3'];

export default function Nivel1Modulo2({ navigation }: any) {
    const [stepIndex, setStepIndex] = useState(0);
    const [areas, setAreas] = useState<string[]>([]);
    const [openAnswer, setOpenAnswer] = useState('');
    const [reaccion, setReaccion] = useState<string | null>(null);

    const step = STEPS[stepIndex];
    const isLast = stepIndex === STEPS.length - 1;

    const handleContinue = () => {
        if (isLast) navigation.navigate('Path');
        else setStepIndex(stepIndex + 1);
    };

    const handleBack = () => {
        if (stepIndex === 0) navigation.goBack();
        else setStepIndex(stepIndex - 1);
    };

    const toggleArea = (val: string) => {
        setAreas((prev) =>
            prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
        );
    };

    return (
        <SubLevelScreen
            currentStep={stepIndex}
            totalSteps={STEPS.length - 1}
            moduleNumber={2}
            mascot={MASCOT}
            onBack={handleBack}
            onContinue={handleContinue}
            continueLabel={isLast ? 'Siguiente módulo' : 'Continuar'}
            showIntro={step === 'intro'}
            introTitle="Las consecuencias"
            introDescription="Nada de esto ocurre sin impacto. Poco a poco, las decisiones y hábitos dejan huellas en distintas áreas de tu vida. Reconocerlas no es para culparte, es para entender el alcance real."
        >
            {step === 'areas' && (
                <>
                    <MascotBubble text="¿Dónde has notado consecuencias?" />
                    <MultipleChoice
                        options={[
                            'Personal (emociones, salud)',
                            'Relaciones',
                            'Estudios / trabajo',
                            'Rutina diaria',
                        ]}
                        selected={areas}
                        onSelect={toggleArea}
                        multiple
                    />
                </>
            )}

            {step === 'frase1' && (
                <ReflectivePhrase text="Lo que haces tiene efectos, incluso cuando no quieres verlos." />
            )}

            {step === 'open1' && (
                <>
                    <MascotBubble text="Describe una consecuencia que te haya marcado." />
                    <OpenQuestion
                        placeholder="Escribe aquí..."
                        value={openAnswer}
                        onChange={setOpenAnswer}
                    />
                </>
            )}

            {step === 'frase2' && (
                <ReflectivePhrase text="Reconocer lo que perdiste es el inicio de tu recuperación." />
            )}

            {step === 'reaccion' && (
                <>
                    <MascotBubble text="¿Cómo sueles reaccionar ante estas consecuencias?" />
                    <MultipleChoice
                        options={['Las ignoro', 'Las justifico', 'Me siento culpable', 'Intento cambiarlas']}
                        selected={reaccion}
                        onSelect={setReaccion}
                    />
                </>
            )}

            {step === 'frase3' && (
                <ReflectivePhrase text="Las consecuencias no son castigos, son señales." />
            )}
        </SubLevelScreen>
    );
}
import React, { useState } from 'react';
import SubLevelScreen, {
    MascotBubble, MultipleChoice, OpenQuestion, ReflectivePhrase,
} from '../SubLevelScreen';
import { colors } from '../../../../../constants/theme';

const MASCOT = require('../../../../../assets/images/mascotalibro.png');

type Step = 'intro' | 'q1' | 'frase1' | 'checklist' | 'frase2' | 'open' | 'frase3';

const STEPS: Step[] = ['intro', 'q1', 'frase1', 'checklist', 'frase2', 'open', 'frase3'];

export default function Nivel1Modulo1({ navigation }: any) {
    const [stepIndex, setStepIndex] = useState(0);
    const [q1, setQ1] = useState<string | null>(null);
    const [checklist, setChecklist] = useState<string[]>([]);
    const [openAnswer, setOpenAnswer] = useState('');

    const step = STEPS[stepIndex];
    const isLast = stepIndex === STEPS.length - 1;

    const handleContinue = () => {
        if (isLast) {
            navigation.navigate('Path');
        } else {
            setStepIndex(stepIndex + 1);
        }
    };

    const handleBack = () => {
        if (stepIndex === 0) {
            navigation.goBack();
        } else {
            setStepIndex(stepIndex - 1);
        }
    };

    const toggleChecklist = (val: string) => {
        setChecklist((prev) =>
            prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
        );
    };

    return (
        <SubLevelScreen
            currentStep={stepIndex}
            totalSteps={STEPS.length - 1}
            moduleNumber={1}
            mascot={MASCOT}
            onBack={handleBack}
            onContinue={handleContinue}
            continueLabel={isLast ? 'Siguiente módulo' : 'Continuar'}
            showIntro={step === 'intro'}
            introTitle="Negación y realidad"
            introDescription="Es fácil convencerse de que todo está bajo control o que 'no es tan grave'. La negación no siempre es obvia; a veces se disfraza de excusas, comparaciones o silencios."
        >
            {step === 'q1' && (
                <>
                    <MascotBubble text="¿Cómo has visto tu situación hasta ahora?" />
                    <MultipleChoice
                        options={[
                            '"No es tan grave"',
                            '"Puedo controlarlo"',
                            '"Otros están peor"',
                            '"Prefiero no pensar en eso"',
                        ]}
                        selected={q1}
                        onSelect={setQ1}
                    />
                </>
            )}

            {step === 'frase1' && (
                <ReflectivePhrase text="La negación no elimina el problema, solo lo aplaza." />
            )}

            {step === 'checklist' && (
                <>
                    <MascotBubble text="Selecciona los pensamientos que has tenido:" />
                    <MultipleChoice
                        options={[
                            '"Puedo dejarlo cuando quiera"',
                            '"Esto no me está afectando tanto"',
                            '"No es el momento de cambiar"',
                            '"No es para tanto"',
                        ]}
                        selected={checklist}
                        onSelect={toggleChecklist}
                        multiple
                    />
                </>
            )}

            {step === 'frase2' && (
                <ReflectivePhrase text="Minimizar te calma por un momento, pero te aleja de la realidad." />
            )}

            {step === 'open' && (
                <>
                    <MascotBubble text="¿En qué momentos has evitado aceptar lo que realmente pasa?" />
                    <OpenQuestion
                        placeholder="Escribe aquí..."
                        value={openAnswer}
                        onChange={setOpenAnswer}
                    />
                </>
            )}

            {step === 'frase3' && (
                <ReflectivePhrase text="Ver lo que pasa puede doler, pero no verlo cuesta más con el tiempo." />
            )}
        </SubLevelScreen>
    );
}
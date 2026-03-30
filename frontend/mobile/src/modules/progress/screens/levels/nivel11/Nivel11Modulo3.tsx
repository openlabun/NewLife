import React, { useState } from 'react';
import SubLevelScreen, {
  MascotBubble, MultipleChoice, OpenQuestion, ReflectivePhrase, CompleteSentence,
} from '../SubLevelScreen';

const MASCOT = require('../../../../../assets/images/mascotacorazon.png');

type Step = 'intro' | 'complete' | 'frase1' | 'open1' | 'frase2' | 'q1' | 'frase3' | 'reflexion';
const STEPS: Step[] = ['intro', 'complete', 'frase1', 'open1', 'frase2', 'q1', 'frase3', 'reflexion'];

export default function Nivel11Modulo3({ navigation }: any) {
  const [stepIndex, setStepIndex] = useState(0);
  const [complete, setComplete] = useState('');
  const [open1, setOpen1] = useState('');
  const [q1, setQ1] = useState<string | null>(null);
  const [reflexion, setReflexion] = useState('');

  const step = STEPS[stepIndex];
  const isLast = stepIndex === STEPS.length - 1;

  const handleContinue = () => {
    if (isLast) navigation.navigate('LevelComplete', {
      levelNumber: 11,
      message: 'Conectar contigo le da dirección a todo lo demás.',
    });
    else setStepIndex(stepIndex + 1);
  };

  const handleBack = () => {
    if (stepIndex === 0) navigation.goBack();
    else setStepIndex(stepIndex - 1);
  };

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
      introTitle="Dar sentido"
      introDescription="Después de todo lo vivido, empieza a aparecer una pregunta más profunda: ¿para qué? Conectar también es empezar a construir un sentido propio."
    >
      {step === 'complete' && (
        <>
          <MascotBubble text="Completa esta frase:" />
          <CompleteSentence
            prefix='"Quiero seguir cambiando porque..."'
            value={complete}
            onChange={setComplete}
          />
        </>
      )}

      {step === 'frase1' && (
        <ReflectivePhrase text="El cambio se sostiene mejor cuando tiene sentido para ti." />
      )}

      {step === 'open1' && (
        <>
          <MascotBubble text="¿Qué le está dando sentido a este proceso para ti?" />
          <OpenQuestion
            placeholder="Escribe aquí..."
            value={open1}
            onChange={setOpen1}
          />
        </>
      )}

      {step === 'frase2' && (
        <ReflectivePhrase text="No se trata solo de dejar atrás lo que eras, sino de construir lo que quieres ser." />
      )}

      {step === 'q1' && (
        <>
          <MascotBubble text="¿Qué te motiva a seguir?" />
          <MultipleChoice
            options={['Mi bienestar', 'Mis relaciones', 'Mi crecimiento', 'Mi futuro']}
            selected={q1}
            onSelect={setQ1}
          />
        </>
      )}

      {step === 'frase3' && (
        <ReflectivePhrase text="Conectar contigo le da dirección a todo lo demás." />
      )}

      {step === 'reflexion' && (
        <>
          <MascotBubble text="¿Quién estás empezando a ser?" />
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
import React, { useState } from 'react';
import SubLevelScreen, {
  MascotBubble, MultipleChoice, OpenQuestion, ReflectivePhrase, CompleteSentence,
} from '../SubLevelScreen';

const MASCOT = require('../../../../../assets/images/mascotacorazon.png');

type Step = 'intro' | 'complete1' | 'frase1' | 'complete2' | 'frase2' | 'q1' | 'frase3' | 'reflexion';
const STEPS: Step[] = ['intro', 'complete1', 'frase1', 'complete2', 'frase2', 'q1', 'frase3', 'reflexion'];

export default function Nivel10Modulo3({ navigation }: any) {
  const [stepIndex, setStepIndex] = useState(0);
  const [complete1, setComplete1] = useState('');
  const [complete2, setComplete2] = useState('');
  const [q1, setQ1] = useState<string | null>(null);
  const [reflexion, setReflexion] = useState('');

  const step = STEPS[stepIndex];
  const isLast = stepIndex === STEPS.length - 1;

  const handleContinue = () => {
    if (isLast) navigation.navigate('LevelComplete', {
      levelNumber: 10,
      message: 'Seguir es más importante que hacerlo impecable.',
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
      introTitle="Ajustar y continuar"
      introDescription="Reflexionar no sirve de mucho si no haces algo con eso. Este módulo es sobre ajustar tu camino sin perder el impulso."
    >
      {step === 'complete1' && (
        <>
          <MascotBubble text="Completa esta frase:" />
          <CompleteSentence
            prefix='"Hoy puedo mejorar en..."'
            value={complete1}
            onChange={setComplete1}
          />
        </>
      )}

      {step === 'frase1' && (
        <ReflectivePhrase text="No necesitas empezar de nuevo, solo ajustar." />
      )}

      {step === 'complete2' && (
        <>
          <MascotBubble text="¿Qué vas a hacer mañana?" />
          <CompleteSentence
            prefix='"Mañana voy a..."'
            value={complete2}
            onChange={setComplete2}
          />
        </>
      )}

      {step === 'frase2' && (
        <ReflectivePhrase text="El cambio se construye corrigiendo, no siendo perfecto." />
      )}

      {step === 'q1' && (
        <>
          <MascotBubble text="¿Qué necesitas para continuar?" />
          <MultipleChoice
            options={['Paciencia', 'Constancia', 'Apoyo', 'Claridad']}
            selected={q1}
            onSelect={setQ1}
          />
        </>
      )}

      {step === 'frase3' && (
        <ReflectivePhrase text="Seguir es más importante que hacerlo impecable." />
      )}

      {step === 'reflexion' && (
        <>
          <MascotBubble text="¿Qué has aprendido de ti en este proceso?" />
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
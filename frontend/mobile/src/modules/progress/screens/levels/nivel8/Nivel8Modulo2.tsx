import React, { useState } from 'react';
import SubLevelScreen, {
  MascotBubble, MultipleChoice, OpenQuestion, ReflectivePhrase, CompleteSentence,
} from '../SubLevelScreen';

const MASCOT = require('../../../../../assets/images/mascotaestrella.png');

type Step = 'intro' | 'complete' | 'frase1' | 'q1' | 'frase2' | 'open1' | 'frase3';
const STEPS: Step[] = ['intro', 'complete', 'frase1', 'q1', 'frase2', 'open1', 'frase3'];

export default function Nivel8Modulo2({ navigation }: any) {
  const [stepIndex, setStepIndex] = useState(0);
  const [complete, setComplete] = useState('');
  const [q1, setQ1] = useState<string | null>(null);
  const [open1, setOpen1] = useState('');

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

  return (
    <SubLevelScreen
      currentStep={stepIndex}
      totalSteps={STEPS.length - 1}
      moduleNumber={2}
      mascot={MASCOT}
      onBack={handleBack}
      onContinue={handleContinue}
      continueLabel={isLast ? 'Finalizar módulo' : 'Continuar'}
      showIntro={step === 'intro'}
      introTitle="Asumir responsabilidad"
      introDescription="Es fácil justificar, minimizar o culpar a otros. Asumir responsabilidad es dejar esas defensas y reconocer lo que sí estuvo en tus manos."
    >
      {step === 'complete' && (
        <>
          <MascotBubble text="Completa esta frase:" />
          <CompleteSentence
            prefix='"En esta situación, mi responsabilidad fue..."'
            value={complete}
            onChange={setComplete}
          />
        </>
      )}

      {step === 'frase1' && (
        <ReflectivePhrase text="Asumir responsabilidad no te define como persona, pero sí define tu crecimiento." />
      )}

      {step === 'q1' && (
        <>
          <MascotBubble text="Cuando piensas en lo ocurrido, tiendes a:" />
          <MultipleChoice
            options={['Justificarte', 'Culpar a otros', 'Minimizarlo', 'Aceptarlo']}
            selected={q1}
            onSelect={setQ1}
          />
        </>
      )}

      {step === 'frase2' && (
        <ReflectivePhrase text="Aceptar tu parte no borra lo ocurrido, pero cambia lo que haces después." />
      )}

      {step === 'open1' && (
        <>
          <MascotBubble text="¿Qué te cuesta aceptar de lo que pasó?" />
          <OpenQuestion
            placeholder="Escribe aquí..."
            value={open1}
            onChange={setOpen1}
          />
        </>
      )}

      {step === 'frase3' && (
        <ReflectivePhrase text="Dejar de justificarte es empezar a transformarte." />
      )}
    </SubLevelScreen>
  );
}
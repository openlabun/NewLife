import React, { useState } from 'react';
import SubLevelScreen, {
  MascotBubble, MultipleChoice, OpenQuestion, ReflectivePhrase, CompleteSentence,
} from '../SubLevelScreen';

const MASCOT = require('../../../../../assets/images/mascotaestrella.png');

type Step = 'intro' | 'complete' | 'frase1' | 'q1' | 'frase2' | 'open1' | 'frase3';
const STEPS: Step[] = ['intro', 'complete', 'frase1', 'q1', 'frase2', 'open1', 'frase3'];

export default function Nivel7Modulo2({ navigation }: any) {
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
      introTitle="Abrirme a recibir"
      introDescription="No solo se trata de pedir, sino de permitirte recibir. A veces incluso cuando la ayuda está disponible, cuesta aceptarla."
    >
      {step === 'complete' && (
        <>
          <MascotBubble text="Completa esta frase:" />
          <CompleteSentence
            prefix='"Me cuesta recibir ayuda porque..."'
            value={complete}
            onChange={setComplete}
          />
        </>
      )}

      {step === 'frase1' && (
        <ReflectivePhrase text="Aceptar ayuda también es un acto de cambio." />
      )}

      {step === 'q1' && (
        <>
          <MascotBubble text="Cuando alguien intenta ayudarte, tú:" />
          <MultipleChoice
            options={[
              'Lo rechazas',
              'Lo dudas',
              'Lo aceptas con incomodidad',
              'Lo aceptas con tranquilidad',
            ]}
            selected={q1}
            onSelect={setQ1}
          />
        </>
      )}

      {step === 'frase2' && (
        <ReflectivePhrase text="No todo lo tienes que resolver tú para que sea válido." />
      )}

      {step === 'open1' && (
        <>
          <MascotBubble text="¿Qué cambiaría si te permitieras recibir apoyo?" />
          <OpenQuestion
            placeholder="Escribe aquí..."
            value={open1}
            onChange={setOpen1}
          />
        </>
      )}

      {step === 'frase3' && (
        <ReflectivePhrase text="Recibir no te hace dependiente, te hace humano." />
      )}
    </SubLevelScreen>
  );
}
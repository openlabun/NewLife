import React, { useState } from 'react';
import SubLevelScreen, {
  MascotBubble, MultipleChoice, OpenQuestion, ReflectivePhrase, CompleteSentence,
} from '../SubLevelScreen';

const MASCOT = require('../../../../../assets/images/mascotaestrella.png');

type Step = 'intro' | 'escenario' | 'frase1' | 'complete' | 'frase2' | 'q1' | 'frase3' | 'open1';
const STEPS: Step[] = ['intro', 'escenario', 'frase1', 'complete', 'frase2', 'q1', 'frase3', 'open1'];

export default function Nivel9Modulo2({ navigation }: any) {
  const [stepIndex, setStepIndex] = useState(0);
  const [escenario, setEscenario] = useState<string | null>(null);
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
      introTitle="Elegir hacer algo distinto"
      introDescription="Actuar no significa hacer algo perfecto, significa hacer algo diferente a lo de siempre. Aquí empiezas a romper el patrón con acciones concretas."
    >
      {step === 'escenario' && (
        <>
          <MascotBubble text="Antes reaccionabas de cierta forma... ¿qué harías ahora?" />
          <MultipleChoice
            options={[
              'Reaccionar sin pensar',
              'Ignorarlo',
              'Hablar con calma',
              'Pedir tiempo para pensar',
            ]}
            selected={escenario}
            onSelect={setEscenario}
          />
        </>
      )}

      {step === 'frase1' && (
        <ReflectivePhrase text="No necesitas hacerlo perfecto, solo hacerlo distinto." />
      )}

      {step === 'complete' && (
        <>
          <MascotBubble text="Completa esta frase:" />
          <CompleteSentence
            prefix='"Hoy puedo actuar diferente haciendo..."'
            value={complete}
            onChange={setComplete}
          />
        </>
      )}

      {step === 'frase2' && (
        <ReflectivePhrase text="Cada acción nueva rompe un patrón antiguo." />
      )}

      {step === 'q1' && (
        <>
          <MascotBubble text="¿Qué tipo de acción estás dispuesto/a a tomar?" />
          <MultipleChoice
            options={[
              'Hablar honestamente',
              'Pedir perdón',
              'Poner un límite',
              'Cambiar un hábito',
            ]}
            selected={q1}
            onSelect={setQ1}
          />
        </>
      )}

      {step === 'frase3' && (
        <ReflectivePhrase text="Cambiar se ve en lo que haces, no en lo que piensas." />
      )}

      {step === 'open1' && (
        <>
          <MascotBubble text="¿Qué acción pequeña puedes hacer hoy?" />
          <OpenQuestion
            placeholder="Escribe aquí..."
            value={open1}
            onChange={setOpen1}
          />
        </>
      )}
    </SubLevelScreen>
  );
}
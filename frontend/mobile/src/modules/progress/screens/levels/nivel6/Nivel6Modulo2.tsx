import React, { useState } from 'react';
import SubLevelScreen, {
  MascotBubble, MultipleChoice, OpenQuestion, ReflectivePhrase, CompleteSentence,
} from '../SubLevelScreen';

const MASCOT = require('../../../../../assets/images/mascotaestrella.png');

type Step = 'intro' | 'complete' | 'frase1' | 'q1' | 'frase2' | 'open1' | 'frase3';
const STEPS: Step[] = ['intro', 'complete', 'frase1', 'q1', 'frase2', 'open1', 'frase3'];

export default function Nivel6Modulo2({ navigation }: any) {
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
      introTitle="Querer cambiar de verdad"
      introDescription="Decir 'quiero cambiar' no siempre significa lo mismo. A veces lo dices por presión, por culpa o por cansancio. Este momento es para preguntarte si realmente quieres hacerlo por ti."
    >
      {step === 'complete' && (
        <>
          <MascotBubble text="Completa esta frase:" />
          <CompleteSentence
            prefix='"Quiero cambiar porque..."'
            value={complete}
            onChange={setComplete}
          />
        </>
      )}

      {step === 'frase1' && (
        <ReflectivePhrase text="El cambio que nace desde afuera dura poco, el que nace desde adentro transforma." />
      )}

      {step === 'q1' && (
        <>
          <MascotBubble text="¿De dónde viene tu deseo de cambiar?" />
          <MultipleChoice
            options={[
              'De mí',
              'De lo que otros esperan',
              'De una situación límite',
              'No estoy seguro/a',
            ]}
            selected={q1}
            onSelect={setQ1}
          />
        </>
      )}

      {step === 'frase2' && (
        <ReflectivePhrase text="No tienes que estar completamente listo/a, pero sí tienes que ser honesto/a." />
      )}

      {step === 'open1' && (
        <>
          <MascotBubble text="¿Qué cambiaría en tu vida si realmente hicieras ese cambio?" />
          <OpenQuestion
            placeholder="Escribe aquí..."
            value={open1}
            onChange={setOpen1}
          />
        </>
      )}

      {step === 'frase3' && (
        <ReflectivePhrase text="Querer cambiar es distinto a estar dispuesto a hacerlo." />
      )}
    </SubLevelScreen>
  );
}
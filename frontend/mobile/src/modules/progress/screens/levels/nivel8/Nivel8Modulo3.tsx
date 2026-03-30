import React, { useState } from 'react';
import SubLevelScreen, {
  MascotBubble, MultipleChoice, OpenQuestion, ReflectivePhrase, CompleteSentence,
} from '../SubLevelScreen';

const MASCOT = require('../../../../../assets/images/mascotacorazon.png');

type Step = 'intro' | 'complete' | 'frase1' | 'q1' | 'frase2' | 'open1' | 'frase3' | 'decision';
const STEPS: Step[] = ['intro', 'complete', 'frase1', 'q1', 'frase2', 'open1', 'frase3', 'decision'];

export default function Nivel8Modulo3({ navigation }: any) {
  const [stepIndex, setStepIndex] = useState(0);
  const [complete, setComplete] = useState('');
  const [q1, setQ1] = useState<string | null>(null);
  const [open1, setOpen1] = useState('');
  const [decision, setDecision] = useState<string | null>(null);

  const step = STEPS[stepIndex];
  const isLast = stepIndex === STEPS.length - 1;

  const handleContinue = () => {
    if (isLast) navigation.navigate('LevelComplete', {
      levelNumber: 8,
      message: 'La intención sincera de reparar ya es un paso hacia el cambio.',
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
      introTitle="Intención de reparar"
      introDescription="Reparar no siempre significa arreglar todo o recibir perdón. A veces empieza solo con la intención sincera de hacer las cosas de otra manera."
    >
      {step === 'complete' && (
        <>
          <MascotBubble text="Completa esta frase:" />
          <CompleteSentence
            prefix='"Me gustaría reparar esto haciendo..."'
            value={complete}
            onChange={setComplete}
          />
        </>
      )}

      {step === 'frase1' && (
        <ReflectivePhrase text="Reparar no garantiza una respuesta, pero sí cambia tu dirección." />
      )}

      {step === 'q1' && (
        <>
          <MascotBubble text="¿Qué forma de reparación sientes más posible?" />
          <MultipleChoice
            options={[
              'Pedir perdón',
              'Cambiar mi comportamiento',
              'Hablar honestamente',
              'Respetar distancia',
            ]}
            selected={q1}
            onSelect={setQ1}
          />
        </>
      )}

      {step === 'frase2' && (
        <ReflectivePhrase text="No todo se puede arreglar, pero todo se puede afrontar de una forma distinta." />
      )}

      {step === 'open1' && (
        <>
          <MascotBubble text="¿Qué te da miedo al intentar reparar?" />
          <OpenQuestion
            placeholder="Escribe aquí..."
            value={open1}
            onChange={setOpen1}
          />
        </>
      )}

      {step === 'frase3' && (
        <ReflectivePhrase text="La intención sincera de reparar ya es un paso hacia el cambio." />
      )}

      {step === 'decision' && (
        <>
          <MascotBubble text="¿Estás dispuesto/a a intentarlo?" />
          <MultipleChoice
            options={['Sí', 'Tal vez más adelante', 'Aún no']}
            selected={decision}
            onSelect={setDecision}
          />
        </>
      )}
    </SubLevelScreen>
  );
}
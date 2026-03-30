import React, { useState } from 'react';
import SubLevelScreen, {
  MascotBubble, MultipleChoice, OpenQuestion, ReflectivePhrase, CompleteSentence,
} from '../SubLevelScreen';

const MASCOT = require('../../../../../assets/images/mascotaestrella.png');

type Step = 'intro' | 'complete' | 'frase1' | 'q1' | 'frase2' | 'areas' | 'frase3' | 'open1';
const STEPS: Step[] = ['intro', 'complete', 'frase1', 'q1', 'frase2', 'areas', 'frase3', 'open1'];

export default function Nivel11Modulo2({ navigation }: any) {
  const [stepIndex, setStepIndex] = useState(0);
  const [complete, setComplete] = useState('');
  const [q1, setQ1] = useState<string | null>(null);
  const [areas, setAreas] = useState<string[]>([]);
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

  const toggle = (val: string) => {
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
      continueLabel={isLast ? 'Finalizar módulo' : 'Continuar'}
      showIntro={step === 'intro'}
      introTitle="Escucharme"
      introDescription="Conectar no es solo pausar, es empezar a escucharte de verdad. No desde la crítica, sino desde la curiosidad."
    >
      {step === 'complete' && (
        <>
          <MascotBubble text="Completa esta frase:" />
          <CompleteSentence
            prefix='"Hoy necesito..."'
            value={complete}
            onChange={setComplete}
          />
        </>
      )}

      {step === 'frase1' && (
        <ReflectivePhrase text="Escucharte es una forma de cuidarte." />
      )}

      {step === 'q1' && (
        <>
          <MascotBubble text="¿Qué sientes que necesitas más en este momento?" />
          <MultipleChoice
            options={['Descanso', 'Claridad', 'Apoyo', 'Espacio']}
            selected={q1}
            onSelect={setQ1}
          />
        </>
      )}

      {step === 'frase2' && (
        <ReflectivePhrase text="Lo que necesitas no siempre es lo que sueles darte." />
      )}

      {step === 'areas' && (
        <>
          <MascotBubble text="¿Qué áreas has descuidado?" />
          <MultipleChoice
            options={['Emocional', 'Física', 'Mental', 'Relaciones']}
            selected={areas}
            onSelect={toggle}
            multiple
          />
        </>
      )}

      {step === 'frase3' && (
        <ReflectivePhrase text="Ignorar lo que sientes no lo hace desaparecer." />
      )}

      {step === 'open1' && (
        <>
          <MascotBubble text="¿Qué has estado ignorando de ti?" />
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
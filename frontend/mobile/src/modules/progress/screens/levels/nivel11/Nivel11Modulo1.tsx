import React, { useState } from 'react';
import SubLevelScreen, {
  MascotBubble, MultipleChoice, OpenQuestion, ReflectivePhrase,
} from '../SubLevelScreen';

const MASCOT = require('../../../../../assets/images/mascotalibro.png');

type Step = 'intro' | 'q1' | 'frase1' | 'open1' | 'frase2' | 'timer' | 'frase3';
const STEPS: Step[] = ['intro', 'q1', 'frase1', 'open1', 'frase2', 'timer', 'frase3'];

export default function Nivel11Modulo1({ navigation }: any) {
  const [stepIndex, setStepIndex] = useState(0);
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
      moduleNumber={1}
      mascot={MASCOT}
      onBack={handleBack}
      onContinue={handleContinue}
      continueLabel={isLast ? 'Finalizar módulo' : 'Continuar'}
      showIntro={step === 'intro'}
      introTitle="Hacer una pausa"
      introDescription="No siempre estás acostumbrado/a a detenerte. Muchas veces sigues en automático o llenas el silencio para no sentir. Este módulo es simplemente eso: una pausa real."
    >
      {step === 'q1' && (
        <>
          <MascotBubble text="¿Cómo te sientes al detenerte?" />
          <MultipleChoice
            options={['Incómodo/a', 'Tranquilo/a', 'Ansioso/a', 'Desconectado/a']}
            selected={q1}
            onSelect={setQ1}
          />
        </>
      )}

      {step === 'frase1' && (
        <ReflectivePhrase text="En el silencio aparecen cosas que el ruido tapa." />
      )}

      {step === 'open1' && (
        <>
          <MascotBubble text="¿Qué aparece cuando te quedas en silencio?" />
          <OpenQuestion
            placeholder="Escribe aquí..."
            value={open1}
            onChange={setOpen1}
          />
        </>
      )}

      {step === 'frase2' && (
        <ReflectivePhrase text="Detenerte no es perder el tiempo, es encontrarte." />
      )}

      {step === 'timer' && (
        <>
          <MascotBubble text="Tómate un momento. Respira profundo antes de continuar." />
        </>
      )}

      {step === 'frase3' && (
        <ReflectivePhrase text="No todo se resuelve haciendo... algunas cosas se entienden sintiendo." />
      )}
    </SubLevelScreen>
  );
}
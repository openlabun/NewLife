import React, { useState } from 'react';
import SubLevelScreen, {
  MascotBubble, MultipleChoice, OpenQuestion, ReflectivePhrase,
} from '../SubLevelScreen';

const MASCOT = require('../../../../../assets/images/mascotaestrella.png');

type Step = 'intro' | 'open1' | 'frase1' | 'q1' | 'frase2' | 'open2' | 'frase3';
const STEPS: Step[] = ['intro', 'open1', 'frase1', 'q1', 'frase2', 'open2', 'frase3'];

export default function Nivel3Modulo2({ navigation }: any) {
  const [stepIndex, setStepIndex] = useState(0);
  const [open1, setOpen1] = useState('');
  const [q1, setQ1] = useState<string | null>(null);
  const [open2, setOpen2] = useState('');

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
      introTitle="Soltar"
      introDescription="Soltar no es perder, es dejar de aferrarte a lo que te está dañando. Es aceptar que hay cosas que no puedes cambiar forzándolas."
    >
      {step === 'open1' && (
        <>
          <MascotBubble text="Escribe 2 o 3 cosas que sientes que ya no puedes seguir cargando." />
          <OpenQuestion
            placeholder="Escribe aquí..."
            value={open1}
            onChange={setOpen1}
          />
        </>
      )}

      {step === 'frase1' && (
        <ReflectivePhrase text="Soltar no significa que no te importe, significa que te importa tu bienestar." />
      )}

      {step === 'q1' && (
        <>
          <MascotBubble text="¿Qué te cuesta más dejar ir?" />
          <MultipleChoice
            options={[
              'El control',
              'Una situación',
              'Una persona',
              'Una versión de mí',
            ]}
            selected={q1}
            onSelect={setQ1}
          />
        </>
      )}

      {step === 'frase2' && (
        <ReflectivePhrase text="Aferrarte no cambia las cosas, solo prolonga el dolor." />
      )}

      {step === 'open2' && (
        <>
          <MascotBubble text="¿Qué crees que pasaría si dejaras de sostener eso?" />
          <OpenQuestion
            placeholder="Escribe aquí..."
            value={open2}
            onChange={setOpen2}
          />
        </>
      )}

      {step === 'frase3' && (
        <ReflectivePhrase text="Dejar ir también es una forma de avanzar." />
      )}
    </SubLevelScreen>
  );
}
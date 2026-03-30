import React, { useState } from 'react';
import SubLevelScreen, {
  MascotBubble, MultipleChoice, OpenQuestion, ReflectivePhrase,
} from '../SubLevelScreen';

const MASCOT = require('../../../../../assets/images/mascotaestrella.png');

type Step = 'intro' | 'escenario' | 'frase1' | 'open1' | 'frase2' | 'q1' | 'frase3' | 'open2';
const STEPS: Step[] = ['intro', 'escenario', 'frase1', 'open1', 'frase2', 'q1', 'frase3', 'open2'];

export default function Nivel12Modulo2({ navigation }: any) {
  const [stepIndex, setStepIndex] = useState(0);
  const [escenario, setEscenario] = useState<string | null>(null);
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
      introTitle="Compartir desde la experiencia"
      introDescription="Compartir no es dar consejos desde arriba, es hablar desde lo vivido. Es conectar con otros desde la autenticidad, no desde la perfección."
    >
      {step === 'escenario' && (
        <>
          <MascotBubble text="Alguien está pasando por algo similar... ¿qué le dirías?" />
          <MultipleChoice
            options={[
              'Que no está solo/a',
              'Que el cambio es posible',
              'Que pida ayuda',
              'Que se tome su tiempo',
            ]}
            selected={escenario}
            onSelect={setEscenario}
          />
        </>
      )}

      {step === 'frase1' && (
        <ReflectivePhrase text="No necesitas tener todas las respuestas para poder acompañar." />
      )}

      {step === 'open1' && (
        <>
          <MascotBubble text="Escribe un mensaje que te habría ayudado antes." />
          <OpenQuestion
            placeholder="Escribe aquí..."
            value={open1}
            onChange={setOpen1}
          />
        </>
      )}

      {step === 'frase2' && (
        <ReflectivePhrase text="Compartir desde lo real conecta más que intentar ser perfecto/a." />
      )}

      {step === 'q1' && (
        <>
          <MascotBubble text="¿Cómo te gustaría compartir lo que aprendiste?" />
          <MultipleChoice
            options={[
              'Hablando con alguien',
              'Acompañando',
              'Dando ejemplo',
              'Aún no lo sé',
            ]}
            selected={q1}
            onSelect={setQ1}
          />
        </>
      )}

      {step === 'frase3' && (
        <ReflectivePhrase text="Tu historia puede ser más valiosa de lo que crees." />
      )}

      {step === 'open2' && (
        <>
          <MascotBubble text="¿Qué te detiene de compartir tu proceso?" />
          <OpenQuestion
            placeholder="Escribe aquí..."
            value={open2}
            onChange={setOpen2}
          />
        </>
      )}
    </SubLevelScreen>
  );
}
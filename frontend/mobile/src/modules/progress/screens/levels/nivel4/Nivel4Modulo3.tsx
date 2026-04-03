import React, { useState } from 'react';
import SubLevelScreen, {
  MascotBubble, MultipleChoice, OpenQuestion, ReflectivePhrase, CompleteSentence,
} from '../SubLevelScreen';

const MASCOT = require('../../../../../assets/images/mascotacorazon.png');

type Step = 'intro' | 'open1' | 'frase1' | 'q1' | 'frase2' | 'open2' | 'frase3' | 'reflexion';
const STEPS: Step[] = ['intro', 'open1', 'frase1', 'q1', 'frase2', 'open2', 'frase3', 'reflexion'];

export default function Nivel4Modulo3({ navigation }: any) {
  const [stepIndex, setStepIndex] = useState(0);
  const [open1, setOpen1] = useState('');
  const [q1, setQ1] = useState<string | null>(null);
  const [open2, setOpen2] = useState('');
  const [reflexion, setReflexion] = useState('');

  const step = STEPS[stepIndex];
  const isLast = stepIndex === STEPS.length - 1;

  const handleContinue = () => {
    if (isLast) navigation.navigate('LevelComplete', {
      levelNumber: 4,
      message: 'El cambio real empieza cuando dejas de verte como enemigo.',
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
      introTitle="Aceptar sin atacarme"
      introDescription="Verte con claridad puede doler. Pero el cambio no empieza con culpa, empieza con aceptación. No eres solo tus errores, pero tampoco puedes ignorarlos."
    >
      {step === 'open1' && (
        <>
          <MascotBubble text="Escribe algo de ti que te cuesta aceptar." />
          <OpenQuestion
            placeholder="Escribe aquí..."
            value={open1}
            onChange={setOpen1}
          />
        </>
      )}

      {step === 'frase1' && (
        <ReflectivePhrase text="No puedes cambiar lo que te niegas a aceptar." />
      )}

      {step === 'q1' && (
        <>
          <MascotBubble text="¿Cómo te hablas cuando cometes errores?" />
          <MultipleChoice
            options={['Muy duro', 'Indiferente', 'Comprensivo', 'Cambiante']}
            selected={q1}
            onSelect={setQ1}
          />
        </>
      )}

      {step === 'frase2' && (
        <ReflectivePhrase text="Aceptarte no es justificarte, es dejar de atacarte." />
      )}

      {step === 'open2' && (
        <>
          <MascotBubble text="¿Cómo sería tratarte con más comprensión?" />
          <OpenQuestion
            placeholder="Escribe aquí..."
            value={open2}
            onChange={setOpen2}
          />
        </>
      )}

      {step === 'frase3' && (
        <ReflectivePhrase text="El cambio real empieza cuando dejas de verte como enemigo." />
      )}

      {step === 'reflexion' && (
        <>
          <MascotBubble text="¿Qué aprendiste sobre ti en este módulo?" />
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
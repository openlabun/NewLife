import React, { useState } from 'react';
import SubLevelScreen, {
  MascotBubble, MultipleChoice, OpenQuestion, ReflectivePhrase,
} from '../SubLevelScreen';

const MASCOT = require('../../../../../assets/images/mascotalibro.png');

type Step = 'intro' | 'checklist' | 'frase1' | 'open1' | 'frase2' | 'resistencia' | 'frase3' | 'reflexion';
const STEPS: Step[] = ['intro', 'checklist', 'frase1', 'open1', 'frase2', 'resistencia', 'frase3', 'reflexion'];

export default function Nivel6Modulo1({ navigation }: any) {
  const [stepIndex, setStepIndex] = useState(0);
  const [checklist, setChecklist] = useState<string[]>([]);
  const [open1, setOpen1] = useState('');
  const [resistencia, setResistencia] = useState<string | null>(null);
  const [reflexion, setReflexion] = useState('');

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
    setChecklist((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
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
      introTitle="Lo que me cuesta soltar"
      introDescription="No todo lo que te hace daño es fácil de dejar. Algunas cosas se quedan porque son conocidas, porque te dan algo, o porque no sabes quién serías sin ellas."
    >
      {step === 'checklist' && (
        <>
          <MascotBubble text="¿Qué sientes que te cuesta soltar?" />
          <MultipleChoice
            options={[
              'Un hábito',
              'Una forma de pensar',
              'Una relación',
              'Una versión de mí',
            ]}
            selected={checklist}
            onSelect={toggle}
            multiple
          />
        </>
      )}

      {step === 'frase1' && (
        <ReflectivePhrase text="No todo lo que te hace daño se siente malo todo el tiempo." />
      )}

      {step === 'open1' && (
        <>
          <MascotBubble text="¿Qué te da eso que no quieres perder?" />
          <OpenQuestion
            placeholder="Escribe aquí..."
            value={open1}
            onChange={setOpen1}
          />
        </>
      )}

      {step === 'frase2' && (
        <ReflectivePhrase text="A veces no sueltas porque aún obtienes algo, aunque te cueste." />
      )}

      {step === 'resistencia' && (
        <>
          <MascotBubble text="¿Qué te mantiene ahí?" />
          <MultipleChoice
            options={['Comodidad', 'Miedo', 'Costumbre', 'Dependencia']}
            selected={resistencia}
            onSelect={setResistencia}
          />
        </>
      )}

      {step === 'frase3' && (
        <ReflectivePhrase text="Reconocer la resistencia es parte del cambio, no un obstáculo." />
      )}

      {step === 'reflexion' && (
        <>
          <MascotBubble text="¿Qué parte de ti se resiste al cambio?" />
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
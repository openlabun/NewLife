import React, { useState } from 'react';
import SubLevelScreen, {
  MascotBubble, MultipleChoice, OpenQuestion, ReflectivePhrase,
} from '../SubLevelScreen';

const MASCOT = require('../../../../../assets/images/mascotalibro.png');

type Step = 'intro' | 'check' | 'frase1' | 'open1' | 'frase2' | 'acciones' | 'frase3' | 'reflexion';
const STEPS: Step[] = ['intro', 'check', 'frase1', 'open1', 'frase2', 'acciones', 'frase3', 'reflexion'];

export default function Nivel10Modulo1({ navigation }: any) {
  const [stepIndex, setStepIndex] = useState(0);
  const [check, setCheck] = useState<string | null>(null);
  const [open1, setOpen1] = useState('');
  const [acciones, setAcciones] = useState<string[]>([]);
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
    setAcciones((prev) =>
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
      introTitle="Detenerme y revisar"
      introDescription="En medio del día a día es fácil actuar sin pensar. Este módulo es una pausa: un espacio para revisar cómo estás, qué estás sintiendo y cómo estás actuando."
    >
      {step === 'check' && (
        <>
          <MascotBubble text="¿Cómo te sientes hoy?" />
          <MultipleChoice
            options={['Tranquilo/a', 'Ansioso/a', 'Cansado/a', 'Confundido/a']}
            selected={check}
            onSelect={setCheck}
          />
        </>
      )}

      {step === 'frase1' && (
        <ReflectivePhrase text="Lo que no observas, se repite." />
      )}

      {step === 'open1' && (
        <>
          <MascotBubble text="¿Qué ha marcado tu día recientemente?" />
          <OpenQuestion
            placeholder="Escribe aquí..."
            value={open1}
            onChange={setOpen1}
          />
        </>
      )}

      {step === 'frase2' && (
        <ReflectivePhrase text="Detenerte también es avanzar." />
      )}

      {step === 'acciones' && (
        <>
          <MascotBubble text="Selecciona acciones recientes que reconoces en ti:" />
          <MultipleChoice
            options={[
              'Actué diferente',
              'Repetí un patrón',
              'Evité algo',
              'Intenté cambiar',
            ]}
            selected={acciones}
            onSelect={toggle}
            multiple
          />
        </>
      )}

      {step === 'frase3' && (
        <ReflectivePhrase text="Ser consciente cambia más que intentar controlar todo." />
      )}

      {step === 'reflexion' && (
        <>
          <MascotBubble text="¿Estás siendo consciente o estás en automático?" />
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
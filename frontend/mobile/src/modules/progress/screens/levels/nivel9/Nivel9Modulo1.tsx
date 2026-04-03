import React, { useState } from 'react';
import SubLevelScreen, {
  MascotBubble, MultipleChoice, OpenQuestion, ReflectivePhrase,
} from '../SubLevelScreen';

const MASCOT = require('../../../../../assets/images/mascotalibro.png');

type Step = 'intro' | 'q1' | 'frase1' | 'open1' | 'frase2' | 'checklist' | 'frase3' | 'reflexion';
const STEPS: Step[] = ['intro', 'q1', 'frase1', 'open1', 'frase2', 'checklist', 'frase3', 'reflexion'];

export default function Nivel9Modulo1({ navigation }: any) {
  const [stepIndex, setStepIndex] = useState(0);
  const [q1, setQ1] = useState<string | null>(null);
  const [open1, setOpen1] = useState('');
  const [checklist, setChecklist] = useState<string[]>([]);
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
      introTitle="El miedo a actuar"
      introDescription="Saber lo que tienes que hacer no siempre significa que sea fácil hacerlo. El miedo, la duda o la incomodidad pueden frenarte justo antes de avanzar."
    >
      {step === 'q1' && (
        <>
          <MascotBubble text="¿Qué sientes cuando piensas en actuar diferente?" />
          <MultipleChoice
            options={['Miedo', 'Inseguridad', 'Duda', 'Resistencia']}
            selected={q1}
            onSelect={setQ1}
          />
        </>
      )}

      {step === 'frase1' && (
        <ReflectivePhrase text="Saber no cambia nada si no actúas diferente." />
      )}

      {step === 'open1' && (
        <>
          <MascotBubble text="¿Qué es lo que más te detiene en este momento?" />
          <OpenQuestion
            placeholder="Escribe aquí..."
            value={open1}
            onChange={setOpen1}
          />
        </>
      )}

      {step === 'frase2' && (
        <ReflectivePhrase text="El miedo no desaparece antes de actuar, se transforma después." />
      )}

      {step === 'checklist' && (
        <>
          <MascotBubble text="Identifica lo que aparece antes de actuar:" />
          <MultipleChoice
            options={[
              '"¿Y si sale mal?"',
              '"No estoy listo/a"',
              '"Mejor después"',
              '"No va a servir"',
            ]}
            selected={checklist}
            onSelect={toggle}
            multiple
          />
        </>
      )}

      {step === 'frase3' && (
        <ReflectivePhrase text="Postergar también es una decisión, aunque no lo parezca." />
      )}

      {step === 'reflexion' && (
        <>
          <MascotBubble text="¿Qué has evitado hacer hasta ahora?" />
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
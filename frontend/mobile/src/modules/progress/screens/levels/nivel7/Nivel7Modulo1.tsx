import React, { useState } from 'react';
import SubLevelScreen, {
  MascotBubble, MultipleChoice, OpenQuestion, ReflectivePhrase,
} from '../SubLevelScreen';

const MASCOT = require('../../../../../assets/images/mascotalibro.png');

type Step = 'intro' | 'q1' | 'frase1' | 'open1' | 'frase2' | 'checklist' | 'frase3' | 'reflexion';
const STEPS: Step[] = ['intro', 'q1', 'frase1', 'open1', 'frase2', 'checklist', 'frase3', 'reflexion'];

export default function Nivel7Modulo1({ navigation }: any) {
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
      introTitle="La dificultad de pedir ayuda"
      introDescription="Pedir ayuda no siempre es natural. Puede sentirse incómodo, innecesario o incluso vergonzoso. Muchas veces aprendiste que tenías que resolver todo por tu cuenta."
    >
      {step === 'q1' && (
        <>
          <MascotBubble text="¿Cómo te sientes al pensar en pedir ayuda?" />
          <MultipleChoice
            options={['Incómodo/a', 'Débil', 'Indiferente', 'Aliviado/a']}
            selected={q1}
            onSelect={setQ1}
          />
        </>
      )}

      {step === 'frase1' && (
        <ReflectivePhrase text="Aprender a pedir ayuda también es aprender a confiar." />
      )}

      {step === 'open1' && (
        <>
          <MascotBubble text="¿Qué te cuesta más de pedir ayuda?" />
          <OpenQuestion
            placeholder="Escribe aquí..."
            value={open1}
            onChange={setOpen1}
          />
        </>
      )}

      {step === 'frase2' && (
        <ReflectivePhrase text="No todo lo que haces solo/a es fortaleza... a veces es aislamiento." />
      )}

      {step === 'checklist' && (
        <>
          <MascotBubble text="¿Qué pensamientos aparecen cuando piensas en pedir ayuda?" />
          <MultipleChoice
            options={[
              '"Debería poder solo/a"',
              '"No quiero molestar"',
              '"No me van a entender"',
              '"No lo necesito"',
            ]}
            selected={checklist}
            onSelect={toggle}
            multiple
          />
        </>
      )}

      {step === 'frase3' && (
        <ReflectivePhrase text="Pedir ayuda no te hace menos capaz, te hace más consciente." />
      )}

      {step === 'reflexion' && (
        <>
          <MascotBubble text="¿De dónde crees que viene esa forma de pensar?" />
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
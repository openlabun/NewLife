import React, { useState } from 'react';
import SubLevelScreen, {
  MascotBubble, MultipleChoice, OpenQuestion, ReflectivePhrase,
} from '../SubLevelScreen';

const MASCOT = require('../../../../../assets/images/mascotalibro.png');

type Step = 'intro' | 'lista' | 'frase1' | 'open1' | 'frase2' | 'q1' | 'frase3';
const STEPS: Step[] = ['intro', 'lista', 'frase1', 'open1', 'frase2', 'q1', 'frase3'];

export default function Nivel8Modulo1({ navigation }: any) {
  const [stepIndex, setStepIndex] = useState(0);
  const [lista, setLista] = useState<string[]>([]);
  const [open1, setOpen1] = useState('');
  const [q1, setQ1] = useState<string | null>(null);

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
    setLista((prev) =>
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
      introTitle="Reconocer el impacto"
      introDescription="Aceptar que nuestras acciones han afectado a otros puede ser incómodo, incluso doloroso. Pero ignorarlo no lo desaparece. Este es el primer paso para mirar más allá de ti mismo/a."
    >
      {step === 'lista' && (
        <>
          <MascotBubble text="¿Dónde has notado que tu situación ha tenido impacto?" />
          <MultipleChoice
            options={['Familia', 'Pareja', 'Amigos', 'Trabajo / estudios', 'Yo mismo/a']}
            selected={lista}
            onSelect={toggle}
            multiple
          />
        </>
      )}

      {step === 'frase1' && (
        <ReflectivePhrase text="Reconocer el impacto no es para castigarte, es para hacerte consciente." />
      )}

      {step === 'open1' && (
        <>
          <MascotBubble text="¿De qué forma crees que pudieron haber sido afectados?" />
          <OpenQuestion
            placeholder="Escribe aquí..."
            value={open1}
            onChange={setOpen1}
          />
        </>
      )}

      {step === 'frase2' && (
        <ReflectivePhrase text="Lo que haces no solo te afecta a ti, también deja huella en otros." />
      )}

      {step === 'q1' && (
        <>
          <MascotBubble text="¿Cómo te hace sentir reconocer esto?" />
          <MultipleChoice
            options={['Culpa', 'Tristeza', 'Evitación', 'Confusión']}
            selected={q1}
            onSelect={setQ1}
          />
        </>
      )}

      {step === 'frase3' && (
        <ReflectivePhrase text="Mirar esto puede doler, pero también es lo que permite cambiar." />
      )}
    </SubLevelScreen>
  );
}
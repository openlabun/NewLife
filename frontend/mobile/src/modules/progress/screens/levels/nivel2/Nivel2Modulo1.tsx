import React, { useState } from 'react';
import SubLevelScreen, {
  MascotBubble, MultipleChoice, OpenQuestion, ReflectivePhrase,
} from '../SubLevelScreen';

const MASCOT = require('../../../../../assets/images/mascotalibro.png');

type Step = 'intro' | 'q1' | 'frase1' | 'open1' | 'frase2' | 'checklist' | 'frase3';
const STEPS: Step[] = ['intro', 'q1', 'frase1', 'open1', 'frase2', 'checklist', 'frase3'];

export default function Nivel2Modulo1({ navigation }: any) {
  const [stepIndex, setStepIndex] = useState(0);
  const [q1, setQ1] = useState<string | null>(null);
  const [open1, setOpen1] = useState('');
  const [checklist, setChecklist] = useState<string[]>([]);

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

  const toggleChecklist = (val: string) => {
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
      introTitle="Resistencia interna"
      introDescription="Durante mucho tiempo aprendiste a desconfiar: de los demás, de las soluciones, incluso de ti mismo. Esa desconfianza no apareció de la nada, se construyó con experiencias, caídas y promesas que no se cumplieron."
    >
      {step === 'q1' && (
        <>
          <MascotBubble text="Cuando piensas en cambiar, ¿qué aparece primero?" />
          <MultipleChoice
            options={[
              '"No va a funcionar"',
              '"Ya lo intenté antes"',
              '"No es para mí"',
              '"Tal vez... pero no lo sé"',
            ]}
            selected={q1}
            onSelect={setQ1}
          />
        </>
      )}

      {step === 'frase1' && (
        <ReflectivePhrase text="La desconfianza también es una forma de protegerte... pero puede terminar encerrándote." />
      )}

      {step === 'open1' && (
        <>
          <MascotBubble text="¿En qué cosas sientes que ya no puedes confiar?" />
          <OpenQuestion
            placeholder="Escribe aquí..."
            value={open1}
            onChange={setOpen1}
          />
        </>
      )}

      {step === 'frase2' && (
        <ReflectivePhrase text="No confiar te ha mantenido a salvo, pero también te ha mantenido estancado." />
      )}

      {step === 'checklist' && (
        <>
          <MascotBubble text="Selecciona los pensamientos que has tenido:" />
          <MultipleChoice
            options={[
              '"Nada va a cambiar"',
              '"Yo soy el problema"',
              '"Es demasiado tarde"',
              '"No vale la pena intentarlo"',
            ]}
            selected={checklist}
            onSelect={toggleChecklist}
            multiple
          />
        </>
      )}

      {step === 'frase3' && (
        <ReflectivePhrase text="A veces no creemos porque antes dolió demasiado intentar." />
      )}
    </SubLevelScreen>
  );
}
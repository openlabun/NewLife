import React, { useState } from 'react';
import SubLevelScreen, {
  MascotBubble, MultipleChoice, OpenQuestion, ReflectivePhrase, CompleteSentence,
} from '../SubLevelScreen';

const MASCOT = require('../../../../../assets/images/mascotacorazon.png');

type Step = 'intro' | 'open1' | 'frase1' | 'q1' | 'frase2' | 'plan' | 'frase3' | 'reflexion';
const STEPS: Step[] = ['intro', 'open1', 'frase1', 'q1', 'frase2', 'plan', 'frase3', 'reflexion'];

export default function Nivel9Modulo3({ navigation }: any) {
  const [stepIndex, setStepIndex] = useState(0);
  const [open1, setOpen1] = useState('');
  const [q1, setQ1] = useState<string | null>(null);
  const [planSi, setPlanSi] = useState('');
  const [planVoy, setPlanVoy] = useState('');
  const [reflexion, setReflexion] = useState('');

  const step = STEPS[stepIndex];
  const isLast = stepIndex === STEPS.length - 1;

  const handleContinue = () => {
    if (isLast) navigation.navigate('LevelComplete', {
      levelNumber: 9,
      message: 'Cada vez que eliges distinto, te conviertes en alguien nuevo.',
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
      introTitle="Sostener el cambio"
      introDescription="Actuar una vez es importante, pero sostenerlo es lo que realmente transforma. Este es el inicio de una nueva forma de responder."
    >
      {step === 'open1' && (
        <>
          <MascotBubble text="Escribe una acción concreta que vas a sostener." />
          <OpenQuestion
            placeholder="Escribe aquí..."
            value={open1}
            onChange={setOpen1}
          />
        </>
      )}

      {step === 'frase1' && (
        <ReflectivePhrase text="El cambio no se demuestra una vez, se construye con repetición." />
      )}

      {step === 'q1' && (
        <>
          <MascotBubble text="¿Qué podría hacerte volver a lo anterior?" />
          <MultipleChoice
            options={['Cansancio', 'Emociones intensas', 'Entorno', 'Costumbre']}
            selected={q1}
            onSelect={setQ1}
          />
        </>
      )}

      {step === 'frase2' && (
        <ReflectivePhrase text="Volver atrás es parte del proceso, no el final." />
      )}

      {step === 'plan' && (
        <>
          <MascotBubble text="Crea tu plan de prevención:" />
          <CompleteSentence
            prefix='"Si siento..."'
            value={planSi}
            onChange={setPlanSi}
          />
          <CompleteSentence
            prefix='"...voy a..."'
            value={planVoy}
            onChange={setPlanVoy}
          />
        </>
      )}

      {step === 'frase3' && (
        <ReflectivePhrase text="Cada vez que eliges distinto, te conviertes en alguien nuevo." />
      )}

      {step === 'reflexion' && (
        <>
          <MascotBubble text="¿Cómo se siente haber actuado diferente?" />
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
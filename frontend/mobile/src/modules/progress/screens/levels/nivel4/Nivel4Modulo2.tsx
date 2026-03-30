import React, { useState } from 'react';
import SubLevelScreen, {
  MascotBubble, MultipleChoice, OpenQuestion, ReflectivePhrase, CompleteSentence,
} from '../SubLevelScreen';

const MASCOT = require('../../../../../assets/images/mascotaestrella.png');

type Step = 'intro' | 'q1' | 'frase1' | 'complete' | 'frase2' | 'open1' | 'frase3';
const STEPS: Step[] = ['intro', 'q1', 'frase1', 'complete', 'frase2', 'open1', 'frase3'];

export default function Nivel4Modulo2({ navigation }: any) {
  const [stepIndex, setStepIndex] = useState(0);
  const [q1, setQ1] = useState<string | null>(null);
  const [complete, setComplete] = useState('');
  const [open1, setOpen1] = useState('');

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
      introTitle="Reconocer patrones"
      introDescription="Muchas de tus decisiones no son nuevas, solo son repeticiones. Entender tus patrones es empezar a romperlos."
    >
      {step === 'q1' && (
        <>
          <MascotBubble text="¿Cuál de estos patrones reconoces en ti?" />
          <MultipleChoice
            options={[
              'Evito los problemas',
              'Reacciono con enojo',
              'Me saboteo',
              'Dependo de algo/alguien',
              'Me cierro emocionalmente',
            ]}
            selected={q1}
            onSelect={setQ1}
          />
        </>
      )}

      {step === 'frase1' && (
        <ReflectivePhrase text="Repetir no significa fallar, significa que aún no has entendido algo." />
      )}

      {step === 'complete' && (
        <>
          <MascotBubble text="Completa esta frase:" />
          <CompleteSentence
            prefix='"Me doy cuenta de que siempre..."'
            value={complete}
            onChange={setComplete}
          />
        </>
      )}

      {step === 'frase2' && (
        <ReflectivePhrase text="Tus patrones no aparecieron por casualidad, tienen una historia." />
      )}

      {step === 'open1' && (
        <>
          <MascotBubble text="¿Qué crees que estás intentando evitar o proteger con ese patrón?" />
          <OpenQuestion
            placeholder="Escribe aquí..."
            value={open1}
            onChange={setOpen1}
          />
        </>
      )}

      {step === 'frase3' && (
        <ReflectivePhrase text="Lo que hoy te afecta, alguna vez te protegió." />
      )}
    </SubLevelScreen>
  );
}
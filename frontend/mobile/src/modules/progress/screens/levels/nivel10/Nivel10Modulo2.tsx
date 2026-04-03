import React, { useState } from 'react';
import SubLevelScreen, {
  MascotBubble, MultipleChoice, OpenQuestion, ReflectivePhrase, CompleteSentence,
} from '../SubLevelScreen';

const MASCOT = require('../../../../../assets/images/mascotaestrella.png');

type Step = 'intro' | 'q1' | 'frase1' | 'complete' | 'frase2' | 'open1' | 'frase3';
const STEPS: Step[] = ['intro', 'q1', 'frase1', 'complete', 'frase2', 'open1', 'frase3'];

export default function Nivel10Modulo2({ navigation }: any) {
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
      introTitle="Reconocer y corregir"
      introDescription="Equivocarte no significa retroceder. Reflexionar también implica reconocer cuando fallas y decidir qué hacer con eso."
    >
      {step === 'q1' && (
        <>
          <MascotBubble text="Cuando cometes un error, tiendes a:" />
          <MultipleChoice
            options={['Ignorarlo', 'Justificarlo', 'Castigarte', 'Aprender de él']}
            selected={q1}
            onSelect={setQ1}
          />
        </>
      )}

      {step === 'frase1' && (
        <ReflectivePhrase text="Equivocarte no borra tu proceso, lo hace más real." />
      )}

      {step === 'complete' && (
        <>
          <MascotBubble text="Completa esta frase:" />
          <CompleteSentence
            prefix='"Hoy me doy cuenta de que..."'
            value={complete}
            onChange={setComplete}
          />
        </>
      )}

      {step === 'frase2' && (
        <ReflectivePhrase text="Reconocer es más útil que castigarte." />
      )}

      {step === 'open1' && (
        <>
          <MascotBubble text="¿Qué podrías hacer diferente la próxima vez?" />
          <OpenQuestion
            placeholder="Escribe aquí..."
            value={open1}
            onChange={setOpen1}
          />
        </>
      )}

      {step === 'frase3' && (
        <ReflectivePhrase text="Cada error bien visto se convierte en guía." />
      )}
    </SubLevelScreen>
  );
}
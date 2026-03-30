import React, { useState } from 'react';
import SubLevelScreen, {
  MascotBubble, MultipleChoice, OpenQuestion, ReflectivePhrase, CompleteSentence,
} from '../SubLevelScreen';

const MASCOT = require('../../../../../assets/images/mascotalibro.png');

type Step = 'intro' | 'complete' | 'frase1' | 'q1' | 'frase2' | 'open1' | 'frase3';
const STEPS: Step[] = ['intro', 'complete', 'frase1', 'q1', 'frase2', 'open1', 'frase3'];

export default function Nivel12Modulo1({ navigation }: any) {
  const [stepIndex, setStepIndex] = useState(0);
  const [complete, setComplete] = useState('');
  const [q1, setQ1] = useState<string | null>(null);
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
      moduleNumber={1}
      mascot={MASCOT}
      onBack={handleBack}
      onContinue={handleContinue}
      continueLabel={isLast ? 'Finalizar módulo' : 'Continuar'}
      showIntro={step === 'intro'}
      introTitle="Lo que ahora puedo dar"
      introDescription="Después de todo este proceso, algo en ti cambió. Tal vez no todo, pero sí lo suficiente para que ahora tengas algo distinto que ofrecer."
    >
      {step === 'complete' && (
        <>
          <MascotBubble text="Completa esta frase:" />
          <CompleteSentence
            prefix='"Hoy puedo dar..."'
            value={complete}
            onChange={setComplete}
          />
        </>
      )}

      {step === 'frase1' && (
        <ReflectivePhrase text="No tienes que estar completamente bien para poder aportar algo bueno." />
      )}

      {step === 'q1' && (
        <>
          <MascotBubble text="¿Qué sientes que puedes aportar ahora?" />
          <MultipleChoice
            options={['Escucha', 'Comprensión', 'Apoyo', 'Ejemplo']}
            selected={q1}
            onSelect={setQ1}
          />
        </>
      )}

      {step === 'frase2' && (
        <ReflectivePhrase text="Lo que viviste puede convertirse en algo útil para otros." />
      )}

      {step === 'open1' && (
        <>
          <MascotBubble text="¿Qué aprendiste que podría ayudar a alguien más?" />
          <OpenQuestion
            placeholder="Escribe aquí..."
            value={open1}
            onChange={setOpen1}
          />
        </>
      )}

      {step === 'frase3' && (
        <ReflectivePhrase text="Tu proceso también puede ser un puente para alguien más." />
      )}
    </SubLevelScreen>
  );
}
import React, { useState } from 'react';
import SubLevelScreen, {
  MascotBubble, MultipleChoice, OpenQuestion, ReflectivePhrase,
} from '../SubLevelScreen';

const MASCOT = require('../../../../../assets/images/mascotaestrella.png');

type Step = 'intro' | 'eleccion' | 'frase1' | 'chat' | 'frase2' | 'q1' | 'frase3' | 'open1';
const STEPS: Step[] = ['intro', 'eleccion', 'frase1', 'chat', 'frase2', 'q1', 'frase3', 'open1'];

export default function Nivel5Modulo2({ navigation }: any) {
  const [stepIndex, setStepIndex] = useState(0);
  const [eleccion, setEleccion] = useState<string | null>(null);
  const [chat, setChat] = useState('');
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
      moduleNumber={2}
      mascot={MASCOT}
      onBack={handleBack}
      onContinue={handleContinue}
      continueLabel={isLast ? 'Finalizar módulo' : 'Continuar'}
      showIntro={step === 'intro'}
      introTitle="Abrirme poco a poco"
      introDescription="Compartir no es exponerte completamente, es elegir empezar. No necesitas confianza total, solo un primer intento."
    >
      {step === 'eleccion' && (
        <>
          <MascotBubble text="¿Con quién podrías abrirte?" />
          <MultipleChoice
            options={[
              'Persona cercana',
              'Profesional',
              'Alguien de confianza',
              'Nadie aún',
            ]}
            selected={eleccion}
            onSelect={setEleccion}
          />
        </>
      )}

      {step === 'frase1' && (
        <ReflectivePhrase text="No necesitas decirlo perfecto, solo necesitas decirlo real." />
      )}

      {step === 'chat' && (
        <>
          <MascotBubble text="Escribe algo que te gustaría decirle a alguien. Solo tú lo verás." />
          <OpenQuestion
            placeholder="Escribe aquí como si hablaras con esa persona..."
            value={chat}
            onChange={setChat}
          />
        </>
      )}

      {step === 'frase2' && (
        <ReflectivePhrase text="Abrirte no es debilidad, es una forma de dejar de cargar solo/a." />
      )}

      {step === 'q1' && (
        <>
          <MascotBubble text="¿Qué te detiene más para hablar?" />
          <MultipleChoice
            options={[
              'Miedo a ser juzgado/a',
              'Vergüenza',
              'No saber cómo explicarlo',
              'Sentir que no importa',
            ]}
            selected={q1}
            onSelect={setQ1}
          />
        </>
      )}

      {step === 'frase3' && (
        <ReflectivePhrase text="Ser escuchado puede cambiar más de lo que imaginas." />
      )}

      {step === 'open1' && (
        <>
          <MascotBubble text="¿Qué necesitarías para sentirte un poco más seguro/a al compartir?" />
          <OpenQuestion
            placeholder="Escribe aquí..."
            value={open1}
            onChange={setOpen1}
          />
        </>
      )}
    </SubLevelScreen>
  );
}
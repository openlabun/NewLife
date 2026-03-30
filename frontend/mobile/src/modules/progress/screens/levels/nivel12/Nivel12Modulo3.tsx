import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import SubLevelScreen, {
  MascotBubble, MultipleChoice, OpenQuestion, ReflectivePhrase, CompleteSentence,
} from '../SubLevelScreen';
import { colors, fontSizes, spacing, borderRadius } from '../../../../../constants/theme';

const MASCOT = require('../../../../../assets/images/mascotacorazon.png');

type Step = 'intro' | 'complete1' | 'frase1' | 'open1' | 'frase2' | 'q1' | 'frase3' | 'boton' | 'reflexion';
const STEPS: Step[] = ['intro', 'complete1', 'frase1', 'open1', 'frase2', 'q1', 'frase3', 'boton', 'reflexion'];

export default function Nivel12Modulo3({ navigation }: any) {
  const [stepIndex, setStepIndex] = useState(0);
  const [complete1, setComplete1] = useState('');
  const [open1, setOpen1] = useState('');
  const [q1, setQ1] = useState<string | null>(null);
  const [reflexion, setReflexion] = useState('');

  const step = STEPS[stepIndex];
  const isLast = stepIndex === STEPS.length - 1;

  const handleContinue = () => {
    if (isLast) navigation.navigate('LevelComplete', {
      levelNumber: 12,
      message: 'No eres la misma persona que empezó este proceso.',
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
      continueLabel={isLast ? 'Finalizar proceso' : 'Continuar'}
      showIntro={step === 'intro'}
      introTitle="Integrar y continuar"
      introDescription="Este no es un final, es una forma nueva de vivir. Integrar es llevar todo lo aprendido contigo, no como algo externo, sino como parte de quién eres ahora."
    >
      {step === 'complete1' && (
        <>
          <MascotBubble text="Completa esta frase:" />
          <CompleteSentence
            prefix='"Hoy soy alguien que..."'
            value={complete1}
            onChange={setComplete1}
          />
        </>
      )}

      {step === 'frase1' && (
        <ReflectivePhrase text="No eres la misma persona que empezó este proceso." />
      )}

      {step === 'open1' && (
        <>
          <MascotBubble text="¿Qué cambió en ti desde el inicio hasta ahora?" />
          <OpenQuestion
            placeholder="Escribe aquí..."
            value={open1}
            onChange={setOpen1}
          />
        </>
      )}

      {step === 'frase2' && (
        <ReflectivePhrase text="El cambio no termina aquí, se convierte en parte de tu vida." />
      )}

      {step === 'q1' && (
        <>
          <MascotBubble text="¿Qué quieres seguir construyendo?" />
          <MultipleChoice
            options={['Bienestar', 'Relaciones sanas', 'Constancia', 'Propósito']}
            selected={q1}
            onSelect={setQ1}
          />
        </>
      )}

      {step === 'frase3' && (
        <ReflectivePhrase text="Seguir también es una forma de avanzar." />
      )}

      {step === 'boton' && (
        <>
          <MascotBubble text="¿Estás listo/a para continuar tu proceso?" />
          <TouchableOpacity style={styles.finalButton} onPress={handleContinue}>
            <Text style={styles.finalButtonText}>🌱 Continúo mi proceso</Text>
          </TouchableOpacity>
        </>
      )}

      {step === 'reflexion' && (
        <>
          <MascotBubble text="¿Cómo te sientes al llegar hasta aquí?" />
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

const styles = StyleSheet.create({
  finalButton: {
    backgroundColor: colors.accent,
    borderRadius: borderRadius.full,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.lg,
    elevation: 3,
    shadowColor: colors.accent,
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  finalButtonText: {
    color: colors.white,
    fontSize: fontSizes.lg,
    fontWeight: '700',
  },
});
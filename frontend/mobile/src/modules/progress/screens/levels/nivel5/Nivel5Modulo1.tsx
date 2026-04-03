import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SubLevelScreen, {
  MascotBubble, MultipleChoice, OpenQuestion, ReflectivePhrase,
} from '../SubLevelScreen';
import { colors, fontSizes, spacing, borderRadius } from '../../../../../constants/theme';

const MASCOT = require('../../../../../assets/images/mascotalibro.png');

type Step = 'intro' | 'q1' | 'frase1' | 'open1' | 'frase2' | 'caja' | 'frase3' | 'reflexion';
const STEPS: Step[] = ['intro', 'q1', 'frase1', 'open1', 'frase2', 'caja', 'frase3', 'reflexion'];

export default function Nivel5Modulo1({ navigation }: any) {
  const [stepIndex, setStepIndex] = useState(0);
  const [q1, setQ1] = useState<string | null>(null);
  const [open1, setOpen1] = useState('');
  const [caja, setCaja] = useState('');
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
      introTitle="El peso del silencio"
      introDescription="Callar puede parecer más fácil, pero lo que no se expresa no desaparece. Se acumula, se transforma y muchas veces pesa más con el tiempo."
    >
      {step === 'q1' && (
        <>
          <MascotBubble text="Cuando algo te afecta, normalmente..." />
          <MultipleChoice
            options={[
              'Me lo guardo',
              'Lo minimizo',
              'Lo digo, pero no todo',
              'Lo expreso completamente',
            ]}
            selected={q1}
            onSelect={setQ1}
          />
        </>
      )}

      {step === 'frase1' && (
        <ReflectivePhrase text="Lo que no dices no desaparece, solo cambia de forma dentro de ti." />
      )}

      {step === 'open1' && (
        <>
          <MascotBubble text="¿Qué cosas sueles callar?" />
          <OpenQuestion
            placeholder="Escribe aquí..."
            value={open1}
            onChange={setOpen1}
          />
        </>
      )}

      {step === 'frase2' && (
        <ReflectivePhrase text="Callar te protege del momento... pero te pesa con el tiempo." />
      )}

      {step === 'caja' && (
        <>
          <MascotBubble text="Escribe pensamientos o emociones que nunca has dicho. Quedarán guardados aquí." />
          <OpenQuestion
            placeholder="Escribe lo que llevas dentro..."
            value={caja}
            onChange={setCaja}
          />
          <View style={styles.cajaVisual}>
            <Text style={styles.cajaIcon}>📦</Text>
            <Text style={styles.cajaText}>Tu caja cerrada</Text>
          </View>
        </>
      )}

      {step === 'frase3' && (
        <ReflectivePhrase text="A veces no hablas porque no sabes cómo, no porque no lo necesites." />
      )}

      {step === 'reflexion' && (
        <>
          <MascotBubble text="¿Desde cuándo llevas eso contigo?" />
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
  cajaVisual: {
    alignItems: 'center',
    padding: spacing.lg,
    backgroundColor: colors.white,
    borderRadius: borderRadius.md,
    borderWidth: 1,
    borderColor: colors.border,
    marginTop: spacing.sm,
    gap: spacing.xs,
  },
  cajaIcon: {
    fontSize: 40,
  },
  cajaText: {
    fontSize: fontSizes.sm,
    color: colors.textMuted,
    fontWeight: '500',
  },
});
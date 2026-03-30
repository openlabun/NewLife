import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SubLevelScreen, {
  MascotBubble, MultipleChoice, OpenQuestion, ReflectivePhrase, CompleteSentence,
} from '../SubLevelScreen';
import { colors, fontSizes, spacing, borderRadius } from '../../../../../constants/theme';

const MASCOT = require('../../../../../assets/images/mascotalibro.png');

type Step = 'intro' | 'complete' | 'frase1' | 'q1' | 'frase2' | 'emociones' | 'frase3' | 'open1';
const STEPS: Step[] = ['intro', 'complete', 'frase1', 'q1', 'frase2', 'emociones', 'frase3', 'open1'];

const EMOCIONES = [
  'Tristeza', 'Rabia', 'Miedo', 'Culpa',
  'Vergüenza', 'Ansiedad', 'Soledad', 'Confusión',
];

export default function Nivel4Modulo1({ navigation }: any) {
  const [stepIndex, setStepIndex] = useState(0);
  const [complete, setComplete] = useState('');
  const [q1, setQ1] = useState<string | null>(null);
  const [emociones, setEmociones] = useState<string[]>([]);
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

  const toggleEmocion = (val: string) => {
    setEmociones((prev) =>
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
      introTitle="Mirarme sin escapar"
      introDescription="No siempre es fácil quedarse con uno mismo. Muchas veces evitamos mirar lo que sentimos porque no sabemos qué hacer con eso. Este es el primer intento de observarte sin huir."
    >
      {step === 'complete' && (
        <>
          <MascotBubble text="Completa esta frase:" />
          <CompleteSentence
            prefix='"Cuando estoy solo/a conmigo, lo que más aparece es..."'
            value={complete}
            onChange={setComplete}
          />
        </>
      )}

      {step === 'frase1' && (
        <ReflectivePhrase text="Lo que evitas sentir, suele quedarse más tiempo." />
      )}

      {step === 'q1' && (
        <>
          <MascotBubble text="¿Qué sueles hacer cuando algo te incomoda emocionalmente?" />
          <MultipleChoice
            options={[
              'Distraerme',
              'Ignorarlo',
              'Reaccionar impulsivamente',
              'Pensarlo demasiado',
            ]}
            selected={q1}
            onSelect={setQ1}
          />
        </>
      )}

      {step === 'frase2' && (
        <ReflectivePhrase text="Mirarte no te hace débil, te hace consciente." />
      )}

      {step === 'emociones' && (
        <>
          <MascotBubble text="¿Cuáles de estas emociones has sentido más últimamente?" />
          <View style={styles.emocionesGrid}>
            {EMOCIONES.map((emocion) => (
              <TouchableOpacity
                key={emocion}
                style={[styles.emocionChip, emociones.includes(emocion) && styles.emocionChipSelected]}
                onPress={() => toggleEmocion(emocion)}
              >
                <Text style={[styles.emocionText, emociones.includes(emocion) && styles.emocionTextSelected]}>
                  {emocion}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </>
      )}

      {step === 'frase3' && (
        <ReflectivePhrase text="No necesitas resolver todo ahora, solo empezar a observar." />
      )}

      {step === 'open1' && (
        <>
          <MascotBubble text="¿Qué emoción sientes que has estado evitando?" />
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

const styles = StyleSheet.create({
  emocionesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginVertical: spacing.md,
  },
  emocionChip: {
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.white,
  },
  emocionChipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  emocionText: {
    fontSize: fontSizes.sm,
    color: colors.text,
    fontWeight: '500',
  },
  emocionTextSelected: {
    color: colors.white,
    fontWeight: '700',
  },
});
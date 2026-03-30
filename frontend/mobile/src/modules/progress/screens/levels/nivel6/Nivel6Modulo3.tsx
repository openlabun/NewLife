import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import SubLevelScreen, {
  MascotBubble, MultipleChoice, OpenQuestion, ReflectivePhrase, CompleteSentence,
} from '../SubLevelScreen';
import { colors, fontSizes, spacing, borderRadius } from '../../../../../constants/theme';

const MASCOT = require('../../../../../assets/images/mascotacorazon.png');

type Step = 'intro' | 'slider' | 'frase1' | 'complete' | 'frase2' | 'q1' | 'frase3' | 'boton' | 'reflexion';
const STEPS: Step[] = ['intro', 'slider', 'frase1', 'complete', 'frase2', 'q1', 'frase3', 'boton', 'reflexion'];

export default function Nivel6Modulo3({ navigation }: any) {
  const [stepIndex, setStepIndex] = useState(0);
  const [slider, setSlider] = useState(50);
  const [complete, setComplete] = useState('');
  const [q1, setQ1] = useState<string[]>([]);
  const [reflexion, setReflexion] = useState('');

  const step = STEPS[stepIndex];
  const isLast = stepIndex === STEPS.length - 1;

  const handleContinue = () => {
    if (isLast) navigation.navigate('LevelComplete', {
      levelNumber: 6,
      message: 'La disposición no elimina el miedo, pero sí cambia tu dirección.',
    });
    else setStepIndex(stepIndex + 1);
  };

  const handleBack = () => {
    if (stepIndex === 0) navigation.goBack();
    else setStepIndex(stepIndex - 1);
  };

  const toggle = (val: string) => {
    setQ1((prev) =>
      prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]
    );
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
      introTitle="Disposición"
      introDescription="No se trata de no tener miedo, sino de avanzar con él. Estar listo/a no es sentir seguridad, es decidir que vas a intentarlo aunque no lo tengas todo claro."
    >
      {step === 'slider' && (
        <>
          <MascotBubble text="¿Qué tan dispuesto/a estás a cambiar realmente?" />
          <View style={styles.sliderWrapper}>
            <View style={styles.track}>
              <View style={[styles.fill, { width: `${slider}%` }]} />
            </View>
            <View style={styles.labelsRow}>
              {[0, 25, 50, 75, 100].map((val) => (
                <TouchableOpacity
                  key={val}
                  style={[styles.tick, slider === val && styles.tickSelected]}
                  onPress={() => setSlider(val)}
                >
                  <Text style={[styles.tickText, slider === val && styles.tickTextSelected]}>
                    {val}%
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </>
      )}

      {step === 'frase1' && (
        <ReflectivePhrase text="La disposición no elimina el miedo, pero sí cambia tu dirección." />
      )}

      {step === 'complete' && (
        <>
          <MascotBubble text="Completa esta frase:" />
          <CompleteSentence
            prefix='"Estoy dispuesto/a a..."'
            value={complete}
            onChange={setComplete}
          />
        </>
      )}

      {step === 'frase2' && (
        <ReflectivePhrase text="No necesitas garantías para avanzar, solo decisión." />
      )}

      {step === 'q1' && (
        <>
          <MascotBubble text="¿Qué estás dispuesto/a a hacer?" />
          <MultipleChoice
            options={[
              'Pedir ayuda',
              'Intentar algo diferente',
              'Salir de mi zona cómoda',
              'Ser honesto/a conmigo',
            ]}
            selected={q1}
            onSelect={toggle}
            multiple
          />
        </>
      )}

      {step === 'frase3' && (
        <ReflectivePhrase text="Estar listo/a no es sentirte seguro/a, es dejar de posponer." />
      )}

      {step === 'boton' && (
        <>
          <MascotBubble text="¿Estás listo/a para intentarlo?" />
          <TouchableOpacity style={styles.acceptButton} onPress={handleContinue}>
            <Text style={styles.acceptButtonText}>Estoy listo/a para intentar</Text>
          </TouchableOpacity>
        </>
      )}

      {step === 'reflexion' && (
        <>
          <MascotBubble text="¿Qué significa para ti dar este paso?" />
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
  sliderWrapper: {
    marginVertical: spacing.lg,
  },
  track: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  fill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 4,
  },
  labelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tick: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.xs,
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.white,
    minWidth: 48,
    alignItems: 'center',
  },
  tickSelected: {
    backgroundColor: colors.accent,
    borderColor: colors.accent,
  },
  tickText: {
    fontSize: fontSizes.xs,
    color: colors.text,
    fontWeight: '600',
  },
  tickTextSelected: {
    color: colors.white,
  },
  acceptButton: {
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
  acceptButtonText: {
    color: colors.white,
    fontSize: fontSizes.lg,
    fontWeight: '700',
  },
});
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SubLevelScreen, {
  MascotBubble, MultipleChoice, OpenQuestion, ReflectivePhrase,
} from '../SubLevelScreen';
import { colors, fontSizes, spacing, borderRadius } from '../../../../../constants/theme';

const MASCOT = require('../../../../../assets/images/mascotalibro.png');

type Step = 'intro' | 'q1' | 'frase1' | 'open1' | 'frase2' | 'cargas' | 'frase3';
const STEPS: Step[] = ['intro', 'q1', 'frase1', 'open1', 'frase2', 'cargas', 'frase3'];

const CARGAS = ['Culpa', 'Miedo', 'Expectativas', 'Hábitos', 'Vergüenza', 'Resentimiento'];

export default function Nivel3Modulo1({ navigation }: any) {
  const [stepIndex, setStepIndex] = useState(0);
  const [q1, setQ1] = useState<string | null>(null);
  const [open1, setOpen1] = useState('');
  const [cargas, setCargas] = useState<string[]>([]);

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

  const toggleCarga = (val: string) => {
    setCargas((prev) =>
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
      introTitle="La ilusión del control"
      introDescription="Creer que puedes con todo puede hacerte sentir fuerte... hasta que te rompe. El control absoluto no es poder, es una carga que crece en silencio."
    >
      {step === 'q1' && (
        <>
          <MascotBubble text="¿Cómo enfrentas lo que sientes normalmente?" />
          <MultipleChoice
            options={[
              'Intento controlarlo todo',
              'Lo ignoro',
              'Reacciono sin pensar',
              'Me siento desbordado/a',
            ]}
            selected={q1}
            onSelect={setQ1}
          />
        </>
      )}

      {step === 'frase1' && (
        <ReflectivePhrase text="Intentar controlarlo todo también es una forma de miedo." />
      )}

      {step === 'open1' && (
        <>
          <MascotBubble text="¿Qué cosas en tu vida sientes que necesitas controlar para estar bien?" />
          <OpenQuestion
            placeholder="Escribe aquí..."
            value={open1}
            onChange={setOpen1}
          />
        </>
      )}

      {step === 'frase2' && (
        <ReflectivePhrase text="El control puede darte seguridad por un momento, pero te quita paz a largo plazo." />
      )}

      {step === 'cargas' && (
        <>
          <MascotBubble text="¿Cuáles de estas cargas estás cargando actualmente?" />
          <View style={styles.cargasGrid}>
            {CARGAS.map((carga) => (
              <TouchableOpacity
                key={carga}
                style={[styles.cargaChip, cargas.includes(carga) && styles.cargaChipSelected]}
                onPress={() => toggleCarga(carga)}
              >
                <Text style={[styles.cargaText, cargas.includes(carga) && styles.cargaTextSelected]}>
                  {carga}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {cargas.length > 0 && (
            <View style={styles.pesoWrapper}>
              <Text style={styles.pesoLabel}>Peso acumulado</Text>
              <View style={styles.pesoBar}>
                <View style={[styles.pesoFill, { width: `${(cargas.length / CARGAS.length) * 100}%` }]} />
              </View>
              <Text style={styles.pesoText}>{cargas.length} de {CARGAS.length} cargas</Text>
            </View>
          )}
        </>
      )}

      {step === 'frase3' && (
        <ReflectivePhrase text="No todo lo que sostienes te está ayudando... algunas cosas te están hundiendo." />
      )}
    </SubLevelScreen>
  );
}

const styles = StyleSheet.create({
  cargasGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    marginVertical: spacing.md,
  },
  cargaChip: {
    borderRadius: borderRadius.full,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    backgroundColor: colors.white,
  },
  cargaChipSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  cargaText: {
    fontSize: fontSizes.sm,
    color: colors.text,
    fontWeight: '500',
  },
  cargaTextSelected: {
    color: colors.white,
    fontWeight: '700',
  },
  pesoWrapper: {
    marginTop: spacing.md,
    gap: spacing.xs,
  },
  pesoLabel: {
    fontSize: fontSizes.sm,
    fontWeight: '700',
    color: colors.text,
  },
  pesoBar: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  pesoFill: {
    height: '100%',
    backgroundColor: colors.accent,
    borderRadius: 4,
  },
  pesoText: {
    fontSize: fontSizes.xs,
    color: colors.textMuted,
  },
});
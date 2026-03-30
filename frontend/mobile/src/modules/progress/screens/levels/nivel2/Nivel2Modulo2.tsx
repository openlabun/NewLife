import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import SubLevelScreen, {
  MascotBubble, MultipleChoice, OpenQuestion, ReflectivePhrase, CompleteSentence,
} from '../SubLevelScreen';
import { colors, fontSizes, spacing, borderRadius } from '../../../../../constants/theme';

const MASCOT = require('../../../../../assets/images/mascotaestrella.png');

type Step = 'intro' | 'complete' | 'frase1' | 'q1' | 'frase2' | 'slider' | 'frase3' | 'open1';
const STEPS: Step[] = ['intro', 'complete', 'frase1', 'q1', 'frase2', 'slider', 'frase3', 'open1'];

export default function Nivel2Modulo2({ navigation }: any) {
  const [stepIndex, setStepIndex] = useState(0);
  const [complete, setComplete] = useState('');
  const [q1, setQ1] = useState<string | null>(null);
  const [slider, setSlider] = useState(50);
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
      introTitle="Abrirme a la posibilidad"
      introDescription="No se trata de creer completamente, sino de dejar una pequeña puerta abierta. El cambio empieza cuando dejas de decir 'no' automáticamente a todo lo que podría ayudarte."
    >
      {step === 'complete' && (
        <>
          <MascotBubble text="Completa esta frase:" />
          <CompleteSentence
            prefix='"Tal vez podría cambiar si..."'
            value={complete}
            onChange={setComplete}
          />
        </>
      )}

      {step === 'frase1' && (
        <ReflectivePhrase text="No necesitas certezas para empezar, solo un poco de apertura." />
      )}

      {step === 'q1' && (
        <>
          <MascotBubble text="¿Qué necesitas para empezar a confiar un poco más?" />
          <MultipleChoice
            options={[
              'Ver resultados',
              'Sentirme acompañado/a',
              'Entender mejor lo que me pasa',
              'Solo intentarlo',
            ]}
            selected={q1}
            onSelect={setQ1}
          />
        </>
      )}

      {step === 'frase2' && (
        <ReflectivePhrase text="El cambio no comienza cuando crees completamente, sino cuando dejas de cerrarte." />
      )}

      {step === 'slider' && (
        <>
          <MascotBubble text="¿Qué tan posible sientes el cambio en este momento?" />
          <View style={sliderStyles.wrapper}>
            <View style={sliderStyles.track}>
              <View style={[sliderStyles.fill, { width: `${slider}%` }]} />
            </View>
            <View style={sliderStyles.labelsRow}>
              {[0, 25, 50, 75, 100].map((val) => (
                <TouchableOpacity
                  key={val}
                  style={[sliderStyles.tick, slider === val && sliderStyles.tickSelected]}
                  onPress={() => setSlider(val)}
                >
                  <Text style={[sliderStyles.tickText, slider === val && sliderStyles.tickTextSelected]}>
                    {val}%
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </>
      )}

      {step === 'frase3' && (
        <ReflectivePhrase text="Darte una oportunidad no garantiza el resultado, pero negártela sí garantiza quedarte igual." />
      )}

      {step === 'open1' && (
        <>
          <MascotBubble text="¿Qué es lo peor que podría pasar si intentas confiar?" />
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

const sliderStyles = StyleSheet.create({
  wrapper: {
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
});
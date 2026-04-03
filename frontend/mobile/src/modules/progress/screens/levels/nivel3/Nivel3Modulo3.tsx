import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import SubLevelScreen, {
  MascotBubble, MultipleChoice, OpenQuestion, ReflectivePhrase, CompleteSentence,
} from '../SubLevelScreen';
import { colors, fontSizes, spacing, borderRadius } from '../../../../../constants/theme';

const MASCOT = require('../../../../../assets/images/mascotacorazon.png');

type Step = 'intro' | 'complete' | 'frase1' | 'eleccion' | 'frase2' | 'boton' | 'frase3' | 'reflexion';
const STEPS: Step[] = ['intro', 'complete', 'frase1', 'eleccion', 'frase2', 'boton', 'frase3', 'reflexion'];

export default function Nivel3Modulo3({ navigation }: any) {
  const [stepIndex, setStepIndex] = useState(0);
  const [complete, setComplete] = useState('');
  const [eleccion, setEleccion] = useState<string | null>(null);
  const [reflexion, setReflexion] = useState('');

  const step = STEPS[stepIndex];
  const isLast = stepIndex === STEPS.length - 1;

  const handleContinue = () => {
    if (isLast) navigation.navigate('LevelComplete', {
      levelNumber: 3,
      message: 'Entregar no es rendirse, es dejar de pelear una batalla que te está rompiendo.',
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
      continueLabel={isLast ? 'Finalizar nivel' : 'Continuar'}
      showIntro={step === 'intro'}
      introTitle="Decidir entregar"
      introDescription="Entregar es una decisión interna. No pasa porque todo esté resuelto, sino porque decides dejar de hacerlo solo/a."
    >
      {step === 'complete' && (
        <>
          <MascotBubble text="Completa esta frase:" />
          <CompleteSentence
            prefix='"Hoy dejo de intentar controlar..."'
            value={complete}
            onChange={setComplete}
          />
        </>
      )}

      {step === 'frase1' && (
        <ReflectivePhrase text="Entregar no es rendirse, es dejar de pelear una batalla que te está rompiendo." />
      )}

      {step === 'eleccion' && (
        <>
          <MascotBubble text="¿Qué significa para ti 'entregar'?" />
          <MultipleChoice
            options={[
              'Pedir ayuda',
              'Aceptar lo que no controlo',
              'Dejar de resistirme',
              'Confiar en algo más',
            ]}
            selected={eleccion}
            onSelect={setEleccion}
          />
        </>
      )}

      {step === 'frase2' && (
        <ReflectivePhrase text="No tienes que poder con todo para empezar a cambiar." />
      )}

      {step === 'boton' && (
        <>
          <MascotBubble text="¿Estás listo para soltar?" />
          <TouchableOpacity style={styles.acceptButton} onPress={handleContinue}>
            <Text style={styles.acceptButtonText}>Entrego esto</Text>
          </TouchableOpacity>
        </>
      )}

      {step === 'frase3' && (
        <ReflectivePhrase text="A veces el verdadero cambio empieza cuando dejas de intentarlo solo/a." />
      )}

      {step === 'reflexion' && (
        <>
          <MascotBubble text="¿Cómo se siente tomar esta decisión?" />
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
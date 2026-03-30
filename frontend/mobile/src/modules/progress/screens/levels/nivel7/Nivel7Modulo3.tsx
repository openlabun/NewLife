import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import SubLevelScreen, {
  MascotBubble, MultipleChoice, OpenQuestion, ReflectivePhrase,
} from '../SubLevelScreen';
import { colors, fontSizes, spacing, borderRadius } from '../../../../../constants/theme';

const MASCOT = require('../../../../../assets/images/mascotacorazon.png');

type Step = 'intro' | 'open1' | 'frase1' | 'eleccion' | 'frase2' | 'boton' | 'frase3' | 'reflexion';
const STEPS: Step[] = ['intro', 'open1', 'frase1', 'eleccion', 'frase2', 'boton', 'frase3', 'reflexion'];

export default function Nivel7Modulo3({ navigation }: any) {
  const [stepIndex, setStepIndex] = useState(0);
  const [open1, setOpen1] = useState('');
  const [eleccion, setEleccion] = useState<string | null>(null);
  const [reflexion, setReflexion] = useState('');

  const step = STEPS[stepIndex];
  const isLast = stepIndex === STEPS.length - 1;

  const handleContinue = () => {
    if (isLast) navigation.navigate('LevelComplete', {
      levelNumber: 7,
      message: 'Pedir cambio es reconocer que ya no quieres seguir igual.',
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
      introTitle="Pedir cambio conscientemente"
      introDescription="Este es un momento interno. No importa a quién o cómo lo hagas: pedir cambio es reconocer que necesitas algo distinto y estar dispuesto/a a aceptarlo."
    >
      {step === 'open1' && (
        <>
          <MascotBubble text="Escribe una petición personal. Puede ser a alguien, a la vida, o a ti mismo/a." />
          <OpenQuestion
            placeholder="Escribe aquí..."
            value={open1}
            onChange={setOpen1}
          />
        </>
      )}

      {step === 'frase1' && (
        <ReflectivePhrase text="Pedir cambio es reconocer que ya no quieres seguir igual." />
      )}

      {step === 'eleccion' && (
        <>
          <MascotBubble text="¿Qué estás pidiendo realmente?" />
          <MultipleChoice
            options={['Fuerza', 'Claridad', 'Apoyo', 'Cambio']}
            selected={eleccion}
            onSelect={setEleccion}
          />
        </>
      )}

      {step === 'frase2' && (
        <ReflectivePhrase text="No necesitas tener claro el camino, solo aceptar que necesitas uno nuevo." />
      )}

      {step === 'boton' && (
        <>
          <MascotBubble text="¿Estás listo/a para pedirlo?" />
          <TouchableOpacity style={styles.acceptButton} onPress={handleContinue}>
            <Text style={styles.acceptButtonText}>Pido cambio</Text>
          </TouchableOpacity>
        </>
      )}

      {step === 'frase3' && (
        <ReflectivePhrase text="A veces el cambio empieza cuando dejas de resistirte a recibirlo." />
      )}

      {step === 'reflexion' && (
        <>
          <MascotBubble text="¿Cómo se siente pedir esto?" />
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
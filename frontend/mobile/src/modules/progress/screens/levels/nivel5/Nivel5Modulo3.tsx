import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import SubLevelScreen, {
  MascotBubble, MultipleChoice, OpenQuestion, ReflectivePhrase,
} from '../SubLevelScreen';
import { colors, fontSizes, spacing, borderRadius } from '../../../../../constants/theme';

const MASCOT = require('../../../../../assets/images/mascotacorazon.png');

type Step = 'intro' | 'open1' | 'frase1' | 'boton' | 'frase2' | 'reflexion' | 'frase3' | 'eleccion';
const STEPS: Step[] = ['intro', 'open1', 'frase1', 'boton', 'frase2', 'reflexion', 'frase3', 'eleccion'];

export default function Nivel5Modulo3({ navigation }: any) {
  const [stepIndex, setStepIndex] = useState(0);
  const [open1, setOpen1] = useState('');
  const [reflexion, setReflexion] = useState('');
  const [eleccion, setEleccion] = useState<string | null>(null);

  const step = STEPS[stepIndex];
  const isLast = stepIndex === STEPS.length - 1;

  const handleContinue = () => {
    if (isLast) navigation.navigate('LevelComplete', {
      levelNumber: 5,
      message: 'Lo que se expresa, deja de pesar de la misma forma.',
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
      introTitle="Liberar"
      introDescription="Expresar lo que llevas dentro no soluciona todo, pero sí cambia algo: ya no lo estás cargando igual. Liberar es soltar un poco del peso."
    >
      {step === 'open1' && (
        <>
          <MascotBubble text="Escribe algo que nunca has dicho. Puede ser corto o largo." />
          <OpenQuestion
            placeholder="Escribe aquí..."
            value={open1}
            onChange={setOpen1}
          />
        </>
      )}

      {step === 'frase1' && (
        <ReflectivePhrase text="Lo que se expresa, deja de pesar de la misma forma." />
      )}

      {step === 'boton' && (
        <>
          <MascotBubble text="¿Estás listo para soltar esto?" />
          <TouchableOpacity style={styles.liberarButton} onPress={handleContinue}>
            <Text style={styles.liberarButtonText}>🕊️ Quiero soltar esto</Text>
          </TouchableOpacity>
        </>
      )}

      {step === 'frase2' && (
        <ReflectivePhrase text="No tienes que cargar todo en silencio para ser fuerte." />
      )}

      {step === 'reflexion' && (
        <>
          <MascotBubble text="¿Cómo se siente haberlo expresado?" />
          <OpenQuestion
            placeholder="Escribe aquí..."
            value={reflexion}
            onChange={setReflexion}
          />
        </>
      )}

      {step === 'frase3' && (
        <ReflectivePhrase text="A veces liberar no cambia el pasado, pero sí cambia cómo lo llevas." />
      )}

      {step === 'eleccion' && (
        <>
          <MascotBubble text="¿Te gustaría compartir esto con alguien en la vida real?" />
          <MultipleChoice
            options={['Sí', 'Tal vez después', 'No aún']}
            selected={eleccion}
            onSelect={setEleccion}
          />
        </>
      )}
    </SubLevelScreen>
  );
}

const styles = StyleSheet.create({
  liberarButton: {
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
  liberarButtonText: {
    color: colors.white,
    fontSize: fontSizes.lg,
    fontWeight: '700',
  },
});
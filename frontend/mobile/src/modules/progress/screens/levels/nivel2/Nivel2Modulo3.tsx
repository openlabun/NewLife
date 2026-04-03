import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import SubLevelScreen, {
  MascotBubble, MultipleChoice, OpenQuestion, ReflectivePhrase, CompleteSentence,
} from '../SubLevelScreen';
import { colors, fontSizes, spacing, borderRadius } from '../../../../../constants/theme';

const MASCOT = require('../../../../../assets/images/mascotacorazon.png');

type Step = 'intro' | 'open1' | 'frase1' | 'seleccion' | 'frase2' | 'accion' | 'frase3' | 'boton' | 'reflexion';
const STEPS: Step[] = ['intro', 'open1', 'frase1', 'seleccion', 'frase2', 'accion', 'frase3', 'boton', 'reflexion'];

export default function Nivel2Modulo3({ navigation }: any) {
  const [stepIndex, setStepIndex] = useState(0);
  const [open1, setOpen1] = useState('');
  const [seleccion, setSeleccion] = useState<string | null>(null);
  const [accion, setAccion] = useState<string | null>(null);
  const [reflexion, setReflexion] = useState('');

  const step = STEPS[stepIndex];
  const isLast = stepIndex === STEPS.length - 1;

  const handleContinue = () => {
    if (isLast) navigation.navigate('LevelComplete', {
      levelNumber: 2,
      message: 'Confiar no es eliminar la duda, es avanzar a pesar de ella.',
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
      introTitle="Primer acto de confianza"
      introDescription="La confianza no es solo una idea, es una acción. Empieza con algo pequeño: un paso, una decisión, un intento."
    >
      {step === 'open1' && (
        <>
          <MascotBubble text="Escribe algo en lo que sí puedes confiar hoy, aunque sea mínimo." />
          <OpenQuestion
            placeholder="Escribe aquí..."
            value={open1}
            onChange={setOpen1}
          />
        </>
      )}

      {step === 'frase1' && (
        <ReflectivePhrase text="Confiar no es eliminar la duda, es avanzar a pesar de ella." />
      )}

      {step === 'seleccion' && (
        <>
          <MascotBubble text="¿En qué podrías apoyarte ahora mismo?" />
          <MultipleChoice
            options={['Una persona', 'Un hábito', 'Una idea', 'Yo mismo/a']}
            selected={seleccion}
            onSelect={setSeleccion}
          />
        </>
      )}

      {step === 'frase2' && (
        <ReflectivePhrase text="Los grandes cambios empiezan con decisiones pequeñas que parecen insignificantes." />
      )}

      {step === 'accion' && (
        <>
          <MascotBubble text="Elige una acción para hoy:" />
          <MultipleChoice
            options={[
              'Hablar con alguien',
              'Escribir lo que siento',
              'Detenerme antes de reaccionar',
              'Intentar algo diferente',
            ]}
            selected={accion}
            onSelect={setAccion}
          />
        </>
      )}

      {step === 'frase3' && (
        <ReflectivePhrase text="No necesitas saber que funcionará, solo necesitas decidir no rendirte hoy." />
      )}

      {step === 'boton' && (
        <>
          <MascotBubble text="¿Estás listo para intentarlo?" />
          <TouchableOpacity style={styles.acceptButton} onPress={handleContinue}>
            <Text style={styles.acceptButtonText}>Voy a intentarlo</Text>
          </TouchableOpacity>
        </>
      )}

      {step === 'reflexion' && (
        <>
          <MascotBubble text="¿Cómo se siente dar este pequeño paso?" />
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
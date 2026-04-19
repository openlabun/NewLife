# Script para actualizar todos los módulos de niveles (1-12, 1-3)

$baseDir = "frontend/mobile/src/modules/progress/screens/levels"

# Template base para todos los módulos
$template = @'
import React, { useState } from 'react';
import { Alert } from 'react-native';
import SubLevelScreen, {
    MascotBubble, MultipleChoice, OpenQuestion, ReflectivePhrase,
} from '../SubLevelScreen';
import { useLevelProgress } from '../../../../../hooks/useLevelProgress';

const MASCOT = require('../../../../../assets/images/mascotalibro.png');

const CURRENT_LEVEL = <<LEVEL>>;
const CURRENT_SUBLEVEL = <<SUBLEVEL>>;

type Step = 'intro' | 'q1' | 'frase1' | 'q2' | 'frase2' | 'reflexion';
const STEPS: Step[] = ['intro', 'q1', 'frase1', 'q2', 'frase2', 'reflexion'];

export default function Nivel<<LEVEL>>Modulo<<SUBLEVEL>>({ navigation }: any) {
    const [stepIndex, setStepIndex] = useState(0);
    const [q1, setQ1] = useState<string | null>(null);
    const [q2, setQ2] = useState('');
    const [advancing, setAdvancing] = useState(false);

    const { progress, advance } = useLevelProgress();

    const step = STEPS[stepIndex];
    const isLast = stepIndex === STEPS.length - 1;

    const handleContinue = async () => {
        if (isLast) {
            setAdvancing(true);
            try {
                const newProgress = await advance();
                console.log('✅ Módulo completado. Nuevo progreso:', newProgress);

                Alert.alert(
                    '¡Felicidades!',
                    `Has completado el Módulo ${CURRENT_SUBLEVEL}. ${
                        newProgress.subnivel > CURRENT_SUBLEVEL
                            ? 'Siguiente módulo desbloqueado.'
                            : 'Completa los anteriores para continuar.'
                    }`,
                    [{ text: 'OK', onPress: () => navigation.navigate('Path') }]
                );
            } catch (error) {
                console.error('❌ Error guardando progreso:', error);
                Alert.alert('Error', 'No se pudo guardar tu progreso. Intenta de nuevo.');
            } finally {
                setAdvancing(false);
            }
        } else {
            setStepIndex(stepIndex + 1);
        }
    };

    const handleBack = () => {
        if (stepIndex === 0) {
            navigation.goBack();
        } else {
            setStepIndex(stepIndex - 1);
        }
    };

    return (
        <SubLevelScreen
            currentStep={stepIndex}
            totalSteps={STEPS.length - 1}
            moduleNumber={CURRENT_SUBLEVEL}
            mascot={MASCOT}
            onBack={handleBack}
            onContinue={handleContinue}
            continueLabel={isLast ? 'Completar módulo' : 'Continuar'}
            showIntro={step === 'intro'}
            introTitle="Paso <<LEVEL>>, Módulo <<SUBLEVEL>>"
            introDescription="Continúa tu camino en los 12 pasos de recuperación."
        >
            {step === 'q1' && (
                <>
                    <MascotBubble text="¿Cómo te sientes en este momento?" />
                    <MultipleChoice
                        options={['Bien', 'Neutral', 'Difícil', 'Reflexivo']}
                        selected={q1}
                        onSelect={setQ1}
                    />
                </>
            )}

            {step === 'frase1' && (
                <ReflectivePhrase text="Cada paso te acerca más a tu recuperación." />
            )}

            {step === 'q2' && (
                <>
                    <MascotBubble text="¿Qué aprendiste en este módulo?" />
                    <OpenQuestion
                        placeholder="Escribe aquí..."
                        value={q2}
                        onChange={setQ2}
                    />
                </>
            )}

            {step === 'frase2' && (
                <ReflectivePhrase text="Tu compromiso con ti mismo es el más importante." />
            )}

            {step === 'reflexion' && (
                <ReflectivePhrase text="Sigue adelante, cada paso cuenta." />
            )}
        </SubLevelScreen>
    );
}
'@

# Crear/actualizar todos los archivos
for ($nivel = 1; $nivel -le 12; $nivel++) {
    for ($modulo = 1; $modulo -le 3; $modulo++) {
        $nivelDir = "$baseDir/nivel$nivel"
        $fileName = "Nivel$nivel`Modulo$modulo.tsx"
        $filePath = Join-Path $nivelDir $fileName

        # Reemplazar placeholders
        $content = $template `
            -replace '<<LEVEL>>', $nivel `
            -replace '<<SUBLEVEL>>', $modulo

        # Escribir archivo
        Set-Content -Path $filePath -Value $content -Encoding UTF8

        Write-Host "✅ Actualizado: $fileName"
    }
}

Write-Host ""
Write-Host "🎉 ¡Todos los 36 módulos han sido actualizados exitosamente!"
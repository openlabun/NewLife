import { Animated } from 'react-native';
import { getTotalHeightUpTo } from './levelHeights';

export const performAnimatedScroll = (
    flatListRef: any,
    scrollAnimRef: any,
    hasScrolledRef: any,
    userLevel: number,
) => {
    if (hasScrolledRef.current || userLevel <= 1) return;
    
    hasScrolledRef.current = true;

    setTimeout(() => {
        // Calcular offset EXACTO basado en alturas reales
        const targetOffset = getTotalHeightUpTo(userLevel);

        console.log(`🎬 Nivel ${userLevel} - Offset exacto: ${targetOffset}px`);

        flatListRef.current?.scrollToIndex({
            index: Math.max(0, userLevel - 1),
            animated: false,
            viewPosition: 0,
        });

        setTimeout(() => {
            // UN ÚNICO spring con configuración underdamped para bounce natural
            // damping bajo + stiffness bajo = movimiento lento con rebote elástico
            Animated.spring(scrollAnimRef, {
                toValue: targetOffset,
                damping: 12,        // Bajo = más rebotes, más elástico
                stiffness: 25,      // Muy bajo = movimiento más lento
                mass: 1.5,          // Mayor masa = más inercia, movimiento pesado
                velocity: 0,
                restDisplacementThreshold: 0.5,
                restSpeedThreshold: 0.5,
                useNativeDriver: false,
            }).start(() => {
                console.log('✅ Scroll animado completado con bounce elástico natural');
            });

            const listenerId = scrollAnimRef.addListener((event: { value: number }) => {
                flatListRef.current?.scrollToOffset({ offset: event.value, animated: false });
            });
        }, 50);
    }, 100);
};
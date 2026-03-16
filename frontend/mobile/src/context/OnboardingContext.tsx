import React, { createContext, useContext, useState } from 'react';

type OnboardingData = {
  apodo?: string;
  pronombre?: string;
  ult_fecha_consumo?: string;
  motivo_sobrio?: string;
  gasto_semana?: number;
  telefono?: number;
  reg_lugar_riesgo?: boolean;
  comp_logros_comunid?: boolean;
  moment_motiv?: string;
  nombre_contacto?: string;
};

type OnboardingContextType = {
  data: OnboardingData;
  setField: (key: keyof OnboardingData, value: any) => void;
};

const OnboardingContext = createContext<OnboardingContextType>({} as OnboardingContextType);

export function OnboardingProvider({ children }: any) {
  const [data, setData] = useState<OnboardingData>({});

  const setField = (key: keyof OnboardingData, value: any) => {
    setData(prev => ({ ...prev, [key]: value }));
  };

  return (
    <OnboardingContext.Provider value={{ data, setField }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export const useOnboarding = () => useContext(OnboardingContext);
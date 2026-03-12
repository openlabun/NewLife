<div align="center">

# NewLife

[![Node.js](https://img.shields.io/badge/Node.js-%23339933.svg?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Roble](https://img.shields.io/badge/Roble-%23D71920.svg?style=for-the-badge&logo=cloud&logoColor=white)](https://roble.uninorte.edu.co/)
[![Next.js](https://img.shields.io/badge/Next.js-%23000000.svg?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)](https://nestjs.com/)
[![React](https://img.shields.io/badge/React-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React Native](https://img.shields.io/badge/React%20Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactnative.dev/)
[![Android Studio](https://img.shields.io/badge/Android%20Studio-3DDC84?style=for-the-badge&logo=androidstudio&logoColor=white)](https://developer.android.com/studio)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-%2306B6D4.svg?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Docker](https://img.shields.io/badge/Docker-%232496ED.svg?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![Figma](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/)
[![MIT License](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)


Aplicación móvil de acompañamiento para jóvenes en proceso de rehabilitación y post-rehabilitación por consumo problemático de alcohol.

[Introducción](#1-introducción) •
[Planteamiento del problema](#2-planteamiento-del-problema) •
[Restricciones y supuestos de diseño](#3-restricciones-y-supuestos-de-diseño) •
[Alcance](#4-alcance) •
[Objetivos](#5-objetivos) •
[Estado del arte](#6-estado-del-arte--soluciones-relacionadas) •
[Propuesta de solución](#7-propuesta-de-solución-alto-nivel) •
[Requerimientos preliminares](#8-requerimientos-preliminares) •
[Criterios de aceptación](#9-criterios-de-aceptación-iniciales) •
[Plan de trabajo](#10-plan-de-trabajo) •
[Referencias](#11-referencias)

</div>

## 1. Introducción
El **consumo problemático de alcohol en jóvenes colombianos** representa una de las principales preocupaciones de salud pública del país. En Barranquilla, ciudad donde la cultura del consumo está profundamente arraigada en la vida social y festiva, esta situación adquiere una dimensión crítica: estudios locales indican que el **74,1 % de los jóvenes ha consumido alcohol antes de los 18 años**, y que la edad promedio de inicio se sitúa alrededor de los 12 años *(Fundación Simón Bolívar, 2019)*.

A nivel nacional, la *Encuesta Nacional de Salud Mental* reporta que los adultos entre 18 y 44 años presentan las proporciones más altas de consumo perjudicial de alcohol en Colombia *(Ministerio de Salud y Protección Social, 2015)*, lo que evidencia la urgencia de desarrollar **herramientas de acompañamiento accesibles, sostenidas y culturalmente pertinentes**.

A pesar de los esfuerzos institucionales, el acceso a servicios especializados de rehabilitación continúa siendo limitado y, en muchos casos, estigmatizado. Colombia cuenta con entre **1,6 y 3 psiquiatras por cada 100.000 habitantes** *(El País, 2022)*, y entre el **84 % y el 92 % de las personas con trastornos mentales no reciben atención adecuada** *(Ministerio de Salud, 2015)*. En este contexto, las tecnologías móviles emergen como una oportunidad estratégica. El concepto de *mHealth (mobile health)* ha demostrado ser eficaz como complemento a procesos terapéuticos, al facilitar el registro de hábitos, el seguimiento emocional y el acceso a redes de apoyo *(WHO, 2021)*. Sin embargo, la mayoría de las aplicaciones disponibles en el mercado —como *I Am Sober*, *Sober Grid* o *Reframe*— presentan limitaciones en la forma en que abordan el proceso de recuperación. En muchos casos, estas herramientas se centran principalmente en funciones básicas como contadores de sobriedad o espacios de interacción abierta entre usuarios, dejando en segundo plano elementos como el **acompañamiento estructurado**, el **seguimiento del progreso personal** o la existencia de **entornos moderados** que brinden mayor seguridad durante las primeras etapas de recuperación *(Nahum-Shani et al., 2018)*.

El presente proyecto de grado parte del trabajo desarrollado en el semestre anterior por **Andrea Díaz De La Hoz**, cuyo resultado fue el diseño **UX/UI de alta fidelidad** de la aplicación *NewLife*: un sistema de acompañamiento para jóvenes barranquilleros entre 18 y 24 años en proceso de rehabilitación y post-rehabilitación por adicción al alcohol, tomando como caso de estudio la **Fundación Terapéutica Shalom de Puerto Colombia, Atlántico**. Dicho trabajo produjo un prototipo interactivo validado en *Figma*, una identidad gráfica unificada y material de comunicación visual.

Este proyecto asume la continuación natural de ese proceso: la **implementación técnica completa del sistema**, con el objetivo de transformar un diseño validado en un producto funcional y desplegado en producción.

La solución contempla **tres niveles de acceso**: un modo invitado con almacenamiento local, un usuario registrado con sincronización en la nube y un usuario con acceso a comunidades por invitación, administradas a través del panel web por líderes de fundaciones o grupos de apoyo como *Alcohólicos Anónimos*. Funcionalmente, la aplicación se organiza en **seis módulos principales** que abarcan acompañamiento emocional, seguimiento del progreso, contenido educativo, motivación y espacios comunitarios seguros, además de un panel de administración web para la gestión de comunidades y contenidos, y una *landing page* informativa.

El presente documento recoge la **formulación técnica integral del proyecto**. Se desarrolla a través del planteamiento del problema, las restricciones y supuestos de diseño, el alcance definido para el semestre, los objetivos general y específicos, el estado del arte, la propuesta de solución a alto nivel con la arquitectura del sistema, los requerimientos preliminares, los criterios de aceptación y el plan de trabajo. De esta manera, *NewLife* no solo representa la implementación técnica de un diseño previamente validado, sino la materialización de una **herramienta tecnológica con potencial impacto social en el contexto local**.

## 2. Planteamiento del problema
### 2.1 Descripción del problema

El **consumo problemático de alcohol en jóvenes universitarios de Barranquilla** constituye un fenómeno de alta prevalencia con consecuencias graves en la salud mental, el desempeño académico y la cohesión familiar y social. Según datos de la Universidad Simón Bolívar (2019), el **26,48 % de sus estudiantes presentan riesgo de consumo de alcohol**, y la *Encuesta Nacional de Salud Mental* reporta que los adultos entre 18 y 44 años concentran las proporciones más altas de consumo perjudicial en el país *(Ministerio de Salud y Protección Social, 2015)*. En Barranquilla, la normalización cultural del alcohol —acentuada por eventos masivos como el Carnaval, con **incrementos de ventas de hasta el 48,4 % en establecimientos de bebidas**— genera un entorno de alta exposición que dificulta la abstinencia incluso en personas con voluntad de recuperarse.

Una vez finalizado un programa de rehabilitación, el **riesgo de recaída se mantiene elevado**. Estudios en América Latina señalan que una proporción considerable de jóvenes egresados de tratamiento recae en el primer año posterior al alta, siendo los **primeros tres meses el periodo más crítico** *(Mazariegos, 2021)*. Entre los principales factores detonantes se encuentran la presión social, la disponibilidad de sustancias y, de manera determinante, la **ausencia de acompañamiento continuo** una vez concluida la fase residencial. Esta brecha en el seguimiento post-tratamiento representa el **núcleo del problema** que el presente proyecto busca atender.

El sistema de salud colombiano presenta **limitaciones estructurales** que agravan esta situación: el país cuenta con entre **1,6 y 3 psiquiatras por cada 100.000 habitantes** *(El País, 2022)*, y se estima que entre el **84 % y el 92 % de las personas con trastornos mentales no reciben atención adecuada** *(Ministerio de Salud, 2015)*. Las consultas breves en EPS, los altos costos de la atención privada y el estigma social asociado al alcoholismo reducen significativamente la adherencia a los tratamientos y la búsqueda de ayuda profesional. Frente a este panorama, las aplicaciones móviles de salud (*mHealth*) emergen como una **alternativa viable, escalable y de bajo costo** para complementar los procesos terapéuticos existentes.

Si bien existen aplicaciones internacionales orientadas a la sobriedad —como *I Am Sober*, *Sober Grid* o *Sunflower Sober*—, estas plataformas suelen centrarse en funciones generales como contadores de sobriedad o comunidades abiertas entre usuarios, sin integrar procesos de acompañamiento estructurado, seguimiento del progreso personal ni herramientas diseñadas para entornos de recuperación guiados. Tampoco integran mecanismos de control comunitario adaptados a la dinámica de fundaciones y grupos de apoyo locales como *Alcohólicos Anónimos*. Además, no ofrecen **modos de acceso diferenciado** que permitan a un usuario explorar la herramienta de forma anónima antes de comprometerse con un proceso de registro, lo que puede ser una barrera para poblaciones altamente estigmatizadas.

### 2.2 Pregunta problema

**¿Cómo puede el desarrollo de una aplicación móvil, construida sobre un diseño UX/UI validado y apoyada por un sistema de administración web, ofrecer acompañamiento continuo y personalizado a jóvenes barranquilleros entre 18 y 24 años en proceso de rehabilitación y post-rehabilitación por adicción al alcohol, integrando funcionalidades de seguimiento del progreso, motivación, cuidado y comunidad controlada, y asegurando su viabilidad técnica mediante una arquitectura modular escalable?**

### 2.3 Justificación

El presente proyecto se justifica desde **tres dimensiones complementarias**. Desde el punto de vista social, responde a una **necesidad real y documentada** de la población joven de Barranquilla que transita por procesos de rehabilitación: la necesidad de **acompañamiento constante, accesible y no estigmatizante** una vez concluida la etapa de tratamiento residencial. La aplicación convierte al usuario en **agente activo de su propia recuperación** al facilitarle el registro de hábitos, el seguimiento emocional y el acceso a redes de apoyo, sin reemplazar la atención profesional sino complementándola *(Norman, 2013)*.

Desde el punto de vista técnico, el proyecto representa una oportunidad de **materializar un diseño exhaustivamente validado en un producto funcional y desplegado**. El prototipo de alta fidelidad desarrollado en el semestre anterior fue evaluado por psicólogos, especialistas en UX/UI y una desarrolladora, quienes confirmaron su **pertinencia terapéutica y viabilidad técnica**. Construir la implementación sobre ese diseño permite reducir la incertidumbre en la toma de decisiones de producto y enfocar el esfuerzo del equipo en la **calidad de la arquitectura, la integración de sistemas y la experiencia de usuario en producción**.

Desde el punto de vista académico, el proyecto aborda de forma integrada **competencias centrales de la ingeniería de software**: diseño de arquitecturas modulares, desarrollo frontend y backend, integración con APIs institucionales, gestión de bases de datos, pruebas de calidad y despliegue en producción. La articulación entre el módulo social con comunidades controladas y el panel de administración web añade una **capa de complejidad técnica y de gobernanza de datos** que enriquece el alcance del proyecto y aporta valor diferencial frente a soluciones existentes.

### 2.4 Impacto esperado

Se espera que *NewLife* contribuya a **reducir la brecha de acompañamiento post-tratamiento** para jóvenes en recuperación en Barranquilla, ofreciendo una herramienta digital que fortalezca la **adherencia, la motivación y la autogestión del proceso de sobriedad**. A nivel comunitario, el módulo social con comunidades administradas por fundaciones y grupos de apoyo como *Alcohólicos Anónimos* busca replicar digitalmente la **estructura de acompañamiento par** que ha demostrado ser efectiva en los programas presenciales de recuperación. A nivel técnico, el sistema entregará una **base de código modular y documentada** que podrá ser mantenida, extendida y potencialmente adoptada por instituciones reales en fases posteriores del proyecto.

## 3. Restricciones y supuestos de diseño
### 3.1 Restricciones

Las restricciones del proyecto delimitan el espacio de solución técnica y organizativa dentro del cual el equipo debe operar. Se clasifican en **restricciones de alcance, tecnológicas, institucionales y de tiempo**.

#### 3.1.1 Restricciones de alcance

- La aplicación móvil está dirigida exclusivamente al acompañamiento en procesos de rehabilitación y post-rehabilitación por adicción al alcohol. No se contempla, en esta versión, la atención de otras sustancias psicoactivas.
- El módulo de comunidad (Social) no es de acceso público. Los usuarios solo pueden acceder a una comunidad mediante invitación explicita gestionada por un administrador.
- La aplicación no reemplaza ni suplanta la atención psicológica o medica profesional. Su rol es complementario y de acompañamiento.
- El sistema no implementara videollamadas, transmisiones en vivo ni integración con plataformas de mensajería externas como WhatsApp en la versión inicial.
- El mapa de zonas seguras e inseguras será de carácter referencial, basado en datos ingresados manualmente por el usuario o el administrador; no se implementará geolocalización en tiempo real en la primera versión.

#### 3.1.2 Restricciones tecnológicas

- El frontend móvil debe desarrollarse en React Native, compatible con iOS y Android, siguiendo el diseño de alta fidelidad entregado en Figma por el proyecto precedente.
- El backend debe implementarse con NestJS bajo una arquitectura de monolito modular, garantizando separación de responsabilidades por módulo de negocio.
- El panel de administración web y la landing page deben desarrollarse en NextJS.
- La autenticación de usuarios debe integrarse obligatoriamente con la API institucional Roble de la Universidad del Norte. No se implementará un sistema de autenticación propio independiente.
- El almacenamiento local del modo invitado estará sujeto a las capacidades nativas del dispositivo móvil; no se garantiza persistencia indefinida en caso de desinstalación de la app.
- La infraestructura de despliegue debe ser compatible con los recursos disponibles para el equipo en el marco académico del proyecto. No se contempla contratación de servicios en la nube de costo elevado.

#### 3.1.3 Restricciones institucionales

- El proyecto debe cumplir con los lineamientos académicos y el cronograma del proyecto de grado de la Universidad del Norte, con entrega final al cierre del semestre en curso.
- El equipo de desarrollo está conformado por tres personas, lo que limita la capacidad de desarrollo paralelo y exige una distribución eficiente de responsabilidades entre frontend, backend e integración.
- El tratamiento de datos personales de usuarios en situación de rehabilitación debe enmarcarse en los principios de la Ley 1581 de 2012 (Ley de Protección de Datos Personales de Colombia), garantizando confidencialidad y no divulgación de información sensible.

### 3.2 Supuestos de diseño

Los supuestos son condiciones que el equipo asume como verdaderas para efectos del diseño y desarrollo del sistema, sin que estén bajo su control directo. Si alguno de estos supuestos resultara falso, podría requerirse una revisión del alcance o la solución técnica.

- Se asume que la API de autenticación Roble de la Universidad del Norte estará disponible y operativa durante el periodo de desarrollo e integración del sistema.
- Se asume que el prototipo de alta fidelidad entregado en Figma por el proyecto precedente constituye la especificación visual y funcional de referencia, y que no sufrirá muchas modificaciones estructurales durante el desarrollo.
- Se asume que los usuarios objetivo cuentan con un dispositivo móvil (iOS o Android) con acceso a internet para las funciones que requieren sincronización en la nube, y con almacenamiento local suficiente para el modo invitado.
- Se asume que cada comunidad dentro del módulo Social contara con al menos un administrador activo responsable de la moderación de contenido y la gestión de invitaciones.
- Se asume que las pruebas de usabilidad con usuarios reales podrán realizarse con la participación de al menos cinco personas en proceso de rehabilitación o post-rehabilitación, en coordinación con una fundación o grupo de apoyo local.
- Se asume que el contenido educativo inicial (artículos, reflexiones, recursos sobre los 12 pasos) podrá ser cargado y administrado directamente desde el panel web por los administradores de cada comunidad, sin requerir intervención del equipo de desarrollo.
- Se asume que la mascota evolutiva y los activos gráficos del diseño (ilustraciones, iconos, paleta de colores e identidad visual) están disponibles en formatos exportables desde Figma para su uso directo en el desarrollo.

## 4. Alcance
### 4.1 Descripción general

El proyecto *NewLife* comprende el **diseño de arquitectura, desarrollo, integración y despliegue en producción** de un sistema de acompañamiento digital para jóvenes en proceso de rehabilitación y post-rehabilitación por adicción al alcohol. El sistema se compone de **tres elementos**: una aplicación móvil para iOS y Android, un panel de administración web y una *landing page* informativa. El desarrollo parte del **prototipo de alta fidelidad validado en Figma** por el proyecto precedente, adoptándolo como especificación funcional y visual de referencia.

El alcance incluye las fases de **desarrollo incremental por módulos**, integración frontend-backend, pruebas de calidad, pruebas de usabilidad con usuarios reales y despliegue final de todos los componentes del sistema.

### 4.2 Dentro del alcance

#### 4.2.1 Aplicación móvil (*React Native*)

- Pantalla de bienvenida e historieta interactiva de onboarding con la mascota evolutiva.
- Modulo Registro y Login con **tres modos de acceso**: invitado (local), registrado (nube) y con comunidad (invitación). Integración con la API institucional Roble.
- Modulo Inicio: dashboard con conteo de tiempo sobrio y dinero ahorrado, estado de la mascota, accesos rápidos y **Botón SOS con modo crisis**.
- Modulo Mi Progreso: check-in diario con registro emocional, calendario de sobriedad, graficas de evolución, historial de gratitud y nivel de avance en los **12 pasos**.
- Modulo Cuidado: contenido educativo, recordatorios y rutinas, directorio de profesionales y fundaciones, mapa referencial de zonas y contactos de emergencia.
- Modulo Motivación: frase motivacional del día, retos individuales, sistema de logros con medallas e insignias y mascota animada.
- Modulo Social: **comunidades cerradas con acceso por invitación**, publicaciones, foros de reflexión diaria, chats grupales y moderación de contenido por administrador.

#### 4.2.2 Panel de administración web y *landing page* (*NextJS*)

- Gestión de comunidades: creación, edición, eliminación y generación de invitaciones para nuevos miembros.
- Administración de usuarios por comunidad: roles, moderación de contenido y gestión de miembros.
- Gestión de contenido educativo: carga, edición y publicación de artículos, reflexiones y recursos del modulo Cuidado.
- Panel de **métricas agregadas de uso por comunidad**, sin exposición de datos individuales sensibles.
- *Landing page* informativa con acceso a descarga de la aplicación móvil.

#### 4.2.3 Backend y servicios (*NestJS* - monolito modular)

- API REST con módulos independientes por dominio: autenticación, usuarios, progreso, cuidado, motivación, comunidad y administración.
- Integración con la API Roble de la Universidad del Norte para autenticación institucional.
- Base de datos relacional con esquema para los **tres modos de acceso**: invitado, registrado y con comunidad.
- Sistema de **notificaciones push** para recordatorios de rutinas y alertas en fechas de riesgo.
- Almacenamiento local en dispositivo para modo invitado con migración automática de datos al registrarse.

#### 4.2.4 Calidad y despliegue

- Pruebas unitarias por modulo y pruebas de integración end-to-end.
- **Dos rondas de pruebas de usabilidad con usuarios reales** (n >= 5 por ronda), con análisis e iteración entre rondas.
- Despliegue de la aplicación móvil en Google Play.
- Despliegue del backend, panel de administración web y landing page en infraestructura de producción.
- Monitoreo post-lanzamiento, gestión de alertas y corrección de errores críticos (semanas 13-15).

### 4.3 Fuera del alcance

- **Atención clínica, psicológica o médica**. La aplicación no diagnostica ni reemplaza la intervención profesional.
- Soporte para sustancias psicoactivas distintas al alcohol en esta primera versión.
- Integración con plataformas de mensajería externas como WhatsApp o Telegram.
- Videollamadas, transmisiones en vivo o funciones de audio y video en tiempo real.
- Geolocalización en tiempo real para el mapa de zonas seguras e inseguras.
- Sistema de pagos, suscripciones o cualquier modelo de monetización.
- Internacionalización o adaptación a contextos culturales distintos al de Barranquilla, Colombia.
- Integración con sistemas de historia clínica electrónica o plataformas institucionales de salud.
- Versión web de la aplicación móvil; solo se desarrollan panel de administración y *landing page* en entorno web.

### 4.4 Resumen de entregables

La siguiente tabla resume los entregables principales del proyecto y su estado esperado al cierre del semestre:

| Entregable | Tecnología / Medio | Estado esperado |
|------------|-------------------|-----------------|
| Aplicacion movil *NewLife* (6 modulos) | React Native | Desplegada en Google Play |
| Panel de administracion web | NextJS | Desplegado en produccion |
| Landing page informativa | NextJS | Desplegada en produccion |
| API REST backend | NestJS | Desplegada en produccion |
| Base de datos relacional | PostgreSQL | Configurada en produccion |
| Integracion con API Roble | Backend | Funcional y validada |
| Pruebas unitarias e integracion | Backend + Frontend | Ejecutadas y documentadas |
| Pruebas de usabilidad (2 rondas) | n >= 5 usuarios | Documentadas con resultados |
| Documento tecnico del proyecto | Informe de grado | Entregado y sustentado |

## 5. Objetivos

### 5.1 Objetivo General

**Desarrollar e implementar la aplicación móvil *NewLife*, junto con su panel de administración web y landing page, como un sistema funcional y desplegado en producción que brinde acompañamiento continuo a jóvenes de Barranquilla entre 18 y 24 años en proceso de rehabilitación y post-rehabilitación por adicción al alcohol**, partiendo del diseño validado en Figma e implementando una **arquitectura de monolito modular**.

### 5.2 Objetivos Especificos

- **OE1.** Diseñar e implementar la **arquitectura técnica del sistema** bajo el patrón de monolito modular, definiendo los módulos de dominio (autenticación, usuarios, progreso, cuidado, motivación, comunidad y administración), y el esquema de base de datos relacional para los **tres modos de acceso**.

- **OE2.** Desarrollar los módulos frontend de la aplicación móvil (Bienvenida y Onboarding, Registro y Login, Inicio, Mi Progreso, Cuidado, Motivación y Social) siguiendo el **prototipo de alta fidelidad en Figma**, garantizando coherencia visual con la identidad grafica de *NewLife* y una **experiencia fluida en iOS y Android**.

- **OE3.** Implementar el modulo Social con un sistema de **comunidades cerradas por invitación**, incluyendo el panel de administración web en NextJS que permita a gestores de fundaciones y grupos de apoyo crear comunidades, gestionar miembros, moderar contenido y administrar recursos educativos, sin requerir intervención técnica del equipo de desarrollo.

- **OE4.** Ejecutar un proceso de **aseguramiento de calidad** con pruebas unitarias por modulo, pruebas de integración end-to-end y **dos rondas de pruebas de usabilidad con usuarios reales** en coordinación con una fundación local, documentando los hallazgos e incorporando iteraciones antes del despliegue en producción.

- **OE5.** Desplegar todos los componentes del sistema en producción (aplicación móvil en Google Play, backend en servidor, panel web y landing page en entorno web) y realizar el **monitoreo post-lanzamiento** para corregir errores críticos y asegurar la estabilidad del sistema al cierre del semestre.

## 6. Estado del arte / Soluciones relacionadas

El presente capitulo revisa el **estado del arte en tres dimensiones**: aplicaciones móviles de apoyo a la rehabilitación por adicción al alcohol, arquitecturas de software en sistemas de salud digital móvil, y enfoques de diseño centrado en el usuario para poblaciones vulnerables. Esta revisión identifica **brechas que *NewLife* busca cubrir** y justifica las decisiones técnicas adoptadas.

### 6.1 Aplicaciones móviles de apoyo a la sobriedad

En los últimos años ha crecido el número de aplicaciones móviles orientadas a apoyar procesos de rehabilitación por adicción al alcohol. Las más representativas son *I Am Sober*, *Sober Grid* y *Reframe*, cada una con enfoques distintos que permiten establecer comparaciones con *NewLife*.

#### 🔸 *I Am Sober*

*I Am Sober* es una de las aplicaciones más descargadas, con más de **cinco millones de usuarios**. Ofrece contador de sobriedad, afirmaciones diarias y comunidad pública. Sin embargo, carece de **contenido educativo estructurado**, no integra los **12 pasos como eje de progreso**, no ofrece **modos de acceso diferenciado** y su comunidad abierta puede ser un riesgo para usuarios en etapas tempranas que requieren entornos controlados *(I Am Sober, 2023)*.

#### 🔸 *Sober Grid*

*Sober Grid* enfatiza el componente social con una red de pares en recuperación y un mecanismo de apoyo de emergencia (*Cravings SOS*), similar al **Botón SOS de *NewLife***. Su comunidad abierta expone al usuario a interacciones no moderadas, no cuenta con **seguimiento de progreso terapéutico** ni integración con programas estructurados, y su mantenimiento ha sido discontinuo en los últimos años *(Sober Grid, 2022)*.

#### 🔸 *Reframe*

*Reframe* es una aplicación premium orientada a la reducción del consumo más que a la abstinencia total. Ofrece contenido basado en **neurociencia y mindfulness**. Su modelo de pago limita el acceso a poblaciones de bajos recursos, no contempla **comunidades moderadas** ni integración con los **12 pasos**, y carece de adaptación al contexto latinoamericano *(Reframe App, 2023)*.

#### 🔸 Aplicaciones en contexto hispanohablante

La revisión de aplicaciones en español en Google Play y App Store revela una **escasa oferta especializada**. Aplicaciones como *Sin Alcohol* o *Contador de Sobriedad* se limitan a contadores de tiempo y frases motivacionales, sin comunidad moderada ni contenido educativo estructurado. Ninguna integra **sistemas institucionales universitarios**, modos de acceso diferenciado, ni adaptación al contexto cultural de ciudades colombianas como Barranquilla.

En síntesis, el panorama actual evidencia **tres brechas que *NewLife* busca cubrir**:  
(1) **ausencia de comunidades moderadas con acceso controlado**,  
(2) **falta de adaptación cultural al contexto barranquillero**, y  
(3) **carencia de modos de acceso diferenciado que reduzcan la barrera de entrada para usuarios estigmatizados**.

### 6.2 Antecedentes del proyecto

El presente proyecto tiene como antecedente el trabajo desarrollado por Andrea Díaz De La Hoz, estudiante del programa de Diseño Gráfico de la Universidad del Norte, quien realizó, durante el segundo semestre de 2025, el diseño UX/UI de alta fidelidad de la aplicación *NewLife* como parte de su proyecto de grado.

Este trabajo se llevó a cabo con el acompañamiento y asesoría de docentes de la Universidad del Norte, quienes guiaron las diferentes etapas del proceso de investigación, diseño y validación de la propuesta. A lo largo del desarrollo se adoptó un enfoque de diseño centrado en el usuario, apoyado en la metodología de *Design Thinking*, la cual estructura el proceso en fases de empatía, definición del problema, ideación, prototipado y evaluación.

Durante la fase de investigación y empatía se realizaron actividades de trabajo de campo con la Fundación Terapéutica Shalom, incluyendo visitas a la institución y acercamientos con el contexto real de jóvenes en procesos de rehabilitación. En este proceso también se realizaron conversaciones y validaciones con profesionales del área de la salud, particularmente psicólogos vinculados a procesos terapéuticos, con el fin de asegurar que la propuesta respondiera a necesidades reales del proceso de recuperación.

Posteriormente se desarrollaron las fases de ideación y diseño, en las cuales se definieron la arquitectura de información, los flujos de interacción y la identidad visual de la aplicación. Como resultado de este proceso se construyó un prototipo interactivo de alta fidelidad en la herramienta *Figma*, el cual representa de forma detallada la estructura, navegación y comportamiento esperado de la aplicación.

El diseño fue sometido a pruebas de usabilidad y procesos de validación, con el objetivo de evaluar la claridad de la interfaz, la facilidad de navegación y la pertinencia de las funcionalidades propuestas. Estas pruebas permitieron realizar ajustes iterativos al diseño y consolidar una propuesta validada desde la perspectiva de experiencia de usuario.

A partir de este antecedente, el presente proyecto retoma el prototipo UX/UI validado como base conceptual y funcional, y se enfoca en su implementación tecnológica, desarrollando la arquitectura del sistema, los componentes de software y la integración entre la aplicación móvil, el backend y el panel de administración, con el objetivo de transformar el diseño propuesto en una aplicación completamente funcional.

### 6.3 Arquitecturas de software en sistemas de salud digital móvil

El diseño arquitectónico de sistemas de salud digital móvil ha evolucionado desde arquitecturas **monolíticas tradicionales** hacia **microservicios** y, más recientemente, hacia *monolitos modulares* como punto de equilibrio entre **simplicidad operativa** y **separación de responsabilidades** (Richardson, 2018).

#### 6.3.1 Monolito modular vs. microservicios

Los **microservicios** ofrecen **alta escalabilidad** y **despliegue independiente**, pero introducen **complejidad operativa significativa** para equipos pequeños: gestión de múltiples repositorios, comunicación entre servicios y mayor curva de aprendizaje (Fowler y Lewis, 2014).

Para proyectos con equipos reducidos y plazos acotados como *NewLife* (tres desarrolladores, un semestre), el patrón de *monolito modular* representa una alternativa más adecuada: permite **separación lógica de dominios** dentro de una **única base de código desplegable**, facilitando la **mantenibilidad** sin la sobrecarga operativa de los microservicios (Newman, 2021).

**NestJS** está diseñado nativamente para implementar este patrón mediante su sistema de módulos.

#### 6.3.2 React Native para desarrollo móvil multiplataforma

**React Native** es uno de los frameworks líderes para aplicaciones móviles multiplataforma. Su modelo de **componentes reutilizables** y la capacidad de compartir lógica entre **iOS y Android** lo hacen eficiente para equipos con recursos limitados (Meta, 2023).

Estudios comparativos con *Flutter* muestran que **React Native** presenta ventajas en **ecosistema de librerías** y **curva de aprendizaje** para equipos con experiencia en desarrollo web (Nawrocki et al., 2021).

En *NewLife*, donde el equipo posee conocimientos previos en *React*, esta elección minimiza la **curva de aprendizaje** y maximiza la **velocidad de desarrollo**.

#### 6.2.3 NextJS para el panel de administración web

**NextJS**, basado en *React*, es el framework de referencia para aplicaciones web con **renderizado híbrido** (*SSR/SSG/CSR*). Su uso en el panel de administración de *NewLife* permite aprovechar **capacidades de renderizado del lado del servidor**, **soporte nativo para rutas API** y un **ecosistema maduro de autenticación y gestión de sesiones** (Vercel, 2023).

Para la *landing page* informativa, el **renderizado estático** garantiza **tiempos de respuesta óptimos**.

### 6.4 Diseño centrado en el usuario en aplicaciones de salud mental

El diseño de aplicaciones para poblaciones en situación de vulnerabilidad exige principios de **diseño centrado en el usuario** que van más allá de la usabilidad convencional. La literatura especializada destaca tres dimensiones críticas: **accesibilidad emocional**, **reducción de barreras de entrada** y **privacidad como valor de diseño** (Torous et al., 2019).

#### 6.4.1 Accesibilidad emocional y diseño no estigmatizante

Norman (2013) señala que el **diseño emocional** opera en tres niveles: *visceral* (impresión estética), *conductual* (facilidad de uso) y *reflexivo* (el significado e identidad que el producto genera en el usuario).  

Para aplicaciones de **salud mental**, el nivel *reflexivo* es especialmente crítico: el usuario debe sentir que la herramienta lo comprende y acompaña sin juzgarlo.

El proyecto precedente incorporó estos principios en la **paleta de colores** (tonos cálidos y naturales), **tipografía accesible** (*Inter*), **lenguaje inclusivo** y una **mascota evolutiva** que personaliza el progreso sin imponer metas externas.

#### 6.4.2 Design Thinking como metodología de validación

El proyecto precedente aplicó **Design Thinking** en cinco etapas:  
- *Empatizar* (entrevistas con usuarios en rehabilitación y psicólogos de la Fundación Shalom)  
- *Definir* (síntesis de necesidades)  
- *Idear* (creación)  
- *Prototipar* (*Figma*)  
- *Testear* (pruebas de usabilidad con usuarios reales y expertos)  

Este proceso garantizó que el diseño de *NewLife* responda a **necesidades documentadas** y no a suposiciones del equipo (Brown, 2008).  

El presente proyecto hereda esta base validada y la extiende con **dos rondas adicionales de pruebas de usabilidad** durante el desarrollo.

#### 6.4.3 Gamificación en aplicaciones de salud

La incorporación de **gamificación** en aplicaciones de salud ha demostrado aumentar la **adherencia** y **motivación**. Según Cugelman (2013), las técnicas más efectivas incluyen el **progreso visible**, los **logros desbloqueables** y la **narrativa de avance personal**.

*NewLife* integra estos principios en el módulo *Motivación* mediante **retos**, **insignias** y una **mascota que evoluciona** con el tiempo de sobriedad.

La literatura señala que estos elementos deben alinearse con **metas intrínsecas del usuario** y no con competición externa, para ser efectivos en contextos de recuperación (Deterding et al., 2011).

### 6.5 Brecha identificada y aporte de NewLife

La revisión del estado del arte permite identificar que ninguna solución existente combina los siguientes atributos de forma integrada:

a) **Comunidades moderadas con acceso controlado por administrador**, adaptadas a la estructura de grupos de apoyo como Alcohólicos Anónimos.  
b) **Tres modos de acceso diferenciado** que reducen la barrera de entrada para usuarios estigmatizados.  
c) **Adaptación cultural, lingüística y de contenido** al contexto de Barranquilla, Colombia.  
d) Un **módulo de progreso estructurado alrededor de los 12 pasos** con *check-ins emocionales diarios*.

*NewLife* no pretende competir con soluciones internacionales consolidadas, sino cubrir una **necesidad específica y documentada en el contexto local**, donde la combinación de **alta prevalencia de consumo**, **estigma social**, **limitaciones del sistema de salud** y **ausencia de herramientas culturalmente adaptadas** crea una brecha que una aplicación móvil bien diseñada puede contribuir a cerrar.


## 7. Propuesta de solución (alto nivel)

Esta sección describe la **arquitectura técnica**, los **componentes del sistema** y las **decisiones de diseño** que conforman la propuesta de implementación de NewLife. La propuesta parte del prototipo validado en Figma por el proyecto precedente y lo materializa en un sistema *funcional, desplegado y mantenible*, diseñado para operar en el contexto real de jóvenes barranquilleros en proceso de rehabilitación por

### 7.1 Visión general del sistema 
NewLife es un sistema de acompañamiento digital compuesto por tres componentes principales que operan de manera integrada bajo una arquitectura cliente–servidor: (1) una aplicación móvil multiplataforma (iOS y Android) desarrollada en React Native, que constituye el punto de contacto directo con el usuario final; (2) un backend implementado en NestJS bajo el patrón de monolito modular, encargado de centralizar la lógica de negocio, la persistencia de datos y la integración con servicios externos mediante una API REST versionada; y (3) un panel de administración web junto con una landing page informativa desarrollados en NextJS, que permiten a los gestores de comunidades (fundaciones y grupos de apoyo) administrar el sistema sin requerir intervención técnica del equipo de desarrollo. 

Los tres componentes se articulan a través del backend, que actúa como único punto de entrada al sistema. La base de datos relacional es gestionada exclusivamente por el backend, garantizando la separación entre la capa de presentación y la capa de persistencia. Toda la comunicación se realiza mediante conexiones seguras (HTTPS). La autenticación de usuarios se delega a la API institucional Roble de la Universidad del Norte, lo que permite validar la identidad a través del proveedor institucional y mantener trazabilidad y control sobre los accesos dentro del contexto universitario. 

### 7.2 Arquitectura del sistema

#### Patrón arquitectónico: monolito modular 

El backend de NewLife sigue el patrón de monolito modular, en el que cada dominio funcional del sistema esta encapsulado en un módulo independiente con su propia capa de controladores, servicios y repositorios, pero todos conviven en una única aplicación desplegable. Los módulos definidos son: Autenticación, Usuarios, Progreso, Cuidado, Motivación, Comunidad y Administración. Cada módulo expone sus funcionalidades a través de endpoints REST versionados y puede evolucionar de forma relativamente independiente sin afectar a los demás, lo que facilita el mantenimiento y la extensión futura del sistema. 

#### Diagrama de componentes 

El sistema se organiza en cuatro capas principales: (1) capa de presentación, conformada por la aplicación movil React Native y el panel web NextJS; (2) capa de integración, conformada por la API REST de NestJS que actúa como único punto de entrada al sistema; (3) capa de dominio, conformada por los módulos de negocio del backend; y (4) capa de infraestructura, conformada por la base de datos relacional, el servicio de notificaciones push y la API externa Roble. Esta separación garantiza que los cambios en la presentación no afecten la lógica de negocio y viceversa. 

#### Modos de acceso al sistema 

Una de las decisiones de diseño centrales de NewLife es la implementación de tres modos de acceso diferenciados, orientados a reducir la barrera de entrada según el momento del proceso de recuperación del usuario. El modo invitado permite utilizar la aplicación sin registro, almacenando la información exclusivamente en el dispositivo. En este modo están disponibles los módulos Inicio, Cuidado y Motivación, junto con una versión limitada de Mi Progreso. 

El modo registrado habilita la sincronización de datos en la nube y el acceso completo a los módulos funcionales, con excepción del módulo Social. Finalmente, el modo con comunidad, activado mediante invitación de un administrador, permite el acceso al módulo Social y a las comunidades privadas correspondientes. 

La transición entre modos está diseñada para preservar la continuidad de la información: cuando un usuario se registra, los datos generados en modo invitado se migran automáticamente a la cuenta en la nube, garantizando consistencia y continuidad en el seguimiento del progreso. 

#### Niveles de Acceso y Roles de Usuario

El sistema NewLife implementa un modelo de control de acceso basado en roles (RBAC, Role-Based Access Control) que define cinco niveles jerárquicos de permisos. Este modelo garantiza que cada actor del sistema tenga acceso exclusivamente a las funcionalidades que le corresponden según su nivel de responsabilidad, protegiendo la privacidad de los usuarios y la integridad de las comunidades.

- **Superadmin:** El superadmin es el rol de máximo nivel del sistema. Tiene acceso completo a todos los módulos de la aplicación móvil, al panel de administración web y a las funciones de configuración global del sistema. Es responsable de:

  - Creación y gestión de comunidades
  - Creación y gestión de usuarios
  - Creación y gestión de moderadores de comunidad
  - Gestionar el contenido educativo del módulo Cuidado
  - Acceso a **todos** los modulos del sistema

> En el contexto del proyecto, este rol será ejercido por el equipo de desarrollo durante la fase de despliegue y monitoreo.

- **Moderador de Comunidad:** El moderador de comunidad es el rol asignado a gestores de fundaciones, líderes de grupos de apoyo u otras figuras de confianza dentro de una comunidad. Tiene acceso completo a todas las funcionalidades de la app como usuario regular, y además accede al **panel de administración** para gestionar su comunidad:

  - Editar y configurar la comunidad
  - Generar y gestionar invitaciones para nuevos miembros
  - Asignar y revocar roles de usuario dentro de la comunidad
  - Moderar contenido: eliminar publicaciones, comentarios y mensajes; suspender miembros

> Un moderador **no puede** acceder a las comunidades de otros moderadores ni a la configuración global del sistema.


- **Usuario Regular:** El usuario regular es el rol base para cualquier persona registrada que haya sido invitada a una comunidad. Tiene acceso completo a todos los módulos de la aplicación móvil:

  - Realizar check-ins diarios y registrar progreso
  - Acceder al contenido educativo y guardar favoritos
  - Activar el Botón SOS con modo crisis
  - **Publicar** en el feed de la comunidad
  - Comentar y reaccionar a publicaciones de otros miembros
  - Participar en foros de reflexión diaria
  - Usar el chat grupal

- **Usuario Solo Comentar y Chatear:** Este rol permite una incorporación gradual a la comunidad para usuarios que aún no se sienten listos para compartir públicamente. Tiene acceso completo a las funcionalidades individuales de la app (Inicio, Mi Progreso, Cuidado, Motivación), pero dentro del módulo Social su participación está restringida:

  - ✅ Comentar publicaciones de otros miembros
  - ✅ Reaccionar a contenido del feed
  - ✅ Participar en chats individuales y grupales
  - ❌ **No puede** crear publicaciones propias en el feed
  - ❌ **No puede** iniciar temas en los foros


- **Usuario Solo Lectura:** Diseñado para usuarios en etapas muy tempranas de recuperación que se benefician de la presencia comunitaria sin la presión de la interacción activa. Tiene acceso completo a todas las funcionalidades individuales de la app, pero dentro del módulo Social únicamente puede visualizar:

  - ✅ Ver el feed de publicaciones de la comunidad
  - ✅ Ver los foros y perfiles de otros miembros
  - ❌ **No puede** publicar, comentar ni reaccionar
  - ❌ **No puede** participar en chats
  - ❌ **No puede** guardar favoritos de contenido

### 7.3 Componentes del sistema 

#### Aplicación móvil (React Native) 

La aplicación móvil es el componente central de NewLife. Está estructurada en seis módulos funcionales, cada uno con su propia navegación interna y conjunto de pantallas, siguiendo fielmente el prototipo de alta fidelidad validado en Figma. La navegación principal utiliza un tab bar inferior con acceso a los módulos Inicio, Mi Progreso, Cuidado, Motivación y Social, complementado con un menú de perfil y configuración accesible desde el encabezado. 

El módulo Inicio actúa como dashboard central del usuario y es el primer punto de contacto tras el login. Muestra el contador de días sobrio, el dinero ahorrado estimado, el estado emocional del día, accesos directos a los demás módulos y el estado actual de la mascota evolutiva. El Botón SOS, elemento crítico para situaciones de crisis, está siempre visible en este módulo y despliega un modo de emergencia con respiraciones guiadas, frases motivadoras, ejercicios de distracción y acceso rápido a contactos de emergencia registrados por el usuario. 

El módulo Mi Progreso es el módulo más denso funcionalmente. Incluye un check-in diario con registro del estado emocional (mediante un selector visual de emociones), un calendario de sobriedad que marca los días de cumplimiento, graficas de evolución emocional y de racha de sobriedad, un historial de gratitud donde el usuario registra reflexiones diarias, y un tracker de los 12 pasos de Alcohólicos Anónimos donde puede registrar su avance e hitos en cada paso. 

El módulo Cuidado agrupa los recursos de apoyo al bienestar. Incluye una sección de contenido educativo (artículos, videos e infografías gestionados desde el panel web), un sistema de recordatorios y rutinas personalizables con notificaciones push, un directorio de profesionales de salud y fundaciones de apoyo locales, un mapa referencial de zonas seguras e inseguras, y una sección de contactos de emergencia. El módulo motivación ofrece una frase motivacional diaria (Solo por hoy), retos individuales con seguimiento de progreso, un sistema de logros con medallas e insignias desbloqueables, y la mascota evolutiva con expresiones animadas que reflejan el estado de sobriedad del usuario. 

El módulo Social implementa comunidades cerradas con acceso por invitación. Dentro de una comunidad, el usuario puede publicar reflexiones, comentar y reaccionar a publicaciones de otros miembros, participar en foros temáticos de reflexión diaria, y acceder a chats grupales. El contenido es moderado por el administrador de la comunidad. El perfil de usuario muestra el tiempo de sobriedad, los logros obtenidos y los contactos dentro de la comunidad. 

#### Backend (NestJS - monolito modular) 

El backend es el núcleo del sistema y esta implementado en NestJS siguiendo el patrón de monolito modular. Cada módulo de dominio (Autenticación, Usuarios, Progreso, Cuidado, Motivación, Comunidad y Administración) contiene su propia capa de controladores REST, servicios de lógica de negocio y repositorios de acceso a datos. La comunicación entre módulos se realiza a través de inyección de dependencias, evitando el acoplamiento directo entre dominios. 

El módulo de Autenticación integra la API Roble de la Universidad del Norte, gestionando el ciclo completo de autenticación: obtención de tokens, validación de sesiones, refresco de tokens y cierre de sesión. Para el modo invitado, el módulo genera identificadores anónimos locales que se asocian a una cuenta real cuando el usuario decide registrarse. El esquema de base de datos relacional esta diseñado para soportar los tres modos de acceso, con una separación clara entre datos locales (sincronizados bajo demanda) y datos de nube (sincronizados en tiempo real). 

El sistema de notificaciones push esta implementado a través de Firebase Cloud Messaging (FCM), con soporte para notificaciones programadas (recordatorios de rutinas, alertas de check-in diario) y notificaciones por evento (nuevos mensajes en comunidad, logros desbloqueados, alertas en fechas de riesgo como aniversarios o periodos de alta exposición como el Carnaval). 

#### Panel de administración web y landing page (NextJS) 

El panel de administración web está desarrollado en NextJS y está orientado a la gestión operativa del sistema por parte de fundaciones y grupos de apoyo. Permite a los gestores de comunidades realizar, sin intervención del equipo de desarrollo, las siguientes operaciones: crear, editar y eliminar comunidades; generar y administrar invitaciones para nuevos miembros; asignar y revocar roles administrativos dentro de cada comunidad; moderar contenido generado por los usuarios (publicaciones y comentarios), incluyendo la eliminación de contenido y la suspensión de cuentas; gestionar el contenido educativo del módulo Cuidado (creación, edición y publicación de artículos, videos e infografías); y consultar métricas agregadas de uso por comunidad, tales como número de usuarios activos, volumen de publicaciones y frecuencia de check-ins diarios, sin acceso a información individual sensible. 

La landing page corresponde a una página pública de carácter informativo que presenta el propósito del proyecto, sus módulos funcionales, el equipo desarrollador y los objetivos de la aplicación, incluyendo acceso directo a su descarga en Google Play. Esta página se genera mediante renderizado estático con NextJS, lo que permite optimizar tiempos de carga, mejorar el posicionamiento básico en buscadores y reducir la carga operativa del servidor. 

### 7.4 Estrategia de pruebas 

La estrategia de aseguramiento de calidad del sistema NewLife se estructura en tres niveles complementarios: pruebas unitarias, pruebas de integración y pruebas de usabilidad. 

Las pruebas unitarias se implementan por módulo en el backend utilizando Jest y por componente en el frontend móvil mediante React Native Testing Library. Estas pruebas cubren la lógica de negocio crítica del sistema, incluyendo el cálculo de rachas de sobriedad, la gestión de los modos de acceso (invitado, registrado y con comunidad), los flujos de autenticación y los mecanismos de moderación de contenido. Su propósito es validar el comportamiento aislado de servicios y funciones, reduciendo la probabilidad de regresiones ante cambios evolutivos. 

Las pruebas de integración validan el funcionamiento conjunto entre la aplicación móvil y el backend, verificando los flujos completos de interacción. Entre los escenarios evaluados se incluyen el proceso de inicio de sesión mediante la API institucional Roble, la sincronización de datos entre almacenamiento local y nube, la publicación y moderación de contenido en comunidades, y el envío y recepción de notificaciones push. Estas pruebas permiten identificar inconsistencias en el intercambio de datos y asegurar la correcta interoperabilidad entre componentes. 

Las pruebas de usabilidad se desarrollan en dos rondas con usuarios reales (n ≥ 5 por ronda), en coordinación con la Fundación Shalom. Este tamaño muestral se adopta como mínimo viable para la identificación de problemas recurrentes de interacción en estudios exploratorios. La primera ronda se ejecuta en la semana 9 con una versión funcional de los módulos Inicio, Mi Progreso y Cuidado, y se orienta a detectar dificultades de navegación, claridad del lenguaje y percepción emocional de la interfaz. La segunda ronda, realizada en la semana 12 con el sistema completo, evalúa la experiencia integral del usuario, incluyendo el módulo Social y el flujo de incorporación a comunidades. Los hallazgos obtenidos en cada ronda se documentan formalmente y se incorporan como iteraciones de mejora antes del despliegue en producción. 

### 7.5 Estrategia de despliegue 

El despliegue del sistema se estructura en tres frentes paralelos correspondientes a cada componente de la arquitectura. La aplicación móvil se publica en Google Play (Android), siguiendo el proceso de revisión y validación establecido por la plataforma. Para la generación de builds de producción se utiliza EAS Build (Expo Application Services), con un perfil de distribución configurado específicamente para el entorno productivo. 

El backend desarrollado en NestJS se despliega en un servidor con soporte para Node.js, utilizando variables de entorno gestionadas de forma segura para la configuración de credenciales y parámetros sensibles. El proceso de despliegue se automatiza mediante un flujo básico de integración y entrega continua (CI/CD), lo que permite compilar, validar y actualizar el servicio de manera controlada ante nuevas versiones del sistema. 

El panel de administración web y la landing page se despliegan en MyOpenLab, aprovechando la compatibilidad de NextJS con despliegues automatizados. Esta configuración permite compilación automática ante cambios en el repositorio, distribución mediante red de entrega de contenidos (CDN) y optimización de tiempos de carga para los usuarios finales. 

Durante las semanas 13 a 15 se realiza un periodo de monitoreo activo en entorno de producción. Este seguimiento incluye la detección y registro de errores mediante Sentry, la revisión periódica de métricas agregadas de uso y la atención a reportes provenientes de usuarios de prueba. Los errores clasificados como críticos se corrigen mediante actualizaciones priorizadas (hotfixes), mientras que los incidentes de menor severidad se documentan para su inclusión en iteraciones posteriores. 

## 8. Requerimientos preliminares

Los requerimientos del sistema *NewLife* se clasifican en **funcionales** y **no funcionales**.

Los **requerimientos funcionales** describen las capacidades y comportamientos específicos que el sistema debe proveer a sus usuarios.

Los **requerimientos no funcionales** establecen los atributos de calidad, restricciones técnicas y criterios de rendimiento que el sistema debe cumplir.

Esta especificación preliminar se basa en el análisis del **prototipo validado en Figma**, las necesidades identificadas en el proceso de **diseño centrado en el usuario** del proyecto precedente, y las restricciones técnicas e institucionales definidas en la sección 3.

### 8.1 Requerimientos Funcionales

#### RF-01 a RF-05: Autenticación y modos de acceso

- **RF-01.** El sistema debe permitir al usuario acceder a la aplicación en **modo invitado**, sin necesidad de crear una cuenta, con datos almacenados localmente en el dispositivo y acceso a los módulos *Inicio*, *Cuidado*, *Progreso* y *Motivación*.

- **RF-02.** El sistema debe permitir al usuario registrarse e iniciar sesión mediante la **API institucional Roble de la Universidad del Norte**, habilitando la sincronización de datos en la nube y el acceso completo a todos los módulos excepto el *Social*.

- **RF-03.** El sistema debe permitir la **migración automática de los datos locales** del modo invitado a la cuenta del usuario al momento de registrarse, sin pérdida de información.

- **RF-04.** El sistema debe permitir que un administrador invite a un usuario registrado a una comunidad, activando el modo con comunidad y habilitando el acceso al módulo *Social*.

- **RF-05.** El sistema debe gestionar el **cierre de sesión del usuario**, invalidando el token activo y limpiando los datos de sesión en el dispositivo.


#### RF-06 a RF-08: Módulo Inicio y SOS

- **RF-06.** El sistema debe mostrar en el dashboard de *Inicio*:
  - Contador de días consecutivos sobrio  
  - Dinero ahorrado estimado  
  - Estado emocional del último check-in  
  - Estado actual de la mascota evolutiva  

- **RF-07.** El sistema debe proveer un **botón SOS siempre visible** que active un modo de crisis con:
  - Frases motivadoras  
  - Ejercicio de respiración guiada  
  - Ejercicio de distracción mental  
  - Acceso directo a contactos de emergencia  

- **RF-08.** El sistema debe enviar **notificaciones push preventivas** en fechas de riesgo configuradas (aniversarios, periodos culturales de alta exposición) con mensaje de apoyo personalizado.


#### RF-09 a RF-13: Módulo Mi Progreso

- **RF-09.** El sistema debe permitir realizar un **check-in diario emocional** con registro de fecha y hora.

- **RF-10.** El sistema debe mostrar un **calendario de sobriedad** con marcación diaria según cumplimiento.

- **RF-11.** El sistema debe mostrar **gráficas de evolución emocional y racha de sobriedad**, con filtros por semana, mes y total acumulado.

- **RF-12.** El sistema debe permitir registrar entradas en un **historial de gratitud**, con texto libre y opción de marcar favoritas.

- **RF-13.** El sistema debe mostrar los **12 pasos del programa de Alcohólicos Anónimos** y permitir registrar avance, notas y fechas de inicio y culminación.


#### RF-14 a RF-20: Módulos Cuidado y Motivación

- **RF-14.** El sistema debe mostrar **contenido educativo** gestionado desde el panel web, con filtros y opción de favoritos.

- **RF-15.** El sistema debe permitir crear **recordatorios y rutinas personalizables** con notificaciones push.

- **RF-16.** El sistema debe mostrar un **directorio de profesionales y fundaciones locales** con información de contacto.

- **RF-17.** El sistema debe permitir gestionar **contactos de emergencia personales** accesibles desde el modo SOS.

- **RF-18.** El sistema debe mostrar una **frase motivacional diaria** (*Solo por hoy*) y retos individuales activos con seguimiento.

- **RF-19.** El sistema debe otorgar **logros e insignias** al cumplir hitos de sobriedad y mostrar notificación push al desbloquearlos.

- **RF-20.** El sistema debe mostrar una **mascota evolutiva** cuya apariencia cambie según el progreso del usuario.


#### RF-21 a RF-26: Módulo Social y Comunidades

- **RF-21.** Los administradores deben poder crear **comunidades cerradas** y generar invitaciones individuales o masivas.

- **RF-22.** Los miembros deben poder publicar, comentar y reaccionar dentro de la comunidad.

- **RF-23.** El sistema debe proveer **foros de reflexión diaria** por comunidad.

- **RF-24.** El sistema debe permitir **chat individual y grupal** dentro de la comunidad.

- **RF-25.** El administrador debe poder **moderar contenido y suspender miembros**.

- **RF-26.** El sistema debe mostrar el **perfil del usuario dentro de la comunidad**, incluyendo tiempo de sobriedad y logros (si el usuario los hace visibles).


#### RF-27 a RF-30: Panel de Administración Web

- **RF-27.** El panel debe permitir gestionar comunidades y roles de usuarios.

- **RF-28.** El panel debe permitir crear y publicar **contenido educativo** para el módulo *Cuidado*.

- **RF-29.** El panel debe mostrar **métricas agregadas por comunidad** sin exponer datos individuales.

- **RF-30.** La *landing page* debe mostrar información pública sobre *NewLife* y acceso directo a descarga en Google Play.

### 8.2 Requerimientos No Funcionales

Los requerimientos no funcionales definen los **atributos de calidad**, restricciones técnicas y criterios de desempeño que el sistema *NewLife* debe cumplir para garantizar una experiencia segura, eficiente y sostenible.

##### Rendimiento

- **RNF-01.** El tiempo de carga inicial de la aplicación móvil (desde el *splash screen* hasta el dashboard de *Inicio*) no debe superar los **3 segundos** en condiciones de conexión 4G.

- **RNF-02.** El tiempo de respuesta de los endpoints del **API REST** no debe superar los **500 ms** para el percentil 95 de las solicitudes bajo carga normal (hasta 100 usuarios concurrentes).

- **RNF-03.** El sistema de **notificaciones push** debe entregar las notificaciones programadas con un margen de tolerancia máximo de **2 minutos** respecto a la hora configurada.


#### Seguridad y privacidad

- **RNF-04.** Toda la comunicación entre los clientes (app móvil y panel web) y el backend debe realizarse sobre **HTTPS** con certificados **SSL válidos**.

- **RNF-05.** Los datos personales de los usuarios deben almacenarse **cifrados en reposo** en la base de datos. Las contraseñas y tokens de sesión nunca deben almacenarse en texto plano.

- **RNF-06.** El sistema debe cumplir con los principios de la **Ley 1581 de 2012** (Protección de Datos Personales de Colombia): finalidad, libertad, veracidad, transparencia, acceso y circulación restringida, seguridad y confidencialidad.

- **RNF-07.** Los datos de **salud mental y progreso terapéutico** del usuario (check-ins, avance en 12 pasos, historial de gratitud) deben ser accesibles exclusivamente por el propio usuario y nunca compartidos con administradores de comunidad ni terceros.


#### Usabilidad y accesibilidad

- **RNF-08.** La aplicación móvil debe ser usable por un usuario sin experiencia técnica previa: todas las acciones principales deben ser alcanzables en no más de **3 interacciones** desde el dashboard de *Inicio*.

- **RNF-09.** El lenguaje de la interfaz debe ser **claro, empático y no estigmatizante**. Los mensajes de error y confirmación deben estar redactados en **español colombiano informal y de apoyo**, evitando términos clínicos o juiciosos.

- **RNF-10.** La aplicación debe superar un **score SUS (System Usability Scale) de 70 puntos** en pruebas de usabilidad con usuarios reales.


#### Disponibilidad y mantenibilidad

- **RNF-11.** El backend y el panel web deben estar disponibles al menos el **99% del tiempo** durante el periodo de pruebas con usuarios reales (semanas 9 a 15), excluyendo ventanas de mantenimiento programadas.

- **RNF-12.** La arquitectura de **monolito modular** debe permitir que un módulo pueda ser modificado o extendido sin requerir cambios en los demás módulos, siempre que la interfaz pública del módulo (endpoints y contratos de datos) no cambie.

- **RNF-13.** El código fuente del proyecto debe estar versionado en un repositorio **Git**, con ramas separadas por *feature*, flujo de **Pull Request** para integración y documentación de los endpoints de la API mediante **OpenAPI (Swagger)**.


#### Compatibilidad

- **RNF-14.** La aplicación móvil debe ser compatible con dispositivos **iOS 14 o superior** y **Android 10 (API level 29) o superior**, cubriendo al menos el 90% de los dispositivos activos en el mercado colombiano.

- **RNF-15.** El panel de administración web debe ser funcional en los navegadores **Chrome, Firefox, Edge y Safari** en sus versiones más recientes, con un diseño responsivo optimizado para pantallas de **13 pulgadas o mayores**.


## 9. Criterios de aceptación iniciales

Los **criterios de aceptación** definen las condiciones mínimas que el sistema *NewLife* debe cumplir para que cada requerimiento se considere implementado correctamente.

Están organizados por módulo funcional y por categoría de requerimiento no funcional, y serán utilizados como base para las **pruebas de validación** y las rondas de **pruebas de usabilidad con usuarios reales**.

Un requerimiento se considera aceptado cuando **todos sus criterios son verificados y aprobados** por el equipo de desarrollo y el tutor del proyecto.


### 9.1 Criterios para Requerimientos Funcionales

#### Autenticación y modos de acceso

- **CA-RF01.** El usuario puede abrir la aplicación y acceder al dashboard de *Inicio* sin registrarse. Los módulos *Inicio*, *Cuidado* y *Motivación* son navegables. Los datos generados se persisten localmente tras cerrar y reabrir la app.

- **CA-RF02.** El usuario puede iniciar sesión con sus credenciales. Tras el login, la aplicación muestra el dashboard con datos sincronizados en la nube y el módulo *Social* visible (si tiene comunidad asignada).

- **CA-RF03.** Un usuario en modo invitado que se registra visualiza sus datos previos disponibles en su cuenta registrada sin ingreso manual.

- **CA-RF04.** Un usuario recibe una invitación a una comunidad, la acepta desde la aplicación y queda visible dentro del módulo *Social* con acceso a publicaciones, foros y chats.

- **CA-RF05.** Al cerrar sesión, la aplicación regresa a la pantalla de bienvenida y no permite acceder a datos sin autenticación.


#### Módulo Inicio y SOS

- **CA-RF06.** El dashboard muestra correctamente días sobrio, dinero ahorrado, estado emocional y estado de la mascota. Los valores cambian coherentemente al actualizar el check-in.

- **CA-RF07.** Al presionar el botón SOS se despliega en menos de 1 segundo una pantalla de crisis con: frases motivadoras, respiración guiada, ejercicio de distracción y contactos de emergencia con opción de llamada directa.

- **CA-RF08.** El usuario recibe notificación push en la fecha de riesgo configurada (±2 minutos). La notificación es visible aunque la app esté cerrada.


#### Módulo Mi Progreso

- **CA-RF09.** El usuario puede completar el check-in diario con selector visual. El registro aparece con fecha y hora correctas. Solo se permite uno por día calendario.

- **CA-RF10.** El calendario muestra correctamente días marcados según historial. El mes actual es visible por defecto.

- **CA-RF11.** Las gráficas se renderizan correctamente con al menos 7 días de datos. Los filtros modifican el rango visible.

- **CA-RF12.** El usuario puede crear entrada de gratitud, verla ordenada por fecha, marcarla como favorita y filtrar favoritas.

- **CA-RF13.** El usuario puede marcar los 12 pasos como iniciados o completados, agregar nota y visualizar fechas registradas.


#### Módulos Cuidado y Motivación

- **CA-RF14.** El usuario puede navegar contenido educativo, filtrar por categoría y guardar favoritos. Cambios desde el panel web se reflejan en la app en menos de 1 minuto.

- **CA-RF15.** El usuario puede crear recordatorio con hora y repetición. La notificación push se recibe aunque la app esté cerrada.

- **CA-RF16.** El directorio muestra al menos 3 entradas con información legible y teléfono marcable.

- **CA-RF17.** El usuario puede gestionar contactos de emergencia. Estos aparecen en el modo SOS con llamada directa.

- **CA-RF18.** La frase del día cambia cada día. Los retos muestran progreso y al completarse pasan al historial.

- **CA-RF19.** Al cumplir un hito, el usuario recibe notificación push y la insignia aparece en su perfil sin duplicación.

- **CA-RF20.** La mascota cambia según rango de sobriedad y muestra animación al completar check-in.


#### Módulo Social y Comunidades

- **CA-RF21.** El administrador puede crear comunidad, generar invitación y el usuario puede unirse desde la app.

- **CA-RF22.** El usuario puede publicar texto. Otros miembros lo ven en menos de 5 segundos. Comentarios y reacciones son visibles para todos.

- **CA-RF23.** El administrador puede configurar tema del foro diario. Las respuestas aparecen en orden cronológico.

- **CA-RF24.** El chat individual entrega mensajes en tiempo real o con máximo 2 segundos de latencia en 4G.

- **CA-RF25.** El administrador puede eliminar contenido y suspender miembros. El contenido desaparece del feed y el miembro suspendido no puede publicar.

- **CA-RF26.** El perfil muestra tiempo de sobriedad, logros y avance en 12 pasos si el usuario lo ha configurado como visible.


#### Panel de administración web

- **CA-RF27.** El administrador puede crear, editar y eliminar una comunidad desde el panel web. Los cambios se reflejan en la app móvil en menos de 1 minuto. El administrador puede cambiar el rol de un miembro entre administrador y miembro regular.

- **CA-RF28.** El administrador puede crear un artículo con título, cuerpo de texto, categoría e imagen, guardarlo como borrador y publicarlo. Al publicarlo, aparece visible en el módulo *Cuidado* de la app móvil en menos de 1 minuto.

- **CA-RF29.** El panel de métricas muestra correctamente el número de miembros activos en los últimos 7 días, el total de publicaciones en ese periodo y el promedio de check-ins diarios, sin mostrar datos individuales de usuarios.

- **CA-RF30.** La *landing page* es accesible desde navegador web y muestra la descripción de *NewLife*, los módulos principales y los botones de descarga en Google Play con el enlace correctos.


### 9.2 Criterios para Requerimientos No Funcionales

#### Rendimiento

- **CA-RNF01.** Se mide el tiempo desde el inicio de la app hasta la carga completa del dashboard de *Inicio* en un dispositivo de gama media con conexión 4G. El resultado es ≤ 3 segundos en al menos 9 de cada 10 mediciones.

- **CA-RNF02.** Se ejecuta una prueba de carga con hasta 100 usuarios concurrentes contra la API REST. El percentil 95 de los tiempos de respuesta es ≤ 500 ms y la tasa de error es < 1%.

- **CA-RNF03.** Se programa una notificación push para una hora determinada y se verifica su entrega. La notificación llega dentro de los 2 minutos posteriores en al menos 9 de cada 10 pruebas.


#### Seguridad y privacidad

- **CA-RNF04.** Al inspeccionar el tráfico de red con herramienta de proxy, todas las solicitudes al backend usan HTTPS. No existen llamadas en HTTP plano.

- **CA-RNF05.** Al revisar la base de datos, los datos personales sensibles aparecen cifrados. Las contraseñas no se almacenan en texto plano, solo hashes con sal.

- **CA-RNF06.** El sistema cuenta con una política de privacidad accesible desde la app y la landing page conforme a la Ley 1581 de 2012. El usuario debe aceptarla durante el registro.

- **CA-RNF07.** Al autenticarse como administrador y consultar el detalle de un usuario, los endpoints no retornan datos de check-ins, avance en 12 pasos ni historial de gratitud.



#### Usabilidad

- **CA-RNF08.** En la primera ronda de pruebas, al menos 4 de cada 5 usuarios completan tareas clave (check-in, botón SOS, guardar favorito) sin ayuda.

- **CA-RNF09.** En la primera ronda, ningún participante menciona espontáneamente términos como "confuso", "raro" o "incómodo" sobre el lenguaje de la interfaz. No se registran comentarios negativos sobre el tono.

- **CA-RNF10.** El promedio del score SUS en la segunda ronda de pruebas es ≥ 70/100.



#### Disponibilidad y mantenibilidad

- **CA-RNF11.** Durante semanas 9 a 15, el uptime del backend y panel web es ≥ 99%, excluyendo mantenimientos programados con aviso de 24 horas.

- **CA-RNF12.** Se agrega un nuevo endpoint a un módulo sin modificar otros módulos. Los tests de integración restantes pasan sin cambios.

- **CA-RNF13.** El repositorio Git contiene ramas separadas de `main`, al menos un Pull Request documentado por feature y documentación Swagger accesible en `/api/docs` en producción.


#### Compatibilidad

- **CA-RNF14.** La app se instala y ejecuta correctamente en al menos un dispositivo iOS 14+ y un Android 10+, sin errores críticos ni crashes en pruebas de usabilidad.

- **CA-RNF15.** El panel web opera correctamente en Chrome, Firefox y Edge (versiones actuales). Las acciones principales funcionan sin errores en los tres navegadores.


## 10. Plan de trabajo

El plan de trabajo de **NewLife** comprende **11 semanas de ejecución**, desde la **semana 5 hasta la semana 15** del semestre. Está organizado en **cuatro fases secuenciales con solapamiento controlado**:

- **Fundación técnica** (semanas 5–6)  
- **Desarrollo de módulos** (semanas 6–11)  
- **Calidad y usabilidad** (semanas 9–12)  
- **Despliegue y cierre** (semanas 11–15)  

El equipo está conformado por **tres integrantes con roles diferenciados**, pero con colaboración cruzada en integración y pruebas.

### 10.1 Equipo de desarrollo y roles

**Zharick Oviedo** asume el rol principal de desarrollo **frontend móvil (React Native)** y es responsable de los módulos:

- **Bienvenida / Onboarding**
- **Inicio** (incluyendo el botón **SOS**)
- **Mi Progreso**
- Integración de **notificaciones push** en el cliente

**Vanessa Diaz** asume el rol principal de desarrollo **backend (NestJS)** y es responsable de:

- Arquitectura del **monolito modular**
- Módulos de **Autenticación** (integración Roble), **Usuarios**, **Progreso** y **Cuidado** en el servidor
- Gestión del esquema de base de datos

**Franklin Amador** asume el rol principal de:

- Desarrollo del módulo **Social**
- Desarrollo del **panel de administración web (NextJS)**
- Desarrollo de la **landing page**
- Liderazgo del proceso de **pruebas de usabilidad**
- Coordinación con la fundación local

Los tres integrantes participan conjuntamente en:

- Sesiones de **integración frontend–backend**
- **Pruebas de calidad**
- **Despliegue en producción**

Todo el proceso se realiza bajo la tutoría de **Augusto Salazar**.


### 10.2 Fases y actividades por semana

#### **Semana 5 – Fundación técnica**

- Configuración del repositorio **Git** con estructura de ramas (*main*, *develop*, *feature/*) y pipeline básico de **CI/CD**.
- Diseño y migración del **esquema de base de datos relacional** (entidades, relaciones, índices críticos).
- Implementación del módulo de **Autenticación en NestJS**:
  - Integración con API Roble (*OAuth 2.0*)
  - Generación y validación de **JWT** propios
  - Gestión de los tres modos de acceso
- Configuración del proyecto **React Native**:
  - Navegación base (*React Navigation*)
  - Sistema de temas (paleta de colores, tipografía *Inter*)
  - Estructura de carpetas por módulo
- Implementación de:
  - Pantalla de **Bienvenida**
  - Historieta de **Onboarding**
  - Flujo completo de **Registro y Login**
  - Migración de datos de modo invitado a cuenta registrada

#### **Semana 6 – Módulo Inicio y backend base**

- Implementación del **dashboard de Inicio**:
  - Conteo de días sobrio
  - Dinero ahorrado
  - Estado de la mascota
  - Accesos rápidos
  - Botón **SOS** con modo crisis completo
- Implementación de módulos backend:
  - **Usuarios**
  - **Progreso**
  - Endpoints para:
    - Check-in diario
    - Calendario de sobriedad
    - Historial de gratitud
    - Tracker de 12 pasos
- Configuración de **Firebase Cloud Messaging (FCM)** en backend y app móvil para notificaciones push.
- Inicio del desarrollo del **panel de administración web (NextJS)**:
  - Autenticación de administradores
  - Estructura de navegación del panel

#### **Semana 7 – Módulo Mi Progreso**

- Implementación completa del módulo **Mi Progreso** en la app móvil:
  - Check-in diario con selector visual de emociones
  - Calendario de sobriedad
  - Gráficas de evolución (*emocional y racha*)
  - Historial de gratitud
  - Tracker de 12 pasos
- Integración de **Mi Progreso** con endpoints del backend:
  - Sincronización en la nube para modo registrado
  - Almacenamiento local para modo invitado
- Inicio del módulo **Cuidado** en el backend:
  - Endpoints para contenido educativo
  - Recordatorios
  - Directorio de profesionales

#### **Semana 8 – Módulo Cuidado**

- Implementación completa del módulo **Cuidado** en la app móvil:
  - Listado y detalle de contenido educativo
  - Filtros y sistema de favoritos
  - Sistema de recordatorios con **notificaciones push**
  - Directorio de profesionales y fundaciones
  - Mapa referencial de zonas
  - Gestión de contactos de emergencia
- Implementación de la **gestión de contenido educativo** en el panel web:
  - Creación
  - Edición
  - Publicación de artículos, videos e infografías
- Integración **end-to-end** del flujo de contenido:
  - Publicación desde el panel web
  - Visualización inmediata en la app móvil

#### **Semana 9 – Módulo Motivación y primera ronda de usabilidad**

- Implementación completa del módulo **Motivación**:
  - Frase del día
  - Retos individuales con seguimiento de progreso
  - Sistema de logros (medallas e insignias)
  - Mascota evolutiva con animaciones
- Implementación del módulo **Motivación** en el backend:
  - Lógica de otorgamiento de logros
  - Cálculo de hitos de sobriedad
  - Gestión de retos
- Ejecución de la **primera ronda de pruebas de usabilidad** con al menos 5 usuarios reales:
  - Evaluación de los módulos **Inicio**, **Mi Progreso** y **Cuidado**
  - Documentación de hallazgos
  - Definición de plan de iteración

#### **Semanas 10–11 – Módulo Social**

- Implementación del módulo **Social** en el backend:
  - Comunidades
  - Miembros
  - Publicaciones
  - Comentarios
  - Reacciones
  - Foros
  - Chat individual y grupal con soporte en tiempo real (*WebSockets* o *polling*)
- Implementación del módulo **Social** en la app móvil:
  - Feed de comunidad
  - Publicaciones y comentarios
  - Foros de reflexión diaria
  - Chats
  - Perfil de usuario en comunidad
- Implementación del módulo de **administración de comunidades** en el panel web:
  - Creación y gestión de comunidades
  - Invitaciones
  - Gestión de roles
  - Moderación de contenido
- Implementación del **panel de métricas agregadas**:
  - Usuarios activos
  - Publicaciones
  - Check-ins por comunidad
- Incorporación de las iteraciones identificadas en la primera ronda de usabilidad (semana 9)

#### **Semana 12 – Integración total y segunda ronda de usabilidad**

- Integración completa de todos los módulos:
  - Login con Roble
  - Check-in diario
  - Publicación en comunidad
  - Recepción de logros
  - Moderación desde panel web
- Ejecución de la **segunda ronda de pruebas de usabilidad** con al menos 5 usuarios reales:
  - Evaluación del sistema completo
  - Inclusión del módulo **Social**
  - Evaluación del flujo de invitación a comunidades
  - Cálculo del **score SUS**
- Documentación de hallazgos e incorporación de iteraciones críticas antes del despliegue
- Desarrollo y despliegue de la **landing page de NewLife** con información pública y accesos a tiendas de aplicaciones

#### **Semana 13 – Pruebas de calidad y preparación para despliegue**

- Ejecución de la suite completa de **pruebas unitarias**:
  - *Jest* para backend
  - *React Native Testing Library* para frontend
- Corrección de errores identificados
- Ejecución de:
  - Pruebas de integración end-to-end
  - Prueba de carga de la API (hasta 100 usuarios concurrentes)
- Configuración de perfiles de distribución en:
  - **Google Play Console**
- Generación de builds de producción con **EAS Build**
- Configuración de **Sentry** para monitoreo de errores en backend y app móvil

#### **Semana 14 – Despliegue en producción**

- Despliegue del backend **NestJS** en servidor de producción:
  - Verificación de variables de entorno
  - Migraciones de base de datos
  - Disponibilidad de la API
- Despliegue del panel de administración web y la landing:
  - Verificación de rutas
  - Autenticación
  - Contenido
- Envío de la aplicación móvil a revisión en **Google Play**
- Seguimiento del proceso de revisión
- Verificación de flujos críticos en producción:
  - Login con Roble
  - Check-in diario
  - Publicación en comunidad
  - Recepción de notificaciones push
  - Acceso al panel web

#### **Semana 15 – Monitoreo, cierre y entrega**

- Monitoreo activo del sistema en producción:
  - Revisión de métricas en **Sentry**
  - Atención a reportes de usuarios de prueba
  - Corrección de errores críticos con *hotfixes* priorizados
- Documentación técnica final:
  - Diagrama de arquitectura
  - Diagrama de entidades de base de datos
  - Documentación de endpoints (*Swagger*)
  - Guía de despliegue
- Preparación de:
  - Presentación final del proyecto
  - Informe técnico de grado
- Entrega del proyecto y sustentación ante el tutor y el comité evaluador

## 11. Diagramas

### 11.1 Arquitectura del sistema
<img width="1339" height="822" alt="image" src="https://github.com/user-attachments/assets/2400c84c-5dd8-4488-8352-53bf38225ea1" />

### 11.2 Interacción entre módulos
<img width="1103" height="683" alt="image" src="https://github.com/user-attachments/assets/21227da9-6b28-4cd1-b304-444ac3e3193f" />

### 11.3 Secuencia

#### Login con API Roble
<img width="918" height="1013" alt="image" src="https://github.com/user-attachments/assets/3c101898-f54e-4c15-801d-a30c3dff54b0" />

#### Check-in Diario y Actualización de Progreso
<img width="897" height="1294" alt="image" src="https://github.com/user-attachments/assets/97f09b5d-efb2-4616-9ec2-b7f1d153b4d1" />

#### Invitación y Unión a Comunidad
<img width="1240" height="1434" alt="image" src="https://github.com/user-attachments/assets/146f84ca-b72a-4ff9-9bfc-5aa1fd5131c5" />

### 11.4 Despliegue
<img width="752" height="789" alt="image" src="https://github.com/user-attachments/assets/07845c43-b146-4b96-900c-548bb787fd5d" />

## Referencias

Las siguientes referencias bibliográficas están organizadas en orden alfabético por apellido del primer autor y siguen el formato de citación **APA (séptima edición)**. Se incluyen las fuentes citadas a lo largo del presente informe técnico, organizadas por categoría temática.

### Epidemiología y contexto sociodemográfico

- El País. (2022, marzo 14). *Colombia tiene menos de 3 psiquiatras por cada 100.000 habitantes*. El País. https://www.elpais.com.co/salud/colombia-tiene-menos-de-3-psiquiatras-por-cada-100-000-habitantes.html  

- Mazariegos, M. (2021). Factores de recaída en jóvenes en proceso de rehabilitación por adicción al alcohol en América Latina: revisión sistemática. *Revista Latinoamericana de Psicología, 53*(2), 112–125. https://doi.org/10.14349/rlp.2021.v53.n2.3  

- Ministerio de Justicia y del Derecho de Colombia. (2019). *Estudio Nacional de Consumo de Sustancias Psicoactivas en Colombia 2019*. Observatorio de Drogas de Colombia. https://www.minjusticia.gov.co/programas-co/ODC/Paginas/publicaciones-nacionales-estudios-nacionales.aspx  

- Ministerio de Salud y Protección Social de Colombia. (2015). *Encuesta Nacional de Salud Mental 2015*. Ministerio de Salud y Protección Social. https://www.minsalud.gov.co/sites/rid/Lists/BibliotecaDigital/RIDE/DE/encuesta-nacional-salud-mental-ensm-2015.pdf  

- Organización Panamericana de la Salud. (2019). *Informe de situación regional sobre el alcohol y la salud en las Américas 2019*. OPS. https://iris.paho.org/handle/10665.2/51352  

- Universidad Simón Bolívar. (2019). *Estudio de prevalencia de consumo de alcohol y otras sustancias psicoactivas en estudiantes universitarios*. Departamento de Bienestar Universitario.  

### Salud digital y aplicaciones móviles

- I Am Sober. (2023). *I Am Sober – Sobriety Counter* [Aplicación móvil]. App Store y Google Play. https://iamsober.com  

- Reframe App. (2023). *Reframe: Cut Back on Alcohol* [Aplicación móvil]. App Store y Google Play. https://reframeapp.com  

- Sober Grid. (2022). *Sober Grid – Sober Social Network* [Aplicación móvil]. App Store y Google Play. https://sobergrid.com  

- Torous, J., Wisniewski, H., Bird, B., Carpenter, E., Krzysztofowicz, M., Lavagnino, L., Marciano, C., & Hilty, D. (2019). Creating a digital health smartphone app and digital phenotyping platform for mental health and diverse healthcare needs: An interdisciplinary and collaborative approach. *Journal of Technology in Behavioral Science, 4*(2), 73–85. https://doi.org/10.1007/s41347-019-00095-w  

- World Health Organization. (2021). *mHealth: Use of appropriate digital technologies for public health*. WHO. https://www.who.int/teams/digital-health-and-innovation/mhealth  

### Arquitectura de software

- Fowler, M., & Lewis, J. (2014). *Microservices*. martinfowler.com. https://martinfowler.com/articles/microservices.html  

- Meta Platforms. (2023). *React Native: Learn once, write anywhere*. Meta Open Source. https://reactnative.dev  

- Nawrocki, P., Wrona, K., Marczak, M., & Jarzębowicz, A. (2021). A comparison of native and cross-platform frameworks for mobile applications. *Computer Standards & Interfaces, 73*, 103451. https://doi.org/10.1016/j.csi.2020.103451  

- NestJS. (2023). *NestJS: A progressive Node.js framework*. Trilon.io. https://nestjs.com  

- Newman, S. (2021). *Monolith to microservices: Evolutionary patterns to transform your monolith*. O’Reilly Media.  

- Richardson, C. (2018). *Microservices patterns: With examples in Java*. Manning Publications.  

- Vercel. (2023). *Next.js: The React framework for the web*. Vercel. https://nextjs.org  


### Diseño centrado en el usuario y experiencia de usuario

- Brown, T. (2008). Design thinking. *Harvard Business Review, 86*(6), 84–92.  

- Cugelman, B. (2013). Gamification: What it is and why it matters to digital health behavior change developers. *JMIR Serious Games, 1*(1), e3. https://doi.org/10.2196/games.3139  

- Deterding, S., Dixon, D., Khaled, R., & Nacke, L. (2011). From game design elements to gamefulness: Defining gamification. *Proceedings of the 15th International Academic MindTrek Conference*, 9–15. https://doi.org/10.1145/2181037.2181040  

- IDEO. (2015). *The field guide to human-centered design* (1a ed.). IDEO.org. https://www.designkit.org/resources/1  

- Nielsen, J. (1994). *Usability engineering*. Morgan Kaufmann.  

- Norman, D. A. (2013). *The design of everyday things* (Revised and expanded edition). Basic Books.  

- Sauro, J., & Lewis, J. R. (2012). *Quantifying the user experience: Practical statistics for user research*. Elsevier.  


### Legislación y normativa

- Congreso de la República de Colombia. (2012). *Ley 1581 de 2012: Por la cual se dictan disposiciones generales para la protección de datos personales*. Diario Oficial 48587. https://www.funcionpublica.gov.co/eva/gestornormativo/norma.php?i=49981  

- Ministerio de Tecnologías de la Información y las Comunicaciones de Colombia. (2021). *Guía de lineamientos para la implementación de aplicaciones móviles en el sector público*. MinTIC. https://www.mintic.gov.co  


### Metodología de investigación y desarrollo de software

- Beck, K., Beedle, M., van Bennekum, A., Cockburn, A., Cunningham, W., Fowler, M., Grenning, J., Highsmith, J., Hunt, A., Jeffries, R., Kern, J., Marick, B., Martin, R. C., Mellor, S., Schwaber, K., Sutherland, J., & Thomas, D. (2001). *Manifesto for agile software development*. https://agilemanifesto.org  

- Pressman, R. S., & Maxim, B. R. (2021). *Software engineering: A practitioner's approach* (9a ed.). McGraw-Hill Education.  

- Sommerville, I. (2016). *Software engineering* (10a ed.). Pearson Education.  

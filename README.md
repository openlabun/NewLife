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

[Diseño en Figma](https://www.figma.com/design/tmy3p6WL45FEvoEQAmLWF2/New-life-Ver.2)

[Prototipo en Figma](https://www.figma.com/proto/tmy3p6WL45FEvoEQAmLWF2/New-life-Ver.2)

Aplicación móvil de acompañamiento para jóvenes en proceso de rehabilitación y post-rehabilitación por consumo problemático de alcohol.

[Introducción](#1-introducción) •
[Planteamiento del problema](#2-planteamiento-del-problema) •
[Objetivos](#3-objetivos) •
[Estado del arte](#4-estado-del-arte--soluciones-relacionadas) •
[Requerimientos Funcionales y No Funcionales](#5-requerimientos-funcionalesrf-y-no-funcionalesrnf) •
[Diseño y Arquitectura](#6-diseño-y-arquitectura) •
[Implementación](#7-implementación) •
[Plan de pruebas](#8-plan-de-pruebas) •
[Referencias](#9-referencias)

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

El **consumo problemático de alcohol en jóvenes universitarios de Barranquilla** es un fenómeno de alta prevalencia con consecuencias graves en la salud mental, el desempeño académico y la cohesión social. El 26,48 % de los estudiantes de la Universidad Simón Bolívar presentan riesgo de consumo de alcohol (2019), y la *Encuesta Nacional de Salud Mental* reporta que los adultos entre 18 y 44 años concentran las proporciones más altas de consumo perjudicial en Colombia *(Ministerio de Salud, 2015)*. En Barranquilla, la normalización cultural del alcohol —acentuada por eventos como el Carnaval, con incrementos de ventas de hasta el 48,4 % en establecimientos de bebidas— genera un entorno de alta exposición que dificulta la abstinencia incluso en personas con voluntad de recuperarse.

Una vez finalizado un programa de rehabilitación, el **riesgo de recaída se mantiene elevado**: estudios en América Latina señalan que una proporción considerable de egresados de tratamiento recae en el primer año, siendo los primeros tres meses el periodo más crítico *(Mazariegos, 2021)*. Los principales factores detonantes son la presión social, la disponibilidad de sustancias y, de forma determinante, la **ausencia de acompañamiento continuo** tras la fase residencial. Esta brecha en el seguimiento post-tratamiento constituye el núcleo del problema que el presente proyecto busca atender.

El sistema de salud colombiano agrava esta situación: el país cuenta con entre 1,6 y 3 psiquiatras por cada 100.000 habitantes *(El País, 2022)*, y entre el 84 % y el 92 % de las personas con trastornos mentales no reciben atención adecuada *(Ministerio de Salud, 2015)*. Las consultas breves en EPS, los altos costos de atención privada y el estigma social asociado al alcoholismo reducen la adherencia a tratamientos y la búsqueda de ayuda. Frente a este panorama, las aplicaciones móviles de salud (*mHealth*) emergen como una **alternativa viable, escalable y de bajo costo** para complementar los procesos terapéuticos existentes.

Si bien existen aplicaciones internacionales orientadas a la sobriedad —como *I Am Sober*, *Sober Grid* o *Sunflower Sober*—, estas se centran en funciones generales como contadores de sobriedad o comunidades abiertas, sin integrar acompañamiento estructurado, seguimiento del progreso personal ni mecanismos de control comunitario adaptados a la dinámica de fundaciones y grupos de apoyo locales como *Alcohólicos Anónimos*. Tampoco ofrecen **modos de acceso diferenciado** que permitan explorar la herramienta de forma anónima antes del registro, una barrera relevante para poblaciones altamente estigmatizadas.

#### Pregunta problema

**¿Cómo puede el desarrollo de una aplicación móvil, construida sobre un diseño UX/UI validado y apoyada por un sistema de administración web, ofrecer acompañamiento continuo y personalizado a jóvenes barranquilleros entre 18 y 24 años en proceso de rehabilitación y post-rehabilitación por adicción al alcohol, integrando funcionalidades de seguimiento del progreso, motivación, cuidado y comunidad controlada, y asegurando su viabilidad técnica mediante una arquitectura modular escalable?**

### 2.2 Restricciones y supuestos de diseño

#### Restricciones

Las restricciones delimitan el espacio de solución técnica y organizativa dentro del cual opera el equipo. Se clasifican en cuatro categorías:

**De alcance:** La aplicación está dirigida exclusivamente al acompañamiento en rehabilitación y post-rehabilitación por adicción al alcohol; no contempla otras sustancias psicoactivas en esta versión. El módulo Social no es de acceso público: los usuarios solo pueden acceder a una comunidad mediante invitación gestionada por un administrador. La aplicación no reemplaza la atención psicológica o médica profesional —su rol es complementario—, y no implementará videollamadas, mensajería externa ni geolocalización en tiempo real en la versión inicial.

**Tecnológicas:** El frontend móvil debe desarrollarse en React Native (iOS y Android), siguiendo el diseño de alta fidelidad entregado en Figma. El backend debe implementarse con NestJS bajo arquitectura de monolito modular. El panel de administración web y la landing page deben desarrollarse en Next.js. La autenticación debe integrarse obligatoriamente con la API institucional Roble de la Universidad del Norte; no se implementará un sistema de autenticación propio. La infraestructura de despliegue debe ser compatible con los recursos disponibles en el marco académico del proyecto.

**Institucionales:** El proyecto debe cumplir con el cronograma del proyecto de grado de la Universidad del Norte, con entrega final al cierre del semestre en curso. El equipo está conformado por tres personas, lo que exige una distribución eficiente de responsabilidades. El tratamiento de datos personales de usuarios en situación de rehabilitación debe enmarcarse en la Ley 1581 de 2012 (Ley de Protección de Datos Personales de Colombia).

#### Supuestos de diseño

Los supuestos son condiciones que el equipo asume como verdaderas para el diseño y desarrollo del sistema. Si alguno resultara falso, podría requerirse una revisión del alcance o la solución técnica:

- La API Roble de la Universidad del Norte estará disponible y operativa durante el periodo de desarrollo e integración.
- El prototipo de alta fidelidad en Figma constituye la especificación visual y funcional de referencia y no sufrirá modificaciones estructurales significativas durante el desarrollo.
- Los usuarios objetivo cuentan con dispositivo móvil (iOS o Android) con acceso a internet para funciones en la nube, y con almacenamiento local suficiente para el modo invitado.
- Cada comunidad contará con al menos un administrador activo responsable de la moderación de contenido y la gestión de invitaciones.
- Las pruebas de usabilidad con usuarios reales podrán realizarse con la participación de al menos cinco personas en proceso de rehabilitación o post-rehabilitación, en coordinación con una fundación o grupo de apoyo local.
- El contenido educativo inicial (artículos, reflexiones, recursos sobre los 12 pasos) podrá ser cargado y administrado directamente desde el panel web por los administradores, sin intervención del equipo de desarrollo.
- Los activos gráficos del diseño (ilustraciones, iconos, paleta de colores, mascota evolutiva) están disponibles en formatos exportables desde Figma para su uso directo en el desarrollo.

### 2.3 Alcance

#### Descripción general

*NewLife* comprende el diseño de arquitectura, desarrollo, integración y despliegue en producción de un sistema de acompañamiento digital para jóvenes en proceso de rehabilitación y post-rehabilitación por adicción al alcohol. El sistema se compone de tres elementos: una **aplicación móvil** para iOS y Android, un **panel de administración web** y una **landing page** informativa. El desarrollo parte del prototipo de alta fidelidad validado en Figma, adoptándolo como especificación funcional y visual de referencia.

#### Dentro del alcance

**Aplicación móvil (React Native):** Pantalla de bienvenida e historieta interactiva de onboarding con mascota evolutiva. Módulo de Registro y Login con tres modos de acceso: invitado (local), registrado (nube) y con comunidad (invitación), con integración a la API Roble. Módulo Inicio con dashboard de tiempo sobrio, dinero ahorrado, estado de la mascota y Botón SOS. Módulo Mi Progreso con check-in diario, registro emocional, calendario de sobriedad y avance en los 12 pasos. Módulo Cuidado con contenido educativo, recordatorios, directorio de profesionales y mapa referencial. Módulo Motivación con retos, sistema de logros y mascota animada. Módulo Social con comunidades cerradas por invitación, publicaciones, foros de reflexión, chats grupales y moderación de contenido.

**Panel de administración web y landing page (Next.js):** Gestión de comunidades (creación, edición, eliminación, invitaciones). Administración de usuarios por comunidad: roles, moderación y gestión de miembros. Gestión de contenido educativo para el módulo Cuidado. Panel de métricas agregadas de uso por comunidad. Landing page informativa con acceso a descarga de la app.

**Backend y servicios (NestJS — monolito modular):** API REST con módulos independientes por dominio: autenticación, usuarios, progreso, cuidado, motivación, comunidad y administración. Integración con API Roble. Soporte para los tres modos de acceso. Notificaciones push para recordatorios y alertas. Almacenamiento local para modo invitado con migración automática al registrarse.

**Calidad y despliegue:** Pruebas unitarias por módulo y pruebas de integración end-to-end. Dos rondas de pruebas de usabilidad con usuarios reales (n ≥ 5 por ronda). Despliegue de la app en Google Play y del backend, panel web y landing page en infraestructura de producción. Monitoreo post-lanzamiento y corrección de errores críticos.

#### Fuera del alcance

Atención clínica, psicológica o médica de cualquier tipo. Soporte para sustancias psicoactivas distintas al alcohol. Integración con plataformas de mensajería externas (WhatsApp, Telegram). Videollamadas o funciones de audio/video en tiempo real. Geolocalización en tiempo real. Sistema de pagos o cualquier modelo de monetización. Internacionalización o adaptación a contextos fuera de Barranquilla. Integración con sistemas de historia clínica electrónica. Versión web de la aplicación móvil.

#### Entregables principales

| Entregable | Tecnología | Estado esperado |
|---|---|---|
| Aplicación móvil *NewLife* (6 módulos) | React Native | Desplegada en Google Play |
| Panel de administración web | Next.js | Desplegado en producción |
| Landing page informativa | Next.js | Desplegada en producción |
| API REST backend | NestJS | Desplegada en producción |
| Base de datos | Roble (PostgreSQL) | Configurada en producción |
| Integración con API Roble | Backend | Funcional y validada |
| Pruebas unitarias e integración | Backend + Frontend | Ejecutadas y documentadas |
| Pruebas de usabilidad (2 rondas) | n ≥ 5 usuarios | Documentadas con resultados |
| Documento técnico del proyecto | Informe de grado | Entregado y sustentado |

## 3. Objetivos

### 3.1 Objetivo General

**Desarrollar e implementar la aplicación móvil *NewLife*, junto con su panel de administración web y landing page, como un sistema funcional y desplegado en producción que brinde acompañamiento continuo a jóvenes de Barranquilla entre 18 y 24 años en proceso de rehabilitación y post-rehabilitación por adicción al alcohol**, partiendo del diseño validado en Figma e implementando una **arquitectura de monolito modular**.

### 3.2 Objetivos Especificos

- **OE1.** Diseñar e implementar la **arquitectura técnica del sistema** bajo el patrón de monolito modular, definiendo los módulos de dominio (autenticación, usuarios, progreso, cuidado, motivación, comunidad y administración), y el esquema de base de datos relacional para los **tres modos de acceso**.

- **OE2.** Desarrollar los módulos frontend de la aplicación móvil (Bienvenida y Onboarding, Registro y Login, Inicio, Mi Progreso, Cuidado, Motivación y Social) siguiendo el **prototipo de alta fidelidad en Figma**, garantizando coherencia visual con la identidad grafica de *NewLife* y una **experiencia fluida en iOS y Android**.

- **OE3.** Implementar el modulo Social con un sistema de **comunidades cerradas por invitación**, incluyendo el panel de administración web en NextJS que permita a gestores de fundaciones y grupos de apoyo crear comunidades, gestionar miembros, moderar contenido y administrar recursos educativos, sin requerir intervención técnica del equipo de desarrollo.

- **OE4.** Ejecutar un proceso de **aseguramiento de calidad** con pruebas unitarias por modulo, pruebas de integración end-to-end y **dos rondas de pruebas de usabilidad con usuarios reales** en coordinación con una fundación local, documentando los hallazgos e incorporando iteraciones antes del despliegue en producción.

- **OE5.** Desplegar todos los componentes del sistema en producción (aplicación móvil en Google Play, backend en servidor, panel web y landing page en entorno web) y realizar el **monitoreo post-lanzamiento** para corregir errores críticos y asegurar la estabilidad del sistema al cierre del semestre.

## 4. Estado del arte / Soluciones relacionadas

El presente capitulo revisa el **estado del arte en tres dimensiones**: aplicaciones móviles de apoyo a la rehabilitación por adicción al alcohol, arquitecturas de software en sistemas de salud digital móvil, y enfoques de diseño centrado en el usuario para poblaciones vulnerables. Esta revisión identifica **brechas que *NewLife* busca cubrir** y justifica las decisiones técnicas adoptadas.

### 4.1 Aplicaciones móviles de apoyo a la sobriedad

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

### 4.2 Antecedentes del proyecto

El presente proyecto tiene como antecedente el trabajo desarrollado por Andrea Díaz De La Hoz, estudiante del programa de Diseño Gráfico de la Universidad del Norte, quien realizó, durante el segundo semestre de 2025, el diseño UX/UI de alta fidelidad de la aplicación *NewLife* como parte de su proyecto de grado.

Este trabajo se llevó a cabo con el acompañamiento y asesoría de docentes de la Universidad del Norte, quienes guiaron las diferentes etapas del proceso de investigación, diseño y validación de la propuesta. A lo largo del desarrollo se adoptó un enfoque de diseño centrado en el usuario, apoyado en la metodología de *Design Thinking*, la cual estructura el proceso en fases de empatía, definición del problema, ideación, prototipado y evaluación.

Durante la fase de investigación y empatía se realizaron actividades de trabajo de campo con la Fundación Terapéutica Shalom, incluyendo visitas a la institución y acercamientos con el contexto real de jóvenes en procesos de rehabilitación. En este proceso también se realizaron conversaciones y validaciones con profesionales del área de la salud, particularmente psicólogos vinculados a procesos terapéuticos, con el fin de asegurar que la propuesta respondiera a necesidades reales del proceso de recuperación.

Posteriormente se desarrollaron las fases de ideación y diseño, en las cuales se definieron la arquitectura de información, los flujos de interacción y la identidad visual de la aplicación. Como resultado de este proceso se construyó un prototipo interactivo de alta fidelidad en la herramienta *Figma*, el cual representa de forma detallada la estructura, navegación y comportamiento esperado de la aplicación.

El diseño fue sometido a pruebas de usabilidad y procesos de validación, con el objetivo de evaluar la claridad de la interfaz, la facilidad de navegación y la pertinencia de las funcionalidades propuestas. Estas pruebas permitieron realizar ajustes iterativos al diseño y consolidar una propuesta validada desde la perspectiva de experiencia de usuario.

A partir de este antecedente, el presente proyecto retoma el prototipo UX/UI validado como base conceptual y funcional, y se enfoca en su implementación tecnológica, desarrollando la arquitectura del sistema, los componentes de software y la integración entre la aplicación móvil, el backend y el panel de administración, con el objetivo de transformar el diseño propuesto en una aplicación completamente funcional.

### 4.3 Arquitecturas de software en sistemas de salud digital móvil

El diseño arquitectónico de sistemas de salud digital móvil ha evolucionado desde arquitecturas **monolíticas tradicionales** hacia **microservicios** y, más recientemente, hacia *monolitos modulares* como punto de equilibrio entre **simplicidad operativa** y **separación de responsabilidades** (Richardson, 2018).

#### 4.3.1 Monolito modular vs. microservicios

Los **microservicios** ofrecen **alta escalabilidad** y **despliegue independiente**, pero introducen **complejidad operativa significativa** para equipos pequeños: gestión de múltiples repositorios, comunicación entre servicios y mayor curva de aprendizaje (Fowler y Lewis, 2014).

Para proyectos con equipos reducidos y plazos acotados como *NewLife* (tres desarrolladores, un semestre), el patrón de *monolito modular* representa una alternativa más adecuada: permite **separación lógica de dominios** dentro de una **única base de código desplegable**, facilitando la **mantenibilidad** sin la sobrecarga operativa de los microservicios (Newman, 2021).

**NestJS** está diseñado nativamente para implementar este patrón mediante su sistema de módulos.

#### 4.3.2 React Native para desarrollo móvil multiplataforma

**React Native** es uno de los frameworks líderes para aplicaciones móviles multiplataforma. Su modelo de **componentes reutilizables** y la capacidad de compartir lógica entre **iOS y Android** lo hacen eficiente para equipos con recursos limitados (Meta, 2023).

Estudios comparativos con *Flutter* muestran que **React Native** presenta ventajas en **ecosistema de librerías** y **curva de aprendizaje** para equipos con experiencia en desarrollo web (Nawrocki et al., 2021).

En *NewLife*, donde el equipo posee conocimientos previos en *React*, esta elección minimiza la **curva de aprendizaje** y maximiza la **velocidad de desarrollo**.

#### 4.3.3 NextJS para el panel de administración web

**NextJS**, basado en *React*, es el framework de referencia para aplicaciones web con **renderizado híbrido** (*SSR/SSG/CSR*). Su uso en el panel de administración de *NewLife* permite aprovechar **capacidades de renderizado del lado del servidor**, **soporte nativo para rutas API** y un **ecosistema maduro de autenticación y gestión de sesiones** (Vercel, 2023).

Para la *landing page* informativa, el **renderizado estático** garantiza **tiempos de respuesta óptimos**.

### 4.4 Diseño centrado en el usuario en aplicaciones de salud mental

El diseño de aplicaciones para poblaciones en situación de vulnerabilidad exige principios de **diseño centrado en el usuario** que van más allá de la usabilidad convencional. La literatura especializada destaca tres dimensiones críticas: **accesibilidad emocional**, **reducción de barreras de entrada** y **privacidad como valor de diseño** (Torous et al., 2019).

#### 4.4.1 Accesibilidad emocional y diseño no estigmatizante

Norman (2013) señala que el **diseño emocional** opera en tres niveles: *visceral* (impresión estética), *conductual* (facilidad de uso) y *reflexivo* (el significado e identidad que el producto genera en el usuario).  

Para aplicaciones de **salud mental**, el nivel *reflexivo* es especialmente crítico: el usuario debe sentir que la herramienta lo comprende y acompaña sin juzgarlo.

El proyecto precedente incorporó estos principios en la **paleta de colores** (tonos cálidos y naturales), **tipografía accesible** (*Inter*), **lenguaje inclusivo** y una **mascota evolutiva** que personaliza el progreso sin imponer metas externas.

#### 4.4.2 Design Thinking como metodología de validación

El proyecto precedente aplicó **Design Thinking** en cinco etapas:  
- *Empatizar* (entrevistas con usuarios en rehabilitación y psicólogos de la Fundación Shalom)  
- *Definir* (síntesis de necesidades)  
- *Idear* (creación)  
- *Prototipar* (*Figma*)  
- *Testear* (pruebas de usabilidad con usuarios reales y expertos)  

Este proceso garantizó que el diseño de *NewLife* responda a **necesidades documentadas** y no a suposiciones del equipo (Brown, 2008).  

El presente proyecto hereda esta base validada y la extiende con **dos rondas adicionales de pruebas de usabilidad** durante el desarrollo.

#### 4.4.3 Gamificación en aplicaciones de salud

La incorporación de **gamificación** en aplicaciones de salud ha demostrado aumentar la **adherencia** y **motivación**. Según Cugelman (2013), las técnicas más efectivas incluyen el **progreso visible**, los **logros desbloqueables** y la **narrativa de avance personal**.

*NewLife* integra estos principios en el módulo *Motivación* mediante **retos**, **insignias** y una **mascota que evoluciona** con el tiempo de sobriedad.

La literatura señala que estos elementos deben alinearse con **metas intrínsecas del usuario** y no con competición externa, para ser efectivos en contextos de recuperación (Deterding et al., 2011).

### 4.5 Brecha identificada y aporte de NewLife

La revisión del estado del arte permite identificar que ninguna solución existente combina los siguientes atributos de forma integrada:

a) **Comunidades moderadas con acceso controlado por administrador**, adaptadas a la estructura de grupos de apoyo como Alcohólicos Anónimos.  
b) **Tres modos de acceso diferenciado** que reducen la barrera de entrada para usuarios estigmatizados.  
c) **Adaptación cultural, lingüística y de contenido** al contexto de Barranquilla, Colombia.  
d) Un **módulo de progreso estructurado alrededor de los 12 pasos** con *check-ins emocionales diarios*.

*NewLife* no pretende competir con soluciones internacionales consolidadas, sino cubrir una **necesidad específica y documentada en el contexto local**, donde la combinación de **alta prevalencia de consumo**, **estigma social**, **limitaciones del sistema de salud** y **ausencia de herramientas culturalmente adaptadas** crea una brecha que una aplicación móvil bien diseñada puede contribuir a cerrar.

## 5. Requerimientos Funcionales(RF) y No Funcionales(RNF)

Los requerimientos del sistema *NewLife* se clasifican en **funcionales** y **no funcionales**.

Los **requerimientos funcionales** describen las capacidades y comportamientos específicos que el sistema debe proveer a sus usuarios.

Los **requerimientos no funcionales** establecen los atributos de calidad, restricciones técnicas y criterios de rendimiento que el sistema debe cumplir.

Esta especificación preliminar se basa en el análisis del **prototipo validado en Figma**, las necesidades identificadas en el proceso de **diseño centrado en el usuario** del proyecto precedente, y las restricciones técnicas e institucionales definidas en la sección 3.

### 5.1 Requerimientos Funcionales

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

### 5.2 Requerimientos No Funcionales

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

## 6. Diseño y Arquitectura

## 7. Implementación

## 8. Plan de pruebas

## 9. Referencias

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

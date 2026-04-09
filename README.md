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

### 6.1 Evaluación de alternativas

Antes de definir la arquitectura final del sistema, el equipo evaluó distintas opciones en tres dimensiones clave: el enfoque arquitectónico general del backend, el stack tecnológico de cada capa del sistema y el modelo de autenticación. En cada caso se describen las alternativas consideradas y se justifica la decisión tomada con base en criterios técnicos, institucionales y de viabilidad del proyecto.

#### 6.1.1 Arquitectura del backend

**Alternativa 1 — Monolito único:** Un solo servidor NestJS que atiende tanto las peticiones de la aplicación móvil como las del panel de administración web. Esta opción simplifica el despliegue y reduce la duplicidad de código compartido.

**Alternativa 2 — Monolito modular dividido en dos servicios independientes:** Dos instancias de NestJS separadas —una orientada a la app móvil y otra al panel admin—, cada una con sus propios módulos, controladores y lógica de negocio, desplegadas de forma independiente en contenedores Docker.

**Alternativa 3 — Microservicios:** Cada dominio de negocio (autenticación, usuarios, comunidades, progreso, etc.) como un servicio autónomo con su propio despliegue y comunicación vía mensajería o HTTP entre servicios.

**Decisión adoptada: Alternativa 2 — dos backends independientes.**

La separación en dos backends responde a razones de seguridad, responsabilidad y escalabilidad diferenciada. El panel de administración opera con roles privilegiados (ADMIN, SUPERADMIN) y requiere lógica de negocio distinta a la de la app móvil (gestión de comunidades, aprobación de baneos, métricas de uso). Mezclar ambas superficies de ataque en un solo servidor aumentaría el riesgo de exposición de endpoints administrativos a usuarios móviles. Por otro lado, los microservicios fueron descartados por su complejidad operativa excesiva para el tamaño del equipo (tres personas) y el plazo del proyecto, que no justifica la infraestructura de orquestación necesaria.

#### 6.1.2 Patrón arquitectónico interno

**Alternativa 1 — Arquitectura en capas clásica (MVC):** Organización por tipo de archivo (controllers, services, repositories), sin separación explícita del dominio de negocio.

**Alternativa 2 — Arquitectura hexagonal (Ports & Adapters):** Separación estricta entre el dominio (entidades y puertos), la infraestructura (adaptadores que implementan los puertos) y la presentación (controladores y DTOs). El dominio no depende de ningún framework ni tecnología externa.

**Alternativa 3 — Patrón de use cases sin dominio explícito:** Use cases que orquestan directamente los servicios de infraestructura, sin definir entidades de dominio ni puertos formales. Más pragmático y de menor overhead para equipos pequeños.

**Decisión adoptada:** El backend del panel de administración (`admin-api`) utiliza **arquitectura hexagonal completa**, mientras que el backend móvil adopta una variante pragmática basada en **use cases con acceso directo a servicios de infraestructura**, sin la capa de ports/adapters intermedia.

Esta decisión diferenciada se tomó por razones de contexto. El `admin-api` maneja lógica de negocio compleja con múltiples invariantes (sincronización de roles entre tablas, validaciones cruzadas de estado, reglas de moderación) que se benefician del aislamiento que provee la arquitectura hexagonal. El backend móvil, en cambio, tiene use cases más directos y orientados a consulta/escritura simple, donde la capa de ports/adapters añadiría overhead sin beneficio proporcional dado el tamaño del equipo y el plazo de entrega.

#### 6.1.3 Stack tecnológico del frontend

**Alternativa para la app móvil:**
- *React Native (con Expo):* Framework basado en React que compila para iOS y Android desde una sola base de código. Comunidad amplia, integración nativa con APIs del dispositivo y compatibilidad directa con el diseño previo en Figma.
- *Flutter:* Framework de Google basado en Dart. Excelente rendimiento, pero requiere aprender un lenguaje nuevo y el diseño previo fue elaborado pensando en componentes React.
- *Ionic / Capacitor:* Aplicación web embebida en contenedor nativo. Menor rendimiento en interacciones complejas y animaciones.

**Decisión: React Native.** El prototipo de alta fidelidad fue diseñado en Figma con componentes y patrones visuales alineados con la ecosistema React. El equipo tiene experiencia previa con JavaScript/TypeScript, lo que reduce la curva de aprendizaje. Además, la integración con librerías de animación (para la mascota evolutiva) y con APIs nativas del dispositivo (notificaciones push, almacenamiento local) está mejor documentada en React Native.

**Alternativa para el panel web:**
- *Next.js:* Framework React con soporte para SSR (Server Side Rendering) y SSG, enrutamiento basado en sistema de archivos, y App Router para layouts anidados.
- *Vite + React SPA:* Aplicación de página única sin SSR. Más simple de configurar pero sin las ventajas de rutas protegidas a nivel de servidor.
- *Vue.js / Nuxt:* Ecosistema alternativo con curva de aprendizaje adicional para el equipo.

**Decisión: Next.js.** El App Router de Next.js permite proteger rutas administrativas a nivel de middleware antes de que lleguen al cliente, lo cual es relevante para un panel con roles sensibles. El equipo ya maneja React, por lo que la curva de aprendizaje es mínima.

#### 6.1.4 Base de datos

**Alternativa 1 — Base de datos propia (PostgreSQL, MySQL):** Control total sobre el esquema, las consultas y los índices. Requiere infraestructura propia de base de datos y gestión de backups.

**Alternativa 2 — Roble (BaaS institucional de la Universidad del Norte):** Plataforma Backend-as-a-Service de la Universidad que provee autenticación de usuarios, almacenamiento de datos estructurados y una API REST para operaciones CRUD. Sin costo adicional para proyectos académicos de la institución.

**Alternativa 3 — Firebase / Supabase:** BaaS de terceros con SDKs maduros, pero con costos potenciales en producción y dependencia de infraestructura externa no institucional.

**Decisión: Roble.** La restricción institucional del proyecto establece que la autenticación debe integrarse con la API Roble de la Universidad del Norte. Extender su uso al almacenamiento de datos es coherente con esta restricción y elimina la necesidad de gestionar una base de datos propia, lo cual es inviable con los recursos del equipo. Las limitaciones de Roble (filtros solo por igualdad exacta, timestamps como varchar, sin defaultValue en columnas) fueron identificadas y manejadas con estrategias compensatorias en el código (filtros en memoria para consultas complejas, generación de IDs en el backend).

#### 6.1.5 Modelo de autenticación

**Alternativa 1 — Tokens directamente de Roble:** El frontend usa el accessToken de Roble en cada petición al backend, que lo verifica contra la API de Roble en cada request.

**Alternativa 2 — JWT propio sin Roble:** El backend genera y valida sus propios JWT sin depender de Roble para la verificación.

**Alternativa 3 — Combinación: Roble autentica, backend emite su propio JWT:** El usuario se autentica contra Roble, el backend verifica las credenciales, y luego emite un JWT firmado propio que contiene el `roble_token` embebido. Las peticiones subsiguientes usan el JWT del backend.

**Decisión: Alternativa 3 — combinación.** Este modelo permite que el backend sea la única capa que interactúa con Roble, ocultando la dependencia externa al frontend. El JWT propio tiene tiempo de expiración configurable (8 horas), incluye el rol del usuario y permite implementar un sistema de blacklist para invalidar tokens en logout. Adicionalmente, el `admin-api` genera su propio JWT completamente independiente al del backend móvil, lo que garantiza que un token de usuario móvil no puede usarse para acceder a endpoints administrativos y viceversa.


### 6.2 Arquitectura del sistema

#### 6.2.1 Visión general

*NewLife* adopta una **arquitectura de tres capas cliente-servidor**, compuesta por los siguientes elementos principales:

```
┌─────────────────────────────────────────────────────┐
│                    CLIENTES                         │
│  ┌──────────────────┐    ┌────────────────────────┐ │
│  │  App Móvil       │    │  Panel Web (Next.js)   │ │
│  │  (React Native)  │    │  + Landing Page        │ │
│  └────────┬─────────┘    └──────────┬─────────────┘ │
└───────────┼──────────────────────────┼───────────────┘
            │ HTTPS / REST             │ HTTPS / REST
┌───────────┼──────────────────────────┼───────────────┐
│           ▼          BACKENDS        ▼               │
│  ┌──────────────────┐    ┌────────────────────────┐  │
│  │  Backend Móvil   │    │  Backend Admin         │  │
│  │  (NestJS :3000)  │    │  (NestJS :3001)        │  │
│  │  Docker          │    │  Docker                │  │
│  └────────┬─────────┘    └──────────┬─────────────┘  │
└───────────┼──────────────────────────┼───────────────┘
            │                          │
            └──────────────┬───────────┘
                           ▼
              ┌────────────────────────┐
              │  Roble API             │
              │  (Auth + Database)     │
              │  Universidad del Norte │
              └────────────────────────┘
```

Los dos clientes (app móvil y panel web) se comunican exclusivamente con su backend correspondiente a través de HTTP/REST. Ningún cliente accede directamente a Roble; toda la comunicación con la API institucional está encapsulada en el backend. Esto garantiza que las credenciales del sistema (tokens maestros de Roble) nunca se expongan en el cliente.

#### 6.2.2 Componentes del sistema

##### App móvil (React Native)

La aplicación móvil es el componente principal orientado al usuario final —jóvenes en proceso de rehabilitación— y se compone de seis módulos funcionales:

| Módulo | Responsabilidad |
|--------|----------------|
| **Auth** | Registro, login (tres modos), recuperación de contraseña, integración con JWT del backend móvil |
| **Inicio** | Dashboard con contador de sobriedad, dinero ahorrado, estado de la mascota y Botón SOS |
| **Mi Progreso** | Check-in diario, registro emocional, calendario de sobriedad, avance en los 12 pasos |
| **Cuidado** | Contenido educativo, recordatorios, directorio de profesionales, mapa referencial |
| **Motivación** | Frase del día, retos, sistema de logros, mascota animada evolutiva |
| **Social** | Comunidades cerradas, feed de posts, foros, chats grupales, acciones de moderador |

La app soporta **tres modos de acceso diferenciados:**
- *Modo invitado:* El usuario explora los módulos de Progreso, Cuidado y Motivación sin crear cuenta. Los datos se almacenan localmente en el dispositivo mediante AsyncStorage. Al registrarse, los datos locales se migran automáticamente a la nube.
- *Modo registrado:* Cuenta completa con sincronización en Roble. Acceso a todos los módulos excepto Social.
- *Modo con comunidad:* Cuenta registrada que además pertenece a una o más comunidades. Acceso completo a todos los módulos incluyendo el Social.

##### Panel de administración web (Next.js)

Interfaz web exclusiva para administradores y superadministradores. Se despliega como una aplicación Next.js con App Router y acceso protegido por middleware que verifica la cookie de sesión antes de renderizar cualquier ruta del panel.

| Sección | Responsabilidad |
|---------|----------------|
| **Dashboard** | Métricas agregadas: total de usuarios, comunidades activas, suspensiones, solicitudes de baneo pendientes |
| **Usuarios** | Listado con filtros, cambio de estado (activo/suspendido/baneado), creación y eliminación de administradores |
| **Comunidades** | CRUD de comunidades, gestión de miembros, tipos de acceso, asignación de moderadores |
| **Solicitudes de baneo** | Revisión y resolución (aprobar/rechazar) de solicitudes enviadas por moderadores desde la app |
| **Contenido educativo** | Gestión del material del módulo Cuidado *(pendiente de implementación)* |

##### Backend móvil (`newlife-api`, puerto 3000)

Servidor NestJS que atiende exclusivamente las peticiones de la app móvil. Organizado como monolito modular con los siguientes módulos:

```
src/modules/
├── auth/          — Login, registro, refresh, logout, recuperación de contraseña
├── users/         — Perfil, onboarding, actualización, eliminación de cuenta
├── progress/      — Check-in diario, calendario, 12 pasos, sobriedad
├── care/          — Contenido educativo, directorio, contactos de emergencia
├── home/          — Dashboard: contador de sobriedad, datos de inicio
├── communities/   — Feed social, posts, comentarios, foros, acciones de moderador
└── database/      — DatabaseService compartido (cliente HTTP de Roble)
```

Cada módulo importa `AuthModule` y `DatabaseModule` para acceder a `SystemAuthService` (gestión del token maestro de Roble) y `DatabaseService` (operaciones CRUD contra la BD). Los use cases son la unidad central de lógica de negocio e inyectan directamente estos servicios de infraestructura.

##### Backend admin (`admin-api`, puerto 3001)

Servidor NestJS independiente que atiende exclusivamente el panel de administración. Implementa **arquitectura hexagonal completa** con separación estricta entre dominio, infraestructura y presentación:

```
src/modules/admin/
├── domain/
│   ├── entities/       — AdminUser, Community, ComunidadUsuario, BanRequest
│   └── ports/          — Interfaces de repositorio (contratos)
├── infrastructure/
│   ├── adapters/       — Implementaciones de repositorios contra Roble
│   └── services/       — RobleHttpService, TokenBlacklistService
├── application/
│   └── use-cases/      — Lógica de negocio (cambio de rol, estado, moderación, baneos)
└── presentation/
    ├── controllers/    — AdminAuth, AdminUsers, AdminCommunities, AdminBanRequests
    ├── dtos/           — Validación de entrada con class-validator
    └── guards/         — AdminJwtGuard, RolesGuard
```

El `admin-api` emite su propio JWT (firmado con `ADMIN_JWT_SECRET`, distinto al del backend móvil) que incluye el `roble_token` del administrador. Los tokens invalidados por logout se almacenan en una blacklist en memoria (`TokenBlacklistService`).

##### Roble (BaaS institucional)

Plataforma Backend-as-a-Service de la Universidad del Norte que provee dos servicios:

- **Autenticación** (`/auth/{projectToken}`): Registro, login, refresh de tokens, logout, recuperación de contraseña y verificación de tokens. Gestiona las sesiones de todos los usuarios del sistema.
- **Base de datos** (`/database/{projectToken}`): API REST para operaciones de lectura (`/read`), inserción (`/insert`), actualización (`/update`) y eliminación (`/delete`) sobre tablas relacionales.

Ambos backends acceden a Roble usando un **token maestro del sistema** (`ROBLE_SYSTEM_EMAIL` + `ROBLE_SYSTEM_PASSWORD`) que se renueva automáticamente mediante `SystemAuthService` cuando está próximo a expirar.

#### 6.2.3 Modelo de datos

Las tablas en Roble que soportan el sistema son las siguientes:

**Tablas de usuarios y autenticación:**

| Tabla | Campos principales | Descripción |
|-------|--------------------|-------------|
| `usuarios` | `_id`, `usuario_id` (uuid), `email`, `nombre`, `rol`, `estado`, `suspension_hasta`, `created_at`, `last_login` | Usuarios de la plataforma. `rol`: SUPERADMIN, ADMIN, MODERADOR, USUARIO |
| `informacion_personal` | `usuario_id`, `apodo`, `pronombre`, `motivo_sobrio`, `gasto_semanal` | Perfil extendido completado en el onboarding |
| `config_usuarios` | `usuario_id`, `reg_lugar_riesgo`, `comp_logros_comunid`, `moment_motiv` | Preferencias de configuración del usuario |

**Tablas de progreso:**

| Tabla | Campos principales | Descripción |
|-------|--------------------|-------------|
| `sobriedad` | `usuario_id`, `fecha_ultimo_consumo`, `updated_at` | Fecha base para el contador de sobriedad |
| `registro_diario` | `usuario_id`, `fecha`, `estado_emocional`, `notas` | Check-in diario |
| `camino` | `usuario_id`, `nivel`, `subnivel`, `updated_at` | Avance en los 12 pasos |
| `contactos` | `usuario_id`, `nombre`, `telefono`, `tipo` | Contactos de emergencia del usuario |

**Tablas del módulo social:**

| Tabla | Campos principales | Descripción |
|-------|--------------------|-------------|
| `comunidades` | `_id`, `nombre`, `descripcion`, `creado_por`, `activa`, `created_at` | Comunidades de apoyo |
| `comunidad_usuarios` | `comunidad_id`, `usuario_id`, `tipo_acceso`, `es_moderador`, `joined_at` | Membresías. `tipo_acceso`: SOLO_VER, POSTEAR_COMENTAR, CHAT_COMPLETO |
| `posts` | `comunidad_id`, `autor_id`, `contenido`, `created_at`, `eliminado` | Publicaciones del feed |
| `comentarios` | `post_id`, `autor_id`, `contenido`, `created_at`, `eliminado` | Comentarios en posts |
| `reacciones` | `post_id`, `usuario_id`, `tipo`, `created_at` | Reacciones a posts (LIKE, LOVE, APOYO, FUERTE) |
| `foros` | `comunidad_id`, `creado_por`, `pregunta`, `descripcion`, `fecha`, `activo` | Foros de reflexión diaria |
| `foros_respuestas` | `foro_id`, `autor_id`, `contenido`, `created_at`, `eliminado` | Respuestas a foros |
| `solicitudes_baneo` | `usuario_id`, `moderador_id`, `comunidad_id`, `motivo`, `estado`, `created_at` | Solicitudes de baneo enviadas por moderadores |

> **Nota sobre Roble:** Los timestamps se almacenan como `varchar(50)` en formato ISO 8601 (no como tipo `timestamp` SQL). Los identificadores `_id` son generados automáticamente por Roble (12 caracteres). Los filtros de consulta solo soportan igualdad exacta; los filtros complejos (rangos, `IN`, `OR`) se realizan en memoria en el backend tras recuperar los registros.

#### 6.2.4 Flujo de autenticación

El sistema implementa un flujo de autenticación en dos fases que combina Roble con JWT propio:

```
Cliente                Backend              Roble
  │                       │                   │
  │── POST /auth/login ──►│                   │
  │   {email, password}   │── POST /login ───►│
  │                       │◄── {accessToken,  │
  │                       │     refreshToken, │
  │                       │     user} ────────│
  │                       │                   │
  │                       │ Verifica estado   │
  │                       │ en tabla usuarios │
  │                       │ (ACTIVO/BANEADO/  │
  │                       │  SUSPENDIDO)      │
  │                       │                   │
  │                       │ Genera JWT propio │
  │                       │ {sub, email, rol, │
  │                       │  roble_token}     │
  │◄── {accessToken,      │                   │
  │     refreshToken,     │                   │
  │     user} ────────────│                   │
  │                       │                   │
  │── GET /user/profile ─►│                   │
  │   Authorization:       │ Verifica JWT      │
  │   Bearer {jwt_propio} │ propio (sin Roble)│
  │◄── {perfil} ──────────│                   │
```

El JWT propio del backend móvil tiene una duración de 8 horas. Para renovarlo, el cliente envía el `refreshToken` de Roble al endpoint `/auth/refresh-token`, el backend renueva el token con Roble y emite un nuevo JWT propio. En logout, el backend invalida el token en Roble y, en el caso del `admin-api`, agrega el JWT a una blacklist en memoria para prevenir su reutilización antes de la expiración.

#### 6.2.5 Flujo del módulo social

El acceso al módulo social está condicionado por el **tipo de acceso** asignado al usuario en cada comunidad:

```
Usuario solicita acción en comunidad
              │
              ▼
  ¿Es miembro de la comunidad?
       │              │
      No              Sí
       │              │
       ▼              ▼
   403 Forbidden   ¿Qué acción?
                      │
          ┌───────────┼───────────┐
          ▼           ▼           ▼
       Ver feed    Publicar/   Acceder
       y foros     comentar     a chat
          │           │           │
    SOLO_VER    POSTEAR_COMENTAR  CHAT_COMPLETO
    o superior   o superior      requerido
          │           │           │
       ✅ OK    SOLO_VER → 403   Otro → 403
```

El moderador de una comunidad (`es_moderador = true` en `comunidad_usuarios`) tiene permisos adicionales sobre el contenido de esa comunidad específica: puede eliminar posts, comentarios y mensajes de otros usuarios, cambiar tipos de acceso, suspender miembros y enviar solicitudes de baneo al administrador.

#### 6.2.6 Despliegue

El sistema se despliega mediante **Docker** con contenedores independientes para cada componente del backend:

```yaml
# Estructura de contenedores
services:
  newlife-api:        # Backend móvil — puerto 3000
  admin-api:          # Backend admin — puerto 3001
```

Cada backend tiene su propio `Dockerfile` y `docker-compose.yml`. Las variables de entorno sensibles (credenciales de Roble, secretos JWT) se inyectan en tiempo de ejecución mediante archivos `.env` que no se incluyen en el repositorio.

El panel de administración web (Next.js) y la landing page se despliegan como aplicaciones independientes. La app móvil se distribuye a través de Google Play para Android.

```
Infraestructura de producción
┌─────────────────────────────────────────────┐
│  Servidor de aplicaciones                   │
│                                             │
│  ┌─────────────┐    ┌─────────────────┐     │
│  │ Docker      │    │ Docker          │     │
│  │ newlife-api │    │ admin-api       │     │
│  │ :3000       │    │ :3001           │     │
│  └─────────────┘    └─────────────────┘     │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │ Next.js (Panel web + Landing page)  │    │
│  └─────────────────────────────────────┘    │
└─────────────────────────────────────────────┘
              │
              ▼
  Roble API — Universidad del Norte
  (Auth + Base de datos)
```

#### 6.2.7 Decisiones de diseño transversales

**Soft delete en contenido del módulo social.** Los posts, comentarios y respuestas de foros no se eliminan físicamente de la base de datos; se marcan con un campo `eliminado = true`. Esta decisión permite mantener la integridad referencial (un comentario eliminado no rompe el conteo del post padre), facilita auditorías futuras y es coherente con las capacidades de Roble, que no soporta eliminación condicional en cascada.

**Sincronización de roles entre tablas.** El rol de un usuario en la tabla `usuarios` (`USUARIO` / `MODERADOR`) se mantiene sincronizado con su estado en `comunidad_usuarios`. Cuando un usuario es asignado como moderador de una comunidad, su rol sube a `MODERADOR`. Cuando se le quita el rol de moderador de todas sus comunidades, vuelve a `USUARIO`. Esta sincronización se ejecuta en los use cases correspondientes (add-member, change-member-moderator, remove-member) de ambos backends.

**Validación de estado antes del login.** En el use case de login, el sistema verifica el estado del usuario en la tabla `usuarios` antes de completar la autenticación con Roble. Usuarios con estado `BANEADO` o `ELIMINADO` reciben un error `401` y no pueden obtener un token, incluso si sus credenciales son válidas. Las suspensiones con fecha de vencimiento se verifican y se levantan automáticamente si ya caducaron.

**Separación de JWT entre backends.** El `admin-api` y el `newlife-api` usan secretos JWT distintos (`ADMIN_JWT_SECRET` vs `JWT_SECRET`). Esto garantiza que un token de usuario móvil no puede usarse para autenticarse en el panel de administración, y viceversa.

**Token maestro de Roble con renovación automática.** Ambos backends acceden a Roble usando un token maestro del sistema obtenido con credenciales de una cuenta de sistema (`ROBLE_SYSTEM_EMAIL`). El `SystemAuthService` gestiona este token y lo renueva automáticamente ante un error 401, de forma transparente para los use cases que lo consumen.


### 6.3 Justificación de la arquitectura seleccionada

La arquitectura descrita responde directamente a los requerimientos del sistema y las restricciones del proyecto:

**Separación de backends** garantiza que los endpoints administrativos nunca estén expuestos a usuarios de la app móvil. Cada superficie tiene su propio modelo de autenticación, sus propias reglas de acceso y puede escalar de forma independiente.

**Monolito modular** en lugar de microservicios permite que un equipo de tres personas pueda desarrollar, probar y desplegar el sistema completo sin la complejidad operativa de orquestar múltiples servicios, redes internas y mecanismos de descubrimiento de servicios.

**Arquitectura hexagonal en el admin-api** aísla la lógica de negocio compleja (sincronización de roles, validaciones cruzadas, reglas de moderación) del framework NestJS y de Roble, lo que facilita las pruebas unitarias de los use cases sin necesidad de levantar la base de datos.

**Roble como única fuente de datos** elimina la necesidad de gestionar infraestructura propia de base de datos dentro del alcance académico del proyecto, al costo de algunas limitaciones en las capacidades de consulta que son manejables mediante procesamiento en memoria.

**Docker** para el despliegue garantiza reproducibilidad entre entornos (desarrollo, producción) y facilita que los tres miembros del equipo trabajen con configuraciones idénticas independientemente de su sistema operativo.

### 6.4 Diagramas
<img width="1339" height="822" alt="image" src="https://github.com/user-attachments/assets/87bac9cc-6163-4a38-9dbd-34b92f00813f" />


## 7. Implementación

### 7.1 Stack tecnológico

#### 7.1.1 Aplicación móvil

| Tecnología | Versión | Rol en el proyecto | Justificación |
|---|---|---|---|
| **Expo SDK** | 55 | Framework base | Simplifica la configuración nativa (iOS/Android), gestiona el build y provee acceso unificado a APIs del dispositivo sin necesidad de `react-native link` |
| **TypeScript** | 5.x | Lenguaje | Tipado estático que reduce errores en tiempo de desarrollo y mejora la mantenibilidad del código |
| **React Navigation** | 6.x | Navegación | Librería estándar del ecosistema React Native; soporta stack navigator, tab navigator y modales con control completo sobre transiciones |
| **react-native-reanimated** | 3.x | Animaciones | Motor de animaciones que corre en el hilo de UI (no en JS), necesario para animaciones fluidas como el círculo del tab navigator y las transiciones de pantalla |
| **react-native-svg** | — | Gráficos vectoriales | Permite renderizar ilustraciones exportadas desde Figma (blob del check-in, ilustraciones de mascota) como SVG nativo |
| **react-native-gifted-charts** | — | Visualización de datos | Gráficas de línea con área para el módulo Mi Progreso (evolución emocional y calendario de sobriedad) |
| **react-native-linear-gradient** | — | UI | Fondos degradados usados en pantallas de onboarding, tarjetas de motivación y el botón SOS |
| **@expo/vector-icons** (Feather) | — | Iconografía | Conjunto de iconos consistente con el diseño; versión Expo de la librería para compatibilidad con SDK 55 |

> **Nota sobre la migración a Expo:** El proyecto inició como React Native puro y fue migrado a Expo SDK 55 durante el desarrollo para simplificar el proceso de build y despliegue en Google Play. La migración no implicó cambios estructurales en los componentes ya implementados.

#### 7.1.2 Panel de administración web

| Tecnología | Versión | Rol en el proyecto | Justificación |
|---|---|---|---|
| **Next.js** | 14 (App Router) | Framework | SSR y middleware de protección de rutas; el App Router permite layouts anidados para el panel admin sin re-renders del sidebar |
| **TypeScript** | 5.x | Lenguaje | Consistencia con el resto del sistema; tipado de respuestas de API y entidades del dominio |
| **Tailwind CSS** | 3.x | Estilos | Utilidades inline que aceleran el desarrollo de la interfaz sin escribir CSS custom; configuración mínima |
| **shadcn/ui** | — | Componentes UI | Componentes accesibles (Table, Dialog, Badge, Select, etc.) construidos sobre Radix UI; se integran directamente en el proyecto sin dependencia de paquete externo |
| **Axios** | — | Cliente HTTP | Interceptores para inyección automática del token JWT en cada request y manejo centralizado de errores 401 |
| **lucide-react** | — | Iconografía | Iconos SVG consistentes con la identidad visual del panel |

#### 7.1.3 Backend móvil (`newlife-api`)

| Tecnología | Rol | Justificación |
|---|---|---|
| **NestJS** | Framework backend | Arquitectura modular nativa, inyección de dependencias, decoradores para guards y validación; facilita la organización por módulos de dominio |
| **TypeScript** | Lenguaje | Tipado de DTOs, entidades y respuestas de Roble |
| **class-validator / class-transformer** | Validación de DTOs | Validación declarativa mediante decoradores en los DTOs de entrada |
| **@nestjs/jwt / @nestjs/passport** | Autenticación | Generación y verificación de JWT propios; estrategia Passport-JWT para el guard de rutas protegidas |
| **Axios** | Cliente HTTP | Llamadas a la API de Roble (autenticación y base de datos) desde los servicios de infraestructura |
| **Docker** | Despliegue | Contenerización del servidor para reproducibilidad entre entornos |

#### 7.1.4 Backend admin (`admin-api`)

Mismo stack base que el backend móvil, con las siguientes adiciones:

| Tecnología | Rol |
|---|---|
| **Arquitectura hexagonal** | Separación dominio / infraestructura / presentación |
| **@nestjs/swagger** | Generación automática de documentación OpenAPI en `/api/docs/web` |
| **Token blacklist en memoria** | Invalidación de JWT en logout sin base de datos adicional |


### 7.2 Componentes implementados

#### 7.2.1 Backend móvil (`newlife-api`)

##### Módulo Auth
Estado: ✅ Completo

Implementa el ciclo completo de autenticación de usuarios de la app móvil. Los endpoints disponibles son:

| Endpoint | Método | Descripción |
|---|---|---|
| `/auth/login` | POST | Autentica contra Roble, verifica estado del usuario, emite JWT propio |
| `/auth/register` | POST | Registra usuario en Roble y crea registro en tabla `usuarios` |
| `/auth/refresh-token` | POST | Renueva el accessToken usando el refreshToken de Roble |
| `/auth/forgot-password` | POST | Solicita recuperación de contraseña vía Roble |
| `/auth/reset-password` | POST | Restablece contraseña con el token recibido por correo |
| `/auth/logout` | POST | Invalida sesión en Roble |
| `/auth/verify-token` | GET | Verifica validez del JWT activo |

La lógica de `LoginUseCase` incluye validación del estado del usuario antes de completar la autenticación: usuarios con estado `BANEADO` o `ELIMINADO` reciben un error `401` inmediatamente. Las suspensiones con fecha vencida se levantan automáticamente al momento del login.

##### Módulo Users
Estado: ✅ Completo

Gestiona el perfil del usuario autenticado, el proceso de onboarding inicial y la eliminación de cuenta.

| Endpoint | Método | Descripción |
|---|---|---|
| `/user/profile` | GET | Obtiene nombre, apodo, pronombre, motivo y gasto semanal |
| `/user/profile` | PATCH | Actualiza campos del perfil (apodo, pronombre, motivo\_sobrio, gasto\_semanal) |
| `/user/complete-profile` | POST | Onboarding: crea registros en `informacion_personal`, `config_usuarios` y `sobriedad` |
| `/user/onboarding-status` | GET | Verifica si el usuario ya completó el registro inicial |
| `/user/account` | DELETE | Cambia estado a `ELIMINADO`, invalida token en Roble y remueve al usuario de todas sus comunidades |

##### Módulo Progress
Estado: ✅ Completo

Gestiona el seguimiento del proceso de sobriedad del usuario: check-in diario, contador de tiempo sobrio, avance en los 12 pasos y registro de contactos de emergencia.

| Endpoint | Descripción |
|---|---|
| `GET/POST /progress/checkin` | Consulta o registra el check-in diario con estado emocional |
| `GET /progress/sobriedad` | Obtiene fecha de último consumo y calcula días/dinero ahorrado |
| `PATCH /progress/sobriedad` | Actualiza fecha base de sobriedad (reset en caso de recaída) |
| `GET/PATCH /progress/camino` | Consulta y actualiza el nivel de avance en los 12 pasos |
| `GET/POST /progress/contactos` | Gestiona contactos de emergencia del usuario |

##### Módulo Home
Estado: ✅ Completo

Provee los datos agregados necesarios para el dashboard de inicio: días de sobriedad calculados a partir de `fecha_ultimo_consumo`, dinero ahorrado en base al `gasto_semanal` del perfil, y estado general del usuario.

##### Módulo Communities
Estado: ✅ Implementado (correcciones menores pendientes)

Módulo más extenso del sistema. Gestiona todo el módulo social: acceso a comunidades, feed de posts, comentarios, reacciones, foros y acciones de moderador.

**Endpoints de usuario:**

| Endpoint | Método | Descripción |
|---|---|---|
| `/communities` | GET | Lista comunidades a las que pertenece el usuario |
| `/communities/:id` | GET | Detalle de una comunidad con tipo de acceso del usuario |
| `/communities/:id/posts` | GET | Feed de posts enriquecido con autor, conteo de comentarios y reacciones |
| `/communities/:id/posts` | POST | Crea post (requiere tipo\_acceso ≠ SOLO\_VER) |
| `/communities/:id/posts/:postId` | DELETE | Elimina post propio (o cualquiera si es moderador) |
| `/communities/:id/posts/:postId/comments` | GET | Comentarios del post con autor |
| `/communities/:id/posts/:postId/comments` | POST | Agrega comentario (requiere tipo\_acceso ≠ SOLO\_VER) |
| `/communities/:id/posts/:postId/comments/:cId` | DELETE | Elimina comentario propio (o cualquiera si es moderador) |
| `/communities/:id/posts/:postId/reactions` | POST | Toggle de reacción (LIKE, LOVE, APOYO, FUERTE) |
| `/communities/:id/forums` | GET | Foros activos de la comunidad |
| `/communities/:id/forums/:forumId` | GET | Detalle del foro con respuestas |
| `/communities/:id/forums/:forumId/replies` | POST | Responde al foro (requiere tipo\_acceso ≠ SOLO\_VER) |

**Endpoints de moderador** (requieren `es_moderador = true` en la comunidad):

| Endpoint | Método | Descripción |
|---|---|---|
| `/communities/:id/members` | GET | Lista miembros con nombre, correo, estado y tipo de acceso |
| `/communities/:id/members` | POST | Agrega miembro por correo electrónico |
| `/communities/:id/members/:uid` | DELETE | Expulsa miembro de la comunidad |
| `/communities/:id/members/:uid/access` | PATCH | Cambia tipo de acceso (SOLO\_VER / POSTEAR\_COMENTAR / CHAT\_COMPLETO) |
| `/communities/:id/members/:uid/suspend` | POST | Suspende al usuario N días |
| `/communities/:id/ban-requests` | POST | Envía solicitud de baneo permanente al administrador |

El módulo implementa **soft delete** para posts, comentarios y respuestas de foros: el contenido eliminado se marca con `eliminado = true` en lugar de borrarse físicamente, preservando la integridad referencial. Las reacciones funcionan como toggle: si el usuario ya había reaccionado con el mismo tipo, la reacción se elimina.

#### 7.2.2 Backend admin (`admin-api`)

Estado: ✅ Completo

##### Módulo Auth Admin
Autenticación exclusiva para administradores y superadministradores del panel web. Emite un JWT firmado con un secreto distinto al del backend móvil, lo que garantiza que ningún token de usuario móvil puede acceder a los endpoints del panel.

| Endpoint | Descripción |
|---|---|
| `POST /api/web/auth/login` | Login de admin/superadmin con validación de rol |
| `POST /api/web/auth/refresh` | Refresca el JWT del admin |
| `POST /api/web/auth/logout` | Invalida en Roble + agrega JWT a blacklist en memoria |
| `GET /api/web/auth/me` | Perfil del admin autenticado |

##### Módulo Admin Users
Gestión completa de usuarios de la plataforma desde el panel web.

| Endpoint | Descripción |
|---|---|
| `GET /api/web/admin/users` | Listado con filtros por rol y estado |
| `PATCH /api/web/admin/users/:id/rol` | Cambiar rol (USUARIO ↔ MODERADOR) |
| `PATCH /api/web/admin/users/:id/estado` | Cambiar estado con soporte para suspensión por días o hasta fecha específica |
| `POST /api/web/admin/users/admin` | Crear administrador (solo SUPERADMIN) |
| `DELETE /api/web/admin/users/:id` | Eliminar administrador (solo SUPERADMIN, no puede eliminar SUPERADMIN) |

El cambio de estado a `BANEADO` o `ELIMINADO` remueve automáticamente al usuario de todas sus comunidades. Las suspensiones incluyen campo `suspension_hasta` calculado a partir de los días indicados.

##### Módulo Admin Communities
CRUD completo de comunidades con gestión de miembros.

| Endpoint | Descripción |
|---|---|
| `GET /api/web/admin/communities` | Lista comunidades con total de miembros y moderadores |
| `POST /api/web/admin/communities` | Crea comunidad |
| `GET /api/web/admin/communities/:id` | Detalle con lista de miembros |
| `PATCH /api/web/admin/communities/:id` | Edita nombre, descripción y estado activo/inactivo |
| `DELETE /api/web/admin/communities/:id` | Elimina comunidad y remueve todos sus miembros |
| `POST /api/web/admin/communities/:id/members` | Agrega miembro por correo con tipo de acceso |
| `DELETE /api/web/admin/communities/:id/members/:uid` | Quita miembro |
| `PATCH /api/web/admin/communities/:id/members/:uid/access` | Cambia tipo de acceso |
| `PATCH /api/web/admin/communities/:id/members/:uid/moderator` | Asigna o quita rol de moderador |

La asignación de moderador sincroniza automáticamente el campo `rol` en la tabla `usuarios`: al asignar moderador sube a `MODERADOR`, al quitar verifica si tiene otras comunidades como moderador antes de bajar a `USUARIO`.

##### Módulo Admin Ban Requests
Gestión de solicitudes de baneo enviadas por moderadores desde la app móvil.

| Endpoint | Descripción |
|---|---|
| `GET /api/web/admin/ban-requests` | Lista solicitudes pendientes (o todas con `?soloPendientes=false`) |
| `PATCH /api/web/admin/ban-requests/:id` | Resuelve: `APROBADA` (banea al usuario) o `RECHAZADA` |


#### 7.2.3 Panel de administración web

Estado: ✅ Completo e integrado con API real

El panel web está completamente integrado con el `admin-api`. Cada página consume datos reales de la API y sus acciones (crear, editar, eliminar, cambiar estado) se reflejan inmediatamente en la base de datos.

##### Dashboard
Muestra métricas en tiempo real: total de usuarios, comunidades activas, suspendidos activos y solicitudes de baneo pendientes. La sección de baneos pendientes incluye botones de aprobación y rechazo directamente en el dashboard (hasta 3 solicitudes; el resto muestra un contador). Las comunidades recientes listan las últimas 5 registradas.

##### Gestión de usuarios
Tabla con filtros por rol (USUARIO, MODERADOR) y estado (ACTIVO, SUSPENDIDO, BANEADO). Permite cambiar el estado de cada usuario con modal de confirmación; las suspensiones incluyen campo de días. La sección de administradores del sistema es visible únicamente para usuarios con rol SUPERADMIN y permite crear nuevos administradores y eliminar los existentes.

##### Gestión de comunidades
Listado con total de miembros y estado activo/inactivo. Al ver el detalle de una comunidad, la tabla de miembros muestra nombre, correo, tipo de acceso, rol de moderador y fecha de ingreso, enriquecida con datos de la tabla `usuarios`. Las acciones disponibles por miembro son: cambiar tipo de acceso, asignar/quitar moderador, y expulsar. El modal de agregar miembro busca por correo electrónico.

##### Solicitudes de baneo
Tarjetas individuales por solicitud con nombre del usuario reportado, moderador que la envió, comunidad y motivo completo. Cada tarjeta incluye botones de aprobar (banea al usuario automáticamente) y rechazar, ambos con modal de confirmación.

##### Autenticación y sidebar
El login redirige a `/admin/login` y protege todas las rutas `/admin/*` mediante middleware de Next.js que verifica la cookie de sesión. El sidebar muestra el nombre y correo real del administrador autenticado leídos desde el `AuthContext`. El botón de cerrar sesión llama al endpoint de logout del `admin-api`, limpia el localStorage y la cookie, y redirige al login.



#### 7.2.4 Aplicación móvil

Estado: ✅ Pantallas implementadas (integración con backend en progreso)

##### Navegación
La app usa un `BottomTabNavigator` personalizado con cinco tabs (Home, Progreso, Motivación, Cuidado, Social). El tab activo se indica con un círculo flotante animado mediante `Animated.spring` que se desplaza horizontalmente entre posiciones. Los tabs inactivos muestran el icono en gris; el activo muestra el icono en color `#00BCD4` con el label debajo en blanco.

Un componente `MainScreen` centraliza el estado del tab activo y renderiza la pantalla correspondiente, pasando `navigation` como prop.

##### Auth / Login / Registro
Pantallas de inicio de sesión y registro con validación de campos, manejo de errores de autenticación y redirección según el estado del onboarding del usuario.

##### Onboarding
Flujo interactivo de primer registro que recopila apodo, pronombre, motivo de sobriedad, gasto semanal estimado, preferencias de configuración y fecha de último consumo. Al completarse, crea los registros en `informacion_personal`, `config_usuarios` y `sobriedad` mediante el endpoint `/user/complete-profile`.

##### Home / Dashboard
Pantalla principal con el contador de días sobrio y dinero ahorrado calculados dinámicamente, estado visual de la mascota y accesos rápidos a los módulos. Incluye el Botón SOS con modo crisis.

##### Mi Progreso
Módulo de seguimiento con las siguientes sub-pantallas:
- **Check-in diario:** Registro del estado emocional del día con componente blob SVG animado que adapta su altura al contenido mediante `onLayout`.
- **Calendario de sobriedad:** Visualización mensual de días registrados.
- **Gráfica de evolución:** `LineChart` con `areaChart` de `react-native-gifted-charts` que muestra la evolución emocional en el tiempo.
- **Los 12 pasos:** Progreso visual del avance en el programa.

##### Cuidado
Pantallas de contenido educativo, recordatorios de rutinas, directorio de profesionales y fundaciones, y mapa referencial de zonas.

##### Motivación
Frase motivacional del día, retos individuales activos, sistema de logros con medallas e insignias, y visualización animada de la mascota evolutiva.


### 7.3 Integraciones

#### 7.3.1 Roble — Autenticación

**Estado: ✅ Funcionando**

Ambos backends se integran con el servicio de autenticación de Roble en `https://roble-api.openlab.uninorte.edu.co/auth/{projectToken}`. Las operaciones implementadas son:

| Operación Roble | Usada por | Descripción |
|---|---|---|
| `POST /login` | Login móvil y admin | Autentica usuario con email y contraseña; devuelve `accessToken`, `refreshToken` y datos del usuario |
| `POST /signup-direct` | Registro móvil | Crea usuario en el sistema de autenticación de Roble |
| `GET /verify-token` | Guards de JWT | Verifica validez del token activo |
| `POST /refresh-token` | Refresh de sesión | Renueva el accessToken usando el refreshToken |
| `POST /logout` | Logout | Invalida la sesión en Roble |
| `POST /forgot-password` | Recuperación | Dispara el flujo de recuperación de contraseña por correo |
| `POST /reset-password` | Recuperación | Restablece la contraseña con el token recibido |

El token del usuario de Roble se embebe dentro del JWT propio que genera el backend. Así, el frontend solo maneja el JWT del backend y nunca interactúa directamente con Roble.

#### 7.3.2 Roble — Base de datos

**Estado: ✅ Funcionando**

Ambos backends se conectan a la base de datos Roble en `https://roble-api.openlab.uninorte.edu.co/database/{projectToken}` mediante el `DatabaseService` (backend móvil) y el `RobleHttpService` (admin-api). Las operaciones disponibles son:

| Operación | Método HTTP | Descripción |
|---|---|---|
| `find` | GET `/read` | Lee registros de una tabla con filtros por igualdad exacta |
| `insert` | POST `/insert` | Inserta uno o varios registros |
| `update` | PUT `/update` | Actualiza campos de un registro por columna/valor |
| `delete` | DELETE `/delete` | Elimina un registro por columna/valor |

Dado que Roble solo soporta filtros de igualdad exacta, las consultas que requieren filtros complejos (rangos de fechas, múltiples condiciones, `IN`) se implementan recuperando el conjunto de registros y filtrando en memoria en el backend. Todos los timestamps se almacenan como `varchar(50)` en formato ISO 8601 y se parsean en el backend al procesarlos.

El acceso a la base de datos requiere autenticación con un **token maestro del sistema**, obtenido con las credenciales de una cuenta de sistema (`ROBLE_SYSTEM_EMAIL` / `ROBLE_SYSTEM_PASSWORD`). El `SystemAuthService` gestiona este token y lo renueva automáticamente ante un error 401, de forma transparente para los use cases.

#### 7.3.3 Integración frontend web ↔ admin-api

**Estado: ✅ Funcionando**

El panel web se comunica con el `admin-api` mediante Axios con un interceptor de request que inyecta automáticamente el header `Authorization: Bearer {token}` en cada petición, leyendo el token desde `localStorage`. Un interceptor de response detecta errores 401 y redirige al login limpiando la sesión.

La sesión del administrador se persiste en dos lugares simultáneamente:
- **`localStorage`**: Para que el interceptor de Axios pueda leer el token en requests del lado del cliente.
- **Cookie `admin_token`**: Para que el middleware de Next.js pueda proteger las rutas del panel en el servidor antes de renderizar la página.

El `AuthContext` provee el estado de sesión a todos los componentes del panel, incluyendo el nombre del usuario, su correo, su rol y los métodos `logout()` e `isSuperAdmin()`.

#### 7.3.4 Integración frontend móvil ↔ backend móvil

**Estado: 🔄 En progreso**

La app móvil consume los endpoints del `newlife-api`. Las pantallas de Auth, Onboarding, Home y Mi Progreso están integradas con sus endpoints correspondientes. Las pantallas de Cuidado, Motivación y Social están implementadas a nivel visual y se encuentran en proceso de integración con el backend.


### 7.4 Estado general de implementación

| Componente | Estado | Observaciones |
|---|---|---|
| **Backend móvil — Auth** | ✅ Completo | Login, registro, refresh, logout, recuperación |
| **Backend móvil — Users** | ✅ Completo | Perfil, onboarding, actualización, eliminación |
| **Backend móvil — Progress** | ✅ Completo | Check-in, sobriedad, 12 pasos, contactos |
| **Backend móvil — Home** | ✅ Completo | Dashboard con datos calculados |
| **Backend móvil — Communities** | ✅ Implementado | Correcciones menores pendientes |
| **Backend admin — Auth** | ✅ Completo | JWT separado, blacklist, roles |
| **Backend admin — Users** | ✅ Completo | CRUD con sincronización de roles |
| **Backend admin — Communities** | ✅ Completo | CRUD + gestión de miembros |
| **Backend admin — Ban Requests** | ✅ Completo | Aprobar/rechazar con baneo automático |
| **Landing page** | ✅ Completo | Landing page completo |
| **Panel web — Dashboard** | ✅ Integrado | Métricas reales + baneos inline |
| **Panel web — Usuarios** | ✅ Integrado | Filtros, cambio de estado y rol, admins |
| **Panel web — Comunidades** | ✅ Integrado | CRUD + miembros enriquecidos |
| **Panel web — Solicitudes de baneo** | ✅ Integrado | Aprobación y rechazo con confirmación |
| **App móvil — Auth / Onboarding** | ✅ Integrado | Flujo completo con backend |
| **App móvil — Home** | ✅ Integrado | Datos reales del backend |
| **App móvil — Mi Progreso** | ✅ Integrado | Check-in, gráficas, 12 pasos |
| **App móvil — Cuidado** | ✅ Visual | Integración con backend pendiente |
| **App móvil — Motivación** | ✅ Visual | Integración con backend pendiente |
| **App móvil — Social** | 🔄 En progreso | Backend listo, integración frontend pendiente |
| **Contenido educativo (admin)** | ⏳ Pendiente | Endpoints y UI por implementar |
| **Chat en tiempo real** | ⏳ Pendiente | Requiere decisión sobre WebSockets |
| **Notificaciones push** | ⏳ Pendiente | Por integrar |

## 8. Plan de pruebas

### 8.1 Estrategia general

El plan de pruebas de *NewLife* se estructura en tres niveles complementarios: pruebas por componente (unitarias y de módulo), pruebas de integración (flujos end-to-end entre frontend, backend y Roble) y pruebas de usabilidad con usuarios reales en proceso de rehabilitación. Cada nivel tiene objetivos, criterios de éxito y casos representativos definidos.

La ejecución sigue un orden incremental: primero se valida la lógica interna de cada módulo de forma aislada, luego se verifican los flujos completos del sistema, y finalmente se evalúa la experiencia del usuario con personas del grupo objetivo en colaboración con una fundación local.

### 8.2 Pruebas por componente

#### 8.2.1 Backend móvil (`newlife-api`)

Las pruebas unitarias del backend móvil se enfocan en los **use cases**, que concentran toda la lógica de negocio del sistema. Cada use case se prueba de forma aislada con dependencias mockeadas (`DatabaseService` y `SystemAuthService`).

##### Módulo Auth — casos representativos

| Caso de prueba | Entrada | Resultado esperado |
|---|---|---|
| Login exitoso con usuario ACTIVO | Email y contraseña válidos, estado ACTIVO | Devuelve `accessToken`, `refreshToken` y datos del usuario |
| Login bloqueado — usuario BANEADO | Credenciales válidas, estado BANEADO | Lanza `UnauthorizedException` con mensaje de cuenta baneada |
| Login bloqueado — usuario ELIMINADO | Credenciales válidas, estado ELIMINADO | Lanza `UnauthorizedException` con mensaje de cuenta eliminada |
| Suspensión vencida — reactivación automática | Estado SUSPENDIDO con `suspension_hasta` en el pasado | Cambia estado a ACTIVO y permite el login |
| Suspensión vigente — bloqueo | Estado SUSPENDIDO con `suspension_hasta` en el futuro | Lanza `UnauthorizedException` con fecha de vencimiento |
| Registro de usuario nuevo | Email no existente en tabla `usuarios` | Crea registro en `usuarios` y en tabla `camino` |
| Refresh de token válido | `refreshToken` vigente | Devuelve nuevo `accessToken` |

**Criterio de éxito:** Todos los estados posibles del usuario generan la respuesta correcta antes de llamar a la API de Roble. La creación de usuario nuevo genera exactamente dos registros en Roble (`usuarios` y `camino`).

##### Módulo Users — casos representativos

| Caso de prueba | Entrada | Resultado esperado |
|---|---|---|
| Obtener perfil existente | `userId` con registros en `usuarios` e `informacion_personal` | Devuelve objeto con nombre, apodo, pronombre, motivo y gasto |
| Onboarding — primer registro | `userId` sin registro previo en `informacion_personal` | Crea registros en `informacion_personal`, `config_usuarios` y `sobriedad` |
| Onboarding duplicado | `userId` con registro existente en `informacion_personal` | Lanza `ConflictException` |
| Actualizar perfil parcialmente | Solo `apodo` en el body | Actualiza únicamente ese campo; el resto no se modifica |
| Eliminar cuenta | `userId` válido | Cambia estado a ELIMINADO, invalida token en Roble, remueve de todas las comunidades |

**Criterio de éxito:** El onboarding crea exactamente tres registros en tablas distintas en una sola llamada. La actualización parcial solo modifica los campos enviados. La eliminación de cuenta genera la cadena completa de efectos secundarios.

##### Módulo Communities — casos representativos

| Caso de prueba | Entrada | Resultado esperado |
|---|---|---|
| Listar comunidades — usuario sin membresías | `userId` sin registros en `comunidad_usuarios` | Devuelve array vacío |
| Listar comunidades — filtra inactivas | Usuario con membresía en comunidad con `activa = false` | No incluye la comunidad inactiva en el resultado |
| Crear post — acceso SOLO_VER | `userId` con `tipo_acceso = SOLO_VER` | Lanza `ForbiddenException` |
| Crear post — acceso POSTEAR_COMENTAR | `userId` con `tipo_acceso = POSTEAR_COMENTAR` | Crea el post en la BD |
| Eliminar post propio | `autor_id` coincide con `userId` | Marca `eliminado = true` (soft delete) |
| Eliminar post ajeno — usuario normal | `autor_id` ≠ `userId`, `es_moderador = false` | Lanza `ForbiddenException` |
| Eliminar post ajeno — moderador | `autor_id` ≠ `userId`, `es_moderador = true` | Marca `eliminado = true` |
| Reacción toggle — primera vez | Reacción no existente | Crea reacción, devuelve `accion: "added"` |
| Reacción toggle — segunda vez | Reacción ya existente del mismo tipo | Elimina reacción, devuelve `accion: "removed"` |
| Acción de moderador — no moderador | `es_moderador = false` | Lanza `ForbiddenException` |
| Solicitud de baneo duplicada | Ya existe solicitud PENDIENTE para ese usuario/comunidad | Lanza `BadRequestException` |

**Criterio de éxito:** Los permisos de acceso se verifican antes de cualquier escritura en la BD. El soft delete nunca borra físicamente registros. El toggle de reacciones es idempotente (dos llamadas consecutivas dejan el estado como estaba).

##### Módulo Progress — casos representativos

| Caso de prueba | Entrada | Resultado esperado |
|---|---|---|
| Check-in del día — primer registro | `userId`, fecha actual, estado emocional | Crea registro en `registro_diario` |
| Check-in del día — ya registrado | `userId` con check-in del mismo día | Devuelve el registro existente sin duplicar |
| Calcular días sobrio | `fecha_ultimo_consumo` hace 30 días | Devuelve `dias_sobrio: 30` |
| Calcular dinero ahorrado | 30 días sobrio, `gasto_semanal: 50000` | Devuelve `dinero_ahorrado: 214285` (aproximado) |
| Reset de sobriedad | Nueva fecha de último consumo | Actualiza `sobriedad` y reinicia el contador |
| Avance en 12 pasos | `nivel: 3`, `subnivel: 2` | Actualiza registro en `camino` |

**Criterio de éxito:** El cálculo de días sobrios y dinero ahorrado es correcto para cualquier fecha válida. El check-in no genera duplicados para el mismo día.


#### 8.2.2 Backend admin (`admin-api`)

Las pruebas del `admin-api` se enfocan en los use cases de la capa de aplicación, verificando la lógica de negocio compleja —especialmente la sincronización de roles y los efectos en cascada de los cambios de estado.

##### Casos representativos

| Caso de prueba | Resultado esperado |
|---|---|
| Login con rol USUARIO | Lanza `ForbiddenException` — acceso denegado |
| Login con rol ADMIN | Devuelve JWT del admin con `rol: ADMIN` |
| Cambiar estado a BANEADO | Usuario se remueve de todas sus comunidades |
| Cambiar estado a ELIMINADO | Usuario se remueve de todas sus comunidades |
| Asignar moderador — usuario con rol USUARIO | `rol` en tabla `usuarios` sube a `MODERADOR` |
| Quitar moderador — único moderador | `rol` baja a `USUARIO` |
| Quitar moderador — moderador en otra comunidad | `rol` se mantiene en `MODERADOR` |
| Eliminar miembro que es moderador único | `rol` baja a `USUARIO` en tabla `usuarios` |
| Agregar miembro BANEADO | Lanza `BadRequestException` |
| Aprobar solicitud de baneo | Cambia estado del usuario a `BANEADO` y estado de la solicitud a `APROBADA` |
| Resolver solicitud ya resuelta | Lanza `BadRequestException` |
| Eliminar SUPERADMIN | Lanza `ForbiddenException` |
| Token en blacklist tras logout | El JWT invalidado no puede usarse en requests posteriores |

**Criterio de éxito:** Todas las sincronizaciones de rol son correctas en los casos borde (moderador en múltiples comunidades, moderador único). Los efectos en cascada del baneo/eliminación son completos y atómicos.


#### 8.2.3 Panel de administración web

Las pruebas del panel web se enfocan en la interacción con la API y el comportamiento de los componentes de UI en estados de carga, error y éxito.

| Caso de prueba | Resultado esperado |
|---|---|
| Acceso a `/admin/dashboard` sin sesión | Redirección a `/admin/login` |
| Login con credenciales incorrectas | Mensaje de error visible; no redirige |
| Token expirado en petición | Redirección automática a `/admin/login` |
| Cambiar estado a SUSPENDIDO sin días | Botón de confirmar deshabilitado o error de validación |
| Crear comunidad con nombre vacío | Campo marcado como inválido; no se envía la petición |
| Aprobar baneo — confirmación requerida | Modal aparece antes de ejecutar la acción |
| Datos de usuario en sidebar | Nombre y correo reales del admin autenticado |
| Sección de admins — usuario ADMIN | Sección no visible (solo SUPERADMIN la ve) |

**Criterio de éxito:** Ninguna acción destructiva (banear, eliminar, rechazar) se ejecuta sin confirmación explícita del usuario. Los errores de la API se muestran en pantalla y no colapsan la aplicación.


### 8.3 Pruebas de integración

Las pruebas de integración verifican flujos completos que atraviesan múltiples componentes: app móvil → backend → Roble, o panel web → admin-api → Roble. Se ejecutan contra el entorno de staging con todos los servicios levantados.

#### 8.3.1 Flujo de autenticación completo

**Objetivo:** Verificar que el ciclo completo de sesión funciona de extremo a extremo.

| Paso | Acción | Verificación |
|---|---|---|
| 1 | Registro de nuevo usuario | Usuario aparece en tabla `usuarios` con estado `ACTIVO` y rol `USUARIO` |
| 2 | Login con credenciales correctas | Se recibe JWT propio del backend y refreshToken de Roble |
| 3 | Petición autenticada a `/user/profile` | Responde con datos del perfil; header Authorization es aceptado |
| 4 | Refresh del token | Se recibe nuevo JWT sin necesidad de login |
| 5 | Logout | El JWT previo ya no puede usarse en peticiones posteriores |
| 6 | Login con cuenta BANEADA | Error 401 con mensaje de cuenta baneada |

**Criterio de éxito:** Cada paso genera exactamente los registros y respuestas esperados. El token invalidado en el paso 5 devuelve 401 en cualquier endpoint protegido.

#### 8.3.2 Flujo de onboarding

**Objetivo:** Verificar que el onboarding crea todos los registros necesarios y bloquea el doble registro.

| Paso | Acción | Verificación |
|---|---|---|
| 1 | GET `/user/onboarding-status` con usuario nuevo | `{ completed: false }` |
| 2 | POST `/user/complete-profile` con datos válidos | Se crean registros en `informacion_personal`, `config_usuarios` y `sobriedad` |
| 3 | GET `/user/onboarding-status` | `{ completed: true }` |
| 4 | POST `/user/complete-profile` nuevamente | Error 409 `ConflictException` |

**Criterio de éxito:** Exactamente tres tablas reciben un registro nuevo en el paso 2. El paso 4 no genera ningún registro adicional.

#### 8.3.3 Flujo del módulo social

**Objetivo:** Verificar la cadena completa de interacciones en una comunidad.

| Paso | Acción | Verificación |
|---|---|---|
| 1 | Admin agrega usuario A a comunidad con acceso POSTEAR_COMENTAR | Usuario A aparece en `comunidad_usuarios` |
| 2 | Usuario A: GET `/communities` | Devuelve la comunidad con `tipo_acceso: POSTEAR_COMENTAR` |
| 3 | Usuario A: POST `/communities/:id/posts` | Post creado con `eliminado: false` |
| 4 | Usuario B (SOLO_VER): POST `/communities/:id/posts` | Error 403 |
| 5 | Usuario A: POST `/communities/:id/posts/:id/reactions` con LIKE | Reacción creada; `accion: "added"` |
| 6 | Usuario A: POST mismo endpoint con LIKE nuevamente | Reacción eliminada; `accion: "removed"` |
| 7 | Admin asigna moderador a usuario C | `rol` de C en tabla `usuarios` sube a `MODERADOR` |
| 8 | Usuario C elimina post de usuario A | Post marcado con `eliminado: true` |
| 9 | Admin banea a usuario A | A desaparece de `comunidad_usuarios` |
| 10 | Usuario A intenta login | Error 401 — cuenta baneada |

**Criterio de éxito:** Todos los pasos generan el estado esperado en la BD. El paso 9 tiene efecto inmediato: al intentar login en el paso 10, el sistema bloquea el acceso antes de llamar a Roble.

#### 8.3.4 Flujo de solicitud de baneo

**Objetivo:** Verificar el ciclo completo desde la solicitud del moderador hasta la resolución por el admin.

| Paso | Acción | Verificación |
|---|---|---|
| 1 | Moderador: POST `/communities/:id/ban-requests` | Registro en `solicitudes_baneo` con estado `PENDIENTE` |
| 2 | Admin: GET `/api/web/admin/ban-requests` | Solicitud aparece en el panel |
| 3 | Admin: PATCH con `estado: APROBADA` | Usuario pasa a `BANEADO`; solicitud pasa a `APROBADA` |
| 4 | Usuario baneado intenta login | Error 401 |
| 5 | Moderador intenta crear nueva solicitud para el mismo usuario | Error 400 — ya existe solicitud resuelta (estado distinto a PENDIENTE) |

**Criterio de éxito:** La aprobación ejecuta dos escrituras atómicas (usuario + solicitud). El estado de la solicitud refleja siempre la decisión tomada.

#### 8.3.5 Manejo de errores críticos

| Escenario | Comportamiento esperado |
|---|---|
| Roble no disponible durante login | Error 503 con mensaje descriptivo; no colapsa el servidor |
| Token maestro expirado durante request | `SystemAuthService` renueva automáticamente y reintenta |
| Request con JWT expirado | Error 401; panel web redirige al login |
| Body con campos faltantes en POST | Error 400 con detalle de validación por campo |
| ID de recurso inexistente | Error 404 con mensaje claro |
| Acción sobre recurso de otra comunidad | Error 404 (no revela existencia del recurso) |


### 8.4 Pruebas de usabilidad

#### 8.4.1 Contexto y participantes

Las pruebas de usabilidad se realizarán en **dos rondas**, en colaboración con una fundación local que trabaja con jóvenes en proceso de rehabilitación por consumo de alcohol en Barranquilla. La fundación facilitará el contacto y la coordinación con los participantes, garantizando que el reclutamiento se realice de forma ética y con el consentimiento informado de cada persona.

**Perfil de participantes:**
- Jóvenes entre 18 y 24 años en proceso de rehabilitación o post-rehabilitación por adicción al alcohol
- Residentes en Barranquilla
- Con acceso a un dispositivo móvil (Android preferiblemente para la primera ronda)
- Mínimo 5 participantes por ronda (n ≥ 5)

**Consideraciones éticas:**
- Participación completamente voluntaria con consentimiento informado firmado
- Los datos recopilados son anónimos y se usan exclusivamente con fines académicos
- Las sesiones no graban audio ni video del participante sin autorización explícita
- El equipo no accede a datos personales de salud ni historial clínico de los participantes

#### 8.4.2 Objetivos de las pruebas

Las pruebas de usabilidad buscan responder las siguientes preguntas:

1. ¿El flujo de onboarding es claro y comprensible para el usuario objetivo?
2. ¿El usuario puede registrar su check-in diario sin instrucción previa?
3. ¿La navegación entre módulos es intuitiva con el tab navigator personalizado?
4. ¿El botón SOS es fácilmente localizable en una situación de crisis simulada?
5. ¿El módulo Social (comunidades, posts, foros) es comprensible sin explicación previa?
6. ¿El lenguaje, los iconos y los colores son apropiados para el contexto de recuperación?

#### 8.4.3 Metodología

Se utilizará una combinación de **prueba de tareas moderada** y **escala de usabilidad estandarizada**.

**Formato de la sesión (45-60 minutos por participante):**

1. **Introducción (5 min):** Explicación del propósito de la prueba, firma del consentimiento informado y aclaración de que se evalúa la app, no al usuario.
2. **Exploración libre (5 min):** El participante navega la app sin instrucciones para identificar impresiones iniciales.
3. **Tareas guiadas (25-30 min):** El moderador pide al participante completar tareas específicas en voz alta (think-aloud protocol), sin ayuda del equipo.
4. **Cuestionario post-sesión (10 min):** El participante completa la escala SUS y preguntas abiertas.
5. **Entrevista de cierre (5-10 min):** Preguntas sobre aspectos que confundieron, lo que más les gustó y sugerencias de mejora.

**Tareas de la prueba (ronda 1):**

| # | Tarea | Módulo | Criterio de éxito |
|---|---|---|---|
| T1 | "Abre la app y crea una cuenta nueva" | Auth | Completa el registro sin ayuda en < 3 min |
| T2 | "Completa tu perfil inicial" | Onboarding | Completa los 5 pasos del onboarding sin abandonar |
| T3 | "Registra cómo te sientes hoy" | Mi Progreso | Encuentra y completa el check-in diario |
| T4 | "Encuentra cuántos días llevas sin consumir" | Home | Localiza el contador de sobriedad en < 30 seg |
| T5 | "Encuentra el botón de ayuda de emergencia" | Home / SOS | Localiza el botón SOS en < 20 seg |
| T6 | "Lee el contenido educativo disponible" | Cuidado | Navega al módulo y abre al menos un artículo |
| T7 | "Revisa tus logros y retos" | Motivación | Encuentra la sección de logros e insignias |
| T8 | "Entra a tu comunidad y lee lo que han publicado" | Social | Navega a la comunidad y lee el feed de posts |
| T9 | "Publica algo en tu comunidad" | Social | Crea un post exitosamente |

**Métricas a recopilar por tarea:**
- Tasa de éxito (completó la tarea: sí / con ayuda / no)
- Tiempo de completación
- Número de errores o navegaciones incorrectas
- Comentarios verbales durante el think-aloud

#### 8.4.4 Instrumentos de medición

**System Usability Scale (SUS):**
Cuestionario estándar de 10 ítems con escala Likert de 5 puntos que produce una puntuación de 0 a 100. Una puntuación ≥ 70 se considera aceptable; ≥ 85 se considera excelente.

**Preguntas abiertas post-sesión:**
1. ¿Hubo alguna parte de la app que te resultó confusa o difícil de entender?
2. ¿Hay algo que esperabas encontrar y no encontraste?
3. ¿El lenguaje y las imágenes de la app te parecen apropiados para tu situación?
4. ¿Usarías esta aplicación en tu proceso de recuperación? ¿Por qué?

#### 8.4.5 Criterios de aceptación

| Métrica | Criterio mínimo aceptable |
|---|---|
| Puntuación SUS promedio | ≥ 70 puntos |
| Tasa de éxito en tareas críticas (T3, T4, T5) | ≥ 80 % sin ayuda |
| Tasa de éxito en tareas generales | ≥ 70 % sin ayuda |
| Tiempo en T5 (botón SOS) | ≤ 20 segundos en ≥ 80 % de participantes |
| Participantes que usarían la app | ≥ 60 % respuesta afirmativa |

#### 8.4.6 Proceso iterativo entre rondas

**Ronda 1** se realiza con la primera versión funcional de la app, enfocada en los módulos de Auth, Onboarding, Home, Mi Progreso, Cuidado y Motivación.

Entre rondas, el equipo analiza los resultados, identifica los problemas de usabilidad más frecuentes (priorizados por severidad e impacto) y realiza ajustes de diseño e implementación. Los cambios se documentan en una bitácora de iteración.

**Ronda 2** incluye los ajustes de la ronda 1 y agrega el módulo Social completo. Se repiten las tareas modificadas y se agregan las nuevas (T8, T9). El objetivo de la ronda 2 es verificar que los problemas identificados fueron resueltos y que el módulo Social es usable por el perfil objetivo.

Los resultados de ambas rondas se documentan en el informe final del proyecto con comparativa de métricas entre rondas.




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

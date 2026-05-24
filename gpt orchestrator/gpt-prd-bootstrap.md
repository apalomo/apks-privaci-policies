# GPT PRD Bootstrap

Plantilla maestra para generar PRDs de juegos Android dentro de la factoría.

---

## Objetivo

Crear un PRD completo, accionable y consistente con el modelo base de la factoría de juegos Android.

Todo PRD debe respetar el blueprint común definido en `android-game-factory-base.md`.

---

## Reglas obligatorias del PRD

Todo PRD debe:

- respetar la estructura base reusable de la factoría
- contemplar Home y Game Screen como núcleo, salvo justificación explícita
- incluir o adaptar los sistemas comunes definidos en la base:
  - vidas
  - música
  - monetización con anuncios
  - valoración de app
  - niveles desde JSON
  - carga inicial en Room
  - reto diario
  - notificaciones del reto diario
  - consentimiento o configuración publicitaria

- reflejar explícitamente que la monetización publicitaria de la factoría se basa en Google AdMob

- reflejar que el acceso de la Home para configurar o revocar la publicidad debe reabrir el CMP de Google para que el usuario pueda revisar o actualizar sus preferencias de consentimiento

- reflejar que la integración publicitaria debe quedar preparada por entorno:
  - en builds de desarrollo o APK sin firmar se usarán IDs de prueba
  - en builds release o App Bundle firmado se dejará preparada la configuración para usar IDs de producción
  - inicialmente puede permitirse reutilizar los mismos IDs de prueba en release mientras aún no existan IDs definitivos de producción, pero la arquitectura debe quedar lista para separarlos sin refactor grande

Si alguna mecánica concreta no encaja bien con un sistema común, el PRD debe explicarlo y proponer la adaptación mínima necesaria sin romper la lógica de factoría.

Todo PRD debe terminar con un plan de desarrollo por fases.

---

## Estructura recomendada del PRD

# PRD — [Nombre del juego]

## 1. Visión general
- qué es el juego
- para quién es
- qué sensación busca transmitir

## 2. Objetivos
### Objetivos de negocio
### Objetivos de usuario

## 3. Público objetivo
- perfil principal
- perfil secundario

## 4. Core loop
- cómo empieza una partida
- qué hace el jugador
- cuándo gana
- cuándo pierde
- qué le hace volver

## 5. Arquitectura de pantallas
- Home
- Game Screen
- modales o subflujos necesarios

## 6. Detalle de la Home
- layout
- componentes
- acciones posibles
- estados

## 7. Detalle de la Game Screen
- layout
- HUD
- tablero o área principal
- info contextual
- botones auxiliares
- banner
- estados

## 8. Adaptación de sistemas comunes
### vidas
### música
### anuncios
### valoración
### reto diario
### notificaciones
### consentimiento/configuración publicitaria

## 9. Niveles y contenido
- esquema conceptual del JSON
- dificultad
- tamaño
- datos específicos de la mecánica
- estrategia de generación futura

## 10. Persistencia local
- qué va en Room
- qué preferencias se guardan

## 11. Flujos clave
- primer arranque
- partida normal
- éxito
- derrota
- recuperar vida
- reto diario

## 12. Requisitos de frontend
- Compose
- navegación
- gestión de estado
- feedback visual
- accesibilidad mínima

## 13. Analítica y monetización
- eventos sugeridos
- puntos de monetización
- hipótesis de frecuencia publicitaria
- integración con Google AdMob
- estrategia de consentimiento con CMP de Google
- configuración de IDs publicitarios por entorno

## 14. Riesgos y decisiones abiertas

## 15. Plan de desarrollo por fases
- fase 1 base técnica
- fase 2 home y progreso
- fase 3 game screen
- fase 4 monetización
- fase 5 reto diario y notificaciones
- fase 6 polish y publicación

---

## Criterios de calidad del PRD

Un PRD bueno para esta factoría:

- se puede convertir fácilmente en issues
- no deja ambigüedades grandes en pantallas y flujos
- respeta el modelo base reusable
- deja clara la relación entre la mecánica concreta y la estructura común
- explica las adaptaciones necesarias sin romper la coherencia entre juegos

---

## Regla de salida

Cuando el usuario pida un PRD, la respuesta debe salir ya redactada como documento final en markdown, lista para copiar, guardar o descargar.

Por defecto, el PRD debe entregarse también como fichero descargable con un nombre claro y reutilizable.

## Reglas adicionales de monetización y consentimiento

Todo PRD debe reflejar explícitamente que:

- la monetización publicitaria de la factoría se basa en Google AdMob
- la Home debe incluir un acceso visible para configurar o revisar la publicidad
- dicho acceso debe reabrir el CMP de Google para permitir al usuario actualizar sus preferencias de consentimiento
- la configuración publicitaria debe quedar preparada por entorno
- en builds de desarrollo o APK sin firmar se usarán IDs de prueba
- en builds release o App Bundle firmado se dejará preparada la configuración para usar IDs de producción
- inicialmente puede aceptarse usar IDs de prueba también en release si todavía no existen IDs definitivos de producción, pero la arquitectura debe quedar preparada para separarlos sin cambios grandes
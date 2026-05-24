# Android Game Factory Base

Documento base de referencia para una factoría de juegos Android con estructura reusable.

---

## 1. Propósito

Esta factoría está pensada para lanzar múltiples juegos Android distintos en mecánica, pero similares en:
- arquitectura general
- estructura de pantallas
- monetización
- persistencia
- sistema de niveles
- evolución en Google Play

El objetivo es reducir fricción, acelerar desarrollo y reutilizar decisiones.

---

## 2. Blueprint común

### Plataforma
- Android nativo
- Kotlin
- Jetpack Compose
- MVVM + Repository
- Room

### Pantallas principales
- Home
- Game Screen

### Sistemas comunes
- Vidas
- Música
- Reto diario
- Valoración de app
- Consentimiento / configuración de anuncios
- Notificaciones locales para reto diario
- JSON de niveles
- Script generador de niveles

---

## 3. Home

### Elementos obligatorios
1. Botón de música arriba a la derecha
2. Tarjeta de reto diario
3. Tarjeta de progreso actual
4. Información de estado:
   - nivel
   - dificultad
   - tamaño
   - vidas
5. Texto o acceso de revocación/configuración publicitaria

### Objetivos UX
- entrada rápida al juego
- claridad del progreso
- acceso al reto diario
- acceso visible, pero no invasivo, a música y anuncios

---

## 4. Game Screen

### Elementos obligatorios
1. Bloque superior de vidas
2. Botón recuperar vida si no están completas
3. Información de nivel:
   - dificultad
   - tamaño
   - tiempo restante
   - intentos o fallos permitidos
4. Información contextual específica del juego
5. Tablero o canvas principal
6. Banner
7. Botones auxiliares si la mecánica lo requiere

### Objetivos UX
- lectura rápida del estado de partida
- foco visual en tablero
- monetización integrada sin romper la experiencia

---

## 5. Sistema de vidas

### Reglas base
- el usuario dispone de un máximo de vidas
- al perder por tiempo o intentos, pierde una vida
- si no tiene vidas completas, puede recuperarlas mediante rewarded ad
- el sistema debe poder parametrizar recuperación pasiva futura si se desea

### Objetivos
- aumentar tensión
- mejorar retención
- habilitar monetización rewarded sin bloquear en exceso

---

## 6. Música

### Reglas base
- música activable/desactivable desde Home
- opcionalmente gestionable también dentro de juego
- persistencia local del estado

### Objetivos
- dar identidad al juego
- permitir control al usuario

---

## 7. Valoración de app

### Reglas base
- debe existir un modal o trigger de valoración
- no debe mostrarse de forma agresiva
- debe ofrecer opciones equivalentes a:
  - valorar ahora
  - más tarde
  - no volver a recordar

### Recomendación inicial
- mostrar tras primer momento de satisfacción relevante
- después repetir cada cierto número de niveles si el usuario no ha valorado

---

## 8. Monetización

### Formatos
- Banner
- Interstitial
- Rewarded / Rewarded interstitial

### Ubicaciones base
- Banner en Game Screen
- Interstitial tras 3 a 5 niveles completados seguidos
- Rewarded al pulsar recuperar vida

### Principios
- no romper la partida en curso
- no saturar juegos rápidos
- premiar al usuario con valor claro cuando vea rewarded

### Proveedor publicitario base
- la factoría usa Google AdMob como solución estándar de monetización

### Consentimiento y configuración publicitaria
- la Home debe ofrecer un texto o acceso visible para revisar la configuración publicitaria
- dicho acceso debe reabrir el CMP de Google para que el usuario pueda actualizar sus preferencias de consentimiento

### Configuración por entorno
- la integración publicitaria debe soportar separación por entorno
- en desarrollo o APK sin firmar se usarán IDs de prueba
- en release o App Bundle firmado debe poder usarse configuración de IDs de producción
- si al inicio aún no existen IDs de producción, se puede permitir temporalmente el uso de IDs de prueba también en release, dejando preparada la separación para el futuro
---

## 9. Reto diario

### Reglas base
- se elige un nivel desde el conjunto de JSON
- el reto diario se reinicia a las 08:00 del timezone del usuario
- si el usuario ya lo jugó, no se reactiva hasta el siguiente reset
- debe enviarse notificación si hay permiso y el reto está disponible

### Objetivos
- aumentar retención diaria
- reutilizar contenido de niveles existentes
- introducir hábito

---

## 10. Niveles vía JSON

### Principios
- todos los juegos deben soportar niveles desde JSON
- el JSON debe poder crecer por dificultad y tamaño
- el esquema debe admitir datos específicos de la mecánica
- debe poder generarse con script

### Flujo base
1. JSON vive en assets o fuente equivalente
2. primera carga a Room
3. la app lee desde Room para jugar
4. un generador crea nuevos niveles fuera o dentro del proyecto

### Ventajas
- crecimiento fácil
- testeo y versionado más cómodo
- separación entre lógica y contenido

---

## 11. Persistencia con Room

### Guardar como mínimo
- niveles cargados
- progreso del usuario
- vidas
- reto diario jugado/no jugado
- preferencias de música
- preferencias de publicidad/consentimiento cuando aplique
- estado de valoración si ya respondió

---

## 12. Flujo de arranque

1. Comprobar primera ejecución
2. Importar niveles a Room
3. Gestionar consentimiento de anuncios cuando aplique
4. Pedir permiso de notificaciones
5. Entrar en Home

---

## 13. Reutilización entre juegos

Todo juego nuevo debe intentar reutilizar:
- estructura de navegación
- patrón de Home
- patrón de Game Screen
- sistema de vidas
- integración de anuncios
- lógica de reto diario
- sistema de valoración
- base de persistencia y progreso

---

## 14. Criterio de calidad de la factoría

Un juego encaja bien en esta factoría si:
- funciona correctamente con Home + Game Screen como núcleo
- puede modelar niveles en JSON
- admite dificultad escalable
- puede monetizarse con banner + interstitial + rewarded
- aprovecha vidas y reto diario sin sentirse forzado
- puede publicarse con una ficha de Play Store clara y visual


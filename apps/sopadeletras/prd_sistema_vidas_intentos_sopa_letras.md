
# PRD — Sistema de Vidas e Intentos

## Producto
Sopa de Letras (Android)

## Versión objetivo
v1.2

## Estado
Draft

---

# 1. Contexto

Los niveles del juego se definen mediante archivos JSON.  
Cada nivel incluye actualmente una propiedad:

```json
"hint"
```

A partir de esta versión, el campo **`hint` representará el número de intentos permitidos para completar el nivel**.

Se introduce un sistema de:

- **Intentos por nivel**
- **Vidas globales del jugador**

Este sistema añade:

- dificultad progresiva
- mayor engagement
- base para monetización futura (ads o recuperación de vidas)

---

# 2. Objetivos

## Objetivos principales

1. Introducir **intentos limitados por nivel**
2. Introducir **vidas globales del jugador**
3. Reducir vidas cuando el jugador **agota los intentos**
4. Evitar que el jugador continúe jugando si **no tiene vidas**

## Objetivos secundarios

- Preparar la arquitectura para monetización futura
- Aumentar el reto del juego
- Mejorar la retención del jugador

---

# 3. Conceptos clave

## Intentos (Attempts)

Los intentos son el número de **errores permitidos dentro de un nivel**.

Se inicializan con el valor:

```
hint
```

Ejemplo JSON:

```json
{
  "level": 10,
  "size": 10,
  "words": ["JAVA", "KOTLIN", "SWIFT"],
  "hint": 3
}
```

Esto significa:

```
Errores permitidos = 3
```

Cada selección incorrecta consume un intento.

---

## Vidas (Lives)

Las vidas representan el número de **oportunidades globales del jugador**.

Ejemplo:

```
vidas_maximas = 5
```

Si el jugador pierde todas las vidas:

- no puede iniciar nuevos niveles
- debe esperar recuperación de vidas o ver anuncios (funcionalidad futura)

---

# 4. Reglas del sistema

## Inicio del nivel

Cuando el jugador entra a un nivel:

```
remainingAttempts = hint
```

Ejemplo:

```
hint = 3
remainingAttempts = 3
```

## Selección incorrecta

Si el jugador marca una palabra incorrecta:

```
remainingAttempts --
```

## Intentos agotados

Si:

```
remainingAttempts == 0
```

Entonces:

```
playerLives --
nivel = FAILED
```

## Nivel completado

Si el jugador encuentra todas las palabras:

```
nivel = COMPLETED
```

No se consumen vidas.

## Sin vidas

Si:

```
playerLives == 0
```

Entonces:

- no se pueden iniciar niveles
- se muestra pantalla de sin vidas

---

# 5. Flujo de gameplay

Flujo:

Jugador entra al nivel  
↓  
remainingAttempts = hint  
↓  
Jugador juega  
↓  
¿Error?  
↓  
remainingAttempts --  
↓  
¿remainingAttempts == 0?  
↓  
Sí → vida perdida  
No → continuar jugando  

---

# 6. Estados del nivel

```
NOT_STARTED
IN_PROGRESS
FAILED
COMPLETED
```

---

# 7. Estado del jugador

El jugador tiene el siguiente estado global:

```
playerLives
maxLives
```

Ejemplo:

```
playerLives = 5
maxLives = 5
```

---

# 8. Persistencia

Se deben guardar en almacenamiento local:

```
playerLives
currentLevelSession
remainingAttempts
```

Opciones:

- SharedPreferences
- Room Database

---

# 9. UI

## Indicador de vidas

Mostrar en la parte superior del juego.

Ejemplo:

❤️❤️❤️❤️❤️

o

```
Lives: 5
```

## Intentos restantes

Dentro del nivel mostrar:

```
Intentos restantes: 3
```

o

```
Errores restantes: 3
```

---

# 10. Pantalla de derrota

Cuando el jugador pierde el nivel:

Mostrar:

```
Has agotado tus intentos
Pierdes una vida
```

Botones:

```
Reintentar
Volver al menú
```

---

# 11. Edge cases

## Cierre de la app

Si la app se cierra durante un nivel:

Debe restaurarse:

```
remainingAttempts
palabras encontradas
estado del nivel
```

## Salir del nivel

Si el jugador sale voluntariamente:

```
estado = IN_PROGRESS
```

Al volver debe restaurarse.

---

# 12. Métricas

Registrar eventos:

```
level_started
attempt_used
level_failed
life_lost
level_completed
```

Esto permitirá:

- balancear dificultad
- ajustar `hint` en futuros niveles

---

# 13. Cambios en JSON

No se modifica el formato actual.

Se redefine el significado de:

```
hint = número máximo de errores permitidos
```

---

# 14. Criterios de aceptación

✔ Cada nivel tiene intentos limitados  
✔ Cada error reduce los intentos  
✔ Al agotar intentos se pierde una vida  
✔ El nivel pasa a estado FAILED  
✔ Las vidas del jugador se actualizan correctamente  
✔ Si el jugador tiene 0 vidas no puede jugar  

---

# 15. Pseudocódigo

```kotlin
fun onWrongSelection() {

    remainingAttempts--

    if (remainingAttempts <= 0) {

        playerLives--

        if (playerLives <= 0) {
            showNoLivesScreen()
        } else {
            showLevelFailed()
        }
    }
}
```

---

# 16. Roadmap futuro

## v1.3

- regeneración automática de vidas
- anuncios para recuperar vida

## v1.4

- sistema de monedas
- compra de pistas
- compra de vidas

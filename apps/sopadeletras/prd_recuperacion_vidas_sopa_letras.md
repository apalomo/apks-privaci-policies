
# 17. Recuperación de vidas (Life Recovery)

Las vidas del jugador se regeneran automáticamente con el paso del tiempo.

Este sistema permite que el jugador pueda volver a jugar sin necesidad de pagar o ver anuncios, evitando frustración y favoreciendo ciclos naturales de uso del juego.

---

## Reglas de recuperación

Las vidas se regeneran con el siguiente comportamiento:

```
1 vida cada 30 minutos
```

Condiciones:

- Las vidas solo se regeneran si el jugador tiene menos de `maxLives`
- Si el jugador ya tiene `maxLives`, no se generan vidas adicionales

Ejemplo:

```
maxLives = 5
playerLives = 2
```

Después de 30 minutos:

```
playerLives = 3
```

---

## Persistencia necesaria

Para calcular correctamente la regeneración de vidas se deben almacenar los siguientes valores:

```
playerLives
lastLifeTimestamp
```

Donde:

- `playerLives` → número actual de vidas del jugador
- `lastLifeTimestamp` → timestamp de la última vez que se perdió o recuperó una vida

---

## Cálculo de regeneración

Cada vez que el jugador abre la aplicación o vuelve al menú principal se calcula la regeneración de vidas.

Cálculo:

```
timePassed = now - lastLifeTimestamp
livesRecovered = floor(timePassed / lifeRecoveryInterval)
```

Actualización de vidas:

```
playerLives = min(maxLives, playerLives + livesRecovered)
```

Si se han recuperado vidas, se actualiza el timestamp.

---

## Pseudocódigo

```kotlin
val timePassed = now - lastLifeTimestamp
val livesRecovered = timePassed / LIFE_RECOVERY_INTERVAL

playerLives = min(maxLives, playerLives + livesRecovered)

if (livesRecovered > 0) {
    lastLifeTimestamp = now
}
```

---

## UI cuando no quedan vidas

Cuando el jugador tiene `0` vidas se mostrará una pantalla informativa indicando cuándo se recuperará la siguiente vida.

Ejemplo:

```
Sin vidas
Nueva vida en: 12:34
```

---

## Opciones futuras

El sistema de vidas debe permitir ampliar funcionalidades en futuras versiones:

- Ver anuncio recompensado para recuperar 1 vida
- Compra de packs de vidas
- Bonus diario de vidas
- Eventos especiales con vidas ilimitadas temporales

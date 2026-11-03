# 🎃 ¿Noche ideal para pedir dulces?

App web de Halloween que consulta el clima de una ciudad y decide si conviene salir a pedir dulces (18:00–22:00 hora local).

## Servicios XaaS
| Modelo | Servicio | Uso |
|---|---|---|
| **IaaS de datos – Information as a Service** | [Open-Meteo](https://open-meteo.com) (geocoding + forecast, sin API key) | Coordenadas y pronóstico por hora |
| **PaaS** | [Vercel](https://vercel.com) | Hosting estático + función serverless `api/noche.js` |

## Arquitectura
Navegador (`index.html`) → `/api/noche?city=` (Vercel Function) → Open-Meteo → puntaje 0–100 + veredicto.

## Puntaje
Parte de 100 y resta por: probabilidad de lluvia, precipitación, viento, frío/calor extremo y tormentas.
≥75 perfecta · 50–74 con precauciones · <50 quedarse en casa.

## Desplegar
```bash
npm i -g vercel
cd noche-de-dulces
vercel dev      # prueba local
vercel --prod   # publicar
```

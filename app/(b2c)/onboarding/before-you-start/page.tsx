/**
 * /onboarding/before-you-start — redirige al mapa.
 *
 * Esta pantalla pertenece al funnel anterior a ADR-029. Su contenido decia
 * "Vas a ver 60 actividades" y "10-12 minutos" —las cifras de UN test— con el
 * CTA fijo a un instrumento concreto, y contradecia de frente el mapa vigente
 * de cuatro paradas y 12-18 minutos, ademas del orden BFI-first. Tambien
 * resolvia el resume por cookie de sesion anonima, que el funnel signup-first
 * ya no produce.
 *
 * Quedaba huerfana: su unica entrada era el fallback del estado `locked` de
 * /perfil-integrado, que ahora apunta al mapa. Los dos specs E2E que la
 * conducian (`full-flow-onet-anonymous`, `pause-resume`) fueron borrados al
 * mergear el PR #36, que retiro los specs del funnel muerto.
 *
 * El archivo NO se borra: la ruta puede estar en un marcador o en un enlace
 * viejo, y un redirect es preferible a un 404. Si se decide retirarla del todo,
 * borrar esta carpeta y `lib/i18n/microcopy/es-CO/before-you-start.ts` con ella
 * — esa microcopy queda sin consumidor desde este cambio, pero es zona Cowork
 * y no se toca sin su visto bueno.
 *
 * Anchors:
 * - ADR-029 (funnel signup-first).
 * - app/(b2c)/onboarding/mapa/page.tsx (la entrada viva del flujo).
 */
import { redirect } from "next/navigation";

export default function BeforeYouStartPage() {
  redirect("/onboarding/mapa");
}

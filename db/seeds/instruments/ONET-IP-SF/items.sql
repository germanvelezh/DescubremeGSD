-- O*NET IP-SF 60 items es-CO seed — DescubreMe Phase 1 Wave 3 (Plan 01-06).
--
-- Inserts the 60 items of the O*NET Interest Profiler Short Form, ordered
-- R1..R10, I1..I10, A1..A10, S1..S10, E1..E10, C1..C10 (sequence_number 1..60).
-- All stems are es-CO. Verbatim source: the "Propuesta es-CO" column of
-- `implementation_packs/O-NET-IP-SF_LEXICAL_PILOT_FIELD_KIT_v1.0.md §B-2`.
-- For items marked "Mantener" the stem is the inferred Mi Próximo Paso text
-- (also documented in §B-2). All `reverse_key=false` per Pack §4.
--
-- IDEMPOTENT: scopes INSERT via `(instrument_version_id, sequence_number)`
-- uniqueness, idempotent on re-run via `NOT EXISTS`. Drops nothing.
--
-- Anchors:
--   - implementation_packs/O-NET-IP-SF_Implementation_Acquisition_Pack_v1.0_Consolidado.md §1.1, §2.2, §4.
--   - implementation_packs/O-NET-IP-SF_LEXICAL_PILOT_FIELD_KIT_v1.0.md §B-2 (full 60-item table).
--   - 01-UI-SPEC.md §7.3 ("Stem verbatim del implementation pack").
--   - db/schema/item.ts.
--
-- Cowork pilot feedback may revise specific items (R10, I4, S9 flagged
-- "Mantener; vigilar" in §B-2). When that happens, bump version to '1.1'
-- and seed a separate instrument_version row — do NOT mutate this file.

BEGIN;

WITH v AS (
  SELECT iv.id AS version_id
  FROM public.instrument_version iv
  JOIN public.instrument i ON i.id = iv.instrument_id
  WHERE i.code = 'ONET-IP-SF'
    AND iv.version = '1.0'
    AND iv.lang = 'es-CO'
  LIMIT 1
),
items(seq, dim, stem) AS (
  VALUES
    -- Realistic (R) — 10 items
    (1,  'R', 'Construir gabinetes de cocina'),
    (2,  'R', 'Colocar ladrillos o baldosas'),
    (3,  'R', 'Reparar electrodomésticos'),
    (4,  'R', 'Criar peces en un criadero'),
    (5,  'R', 'Ensamblar partes electrónicas'),
    (6,  'R', 'Manejar un camión para entregar paquetes a oficinas y casas'),
    (7,  'R', 'Probar la calidad de las piezas antes del envío'),
    (8,  'R', 'Reparar e instalar cerraduras'),
    (9,  'R', 'Poner a punto y operar máquinas para fabricar productos'),
    (10, 'R', 'Apagar incendios forestales'),
    -- Investigative (I) — 10 items
    (11, 'I', 'Desarrollar un medicamento nuevo'),
    (12, 'I', 'Estudiar formas de reducir la contaminación del agua'),
    (13, 'I', 'Realizar experimentos químicos'),
    (14, 'I', 'Estudiar el movimiento de los planetas'),
    (15, 'I', 'Examinar muestras de sangre con un microscopio'),
    (16, 'I', 'Investigar la causa de un incendio'),
    (17, 'I', 'Desarrollar una forma de predecir mejor el clima'),
    (18, 'I', 'Trabajar en un laboratorio de biología'),
    (19, 'I', 'Inventar un sustituto del azúcar'),
    (20, 'I', 'Hacer pruebas de laboratorio para identificar enfermedades'),
    -- Artistic (A) — 10 items
    (21, 'A', 'Escribir libros u obras de teatro'),
    (22, 'A', 'Tocar un instrumento musical'),
    (23, 'A', 'Componer o arreglar música'),
    (24, 'A', 'Dibujar'),
    (25, 'A', 'Crear efectos especiales para películas'),
    (26, 'A', 'Pintar escenografias para obras de teatro'),
    (27, 'A', 'Escribir guiones para películas o programas de televisión'),
    (28, 'A', 'Bailar jazz o tap'),
    (29, 'A', 'Cantar en una banda'),
    (30, 'A', 'Editar películas'),
    -- Social (S) — 10 items
    (31, 'S', 'Enseñarle a una persona una rutina de ejercicios'),
    (32, 'S', 'Ayudar a personas con problemas personales o emocionales'),
    (33, 'S', 'Orientar a las personas en su carrera profesional'),
    (34, 'S', 'Realizar terapia de rehabilitación'),
    (35, 'S', 'Hacer trabajo voluntario en una organización sin ánimo de lucro'),
    (36, 'S', 'Enseñarles a los niños a practicar deportes'),
    (37, 'S', 'Enseñar lengua de señas a personas sordas o con dificultades auditivas'),
    (38, 'S', 'Ayudar a dirigir una sesión de terapia de grupo'),
    (39, 'S', 'Cuidar niños en una guardería'),
    (40, 'S', 'Dictar una clase en un colegio de secundaria'),
    -- Enterprising (E) — 10 items
    (41, 'E', 'Comprar y vender acciones y bonos'),
    (42, 'E', 'Administrar una tienda'),
    (43, 'E', 'Administrar un salón de belleza o una barbería'),
    (44, 'E', 'Dirigir un área o departamento de una empresa grande'),
    (45, 'E', 'Iniciar tu propio negocio'),
    (46, 'E', 'Negociar contratos comerciales'),
    (47, 'E', 'Representar a un cliente en un juicio'),
    (48, 'E', 'Promocionar una nueva línea de ropa'),
    (49, 'E', 'Vender mercancía en un almacén por departamentos'),
    (50, 'E', 'Administrar una tienda de ropa'),
    -- Conventional (C) — 10 items
    (51, 'C', 'Crear una hoja de cálculo en un programa de computador'),
    (52, 'C', 'Revisar y corregir registros o formularios'),
    (53, 'C', 'Instalar software en los computadores de una red grande'),
    (54, 'C', 'Usar una calculadora'),
    (55, 'C', 'Llevar registros de despacho y recepción de mercancía'),
    (56, 'C', 'Calcular los salarios de los empleados'),
    (57, 'C', 'Hacer inventario de suministros con un dispositivo portátil'),
    (58, 'C', 'Registrar pagos de arriendo'),
    (59, 'C', 'Llevar registros de inventario'),
    (60, 'C', 'Sellar, clasificar y distribuir el correo de una organización')
)
INSERT INTO public.item (instrument_version_id, sequence_number, stem, dimension, reverse_key)
SELECT v.version_id, items.seq, items.stem, items.dim, false
FROM v
CROSS JOIN items
WHERE NOT EXISTS (
  SELECT 1
  FROM public.item it
  WHERE it.instrument_version_id = v.version_id
    AND it.sequence_number = items.seq
);

COMMIT;

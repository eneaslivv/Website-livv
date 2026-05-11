/* Journal piece registrations.
 *
 * Each piece lives in its own file under this directory and registers
 * itself via `registerPieces([...])` from "@/lib/journal/utils". This file
 * imports each piece module so the registry is populated on first access.
 *
 * Phase 2 (LIVV editorial brief section 9):
 *   02 The Argentine Creative Engineering Tradition  -> journal  [shipped]
 *   03 Boken case study                              -> work
 *
 * Phase 3:
 *   04 Webflow vs Framer in 2026                     -> journal
 *   05 The White-Label Playbook                      -> journal
 *   06 Twin Oceans case study                        -> work
 *
 * Phase 4:
 *   07 Hiring a Creative Engineering Studio           -> journal
 *   08 WMF Franchise case study                       -> work
 *
 * Add new pieces as `import "./<slug>"` statements below as they ship.
 */

import "./argentine-creative-engineering"

export {}

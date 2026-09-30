import {
  SIGN_CURVE_OFFSET,
  SIGN_CURVE_PATH,
  SIGN_CURVE_PEN,
  SIGN_VIEWBOX,
  SignLetters,
} from "@/components/brand/livv-sign"

/**
 * First-visit intro: the brand's opening sequence (brand guide 09.3 · «Trazar,
 * expandir, resolver»). The curve is drawn out of the letters, the sign settles
 * into its space, the line «Ideas, made real.» enters and stays still, and the
 * panel lifts to hand over to the hero, which only then plays its entrance.
 *
 * It is plain server-rendered markup driven by CSS (app/brand-motion.css) and
 * by the tiny script below, so it is there on the very first paint: no white
 * screen or spinner before it, and nothing that depends on React hydrating in
 * time. It is the homepage's opening: other routes (campaign landings, direct
 * links to a service or a post) go straight to their content. Every failure
 * mode ends with the page visible:
 * - repeat visit in the session, or reduced motion → hidden before first paint;
 * - React never hydrates → the script still lifts it at the cap;
 * - JavaScript off → nobody decided whether it applies, so it never shows.
 *
 * Length: 2.05 s on desktop (the sequence is 1.75 s plus a beat of stillness) and
 * 1.3 s on phones, where it sits in front of LCP, as long as the hero image and
 * fonts are ready; if not, it lifts at 3.2 s / 2.6 s. It never lifts before the home has mounted.
 */

/**
 * Runs in <head>, before first paint. Decides, then schedules the exit.
 *
 * The exit does NOT wait for the window `load` event: on this home it lands
 * around 5 s even on a fast connection (third-party tags, cover images), so tying
 * the intro to it made the intro as long as its cap. It waits for the two things
 * the hero actually needs to look right when the panel lifts: its background
 * image and the web fonts. Then it holds until the sequence has finished.
 */
export const INTRO_SCRIPT = `(function(){
  var d = document.documentElement, run = false;
  try {
    var forced = new URLSearchParams(location.search).get('intro') === '1';
    var reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    var seen = sessionStorage.getItem('__livv_intro_shown') === '1';
    var home = location.pathname === '/';
    run = forced || (home && !(reduced || seen));
    if (run) sessionStorage.setItem('__livv_intro_shown', '1');
  } catch (e) { run = false; }
  d.setAttribute('data-intro', run ? 'run' : 'skip');
  if (!run) return;
  var small = matchMedia('(max-width: 767px)').matches;
  var minMs = small ? 1300 : 2050, capMs = small ? 2600 : 3200, hardMs = 8000;
  var t0 = Date.now(), gone = false;
  function leave() {
    if (gone) return; gone = true;
    d.setAttribute('data-intro', 'leaving');
    window.dispatchEvent(new Event('livv:reveal'));
    setTimeout(function(){ d.setAttribute('data-intro', 'done'); }, 1500);
  }
  var heroImage = new Promise(function(resolve){
    var tries = 0;
    (function look(){
      var img = document.querySelector('#home img');
      if (img) {
        if (img.complete) return resolve();
        img.addEventListener('load', resolve, { once: true });
        img.addEventListener('error', resolve, { once: true });
        return;
      }
      if (++tries < hardMs / 50) setTimeout(look, 50); else resolve();
    })();
  });
  var fonts = document.fonts && document.fonts.ready ? document.fonts.ready : Promise.resolve();
  var assets = false;
  Promise.all([heroImage, fonts]).then(function(){ assets = true; });
  // The home is only final once React has committed it (HomeShell marks <html> from an
  // effect): before that its HTML can be thrown away and rendered again behind the paper
  // loader, and a panel that lifts in that gap uncovers the flash. Other routes only need
  // the parser to be done.
  function pageReady() {
    if (location.pathname !== '/') return document.readyState !== 'loading';
    return d.hasAttribute('data-home-live');
  }
  // Leaves when the hero image and fonts are in and the minimum has been shown, or at the
  // soft cap on a slow network; in both cases only onto a page that is ready. The hard cap
  // is the last resort, so a page that never mounts cannot keep the panel up.
  (function tick(){
    if (gone) return;
    var t = Date.now() - t0;
    if (((assets && t >= minMs) || t >= capMs) && pageReady()) return leave();
    setTimeout(tick, 50);
  })();
  setTimeout(leave, hardMs);
})();`

export function BrandIntro() {
  return (
    <div className="livv-intro" aria-hidden="true" data-nosnippet>
      <div className="livv-intro__stage">
        <svg className="livv-intro__sign" viewBox={SIGN_VIEWBOX} xmlns="http://www.w3.org/2000/svg" focusable="false">
          <SignLetters className="livv-intro__letters" />
          <g transform={`translate(${SIGN_CURVE_OFFSET.x} ${SIGN_CURVE_OFFSET.y})`}>
            {/* The pen draws the curve along its centre line... */}
            <path
              className="livv-intro__pen"
              d={SIGN_CURVE_PEN.path}
              pathLength={1}
              fill="none"
              stroke="currentColor"
              strokeWidth={SIGN_CURVE_PEN.width}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* ...and the exact outline from the brand guide takes over as it lands */}
            <path className="livv-intro__curve" d={SIGN_CURVE_PATH} />
          </g>
        </svg>
        <p className="livv-intro__line">
          Ideas, <span>made real.</span>
        </p>
      </div>
    </div>
  )
}

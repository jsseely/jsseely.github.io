/* Violet ripple on paper titles. A hard 3-character band swept one
   character per 50ms, with lead-in and lead-out. Delete this file and
   its two <script> tags to remove. */
if (!matchMedia('(prefers-reduced-motion: reduce)').matches)
document.querySelectorAll('.papers > li > a').forEach(a => {
    const s = [...a.textContent].map(c =>
        Object.assign(document.createElement('span'), { textContent: c }));
    a.replaceChildren(...s);
    let r;
    a.onpointerenter = () => {
        const t0 = performance.now(), n = s.length + 20;
        (function tick(t) {
            const g = -10 + Math.floor((t - t0) / 50) % n;
            s.forEach((x, i) => x.style.color = Math.abs(i - g) <= 1 ? '#d0b4ff' : '#af87ff');
            r = requestAnimationFrame(tick);
        })(t0);
    };
    a.onpointerleave = () => { cancelAnimationFrame(r); s.forEach(x => x.style.color = ''); };
});

# TODO

- [ ] Upgrade react-router 6 → 7.
  - `npm audit` flags react-router <7.18 (GHSA-wrjc-x8rr-h8h6 open redirect, GHSA-337j-9hxr-rhxg SSR hydration). Neither applies today: links only carry Pokémon ids, never user-typed URLs, and there is no SSR. Fix it before either changes.
  - The v7 future flags are already on (`src/index.jsx`), so the upgrade should be mostly the package swap (`react-router-dom` → `react-router`).

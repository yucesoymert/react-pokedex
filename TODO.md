# TODO

- [ ] Move from Create React App to Vite, after the current UI work is done.
  - CRA (`react-scripts`) is no longer maintained; Vite gives a faster dev server and build.
  - Rough steps: add `vite` + `@vitejs/plugin-react`, move `public/index.html` to the root with a `<script type="module" src="/src/index.js">`, rename JSX files to `.jsx` (or configure the loader), swap `react-scripts test` for Vitest, and update the `start`/`build`/`test` scripts.
  - While at it: upgrade react-router to 6.4+ and drop the `UNSAFE_LocationContext` workaround in `src/index.js`.

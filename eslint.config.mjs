// Next 16 removed `next lint`, so linting now runs through the ESLint CLI
// against this flat config. `eslint-config-next/core-web-vitals` already
// exports a flat-config array (ESLint 9), so it spreads in directly.

import next from "eslint-config-next/core-web-vitals";

const config = [
  { ignores: [".next/**", "out/**", "node_modules/**", "next-env.d.ts"] },
  ...next,
];

export default config;

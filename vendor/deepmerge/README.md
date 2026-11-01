# Local deepmerge security fork

This is the standalone CommonJS distribution and types from MIT-licensed `deepmerge@4.3.1`, with one behavioral change for [GHSA-gcqx-w48m-w2h4](https://github.com/advisories/GHSA-gcqx-w48m-w2h4). Upstream has no published fixed release as of 2026-11-02. Downgrading to 4.1.2 merely falls outside the advisory's reported range and is not our remediation.

The upstream `mergeObject` function assigns copied keys using `destination[key] = value`. An enumerable own `__proto__` key from the target or an accepted source can invoke the destination's prototype setter. All three writes now use `Object.defineProperty` to create enumerable, configurable, writable own data properties. Ordinary keys, symbols, nested values, custom mergers, and array options retain their existing behavior. The MIT notice is retained in `LICENSE`.

The package override replaces every transitive `deepmerge` import with this explicit private fork. This is not an advisory ignore or a dependency-version downgrade. `scripts/dependency-security.test.mjs` reproduces two prototype-poisoning failures against upstream 4.3.1 and checks the patch plus Netlify configuration merging. Run `bun run test`.

Remove the override and this directory when upstream or Netlify ships a verified fix. Run the regression suite, audit, production build, and Netlify packaging checks before removal. The fork ships only in build/development tooling, not the portfolio's browser bundle.

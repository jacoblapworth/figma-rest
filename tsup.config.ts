import { defineConfig } from 'tsup'

export default defineConfig((options) => ({
  entry: ['src/index.ts'],
  minify: !options.watch,
  sourcemap: true,
  clean: true,
  dts: true,
  target: 'node16',
  format: ['cjs', 'esm'],
}))

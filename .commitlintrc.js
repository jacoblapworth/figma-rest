export default {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-length': [0, 'always', Infinity],
    'footer-max-length': [0, 'always', Infinity],
  },
}

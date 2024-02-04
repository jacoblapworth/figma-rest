import SemanticRelease, { type BranchSpec } from 'semantic-release'

const branches: ReadonlyArray<BranchSpec> = [
  '+([0-9])?(.{+([0-9]),x}).x',
  'main',
  { name: 'next', channel: 'next', prerelease: 'beta' },
]

await SemanticRelease({
  branches,
  plugins: [
    [
      '@semantic-release/commit-analyzer',
      {
        preset: 'conventionalcommits',
      },
    ],
    '@semantic-release/release-notes-generator',
    '@semantic-release/changelog',
    '@semantic-release/npm',
    [
      '@semantic-release/git',
      {
        assets: ['CHANGELOG.md', 'package.json', 'package-lock.json'],
        message:
          'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
      },
    ],
    [
      '@semantic-release/github',
      {
        releaseNameTemplate: 'figma-rest@${nextRelease.version}',
      },
    ],
  ],
})

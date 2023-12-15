import semanticRelease from 'semantic-release'

async function release() {
  const result = await semanticRelease({
    branches: [
      '+([0-9])?(.{+([0-9]),x}).x',
      'main',
      'next',
      { name: 'beta', prerelease: true },
      { name: 'alpha', prerelease: true },
    ],
    plugins: [
      '@semantic-release/commit-analyzer',
      '@semantic-release/release-notes-generator',
      '@semantic-release/changelog',
      '@semantic-release/npm',
      [
        '@semantic-release/github',
        {
          releaseNameTemplate: 'figma-rest@${nextRelease.version}',
        },
      ],
      [
        '@semantic-release/git',
        {
          assets: ['CHANGELOG.md', 'package.json', 'dist/**'],
          message:
            'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
        },
      ],
    ],
  })

  if (!result) {
    return
  }

  const { lastRelease, commits, nextRelease, releases } = result
}

release()

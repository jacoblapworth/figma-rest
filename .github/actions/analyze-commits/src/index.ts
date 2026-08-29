import * as core from '@actions/core'
import SemanticRelease, { type BranchSpec } from 'semantic-release'

const branches: ReadonlyArray<BranchSpec> = [
  '+([0-9])?(.{+([0-9]),x}).x',
  'main',
  { name: 'next', channel: 'next', prerelease: 'beta' },
]

async function run() {
  try {
    const result = await SemanticRelease({
      branches,
      plugins: [
        [
          '@semantic-release/commit-analyzer',
          {
            preset: 'conventionalcommits',
          },
        ],
      ],
    })

    if (!result) {
      core.notice(
        'There are no relevant changes, so no new version is released.'
      )
      return
    }

    const { type, version, channel, notes } = result.nextRelease

    core.notice(
      `The next release is ${type}, version ${version}, on channel ${channel}`
    )

    core.setOutput('next-release-type', type)
    core.setOutput('next-release-version', version)
    core.setOutput('next-release-channel', channel)
    core.setOutput('next-release-notes', notes)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()

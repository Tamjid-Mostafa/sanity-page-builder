import {spawn} from 'node:child_process'
import path from 'node:path'
import {fileURLToPath} from 'node:url'

const scriptDir = path.dirname(fileURLToPath(import.meta.url))
const scripts = [
  'seed-about-page.mjs',
  'seed-about-partners-page.mjs',
  'seed-academy-admissions-page.mjs',
  'seed-academy-personal-support-page.mjs',
  'seed-academy-curriculum-page.mjs',
  'seed-academy-fees-page.mjs',
  'seed-academy-pathways-page.mjs',
  'seed-global-experiences-page.mjs',
  'seed-global-programmes-page.mjs',
  'seed-global-schools-groups-page.mjs',
  'seed-legal-pages.mjs',
]

function run(script) {
  return new Promise((resolve, reject) => {
    const child = spawn(
      'pnpm',
      ['exec', 'sanity', 'exec', path.join(scriptDir, script), '--with-user-token'],
      {stdio: 'inherit', shell: true, cwd: path.resolve(scriptDir, '..')},
    )
    child.on('exit', (code) => {
      if (code === 0) resolve()
      else reject(new Error(`${script} failed with code ${code}`))
    })
  })
}

async function main() {
  for (const script of scripts) {
    console.log(`\n=== Running ${script} ===`)
    await run(script)
  }
  console.log('\nAll pages seeded.')
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})

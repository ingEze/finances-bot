import { build } from 'esbuild'
import { execSync } from 'child_process'
import glob from 'fast-glob'
import fs from 'fs/promises'

console.log('🔨 Compilando JavaScript con ESBuild...')
const entryPoints = await glob('./src/**/*.ts')

const addJsExtensionPlugin = {
  name: 'add-js-extension',
  setup(build) {
    build.onLoad({ filter: /\.ts$/ }, async(args) => {
      let contents = await fs.readFile(args.path, 'utf8')
      contents = contents.replace(
        /from\s+['"](\.\.?\/[^'"]+)['"]/g,
        (match, p1) => {
          if (!p1.endsWith('.js') && !p1.endsWith('.ts') && !p1.endsWith('.json')) {
            return `from '${p1}.js'`
          }
          return match
        }
      )
      return { contents, loader: 'ts' }
    })
  }
}

await build({
  entryPoints,
  outdir: 'dist',
  platform: 'node',
  target: 'node18',
  format: 'esm',
  sourcemap: true,
  outbase: 'src',
  bundle: false,
  plugins: [addJsExtensionPlugin]
})

console.log('📝 Generando declaraciones de TypeScript...')
execSync('npx tsc --emitDeclarationOnly', { stdio: 'inherit' })

console.log('🔧 Corrigiendo archivos de declaración...')
await fixDeclarationFiles()

console.log('✅ Build completado exitosamente!')

async function fixDeclarationFiles() {
  try {
    const dtsFiles = await glob('./dist/**/*.d.ts')
    for (const file of dtsFiles) {
      let content = await fs.readFile(file, 'utf8')
      content = content.replace(
        /((?:from|export\s+.*\s+from)\s+['"])(\.\.?\/[^'"]+)(['"])/g,
        (match, prefix, importPath, suffix) => {
          if (!importPath.endsWith('.js') && !importPath.endsWith('.ts') && !importPath.endsWith('.json')) {
            return `${prefix}${importPath}.js${suffix}`
          }
          return match
        }
      )
      await fs.writeFile(file, content, 'utf8')
    }
    console.log(`   ✅ Corregidos \${dtsFiles.length} archivos .d.ts`)
  } catch (error) {
    console.error('   ❌ Error:', error)
    process.exit(1)
  }
}

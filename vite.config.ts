import million from 'million/compiler'
import { defineConfig, loadEnv, ConfigEnv, UserConfig, PluginOption } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import { visualizer } from 'rollup-plugin-visualizer'
import eslintPlugin from 'vite-plugin-eslint'
import viteCompression from 'vite-plugin-compression'
import { wrapperEnv } from './src/utils/getEnv'
import viteImagemin from 'vite-plugin-imagemin'
import legacy from '@vitejs/plugin-legacy'

// 检查 Vite 插件的中间状态。用于调试和编写插件
// import Inspect from 'vite-plugin-inspect'

export default defineConfig((mode: ConfigEnv): UserConfig => {
  const env = loadEnv(mode.mode, process.cwd())
  const viteEnv = wrapperEnv(env)

  return {
    plugins: [
      million.vite({ auto: true }),
      react(), // * EsLint 报错信息显示在浏览器界面上
      eslintPlugin(),
      viteImagemin({
        gifsicle: {
          optimizationLevel: 7,
          interlaced: false
        },
        optipng: {
          optimizationLevel: 7
        },
        mozjpeg: {
          quality: 20
        },
        pngquant: {
          quality: [0.8, 0.9],
          speed: 4
        },
        svgo: {
          plugins: [
            {
              name: 'removeViewBox'
            },
            {
              name: 'removeEmptyAttrs',
              active: false
            }
          ]
        }
      }),
      legacy({
        targets: ['defaults', 'not IE 11']
      }),
      // viteEnv.VITE_INSPECT && Inspect(),
      // * 是否生成包预览
      viteEnv.VITE_REPORT && (visualizer() as PluginOption),
      // * gzip compress
      viteEnv.VITE_BUILD_GZIP &&
        viteCompression({
          verbose: true,
          disable: false,
          threshold: 10240,
          algorithm: 'gzip',
          ext: '.gz'
        })
    ],
    server: {
      host: '0.0.0.0', // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      cors: true,
      // https: false,
      // 代理跨域（mock 不需要配置，这里只是个事列）
      proxy: {
        '/api': {
          target: 'https://testing.crushonfeature.com', // easymock
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, 'api')
        },
        '/rails': {
          target: 'https://testing.crushonfeature.com', // easymock
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/rails/, 'rails')
        }
      }
    },
    css: {
      // 预处理器配置项
      preprocessorOptions: {
        less: {
          math: 'always',
          javascriptEnabled: true
        }
      }
    },
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src'),
        '@components': resolve(__dirname, 'src/components'),
        '@utils': resolve(__dirname, 'src/utils')
      }
    },
    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ['console.log', 'debugger'] : []
    },
    // build configure
    build: {
      outDir: 'dist',
      // esbuild 打包更快，但是不能去除 console.log，去除 console 使用 terser 模式
      minify: 'esbuild',
      // minify: "terser",
      // terserOptions: {
      // 	compress: {
      // 		drop_console: viteEnv.VITE_DROP_CONSOLE,
      // 		drop_debugger: true
      // 	}
      // },
      rollupOptions: {
        output: {
          // Static resource classification and packaging
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
          assetFileNames: 'assets/[ext]/[name]-[hash].[ext]',
          manualChunks: (id) => {
            if (id.includes('node_modules')) {
              return 'vendor'
            }
          }
        }
      }
    }
  }
})

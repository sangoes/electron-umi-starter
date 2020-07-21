import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  history: {
    type: 'hash',
  },
  outputPath: `./dist/renderer`,
  publicPath: './',
  routes: [{ path: '/', component: '@/renderer/pages/index' }],
});

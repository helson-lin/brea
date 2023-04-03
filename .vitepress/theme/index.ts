// .vitepress/theme/index.js
import DefaultTheme from 'vitepress/theme';
import TopHeader from './TopHeader.vue'
import "../reset.css"

export default {
    ...DefaultTheme,
    Layout: TopHeader
}
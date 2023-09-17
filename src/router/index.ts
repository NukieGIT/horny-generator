import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { nextTick } from 'vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
            meta: {
                title: 'Horny Generator',
                transition: 'fade'
            }
        },
        {
            path: '/aseria-rpg',
            name: 'aseria rpg',
            component: () => import('@/views/AseriaRPG/AseriaRPGmain.vue'),
            meta: {
                title: 'Aseria RPG',
                transition: 'fade'
            }
        },
        {
            path: '/roman',
            name: 'roman',
            component: () => import('@/views/RomanConv.vue'),
            meta: {
                title: 'Roman Numerals Converter',
                transition: 'fade'
            }
        },
        {
            path: '/radzio',
            name: 'radzio',
            component: () => import('@/views/RomanConv_radzio.vue'),
            meta: {
                title: "Radzio's Roman Numerals Converter",
                transition: 'fade'
            }
        },
        {
            path: '/nukie',
            name: 'nukie',
            component: () => import('@/views/RomanConv_nukie.vue'),
            meta: {
                title: "Nukie's Roman Numerals Converter",
                transition: 'fade'
            }
        },
        {
            path: '/roman-arabic-numerals-converter',
            name: 'roman arabic numerals converter',
            component: () => import('@/views/RomanArabicConverter.vue'),
            meta: {
                title: 'Roman-Arabic Numerals Converter',
                transition: 'fade'
            }
        },
        {
            path: '/rsdev',
            name: 'RadziuScript development',
            component: () => import('@/views/RadziuScriptDev.vue'),
            meta: {
                title: 'RadziuScript development',
                transition: 'fade'
            }
        },
        {
            path: '/qlusmap',
            name: 'Qlus Map Editor',
            component: () => import('@/views/QlusMapEditor.vue'),
            meta: {
                title: 'Qlus Map Editor',
                transition: 'dash'
            }
        },
        {
            path: '/STTT',
            name: 'SUPER TURBO TURBO TURBO',
            component: () => import('@/views/SuperTicTacToe.vue'),
            meta: {
                title: 'Tici Tici Tac uwu',
                transition: 'dash'
            }
        },
        {
            path: '/FQG',
            name: 'Flappy Qlus Game',
            component: () => import('@/views/FlappyQlus.vue'),
            meta: {
                title: 'Flappy Qlus Game',
                transition: 'fade'
            }
        }
    ]
})

router.afterEach((to) => {
    nextTick(() => {
        document.title = to.meta.title ? to.meta.title : 'Horny Generator'
    })
})

export default router

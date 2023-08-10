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
                title: 'Horny Generator'
            }
        },
        {
            path: '/roman',
            name: 'roman',
            component: () => import('@/views/RomanConv.vue'),
            meta: {
                title: 'Roman Numerals Converter'
            }
        },
        {
            path: '/radzio',
            name: 'radzio',
            component: () => import('@/views/RomanConv_radzio.vue'),
            meta: {
                title: "Radzio's Roman Numerals Converter"
            }
        },
        {
            path: '/nukie',
            name: 'nukie',
            component: () => import('@/views/RomanConv_nukie.vue'),
            meta: {
                title: "Nukie's Roman Numerals Converter"
            }
        },
        {
            path: '/roman-arabic-numerals-converter',
            name: "roman arabic numerals converter",
            component: () => import('@/views/RomanArabicConverter.vue'),
            meta: {
                title: "Roman-Arabic Numerals Converter"
            }
        },
        {
            path: '/rsdev',
            name: "RadziuScript development",
            component: () => import('@/views/RadziuScriptDev.vue'),
            meta: {
                title: "RadziuScript development"
            }
        }
    ]
})

router.afterEach((to, from) => {
    nextTick(() => {
        document.title = to.meta.title ? to.meta.title : "Horny Generator";
    })
})

export default router

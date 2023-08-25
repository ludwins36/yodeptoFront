import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeWeb.vue')
    },
    {
      path: '/footer-frequent-questions',
      name: 'footer-frequent-questions',
      component: () => import('../views/FooterFrequentQuestions.vue')
    },
    {
      path: '/footer-compromise',
      name: 'footer-compromise',
      component: () => import('../views/FooterCompromise.vue')
    },
    {
      path: '/footer-the-best-option',
      name: 'footer-the-best-option',
      component: () => import('../views/FooterTheBestOption.vue')
    },
    {
      path: '/footer-legal-information',
      name: 'footer-legal-information',
      component: () => import('../views/FooterLegalInformation.vue')
    },
    {
      path: '/footer-privacy-policy',
      name: 'footer-privacy-policy',
      component: () => import('../views/FooterPrivacyPolicy.vue')
    },
    {
      path: '/footer-avoid-scams',
      name: 'footer-avoid-scams',
      component: () => import('../views/FooterAvoidScams.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/register-owner',
      name: 'register-owner',
      component: () => import('../views/RegisterOwner.vue')
    },
    {
      path: '/register-renter',
      name: 'register-renter',
      component: () => import('../views/RegisterRenter.vue')
    },
    {
      path: '/user-profile',
      name: 'user-profile',
      component: () => import('../views/UserProfile.vue')
    },
    {
      path: '/search-rental-offers',
      name: 'search-rental-offers',
      component: () => import('../views/SeachRentalOffers.vue')
    },
    {
      path: '/my-rental-offers',
      name: 'my-rental-offers',
      component: () => import('../views/MyRentalOffers.vue')
    },
    {
      path: '/favorites',
      name: 'favorites',
      component: () => import('../views/Favorites.vue')
    },
    {
      path: '/plans',
      name: 'plans',
      component: () => import('../views/Plans.vue')
    },
    {
      path: '/rental-offer',
      name: 'rental-offer',
      component: () => import('../views/RentalOffer.vue')
    },
    // Admin Routes
    {
      path: '/admin-users',
      name: 'admin-users',
      component: () => import('../views/AdminUsers.vue')
    },
    {
      path: '/admin-roles',
      name: 'admin-roles',
      component: () => import('../views/AdminRoles.vue')
    },
    {
      path: '/admin-plans',
      name: 'admin-plans',
      component: () => import('../views/AdminPlans.vue')
    },
    {
      path: '/admin-descriptions',
      name: 'admin-descriptions',
      component: () => import('../views/AdminDescriptions.vue')
    }
  ]
})

export default router

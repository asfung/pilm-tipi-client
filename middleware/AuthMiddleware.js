export default defineNuxtRouteMiddleware((to, from) => {
  const token = localStorage.getItem('token')
  const user = JSON.parse(localStorage.getItem('user'))
  // before
  // if (!token && !user && to.path !== '/login') {
  //   return navigateTo('/login');
  // }

  // if (token && user && (to.path === '/login' || to.path === '/register')) {
  //   return navigateTo('/');
  // }
  
  // before
  // if(token && user && to.path !== '/'){
  //   console.log(to)
  //   return navigateTo('/');
  // }

  // if (token && user && (to.path === '/login' || to.path === '/register' || to.path !== '/')) {
  //   return navigateTo('/');
  // }

  if (!token && !user && !['/login', '/register'].includes(to.path)) {
    return navigateTo('/login');
  }

  if (token && user && ['/login', '/register'].includes(to.path)) {
    return navigateTo('/');
  }

  // if (token && user && to.path !== '/') {
  //   console.log(to)
  //   return navigateTo('/');
  // }



})

// export default function ({ redirect }) {
//   const token = localStorage.getItem('token')
//   const user = JSON.parse(localStorage.getItem('user'))
//   console.log(token)
//   console.log(user)
//   if (!token && !user) {
//     redirect('/login')
//     console.log('eitsss gk bisa harus ada token ')
//   }
//   if (token && user) {
//     console.log('all goods')
//   }

// }
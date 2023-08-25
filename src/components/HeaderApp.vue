<template>
  <!-- ======= Header ======= -->
  <header id="header" class="">
    <div class="container-fluid">

      <div class="row justify-content-center">
        <div class="col-xl-9 d-flex align-items-center justify-content-lg-between">
          <!-- <h1 class="logo me-auto me-lg-0"><a class="black-text" href="#">YoDeptO</a></h1> -->
          <a href="/" class="logo me-auto me-lg-0"><img src="/logo.png" alt="" class="img-fluid"></a>

          <nav id="navbar" class="navbar order-last order-lg-0">
            <ul>
              <li>
                <RouterLink to="/user-profile"><a class="nav-link scrollto black-text" href="#">Mi Perfil</a></RouterLink>
              </li>
              <li>
                <RouterLink to="/search-rental-offers"><a class="nav-link scrollto black-text" href="#">Buscar Avisos</a>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/my-rental-offers"><a class="nav-link scrollto black-text" href="#">Mis Avisos</a>
                </RouterLink>
              </li>
              <li>
                <RouterLink to="/favorites"><a class="nav-link scrollto black-text" href="#">Favoritos</a></RouterLink>
              </li>
              <li>
                <RouterLink to="/plans"><a class="nav-link scrollto black-text" href="#">Ser Usuario Avanzado</a></RouterLink>
              </li>
            </ul>
            <i class="bi bi-list mobile-nav-toggle"></i>
          </nav><!-- .navbar -->

          <a href="#" class="get-started-btn scrollto" @click="logout">Cerrar Sesi&oacute;n</a>
        </div>
      </div>

    </div>
  </header><!-- End Header -->
</template>

<script>
import LayoutAdmin from '../components/LayoutAdmin.vue'

export default {
  name: "header-app",
  data() {
    return {
    }
  },
  components: {
    LayoutAdmin
  },
  mounted() {
  },
  methods: {
    async logout() {
            const myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));

            const urlencoded = new URLSearchParams();

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
            };

            let request = fetch(this.url_back + "/api/logout", requestOptions);
            let response = await request;
            let data = await response.json();

            if (response.ok) {
                this.$router.push('/');
            } else {
                console.log('error al cerrar sesion')
            }
        }
  }
}

</script>

<style>.black-text {
  color: black !important;
}</style>
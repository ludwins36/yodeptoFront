<template>
    <!-- ======= Header ======= -->
<header id="header" class="fixed-top header-opacity">
  <div class="container-fluid">

    <div class="row justify-content-center">
      <div class="col-xl-9 d-flex align-items-center justify-content-lg-between">
        <!-- <h1 class="logo me-auto me-lg-0"><a href="#">YoDeptO</a></h1> -->
        <!-- Uncomment below if you prefer to use an image logo -->
        <a href="/" class="logo me-auto me-lg-0"><img src="/logo.png" alt="" class="img-fluid"></a>

        <nav id="navbar" class="navbar order-last order-lg-0">
          <ul>
            <li><a class="nav-link scrollto coler-letra active" href="#hero">Home</a></li>
            <li><a class="nav-link scrollto coler-letra" href="#roomies">Roomies</a></li>
            <li><a class="nav-link scrollto coler-letra" href="#owners">Propietarios</a></li>
            <li><a class="nav-link scrollto coler-letra" href="#register">Reg&iacute;strate</a></li>
            <li><a class="nav-link scrollto coler-letra" href="#contact">Contacto</a></li>
          </ul>
          <i class="bi bi-list mobile-nav-toggle"></i>
        </nav><!-- .navbar -->

        <RouterLink to="/login"><a href="#" class="get-started-btn scrollto">INGRESAR</a></RouterLink>
      </div>
    </div>

  </div>
</header><!-- End Header -->
</template>

<script>

</script>

<style>
.header-opacity{
  background-color:rgba(255, 255, 255, 0.5);
}
.coler-letra{
  color: black !important;
}
</style>
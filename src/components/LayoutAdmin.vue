<template>
    <!-- Navbar -->
    <nav class="main-header navbar navbar-expand navbar-white navbar-light">
        <!-- Left navbar links -->
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" data-widget="pushmenu" href="#" role="button"><i class="fas fa-bars"></i></a>
            </li>

        </ul>


    </nav>
    <!-- /.navbar -->

    <!-- Main Sidebar Container -->
    <aside class="main-sidebar sidebar-dark-primary elevation-4">
        <!-- Brand Logo -->
        <!-- <RouterLink to="/user-profile"> -->
            <a href="#" class="brand-link">
            <img src="//logo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3" style="opacity: .8">
            <span class="brand-text font-weight-light">YoDeptO</span>
        </a>
        <!-- </RouterLink> -->

        <!-- Sidebar -->
        <div class="sidebar">
            <!-- Sidebar user (optional) -->
            <div class="user-panel mt-3 pb-3 mb-3 d-flex">
                <!-- <div class="image">
                    <img :src="this.url_back + user.url_photo" class="img-circle elevation-2" alt="User Image">
                </div> -->
                <div class="image">
                    <img src="/img_panel.png" class="img-circle elevation-2" alt="User Image">
                </div>
                <div class="info">
                    <a href="#" class="d-block">{{ user.first_name }} {{ user.last_name }}</a>
                </div>
            </div>



            <!-- Sidebar Menu -->
            <nav class="mt-2">
                <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">

                    <li class="nav-item">
                        <RouterLink to="/admin-users"><a href="#" class="nav-link">
                                <i class="nav-icon fa fa-user"></i>
                                <p>
                                    Usuarios
                                </p>
                            </a></RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/admin-roles"><a href="#" class="nav-link">
                                <i class="nav-icon fa fa-users"></i>
                                <p>
                                    Roles
                                </p>
                            </a></RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/admin-plans"><a href="#" class="nav-link">
                                <i class="nav-icon fas fa-dollar-sign"></i>
                                <p>
                                    Planes
                                </p>
                            </a></RouterLink>
                    </li>
                    <li class="nav-item">
                        <RouterLink to="/admin-descriptions"><a href="#" class="nav-link">
                                <i class="nav-icon fas fa-columns"></i>
                                <p>
                                    Desripci&oacute;n P/I
                                </p>
                            </a></RouterLink>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link" @click="logout">
                            <i class="nav-icon fas fa-sign-out-alt"></i>
                            <p>
                                Cerrar Sesi&oacute;n
                            </p>
                        </a>
                    </li>

                </ul>
            </nav>
            <!-- /.sidebar-menu -->
        </div>
        <!-- /.sidebar -->
    </aside>
</template>

<script>
export default {
    name: "layout-admin",
    data() {
        return {
            user: {}
        }
    },
    components: {

    },
    mounted() {
        this.loadUser()
    },
    methods: {
        async loadUser() {
            const myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            let request = fetch(this.url_back + "/api/users/" + localStorage.getItem('userId'), requestOptions);
            let response = await request;
            let data = await response.json();

            if (response.ok && response.status == 201) {
                this.user = data.user;
            } else {
                console.log('error al cargar el usuario')
            }
        },
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

<style></style>
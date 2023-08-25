<template>
    <div class="hold-transition login-page">
        <div class="login-box">
            <div class="login-logo">
                <!-- <a href="#">YoDeptO</a> -->
                <a href="/" class="logo me-auto me-lg-0"><img src="/logo.png" alt="" class="img-fluid"></a>
            </div>
            <!-- /.login-logo -->
            <div class="card">
                <div class="card-body login-card-body">
                    <p class="login-box-msg">Iniciar Sesi&oacute;n</p>
                    <div class="alert alert-danger" role="alert" v-if="showAlert">
                        {{ textAlert }}
                    </div>

                    <div>
                        <div class="input-group mb-3">
                            <input type="email" class="form-control" placeholder="Correo" v-model="email" required>
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <input type="password" class="form-control" placeholder="Contraseña" v-model="password"
                                required>
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-8">
                                <!-- <div class="icheck-primary">
                                    <input type="checkbox" id="remember">
                                    <label for="remember">
                                        Remember Me
                                    </label>
                                </div> -->
                            </div>
                            <!-- /.col -->
                            <div class="col-4">
                                <button type="submit" class="btn btn-primary btn-block" @click="login">Ingresar</button>
                            </div>
                            <!-- /.col -->
                        </div>
                    </div>

                    <p class="mb-1">
                        <a href="forgot-password.html">Recuperar contraseña</a>
                    </p>
                </div>
                <!-- /.login-card-body -->
            </div>
        </div>

    </div>
</template>

<script>
export default {
    name: "login",
    data() {
        return {
            email: '',
            password: '',
            showAlert: false,
            textAlert: ''
        }
    },
    components: {

    },
    mounted() {
    },
    methods: {
        async login() {
            const myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            const urlencoded = new URLSearchParams();
            urlencoded.append("email", this.email);
            urlencoded.append("password", this.password);

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
            };

            let request = fetch(this.url_back + "/api/login", requestOptions);
            let response = await request;
            let data = await response.json();

            if (response.ok && response.status == 201) {
                if (data.user.status == 'suspendido') {
                    this.textAlert = 'Usuario suspendido';
                    this.showMsgAlert();
                } else {
                    localStorage.token = data.token;
                    localStorage.userId = data.user.id;
                    if (data.user.rol_id == 1) { this.$router.push('/admin-users') };
                    if (data.user.rol_id == 2) { this.$router.push('/my-rental-offers') };
                    if (data.user.rol_id == 3) { this.$router.push('/search-rental-offers') };
                }
            } else {
                this.textAlert = 'Usuario o contraseña incorrectos';
                this.showMsgAlert();
            }
        },
        showMsgAlert() {
            this.showAlert = true;
            setTimeout(() => this.hideMsgAlert(), 2000);
        },
        hideMsgAlert() {
            this.showAlert = false;
        }
    }
}
</script>

<style></style>
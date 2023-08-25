<template>
    <div class="hold-transition register-page">
        <div class="register-box">
            <div class="register-logo">
                <a href="/" class="logo me-auto me-lg-0"><img src="/logo.png" alt="" class="img-fluid"></a>
            </div>

            <div class="card">
                <div class="card-body register-card-body">
                    <p class="login-box-msg">Reg&iacute;strate como Propietario</p>

                    <div class="alert alert-danger" role="alert" v-if="showAlert">
                        {{ textAlert }}
                    </div>

                    <div>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Nombre" v-model="firstName">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-user"></span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <input type="text" class="form-control" placeholder="Apellido" v-model="lastName">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-user"></span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <input type="email" class="form-control" placeholder="Correo" v-model="email">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-envelope"></span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <input type="password" class="form-control" placeholder="Contraseña" v-model="password">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <div class="input-group mb-3">
                            <input type="password" class="form-control" placeholder="Repetir Contraseña"
                                v-model="retryPassword">
                            <div class="input-group-append">
                                <div class="input-group-text">
                                    <span class="fas fa-lock"></span>
                                </div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <div class="icheck-primary">
                                    <input type="checkbox" id="agreeTerms" name="terms" value="true" v-model="acceptTerms">
                                    <label for="agreeTerms">
                                        &nbsp;&nbsp;Acepto los <a :href="this.url_front + 'footer-legal-information'"
                                            target="_blank">términos y condiciones</a>
                                    </label>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="row">
                            <div class="col-12">
                                <div class="g-recaptcha" :data-sitekey="recaptchaSiteKey" @verify="onCaptchaVerify"></div>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-12">
                                <button type="submit" class="btn btn-primary btn-block"
                                    @click="register()">Registrarme</button>
                            </div>
                        </div> -->
                        <div class="row">
                            <div id="recaptcha" ref="recaptcha"></div>
                            <button @click="submitForm" class="btn btn-primary btn-block">Registrarme</button>
                        </div>
                    </div>

                </div>
            </div><!-- /.card -->
        </div>

    </div>
</template>

<script>
export default {
    name: "register",
    data() {
        return {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            retryPassword: '',
            acceptTerms: false,
            showAlert: false,
            textAlert: '',
        }
    },
    components: {
    },
    mounted() {
        grecaptcha.render(this.$refs.recaptcha, {
            sitekey: '6Lcc8dkmAAAAAIxmc9HMdQhUcwQRbE_RXw1corZQ',
            callback: this.onCaptchaVerify,
        });
    },
    methods: {
        validate() {
            this.textAlert = '';

            this.textAlert += this.firstName == '' ? '*El Nombre es obligatorio ' : '';
            this.textAlert += this.lastName == '' ? '*El Apellido es obligatorio ' : '';
            this.textAlert += this.email == '' ? '*El Correo es obligatorio ' : '';
            this.textAlert += this.password == '' ? '*La Contraseña es obligatoria ' : '';
            this.textAlert += this.retryPassword == '' ? '*Repetir la Contraseña es obligatorio ' : '';
            this.textAlert += this.password == this.retryPassword ? '' : '*Las Contraseñas no coinciden';

            if (this.password.length < 8 || this.password.length > 20) {
                this.textAlert += "*La contraseña debe tener entre 8 y 20 caracteres.";
            } else if (!this.password.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/)) {
                this.textAlert += "*La contraseña debe contener al menos una letra mayúscula, una letra minúscula y un número.";
            }

            this.textAlert += this.acceptTerms == true ? '' : '*Acepte los términos y condiciones ';

            return this.textAlert == '' ? true : false;
        },
        async register() {
            const myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

            const urlencoded = new URLSearchParams();
            urlencoded.append("first_name", this.firstName);
            urlencoded.append("last_name", this.lastName);
            urlencoded.append("email", this.email);
            urlencoded.append("password", this.password);
            urlencoded.append("status", 'activo');
            urlencoded.append("rol_id", '2');

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
            };

            let request = fetch(this.url_back + "/api/register", requestOptions);
            let response = await request;
            let data = await response.json();

            if (response.ok && response.status == 201) {
                localStorage.token = data.token;
                localStorage.userId = data.user.id;
                this.$router.push('/user-profile');
            } else {
                console.log('error al registrarse')
            }
        },
        showMsgAlert() {
            this.showAlert = true;
            setTimeout(() => this.hideMsgAlert(), 3000);
        },
        hideMsgAlert() {
            this.showAlert = false;
        },
        onCaptchaVerify(response) {
            console.log('reCAPTCHA verificado', response);
        },
        submitForm() {
            if (this.validate()) {
                const recaptchaResponse = grecaptcha.getResponse();

                if (recaptchaResponse) {
                    // El reCAPTCHA ha sido verificado correctamente
                    console.log('reCAPTCHA verificado', recaptchaResponse);
                    this.register();
                } else {
                    // El reCAPTCHA no ha sido verificado
                    console.error('Por favor, verifica el reCAPTCHA.');
                    this.textAlert = 'Por favor, verifica el reCAPTCHA.';
                    this.showMsgAlert();
                }
            } else {
                this.showMsgAlert();
            }

        },
    }
}

</script>

<style></style>
<template>
    <HeaderApp />

    <main id="main">
        <!-- ======= Breadcrumbs ======= -->
        <section id="breadcrumbs" class="breadcrumbs">
            <div class="container">

                <ol>
                    <li><a href="#">Home</a></li>
                    <li>Mi Perfil</li>
                </ol>
                <h2>Mi Perfil</h2>

            </div>
        </section><!-- End Breadcrumbs -->

        <section class="inner-page">
            <div class="container">
                <div class="row">
                    <div class="col-12 col-md-12 col-lg-12">

                        <div class="card">
                            <div class="card-body">
                                <div class="row centrar">
                                    <div class="col-4" v-if="user.url_photo != null">
                                        <img :src="this.url_back + user.url_photo" class="img-circle" alt="profile_photo"
                                            width="300" height="300">
                                    </div>
                                    <div class="col-4" v-if="user.url_photo == null">
                                        <img src="/img_perfil_default.png" class="img-circle" alt="profile_photo"
                                            width="300" height="300">
                                    </div>
                                    <div class="col-6">
                                        <div class="row">
                                            <div class="col-6">
                                                <p><b>Nombre:</b> {{ user.first_name }}</p>
                                                <p><b>Correo:</b> {{ user.email }}</p>
                                            </div>
                                            <div class="col-6">
                                                <p><b>Apellido:</b> {{ user.last_name }}</p>
                                                <p><b>Tel&eacute;fono:</b> {{ user.phone }}</p>
                                            </div>
                                        </div><br>
                                        <div class="row">
                                            <div class="col-6">
                                                <p><b>Profesi&oacute;n:</b> {{ user.profession }}</p>
                                            </div>
                                            <div class="col-6">
                                                <p><b>Plan:</b> {{ planName }} - <span
                                                        v-if="showMessageButton">Acivo</span><span
                                                        v-if="!showMessageButton">Inactivo</span></p>
                                            </div>
                                        </div><br>
                                    </div>
                                    <div class="col-2">
                                        <div class="row">
                                            <div class="col-12">
                                                <a href="#" class="get-started-btn scrollto" data-toggle="modal"
                                                    data-target=".bd-example-modal-lg">Editar
                                                    Datos</a>
                                            </div>
                                        </div><br>
                                        <div class="row" v-if="showMessageButton">
                                            <div class="col-12">
                                                <a href="#" class="get-started-btn scrollto">Mensajes</a>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                                <div class="row">
                                    <!-- Modal Edit User -->
                                    <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog"
                                        ref="modal-create" aria-labelledby="myLargeModalLabel" aria-hidden="true">
                                        <div class="modal-dialog modal-lg">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    <h5 class="modal-title">Editar Usuario</h5>
                                                    <button type="button" class="close" data-dismiss="modal"
                                                        aria-label="Close" id="closeModalUpdateUser">
                                                        <span aria-hidden="true">&times;</span>
                                                    </button>
                                                </div>
                                                <div class="modal-body">
                                                    <div class="alert alert-danger" role="alert" v-if="showAlert">
                                                        {{ alertText }}
                                                    </div>
                                                    <div class="row">
                                                        <div class="col-6">
                                                            <label for="inputTitulo">Nombre</label>
                                                            <input type="text" class="form-control" id="inputNombre"
                                                                v-model="userFirstName">
                                                        </div>
                                                        <div class="col-6">
                                                            <label for="inputTipo">Apellido</label>
                                                            <input type="text" class="form-control" id="inputApellido"
                                                                v-model="userLastName">

                                                        </div>
                                                    </div><br>
                                                    <div class="row">
                                                        <div class="col-6">
                                                            <label for="inputMontoAlquiler">E-mail</label>
                                                            <input type="text" class="form-control" id="inputEmail"
                                                                v-model="userEmail">

                                                        </div>
                                                        <div class="col-6">
                                                            <label for="inputFechaMudanza">Telefono</label>
                                                            <input type="text" class="form-control" id="inputTelefono"
                                                                v-model="userPhone">

                                                        </div>
                                                    </div><br>
                                                    <div class="row">
                                                        <div class="col-6">
                                                            <label for="inputMontoAlquiler">Profesi&oacute;n</label>
                                                            <select class="form-select" aria-label="Default select example"
                                                                v-model="userProfession">
                                                                <option value="profesional">Profesional</option>
                                                                <option value="estudiante">Estudiante</option>
                                                            </select><br>
                                                            
                                                        </div>
                                                        <div class="col-6">
                                                        </div>
                                                    </div><br>
                                                    <div class="row">
                                                        <div class="col-md-12">
                                                            <label for="input_file"
                                                                class="text-secondary-card p-0 pl-2 m-0">Actualiza tu foto
                                                                de perfil</label><br>
                                                            <input type="file" accept="image/*" ref="file" name="input_file"
                                                                id="input_file" class="" placeholder=""
                                                                @change="selectFile">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="modal-footer">
                                                    <a href="#" class="get-started-btn scrollto float-right"
                                                        @click="updateUser">Guardar</a>
                                                    <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
                                                    <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </section>

    </main><!-- End #main -->

    <FooterWeb />
</template>
  
  
<script>
import HeaderApp from '../components/HeaderApp.vue'
import FooterWeb from '../components/FooterWeb.vue'

export default {
    name: "user-profile",
    data() {
        return {
            user: {},
            lastPayment: [],
            userId: '',
            showMessageButton: false,
            userFirstName: '',
            userLastName: '',
            userPhone: '',
            userEmail: '',
            userProfession: '',
            file: '',
            showAlert: false,
            alertText: '',
            planName: ''
        }
    },
    components: {
        HeaderApp,
        FooterWeb
    },
    mounted() {
        this.loadUser()
    },
    methods: {
        async loadUser() {
            this.userId = localStorage.getItem('userId');

            const myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            let request = fetch(this.url_back + "/api/users/" + this.userId, requestOptions);
            let response = await request;
            let data = await response.json();

            if (response.ok && response.status == 201) {
                this.user = data.user;
                this.userFirstName = data.user.first_name;
                this.userLastName = data.user.last_name;
                this.userPhone = data.user.phone;
                this.userEmail = data.user.email;
                this.userProfession = data.user.profession;

                this.planName = data.user.payments[data.user.payments.length - 1].plan.name;

                let today = new Date();
                let dateToday = today.toISOString().split('T')[0] + ' 00:00:00';

                let datePlanStr = data.user.payments[data.user.payments.length - 1].date_to;
                let fecha = new Date(datePlanStr);

                var year = fecha.getFullYear();
                var month = ("0" + (fecha.getMonth() + 1)).slice(-2);
                var day = ("0" + fecha.getDate()).slice(-2);
                var hours = ("0" + fecha.getHours()).slice(-2);
                var minutes = ("0" + fecha.getMinutes()).slice(-2);
                var seconds = ("0" + fecha.getSeconds()).slice(-2);

                var datePlan = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;

                if (dateToday <= datePlan) {
                    this.showMessageButton = true;
                }
            } else {
                console.log('error al cargar usuario')
            }

        },
        async updateUser() {
            if (this.validarUser()) {
                const myHeaders = new Headers();
                myHeaders.append("Accept", "application/json");
                myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));

                const formData = new FormData();
                formData.append("user_id", localStorage.getItem('userId'));
                formData.append("user_first_name", this.userFirstName);
                formData.append("user_last_name", this.userLastName);
                formData.append("user_email", this.userEmail);
                formData.append("user_phone", this.userPhone);
                formData.append("user_profession", this.userProfession);
                formData.append("file", this.file);

                const requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: formData,
                    redirect: 'follow'
                };

                let request = fetch(this.url_back + "/api/users/updateUser", requestOptions);
                let response = await request;
                let data = await response.json();

                if (response.ok && response.status == 201) {
                    this.loadUser();
                    this.closeUpdateModal()
                } else {
                    console.log('error al actualizar datos del usuario');
                }
            } else {
                this.showMsgAlert();
            }
        },
        selectFile() {
            this.file = this.$refs.file.files[0];
        },
        validarUser() {
            this.alertText = '';

            this.alertText += this.userFirstName == '' ? '*El Nombre es obligatorio ' : '';
            this.alertText += this.userLastName == '' ? '*El Apellido es obligatorio ' : '';
            this.alertText += this.userEmail == '' ? '*El Correo es obligatorio ' : '';

            return this.alertText == '' ? true : false;
        },
        showMsgAlert() {
            this.showAlert = true;
            setTimeout(() => this.hideMsgAlert(), 2000);
        },
        hideMsgAlert() {
            this.showAlert = false;
        },
        closeUpdateModal() {
            document.getElementById('closeModalUpdateUser').click();
        },
    }
}

</script>
  
<style>
.centrar {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50vh;
}</style>
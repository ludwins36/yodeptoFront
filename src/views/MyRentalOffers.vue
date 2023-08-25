<template>
    <HeaderApp />

    <main id="main">
        <!-- ======= Breadcrumbs ======= -->
        <section id="breadcrumbs" class="breadcrumbs">
            <div class="container">

                <ol>
                    <li><a href="#">Home</a></li>
                    <li>Mis Avisos</li>
                </ol>
                <h2>Mis Avisos</h2>

            </div>
        </section><!-- End Breadcrumbs -->

        <section class="inner-page">
            <div class="container">
                <div class="row">
                    <div class="col-12 col-md-12 col-lg-12">
                        <!-- Custom Tabs -->
                        <div class="card">
                            <div class="card-header d-flex p-0">
                                <!-- <h3 class="card-title p-3">Avisos</h3>                               -->
                            </div><!-- /.card-header -->
                            <div class="card-body">
                                <div class="tab-content">
                                    <div class="row">
                                        <div class="col-12">
                                            <a href="#" class="get-started-btn scrollto float-right" data-toggle="modal"
                                                data-target=".bd-example-modal-lg">Nuevo Aviso</a>
                                        </div>
                                    </div><br>
                                    <div class="row">
                                        <div class="col-12" v-for="(offer, index) in rentalOffers" :key="index">


                                            <div class="card">
                                                <RouterLink to="/rental-offer">
                                                    <div class="card-header d-flex p-0" @click="showRentalOffer(offer.id)">
                                                        <h3 class="card-title p-3">{{ offer.title }}</h3>
                                                    </div><!-- /.card-header -->
                                                </RouterLink>
                                                <div class="card-body">
                                                    <div class="tab-content">
                                                        <div class="row">
                                                            <div class="col-2" v-if="offer.images.length > 0">
                                                                <RouterLink to="/rental-offer">
                                                                    <img style="width: 100px; height: 100px;"
                                                                        :src="this.url_back + offer.images[0].url_photo"
                                                                        @click="showRentalOffer(offer.id)">
                                                                </RouterLink>
                                                            </div>
                                                            <div class="col-2" v-if="offer.images.length == 0">
                                                                <RouterLink to="/rental-offer">
                                                                    <img style="width: 100px; height: 100px;"
                                                                        src="/sin_imagen.jpg"
                                                                        @click="showRentalOffer(offer.id)">
                                                                </RouterLink>
                                                            </div>
                                                            <div class="col-10">
                                                                <RouterLink to="/rental-offer">
                                                                    <h3 class="card-title p-3"
                                                                        @click="showRentalOffer(offer.id)">{{
                                                                            offer.description }}</h3>
                                                                </RouterLink>
                                                            </div>

                                                        </div>



                                                    </div>
                                                    <!-- /.tab-content -->
                                                </div><!-- /.card-body -->
                                            </div>



                                        </div>
                                    </div>

                                </div>
                                <!-- /.tab-content -->
                            </div><!-- /.card-body -->
                        </div>
                        <!-- ./card -->
                    </div>
                </div>
                <div class="row">
                    <!-- Modal Create Rental Offer -->
                    <div class="modal fade bd-example-modal-lg" tabindex="-1" role="dialog" ref="modal-create"
                        aria-labelledby="myLargeModalLabel" aria-hidden="true">
                        <div class="modal-dialog modal-lg">
                            <div class="modal-content">
                                <div class="modal-header">
                                    <h5 class="modal-title">Nuevo Aviso</h5>
                                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                                        id="closeModalCreateRentalOffer">
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div class="modal-body">
                                    <div class="alert alert-danger" role="alert" v-if="showAlert">
                                        {{ alertText }}
                                    </div>
                                    <div class="row">
                                        <div class="col-12">
                                            <label for="inputTitulo">T&iacute;tulo</label>
                                            <input type="text" class="form-control" id="inputTitulo"
                                                v-model="rentalOffer.title" placeholder="campo obligatorio">
                                        </div>
                                    </div><br>
                                    <div class="row">
                                        <div class="col-12">
                                            <label for="inputDescripcion">Descripci&oacute;n</label>
                                            <textarea name="textAreaDescripcion" id="textAreaDescripcion" cols="30" rows="4"
                                                class="form-control" v-model="rentalOffer.description"
                                                placeholder="campo obligatorio">
                                                            </textarea>
                                        </div>
                                    </div><br>
                                    <div class="row">
                                        <div class="col-6">
                                            <label for="inputMontoAlquiler">Monto del Alquiler</label>
                                            <input type="text" class="form-control" id="inputMontoAlquiler"
                                                v-model="rentalOffer.rent_amount" placeholder="campo obligatorio">
                                        </div>
                                        <div class="col-6" v-if="user.rol_id == 3">
                                            <label for="inputFechaMudanza">Fecha de mudanza</label>
                                            <input type="date" class="form-control" id="inputFechaMudanza"
                                                v-model="rentalOffer.moving_date">
                                        </div>
                                        <div class="col-6" v-if="user.rol_id == 2">
                                            <label for="inputFechaDisponibilidad">Fecha de disponibilidad</label>
                                            <input type="date" class="form-control" id="inputFechaDisponibilidad"
                                                v-model="rentalOffer.availability_date">
                                        </div>
                                    </div><br>
                                    <div class="row">
                                        <div class="col-6">
                                            <label for="inputPais">Pa&iacute;s</label>
                                            <select class="form-select" aria-label="Default select example"
                                                v-model="rentalOffer.country_id"
                                                @change="selectProvinces(rentalOffer.country_id)">
                                                <option v-for="(country, index) in countries" :key="index"
                                                    :value="country.id">{{ country.country_name }}</option>
                                            </select>
                                        </div>
                                        <div class="col-6">
                                            <label for="inputProvincia">Provincia</label>
                                            <select class="form-select" aria-label="Default select example"
                                                v-model="rentalOffer.province_id"
                                                @change="selectCities(rentalOffer.province_id)">
                                                <option v-for="(province, index) in provinces" :key="index"
                                                    :value="province.id">{{ province.province_name }}</option>
                                            </select>
                                        </div>
                                    </div><br>
                                    <div class="row">
                                        <div class="col-6">
                                            <label for="inputCiudad">Ciudad</label>
                                            <select class="form-select" aria-label="Default select example"
                                                v-model="rentalOffer.city_id">
                                                <option v-for="(city, index) in cities" :key="index" :value="city.id">{{
                                                    city.city_name }}</option>
                                            </select>
                                        </div>
                                        <div class="col-6">
                                            <label for="inputDireccion">Direcci&oacute;n</label>
                                            <input type="text" class="form-control" id="inputDireccion"
                                                v-model="rentalOffer.address" placeholder="campo obligatorio">
                                        </div>
                                    </div><br>
                                    <div class="row">
                                        <div class="col-6">
                                            <label for="inputDireccion">Compañero</label>
                                            <select class="form-select" aria-label="Default select example"
                                                v-model="rentalOffer.roommate">
                                                <option value="hombre">Hombre</option>
                                                <option value="mujer">Mujer</option>
                                            </select><br>
                                        </div>
                                        <div class="col-6">
                                            
                                        </div>
                                    </div><br>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <label for="input_file"
                                                class="text-secondary-card p-0 pl-2 m-0">Fotos</label><br>
                                            <input type="file" accept="image/*" ref="files" name="input_file"
                                                id="input_file" class="" placeholder="" @change="selectFiles"
                                                multiple="multiple">
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <a href="#" class="get-started-btn scrollto float-right"
                                        @click="saveRentalOffer">Guardar</a>
                                    <!-- <button type="button" class="btn btn-primary">Save changes</button> -->
                                    <!-- <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button> -->
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
    name: "my-rental-offers",
    data() {
        return {
            user: {},
            userId: '',
            rentalOffer: {
                title: '',
                type: '',
                rent_amount: '',
                moving_date: '',
                address: '',
                availability_date: '',
                description: '',
                city_id: '',
                province_id: '',
                country_id: '',
                roommate: ''
            },
            rentalOffers: [],
            files: [],
            showAlert: false,
            alertText: '',
            countries: [],
            provinces: [],
            cities: []
        }
    },
    components: {
        HeaderApp,
        FooterWeb
    },
    mounted() {
        this.loadUser();
        this.loadUserRentalOffers();
        this.loadLocations()
    },
    methods: {
        loadUser() {
            this.userId = localStorage.getItem('userId');

            const myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            fetch(this.url_back + "/api/users/" + this.userId, requestOptions)
                .then(response => response.json())
                .then(result => {
                    this.user = result.user;
                })
                .catch(error => console.log('error', error));
        },
        async saveRentalOffer() {
            if (this.validarRentalOffer()) {
                const myHeaders = new Headers();
                myHeaders.append("Accept", "application/json");
                myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));

                const formData = new FormData();
                formData.append("title", this.rentalOffer.title);
                formData.append("rent_amount", this.rentalOffer.rent_amount);
                formData.append("address", this.rentalOffer.address);
                formData.append("description", this.rentalOffer.description);
                formData.append("status", 'suspendido');
                formData.append("user_id", this.user.id);
                formData.append("city_id", this.rentalOffer.city_id);
                formData.append("roommate", this.rentalOffer.roommate);

                if (this.files) {
                    for (var i = 0; i < this.files.length; i++) {
                        let file = this.files[i];
                        formData.append("files[" + i + "]", file);
                    }
                }

                if (this.user.rol_id == 2) {
                    formData.append("type", 'propiedad');
                    formData.append("availability_date", this.rentalOffer.availability_date);
                    formData.append("moving_date", '2000-01-01');
                }
                if (this.user.rol_id == 3) {
                    formData.append("type", 'inquilino');
                    formData.append("moving_date", this.rentalOffer.moving_date);
                    formData.append("availability_date", '2000-01-01');
                }

                const requestOptions = {
                    method: 'POST',
                    headers: myHeaders,
                    body: formData,
                    redirect: 'follow'
                };

                let request = fetch(this.url_back + "/api/rentalOffers", requestOptions);
                let response = await request;
                let data = await response.json();

                if (response.ok && response.status == 201) {
                    this.clearRentalOffer();
                    this.loadUserRentalOffers();
                    this.closeCreateModal();
                } else {
                    console.log('error al guardar la oferta')
                }
            } else {
                this.showMsgAlert();
            }
        },
        async loadUserRentalOffers() {
            const myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            let request = fetch(this.url_back + "/api/rentalOffers/getUserRentalOffers/" + this.userId, requestOptions);
            let response = await request;
            let data = await response.json();

            if (response.ok && response.status == 201) {
                this.rentalOffers = data.rentalOffers;
            } else {
                console.log('error al cargar planes')
            }
        },
        clearRentalOffer() {
            this.rentalOffer.title = '';
            this.rentalOffer.type = '';
            this.rentalOffer.rent_amount = '';
            this.rentalOffer.moving_date = '';
            this.rentalOffer.address = '';
            this.rentalOffer.availability_date = '';
            this.rentalOffer.description = '';
            this.rentalOffer.city_id = '';
            this.rentalOffer.province_id = '';
            this.rentalOffer.country_id = '';
            this.files = []
        },
        selectFiles() {
            this.files = this.$refs.files.files;
        },
        showRentalOffer(id) {
            localStorage.rentalOfferId = id;
        },
        showMsgAlert() {
            this.showAlert = true;
            setTimeout(() => this.hideMsgAlert(), 2000);
        },
        hideMsgAlert() {
            this.showAlert = false;
        },
        closeCreateModal() {
            document.getElementById('closeModalCreateRentalOffer').click();
        },
        validarRentalOffer() {
            this.alertText = '';

            this.alertText += this.rentalOffer.title == '' ? '*El Título es obligatorio ' : '';
            this.alertText += this.rentalOffer.description == '' ? '*La Descripción es obligatoria ' : '';
            this.alertText += this.rentalOffer.rent_amount == '' ? '*El Monto es obligatorio ' : '';
            this.alertText += this.rentalOffer.country_id == '' ? '*El País es obligatorio ' : '';
            this.alertText += this.rentalOffer.province_id == '' ? '*La Provincia es obligatoria ' : '';
            this.alertText += this.rentalOffer.city_id == '' ? '*La Ciudad es obligatoria ' : '';
            this.alertText += this.rentalOffer.address == '' ? '*La dirección es obligatoria ' : '';

            return this.alertText == '' ? true : false;
        },
        async loadLocations() {
            const myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            let request = fetch(this.url_back + "/api/countries", requestOptions);
            let response = await request;
            let data = await response.json();

            if (response.ok && response.status == 201) {
                this.countries = data.countries;
            } else {
                console.log('error al cargar los paises')
            }
        },
        selectProvinces(country_id) {
            let country = this.countries.filter(country => country.id == country_id);
            this.provinces = country[0].provinces;
            this.rentalOffer.city_id = '';
            this.cities = []
        },
        selectCities(province_id) {
            let province = this.provinces.filter(province => province.id == province_id);
            this.cities = province[0].cities;
        },
    }
}

</script>
  
<style></style>
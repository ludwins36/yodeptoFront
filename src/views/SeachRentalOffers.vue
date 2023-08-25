<template>
    <HeaderApp />

    <main id="main">
        <!-- ======= Breadcrumbs ======= -->
        <section id="breadcrumbs" class="breadcrumbs">
            <div class="container">

                <ol>
                    <li><a href="#">Home</a></li>
                    <li>Buscar Avisos</li>
                </ol>
                <h2>Buscar Avisos</h2>

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
                                        <div class="col-4">
                                            <div class="row">
                                                <div class="col-12">
                                                    <h4>Tipo</h4>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" value=""
                                                            id="checkPropiedades" v-model="owner" @change="filterOptions">
                                                        <label class="form-check-label" for="flexCheckDefault">
                                                            Propiedades
                                                        </label>
                                                    </div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" value=""
                                                            id="checkSolicitudes" v-model="tenant" @change="filterOptions">
                                                        <label class="form-check-label" for="flexCheckChecked">
                                                            Solicitudes
                                                        </label>
                                                    </div>
                                                </div>
                                            </div><br><br>
                                            <div class="row">
                                                <div class="col-12">
                                                    <h4>Localizaci&oacute;n</h4>
                                                    <label for="inputPais">Pa&iacute;s</label>
                                                    <select class="form-select" aria-label="Default select example"
                                                        v-model="country_id" @change="selectProvinces(country_id)">
                                                        <option v-for="(country, index) in countries" :key="index"
                                                            :value="country.id">{{ country.country_name }}</option>
                                                    </select><br>
                                                    <label for="inputProvincia">Provincia</label>
                                                    <select class="form-select" aria-label="Default select example"
                                                        v-model="province_id" @change="selectCities(province_id)">
                                                        <option v-for="(province, index) in provinces" :key="index"
                                                            :value="province.id">{{ province.province_name }}</option>
                                                    </select><br>
                                                    <label for="inputCiudad">Ciudad</label>
                                                    <select class="form-select" aria-label="Default select example"
                                                        v-model="city_id" @change="filterOptions">
                                                        <option v-for="(city, index) in cities" :key="index"
                                                            :value="city.id">{{ city.city_name }}</option>
                                                    </select>

                                                </div>
                                            </div><br><br>
                                            <div class="row">
                                                <div class="col-12">
                                                    <h4>Ocupaci&oacute;n</h4>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" value=""
                                                            id="checkPropiedades" v-model="student" @change="filterOptions">
                                                        <label class="form-check-label" for="flexCheckDefault">
                                                            Estudiante
                                                        </label>
                                                    </div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" value=""
                                                            id="checkSolicitudes" v-model="professional" @change="filterOptions">
                                                        <label class="form-check-label" for="flexCheckChecked">
                                                            Profesional
                                                        </label>
                                                    </div>
                                                </div>
                                            </div><br><br>
                                            <div class="row">
                                                <div class="col-12">
                                                    <h4>Compañero</h4>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" value=""
                                                            id="checkPropiedades" v-model="man" @change="filterOptions">
                                                        <label class="form-check-label" for="flexCheckDefault">
                                                            Hombre
                                                        </label>
                                                    </div>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" value=""
                                                            id="checkSolicitudes" v-model="women" @change="filterOptions">
                                                        <label class="form-check-label" for="flexCheckChecked">
                                                            Mujer
                                                        </label>
                                                    </div>
                                                </div>
                                            </div><br><br>
                                            <div class="row">
                                                <div class="col-12">
                                                    <h4>Perfil</h4>
                                                    <div class="form-check">
                                                        <input class="form-check-input" type="checkbox" value=""
                                                            id="checkPropiedades" v-model="photo" @change="filterOptions">
                                                        <label class="form-check-label" for="flexCheckDefault">
                                                            Solo perfiles con foto
                                                        </label>
                                                    </div>
                                                    
                                                </div>
                                            </div><br><br>

                                        </div>
                                        <div class="col-8">
                                            <div class="row">
                                                <div class="col-12" v-for="(offer, index) in rentalOffers" :key="index">



                                                    <div class="card">
                                                        <RouterLink to="/rental-offer">
                                                            <div class="card-header d-flex p-0"
                                                                @click="showRentalOffer(offer.id)">
                                                                <h3 class="card-title p-3">{{ offer.title }}</h3>
                                                            </div>
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
                                                                    <div class="col-8">
                                                                        <RouterLink to="/rental-offer">
                                                                            <h3 class="card-title p-3"
                                                                                @click="showRentalOffer(offer.id)">{{
                                                                                    offer.description
                                                                                }}
                                                                            </h3>
                                                                        </RouterLink>
                                                                    </div>
                                                                    <div class="col-2">
                                                                        <span v-if="offer.favorites.filter(favorite => favorite.user_id == userId).length <= 0"><a @click="setFavorite(offer.id)" class="far fa-star" href="#" title="Agregar a Favoritos"></a></span>
                                                                        <span v-if="offer.favorites.filter(favorite => favorite.user_id == userId).length > 0"><a @click="removeFavorite(offer.id)" class="fas fa-star" href="#" title="Quitar de Favoritos"></a></span>
                                                                    </div>
                                                                </div>



                                                            </div>
                                                            <!-- /.tab-content -->
                                                        </div><!-- /.card-body -->
                                                    </div>
                                                </div>
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

            </div>
        </section>

    </main><!-- End #main -->

    <FooterWeb />
</template>
  
  
<script>
import HeaderApp from '../components/HeaderApp.vue'
import FooterWeb from '../components/FooterWeb.vue'

export default {
    name: "search-rental-offers",
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
                description: ''
            },
            rentalOffers: [],
            allRentalOffers: [],
            tenant: true,
            owner: true,
            country_id: '',
            province_id: '',
            city_id: '',
            countries: [],
            provinces: [],
            cities: [],
            student: true,
            professional: true,
            man: true,
            women: true,
            photo: false
        }
    },
    components: {
        HeaderApp,
        FooterWeb
    },
    mounted() {
        this.loadUser();
        this.loadRentalOffers();
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
        async loadRentalOffers() {
            const myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            let request = fetch(this.url_back + "/api/rentalOffers", requestOptions);
            let response = await request;
            let data = await response.json();

            if (response.ok && response.status == 201) {
                this.rentalOffers = data.rentalOffers;
                this.allRentalOffers = data.rentalOffers;
            } else {
                console.log('error al cargar los avisos')
            }
        },
        async setFavorite(offer_id) {
            const myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));

            const urlencoded = new URLSearchParams();
            urlencoded.append("rental_offer_id", offer_id);
            urlencoded.append("user_id", this.user.id);

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
            };

            let request = fetch(this.url_back + "/api/favorites/setFavoritesForUser", requestOptions);
            let response = await request;
            let data = await response.json();

            if (response.ok && response.status == 201) {
                this.loadRentalOffers();
                console.log('agregado a favoritos correctamente')
            } else {
                console.log('error al agregar a favoritos')
            }
        },
        async removeFavorite(offer_id) {
            const myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));

            const urlencoded = new URLSearchParams();
            urlencoded.append("rental_offer_id", offer_id);
            urlencoded.append("user_id", this.user.id);

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: urlencoded,
                redirect: 'follow'
            };

            let request = fetch(this.url_back + "/api/favorites/removeFavoritesForUser", requestOptions);
            let response = await request;
            let data = await response.json();

            if (response.ok && response.status == 201) {
                this.loadRentalOffers();
                console.log('removido de favoritos correctamente')
            } else {
                console.log('error al remover de favoritos')
            }
        },
        filterOptions() {
            let filterTypeRentalOffers = this.filterType(this.allRentalOffers);
            let filterLocationRentalOffers = this.filterLocation(filterTypeRentalOffers);
            let filterOcupationRentalOffers = this.filterOcupation(filterLocationRentalOffers);
            let filterRoommateRentalOffers = this.filterRoommate(filterOcupationRentalOffers);
            let filterPhotoProfileRentalOffers = this.filterPhotoProfile(filterRoommateRentalOffers);

            this.rentalOffers = filterPhotoProfileRentalOffers;
            console.log(filterPhotoProfileRentalOffers);
        },
        filterType(rentalOffers) {
            let filteredRentalOffers = [];

            if (this.owner && this.tenant) {
                filteredRentalOffers = rentalOffers;
            } else if (!this.owner && !this.tenant) {
                filteredRentalOffers = [];
            } else {
                if (this.owner) {
                    filteredRentalOffers = rentalOffers.filter(rentalOffer => rentalOffer.type == 'propiedad');
                }
                if (this.tenant) {
                    filteredRentalOffers = rentalOffers.filter(rentalOffer => rentalOffer.type == 'inquilino');
                }
            }

            return filteredRentalOffers;
        },
        filterLocation(rentalOffers) {
            if(this.city_id){
                let filteredRentalOffers = rentalOffers.filter(rentalOffer => rentalOffer.city_id == this.city_id);
                return filteredRentalOffers;
            }else{
                return rentalOffers;
            }
        },
        filterOcupation(rentalOffers) {
            let filteredRentalOffers = [];

            if (this.student && this.professional) {
                filteredRentalOffers = rentalOffers;
            } else if (!this.student && !this.professional) {
                filteredRentalOffers = [];
            } else {
                if (this.student) {
                    filteredRentalOffers = rentalOffers.filter(rentalOffer => rentalOffer.user && rentalOffer.user.profession !== null && rentalOffer.user.profession == 'estudiante');
                }
                if (this.professional) {
                    filteredRentalOffers = rentalOffers.filter(rentalOffer => rentalOffer.user && rentalOffer.user.profession !== null && rentalOffer.user.profession == 'profesional');
                }
            }

            return filteredRentalOffers;
        },
        filterRoommate(rentalOffers) {
            let filteredRentalOffers = [];

            if (this.man && this.women) {
                filteredRentalOffers = rentalOffers;
            } else if (!this.man && !this.women) {
                filteredRentalOffers = [];
            } else {
                if (this.man) {
                    filteredRentalOffers = rentalOffers.filter(rentalOffer => rentalOffer.roommate == 'hombre');
                }
                if (this.women) {
                    filteredRentalOffers = rentalOffers.filter(rentalOffer => rentalOffer.roommate == 'mujer');
                }
            }

            return filteredRentalOffers;
        },
        filterPhotoProfile(rentalOffers) {
            let filteredRentalOffers = [];

            if (this.photo) {
                filteredRentalOffers = rentalOffers.filter(rentalOffer => rentalOffer.user && rentalOffer.user.url_photo !== null);
            } else {
                filteredRentalOffers = rentalOffers;
            }

            return filteredRentalOffers;
        },
        showRentalOffer(id) {
            localStorage.rentalOfferId = id;
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
            this.city_id = '';
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
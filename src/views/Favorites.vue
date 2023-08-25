<template>
    <HeaderApp />

    <main id="main">
        <!-- ======= Breadcrumbs ======= -->
        <section id="breadcrumbs" class="breadcrumbs">
            <div class="container">

                <ol>
                    <li><a href="#">Home</a></li>
                    <li>Favoritos</li>
                </ol>
                <h2>Favoritos</h2>

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

                                                            <div class="col-8">
                                                                <RouterLink to="/rental-offer">
                                                                    <h3 class="card-title p-3"
                                                                        @click="showRentalOffer(offer.id)">{{
                                                                            offer.description }}</h3>
                                                                </RouterLink>
                                                            </div>
                                                            <div class="col-2">
                                                                <a @click="removeFavorite(offer.id)" class="fas fa-star" href="#" title="Quitar de Favoritos"></a>
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



            </div>
        </section>

    </main><!-- End #main -->

    <FooterWeb />
</template>
  
  
<script>
import HeaderApp from '../components/HeaderApp.vue'
import FooterWeb from '../components/FooterWeb.vue'

export default {
    name: "favorites",
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
            rentalOffers: []

        }
    },
    components: {
        HeaderApp,
        FooterWeb
    },
    mounted() {
        this.loadUser();
        this.loadFavorites()
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
        async loadFavorites() {
            const myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            let request = fetch(this.url_back + "/api/favorites/getFavoritesForUser/" + this.userId, requestOptions);
            let response = await request;
            let data = await response.json();

            if (response.ok && response.status == 201) {
                this.rentalOffers = data.rentalOffers;
            } else {
                console.log('error al cargar favoritos')
            }
        },
        showRentalOffer(id) {
            localStorage.rentalOfferId = id;
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
                this.loadFavorites();
                console.log('removido de favoritos correctamente')
            } else {
                console.log('error al remover de favoritos')
            }
        },
    }
}

</script>
  
<style></style>
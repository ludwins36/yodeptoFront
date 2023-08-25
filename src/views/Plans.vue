<template>
    <HeaderApp />

    <main id="main">
        <!-- ======= Breadcrumbs ======= -->
        <section id="breadcrumbs" class="breadcrumbs">
            <div class="container">

                <ol>
                    <li><a href="#">Home</a></li>
                    <li>Planes</li>
                </ol>
                <h2>Planes</h2>

            </div>
        </section><!-- End Breadcrumbs -->

        <section class="inner-page">
            <div class="container">

                <div class="row">
                    <div class="col-4" v-for="(plan, index) in plans" :key="index">
                        <!-- <div class="card" v-if="plan.status == 'activo'"> -->
                            <div class="card">
                            <div class="card-body">
                                <div class="row">
                                    <center>
                                        <h1>
                                            {{ plan.name }}
                                        </h1>
                                    </center>
                                </div><br>
                                <div class="row">
                                    <center>
                                        <h4>
                                            {{ plan.description }}
                                        </h4>
                                    </center>
                                </div><br>
                                <div class="row">
                                    <center>
                                        <h4>
                                            Precio: $ {{ plan.mount }}
                                        </h4>
                                    </center>
                                </div><br>
                                <div class="row">
                                    <center>
                                        <a :href="plan.link_mp" class="get-started-btn scrollto"
                                            target="_blank">Pagar</a>
                                    </center>
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
import { createInterpolation } from '@vue/compiler-core'

export default {
    name: "favorites",
    data() {
        return {
            plans: []
        }
    },
    components: {
        HeaderApp,
        FooterWeb,
        createInterpolation
    },
    mounted() {
        this.loadUser();
        this.loadPlans()
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
        async loadPlans() {
            const myHeaders = new Headers();
            myHeaders.append("Accept", "application/json");
            myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
            myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));

            const requestOptions = {
                method: 'GET',
                headers: myHeaders,
                redirect: 'follow'
            };

            let request = fetch(this.url_back + "/api/plans", requestOptions);
            let response = await request;
            let data = await response.json();

            if (response.ok && response.status == 201) {
                this.plans = data.plans.filter(plan => plan.id != 1 && plan.id != 2 && plan.status == 'activo');
            } else {
                console.log('error al cargar planes')
            }
        }

    }
}

</script>
  
<style></style>
<template>
  <div class="wrapper">

    <LayoutAdmin />

    <div class="content-wrapper">
      <section class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-6">
              <h1>Descripci&oacute;n de Ofertas</h1>
            </div>
            <div class="col-4">
              <input type="text" class="form-control" v-model="filter">
            </div>
            <div class="col-2">
              <button type="button" class="btn btn-primary" @click="filterRentalOffers">Filtrar</button>
            </div>
          </div>

          <div class="row mb-2">
            <div class="col-12">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Titulo</th>
                    <th scope="col">Descripci&oacute;n</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(rentalOffer, index) in rentalOffers" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ rentalOffer.title }}</td>
                    <td>{{ rentalOffer.description }}</td>
                    <td>{{ rentalOffer.status }}</td>
                    <td><a href="#" class="fas fa-pen" data-toggle="modal" data-target="#modalUpdateRentalOffer"
                        @click="editRentalOffer(rentalOffer)"></a></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Modal Update-->
            <div class="modal fade" id="modalUpdateRentalOffer" tabindex="-1" role="dialog"
              aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Actualizar Oferta</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"
                      id="closeModalUpdateRentalOffer">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="alert alert-danger" role="alert" v-if="showAlert">
                      {{ alertText }}
                    </div>
                    <input type="text" class="form-control" placeholder="Título" v-model="titleRentalOffer"><br>
                    <textarea name="textAreaDescripcion" id="textAreaDescripcion" cols="30" rows="4" class="form-control"
                      v-model="descriptionRentalOffer" placeholder="Descripción">
                                                            </textarea><br>
                    <select class="form-select" aria-label="Default select example" v-model="statusRentalOffer">
                      <option value="activo">Activo</option>
                      <option value="suspendido">Suspendido</option>
                    </select><br>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="updateRentalOffer">Actualizar</button>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  </div>
</template>
  
  
<script>
import LayoutAdmin from '../components/LayoutAdmin.vue'

export default {
  name: "admin-descriptions",
  data() {
    return {
      rentalOffers: [],
      allRentalOffers: [],
      alertText: '',
      titleRentalOffer: '',
      descriptionRentalOffer: '',
      statusRentalOffer: '',
      idRentalOffer: '',
      alertText: '',
      showAlert: false,
      filter: ''
    }
  },
  components: {
    LayoutAdmin
  },
  mounted() {
    this.loadRentalOffers()
  },
  methods: {
    async loadRentalOffers() {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
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
        console.log('error al cargar planes')
      }
    },
    editRentalOffer(rentalOffer) {
      this.idRentalOffer = rentalOffer.id;
      this.titleRentalOffer = rentalOffer.title;
      this.descriptionRentalOffer = rentalOffer.description;
      this.statusRentalOffer = rentalOffer.status
    },
    async updateRentalOffer() {
      if (this.validarRentalOffer()) {
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));

        const urlencoded = new URLSearchParams();
        urlencoded.append("id", this.idRentalOffer);
        urlencoded.append("title", this.titleRentalOffer);
        urlencoded.append("description", this.descriptionRentalOffer);
        urlencoded.append("status", this.statusRentalOffer);

        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };

        let request = fetch(this.url_back + "/api/rentalOffers/updateDescription", requestOptions);
        let response = await request;
        let data = await response.json();

        if (response.ok && response.status == 201) {
          this.loadRentalOffers();
          this.closeUpdateModal()
        } else {
          console.log('error al actualizar la oferta')
        }
      } else {
        this.showMsgAlert();
      }
    },
    closeUpdateModal() {
      document.getElementById('closeModalUpdateRentalOffer').click();
    },
    validarRentalOffer() {
      this.alertText = '';

      this.alertText += this.titleRentalOffer == '' ? '*El Título es obligatorio ' : '';
      this.alertText += this.descriptionRentalOffer == '' ? '*La Descripción es obligatorio ' : '';

      return this.alertText == '' ? true : false;
    },
    showMsgAlert() {
      this.showAlert = true;
      setTimeout(() => this.hideMsgAlert(), 2000);
    },
    hideMsgAlert() {
      this.showAlert = false;
    },
    filterRentalOffers() {
      this.rentalOffers = this.allRentalOffers;
      let rental_offers_filtered = [];
      const regex = new RegExp(`^.*${this.filter}.*$`, 'i');

      this.rentalOffers.forEach(rentalOffer => {
        if (regex.test(rentalOffer.title) || regex.test(rentalOffer.description) || regex.test(rentalOffer.status)) {
          rental_offers_filtered.push(rentalOffer)
        }
      });

      this.rentalOffers = rental_offers_filtered;
    }
  }
}

</script>
  
<style></style>
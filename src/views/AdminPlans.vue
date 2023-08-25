<template>
  <div class="wrapper">

    <LayoutAdmin />

    <div class="content-wrapper">
      <section class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-10">
              <h1>Planes</h1>
            </div>
            <div class="col-sm-2">
              <a href="#" class="btn btn-primary" data-toggle="modal" data-target="#modalCreatePlan"
                @click="createPlan">Nuevo Plan</a>
            </div>

            <div class="col-12">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripci&oacute;n</th>
                    <th scope="col">Duraci&oacute;n</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Monto</th>
                    <th scope="col">Link MP</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(plan, index) in plans" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ plan.name }}</td>
                    <td>{{ plan.description }}</td>
                    <td>{{ plan.duration }} d&iacute;as</td>
                    <td>{{ plan.status }}</td>
                    <td>{{ plan.mount }}</td>
                    <td>{{ plan.link_mp }}</td>
                    <td><a href="#" class="fas fa-pen" data-toggle="modal" data-target="#modalUpdatePlan"
                        @click="editPlan(plan)"></a></td>
                  </tr>
                </tbody>
              </table>
            </div>


            <!-- Modal Update-->
            <div class="modal fade" id="modalUpdatePlan" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
              aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Actualizar Plan</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="closeModalUpdatePlan">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="alert alert-danger" role="alert" v-if="showAlert">
                      {{ alertText }}
                    </div>
                    <input type="text" class="form-control" placeholder="Nombre" v-model="namePlan"><br>
                    <input type="text" class="form-control" placeholder="Descripcion" v-model="descriptionPlan"><br>
                    <input type="text" class="form-control" placeholder="Duración en días" v-model="durationPlan"><br>
                    <input type="text" class="form-control" placeholder="Monto" v-model="mountPlan"><br>
                    <select class="form-select" aria-label="Default select example" v-model="statusPlan">
                      <option value="activo">Activo</option>
                      <option value="suspendido">Suspendido</option>
                    </select><br>
                    <input type="text" class="form-control" placeholder="Link a Mercado Pago" v-model="linkMpPlan"><br>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="updatePlan">Actualizar</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Modal Create-->
            <div class="modal fade" id="modalCreatePlan" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
              aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Nuevo Plan</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close" id="closeModalCreatePlan">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <div class="alert alert-danger" role="alert" v-if="showAlert">
                      {{ alertText }}
                    </div>
                    <input type="text" class="form-control" placeholder="Nombre" v-model="namePlan"><br>
                    <input type="text" class="form-control" placeholder="Descripcion" v-model="descriptionPlan"><br>
                    <input type="text" class="form-control" placeholder="Duración en días" v-model="durationPlan"><br>
                    <input type="text" class="form-control" placeholder="Monto" v-model="mountPlan"><br>
                    <select class="form-select" aria-label="Default select example" v-model="statusPlan">
                      <option value="activo">Activo</option>
                      <option value="suspendido">Suspendido</option>
                    </select><br>
                    <input type="text" class="form-control" placeholder="Link a Mercado Pago" v-model="linkMpPlan"><br>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="storePlan">Guardar</button>
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
import LayoutAdmin from '../components/LayoutAdmin.vue';

export default {
  name: "admin-plans",
  data() {
    return {
      plans: [],
      idPlan: '',
      namePlan: '',
      descriptionPlan: '',
      mountPlan: '',
      durationPlan: '',
      statusPlan: '',
      linkMpPlan: '',
      showAlert: false,
      alertText: ''
    }
  },
  components: {
    LayoutAdmin
  },
  mounted() {
    this.loadPlans()
  },
  methods: {
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
        this.plans = data.plans;
      } else {
        console.log('error al cargar planes')
      }
    },
    editPlan(plan) {
      this.idPlan = plan.id;
      this.namePlan = plan.name;
      this.descriptionPlan = plan.description;
      this.mountPlan = plan.mount;
      this.durationPlan = plan.duration;
      this.statusPlan = plan.status;
      this.linkMpPlan = plan.link_mp
    },
    async updatePlan() {
      if (this.validarPlan()) {
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));

        const urlencoded = new URLSearchParams();
        urlencoded.append("id", this.idPlan);
        urlencoded.append("name", this.namePlan);
        urlencoded.append("description", this.descriptionPlan);
        urlencoded.append("mount", this.mountPlan);
        urlencoded.append("duration", this.durationPlan);

        this.statusPlan == '' ? urlencoded.append("status", 'suspendido') : urlencoded.append("status", this.statusPlan);
        this.linkMpPlan == '' ? urlencoded.append("link_mp", 'null') : urlencoded.append("link_mp", this.linkMpPlan);

        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };

        let request = fetch(this.url_back + "/api/plans/update", requestOptions);
        let response = await request;
        let data = await response.json();

        if (response.ok && response.status == 201) {
          this.loadPlans();
          this.closeUpdateModal()
        } else {
          console.log('error al actualizar el plan')
        }
      } else {
        this.showMsgAlert();
      }
    },
    createPlan() {
      this.namePlan = '';
      this.descriptionPlan = '';
      this.mountPlan = '';
      this.durationPlan = '';
      this.statusPlan = '';
      this.linkMpPlan = '';
    },
    async storePlan() {
      if (this.validarPlan()) {
        const myHeaders = new Headers();
        myHeaders.append("Accept", "application/json");
        myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
        myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));

        const urlencoded = new URLSearchParams();
        urlencoded.append("name", this.namePlan);
        urlencoded.append("description", this.descriptionPlan);
        urlencoded.append("mount", this.mountPlan);
        urlencoded.append("status", this.statusPlan);
        urlencoded.append("duration", this.durationPlan);

        this.statusPlan == '' ? urlencoded.append("status", 'suspendido') : urlencoded.append("status", this.statusPlan);
        this.linkMpPlan == '' ? urlencoded.append("link_mp", 'null') : urlencoded.append("link_mp", this.linkMpPlan);

        const requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: urlencoded,
          redirect: 'follow'
        };

        let request = fetch(this.url_back + "/api/plans", requestOptions);
        let response = await request;
        let data = await response.json();

        if (response.ok && response.status == 201) {
          this.loadPlans();
          this.closeCreateModal()
        } else {
          console.log('error al cargar nuevo plan')
        }

      } else {
        this.showMsgAlert();
      }
    },
    validarPlan() {
      this.alertText = '';

      this.alertText += this.namePlan == '' ? '*El Nombre del Plan es obligatorio ' : '';
      this.alertText += this.descriptionPlan == '' ? '*La Descripción del Plan es obligatorio ' : '';
      this.alertText += this.mountPlan == '' ? '*El Monto del Plan es obligatorio ' : '';
      this.alertText += this.durationPlan == '' ? '*La Duración del Plan es obligatoria ' : '';

      return this.alertText == '' ? true : false;
    },
    showMsgAlert() {
      this.showAlert = true;
      setTimeout(() => this.hideMsgAlert(), 2000);
    },
    hideMsgAlert() {
      this.showAlert = false;
    },
    closeCreateModal() {
      document.getElementById('closeModalCreatePlan').click();
    },
    closeUpdateModal() {
      document.getElementById('closeModalUpdatePlan').click();
    }
  }
}

</script>
  
<style></style>
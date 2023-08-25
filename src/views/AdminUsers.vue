<template>
  <div class="wrapper">

    <LayoutAdmin />

    <div class="content-wrapper">
      <section class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-6">
              <h1>Usuarios</h1>
            </div>
            <div class="col-4">
              <input type="text" class="form-control" v-model="filter">
            </div>
            <div class="col-2">
              <button type="button" class="btn btn-primary" @click="filterUsers">Filtrar</button>
            </div>
          </div>

          <div class="container-fluid">

            <div class="col-12">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Apellido</th>
                    <th scope="col">e-mail</th>
                    <th scope="col">Tel&eacute;fono</th>
                    <th scope="col">Estado</th>
                    <th scope="col">Tipo de suscripci&oacute;n</th>
                    <th scope="col">Plan</th>
                    <th scope="col">&Uacute;ltimo pago</th>
                    <th scope="col">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(user, index) in users" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ user.first_name }}</td>
                    <td>{{ user.last_name }}</td>
                    <td>{{ user.email }}</td>
                    <td>{{ user.phone }}</td>
                    <td>{{ user.status }}</td>
                    <td v-if="user.payments.length > 0">Avanzada</td>
                    <td v-if="user.payments.length <= 0">Gratuita</td>
                    <td v-if="user.payments.length > 0">{{ user.payments[user.payments.length - 1].plan.name }}</td>
                    <td v-if="user.payments.length <= 0">Plan Gratuito</td>
                    <td v-if="user.payments.length > 0">{{ formatearFecha(user.payments[user.payments.length - 1].date_payment) }}</td>
                    <td v-if="user.payments.length <= 0"></td>
                    <td><a href="#" class="fas fa-pen" data-toggle="modal" data-target="#modalUpdateUser"
                        @click="editUser(user)"></a>&nbsp;
                      <a href="#" class="fas fa-dollar-sign" data-toggle="modal" data-target="#modalUpdatePlan"
                        @click="editPlan(user)"></a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <!-- Modal Update User -->
            <div class="modal fade" id="modalUpdateUser" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
              aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Editar Usuario</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <label for="">Usuario: {{ user_full_name }}</label><br>
                    <label for="">Estado</label>
                    <select class="form-select" aria-label="Default select example" v-model="user_status">
                      <option value="activo">Activo</option>
                      <option value="suspendido">Suspendido</option>
                    </select><br>
                    <label for="">Rol</label>
                    <select class="form-select" aria-label="Default select example" v-model="user_rol">
                      <option value="1">Administrador</option>
                      <option value="2">Propietario</option>
                      <option value="3">Inquilino</option>
                    </select><br>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="updateUser"
                      data-dismiss="modal">Actualizar</button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Modal Update Plan-->
            <div class="modal fade" id="modalUpdatePlan" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel"
              aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Actualizar Plan</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <label for="">Fecha de Pago</label>
                    <input type="date" class="form-control" v-model="date_payment"><br>
                    <label for="">Desde</label>
                    <input type="date" class="form-control" v-model="date_from"><br>
                    <label for="">Hasta</label>
                    <input type="date" class="form-control" v-model="date_to"><br>
                    <label for="">Plan</label>
                    <select class="form-select" aria-label="Default select example" v-model="plan_id">
                      <option v-for="(plan, index) in plans" :key="index" :value="plan.id">{{ plan.name }}</option>
                    </select><br>
                    <label for="">Monto</label>
                    <input type="text" class="form-control" v-model="payment_amount"><br>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-primary" @click="updatePlan"
                      data-dismiss="modal">Actualizar</button>
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
  name: "admin-users",
  data() {
    return {
      users: [],
      allUsers: [],
      date_payment: '',
      date_from: '',
      date_to: '',
      payment_amount: '',
      user_id: '',
      user_status: '',
      user_full_name: '',
      user_rol: '',
      plan_id: '',
      plans: [],
      filter: ''
    }
  },
  components: {
    LayoutAdmin
  },
  mounted() {
    this.loadUsers();
    this.loadPlans()
  },
  methods: {
    async loadUsers() {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      let request = fetch(this.url_back + "/api/users", requestOptions);
      let response = await request;
      let data = await response.json();

      if (response.ok && response.status == 201) {
        this.users = data.users;
        this.allUsers = data.users;
      } else {
        console.log('error al cargar usuarios')
      }
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
        this.plans = data.plans.filter(plan => plan.status == 'activo');
      } else {
        console.log('error al cargar planes')
      }
    },
    editPlan(user) {
      this.user_id = user.id;
    },
    async updatePlan() {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));

      const urlencoded = new URLSearchParams();
      urlencoded.append("date_payment", this.date_payment);
      urlencoded.append("date_from", this.date_from);
      urlencoded.append("date_to", this.date_to);
      urlencoded.append("payment_amount", this.payment_amount);
      urlencoded.append("user_id", this.user_id);
      urlencoded.append("plan_id", this.plan_id);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };

      let request = fetch(this.url_back + "/api/payment/updatePlan", requestOptions);
      let response = await request;
      let data = await response.json();

      if (response.ok && response.status == 201) {
        console.log('pago registrado correctamente');
        this.loadUsers()
      } else {
        console.log('error al registrar el pago')
      }

    },
    editUser(user) {
      this.user_id = user.id;
      this.user_status = user.status;
      this.user_full_name = user.first_name + ' ' + user.last_name;
      this.user_rol = user.rol_id;
    },
    async updateUser() {
      this.updateStatus();
      this.updateRol();
    },
    async updateRol() {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));

      const urlencoded = new URLSearchParams();
      urlencoded.append("user_id", this.user_id);
      urlencoded.append("user_rol", this.user_rol);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };

      let request = fetch(this.url_back + "/api/users/changeRol", requestOptions);
      let response = await request;
      let data = await response.json();

      if (response.ok && response.status == 201) {
        console.log('rol de usuario actualizado correctamente');
        this.loadUsers()
      } else {
        console.log('error al actualizar rol de usuario')
      }
    },
    async updateStatus() {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));

      const urlencoded = new URLSearchParams();
      urlencoded.append("user_id", this.user_id);
      urlencoded.append("user_status", this.user_status);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };

      let request = fetch(this.url_back + "/api/users/changeStatus", requestOptions);
      let response = await request;
      let data = await response.json();

      if (response.ok && response.status == 201) {
        console.log('estado de usuario actualizado correctamente')
      } else {
        console.log('error al actualizar estado de usuario')
      }
    },
    filterUsers() {
      this.users = this.allUsers;
      let users_filtered = [];
      const regex = new RegExp(`^.*${this.filter}.*$`, 'i');

      this.users.forEach(user => {
        if (regex.test(user.first_name) || regex.test(user.last_name) || regex.test(user.email) || regex.test(user.phone) || regex.test(user.status)) {
          users_filtered.push(user)
        }
      });

      this.users = users_filtered;
    },
    formatearFecha(fecha) {
      const partesFecha = fecha.split(" ")[0].split("-");
      const dia = partesFecha[2];
      const mes = partesFecha[1];
      const año = partesFecha[0];

      return `${dia}-${mes}-${año}`;
    }
  }
}

</script>

<style></style>
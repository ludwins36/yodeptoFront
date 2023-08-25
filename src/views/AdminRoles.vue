<template>
  <div class="wrapper">

    <LayoutAdmin />

    <div class="content-wrapper">
      <section class="content-header">
        <div class="container-fluid">
          <div class="row mb-2">
            <div class="col-sm-12">
              <h1>Roles</h1>
            </div>

            <div class="col-12">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre</th>
                    <th scope="col">Descripci&oacute;n</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(rol, index) in roles" :key="index">
                    <th scope="row">{{ index + 1 }}</th>
                    <td>{{ rol.name_rol }}</td>
                    <td>{{ rol.description }}</td>
                  </tr>
                </tbody>
              </table>
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
  name: "admin-roles",
  data() {
    return {
      roles: []
    }
  },
  components: {
    LayoutAdmin
  },
  mounted() {
    this.loadRoles()
  },
  methods: {
    async loadRoles() {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
      myHeaders.append("Authorization", "Bearer " + localStorage.getItem('token'));

      const requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

      let request = fetch(this.url_back + "/api/roles", requestOptions);
      let response = await request;
      let data = await response.json();

      if (response.ok && response.status == 201) {
        this.roles = data.roles;
      } else {
        console.log('error al cargar roles')
      }
    }
  }
}

</script>
  
<style></style>
<template>
  <HeaderWeb />

  <!-- ======= Hero Section ======= -->
  <section id="hero" class="d-flex flex-column justify-content-end">
    <div class="container">
      <div class="row justify-content-end">
        <div class="col-xl-8">

        </div>
      </div>
      <div class="row">
        <div class="col-1 justify-content-end">
        </div>
        <div class="col-4 justify-content-end">
          <RouterLink to="/register-renter"><a href="#" class="get-started-btn scrollto">REGISTRATE COMO INQUILINO</a>
          </RouterLink>
        </div>
        <div class="col-2 justify-content-end">
        </div>
        <div class="col-4 justify-content-end">
          <RouterLink to="/register-owner"><a href="#" class="get-started-btn scrollto">REGISTRATE COMO PROPIETARIO</a>
          </RouterLink>
        </div>
      </div>
    </div>



  </section><!-- End Hero -->

  <main id="main">

    <!-- ======= Services Section ======= -->
    <section id="steps" class="services">
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-6 d-flex align-items-stretch">
            <div class="icon-box">
              <!-- <div class="icon"><i class="bi bi-1-circle"></i></div> -->
              <h4><a href="#">Creá tu cuenta</a></h4>
              <p>Publicar un aviso es gratuito y lleva unos minutos. Tus datos de contacto se tratarán de manera
                confidencial, pero te podrán contactar desde tu perfil de YodeptO.</p>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
            <div class="icon-box">
              <!-- <div class="icon"><i class="bi bi-2-circle"></i></div> -->
              <h4><a href="#">Encontrá tu habitación o compañero ideal</a></h4>
              <p>Usa nuestras herramientas de búsqueda para encontrar miles de habitaciones y compañeros de departamento
                disponible.</p>
            </div>
          </div>

          <div class="col-lg-4 col-md-6 d-flex align-items-stretch mt-4 mt-lg-0">
            <div class="icon-box">
              <!-- <div class="icon"><i class="bi bi-3-circle"></i></div> -->
              <h4><a href="#">Contactá y empezá a compartir</a></h4>
              <p>Contactá con las personas que concuerdan con tus requisitos. Cada día hay nuevos avisos disponibles.</p>
            </div>
          </div>

        </div>

      </div>
    </section><!-- End Services Section -->

    <!-- ======= Roomies Section ======= -->
    <section id="roomies" class="portfolio">
      <div class="container">

        <div class="section-title">
          <h2>NUEVOS ROOMIES EN YODEPTO</h2>
          <p></p>
        </div>

        <div id="carouselRoomies" class="carousel slide" data-bs-ride="carousel">

          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="row portfolio-container">

                <div class="col-lg-4 col-md-6 portfolio-item filter-app"
                  v-for="(offer, index) in roomieRentalOffers.slice(0, 3)" :key="index">
                  <img :src="this.url_back + offer.images[0].url_photo" class="img-fluid" alt=""
                    v-if="offer.images.length > 0">
                  <img src="/sin_imagen.jpg" class="img-fluid" alt="" v-if="offer.images.length == 0">
                  <!-- <img src="/public/assets/img/portfolio/portfolio-3.jpg" class="img-fluid" alt=""> -->
                  <div class="portfolio-info">
                    <h4>{{ offer.title }}</h4>
                    <p>{{ offer.title }}</p>
                  </div>
                </div>

              </div>

            </div>
            <div class="carousel-item">
              <div class="row portfolio-container">

                <div class="col-lg-4 col-md-6 portfolio-item filter-app"
                  v-for="(offer, index) in roomieRentalOffers.slice(3, 6)" :key="index">
                  <img :src="this.url_back + offer.images[0].url_photo" class="img-fluid" alt=""
                    v-if="offer.images.length > 0">
                  <img src="/sin_imagen.jpg" class="img-fluid" alt="" v-if="offer.images.length == 0">
                  <!-- <img src="/public/assets/img/portfolio/portfolio-3.jpg" class="img-fluid" alt=""> -->
                  <div class="portfolio-info">
                    <h4>{{ offer.title }}</h4>
                    <p>{{ offer.title }}</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselRoomies" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselRoomies" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>

      </div>
    </section><!-- End Roomies Section -->



    <!-- ======= Owners Section ======= -->
    <section id="owners" class="portfolio">
      <div class="container">

        <div class="section-title">
          <h2>NUEVOS PROPIETARIOS EN YODEPTO</h2>
          <p></p>
        </div>

        <div id="carouselOwners" class="carousel slide" data-bs-ride="carousel">

          <div class="carousel-inner">
            <div class="carousel-item active">
              <div class="row portfolio-container">

                <div class="col-lg-4 col-md-6 portfolio-item filter-app"
                  v-for="(offer, index) in ownerRentalOffers.slice(0, 3)" :key="index">
                  <img :src="this.url_back + offer.images[0].url_photo" class="img-fluid" alt=""
                    v-if="offer.images.length > 0">
                  <img src="/sin_imagen.jpg" class="img-fluid" alt="" v-if="offer.images.length == 0">
                  <!-- <img src="/public/assets/img/portfolio/portfolio-3.jpg" class="img-fluid" alt=""> -->
                  <div class="portfolio-info">
                    <h4>{{ offer.title }}</h4>
                    <p>{{ offer.title }}</p>
                  </div>
                </div>

              </div>

            </div>
            <div class="carousel-item">
              <div class="row portfolio-container">

                <div class="col-lg-4 col-md-6 portfolio-item filter-app"
                  v-for="(offer, index) in ownerRentalOffers.slice(3, 6)" :key="index">
                  <img :src="this.url_back + offer.images[0].url_photo" class="img-fluid" alt=""
                    v-if="offer.images.length > 0">
                  <img src="/sin_imagen.jpg" class="img-fluid" alt="" v-if="offer.images.length == 0">
                  <!-- <img src="/public/assets/img/portfolio/portfolio-3.jpg" class="img-fluid" alt=""> -->
                  <div class="portfolio-info">
                    <h4>{{ offer.title }}</h4>
                    <p>{{ offer.title }}</p>
                  </div>
                </div>

              </div>
            </div>

          </div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carouselOwners" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carouselOwners" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>

      </div>
    </section><!-- End Owners Section -->

    <!-- ======= Counts Section ======= -->
    <section id="register" class="counts">
      <div class="container">

        <div class="text-center title">
          <h3>REG&Iacute;STRATE ¿QU&Eacute; EST&Aacute;S ESPERANDO?</h3>
        </div>

        <div class="row">

          <div class="col-lg-5 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
            <center>
              <RouterLink to="/register-renter">
                <div class="icon-box">
                  <h4><a href="#">Registrate como inquilino</a></h4>
                  <p>BUSCA HABITACION/DEPTO</p>
                </div>
              </RouterLink>
            </center>
          </div>

          <div class="col-lg-2 col-md-2 d-flex align-items-stretch mt-4 mt-md-0">
          </div>

          <div class="col-lg-5 col-md-6 d-flex align-items-stretch mt-4 mt-md-0">
            <center>
              <RouterLink to="/register-owner">
                <div class="icon-box">
                  <h4><a href="#">Registrate como propietario</a></h4>
                  <p>OFREZCE HABITACION/DEPTO</p>
                </div>
              </RouterLink>
            </center>
          </div>

        </div>

      </div>
    </section><!-- End Counts Section -->

    <!-- ======= Contact Section ======= -->
    <section id="contact" class="contact">
      <div class="container">

        <div class="section-title">
          <h2>Contacto</h2>
          <p>Puedes escribirnos un correo o contactarnos completando el siguiente formulario.</p>
        </div>
      </div>


      <div class="container">

        <div class="row mt-5">

          <div class="col-lg-4">
            <div class="row">
              <div class="col-12">

                <div class="info">
                  <div class="email">
                    <a href="mailto:equipo@yodepto.com">
                      <i class="ri-mail-line"></i>
                      <h4>Correo:</h4>
                      <p>equipo@yodepto.com</p>
                    </a>
                  </div>
                </div>

              </div>
            </div>
            <div class="row">
              <div class="col-12">

                <div class="info">
                  <div class="email">
                    <a href="https://www.facebook.com/YoDept0/?locale=es_LA" target="_blank">
                      <i class="bx bxl-facebook"></i>
                      <h4>Facebook:</h4>
                      <p>facebook.com/YoDept0</p>
                    </a>
                  </div>
                </div>

              </div>
            </div>
            <div class="row">
              <div class="col-12">

                <div class="info">
                  <div class="email">
                    <a href="https://www.instagram.com/yodepto" target="_blank">
                      <i class="bx bxl-instagram"></i>
                      <h4>Instagram:</h4>
                      <p>instagram.com/yodepto</p>
                    </a>
                  </div>
                </div>

              </div>
            </div>


          </div>

          <div class="col-lg-8 mt-5 mt-lg-0">
            <div class="row">
              <div class="col-12">
                <div class="alert alert-danger" role="alert" v-if="showAlertDanger">
                  {{ textAlert }}
                </div>
                <div class="alert alert-success" role="alert" v-if="showAlertSuccess">
                  Mensaje enviado correctamente
                </div>
              </div>
            </div>



            <!-- <form action="{{sendMessage()}}" method="post" role="form" class="php-email-form"> -->
            <div class="row">
              <div class="col-md-6 form-group">
                <input type="text" name="name" class="form-control" id="name" placeholder="Nombre" required
                  v-model="name">
              </div>
              <div class="col-md-6 form-group mt-3 mt-md-0">
                <input type="email" class="form-control" name="email" id="email" placeholder="Correo" required
                  v-model="email">
              </div>
            </div>
            <div class="form-group mt-3">
              <textarea class="form-control" name="message" rows="5" placeholder="Mensaje" required
                v-model="message"></textarea>
            </div>

            <!-- <div class="my-3">
                <div class="loading">Enviando...</div>
                <div class="error-message"></div>
                <div class="sent-message">Tu mensaje ha sido enviado. ¡Gracias!</div>
              </div> -->
            <!-- <div class="g-recaptcha" :data-sitekey="recaptchaSiteKey" @verify="onCaptchaVerify"></div> -->
            <div id="recaptcha" ref="recaptcha"></div>
            <!-- <div class="text-center"><a href="#" class="send-btn" @click="submitForm()">Enviar</a></div> -->
            <div class="text-center"><button type="submit" class="send-btn" @click="submitForm()">Send Message</button></div>

            <!-- <button @click="submitForm" class="btn btn-primary btn-block">Registrarme</button> -->
            <!-- </form> -->

          </div>

        </div>

      </div>
    </section><!-- End Contact Section -->

  </main><!-- End #main -->

  <FooterWeb />
</template>

<script>
import HeaderWeb from '../components/HeaderWeb.vue'
import FooterWeb from '../components/FooterWeb.vue'

export default {
  name: "admin-users",
  data() {
    return {
      roomieRentalOffers: [],
      ownerRentalOffers: [],
      name: '',
      email: '',
      message: '',
      textAlert: '',
      showAlertDanger: false,
      showAlertSuccess: false
    }
  },
  components: {
    HeaderWeb,
    FooterWeb
  },
  mounted() {
    this.loadRoomieRentalOffers();
    this.loadOwnerRentalOffers();
    grecaptcha.render(this.$refs.recaptcha, {
      sitekey: '6Lcc8dkmAAAAAIxmc9HMdQhUcwQRbE_RXw1corZQ',
      callback: this.onCaptchaVerify,
    });
  },
  methods: {
    async loadRoomieRentalOffers() {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
      };

      let request = fetch(this.url_back + "/api/getRoomieRentalOffersForHomeWeb", requestOptions);
      let response = await request;
      let data = await response.json();

      if (response.ok && response.status == 201) {
        this.roomieRentalOffers = data.rentalOffers;
      } else {
        console.log('error al cargar los avisos de roomies');
      }
    },
    async loadOwnerRentalOffers() {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        redirect: 'follow'
      };

      let request = fetch(this.url_back + "/api/getOwnerRentalOffersForHomeWeb", requestOptions);
      let response = await request;
      let data = await response.json();

      if (response.ok && response.status == 201) {
        this.ownerRentalOffers = data.rentalOffers;
      } else {
        console.log('error al cargar los avisos de propietarios');
      }
    },
    validate() {
      this.textAlert = '';
      this.textAlert += this.name == '' ? '*El Nombre es obligatorio ' : '';
      this.textAlert += this.email == '' ? '*El e-mail es obligatorio ' : '';
      this.textAlert += this.message == '' ? '*El Mensaje es obligatorio ' : '';

      return this.textAlert == '' ? true : false;
    },
    async sendMessage() {
      const myHeaders = new Headers();
      myHeaders.append("Accept", "application/json");
      myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

      const urlencoded = new URLSearchParams();
      urlencoded.append("name", this.name);
      urlencoded.append("email", this.email);
      urlencoded.append("message", this.message);

      const requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: urlencoded,
        redirect: 'follow'
      };

      let request = fetch(this.url_back + "/api/sendContactFormMail", requestOptions);
      let response = await request;
      let data = await response.json();

      if (response.ok && response.status == 201) {
        // muestro envio correcto
        console.log('mensaje enviado correctamente');
        this.showMsgAlertSuccess();
      } else {
        // muestro error al enviar
        console.log('error al envier mensaje');
        this.textAlert = 'No se pudo enviar el mensaje, inténtalo más tarde';
        this.showMsgAlertDanger();        
      }
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
          this.sendMessage();
        } else {
          // El reCAPTCHA no ha sido verificado
          console.error('Por favor, verifica el reCAPTCHA.');
          this.textAlert = 'Por favor, verifica el reCAPTCHA.';
          this.showMsgAlertDanger();
        }
      } else {
        this.showMsgAlertDanger();
      }
    },
    showMsgAlertDanger() {
      this.showAlertDanger = true;
      setTimeout(() => this.hideMsgAlertDanger(), 3000);
    },
    hideMsgAlertDanger() {
      this.showAlertDanger = false;
    },
    showMsgAlertSuccess() {
      this.showAlertSuccess = true;
      setTimeout(() => this.hideMsgAlertSuccess(), 3000);
    },
    hideMsgAlertSuccess() {
      this.showAlertSuccess = false;
    },
    // submitForm() {
    //   const recaptchaResponse = grecaptcha.getResponse();

    //   if (recaptchaResponse) {
    //     // El reCAPTCHA ha sido verificado correctamente
    //     console.log('reCAPTCHA verificado', recaptchaResponse);
    //   } else {
    //     // El reCAPTCHA no ha sido verificado
    //     console.error('Por favor, verifica el reCAPTCHA.');
    //   }
    // },
  }
}
</script>

<style>
#hero {
  width: 100% !important;
  height: 100vh !important;
  background: url(/banner.png) top center !important;
  background-size: cover !important;
  position: relative !important;
}

.counts .icon-box {
  padding: 50px !important;
  transition: all ease-in-out 0.3s !important;
  background: #fefefe !important;
  box-shadow: 0px 5px 10px 0px rgba(110, 123, 131, 0.1) !important;
  border-radius: 18px !important;
  border-bottom: 5px solid #fff !important;
}

.counts .icon-box:hover {
  transform: translateY(-10px) !important;
  border-color: #009961 !important;
}

.send-btn {
  background: #009961;
    border: 0;
    padding: 10px 30px;
    color: #fff;
    transition: 0.4s;
    border-radius: 50px;
}

.send-btn:hover {
  background: #00b371;
  color: #fff;
}
</style>
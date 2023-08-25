<template>
    <footer id="footer">
        <div class="container">
            <div class="row">
                <div class="col-3">
                    <h5>Ayuda</h5>
                    <p class="parrafofooter">
                        <a :href="this.url_front+ 'footer-frequent-questions'" class="enlacefooter">Preguntas Frecuentes</a>
                    </p>
                    <p class="parrafofooter">
                        <a :href="this.url_front+ 'footer-compromise'" class="enlacefooter">Compromiso</a>
                    </p>
                    <p class="parrafofooter">
                        <a :href="this.url_front+ 'footer-the-best-option'" class="enlacefooter">La mejor Opci&oacute;n</a>
                    </p>
                </div>
                <div class="col-3">
                    <h5>Legales</h5>
                    <p class="parrafofooter">
                        <a :href="this.url_front+ 'footer-legal-information'" class="enlacefooter">Informaci&oacute;n Legal</a>
                    </p>
                    <p class="parrafofooter">
                        <a :href="this.url_front+ 'footer-privacy-policy'" class="enlacefooter">Pol&iacute;tica de Privacidad</a>
                    </p>
                    <p class="parrafofooter">
                        <a :href="this.url_front+ 'footer-avoid-scams'" class="enlacefooter">Evite Estafas</a>
                    </p>
                </div>
                <div class="col-6">
                    <h5>¿Por qu&eacute; elegirnos?</h5>
                    <p class="parrafofooter">Si estás buscando un departamento compartido o una habitación en alquiler, YoDeptO es el mejor lugar
                        para comenzar! Nuestros avisos son moderados manualmente y actualizados a diario para que encuentres
                        los mejores avisos. Nuestro sitio dispone de filtros de búsqueda por ciudad, por tipo de propiedad y
                        otros criterios que te harán más fácil tu búsqueda. Publica tu aviso ahora gratis.</p>
                </div>
            </div>
            <br><br>
            <div class="row">
                <div class="col-3">

                </div>
                <div class="col-6">
                    <center>
                        <p class="parrafofooter">Copyright © 2023 YoDeptO. Sitio web creado por <a
                                href="https://virtualremotepartner.com/" class="enlacefooter">Virtual Remote Partner</a></p>
                    </center>
                </div>
                <div class="col-3">

                </div>

            </div>

        </div>
</footer></template>

<script>

</script>

<style>
.parrafofooter {
    margin: 0 0 0 0 !important;
    font-style: normal !important;
}
.enlacefooter {
    color: white !important;
}
.enlacefooter:hover {
    color: #00cc81 !important;
}
</style>
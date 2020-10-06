new Vue({
    el: '#app',
    data: {
        saludJugador: 100,
        saludMonstruo: 100,
        hayUnaPartidaEnJuego: false,
        turnos: [], //es para registrar los eventos de la partida
        esJugador: false,
        rangoAtaque: [3, 10],
        rangoAtaqueEspecial: [10, 20],
        rangoAtaqueDelMonstruo: [5, 12],
    },

    methods: {
        getSalud(salud) {
            return `${salud}%`
        },
        empezarPartida: function () {
            
            this.hayUnaPartidaEnJuego = true;

        },
        atacar: function () {

            let daño = this.calcularHeridas(this.rangoAtaque);
            this.saludMonstruo -= daño;
            this.esJugador = true;
            this.registrarEvento('El Jugador hizo ' + daño + '% de daño al Monstruo');
            this.ataqueDelMonstruo();
            this.verificarGanador();


        },

        ataqueEspecial: function () {
            let daño = this.calcularHeridas(this.rangoAtaqueEspecial);
            this.saludMonstruo -= daño;
            this.esJugador = true;
            this.registrarEvento('El Jugador hizo ' + daño + '% de daño al Monstruo con un ataque especial');
            this.ataqueDelMonstruo();
            this.verificarGanador();
        },

        curar: function () {
            if (this.saludJugador <= 90) {
                this.saludJugador += 10;
            } else {
                this.saludJugador = 100;
            }
            this.registrarEvento('El Jugador se curó 10 de vida');
        },

        registrarEvento(evento) {
            let turno = {
                text: evento,
                esJugador: this.esJugador,
            }
            this.turnos.unshift(turno);

        },
        terminarPartida: function () {
            this.hayUnaPartidaEnJuego = false;
            this.saludJugador = 100;
            this.saludMonstruo = 100;
            this.turnos.splice(0);

        },

        ataqueDelMonstruo: function () {

            let daño = this.calcularHeridas(this.rangoAtaqueDelMonstruo);
            this.saludJugador -= daño;
            this.esJugador = false;
            this.registrarEvento('El monstruo hizo ' + daño + '% de daño al Jugador')
        },

        calcularHeridas: function (rango) {

            return Math.max(Math.floor(Math.random() * rango[1]) + 1, rango[0])
        },
        verificarGanador: function () {
            if (this.saludMonstruo <= 0) {
                this.terminarPartida();
                if (confirm('ganaste jugar de nuevo?')) {
                    this.empezarPartida();
                }
                
 
            } else if (this.saludJugador <= 0) {
                this.terminarPartida();
                if (confirm('perdiste! jugar de nuevo?')) {
                    this.empezarPartida();
                }
                

            }
        },
        cssEvento(turno) {
            //Este return de un objeto es prque vue asi lo requiere, pero ponerlo acá queda mucho mas entendible en el codigo HTML.
            return {
                'player-turno': turno.esJugador,
                'monster-turno': !turno.esJugador
            }
        }
    }
});
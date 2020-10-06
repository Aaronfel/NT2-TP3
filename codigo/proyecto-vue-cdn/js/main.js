Vue.component('contador', {
    data() {
        return {
            cont : Number(this.init) || 0
        }
    },
    props: ['init','color'],
    methods: {
        contar() {
            this.cont++
        },
        getClassColor() {
            return 'btn-'+this.color
        }
    },
    template: `
        <span>
            <button :class="['btn', getClassColor(),'btn-success','my-2','mr-2']" @click="contar()">Contar {{cont}}</button>
        </span>
    `
})


var app = new Vue({
    el: '#app',
    data: {
        mensaje: 'Soy un mensaje',
        mensajeHTML: '<i>Soy un mensaje</i>',
        valor: 123,
        valor2: 456,
        valor3: 789,
        contador: 123,
        contador2: 456,
        contador3: 789,
        mostrar: true,
        mostrar2: true,
        usuarios: [
            'Pedro',
            'Juan',
            'Ana',
            'Laura'
        ],
        alumnos: [
            {nombre: 'Juan',    apellido: 'Mei',    edad: 32,   curso: true,    foto: 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/7_avatar-256.png'},
            {nombre: 'Pedro',   apellido: 'Picos',  edad: 24,   curso: false,   foto: 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/12_avatar-256.png'},
            {nombre: 'Lucia',   apellido: 'Gomez',  edad: 31,   curso: true,    foto: 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/9_avatar-256.png'},
            {nombre: 'Ana',     apellido: 'Lopez',  edad: 27,   curso: false,   foto: 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/4_avatar-256.png'}
        ],
        nombre : '',
        estado1: true,
        estado2: true
    },
    methods: {
        incrementar() {
            this.contador3++
        },
        getContador() {
            return this.contador3
        },
        actualizar(e) {
            //console.log('actualizar',e)
            let dato = e.target.value
            console.log(dato)
            this.valor2 = dato
        },
        borrar(index) {
            this.alumnos.splice(index,1)
        },
        agregarAlumno() {
            let alumno = {nombre: 'Cecilia',     apellido: 'Perez',  edad: 29,   curso: false,   foto: 'https://cdn3.iconfinder.com/data/icons/business-avatar-1/512/11_avatar-256.png'}

            this.alumnos.push(alumno)
        }
    },
    computed: {
        calcularAlumnosCurso() {
            let cant = this.alumnos.filter(alumno => alumno.curso).length
            let total = this.alumnos.length
            return {
                cantidad : cant,
                total : total,
                ninguno: cant == 0,
                todos: cant == total,
                uno: cant == 1
            }
        }
    }
})
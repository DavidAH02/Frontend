import { Injectable } from '@angular/core';
import { Persona } from './persona.model';
import { DataService } from './data-service';


@Injectable()
export class PersonaService {
  [x: string]: any;

  personas: Persona[] = [];

  constructor( private datService: DataService) {}

// Se usa para modificar el valor del arreglo debido a la llamada asincrona
  setPersonas(personas: Persona[]) {
    this.personas = personas;
  }

  agregarPersona(persona: Persona) {
console.log('Persona a agregar: ' + persona.nombre);
this.datService.agregarPersona(persona)
.subscribe(
  // tslint:disable-next-line: no-shadowed-variable
  (persona: Persona) => {
    // Recuperamos objeto Persona con el idPersona recien agregado
    console.log('se agrega al arreglo la persona recien insertada por suscriber: ' + persona.idPersona);
    this.personas.push(persona);
  }
);
  }
  encontrarPersona(id: number) {
    const persona: Persona = this.personas.find( persona => persona.idPersona == id);
    console.log('persona encontrada:  ' + persona.idPersona + ' ' + persona.nombre);
    return persona;
  }

obtenerPersona() {
  return this.datService.cargarPersonas();
}


  modificarPersona(id: number, persona: Persona) {
    console.log('Persona a modificar: ' + persona.idPersona);
    // actualizar objecto persona de arreglo
    const personaModificadaLocal = this.personas.find(persona => persona.idPersona == id);
    personaModificadaLocal.idPersona = persona.idPersona;
    personaModificadaLocal.nombre = persona.nombre;
    // guardar la persona en la base de datos
    this.datService.modificarPersona(id, persona);
  }
  eliminarPersona(id: number) {
    console.log('eliminar persona con id: ' + id);
    const index = this.personas.findIndex(persona => persona.idPersona === id); // encontramos el indice del arreglo
    this.personas.splice(index, 1);
    this.datService.eliminarPersona(id);
  }
}

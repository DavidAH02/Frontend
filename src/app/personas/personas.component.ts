import { Component, OnInit } from '@angular/core';
import { PersonaService } from '../persona-service';
import { Router, ActivatedRoute } from '@angular/router';
import { Persona } from '../persona.model';

@Component({
  selector: 'app-personas',
  templateUrl: './personas.component.html',
  styles: []
})
export class PersonasComponent implements OnInit {

  personas: Persona[] = [];
  constructor(private personaService: PersonaService,
              private router: Router,
              private route: ActivatedRoute
    ) { }

ngOnInit(): void {
  this.personaService.obtenerPersona().subscribe(
    (personasObtenidas: Persona[]) => {
      // cargamos los datos de persona obetnidos en el arreglo local
    this.personas = personasObtenidas;
    this.personaService.setPersonas(this.personas);
    console.log('personas obtenidas de subscriber ' + this.personas);
    }
  );
}
irAgregar() {
  console.log('Agregar');
  this.router.navigate(['./personas/agregar']);
}
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Database, object, ref } from '@angular/fire/database';


@Component({
  selector: 'app-ldr',
  templateUrl: './ldr.component.html',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./ldr.component.scss'],
})
export class LdrComponent  implements OnInit {
  ldrValue: number = 0;
  constructor(private database:Database) {
  }

  ngOnInit() {
    const route = ref(this.database, 'ldrValue'); // Ruta en la base de datos donde se almacena el valor del sensor LDR
    object(route).subscribe(attributes => {
      this.ldrValue = attributes.snapshot.val(); // Asigna el valor obtenido del sensor LDR a la variable ldrValue
      console.log(this.ldrValue);
    });
  }
}

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Database, object, ref } from '@angular/fire/database';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

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
/*import { Component } from '@angular/core';
import { Database, object,} from '@angular/fire/database';
import { query, ref, get, orderByKey, limitToLast } from 'firebase/database';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  ldrValue: number = 0;
  constructor(private database:Database) {}
  ngOnInit() {
    const route = ref(this.database, 'ldrValue'); // Ruta en la base de datos donde se almacena el valor del sensor LDR
    get(query(route, orderByKey(), limitToLast(1))).then(snapshot => {
      snapshot.forEach(childSnapshot => {
        this.ldrValue = childSnapshot.val(); // Asigna el valor obtenido del sensor LDR a la variable ldrValue
      });
    });
  }
}
*/
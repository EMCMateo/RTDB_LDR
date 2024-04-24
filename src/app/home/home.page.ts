import { Component, OnInit } from '@angular/core';
import { Database, object, ref } from '@angular/fire/database';
import { LocalNotifications } from '@capacitor/local-notifications';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  ldrValue: number = 0;
  luz: number = 0;

  constructor(private database: Database) {}

  async ngOnInit() {
    await LocalNotifications.requestPermissions();//solicitar permisos de la app
    
    const route = ref(this.database, 'ldrValue');
    object(route).subscribe(attributes => {
      this.ldrValue = attributes.snapshot.val(); 
      console.log(this.ldrValue);      
      this.luz = this.ldrValue;

      if (this.luz > 890) {
        this.scheduleNotification("Dia", "El valor del sensor LDR es mayor a 890.");
      } else {
        this.scheduleNotification("Noche", "El valor del sensor LDR es menor a 890.");
      }
    });
  }

  async scheduleNotification(title: string, body: string) {
    
    const notification = {
      title: title,
      body: body,
      id: 1 
    };
    await LocalNotifications.schedule({
      notifications: [notification]
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
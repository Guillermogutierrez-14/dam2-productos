import { Component, inject } from '@angular/core';
import { IonApp, IonRouterOutlet, IonButton } from '@ionic/angular';

import { ThemeService } from './services/theme.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  imports: [IonApp, IonRouterOutlet, IonButton],
})
export class AppComponent {
  theme = inject(ThemeService);
}
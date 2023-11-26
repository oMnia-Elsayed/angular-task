import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  standalone: true,
  imports: [TranslateModule]
})
export class InfoComponent {}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProtectedRoutingModule } from './protected-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FontawesomeModule } from '../fontawesome/fontawesome.module';

@NgModule({
  declarations: [DashboardComponent],
  imports: [CommonModule, ProtectedRoutingModule, FontawesomeModule],
})
export class ProtectedModule {}

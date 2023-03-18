import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './page/home.component';
import { RouterModule } from '@angular/router';
import { HomeGuard } from '@guards/home.guard';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [HomeGuard]
})

export class HomeModule { }

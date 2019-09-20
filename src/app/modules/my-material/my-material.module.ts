import { NgModule } from '@angular/core';
import {MatButtonModule,MatRadioModule, MatCheckboxModule, MatInputModule, MatFormFieldModule, MatSelectModule, MatTableModule} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule, 
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatRadioModule
  ],
  exports: [
    MatButtonModule, 
    MatCheckboxModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatRadioModule
  ],
  declarations: []
})
export class MyMaterialModule { }

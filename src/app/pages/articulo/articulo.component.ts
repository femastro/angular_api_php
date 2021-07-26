import { Component, OnInit } from '@angular/core';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Articulo, Formulario } from '@app/interface/articulo.interface';
import { ProductosService } from '@app/service/productos.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.scss']
})
export class ArticuloComponent implements OnInit {

  articulos$: Observable<Articulo[]> = this.prodcSrv.getNeumaticos();
  marcas$: Observable<any> = this.prodcSrv.getMarcas();

  modelos: Formulario[];
  medidas: Formulario[];

  formulario = new FormGroup({
    marca: new FormControl('0', Validators.required),
    modelo: new FormControl('0', Validators.required),
    medida: new FormControl('0', Validators.required),
    cod_Proveedor: new FormControl(''),
    cantidad: new FormControl('0', Validators.min(0))
  });

  constructor(
    private prodcSrv: ProductosService,
    private route: Router
  ) { }

  ngOnInit(): void {
    //this.modelos.pipe(res => console.log(res));
  }

  seleccionaMarca() {
    const data = this.formulario.value;
    this.prodcSrv.getModelos(data).subscribe(res => this.modelos = res);
  }

  seleccionaModelo() {
    const data = this.formulario.value;
    this.prodcSrv.getMedidas(data).subscribe(res => this.medidas = res);
  }

  onSave() {
    const data = this.formulario.value;
    this.prodcSrv.save(data).subscribe((res) => {
      alert(res);
      this.route.navigate(['/productos']);
    });
  }

}

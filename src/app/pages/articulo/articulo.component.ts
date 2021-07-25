import { Component, OnInit } from '@angular/core';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Articulo } from '@app/interface/articulo.interface';
import { ProductosService } from '@app/service/productos.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.scss']
})
export class ArticuloComponent implements OnInit {

  articulos$: Observable<Articulo[]> = this.prodcSrv.getNeumaticos();

  marcas$: Observable<any> = this.prodcSrv.getMarcas();
  modelos$: Observable<any> = this.prodcSrv.getModelos();
  medidas$: Observable<any> = this.prodcSrv.getMedidas();

  formulario = new FormGroup({
    marca: new FormControl('0'),
    modelo: new FormControl('0'),
    medida: new FormControl('0'),
    cod_Proveedor: new FormControl(''),
    cantidad: new FormControl('')
  });

  constructor(
    private prodcSrv: ProductosService,
    private route: Router
  ) { }

  ngOnInit(): void {
    this.medidas$.subscribe(res => console.log(res));
  }

  onSave() {
    const data = this.formulario.value;
    this.prodcSrv.save(data).subscribe((res) => {
      alert(res);
    });
    this.route.navigate(['/productos']);
  }

}

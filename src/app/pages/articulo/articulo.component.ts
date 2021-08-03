import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Articulo, Formulario } from '@app/interface/articulo.interface';
import { ProductosService } from '@app/service/productos.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-articulo',
  templateUrl: './articulo.component.html',
  styleUrls: ['./articulo.component.scss']
})
export class ArticuloComponent implements OnInit {

  marcas$: Observable<any> = this.prodcSrv.getMarcas();
  modelos: Formulario[];
  medidas: Formulario[];

  files: File[] = [];
  urlImage: string;

  formulario = new FormGroup({
    marca: new FormControl('0', Validators.required),
    modelo: new FormControl('0', Validators.required),
    medida: new FormControl('0', Validators.required),
    cod_Proveedor: new FormControl(''),
    cantidad: new FormControl('0', Validators.min(0)),
    image: new FormControl('')
  });

  constructor(
    private prodcSrv: ProductosService,
    private route: Router
  ) { }

  ngOnInit(): void { }

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

    const image_data = new FormData();
    const file_data = this.files[0];

    if (!this.files[0]) {
      console.log("... Error no hay imagen");
      return;
    }

    image_data.append('file', file_data);
    image_data.append('upload_preset', 'gestion');
    image_data.append('cloud_name', 'femastro');

    this.prodcSrv.saveImage(image_data)
      .pipe(map(res => {

        const newData = (
          {
            marca: data.marca,
            modelo: data.modelo,
            medida: data.medida,
            cod_Proveedor: data.cod_Proveedor,
            cantidad: data.cantidad,
            image: res.secure_url
          }
        );

        this.prodcSrv.save(newData)
          .subscribe((res) => {
            alert(res);
            this.route.navigate(['/productos']);
          }, (error) => console.log(error));
      }))

  }

  /// Ngx Dropzone
  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }


}

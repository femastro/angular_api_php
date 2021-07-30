import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Articulo } from '@app/interface/articulo.interface';
import { ProductosService } from '@app/service/productos.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { tap } from "rxjs/operators";




@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  @ViewChild("myModalInfo", { static: false }) myModalInfo: TemplateRef<any>;

  articulo: Articulo;
  files: File[] = [];

  /// esto lo creo Ruslan.
  articulos$: Observable<Articulo[]> = this.prodcSrv.getAll();

  constructor(
    private prodcSrv: ProductosService,
    private route: Router,
    private modalService: NgbModal,
  ) { }

  formulario = new FormGroup({
    id: new FormControl('', Validators.required),
    cod_Articulo: new FormControl('', Validators.required),
    marca: new FormControl('', Validators.required),
    modelo: new FormControl('', Validators.required),
    medida: new FormControl('', Validators.required),
    cod_Proveedor: new FormControl('', Validators.required),
    cantidad: new FormControl('', Validators.required),
    image: new FormControl('')
  });

  ngOnInit(): void { }

  /// con esto solucione el problema de que no mostraba en el Modal con los datos 
  onEditArticulo(data: Articulo) {
    this.modalService.open(this.myModalInfo);
    const { id } = data;
    this.prodcSrv.getById(id)
      .pipe(
        tap(resp => {
          this.formulario.setValue(resp);
          this.articulo = resp;
        })
      )
      .subscribe();
  };

  // Inicia el Update , primero guarda la Imagen Nueva , si no hay continua al update de Datos.
  onUpdate() {
    const data = this.formulario.value;
    const image_data = new FormData();
    const file_data = this.files[0];

    if (!this.files[0]) {
      this.updateData(data);
    } else {
      image_data.append('file', file_data);
      image_data.append('upload_preset', 'gestion');
      image_data.append('cloud_name', 'femastro');

      this.prodcSrv.saveImage(image_data)
        .pipe(
          tap(res => {
            const newData = (
              {
                id: data.id,
                cod_Articulo: data.cod_Articulo,
                marca: data.marca,
                modelo: data.modelo,
                medida: data.medida,
                cod_Proveedor: data.cod_Proveedor,
                cantidad: data.cantidad,
                image: res.secure_url
              }
            );
            this.updateData(newData)
          })).subscribe();
    }
  }

  /// Actualiza los Datos del Articulo
  updateData(data: Articulo) {

    console.log("Data Send -> ", data);

    this.prodcSrv.update(data)
      .pipe(
        tap(res => {
          alert(`Respuesta -> ${res}`);
          ///this.refresh();
        })).subscribe()
  }

  // llama al Formmulario de nuevo articulo
  onNew(): void {
    this.route.navigate(['/articulo']);
  }

  onDeleteArticulo(data: Articulo): void {
    const { id } = data;
    let mensaje = "Esta seguro ?";

    if (confirm(mensaje)) {
      this.prodcSrv.delete(id).subscribe(articuloEliminado => {

        if (articuloEliminado.status == 200) {
          alert(`Respuesta : => ${articuloEliminado.message}`);
        } else {
          alert(`Respuesta : => ${articuloEliminado.message}`);
        }
        this.refresh();
      });
    }
  }

  refresh() {
    location.reload();
  }

  // Captura la imagen 
  get urlImage() {
    const { cod_Articulo, image } = this.formulario.value;
    if (cod_Articulo) {
      return image;
    }
  }

  /// Si la imagen no existe , muestra Sin Foto
  onImageError(event: any) {
    event.target.src = './assets/images/sin-foto.jpg';
  }

  /// Ngx Dropzone script del Drop para la carga del un imagen.
  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

}



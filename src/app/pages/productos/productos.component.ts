import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
  imagen = "";

  articulos$: Observable<Articulo[]> = this.prodcSrv.getAll();


  constructor(
    private prodcSrv: ProductosService,
    private route: Router,
    private modalService: NgbModal,
  ) { }

  formulario = new FormGroup({
    modelo: new FormControl(''),
    medida: new FormControl(''),
    cantidad: new FormControl('')
  });

  ngOnInit(): void {
    // this.list();
    // console.log("this.articulos : ", this.articulos)
  }

  // list() {
  //   this.prodcSrv.getAll()
  //     .pipe(tap(articulos => this.articulos = articulos), tap(articulos => console.log('respuesta Serv. ', articulos)))
  //     .subscribe();
  // }

  onEditArticulo(data: Articulo) {
    this.modalService.open(this.myModalInfo);
    const { idneumaticos } = data;
    this.prodcSrv.getById(idneumaticos)
      .pipe(tap(articulo => this.articulo = articulo)).subscribe();

  }

  onSave() {
    const datos = this.formulario.value;
    console.log('Desde modelo', this.articulo);
    console.log('Desde formulario', datos);

    if (this.formulario.valid) {
      // Hacer un mapping de los cambios. (LEER SOBRE "AUTOMAPPERS")
      const nuevosDatos = { ...this.articulo, ...datos }

      console.log('Estos es el nuevo objeto', nuevosDatos);
    }

  }

  onNew(): void {
    this.route.navigate(['/articulo']);
  }

  onDeleteArticulo(data: Articulo): void {
    const { idneumaticos } = data;
    let mensaje = "Esta seguro ?";

    if (confirm(mensaje)) {
      this.prodcSrv.delete(idneumaticos).subscribe(articuloEliminado => {

        if (articuloEliminado.status == 200) {
          alert(`Respuesta : => ${articuloEliminado.message}`);
        } else {
          alert(`Respuesta : => ${articuloEliminado.message}`);
        }

        // this.list(); // FIXME: retrieve products when something changed
      }
      );
    }
  }

  get urlImage() {
    if (this.articulo) {
      //return `${environment.apiUrl}/${this.articulo.cod_Articulo}.jpg`;
      return `/assets/images/${this.articulo.cod_Articulo}.jpg`;
    }
  }

  onImageError(event: any) {
    event.target.src = '/assets/images/sin-foto.jpg';
  }

}

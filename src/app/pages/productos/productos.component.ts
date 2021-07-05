import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { productosService } from '@app/service/service.service';
import { Articulo } from '@app/interface/articulo.interface';
import { Router } from '@angular/router';
import { tap } from "rxjs/operators";
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  @ViewChild("myModalInfo", { static: false }) myModalInfo: TemplateRef<any>;

  articulos: Articulo[];
  articulo: Articulo;

  data: any = {};

  constructor(
    private prodcSrv: productosService,
    private route: Router,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.listar();
  }

  listar(): void {
    this.prodcSrv.getAll()
      .pipe(
        tap(articulos => this.articulos = articulos)
      )
      .subscribe();
  }

  onEditArticulo(data: Articulo): void {
    this.modalService.open(this.myModalInfo);
    const { id } = data;
    this.prodcSrv.getById(id)
      .pipe(
        tap(articulos => this.articulo = articulos)
      ).subscribe();
  }

  onNew(): void {
    alert("Nuevo Articulo !")
  }

  onDeleteArticulo(data: Articulo): void {
    const { id } = data;
    let mensaje = "Esta seguro ?";

    if (confirm(mensaje)) {
      this.prodcSrv.delete(id).subscribe(res => {
        this.data = res;

        if (this.data.status == 200) {
          alert(`Respuesta : => ${this.data.message}`);
        } else {
          alert(`Respuesta : => ${this.data.message}`);
        }

        this.prodcSrv.getAll().subscribe(res =>
          this.articulos = res
        );
      }
      );
    }
  }


}

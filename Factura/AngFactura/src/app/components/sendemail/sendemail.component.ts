import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FacturaService } from 'src/app/services/FacturaService';

@Component({
  selector: 'app-sendemail',
  templateUrl: './sendemail.component.html',
  styleUrls: ['./sendemail.component.css']
})
export class SendemailComponent {
  getId: any;
  updateForm: FormGroup;
  datosFactura: any;


  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private facturaService: FacturaService
  ) {

    this.getId = this.activatedRoute.snapshot.paramMap.get('codigoFactura');

    this.facturaService.GetFactura(this.getId).subscribe((res) => {
      this.datosFactura = res
      this.updateForm.setValue({
        cliente: res['cliente'],
        estado: res['estado']
      });
    });

    this.updateForm = this.formBuilder.group({
      cliente: [''],
      estado: ['']
    });
  }

  ngOnInit() { }


  onUpdate(): any {
    if (this.datosFactura.estado === "primerrecordatorio") {
      this.datosFactura.estado = "segundorecordatorio"
    } else if (this.datosFactura.estado === "segundorecordatorio") {
      this.datosFactura.estado = "desactivado"
    }

    this.facturaService.updateFactura(this.getId, this.datosFactura).subscribe(
      () => {
        alert("Se envio el correo electronico al cliente y se actualizo el estado")
        this.ngZone.run(() => this.router.navigateByUrl('/Factura'));
      },
      (err) => {
        console.log(err);
      }
    );
  }

}

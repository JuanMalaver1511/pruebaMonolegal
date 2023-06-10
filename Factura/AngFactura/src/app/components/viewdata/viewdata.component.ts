import { Component, OnInit } from '@angular/core';
import { FacturaService } from 'src/app/services/FacturaService';

@Component({
  selector: 'app-viewdata',
  templateUrl: './viewdata.component.html',
  styleUrls: ['./viewdata.component.css']
})
export class ViewdataComponent implements OnInit {
  Facturas: any = [];

  constructor(private crudService: FacturaService) {}

  ngOnInit(): void {
    this.crudService.GetFacturas().subscribe((res) => {
      console.log(res);
      this.Facturas = res;
    });
  }
}

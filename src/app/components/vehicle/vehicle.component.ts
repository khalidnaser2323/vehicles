import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Vehicle } from 'src/app/interfaces/vehicle.model';
import { CoreService } from 'src/app/services/core.service';

function getData() {
  const ELEMENT_DATA: Vehicle[] = [
    { vehicleId: 1, customer: 'Hydrogen', regNum: 1.0079, isConnected: true },
    { vehicleId: 2, customer: 'Helium', regNum: 4.0026, isConnected: true },
    { vehicleId: 3, customer: 'Lithium', regNum: 6.941, isConnected: true },
    { vehicleId: 4, customer: 'Beryllium', regNum: 9.0122, isConnected: true },
    { vehicleId: 5, customer: 'Boron', regNum: 10.811, isConnected: true },
    { vehicleId: 6, customer: 'Carbon', regNum: 12.0107, isConnected: true },
    { vehicleId: 7, customer: 'Nitrogen', regNum: 14.0067, isConnected: true },
    { vehicleId: 8, customer: 'Oxygen', regNum: 15.9994, isConnected: true },
    { vehicleId: 9, customer: 'Fluorine', regNum: 18.9984, isConnected: true },
    { vehicleId: 10, customer: 'Neon', regNum: 20.1797, isConnected: true },
  ];
  return ELEMENT_DATA;
}
@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.css']
})
export class VehicleComponent implements OnInit {
  displayedColumns: string[] = ['VehicleId', 'customer', 'regNum', 'isConnected'];
  public vehicles: Vehicle[];
  dataSource = new MatTableDataSource(getData());

  constructor(private service: CoreService) { }

  ngOnInit() {
    this.getAllVehicles();
  }
  public getAllVehicles() {
    this.service.getVehicles()
      .subscribe((res: any) => {
        console.log('##### After Get  The init')
        console.log(res);
        this.vehicles = res.data.articles.map(item => {
          let vehicleItem: Vehicle = {
            vehicleId: item.id,
            customer: item.name,
            regNum: item.publishDate,
            isConnected: item.isShowen
          };
          return vehicleItem;
        }); // this line to make any kind of deserialziation you need from API;
        this.dataSource = new MatTableDataSource(this.vehicles);
        console.log(this.vehicles);
      }, (error) => {
        console.log(error);
        alert(error);
      });
  }


  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase(); // filter is working find on all columns
  }



}

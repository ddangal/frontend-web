import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
})
export class LocationComponent implements OnInit {
  lat = 27.702;
  lng = 85.321;
  showMarker: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  onChoseLocation(event) {
    this.lat = event.coords.lat;
    this.lng = event.coords.lng;
    this.showMarker = true;
  }
}

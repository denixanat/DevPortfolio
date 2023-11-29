// explorar.component.ts

import { Component, OnInit } from '@angular/core';
import { PerfilinfoService } from 'src/app/perfilinfo.service';
import { Perfil } from 'src/app/interfaces/perfiles.interfaces';

@Component({
  selector: 'app-explorar',
  templateUrl: './explorar.component.html',
  styleUrls: ['./explorar.component.css'],
})
export class ExplorarComponent implements OnInit {
  perfiles: Perfil[] = [];

  constructor(private perfilInfoService: PerfilinfoService) {}

  ngOnInit(): void {
    this.perfilInfoService.getPerfilData().subscribe((perfiles) => {
      this.perfiles = perfiles;
      // Do something with the updated perfiles data
    });
  }
}

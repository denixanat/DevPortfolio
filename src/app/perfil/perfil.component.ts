import { Component, Input } from '@angular/core';
import { Perfil } from '../interfaces/perfiles.interfaces';
import { PerfilinfoService } from '../perfilinfo.service';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})

export class PerfilComponent {
@Input()
public Perfil: Perfil ={
  userid: 0,
  name: "",
  image: "",
  shortdesc: "",
  longdesc: "",
  links: {},
  proyectos: [],
};

constructor(private perfilInfoService: PerfilinfoService) {
}

ngOnInit() {
  this.perfilInfoService.getPerfilData().subscribe((data: Perfil[]) => {
    // Assuming you only have one profile in the array, you can take the first one
    this.Perfil = data[0];
  });
}

}

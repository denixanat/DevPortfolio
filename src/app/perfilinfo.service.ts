import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Perfil } from 'src/app/interfaces/perfiles.interfaces';
@Injectable({
  providedIn: 'root'
})
export class PerfilinfoService{

  public perfiles: Perfil[] = [{
    "userid": 1,
    "name": "Andrés Horwitz",
    "image": "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-1.webp",
    "shortdesc": "Web Developer",
    "longdesc": "Web Developer\nLives in New York\nPhotographer",
    links: {
      linkedin: 'https://www.linkedin.com/',
      github: 'https://github.com/',
      twitter: 'https://twitter.com/'
    },
    "proyectos": [
      {
        projectid:1,
        image: './assets/1.jpg',
        name: 'Dashboard',
        filter: 'irrigation'
      },
      {
        projectid:2,
        image: './assets/2.png',
        name: 'App Design',
        filter: 'irrigation'
      },
      {
        projectid: 3,
        image: './assets/11.jpg',
        name: 'UX Design',
        filter: 'irrigation'
      },
      {
        projectid:4,
        image: './assets/8.png',
        name: 'Database',
        filter: 'sprinkle'
      },
    ]
  },
  {
    "userid": 2,
    "name": "Sara García",
    "image": "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-profiles/avatar-2.webp",
    "shortdesc": "IA Developver",
    "longdesc": "Computer Science Student\nLoves Cats",
    links: {
      linkedin: 'https://www.linkedin.com/',
      github: 'https://github.com/',
      twitter: 'https://twitter.com/'
    },
    "proyectos": [
      {
        projectid:1,
        image: './assets/3.png',
        name: 'Linear Regression',
        filter: 'hdpe'
      },
      {
        projectid:2,
        image: './assets/4.png',
        name: 'matminer',
        filter: 'hdpe'
      },
      {
        projectid: 3,
        image: './assets/7.png',
        name: 'made in python',
        filter: 'hdpe'
      }
    ]
  },
  {
    "userid": 3,
    "name": "Daniela Pérez",
    "image": "https://img.freepik.com/free-photo/friendly-professional-businesswoman_23-2147702121.jpg?w=740&t=st=1701231005~exp=1701231605~hmac=dd42ef36e23b8916971c17bcee867eeeddd0c23c9b758fc7c3fa2406d1cd6f93",
    "shortdesc": "Business owner & Developver",
    "longdesc": "Monterrey, México\nProyectos que hice para mis negocios",
    links: {
      linkedin: 'https://www.linkedin.com/',
      github: 'https://github.com/',
      twitter: 'https://twitter.com/'
    },
    "proyectos": [
      {
        projectid:1,
        image: './assets/6.png',
        name: 'Finance manager',
        filter: 'spray'
      },
      {
        projectid:2,
        image: './assets/10.jpg',
        name: 'Food Delivery',
        filter: 'irrigation'
      },
      {
        projectid: 3,
        image: './assets/13.png',
        name: 'backend',
        filter: 'spray'
      }
    ]
  },
  {
    "userid": 4,
    "name": "carlos Ghersi",
    "image": "https://img.freepik.com/free-photo/side-view-smiley-man-looking-tablet_23-2148230738.jpg?w=740&t=st=1701231586~exp=1701232186~hmac=e50b5d4f648dc08622e39030383758a33eb39325451295f7049c19d887267c35",
    "shortdesc": "Backend / Databases / Project Management",
    "longdesc": "I work at a tech company, i like to eat pancakes",
    links: {
      linkedin: 'https://www.linkedin.com/',
      github: 'https://github.com/',
      twitter: 'https://twitter.com/'
    },
    "proyectos": [
      {
        projectid:1,
        image: './assets/12.png',
        name: 'Backend',
        filter: 'spray'
      },
      {
        projectid:2,
        image: './assets/5.png',
        name: 'Data',
        filter: 'sprinkle'
      }
    ]
  }];

  getPerfilData(): Observable<Perfil[]> {
    return of(this.perfiles);
  }
}

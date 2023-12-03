import { Component, AfterViewInit } from '@angular/core';
import { PerfilinfoService } from '../perfilinfo.service';
import * as $ from 'jquery'; // Import jQuery
import 'bootstrap'; // Ensure Bootstrap is imported
import { Usuario } from '../interfaces/usuario.interfaces';


@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements AfterViewInit {



  public datacredenciales: Usuario = {
    user: "",
    password: "",
    rol: "admin"  // Set the default role to 'admin'
  };
  
  constructor(private perfilInfoService: PerfilinfoService) {
  }
  
  public login(): void {
    this.perfilInfoService.login(this.datacredenciales).subscribe({
      next: (response: any) => {
        const token = response.token;
        this.perfilInfoService.setToken(token);
        console.log(token);
        // Set the success message
        this.perfilInfoService.setMessage('Login successful!');
        this.ola();
        // Redirect or perform additional actions after successful login
        // For example, you can close the modal
        ($('#loginModal') as any).modal('hide');
      },
      error: (error: any) => {
        console.error('Login failed:', error);
        // Handle login error, e.g., display an error message in the HTML
      },
    });
  }
  


  ola(): void {
    // Subscribe to the message changes
    this.perfilInfoService.getMessage().subscribe((message) => {
      if (message) {
        // Display the message to the user (e.g., show an alert)
        alert(message);
      }
    });
  }

  ngAfterViewInit(): void {
    const carouselText = [
      { text: "visión", color: "white" },
      { text: "código", color: "white" },
      { text: "portafolio", color: "white" }
    ];

    carousel(carouselText, "#feature-text");

    async function typeSentence(sentence: string, eleRef: string, delay = 100) {
      const letters = sentence.split("");
      let i = 0;
      while (i < letters.length) {
        await waitForMs(delay);
        $(eleRef).append(letters[i]);
        i++;
      }
      return;
    }

    async function deleteSentence(eleRef: string) {
      const sentence = $(eleRef).html();
      const letters = sentence.split("");
      let i = 0;
      while (letters.length > 0) {
        await waitForMs(100);
        letters.pop();
        $(eleRef).html(letters.join(""));
      }
    }

    async function carousel(carouselList: { text: string; color: string }[], eleRef:string) {
      var i = 0;
      while (true) {
        updateFontColor(eleRef, carouselList[i].color);
        await typeSentence(carouselList[i].text, eleRef);
        await waitForMs(1500);
        await deleteSentence(eleRef);
        await waitForMs(500);
        i++;
        if (i >= carouselList.length) { i = 0; }
      }
    }

    function updateFontColor(eleRef:string, color:string) {
      $(eleRef).css('color', color);
    }

    function waitForMs(ms:number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Open login modal
    ($('#loginModal')as any).modal('show');
  }
}

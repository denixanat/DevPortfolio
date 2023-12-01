import { Component, AfterViewInit } from '@angular/core';
import * as $ from 'jquery'; // Import jQuery
@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements AfterViewInit {

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
  }
}

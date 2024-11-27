import { Component } from '@angular/core';
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {CommonModule} from "@angular/common";
import {MatDividerModule} from "@angular/material/divider";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
      MatCardModule,
      MatGridListModule,
      MatDividerModule,
      CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  articles = [
    {
      title: 'Organize dispositivos',
      description: 'Tenha controle total sobre os seus dispositivos. Com a visão aumentada, você monitora tudo de forma simples e eficiente.',
      image: 'https://bernardmarr.com/wp-content/uploads/2022/04/The-10-Biggest-Technology-Trends-That-Will-Transform-The-Next-Decade.jpg'
    },
    {
      title: 'Controle o estoque',
      description: 'Mantenha seu estoque sempre em ordem! Com uma boa organização, você garante a eficiência das operações e evita perdas.',
      image: 'https://science.nasa.gov/wp-content/uploads/2023/06/jwst-spacecraftpotentialtargetsmontageflip-1200px-4-jpg.webp?w=1200'
    },
    {
      title: 'Use o BI a seu favor',
      description: 'Transforme dados em insights valiosos! E impulsione o seu crescimento do seu negócio, com máximo as informações disponíveis.',
      image: 'https://cdn.mos.cms.futurecdn.net/VFLt5vHV7aCoLrLGjP9Qwm-1200-80.jpg'
    }
  ];
}

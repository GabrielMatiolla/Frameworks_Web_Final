import { Component } from '@angular/core';

import { HeaderComponent } from './components/header/header';
import { MenuComponent } from './components/menu/menu';
import { ConteudoComponent } from './components/conteudo/conteudo';
import { FooterComponent } from './components/footer/footer';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, MenuComponent, ConteudoComponent, FooterComponent],
  templateUrl: './app.html', 
  styleUrls: ['./app.css']  
})
export class AppComponent {
  title = 'trabalho-pokemon';
}
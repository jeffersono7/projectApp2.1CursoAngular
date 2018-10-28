import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { OfertasService } from '../ofertas.service';
import { Oferta } from '../shared/oferta.model';
import { Subject } from 'rxjs/Subject';

import '../util/rxjs-extensions';

@Component({
  selector: 'app-topo',
  templateUrl: './topo.component.html',
  styleUrls: ['./topo.component.css'],
  providers: [ OfertasService ]
})
export class TopoComponent implements OnInit {

  public ofertas: Observable<Oferta[]>;

  private subjectPesquisa: Subject<string> = new Subject<string>();

  private testeSubject: Subject<string> = new Subject<string>();

  constructor(private ofertasService: OfertasService) { }

  ngOnInit() {
    this.ofertas = this.subjectPesquisa
      .debounceTime(225) // executa a ação do switchMap após 1 segundo
      .distinctUntilChanged() // para fazer pesquisar distintas
      .switchMap((termo: string) => {
        // console.log('requisição http para api');
        if (termo.trim() === '') {
          return Observable.of<Oferta[]>([]);
        }
        return this.ofertasService.pesquisaOfertas(termo);
      })
      .catch((erro: any) => {
        // console.log(erro);
        return Observable.of<Oferta[]>([]);
      });

    // this.ofertas.subscribe((ofertas: Oferta[]) => this.ofertas2 = ofertas);
  }

  public pesquisa(termoDaBusca: string): void {
    // this.ofertas = this.ofertasService.pesquisaOfertas(termoDaBusca);
    // this.ofertas.subscribe(
    //   (ofertas: Oferta[]) => console.log(ofertas),
    //   (erro: any) => console.log('Erro status: ' + erro.status),
    //   () => console.log('Fluxo de eventos completo!')
    // );
    // console.log('keyup caracter: ', termoDaBusca);
    this.subjectPesquisa.next(termoDaBusca);
  }

  public limpaPesquisa(): void {
    this.subjectPesquisa.next('');
  }
}

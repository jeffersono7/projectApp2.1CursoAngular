import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';

import { Pedido } from './shared/pedido.model';
import { URL_API } from './app.api';

@Injectable()
export class OrdemCompraService {

    constructor(private http: Http) {}

    public efetivarCompra(pedido: Pedido): Observable<number> {
        const headers: Headers = new Headers();
        headers.append('Content-type', 'application/json');

        return this.http.post(
            `${URL_API}/pedidos`,
            JSON.stringify(pedido),
            new RequestOptions({ headers: headers}))
                .map((resposta: Response) => resposta.json().id);
    }
}

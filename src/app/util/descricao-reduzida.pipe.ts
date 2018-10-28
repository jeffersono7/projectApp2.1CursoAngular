import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
    name: 'descricaoReduzida'
})
export class DescricaoReduzida implements PipeTransform {

    transform(texto: string, truncaEm: number, iniciaEm: number): string {
        // if (texto.length > 15) {
        //     return texto.substr(0, 15) + '...';
        // }
        // return texto;
        return (texto.length > truncaEm) ? texto.substr(iniciaEm, truncaEm) + '...' : texto;
    }
}

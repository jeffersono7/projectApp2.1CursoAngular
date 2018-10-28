import { ItemCarrinho } from './shared/item-carrinho.model';
import { Oferta } from './shared/oferta.model';

class CarrinhoService {
    public itens: ItemCarrinho[] = [];

    public exibirItens(): ItemCarrinho[] {
        return this.itens;
    }

    public incluirItem(oferta: Oferta): void {
        const itemCarrinho: ItemCarrinho = new ItemCarrinho(
            oferta.id, oferta.imagens[0], oferta.titulo,
            oferta.descricao_oferta, oferta.valor, 1
        );

        // verificar se o item em questão já não existe dentro de this.itens
        const itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);
        if (itemCarrinhoEncontrado) {
            itemCarrinhoEncontrado.quantidade++;
        } else {
            this.itens.push(itemCarrinho);
        }
    }

    public totalCarrinhoCompras(): number {
        let total = 0;
        this.itens.map((item: ItemCarrinho) => total += (item.valor * item.quantidade));
        return total;
    }

    public adicionarQuantidade(itemCarrinho: ItemCarrinho): void {
        this.itens.find(item => item.id === itemCarrinho.id).quantidade += 1;
    }

    public diminuirQuantidade(itemCarrinho: ItemCarrinho): void {
        const itemCarrinhoEncontrado = this.itens.find((item: ItemCarrinho) => item.id === itemCarrinho.id);
        if (itemCarrinhoEncontrado) {
            itemCarrinhoEncontrado.quantidade--;
            if (itemCarrinhoEncontrado.quantidade === 0) {
                this.itens.splice(this.itens.indexOf(itemCarrinhoEncontrado), 1);
            }
        } else {
            return;
        }
    }

    public limparCarrinho(): void {
        this.itens = [];
    }
}

export { CarrinhoService };

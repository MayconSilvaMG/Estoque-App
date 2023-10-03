class Produto {

    constructor() {
        this.id = 0;
        this.arrayProdutos = [];
    }

    adicionar() {
        let produto = this.lerdados();

        if (this.validaCampos(produto)) {
            this.adicionarlementonoarray(produto);
        }

        this.listaTabela();
    }

    lerdados() {
        let produto = {}

        produto.id = this.id;
        produto.nomeproduto = document.getElementById('adicionarproduto').value;
        produto.nomelocal = document.getElementById('adicionarlocal').value;
        produto.quantidade = document.getElementById('adicionarquantidade').value;

        return produto;

    }

    listaTabela() {

        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        for (let i = 0; i < this.arrayProdutos.length; i++) {
            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_produto = tr.insertCell();
            let td_local = tr.insertCell();
            let td_quantidade = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_id.innerText = this.arrayProdutos[i].id;
            td_produto.innerText = this.arrayProdutos[i].nomeproduto;
            td_local.innerText = this.arrayProdutos[i].nomelocal;
            td_quantidade.innerText = this.arrayProdutos[i].quantidade;

            td_id.classList.add('center')

            let btnDelete = document.createElement('button')
            td_acoes.appendChild(btnDelete);
            btnDelete.innerHTML = "EXLUIR";
            btnDelete.style.backgroundColor = '#1ABF66';
            btnDelete.style.color = '#ffffff';
            btnDelete.setAttribute("onclick", "produto.deletar(" + this.arrayProdutos[i].id + ")");

        }

    }

    adicionarlementonoarray(produto) {
        this.arrayProdutos.push(produto);
        this.id++;
    }

    validaCampos(produto) {

        let msg = '';

        if (produto.nomeproduto == '') {
            msg += 'Informe o nome do produto \n'
        }

        if (produto.nomelocal == '') {
            msg += 'Informe o local do produto \n'
        }

        if (produto.quantidade == '') {
            msg += 'Informe a quantidade do produto \n'
        }

        if (msg != '') {
            alert(msg);
            return false;
        }

        return true;

    }

    deletar(id) {

        let tbody = document.getElementById('tbody');

        for (let i = 0; i < this.arrayProdutos.length; i++) {
            if (this.arrayProdutos[i].id == id) {
                this.arrayProdutos.splice(i, 1);
                tbody.deleteRow(i);
            }
        }
    }
}

var produto = new Produto();

function search() {
    let input = document.getElementById('searchbar').value.toLowerCase();
    let rows = document.querySelectorAll('#tbody tr');

    rows.forEach(row => {
        let rowData = row.textContent.toLowerCase();
        if (rowData.includes(input)) {
            row.style.display = "table-row";
        } else {
            row.style.display = "none";
        }
    });
}

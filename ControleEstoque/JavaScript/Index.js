/*class Produto {

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

var produto = new Produto();*/

class Produto {
    constructor() {
        this.arrayProdutos = [];
    }

    async adicionar() {
        debugger;
        let produto = this.lerdados();

        if (this.validaCampos(produto)) {
            await this.enviarParaAPI(produto); // Send data to the API
            this.adicionarlementonoarray(produto);
            this.listaTabela();
        }
    }

    lerdados() {
        let produto = {};
        produto.ProductName = document.getElementById('adicionarproduto').value;
        produto.ProductLocation = document.getElementById('adicionarlocal').value;
        produto.ProductQtd = document.getElementById('adicionarquantidade').value;
        return produto;
    }

    
    async listaTabela() {
        debugger;
        try {
            const response = await fetch('http://localhost:5000/v1/GetProduct');
            if (!response.ok) {
                throw new Error('Failed to fetch data from API');
            }
            const data = await response.json();
            let tbody = document.getElementById('tbody');
            tbody.innerHTML = '';

            data.forEach((product, index) => {
                let tr = tbody.insertRow();
                let td_id = tr.insertCell();
                let td_produto = tr.insertCell();
                let td_local = tr.insertCell();
                let td_quantidade = tr.insertCell();
                let td_acoes = tr.insertCell();

                td_id.innerText = product.id;
                td_produto.innerText = product.productName;
                td_local.innerText = product.productLocation;
                td_quantidade.innerText = product.productQtd;

                td_id.classList.add('center');

                let btnDelete = document.createElement('button');
                td_acoes.appendChild(btnDelete);
                btnDelete.innerHTML = "EXCLUIR";
                btnDelete.style.backgroundColor = '#1ABF66';
                btnDelete.style.color = '#ffffff';
                btnDelete.addEventListener("click", () => this.deletar(product.id, index));
            });
        } catch (error) {
            console.error(error);
        }
    }

    adicionarlementonoarray(produto) {
        this.arrayProdutos.push(produto);
    }

    validaCampos(produto) {
        let msg = '';

        if (produto.nomeproduto === '') {
            msg += 'Informe o nome do produto \n';
        }

        if (produto.nomelocal === '') {
            msg += 'Informe o local do produto \n';
        }

        if (produto.quantidade === '') {
            msg += 'Informe a quantidade do produto \n';
        }

        if (msg !== '') {
            alert(msg);
            return false;
        }

        return true;
    }

    async enviarParaAPI(produto) {
        debugger;
        try {
            const response = await fetch('http://localhost:5000/v1/CreateProduct', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(produto)
            });
            if (!response.ok) {
                throw new Error('Failed to add product to API');
            }
            const data = await response.json();
            console.log('Product added:', data);
        } catch (error) {
            console.error(error);
        }
    }

    async deletar(id, index) {
        try {
            const response = await fetch(`http://localhost:5000/v1/DeleteProduct/${id}`, {
                method: 'DELETE'
            });
            if (!response.ok) {
                throw new Error('Failed to delete product from API');
            }
            const data = await response.json();
            console.log('Product deleted:', data);
            this.arrayProdutos.splice(index, 1);
            this.listaTabela();
        } catch (error) {
            console.error(error);
        }
    }
}

var produto = new Produto();
produto.listaTabela();


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

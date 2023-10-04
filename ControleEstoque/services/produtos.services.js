class ProdutosService {
    constructor(http) {
      this.ApiUrl = "http://localhost:5000";
      this.http = http;
    }
  
    getProductList() {
      return this.http.get(this.ApiUrl + '/v1/GetProduct')
        .then(response => response.data)
        .catch(error => console.error(error));
    }
  
    getProdutoById(id) {
      return this.http.get(`${this.ApiUrl}/${id}`)
        .then(response => response.data)
        .catch(error => console.error(error));
    }
  
    post(produto) {
      return this.http.post(this.ApiUrl, produto)
        .then(response => response.data)
        .catch(error => console.error(error));
    }
  
    put(produto) {
      return this.http.put(`${this.ApiUrl}/${produto.id}`, produto)
        .then(response => response.data)
        .catch(error => console.error(error));
    }
  
    deleteProduto(id) {
      return this.http.delete(`${this.ApiUrl}/${id}`)
        .then(response => response.data)
        .catch(error => console.error(error));
    }
  }
  
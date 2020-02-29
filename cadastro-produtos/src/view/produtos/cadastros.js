import React, { Component } from 'react';
import ProdutoService from "../../app/produtoService"
import { withRouter } from 'react-router-dom'

// import { Container } from './styles';
const estadoInicial = {
    nome: '',
    sku:'',
    descricao: '',
    preco: 0,
    fornecedor: '',
    validador: false,
    errors: [],
    atualizando: false
 }

class CadastroProdutos extends Component {

    constructor() {
        super()
        this.service = new ProdutoService()
    }

    state = estadoInicial;

    onChange = (event) => {
        const valor = event.target.value;
        const nomeCampo = event.target.name;
        this.setState({
            [nomeCampo]: valor
        })
    }

    onSubmit = (event) => {
        const produtos = {
                nome: this.state.nome,
                sku:this.state.sku,
                descricao: this.state.descricao,
                preco: this.state.preco,
                fornecedor: this.state.fornecedor
        }
        try{
            this.service.salvar(produtos)
            this.limpaCampos();
            this.setState({ validador: true })
        }catch(erro){
            const errors = erro.errors
            this.setState({errors: errors})
        }
        
    }

    limpaCampos = () => {
        this.setState(estadoInicial);
    }

    componentDidMount(){
        const sku = this.props.match.params.sku

        if(sku){
            const resultado =this.service.obterProdutor().filter(produto => produto.sku === sku)

            if(resultado.length === 1) {
                const produtoEncontrado = resultado[0]
                this.setState({...produtoEncontrado, atualizando: true})
            }
        }
    }





  render() {
    return (
        <div className="card">
            <div className="card-header">{this.state.atualizando ? 'Atualização' : 'Cadastro'} de produtos</div>
            <div className="card-body">
            {
                this.state.validador ? 
                <div class="alert alert-dismissible alert-success">
                    <button type="button" class="close" data-dismiss="alert">&times;</button>
                      <strong>Parabéns!</strong> O produto foi cadastrado com sucesso. 
                </div> :
                <></>
            }


            {
                this.state.errors.length > 0 && 
                this.state.errors.map(msg =>{
                    return (
                        <div class="alert alert-dismissible alert-danger">
                            <button type="button" class="close" data-dismiss="alert">&times;</button>
                            <strong>Erro!</strong> {msg} 
                        </div>
                    )
                }) 
                
            }
            
            
                
                <div className="row">
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>Nome: *</label>
                            <input  name="nome"
                                    onChange={this.onChange} 
                                    value={this.state.nome} 
                                    className="form-control">
                            </input>
                        </div>    
                    </div>
                    <div className="col-md-6">
                        <div className="form-group">
                            <label>SKU: *</label>
                            <input  name="sku"
                                    onChange={this.onChange}
                                    disabled={this.state.atualizando} 
                                    value={this.state.sku} className="form-control"></input>
                        </div>    
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                        <div className="form-group">
                            <label>Descrição:</label>
                            <textarea   name="descricao" 
                                        onChange={this.onChange}
                                        value={this.state.descricao} className="form-control"></textarea>
                        </div>
                    </div>
                </div>

                <div className="row mb-3">
                    
                    <div className="col-md-6">
                        <label>Preço: *</label>
                        <input  name="preco"
                                onChange={this.onChange} 
                                value={this.state.preco} 
                                type="text" 
                                className="form-control"></input>
                    </div>
                    <div className="col-md-6">
                        <label>Fornecedor: *</label>
                        <input  name="fornecedor"
                                onChange={this.onChange}
                                value={this.state.fornecedor} 
                                type="text" 
                                className="form-control"></input>
                    </div>

                </div>

                <div className="row">

                <div className="col-md-1">
        <button onClick={this.onSubmit} className="btn btn-success">{this.state.atualizando ? 'Atualizar' : 'Cadastrar'}</button>
                    </div>

                    <div className="col-md-1">
                        <button onClick={this.limpaCampos} className="btn btn-primary">Limpar</button>
                    </div>
                </div>

            </div>
        </div>
        
    );
  }
}

export default withRouter(CadastroProdutos)
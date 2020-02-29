import React from 'react';

class App extends React.Component {

  state = {
    nome: ""
  }

  MudarNome = (event) => {
    let nome = event.target.value;

    this.setState({ nome })
  }

  criaComboBox = () => {
    const opcoes = ["Gabriel", "Ola"]
    const listaDeCombo = opcoes.map(opcao => <option>{opcao}</option>)

    return (
      <select>{listaDeCombo}</select>
    )

  }


  render() {
    const MeuComboBox = () => this.criaComboBox()

    return (
      <>
        <input type="text" value={this.state.nome} onChange={this.MudarNome} />
        <h2>Ola {this.props.nome}, sua idade é: {this.props.idade}</h2>
        <MeuComboBox />
      </>
    )
  }
}

export default App;

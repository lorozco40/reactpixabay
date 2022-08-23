import React, { Component } from 'react';
import Buscador from './componentes/Buscador';
import Resultado from './componentes/Resultado';
import Imagen from './componentes/Imagen';

class App extends Component {

  state = {
    termino: '',
    imagenes: [],
    pagina: ''
  }

  paginaAnterior = () => {

    //leer el state de la pagina actual
    let pagina = this.state.pagina;

    //si la pagina es 1 no ir hacia atras
    if (pagina === 1) return null;

    //restar 1 a la pagina actual
    pagina -= 1;
    //agregar el cambio al state

    this.setState({
      pagina
    }, () => {

      this.consultarApi();

    });

    //console.log(pagina);

  }

  paginaSiguiente = () => {

    //leer el state de la pagina actual
    let pagina = this.state.pagina;

    //sumar 1 a la pagina actual
    pagina += 1;
    //agregar el cambio al state

    this.setState({
      pagina
    }, () => {

      this.consultarApi();

    });

    //console.log(pagina);

  }

  consultarApi = () => {
    const termino = this.state.termino;
    const pagina = this.state.pagina;
    const url = `https://pixabay.com/api/?key=29036110-d86fa3d81916aa0b79ec2cf7e&q=${termino}&per_page=10&page=${pagina}`;
    //console.log(url);

    fetch(url)
      .then(respuesta => respuesta.json())
      .then(resultado => this.setState({ imagenes: resultado.hits }))

  }

  datosBusqueda = (termino) => {
    this.setState(
      {
        termino: termino,
        pagina: 1
      }, () => {
        this.consultarApi();
      }
    )
  }
  render() {
    return (
      <div className="app container">
        <div className="jumbotron">
          <p className="lead text-center">Buscador de Imagenes utilizando API de PixaBay</p>
          <p>Aplicación creada para consumo de api de acuerdo a una busqueda e indexacion.</p>
          < Buscador
            datosBusqueda={this.datosBusqueda}
          />
        </div>
        <div className="row justify-content-center">
          <Resultado
            imagenes={this.state.imagenes}
            paginaAnterior={this.paginaAnterior}
            paginaSiguiente={this.paginaSiguiente}
          />

        </div>
      </div>
    );
  };
}

export default App;


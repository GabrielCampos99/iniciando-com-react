import React from 'react'

import {Switch, Route} from 'react-router-dom'
import Home from './view/home'
import CadastroProdutos from './view/produtos/cadastros'
import ConsultaProdutos from './view/produtos/consulta'

export default () => {
    return(
        
            <Switch>
                <Route exact path="/cadastro-produtos/:sku?" component={CadastroProdutos}></Route>
                <Route exact path="/consulta-produtos" component={ConsultaProdutos}></Route>
                <Route exact path="/" component={Home}/>
            </Switch>
        
    )
}
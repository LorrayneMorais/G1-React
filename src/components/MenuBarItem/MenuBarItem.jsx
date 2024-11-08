// import React, { useContext } from 'react';
// import { ProductContext } from '../../contexts/CartContext/ProductContext';

import React from 'react';
import { FaSearch } from "react-icons/fa";
import './MenuBarItem.css';


export function MenuBarItem() {


    return (
        <>
            <section>
                <div className="menu-item-search">
                    <input type="text" placeholder="Procurar por gênero"/>
                    <button className="menu-item-icon-search">
                        <FaSearch />
                    </button>
                </div>
                <br />
                <div>
                    <div className="menu-categories">
                        <label htmlFor="acao">Ação</label>
                        <input type="checkbox" id="acao"/>
                    </div>
                    <div className="menu-categories">
                        <label htmlFor="suspense">Suspense</label>
                        <input type="checkbox" id="suspense"/>
                    </div>
                    <div className="menu-categories">
                        <label htmlFor="terror">Terror</label>
                        <input type="checkbox" id="terror"/>
                    </div>
                    <div className="menu-categories">
                        <label htmlFor="romance">Romance</label>
                        <input type="checkbox" id="romance"/>
                    </div>
                    <div className="menu-categories">
                        <label htmlFor="ficcao-cientifica">Ficção-Cientifica</label>
                        <input type="checkbox" id="ficcao-cientifica"/>
                    </div>
                    <div className="menu-categories">
                        <label htmlFor="misterio">Mistério</label>
                        <input type="checkbox" id="misterio"/>
                    </div>
                    <div className="menu-categories">
                        <label htmlFor="financas">Finanças</label>
                        <input type="checkbox" id="financas"/>
                    </div>
                    <div className="menu-categories">
                        <label htmlFor="programacao">Programação</label>
                        <input type="checkbox" id="programacao"/>
                    </div>
                    <div className="menu-categories">
                        <label htmlFor="japones">Japonês</label>
                        <input type="checkbox" id="japones"/>
                    </div>
                </div>
            </section>
        </>
    );
}

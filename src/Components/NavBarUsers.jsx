import React from 'react'
import { Link } from "react-router-dom"


const NavBarUsers = () => {
  return (
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div class="container-fluid">
                <a class="navbar-brand" href="">
                    <img src="/logo.jpg" alt="Logo" style={{ height: '40px' }} />
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                        <li class="nav-item">
                            <Link to="/Home" className='' style={{ textDecoration: 'none' }}>
                                <a class="nav-link active" aria-current="page">Home</a>
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/" className='' style={{ textDecoration: 'none' }}>
                                <a class="nav-link active" aria-current="page">Clientes</a>
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/Productos" className='' style={{ textDecoration: 'none' }}>
                                <a class="nav-link active" aria-current="page">Productos</a>
                            </Link>
                        </li>
                        <li class="nav-item">
                            <Link to="/" className='' style={{ textDecoration: 'none' }}>
                                <a class="nav-link active" aria-current="page">Facturas</a>
                            </Link>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Mas
                            </a>
                            <ul class="dropdown-menu">
                                <li>
                                    <Link to="/" className="" style={{ textDecoration: 'none' }}>
                                    <a class="dropdown-item" href="#">Cerrar Sesion</a>
                                    </Link>
                                    </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
  )
}

export default NavBarUsers
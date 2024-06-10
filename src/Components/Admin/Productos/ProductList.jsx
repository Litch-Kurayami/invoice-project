import React, { useEffect, useState } from 'react'
import NavBarUsers from '../../NavBarUsers'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'

const ProductList = () => {
    const [productos, setProductos] = useState([])
    const [pagina, setPagina] = useState(0)

    const productosPorPagina = 4

    function getProductos() {
        fetch("http://localhost:3000/products?_sort=ID&_order=desc")
            .then(response => {
                if (response.ok) {
                    return response.json()
                }

                throw new Error()
            })
            .then(data => {
                setProductos(data)
            })
            .catch(error => {
                Swal.fire({
                    title: 'Error',
                    text: 'incapaz de obtener datos',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                });
            })
    }

    useEffect(getProductos, [])

    return (
        <div>
            <NavBarUsers />
            <div className='container my-4'>
                <h2 className='text-center my-4'>Productos</h2>

                <div className='rew mb-3'>
                    <div className='col'>
                        <Link to="/Create" className='' style={{ textDecoration: 'none' }}>
                            <a className='btn btn-primary me-1' role='button'>Crear Producto</a>
                        </Link>
                        <button type='button' className='btn btn-outline-primary'
                            onClick={getProductos}>Recargar</button>
                    </div>
                    <div className='col'>

                    </div>
                </div>


                <table className='table'>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Brand</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Image</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            // Usa slice para seleccionar solo los productos de la página actual
                            productos.slice(pagina * productosPorPagina, (pagina + 1) * productosPorPagina).map((producto, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{producto.ID}</td>
                                        <td>{producto.Name}</td>
                                        <td>{producto.Brand}</td>
                                        <td>{producto.Category}</td>
                                        <td>{producto.Price}</td>
                                        <td><img src={"http://localhost:3000/ProductosIMG/" + producto.Image}
                                            width="100" alt='...' /></td>
                                        <td>{producto.CreatedAt.slice(0, 10)}</td>
                                        <td style={{ width: "10px", whiteSpace: "nowrap" }}>
                                            <Link to={/edit/ + producto.ID} className='' style={{ textDecoration: 'none' }}>
                                                <a className='btn btn-primary me-1' >Editar</a>
                                            </Link>
                                            <button type='button' className='btn btn-danger btn-sm'>Eliminar</button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button className='btn btn-outline-primary' style={{ marginRight: '10px' }} onClick={() => {
                        if (pagina > 0) { 
                            setPagina(pagina - 1)
                        }
                    }}>Anterior</button>
                    <button className='btn btn-outline-primary' onClick={() => {
                        if ((pagina + 1) * productosPorPagina < productos.length) { 
                            setPagina(pagina + 1)
                        }
                    }}>Siguiente</button>
                </div>
            </div>
        </div>
    )
}

export default ProductList

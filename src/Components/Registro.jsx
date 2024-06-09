import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import axios from 'axios'
import Swal from 'sweetalert2'

const Registro = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        cpassword: ''
    })

    const [errors, SetErrors] = useState({})
    const [valid, setValid] = useState(true)
    const navigate = useNavigate()

    const handeleSubmit = (e) => {
        e.preventDefault();
        let isvalid = true
        let validationErrors = {}

        if(formData.name === "" || formData.name === null) {
            isvalid = false;
            validationErrors.name = "Nombre requerido"
        }

        if(formData.email === "" || formData.email === null) {
            isvalid = false;
            validationErrors.email = "Correo requerido"
        } else if(!/\S+@\S+\.\S+/.test(formData.email)){
            isvalid = false;
            validationErrors.email = "Correo no valido"
        }

        if(formData.password === "" || formData.password === null) {
            isvalid = false;
            validationErrors.password = "Contraseña requerida"
        } else if(formData.password.length < 6){
            isvalid = false;
            validationErrors.password = "La contraseña debe contener 6 caracteres"
        }

        if (formData.cpassword !== formData.password) {
            isvalid = false;
            validationErrors.password = "Las contraseñas no son iguales"
        }
        SetErrors(validationErrors)
        setValid(isvalid)

        if (Object.keys(validationErrors).length === 0) {
            axios.post('http://localhost:3000/users', formData)
                .then(result => {
                    Swal.fire({
                        title: 'Registro completado',
                        text: 'Su registro ha sido exitoso',
                        icon: 'success',
                        confirmButtonText: 'Aceptar'
                    });
                    navigate('/login')
                })
                .catch(err => {
                    Swal.fire({
                        title: 'Error',
                        text: 'Hubo un problema con el registro',
                        icon: 'error',
                        confirmButtonText: 'Aceptar'
                    });
                    console.log(err);
                });
        }
    };

  return (
    <section class="vh-100" style={{backgroundColor: '#eee'}}>
  <div class="container h-100">
    <div class="row d-flex justify-content-center align-items-center h-100">
      <div class="col-lg-12 col-xl-11">
        <div class="card text-black" style={{borderRadius: '25px'}}>
          <div class="card-body p-md-5">
            <div class="row justify-content-center">
              <div class="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">

                <p class="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Sign up</p>
                <form class="mx-1 mx-md-4" onSubmit={handeleSubmit}>
                {
                    valid ? <></> :
                    <span className="text-danger">
                        {errors.name}; {errors.email}; 
                        {errors.password}; {errors.cpassword}
                    </span>
                }
                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-user fa-lg me-3 fa-fw"></i>
                    <div data-mdb-input-init class="form-outline flex-fill mb-0">
                      <input
                        type="text"
                        name="name"
                        class="form-control"
                        placeholder="Ingresa tu nombre"
                        onChange={(event) => setFormData({...formData, name: event.target.value})}
                        />
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-envelope fa-lg me-3 fa-fw"></i>
                    <div data-mdb-input-init class="form-outline flex-fill mb-0">
                      <input
                        type="email"
                        name="email"
                        class="form-control"
                        placeholder="Ingresa tu gmail"
                        onChange={(event) => setFormData({...formData, email: event.target.value})}
                        />
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-lock fa-lg me-3 fa-fw"></i>
                    <div data-mdb-input-init class="form-outline flex-fill mb-0">
                      <input
                        type="password"
                        name="password"
                        class="form-control"
                        placeholder="Ingresa una contraseña"
                        onChange={(event) => setFormData({...formData, password: event.target.value})}
                        />
                    </div>
                  </div>

                  <div class="d-flex flex-row align-items-center mb-4">
                    <i class="fas fa-key fa-lg me-3 fa-fw"></i>
                    <div data-mdb-input-init class="form-outline flex-fill mb-0">
                      <input
                        type="password"
                        name="cpassword"
                        class="form-control"
                        placeholder="Repita su contraseña"
                        onChange={(event) => setFormData({...formData, cpassword: event.target.value})}
                        />
                    </div>
                  </div>

                  <div class="form-check d-flex justify-content-center mb-5">
                   
                    <label class="form-check-label">
                      Ya tienes una cuenta  
                      <Link to="/Login" className='' style={{ textDecoration: 'none' }}>
                      <a href="#!"> Inicia Sesion aqui</a>
                      </Link>
                    </label>
                  </div>

                  <div class="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                    <button  type="submit" data-mdb-button-init data-mdb-ripple-init class="btn btn-primary btn-lg">Register</button>
                  </div>

                </form>

              </div>
              <div class="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">

                <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                  class="img-fluid" alt="Sample image"/>

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  )
}

export default Registro

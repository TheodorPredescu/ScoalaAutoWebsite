import React, { Component } from "react";
import { variables } from "./Variables";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./App.css";

export class Client extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: [],
            modalTitle: "",
            IdClient: 0,
            Nume: "",
            Prenume: "",
            CNP: "",
            Adresa: "",
            Data_Nastere: new  Date(),
            Sex: "",
            Data_Instriere: new Date(),
            Localitatea_Inscrierii: "",
        };
    }

    refreshList() {
        fetch(variables.API_URL + '/Client')
            .then(response => response.json())
            .then(data => {
                this.setState({ clients: data });
                console.log(data);
            });
    }

    componentDidMount() {
        this.refreshList();
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    };
    handleChangeDate_Nastere = (date) => {
        // Convert date to a string format compatible with the backend
        this.setState({ Data_Nastere: date});
    };
    
    handleChangeDate_Inscriere = (date) => {
        // Convert date to a string format compatible with the backend
        this.setState({ Data_Instriere: date });
    };
    
    addClick() {
        this.setState({
            modalTitle: "Adauga Client",
            IdClient: 0,
            Nume: "",
            Prenume: "",
            CNP: "",
            Adresa: "",
            Data_Nastere: new Date(),
            Sex: "",
            Data_Instriere: new Date(),
        });
    }

    editClick(client) {
        // const dataNastere = new Date(client.Data_Nastere);
        // const dataInscriere = new Date(client.Data_Instriere);
    
        // // Ensure valid date format
        // if (isNaN(dataNastere)) {
        //     console.error("Invalid Data_Nastere");
        //     return;
        // }
        // if (isNaN(dataInscriere)) {
        //     console.error("Invalid Data_Instriere");
        //     return;
        // }
        // console.log(client.IdClient);
        // console.log(client.Data_Nastere);
        // console.log(client.Data_Instriere);
        this.setState({
            modalTitle: "Edit Client",
            IdClient: client.IdClient,
            Nume: client.Nume,
            Prenume: client.Prenume,
            CNP: client.CNP,
            Adresa: client.Adresa,
            Data_Nastere: client.Data_Nastere,
            Sex: client.Sex,
            Data_Instriere: client.Data_Instriere,
        });
    }
    

    createClick() {
        
        const fData_Nastere = this.state.Data_Nastere ? this.state.Data_Nastere.toISOString().split('T')[0] : null;
        const fData_Instriere = this.state.Data_Instriere ? this.state.Data_Instriere.toISOString().split('T')[0] : null;
        fetch(variables.API_URL + '/Client', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Nume: this.state.Nume,
                Prenume: this.state.Prenume,
                CNP: this.state.CNP,
                Adresa: this.state.Adresa,
                Data_Nastere: this.state.Data_Nastere,
                Sex: this.state.Sex,
                Data_Instriere: this.state.Data_Instriere,
            })
        })
        .then(response => response.json())
        .then(result => {
            alert(result);
            this.refreshList();
        }, error => {
            alert("Failed to add client");
        });
    }

    updateClick() {
        console.log(this.state.IdClient);
        console.log(this.state.Data_Nastere);
        console.log(this.state.Data_Instriere);
        const formattedData_Nastere = this.state.Data_Nastere
        ? new Date(this.state.Data_Nastere).toISOString().split('T')[0]
        : null;

    const formattedData_Instriere = this.state.Data_Instriere
        ? new Date(this.state.Data_Instriere).toISOString().split('T')[0]
        : null;

    fetch(variables.API_URL + '/Client', {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            IdClient: this.state.IdClient,
            Nume: this.state.Nume,
            Prenume: this.state.Prenume,
            CNP: this.state.CNP,
            Adresa: this.state.Adresa,
            Data_Nastere: this.state.Data_Nastere,
            Sex: this.state.Sex,
            Data_Instriere: this.state.Data_Instriere,
        }),
    })
        .then((response) => response.text())
        .then(
            (result) => {
                alert(result);
                this.refreshList();
            },
            (error) => {
                alert('Failed to update client');
            }
        );
    }

    deleteClick(id) {
        if (window.confirm("Are you sure you want to delete this client?")) {
            fetch(variables.API_URL + '/Client/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.text())
            .then(result => {
                alert(result);
                this.refreshList();
            }, error => {
                alert("Failed to delete client");
            });
        }
    }

    render() {
        const {
            clients,
            modalTitle,
            Nume,
            Prenume,
            CNP,
            Adresa,
            Data_Nastere,
            Sex,
            Data_Instriere,
            IdClient,
        } = this.state;

        return (
            <div>
                <button type="button" className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Add Client
                </button>
                
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Nume</th>
                            <th>Prenume</th>
                            <th>Adresa</th>
                            <th>Data</th>
                            <th>Localitatea Sedintelor luate</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map(client =>
                            <tr key={client.IdClient}>
                                <td>{client.Nume}</td>
                                <td>{client.Prenume}</td>
                                <td>{client.Adresa}</td>
                                <td>{new Date(client.Data_Nastere).toLocaleDateString()}</td>
                                <td>{client.Localitatea_Inscrierii ? client.Localitatea_Inscrierii : "-----"}</td>
                                <td>
                                    <button type="button" className="btn btn-light mr-1"
                                        data-bs-toggle="modal" data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(client)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                        </svg>
                                    </button>
                                    <button type="button" className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(client.IdClient)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                                        </svg>
                                    </button>
                                </td>
                            </tr>)}
                    </tbody>
                </table>

                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            {/* <div className="modal-body">
                                <input type="text" name="Nume" value={Nume} placeholder="Nume" className="form-control mb-3" onChange={this.handleChange} />
                                <input type="text" name="Prenume" value={Prenume} placeholder="Prenume" className="form-control mb-3" onChange={this.handleChange} />
                                <input type="text" name="CNP" value={CNP} placeholder="CNP" className="form-control mb-3" onChange={this.handleChange} />
                                <input type="text" name="Adresa" value={Adresa} placeholder="Adresa" className="form-control mb-3" onChange={this.handleChange} />
                                <label style={{textAlign: "left"}}>Data Nasterii</label>
                                <input type="date" name="Data_Nastere" value={Data_Nastere} className="form-control mb-3" onChange={this.handleChange} />
                                <select name="Sex" value={Sex} className="form-control mb-3" onChange={this.handleChange}>
                                    <option value="">Select Sex</option>
                                    <option value="M">Male</option>
                                    <option value="F">Female</option>
                                </select>
                                <label style={{textAlign: "left"}}>Data instrierii</label>
                                <input type="date" name="Data_Instriere" value={Data_Instriere} className="form-control mb-3" onChange={this.handleChange} />
                                
                                {IdClient === 0 ? (
                                    <button type="button" className="btn btn-primary float-start" onClick={() => this.createClick()}>Create</button>
                                ) : (
                                    <button type="button" className="btn btn-primary float-start" onClick={() => this.updateClick()}>Update</button>
                                )}
                            </div> */}
                            <div className="modal-body">
                                <div className="mb-3">
                                    <label>Nume</label>
                                    <input
                                        type="text"
                                        name="Nume"
                                        value={Nume}
                                        placeholder="Nume"
                                        className="form-control"
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Prenume</label>
                                    <input
                                        type="text"
                                        name="Prenume"
                                        value={Prenume}
                                        placeholder="Prenume"
                                        className="form-control"
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>CNP</label>
                                    <input
                                        type="text"
                                        name="CNP"
                                        value={CNP}
                                        placeholder="CNP"
                                        className="form-control"
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Adresa</label>
                                    <input
                                        type="text"
                                        name="Adresa"
                                        value={Adresa}
                                        placeholder="Adresa"
                                        className="form-control"
                                        onChange={this.handleChange}
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Data Nasterii</label>
                                    <DatePicker
                                        selected={Data_Nastere}
                                        onChange={this.handleChangeDate_Nastere}
                                        className="form-control"
                                        dateFormat="dd/MM/yyyy"
                                    />
                                </div>
                                <div className="mb-3">
                                    <label>Sex</label>
                                    <select
                                        name="Sex"
                                        value={Sex}
                                        className="form-control"
                                        onChange={this.handleChange}
                                    >
                                        <option value="">Select Sex</option>
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                    </select>
                                </div>
                                <div className="mb-3">
                                    <label>Data Inscrierii</label>
                                    {/* <input
                                        type="date"
                                        name="Data_Instriere"
                                        value={Data_Instriere}
                                        className="form-control"
                                        onChange={this.handleChange}
                                    /> */}
                                    <DatePicker
                                        selected={Data_Instriere}
                                        onChange={this.handleChangeDate_Inscriere}
                                        className="form-control"
                                        dateFormat="dd/MM/yyyy"
                                    />
                                </div>
                                <div>
                                    {IdClient === 0 ? (
                                        <button type="button" className="btn btn-primary" onClick={() => this.createClick()}>
                                            Create
                                        </button>
                                    ) : (
                                        <button type="button" className="btn btn-primary" onClick={() => this.updateClick()}>
                                            Update
                                        </button>
                                    )}
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Inchide</button>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

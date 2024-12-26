import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { variables } from "./Variables";
import "react-datepicker/dist/react-datepicker.css";

export class SedintaClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sedinteclient: [],
            cars: [],
            clients: [],
            instructors: [],
            trasee: [], // pentru conexiunea dintre TraseuID si LocatieID; functia get din SedintaClientController returneaza si trasee din TraseeSedinte,
                            //  dar nu e folosita si nu e stocata in sedintaclient
            modalTitle: "",
            DataSedinta: new Date(),
            TipSedinta: "",
            Locatie: "",
            IDSedintaClient: 0,
            IDInstructor: 0,
            CodMasina: 0,
            Durata: "00:01", // Default duration (can be updated)
            LocatieID: 0,
            IDClient: 0,
            // TraseuID: 0
        };
    }

    refreshList() {
        fetch(variables.API_URL + '/SedintaClient')
            .then(response => response.json())
            .then(data => {
                this.setState({ sedinteclient: data });
            });
    }
    refreshTraseeList() {
        fetch(variables.API_URL + '/TraseeSedinte')
            .then(response => response.json())
            .then(data => {
                this.setState({trasee: data });
            });
    }
    refreshClientList() {
        fetch(variables.API_URL + '/Client')
            .then(response => response.json())
            .then(data => {
                this.setState({clients: data });
            });
    }
    refreshMasiniList() {
        fetch(variables.API_URL + '/Masina')
            .then(response => response.json())
            .then(data => {
                this.setState({cars: data });
            });
    }
    refreshInstructorList() {
        fetch(variables.API_URL + '/Instructor')
            .then(response => response.json())
            .then(data => {
                this.setState({instructors: data });
            });
    }
    componentDidMount() {
        this.refreshMasiniList();
        this.refreshTraseeList();
        this.refreshClientList();
        this.refreshInstructorList();
        this.refreshList();
    }

    changeLocatieID = (e) => { 
        this.setState({ LocatieID: e.target.value });
    }
    changeDataSedinta = (date) => {
        this.setState({ DataSedinta: date });
    };

    changeTipSedinta = (e) => {
        this.setState({ TipSedinta: e.target.value });
    };

    changeLocatie = (e) => {
        this.setState({ Locatie: e.target.value });
    };
    
    changeIdInstructor = (e) => {
        this.setState({ IDInstructor: e.target.value });
    }; 


    changeCodMasina = (e) => {
        this.setState({ CodMasina: e.target.value });
    };

    // Method to handle time change (using your previous approach)
    handleChangeDurata = (event) => {
        this.setState({ Durata: event.target.value });
    };

    changeIDClient = (e) => {
        this.setState({ IDClient: e.target.value });
    };

    addClick() {
        this.setState({
            modalTitle: "Adauga Sedinta Client",
            DataSedinta: new Date(),
            TipSedinta: "P",
            Locatie: "",
            IDSedintaClient: 0,
            IDInstructor: 0,
            CodMasina: 0,
            Durata: "00:30", // Default duration
            IDClient: 0,
            LocatieID: 0
        });
    }

    editClick(sedintaclient) {
        const cod = sedintaclient.TipSedinta === "T" ? null : sedintaclient.CodMasina;
        const locatieID = sedintaclient.TipSedinta === "T" ? null : sedintaclient.LocatieID;
        this.setState({
            modalTitle: "Edit Sedinta Client",
            DataSedinta: new Date(sedintaclient.DataSedinta),
            TipSedinta: sedintaclient.TipSedinta,
            Locatie: sedintaclient.Locatie,
            IDSedintaClient: sedintaclient.IDSedintaClient,
            IDInstructor: sedintaclient.IDInstructor,
            CodMasina: cod,
            Durata: sedintaclient.Durata,
            IDClient: sedintaclient.IDClient,
            LocatieID: locatieID
            // TraseuID: sedintaclient.TraseuID
        });
    }

    createClick() {
        const cod = this.state.TipSedinta === "T" ? null : this.state.CodMasina;
        const locatieID = this.state.TipSedinta === "T" ? null : this.state.LocatieID;
        fetch(variables.API_URL + '/SedintaClient', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                DataSedinta: this.state.DataSedinta,
                TipSedinta: this.state.TipSedinta,
                Locatie: this.state.Locatie,
                IDInstructor: this.state.IDInstructor,
                CodMasina: cod,
                Durata: this.state.Durata,
                IDClient: this.state.IDClient,
                LocatieID: locatieID
            })
        })
            .then(response => response.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            });
    }

    updateClick() {

        console.log(this.state.IDSedintaClient);
        console.log(this.state.DataSedinta);
        // console.log(this.state.Data_Instriere);
        const cod = this.state.TipSedinta === "T" ? null : this.state.CodMasina;
        const locatieID = this.state.TipSedinta === "T" ? null : this.state.LocatieID;
        fetch(variables.API_URL + '/SedintaClient', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                IDSedintaClient: this.state.IDSedintaClient,
                DataSedinta: this.state.DataSedinta,
                TipSedinta: this.state.TipSedinta,
                Locatie: this.state.Locatie,
                IDInstructor: this.state.IDInstructor,
                CodMasina: cod,
                Durata: this.state.Durata,
                IDClient: this.state.IDClient,
                LocatieID: locatieID
            })
        })
            .then(response => response.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            });
    }

    deleteClick(id) {
        if (window.confirm("Esti sigur ca vrei sa stergi sedinta client?")) {
            fetch(variables.API_URL + '/SedintaClient/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then((result) => {
                alert(result);
                this.refreshList();
            }, (error) => {
                alert('Failed');
            });
        }
    }


    changeTraseuID = (e) => {
        const traseuID = e.target.value;
        this.setState({ LocatieID: traseuID });
    
        // Fetch Localitatea from TraseeSedinte
        fetch(variables.API_URL + `/TraseeSedinte/${traseuID}`)
            .then(response => response.json())
            .then(data => {
                if (data.Localitatea) {
                    this.setState({ Locatie: data.DenumireLocatie }); // Update Locatie with Localitatea
                }
            })
            .catch(err => alert("Failed to fetch Localitatea"));
    };

    render() {
        const {
            sedinteclient,
            modalTitle,
            DataSedinta,
            TipSedinta,
            Locatie,
            IDInstructor,
            CodMasina,
            IDSedintaClient,
            Durata,
            IDClient,
            LocatieID
        } = this.state;

        return (
            <div>
                <button type="button" className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Adaugare sedinta
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>DataSedinta</th>
                            <th>Tip de sedinta</th>
                            <th>Locatie zona</th>
                            <th>Optiuni</th>
                        </tr>
                    </thead>
                    {/* ar trebui sa modific baza de date sa adaug un tabel nou numit localitati si sa il leg cu SedinteClient, pt ca sedinte pot avea aceeasi localitate */}
                    <tbody>
                        {sedinteclient.map(sedintaclient =>
                            <tr key={sedintaclient.IDSedintaClient}>
                                <td>{sedintaclient.DataSedinta}</td>
                                <td>
                                    {sedintaclient.TipSedinta === "T" ? "Teoretica" : sedintaclient.TipSedinta=== "P" ? "Practica" : "N/A"}
                                </td>
                                {/* <td>{sedintaclient.TipSedinta}</td> */}
                                {/*!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
                                <td>{sedintaclient.Locatie}</td>
                                {/* <td>{sedintaclient.DenumireLocatie}</td> */}
                                <td>
                                    <button type="button" className="btn btn-light mr-1"
                                        data-bs-toggle="modal" data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(sedintaclient)}>
                                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                        </svg>
                                    </button>
                                    <button type="button" className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(sedintaclient.IDSedintaClient)}>
                                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group mb-3">
                                    <label>Date Sedinta</label>
                                    <DatePicker
                                        selected={DataSedinta}
                                        onChange={this.changeDataSedinta}
                                        className="form-control"
                                        dateFormat="dd/MM/yyyy"
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Tip Sedinta</label>
                                    <select name={TipSedinta} value={TipSedinta} className="form-control mb-3" onChange={this.changeTipSedinta} >
                                        <option value="T">Teoretica</option>
                                        <option value="P">Practica</option>
                                    </select>
                                    {/* // <input type="text" className="form-control"
                                    //     value={TipSedinta} onChange={this.changeTipSedinta} /> */}
                                </div>

                                <div className="form-group mb-3">
                                    <label>Traseu</label>
                                    <select
                                        className="form-control"
                                        value={this.state.LocatieID || 0} // Default to 0 if no value
                                        onChange={this.changeTraseuID}
                                        disabled={TipSedinta === "T"} // Disable if TipSedinta is "T"
                                    >
                                        <option value={0}>Selecteaza Traseu</option>
                                        {this.state.trasee.map(traseu => (
                                            <option key={traseu.TraseuID} value={traseu.TraseuID}>
                                                {traseu.DenumireLocatie}
                                            </option>
                                        ))}
                                    </select>
                                
                                </div>
                                <div className="form-group mb-3">
                                    <label>Zona locatie - informatii suplimentare</label>
                                    <input type="text" className="form-control"
                                        value={Locatie} onChange={this.changeLocatie} />
                                </div>
                                {/* <div className="form-group mb-3">
                                    <label>LocatieID</label>
                                    <input type="number" className="form-control"
                                        value={LocatieID} onChange={this.changeLocatieID} />
                                </div> */}
                                <div className="form-group mb-3">
                                    <label>Instructor</label>
                                     {/*<input type="number" className="form-control"
                                        value={IDInstructor} onChange={this.changeIdInstructor} />*/}
                                    <select
                                        className="form-control"
                                        value={this.state.IDInstructor || 0} // Default to 0 if no value
                                        onChange={this.changeIdInstructor}
                                    >
                                        <option value={0}>Instructor-info</option>
                                        {this.state.instructors.map(instructor => (
                                            <option key={instructor.IDInstructor} value={instructor.IDInstructor}>
                                                {` ${instructor.Nume} ${instructor.Prenume} - CNP: ${instructor.CNP}`}
                                            </option>
                                        ))}
                                    </select> 
                                </div>
                                <div className="form-group mb-3">
                                    <label>Masina</label>
                                    {/*<input type="number" className="form-control"
                                        value={CodMasina} onChange={this.changeCodMasina} 
                                        disabled={TipSedinta === "T"}/>*/}
                                    <select
                                        className="form-control"
                                        value={this.state.CodMasina || 0} // Default to 0 if no value
                                        onChange={this.changeCodMasina}
                                        disabled={TipSedinta === "T"}
                                    >
                                        <option value={0}>--------</option>
                                        {this.state.cars.map(car => (
                                            <option key={car.CodMasina} value={car.CodMasina}>
                                                {` ${car.Numar} - ${car.Marca}, ${car.Model}`}
                                            </option>
                                        ))}
                                    </select> 
                                </div>
                                <div className="form-group mb-3">
                                    <label>Ora</label>
                                    <div className="input-group">
                                        <input
                                            type="time"
                                            className="form-control"
                                            value={Durata}
                                            onChange={this.handleChangeDurata} // Using your method
                                            disableClock={true}
                                            format={"HH:mm"}
                                            style={{ textAlign: "center", width: "100%" }}
                                            // step={1}
                                        />
                                    </div>
                                </div>
                                <div className="form-group mb-3">
                                    <label>Client</label>
                                    {/*<input type="number" className="form-control"
                                        value={IDClient} onChange={this.changeIDClient} />*/}
                                    <select
                                        className="form-control"
                                        value={this.state.IDClient || 0} // Default to 0 if no value
                                        onChange={this.changeIDClient}
                                    >
                                        <option value={0}>---</option>
                                        {this.state.clients.map(client => (
                                            <option key={client.IdClient} value={client.IdClient}>
                                                {` ${client.Prenume} ${client.Nume} - CNP: ${client.CNP}`}
                                            </option>
                                        ))}
                                    </select> 
                                </div>
                            </div>
                            <div className="modal-footer">
                                {IDSedintaClient === 0 ?
                                    <button type="button" className="btn btn-primary" onClick={() => this.createClick()}>
                                        Adauga
                                    </button> :
                                    <button type="button" className="btn btn-primary" onClick={() => this.updateClick()}>
                                        Actualizeaza
                                    </button>
                                }
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Inchide</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

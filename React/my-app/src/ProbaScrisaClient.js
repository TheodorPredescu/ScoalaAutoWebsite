import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { variables } from "./Variables";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";

export class ProbaScrisaClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            probescrise : [],
            clienti : [],
            PrenumeClient  : "",
            NumeClient : "",
            CNP : "",
            IDClient : 0,
            LoculSustinere : "",
            DataInceperii : new Date(),
            Durata : "",
            IDProbaScrisa : 0
        };
    }

    refreshList() {
        fetch(variables.API_URL + '/ProbaScrisa_Client')
            .then(response => response.json())
            .then(data => {
                this.setState({ probescrise: data });
            });
    }
    refreshClientList() {
        fetch(variables.API_URL + '/Client')
            .then(response => response.json())
            .then(data => {
                this.setState({clienti: data });
            });
    }

    componentDidMount() {
        this.refreshList();
        this.refreshClientList();
    }

    changePrenumeClient = (e) => {
        this.setState({ PrenumeClient: e.target.value });
    };
    changeNumeClient = (e) => {
        this.setState({ NumeClient: e.target.value });
    };
    changeCNP = (e) => {
        this.setState({ CNP: e.target.value });
    };
    changeIDClient = (e) => {
        this.setState({ IDClient: e.target.value });
    };
    changeLoculSustinere = (e) => {
        this.setState({ LoculSustinere: e.target.value });
    };
    changeDataInceperii = (date) => {
        this.setState({ DataInceperii: date });
    };
    changeDurata = (e) => {
        this.setState({ Durata: e.target.value });
    };
    changeIDProbaScrisa = (e) => {
        this.setState({ IDProbaScrisa: e.target.value });
    };


    addClick() {
        this.setState({
            PrenumeClient: "",
            NumeClient: "",
            CNP: "",
            IDClient: 0,
            LoculSustinere: "",
            DataInceperii: new Date(),
            Durata: "",
            IDProbaScrisa: 0
        });
    }

    editClick(probascrisa) {
        this.setState({
            PrenumeClient: probascrisa.PrenumeClient,
            NumeClient: probascrisa.NumeClient,
            CNP: probascrisa.CNP,
            IDClient: probascrisa.IDClient,
            LoculSustinere: probascrisa.LoculSustinere,
            DataInceperii: probascrisa.DataInceperii,
            Durata: probascrisa.Durata,
            IDProbaScrisa: probascrisa.IDProbaScrisa
        });
    }

    createClick() {
        fetch(variables.API_URL + '/ProbaScrisa_Client', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                PrenumeClient: this.state.PrenumeClient,
                NumeClient: this.state.NumeClient,
                CNP: this.state.CNP,
                IDClient: this.state.IDClient,
                LoculSustinere: this.state.LoculSustinere,
                DataInceperii: this.state.DataInceperii,
                Durata: this.state.Durata,
                IDProbaScrisa: this.state.IDProbaScrisa
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
        fetch(variables.API_URL + '/ProbaScrisa_Client', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                PrenumeClient: this.state.PrenumeClient,
                NumeClient: this.state.NumeClient,
                CNP: this.state.CNP,
                IDClient: this.state.IDClient,
                LoculSustinere: this.state.LoculSustinere,
                DataInceperii: this.state.DataInceperii,
                Durata: this.state.Durata,
                IDProbaScrisa: this.state.IDProbaScrisa
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
            fetch(variables.API_URL + '/ProbaScrisa_Client/' + id, {
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


    render() {
        const {
            PrenumeClient,
            NumeClient,
            CNP,
            IDClient,
            LoculSustinere,
            DataInceperii,
            Durata,
            IDProbaScrisa,
            probescrise,
            clienti
        } = this.state;

        return (
            <div>
                <button type="button" className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Adaugare proba
                </button>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Nume</th>
                            <th>Prenume</th>
                            <th>CNP</th>
                            <th>Locul de sustinere a examenului</th>
                            <th>Data examenului</th>
                            <th>Durata examenului</th>
                            <th>Optiuni</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {probescrise.map(probescrise =>
                            <tr key={probescrise.IDProbaScrisa}>
                                <td>{probescrise.NumeClient}</td>
                                <td>{probescrise.PrenumeClient}</td>
                                <td>{probescrise.CNP}</td>
                                <td>{probescrise.LoculSustinere}</td>
                                <td>{probescrise.DataInceperii}</td>
                                <td>{probescrise.Durata}</td>
                                
                                <td>
                                    <button type="button" className="btn btn-light mr-1"
                                        data-bs-toggle="modal" data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(probescrise)}>
                                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                        </svg>
                                    </button>
                                    <button type="button" className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(probescrise.IDProbaScrisa)}>
                                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash3" viewBox="0 0 16 16">
                                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5"/>
                                        </svg>
                                    </button>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                {/* <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
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
                                    <select name={TipSedinta} value={TipSedinta} className="form-control mb-3" onChange={this.changeTipSedinta}>
                                        <option value="T">Teoretica</option>
                                        <option value="P">Practica</option>
                                    </select>
                                     // <input type="text" className="form-control"
                                    //     value={TipSedinta} onChange={this.changeTipSedinta} /> 
                                </div>

                                <div className="form-group mb-3">
                                    <label>Traseu</label>
                                    <select
                                        className="form-control"
                                        value={this.state.TraseuID || 0} // Default to 0 if no value
                                        onChange={this.changeTraseuID}
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
                                <div className="form-group mb-3">
                                    <label>LocatieID</label>
                                    <input type="number" className="form-control"
                                        value={LocatieID} onChange={this.changeLocatieID} />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Instructor</label>
                                    <input type="number" className="form-control"
                                        value={IDInstructor} onChange={this.changeIdInstructor} />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Masina</label>
                                    <input type="number" className="form-control"
                                        value={CodMasina} onChange={this.changeCodMasina} />
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
                                    <input type="number" className="form-control"
                                        value={IDClient} onChange={this.changeIDClient} />
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
                </div> */}
            </div>
        );
    }
}
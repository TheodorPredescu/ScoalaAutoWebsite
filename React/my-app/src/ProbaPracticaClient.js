
import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { variables } from "./Variables";
import "react-datepicker/dist/react-datepicker.css";

export class ProbaPracticaClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalTitle: "",
            programare_trasee : [],
            clienti : [],
            trasee : [],
            politisti : [],
            masini: [],
            IDProgramareTraseu: 0,
            CNPClient: "",
            NumeClient: "",
            PrenumeClient: "",

            IDTraseu: 0,
            DataSustinerii: new Date(),
            CodMasina: 0,
            NumarMasina: "",

            Localitatea: "",
            NumeTraseu: "",
            ZonaPlecare: "",
            DurataTraseu: "",
            IDPolitist: 0,
            NumePolitist: "",
            PrenumePolitist: "",
            CNPPolitist: "",
            // TREBUIE ADAUGAT NUME SI PRENUME CA SI INFO PRIMIT, NU CA SI CAUTARE PE BAZA DE CNP
        };
    }

    refreshList() {
        fetch(variables.API_URL + '/ProgramareTraseu')
            .then(response => response.json())
            .then(data => {
                this.setState({ programare_trasee: data });
            });
    }
    refreshClientList() {
        fetch(variables.API_URL + '/Client')
            .then(response => response.json())
            .then(data => {
                this.setState({clienti: data });
            });
    }
    refreshMasinaList() {
        fetch(variables.API_URL + '/Masina')
            .then(response => response.json())
            .then(data => {
                this.setState({masini: data });
            });
    }
    refreshTraseeList() {
        fetch(variables.API_URL + '/trasee')
            .then(response => response.json())
            .then(data => {
                this.setState({trasee: data });
            });
    }

    componentDidMount() {
        this.refreshClientList();
        this.refreshTraseeList();
        this.refreshMasinaList();
        this.refreshList();
    }

    changeCNPClient = (e) => {
        this.setState({ CNPClient: e.target.value });
    };
    changeIDTraseu = (e) => {
        this.setState({ IDTraseu: e.target.value });
    };
    changeDataSustinerii = (date) => {
        this.setState({ DataSustinerii: date });
    };
    changeCodMasina = (e) => {
        this.setState({ CodMasina: e.target.value });
    };
    changeIDProgramareTraseu = (e) => {
        this.setState({ IDProgramareTraseu: e.target.value });
    };
    // changeLocalitatea = (e) => {
    //     this.setState({ Localitatea: e.target.value });
    // };
    // changeNumeTraseu = (e) => {
    //     this.setState({ NumeTraseu: e.target.value });
    // };
    // changeZonaPlecare = (e) => {
    //     this.setState({ ZonaPlecare: e.target.value });
    // };
    // changeDurataTraseu = (e) => {
    //     this.setState({DurataTraseu: e.target.value });
    // }
    // changeIDPolitist = (e) => {
    //     this.setState({ IDPolitist: e.target.value });
    // }

    addClick() {
        this.setState({
            modalTitle: "Adauga Programare Traseu",
            IDProgramareTraseu: 0,
            CNPClient: "",
            NumeClient: "",
            PrenumeClient: "",

            IDTraseu: 0,
            DataSustinerii: new Date(),
            CodMasina: 0,
            Localitatea: "",
            NumeTraseu: "",
            ZonaPlecare: "",
            DurataTraseu: "",
            IDPolitist: 0,
        });
    }

    editClick(programareTraseu) {
        const selectedClient = this.state.clienti.find(client => client.CNP === programareTraseu.CNPClient);
        const selectedMasina = this.state.masini.find(masina => masina.CodMasina == programareTraseu.CodMasina);
        // console.log(selectedMasina.Numar);
        // console.log(this.state.NumarMasina);
        const selectedTraseu = this.state.trasee.find(traseu => traseu.IDTraseu === programareTraseu.IDTraseu);
        this.setState({
            modalTitle: "Editare Programare Traseu",
            IDProgramareTraseu: programareTraseu.IdProgramareTraseu,
            CNPClient: programareTraseu.CNPClient,
            NumeClient: selectedClient.Nume,
            PrenumeClient: selectedClient.Prenume,
            IDTraseu: programareTraseu.IDTraseu,
            DataSustinerii: new Date(programareTraseu.DataSustinerii),
            CodMasina: programareTraseu.CodMasina,
            NumarMasina: selectedMasina.Numar,
            Localitatea: selectedTraseu.Localitatea,
            NumeTraseu: selectedTraseu.NumeTraseu,
            ZonaPlecare: selectedTraseu.ZonaPlecare,
            DurataTraseu: selectedTraseu.DurataTraseu,
            IDPolitist: selectedTraseu.IDPolitist,
            IDProgramareTraseu: programareTraseu.IDProgramareTraseu,
        });
        this.componentDidMount();
        // console.log(selectedMasina.Numar);
        // console.log(this.state.NumarMasina);
    }

    createClick() {
        fetch(variables.API_URL + '/ProgramareTraseu', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                CNPClient: this.state.CNPClient,
                IDTraseu: this.state.IDTraseu,
                DataSustinerii: this.state.DataSustinerii,
                CodMasina: this.state.CodMasina,
                
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

        // console.log(this.state.IDSedintaClient);
        // console.log(this.state.DataSedinta);
        console.log(this.state.IDProgramareTraseu);
        console.log(this.state.CNPClient);
        console.log(this.state.IDTraseu);
        console.log(this.state.DataSustinerii);
        console.log(this.state.CodMasina);
        fetch(variables.API_URL + '/ProgramareTraseu', {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                CNPClient: this.state.CNPClient,
                IDTraseu: this.state.IDTraseu,
                DataSustinerii: this.state.DataSustinerii,
                CodMasina: this.state.CodMasina,
                IDProgramareTraseu: this.state.IDProgramareTraseu,
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
        if (window.confirm("Esti sigur ca vrei sa stergi?")) {
            fetch(variables.API_URL + '/ProgramareTraseu/' + id, {
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
            modalTitle,
            programare_trasee,
            clienti,
            trasee,
            politisti,
            masini,
            IDProgramareTraseu,
            CNPClient,
            NumeClient,
            PrenumeClient,
            IDTraseu,
            DataSustinerii,
            CodMasina,
            Localitatea,
            NumeTraseu,
            ZonaPlecare,
            DurataTraseu,
            IDPolitist,
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
                            <th>Client (CNP)</th>
                            <th>Traseu</th>
                            <th>Data Sustinerii</th>
                            <th>Masina</th>
                            <th>Localitatea</th>
                            <th>Zona Plecare</th>
                            <th>Politist (CNP)</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {programare_trasee.map(programareTraseu =>
                            <tr key={programareTraseu.IDProgramareTraseu}>
                                <td>{`${programareTraseu.NumeClient} ${programareTraseu.PrenumeClient} - ${programareTraseu.CNPClient}`}</td>
                                <td>{programareTraseu.NumeTraseu}</td>
                                <td>{programareTraseu.DataSustinerii}</td>
                                <td>{programareTraseu.NumarMasina}</td>
                                <td>{programareTraseu.Localitatea}</td>
                                <td>{programareTraseu.ZonaPlecare}</td>
                                <td>{`${programareTraseu.NumePolitist} ${programareTraseu.PrenumePolitist} - ${programareTraseu.CNPPolitist}`}</td>
                                
                                <td>
                                    <button type="button" className="btn btn-light mr-1"
                                        data-bs-toggle="modal" data-bs-target="#exampleModal"
                                        onClick={() => this.editClick(programareTraseu)}>
                                         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                                        </svg>
                                    </button>
                                    <button type="button" className="btn btn-light mr-1"
                                        onClick={() => this.deleteClick(programareTraseu.IDProgramareTraseu)}>
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
                                    <label>Client (CNP)</label>
                                    <select
                                        className="form-control"
                                        value={this.state.CNPClient === "" ? "" : this.state.CNPClient} // Default to 0 if no value
                                        onChange={this.changeCNPClient}
                                    >
                                        <option value={""}>Selecteaza client</option>
                                        {/* console.log(this.state.CNPClient) */}
                                        {this.state.clienti.map(client => (
                                            // console.log(client),
                                            <option key={client.CNP} value={client.CNP}>
                                                {`${client.Nume} ${client.Prenume} - ${client.CNP}`}
                                            </option>
                                            
                                        ))}
                                    </select>                                
                            </div>
                                
                                {/* <div className="form-group mb-3">
                                    <label>Nume Client</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={this.state.NumeClient || "---"} 
                                        readOnly 
                                    />
                                </div>
                                <div className="form-group mb-3">
                                    <label>Prenume Client</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        value={this.state.PrenumeClient || "---"} 
                                        readOnly 
                                    />
                                </div> */}

                                <div className="form-group mb-3">
                                    <label>Data Sustinerii</label>
                                    <DatePicker
                                        selected={this.state.DataSustinerii}
                                        onChange={this.changeDataSustinerii}
                                        className="form-control"
                                        dateFormat="dd/MM/yyyy"
                                    />
                                </div>

                                <div className="form-group mb-3">
                                    <label>Traseu</label>
                                    <select
                                    className="form-control"
                                    value={this.state.IDTraseu || 0} // Default to 0 if no value
                                    onChange={this.changeIDTraseu}
                                    >
                                        <option value = {0}> Selecteaza traseu </option>
                                        {this.state.trasee.map(traseu => (
                                            <option key = {traseu.IDTraseu} value = {traseu.IDTraseu}>
                                                {`${traseu.NumeTraseu} - ${traseu.Localitatea}`}
                                            </option>
                                        ))}
                                        
                                    </select>
                                </div>

                                <div className="form-group mb-3">
                                    <label>Masina</label>
                                    <select
                                        className="form-control"
                                        value={this.state.CodMasina || 0} // Default to 0 if no value
                                        onChange={this.changeCodMasina}
                                    >
                                        <option value={0}>Selecteaza masina</option>
                                        {
                                            this.state.masini.map(masina => (
                                                <option key={masina.CodMasina} value={masina.CodMasina}>
                                                    {`${masina.Numar}`}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                {/* <div className="form-group mb-3">
                                    <label>Durata Sedinta</label>
                                    <input 
                                        type="time" 
                                        className="form-control" 
                                        value={this.state.Durata || ""} 
                                        onChange={this.changeDurata} 
                                    />
                                </div>
                                
                                <div className="form-group mb-3">
                                    <label>Locul sustinerii</label>
                                    <input type="text" className="form-control"
                                        value={LoculSustinere} onChange={this.changeLoculSustinere} />
                                </div> */}

                            </div>
                            <div className="modal-footer">
                                {IDProgramareTraseu === 0 ?
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
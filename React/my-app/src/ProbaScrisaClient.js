import React, { Component } from "react";
import DatePicker from "react-datepicker";
import { variables } from "./Variables";
import "react-datepicker/dist/react-datepicker.css";

export class ProbaScrisaClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            probescrise : [],
            clienti : [],
            trasee : [],
            modalTitle: "",
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
    // refreshTraseuList() {
    //     fetch(variables.API_URL + '/Client')
    //         .then(response => response.json())
    //         .then(data => {
    //             this.setState({clienti: data });
    //         });
    // }

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
        const selectedCNP = e.target.value;
        const selectedClient = this.state.clienti.find(client => client.CNP === selectedCNP);

        this.setState({ 
            CNP: selectedCNP,
            NumeClient: selectedClient ? selectedClient.Nume : "---1---",
            PrenumeClient: selectedClient ? selectedClient.Prenume : "---1---",
            IDClient: selectedClient ? selectedClient.IdClient : 0
            }, () => console.log(this.state.IDClient));
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
            modalTitle: "Adauga Proba Client",
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
            modalTitle: "Edit Proba Client",
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
            modalTitle,
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
                            <th>CNP</th>
                            <th>Nume</th>
                            <th>Prenume</th>
                            <th>Locul de sustinere a examenului</th>
                            <th>Data examenului</th>
                            <th>Durata examenului</th>
                            <th>Optiuni</th>
                        </tr>
                    </thead>
                    
                    <tbody>
                        {probescrise.map(probescrise =>
                            <tr key={probescrise.IDProbaScrisa}>
                                <td>{probescrise.CNP}</td>
                                <td>{probescrise.NumeClient}</td>
                                <td>{probescrise.PrenumeClient}</td>
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



                 <div className="modal fade" id="exampleModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">

                            <div className="form-group mb-3">
                                    <label>CNP-Client</label>
                                    <select
                                        className="form-control"
                                        value={this.state.CNP || ""} // Default to 0 if no value
                                        onChange={this.changeCNP}
                                    >
                                        <option value={""}>Selecteaza CNP</option>
                                        {this.state.clienti.map(client => (
                                            <option key={client.CNP} value={client.CNP}>
                                                {client.CNP}
                                            </option>
                                            
                                        ))}
                                    </select>                                
                                </div>
                                
                                <div className="form-group mb-3">
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
                                </div>

                                <div className="form-group mb-3">
                                    <label>Date Sedinta</label>
                                    <DatePicker
                                        selected={DataInceperii}
                                        onChange={this.changeDataInceperii}
                                        className="form-control"
                                        dateFormat="dd/MM/yyyy"
                                    />
                                </div>

                                <div className="form-group mb-3">
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
                                </div>

                            </div>
                            <div className="modal-footer">
                                {IDProbaScrisa === 0 ?
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
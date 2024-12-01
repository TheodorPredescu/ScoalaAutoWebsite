import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import { variables } from "./Variables";

export class AfisareSedinte extends Component {
    constructor(props) {
        super(props);
        this.state = {
            sedinteclient: [],
            trasee: [],
            clienti: [],
            instructors: [],
            masini: [],
            modalTitle: "",
            DataSedinta: new Date(),
            TipSedinta: "",
            Locatie: "",
            IDSedintaClient: 0,
            IDInstructor: 0,
            CodMasina: 0,
            Durata: "00:01",
            IDClient: 0,
            LocatieID: 0,
            TraseuID: 0
        };
    }

    componentDidMount() {
        this.refreshList();
        this.refreshTraseeList();
        this.refreshClientList();
        this.refreshInstructorList();
        this.refreshMasinaList();
    }

    refreshList() {
        fetch(variables.API_URL + '/InformatiiSedinta')
            .then(response => response.json())
            .then(data => {
                this.setState({ sedinteclient: data });
            });
    }

    refreshTraseeList() {
        fetch(variables.API_URL + '/TraseeSedinte')
            .then(response => response.json())
            .then(data => {
                this.setState({ trasee: data });
            });
    }

    refreshClientList() {
        fetch(variables.API_URL + '/Client')
            .then(response => response.json())
            .then(data => {
                this.setState({ clienti: data });
            });
    }

    refreshInstructorList() {
        fetch(variables.API_URL + '/Instructor')
            .then(response => response.json())
            .then(data => {
                this.setState({ instructors: data });
            });
    }

    refreshMasinaList() {
        fetch(variables.API_URL + '/Masina')
            .then(response => response.json())
            .then(data => {
                this.setState({ masini: data });
            });
    }

    changeLocatieID = (e) => { this.setState({ LocatieID: e.target.value }); }
    changeDataSedinta = (date) => { this.setState({ DataSedinta: date }); }
    changeTipSedinta = (e) => { this.setState({ TipSedinta: e.target.value }); }
    changeLocatie = (e) => { this.setState({ Locatie: e.target.value }); }
    changeIdInstructor = (e) => { this.setState({ IDInstructor: e.target.value }); }
    changeCodMasina = (e) => { this.setState({ CodMasina: e.target.value }); }
    handleChangeDurata = (event) => { this.setState({ Durata: event.target.value }); }
    changeIDClient = (e) => { this.setState({ IDClient: e.target.value }); }

    addClick() {
        this.setState({
            modalTitle: "Adauga Sedinta Client",
            DataSedinta: new Date(),
            TipSedinta: "P",
            Locatie: "",
            IDSedintaClient: 0,
            IDInstructor: 0,
            CodMasina: 0,
            Durata: "00:30",
            IDClient: 0,
            LocatieID: 0
        });
    }

    editClick(sedintaclient) {
        this.setState({
            modalTitle: "Edit Sedinta Client",
            DataSedinta: new Date(sedintaclient.DataSedinta),
            TipSedinta: sedintaclient.TipSedinta,
            Locatie: sedintaclient.Locatie,
            IDSedintaClient: sedintaclient.IDSedintaClient,
            IDInstructor: sedintaclient.IDInstructor,
            CodMasina: sedintaclient.CodMasina,
            Durata: sedintaclient.Durata,
            IDClient: sedintaclient.IDClient,
            LocatieID: sedintaclient.LocatieID,
            TraseuID: sedintaclient.TraseuID
        });
    }

    createClick() {
        fetch(variables.API_URL + '/InformatiiSedinta', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({
                DataSedinta: this.state.DataSedinta,
                TipSedinta: this.state.TipSedinta,
                Locatie: this.state.Locatie,
                IDInstructor: this.state.IDInstructor,
                CodMasina: this.state.CodMasina,
                Durata: this.state.Durata,
                IDClient: this.state.IDClient,
                LocatieID: this.state.LocatieID
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
        fetch(variables.API_URL + '/InformatiiSedinta', {
            method: 'PUT',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({
                IDSedintaClient: this.state.IDSedintaClient,
                DataSedinta: this.state.DataSedinta,
                TipSedinta: this.state.TipSedinta,
                Locatie: this.state.Locatie,
                IDInstructor: this.state.IDInstructor,
                CodMasina: this.state.CodMasina,
                Durata: this.state.Durata,
                IDClient: this.state.IDClient,
                LocatieID: this.state.LocatieID
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
            fetch(variables.API_URL + '/InformatiiSedinta/' + id, {
                method: 'DELETE',
                headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
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
        const { sedinteclient, clienti, instructors, masini, modalTitle, DataSedinta, TipSedinta, Locatie, IDSedintaClient, IDInstructor, CodMasina, Durata, IDClient } = this.state;

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
                            <th>Nume Client</th>
                            <th>Prenume Client</th>
                            <th>Tip Sedinta</th>
                            <th>Denumire Locatie</th>
                            <th>Localitatea</th>
                            <th>Data Sedinta</th>
                            <th>Nume Instructor</th>
                            <th>Prenume Instructor</th>
                            <th>Durata Traseu</th>
                            <th>Marca Masina</th>
                            <th>Model Masina</th>
                            <th>Optiuni</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sedinteclient.map(sedintaclient => {
                            const client = clienti.find(c => c.IDClient === sedintaclient.IDClient);
                            const instructor = instructors.find(i => i.IDInstructor === sedintaclient.IDInstructor);
                            const masina = masini.find(m => m.CodMasina === sedintaclient.CodMasina);
                            const traseu = this.state.trasee.find(t => t.IDTraseu === sedintaclient.TraseuID);

                            return (
                                <tr key={sedintaclient.IDSedintaClient}>
                                    <td>{client ? client.Nume_Client : ""}</td>
                                    <td>{client ? client.Prenume_Client : ""}</td>
                                    <td>{sedintaclient.TipSedinta === "T" ? "Teoretica" : "Practica"}</td>
                                    <td>{sedintaclient.Locatie}</td>
                                    <td>{traseu ? traseu.Localitatea : ""}</td>
                                    <td>{new Date(sedintaclient.DataSedinta).toLocaleString()}</td>
                                    <td>{instructor ? instructor.NumeInstructor : ""}</td>
                                    <td>{instructor ? instructor.PrenumeInstructor : ""}</td>
                                    <td>{traseu ? traseu.DurataTraseu : ""}</td>
                                    <td>{masina ? masina.MarcaMasina : ""}</td>
                                    <td>{masina ? masina.ModelMasina : ""}</td>
                                    <td>
                                        <button type="button" className="btn btn-light"
                                            onClick={() => this.editClick(sedintaclient)}>
                                            Edit
                                        </button>
                                        <button type="button" className="btn btn-light"
                                            onClick={() => this.deleteClick(sedintaclient.IDSedintaClient)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

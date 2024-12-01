import React, { Component } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TimePicker from "react-time-picker";
import { variables } from "./Variables";

export class AfisareSedinte extends Component {
    constructor(props) {
        super(props);
        this.state = {
            infosedinte: [],
            trasee: [],
            clienti: [],
            instructors: [],
            masini: [],
            modalTitle: "",
            DataSedinta: new Date(),

            IDClient: 0,
            IDInstructor: 0,
            Numar: "",
            DenumireLocatieID: 0,
            TraseuID: 0,
            TipSedinta: "",
            DenumireLocatie: "",
            Durata: "00:01",
            // Nume_Client: "",
            // Prenume_Client: "",
            // Nume_Instructor: "",
            // Prenume_Instructor: "",
        };
    }

    componentDidMount() {
        this.refreshTraseeList();
        this.refreshClientList();
        this.refreshInstructorList();
        this.refreshMasinaList();
        this.refreshList();
    }

    refreshList() {
        fetch(variables.API_URL + '/InformatiiSedinta')
            .then(response => response.json())
            .then(data => {
                this.setState({ infosedinte: data });
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

    changeIDClient = (e) => { this.setState({ IDClient: e.target.value }); }
    changeIdInstructor = (e) => { this.setState({ IDInstructor: e.target.value }); }
    changeCodMasina = (e) => { this.setState({ Numar: e.target.value }); }
    changeDenumireLocatieID = (e) => { this.setState({ DenumireLocatieID: e.target.value }); }
    handleChangeTraseu = (event) => { this.setState({ TraseuID: event.target.value }); }
    changeTipSedinta = (e) => { this.setState({ TipSedinta: e.target.value }); }
    changeDenumireLocatie = (e) => { this.setState({ DenumireLocatie: e.target.value }); }
    handleChangeDurata = (event) => { this.setState({ Durata: event.target.value }); }
    changeDataSedinta = (date) => { this.setState({ DataSedinta: date }); }
    // changeNume_Client =(e) => { this.setState({ Nume_Client: e.target.value }); }
    // changePrenume_Client =(e) => { this.setState({ Prenume_Client: e.target.value }); }
    // changeNume_Client =(e) => { this.setState({ Nume_Instructor: e.target.value }); }
    // changePrenume_Client =(e) => { this.setState({ Prenume_Instructor: e.target.value }); }
    addClick() {
        this.setState({
            modalTitle: "Adauga Sedinta Client",
            DataSedinta: new Date(),
            TipSedinta: "P",
            DenumireLocatie: "",
            IDClient: 0,
            IDInstructor: 0,
            Numar: 0,
            Durata: "00:30",
            IDClient: 0,
            DenumireLocatieID: 0,
            // Nume_Client: "",
            // Prenume_Client: "",
            // Nume_Instructor: "",
            // Prenume_Instructor: "",
        });
    }

    editClick(infosedinte) {
        this.setState({
            modalTitle: "Edit Sedinta Client",
            DataSedinta: new Date(infosedinte.DataSedinta),
            TipSedinta: infosedinte.TipSedinta,
            DenumireLocatie: infosedinte.DenumireLocatie,
            IDClient: infosedinte.IDClient,
            IDInstructor: infosedinte.IDInstructor,
            Numar: infosedinte.Numar,
            Durata: infosedinte.Durata,
            IDClient: infosedinte.IDClient,
            DenumireLocatieID: infosedinte.DenumireLocatieID,
            TraseuID: infosedinte.TraseuID,
            // Nume_Client: infosedinte.Nume_Client,
            // Prenume_Client: infosedinte.Prenume_Client,
            // Nume_Instructor: infosedinte.Nume_Instructor,
            // Prenume_Instructor: infosedinte.Prenume_Instructor,
        });
    }

    createClick() {
        fetch(variables.API_URL + '/InformatiiSedinta', {
            method: 'POST',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            body: JSON.stringify({
                DataSedinta: this.state.DataSedinta,
                TipSedinta: this.state.TipSedinta,
                DenumireLocatie: this.state.DenumireLocatie,
                IDInstructor: this.state.IDInstructor,
                Numar: this.state.Numar,
                Durata: this.state.Durata,
                IDClient: this.state.IDClient,
                DenumireLocatieID: this.state.DenumireLocatieID,
                // Nume_Client: this.state.Nume_Client,
                // Prenume_Client: this.state.Prenume_Client,
                // Nume_Instructor: this.state.Nume_Instructor,
                // Prenume_Instructor: this.state.Prenume_Instructor
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
                IDClient: this.state.IDClient,
                DataSedinta: this.state.DataSedinta,
                TipSedinta: this.state.TipSedinta,
                DenumireLocatie: this.state.DenumireLocatie,
                IDInstructor: this.state.IDInstructor,
                Numar: this.state.Numar,
                Durata: this.state.Durata,
                IDClient: this.state.IDClient,
                DenumireLocatieID: this.state.DenumireLocatieID,
                // Nume_Client: this.state.Nume_Client,
                // Prenume_Client: this.state.Prenume_Client,
                // Nume_Instructor: this.state.Nume_Instructor,
                // Prenume_Instructor: this.state.Prenume_Instructor
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
        const { infosedinte, clienti, instructors, masini, modalTitle, DataSedinta, TipSedinta, DenumireLocatie, IDClient, IDInstructor, CodMasina, Durata} = this.state;

        return (
            <div>
                {/* <button type="button" className="btn btn-primary m-2 float-end"
                    data-bs-toggle="modal" data-bs-target="#exampleModal"
                    onClick={() => this.addClick()}>
                    Adaugare sedinta
                </button> */}

                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Nume Client</th>
                            <th>Prenume Client</th>
                            <th>Tip Sedinta</th>
                            <th>Denumire DenumireLocatie</th>
                            <th>Localitatea</th>
                            <th>Data Sedinta</th>
                            <th>Nume Instructor</th>
                            <th>Prenume Instructor</th>
                            <th>Durata Traseu</th>
                            <th>Marca Masina</th>
                            <th>Model Masina</th>
                            {/* <th>Optiuni</th> */}
                        </tr>
                    </thead>
                    <tbody>
                        {infosedinte.map(infosedinte => {
                            const client = clienti.find(c => infosedinte.IDClient === c.IdClient) || null;
                            const instructor = instructors.find(i => i.IDInstructor === infosedinte.IDInstructor) || null;
                            const masina = masini.find(m => m.Numar.trim() === infosedinte.Numar.trim()) || null;
                            const traseu = this.state.trasee.find(t => t.IDTraseu === infosedinte.TraseuID) || null;
                            // console.log(client.IdClient);
                            // console.log(infosedinte.IDClient);
                            // console.log(client.Nume_Client);
                            console.log(infosedinte);

                            // console.log(infosedinte.Numar);
                            // console.log(masini);
                            // console.log(masina.Numar);
                            console.log(" ");
                            
                            // console.log(infosedinte.TraseuID);
                            // console.log(" ");
                            return (
                                <tr key={infosedinte.IDSedintaClient}>
                                    <td>{client.Nume ? client.Nume : "nume"}</td>
                                    {/* <td>{infosedinte.Nume_Client}</td> */}


                                    <td>{client ? client.Prenume: ""}</td>
                                    {/* <td>{infosedinte.Prenume_Client}</td> */}
                                    <td>{infosedinte.TipSedinta === "T" ? "Teoretica" : "Practica"}</td>
                                    <td>{infosedinte.DenumireLocatie}</td>
                                    <td>{traseu ? traseu.Localitatea : ""}</td>
                                    <td>{new Date(infosedinte.DataSedinta).toLocaleString()}</td>

                                    <td>{instructor ? instructor.Nume : "nume"}</td>
                                    {/* <td>{infosedinte.Nume_Instructor}</td> */}

                                    {/* <td>{infosedinte.Prenume_Instructor}</td> */}
                                    <td>{instructor ? instructor.Prenume: ""}</td>
                                    
                                    {/* <td>{infosedinte.DataSedinta}</td> */}
                                    <td>{new Date(infosedinte.DataSedinta).toLocaleString()}</td>
                                    {/* <td>{traseu ? traseu.DurataTraseu : ""}</td> */}
                                    <td>{masina ? masina.Marca : ""}</td>
                                    <td>{masina ? masina.Model : ""}</td>
                                    {/* <td>
                                        <button type="button" className="btn btn-light"
                                            onClick={() => this.editClick(infosedinte)}>
                                            Edit
                                        </button>
                                        <button type="button" className="btn btn-light"
                                            onClick={() => this.deleteClick(infosedinte.IDClient)}>
                                            Delete
                                        </button>
                                    </td> */}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

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
            DataSelector: "2024-01-01",
            // Nume_Client: "",
            // Prenume_Client: "",
            // Nume_Instructor: "",
            // Prenume_Instructor: "",
        };
    }

    componentDidMount() {
        this.refreshTraseeList();
        this.refreshInstructorList();
        this.refreshMasinaList();
        this.refreshClientList();
        this.refreshList();
    }

    changeDataSelector = (date) => {
        // this.setState({ DataSelector: date });
        console.log(date);
        const formattedDate = date.toLocaleDateString().split('/').join('-');
        console.log(formattedDate);
        console.log(this.state.DataSelector);
    this.setState({ DataSelector: formattedDate }, () => {
        console.log(this.state.DataSelector);
        this.refreshList(); // Ensure `componentDidMount` runs after state is updated
    });
    }

    refreshList() {
        fetch(variables.API_URL + '/InformatiiSedinta/?date='+this.state.DataSelector)
            .then(response => response.json())
            .then(data => {
        console.log(data);
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
    render() {
        const { infosedinte, clienti, instructors, masini, modalTitle, DataSedinta, TipSedinta, DenumireLocatie, IDClient, IDInstructor, CodMasina, Durata} = this.state;

        return (
          <div>
            <div>
              <label>Nu mai noi de data: </label>
              <DatePicker

                selected={new Date(this.state.DataSelector.replace(/\//g, "-"))}
                onChange={this.changeDataSelector}
                className="form-control"
                dateFormat="dd/MM/yyyy"
                />
            </div>
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
                {infosedinte.map((infosedinte) => {
                  const client =
                    clienti.find((c) => infosedinte.IDClient === c.IdClient) ||
                    null;
                  const instructor =
                    instructors.find(
                      (i) => i.IDInstructor === infosedinte.IDInstructor
                    ) || null;
                  const masina =
                    (infosedinte.Numar &&
                      masini.find(
                        (m) => m.Numar.trim() === infosedinte.Numar.trim()
                      )) ||
                    null;
                  const traseu =
                    this.state.trasee.find(
                      (t) => t.IDTraseu === infosedinte.TraseuID
                    ) || null;
                //   console.log(infosedinte);

                //   console.log(" ");
                  return (
                    <tr key={infosedinte.IDSedintaClient}>
                      <td>{client.Nume ? client.Nume : "nume"}</td>
                      {/* <td>{infosedinte.Nume_Client}</td> */}

                      <td>{client ? client.Prenume : ""}</td>
                      {/* <td>{infosedinte.Prenume_Client}</td> */}
                      <td>
                        {infosedinte.TipSedinta === "T"
                          ? "Teoretica"
                          : "Practica"}
                      </td>
                      <td>{infosedinte.TipSedinta ==="P" ? infosedinte.DenumireLocatie : "---"}</td>
                      <td>{traseu ? traseu.Localitatea : ""}</td>
                      <td>
                        {new Date(infosedinte.DataSedinta).toLocaleString(
                          "en-GB",
                          {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                            second: "2-digit",
                            hour12: false, 
                          }
                        )}
                      </td>

                      <td>{instructor ? instructor.Nume : "nume"}</td>
                      {/* <td>{infosedinte.Nume_Instructor}</td> */}

                      {/* <td>{infosedinte.Prenume_Instructor}</td> */}
                      <td>{instructor ? instructor.Prenume : ""}</td>

                      {/* <td>{infosedinte.DataSedinta}</td> */}
                      {/* <td>{new Date(infosedinte.DataSedinta).toLocaleString()}</td> */}
                      <td>{infosedinte.TipSedinta ==="P" ? infosedinte.DurataTraseu : "---"}</td>
                      {/* <td>{traseu ? traseu.DurataTraseu : ""}</td> */}
                      <td>{infosedinte.TipSedinta ==="P" ? (masina ? masina.Marca : "---") : "---"}</td>
                      <td>{infosedinte.TipSedinta ==="P" ? (masina ? masina.Model : "---") : "---"}</td>
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

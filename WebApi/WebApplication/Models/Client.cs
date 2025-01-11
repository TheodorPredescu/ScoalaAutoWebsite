using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models
{
    public class Client
    {
        public int IdClient { get; set; }
        public string Nume { get; set; }
        public string Prenume { get; set; }
        public string Adresa { get; set; }
        public string CNP { get; set; }
        public string Sex { get; set; }
        public DateTime Data_Nastere { get; set; }
        public DateTime Data_Instriere { get; set; }
        public string Localitatea_Inscrierii { get; set; }
    }
}
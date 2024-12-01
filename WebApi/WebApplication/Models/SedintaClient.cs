using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models
{
    public class SedintaClient
    {
        public int IDSedintaClient { get; set; }
        public int IDInstructor { get; set; }          // Instructor ID
        public int? CodMasina { get; set; }              // Car Code
        public string Locatie { get; set; }             // Location
        public DateTime DataSedinta { get; set; }       // Meeting Date
        public TimeSpan Durata { get; set; }            // Duration
        public char TipSedinta { get; set; }            // Meeting Type
        public int IDClient { get; set; }               // Client ID
        public int? LocatieID {  get; set; }

        // !!!!!!!!!!!!!!!!
        //public string DenumireLocatie { get; set; }
    }
}
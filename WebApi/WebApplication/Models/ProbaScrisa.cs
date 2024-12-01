using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models
{
    public class ProbaScrisa
    {
        //C.Nume as NumeClient, C.Prenume as PrenumeClient, C.CNP, C.IDClient, PS.LoculSustinere, PS.DataInceperii, PS.IDProbaScrisa
        public string NumeClient { get; set; }
        public string PrenumeClient { get; set; }
        public string CNP { get; set; }
        //public int IDClient { get; set; }              // Client ID

        public string LoculSustinere {  get; set; }
        public DateTime DataInceperii { get; set; }    // Start date
        public TimeSpan durata { get; set; }            // Duration
        public int IDProbaScrisa { get; set; }          // Written exam ID
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models
{
    public class ProgramareTraseu
    {
        public int IDTraseu { get; set; }                     // Route ID
        public int IDClient { get; set; }                      // Client ID
        public DateTime DataSustinerii { get; set; }          // Date of the assessment
        public int CodMasina { get; set; }                     // Car code
        public int IDProgramareTraseu { get; set; }           // Program scheduling ID
    }
}
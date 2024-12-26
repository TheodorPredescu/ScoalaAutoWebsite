using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Sockets;
using System.Reflection;
using System.Web;

namespace WebApplication.Models
{
    public class ProgramareTraseu
    {
        public int IDProgramareTraseu { get; set; }           // Program scheduling ID
        public string CNPClient { get; set; }    // Client ID
        public string NumeClient { get; set; }
        public string PrenumeClient { get; set; }
        public int IDTraseu { get; set; }                     // Route ID
        public DateTime DataSustinerii { get; set; }          // Date of the assessment
        public int CodMasina { get; set; }       // Car code
        public string NumarMasina { get; set; }

        public string Localitatea { get; set; }
        public string NumeTraseu { get; set; }
        public string ZonaPlecare { get; set; }
        public TimeSpan DurataTraseu { get; set; }


        public int IDPolitist {  get; set; }
        public string NumePolitist { get; set; }
        public string PrenumePolitist { get; set; }
        public string CNPPolitist { get; set; }


//        select PT.IDProgramareTraseu,
//        (select C.CNP
//        from dbo.Client C

//        where C.IDClient = PT.IDClient) as CNP_Client,
//		PT.IDTraseu, PT.DataSustinerii, PT.CodMasina,
//		T.Localitatea, T.NumeTraseu, T.ZonaPlecare, T.DurataTraseu,
//		P.IDPolitist
//from dbo.ProgramareTraseu PT inner join dbo.Traseu T on T.IDTraseu = PT.IDTraseu
//    inner join dbo.Politist P on T.IDPolitist = P.IDPolitist

//    inner join dbo.Masina M on M.CodMasina = PT.CodMasina;
    }
}
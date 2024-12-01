using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Web;

namespace WebApplication.Models
{
    public class InformatiiSedinta
    {
        public int IDSedintaClient {  get; set; }
        //public string Nume_Client { get; set; }
        //public string Prenume_Client { get; set; }

        // from post
        public string IDClient { get; set; }
        public string IDInstructor { get; set; }
        public string Numar { get; set; } 
        public DateTime DataSedinta { get; set; }
        public string DenumireLocatie { get; set; }
        public char TipSedinta { get; set; }


    }
}
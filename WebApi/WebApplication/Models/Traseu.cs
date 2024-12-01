using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models
{
    public class Traseu
    {
        public string Localitatea { get; set; }              // Locality (up to 100 characters)
        public string NumeTraseu { get; set; }               // Route name (up to 100 characters, optional)
        public string ZonaPlecare { get; set; }               // Departure area (up to 100 characters)
        public int IDPolitist { get; set; }                  // Policeman ID
        public TimeSpan DurataTraseu { get; set; }           // Route duration
        public int IDTraseu { get; set; }                    // Route ID
    }
}
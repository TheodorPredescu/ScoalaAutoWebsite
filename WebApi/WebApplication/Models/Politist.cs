using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models
{
    public class Politist
    {
        public string Nume { get; set; }                  // Last name (up to 100 characters)
        public string Prenume { get; set; }               // First name (up to 100 characters)
        public char Sex { get; set; }                     // Gender (single character)
        public string CNP { get; set; }                   // Personal Numeric Code (exactly 13 characters)
        public string Adresa { get; set; }                // Address (up to 100 characters, optional)
        public DateTime DataNastere { get; set; }        // Date of birth
        public int IDPolitist { get; set; }               // Unique policeman ID
    }
}
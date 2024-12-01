using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models
{
    public class Instructor
    {
        public string Nume { get; set; }              // Last name (up to 100 characters)
        public string Prenume { get; set; }           // First name (up to 100 characters)
        public string CNP { get; set; }               // Personal Numeric Code (exactly 13 characters)
        public string Adresa { get; set; }            // Address (up to 100 characters)
        public DateTime DataNastere { get; set; }    // Date of birth
        public DateTime DataContract { get; set; }    // Contract date
        public char Sex { get; set; }                 // Gender (single character)
        public decimal Salariu { get; set; }          // Salary (numeric with 9 total digits and 2 decimal places)
        public int IDInstructor { get; set; }
    }
}
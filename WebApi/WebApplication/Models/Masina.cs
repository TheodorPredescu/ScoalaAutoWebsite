using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models
{
    public class Masina
    {
        public int CodMasina { get; set; }            // Car code
        public string Numar { get; set; }              // License plate number (exactly 20 characters)
        public string Marca { get; set; }              // Brand of the car
        public string Model { get; set; }              // Model of the car (optional)
        public string Culoare { get; set; }            // Color of the car (optional)
        public DateTime AnFabricare { get; set; }      // Year of manufacture
    }
}
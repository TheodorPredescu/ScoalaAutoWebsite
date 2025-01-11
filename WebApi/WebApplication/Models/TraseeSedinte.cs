using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication.Models
{
    public class TraseeSedinte
    {
        public int TraseuID { get; set; }
        public string DenumireLocatie { get; set; }
        public string Localitatea { get; set; }
        public TimeSpan DurataTraseu { get; set; }
        public string ZonaPlecare {  get; set; }
    }
}
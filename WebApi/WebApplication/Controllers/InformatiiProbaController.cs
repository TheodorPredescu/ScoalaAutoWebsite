using System;
using System.Collections;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication.Models;

namespace WebApplication.Controllers
{
    public class InformatiiProbaController : ApiController
    {
        // GET: InformatiiProba
        [HttpGet]
        [Route("api/InformatiiProba")]
        public HttpResponseMessage getAllInfoProbe()
        {
            string query = @"select c.Nume, c.Prenume, c.CNP, ps.DataInceperii as DataInceperii_scris, ps.durata as durata_scris, ps.LoculSustinere as LoculSustinere_scris, pt.DataSustinerii as DataSustinerii_traseu, t.NumeTraseu, t.DurataTraseu, t.ZonaPlecare as ZonaPlecare_traseu
                            from dbo.Client c left join dbo.ProbaScrisa ps on ps.IDClient = c.IDClient
                                left join dbo.ProgramareTraseu pt on pt.IDClient = c.IDClient
                                left join dbo.Traseu t on t.IDTraseu = pt.IDTraseu;";  
            DataTable table = new DataTable();
            using (var con = new SqlConnection(ConfigurationManager.
                ConnectionStrings["ScoalaAuto"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }
    }
}
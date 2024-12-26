using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Net.Http;
using System.Net;
using System.Web;
using System.Web.Mvc;
using System.Web.Http;

namespace WebApplication.Controllers
{
    public class TraseeController : ApiController
    {
        // GET: ProbaFizica
        public HttpResponseMessage GetProbaFizica()
        {
            // SQL query to retrieve Instructor details
            string query = @"
                        select Localitatea, NumeTraseu, ZonaPlecare, IDPolitist, DurataTraseu, IDTraseu
	                from dbo.Traseu;";

            DataTable table = new DataTable();

            // Establishing the database connection and executing the query
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["ScoalaAuto"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            // Return the result as HTTP response
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }
    }
}
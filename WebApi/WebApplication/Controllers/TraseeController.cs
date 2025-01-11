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
            // ADDED DenumireLocatie!!
            string query = @"
                        select T.Localitatea, T.NumeTraseu, T.ZonaPlecare, T.IDPolitist, T.DurataTraseu, T.IDTraseu, TS.DenumireLocatie
	                from dbo.Traseu T inner join TraseeSedinte TS on T.IDTraseu = TS.TraseuID;";

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
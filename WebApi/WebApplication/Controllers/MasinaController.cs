using System;
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
    public class MasinaController : ApiController
    {
        // GET: Masina
        public HttpResponseMessage GetNameClient()
        {
            // Modified query to join SedintaClient with Masina and other relevant tables
            string query = @"
        SELECT 
            CodMasina, Numar, Marca, Model, Culoare, AnFabricare
        FROM dbo.Masina ";

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
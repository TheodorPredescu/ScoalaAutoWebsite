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
        [HttpGet]
        [Route("api/Masina")]
        public HttpResponseMessage GetAllCars()
        {
            // Modified query to join SedintaClient with Masina and other relevant tables
            string query = @"
        SELECT 
            m.CodMasina, m.Numar, m.Marca, m.Model, m.Culoare, m.AnFabricare, 
                (select top 1 i.CNP
                from Instructor i inner join SedintaClient sc on i.IDInstructor = sc.IDInstructor
                where m.CodMasina = sc.CodMasina) as CNP_Instructor
        FROM dbo.Masina m ";

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

        [HttpGet]
        [Route("api/Masina/{an_fabricare}")]
        public HttpResponseMessage getACar(String an_fabricare)
        {
            // Modified query to join SedintaClient with Masina and other relevant tables
            string query = @"
        SELECT 
            m.CodMasina, m.Numar, m.Marca, m.Model, m.Culoare, m.AnFabricare, 
                (select top 1 i.CNP
                from Instructor i inner join SedintaClient sc on i.IDInstructor = sc.IDInstructor
                where m.CodMasina = sc.CodMasina) as CNP_Instructor
        FROM dbo.Masina m 
        WHERE m.AnFabricare >= @an";

            DataTable table = new DataTable();

            // Establishing the database connection and executing the query
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["ScoalaAuto"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;

                cmd.Parameters.AddWithValue("an", an_fabricare);
                da.Fill(table);
            }

            // Return the result as HTTP response
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

    }
}
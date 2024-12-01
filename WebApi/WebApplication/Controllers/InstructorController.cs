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
    public class InstructorController : ApiController
    {
        public HttpResponseMessage GetNameInstructor()
        {
            // SQL query to retrieve Instructor details
            string query = @"
        SELECT 
            i.Nume, 
            i.Prenume, 
            i.CNP, 
            i.Adresa, 
            i.DataNastere, 
            i.DataContract, 
            i.Sex, 
            i.Salariu, 
            i.IDInstructor
        FROM dbo.Instructor i";

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
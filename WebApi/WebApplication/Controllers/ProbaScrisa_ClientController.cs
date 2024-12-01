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
    public class ProbaScrisa_ClientController : ApiController
    {
        // GET: ProbaScrisa_Client
        public HttpResponseMessage GetNameClient()
        {
            string query = @"
                select  C.Nume as NumeClient, C.Prenume as PrenumeClient, C.CNP, PS.LoculSustinere, PS.DataInceperii, PS.Durata, PS.IDProbaScrisa
                from dbo.Client C inner join dbo.ProbaScrisa PS on PS.IDClient = C.IDClient;
                ";
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

        [HttpPost]
        public string Post(ProbaScrisa probaScrisa)
        {
            try
            {
                // Define the query with parameter placeholders
                string query = @"
                INSERT INTO dbo.ProbaScrisa
                (IDClient, DataInceperii, durata, LoculSustinere) 
                VALUES (
                (SELECT C.IDClient
                 FROM dbo.Client C
                 WHERE C.CNP = @CNP),
                @DataInceperii,
                @durata,
                @LoculSustinere )";

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["ScoalaAuto"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                {
                    // Add parameters to the command to prevent SQL injection and handle data types

                    cmd.Parameters.AddWithValue("@CNP", probaScrisa.CNP);
                    cmd.Parameters.AddWithValue("@DataInceperii", probaScrisa.DataInceperii);
                    cmd.Parameters.AddWithValue("@durata", (object)probaScrisa.durata ?? DBNull.Value);
                    cmd.Parameters.AddWithValue("@LoculSustinere", probaScrisa.LoculSustinere);

                    // Open the connection and execute the query
                    con.Open();
                    cmd.ExecuteNonQuery(); // Use ExecuteNonQuery for INSERT, UPDATE, DELETE

                    return "Added Successfully";
                }
            }
            catch (Exception ex)
            {
                // Log the exception details here if needed
                return $"Failed to Add : {ex.Message}";
            }
        }
        public string Put(ProbaScrisa probaScrisa)
        {
            try
            {
                string query = @"
            UPDATE dbo.ProbaScrisa 
            SET IDClient = (SELECT C.IDClient
                            FROM dbo.Client C
                            WHERE C.CNP = @CNP), 
                DataInceperii = @DataInceperii, 
                durata = @durata, 
                LoculSustinere = @LoculSustinere 
            WHERE IDProbaScrisa = @IDProbaScrisa";

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["ScoalaAuto"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@CNP", probaScrisa.CNP);
                    cmd.Parameters.AddWithValue("@DataInceperii", probaScrisa.DataInceperii);
                    cmd.Parameters.AddWithValue("@durata", probaScrisa.durata);
                    cmd.Parameters.AddWithValue("@LoculSustinere", probaScrisa.LoculSustinere);
                    cmd.Parameters.AddWithValue("@IDProbaScrisa", probaScrisa.IDProbaScrisa);

                    con.Open();
                    cmd.ExecuteNonQuery();
                }

                return "Updated Successfully";
            }
            catch (Exception ex)
            {
                return $"Failed to update: {ex.Message}";
            }
        }

        [HttpDelete]
        public string Delete(int id)
        {
            // Your existing delete implementation
            try
            {
                string query = @"
                DELETE FROM dbo.ProbaScrisa 
                WHERE IDProbaScrisa = @ID";

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["ScoalaAuto"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@ID", id); // Use parameterized query for safety
                    con.Open();
                    cmd.ExecuteNonQuery();
                }

                return "Deleted Successfully";
            }
            catch (Exception ex)
            {
                // Log the exception details here if needed
                return $"Failed to delete: {ex.Message}";
            }
        }
    }
}
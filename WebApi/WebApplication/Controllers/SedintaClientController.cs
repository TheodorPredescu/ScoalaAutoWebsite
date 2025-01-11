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

    public class SedintaClientController : ApiController
    {
        [HttpGet]
        [Route("api/SedintaClient")]
        public HttpResponseMessage GetNameClient()
        {
            string query = @"
                select cs.Locatie, cs.DataSedinta, cs.TipSedinta, cs.IDInstructor, cs.CodMasina, cs.Durata, cs.TipSedinta, cs.IDClient, cs.IDSedintaClient, cs.LocatieID,
                            (select i.CNP from dbo.Instructor i where cs.IDInstructor = i.IDInstructor) as CNP_Instructor
                from dbo.SedintaClient cs
                ";
            DataTable table = new DataTable();
            using(var con=new SqlConnection(ConfigurationManager.
                ConnectionStrings["ScoalaAuto"].ConnectionString))
                using(var cmd = new SqlCommand(query, con))
                using(var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        [HttpPost]
        public string Post(SedintaClient sedintaClient)
        {
            try
            {
                // (SELECT FROM dbo.Instructor WHERE )
                // Define the query with parameter placeholders
                string query = @"
                INSERT INTO dbo.SedintaClient 
                (IDInstructor, CodMasina, Locatie, DataSedinta, Durata, TipSedinta, IDClient, LocatieID) 
                VALUES (
                @IDInstructor, 
                @CodMasina, 
                @Locatie, @DataSedinta, @Durata, @TipSedinta, @IDClient, @LocatieID)";

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["ScoalaAuto"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                {
                    // Add parameters to the command to prevent SQL injection and handle data types
                    cmd.Parameters.AddWithValue("@IDInstructor", sedintaClient.IDInstructor);
                    cmd.Parameters.AddWithValue("@CodMasina", (object)sedintaClient.CodMasina ?? DBNull.Value);
                    cmd.Parameters.AddWithValue("@Locatie", sedintaClient.Locatie ?? (object)DBNull.Value);
                    cmd.Parameters.AddWithValue("@DataSedinta", sedintaClient.DataSedinta);
                    cmd.Parameters.AddWithValue("@Durata", sedintaClient.Durata);
                    cmd.Parameters.AddWithValue("@TipSedinta", sedintaClient.TipSedinta);
                    cmd.Parameters.AddWithValue("@IDClient", sedintaClient.IDClient);
                    cmd.Parameters.AddWithValue("@LocatieID", (object)sedintaClient.LocatieID ?? DBNull.Value);

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
        /*
        public string Post(SedintaClient sedintaClient)
        {
            try
            {
                string query = @"
                        insert into dbo.SedintaClient values
                        ('" + sedintaClient.IDInstructor  +sedintaClient.CodMasina + sedintaClient.Locatie + sedintaClient.DataSedinta + sedintaClient.Durata +
                            sedintaClient.TipSedinta + sedintaClient.IDClient +  @"')
                           ";
                
                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.
                    ConnectionStrings["ScoalaAuto"].ConnectionString))
                 
                using (var cmd = new SqlCommand(query, con))
                    //return "Added";
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }
                
                return "Added Successfully";
            }
            catch (Exception)
            {
                return "Failed to Add";
            }
        }*/

        /*  public string Put(SedintaClient sedintaClient)
          {
              try
              {
                  string query = @"
                          update dbo.SedintaClient set Locatie=
                          '" + sedintaClient.Locatie + @"'
                          where IDSedintaClient="+sedintaClient.IDSedintaClient+@"
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
                  return "Updated Successfully";
              }
              catch (Exception)
              {
                  return "Failed to update";
              }
          }
           */
        public string Put(SedintaClient sedintaClient)
        {
            try
            {
                string query = @"
            UPDATE dbo.SedintaClient 
            SET Locatie = @Locatie, 
                DataSedinta = @DataSedinta, 
                Durata = @Durata, 
                TipSedinta = @TipSedinta, 
                IDInstructor = @IDInstructor, 
                CodMasina = @CodMasina, 
                IDClient = @IDClient,
                LocatieID = @LocatieID
            WHERE IDSedintaClient = @IDSedintaClient";

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["ScoalaAuto"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@Locatie", sedintaClient.Locatie);
                    cmd.Parameters.AddWithValue("@DataSedinta", sedintaClient.DataSedinta);
                    cmd.Parameters.AddWithValue("@Durata", sedintaClient.Durata);
                    cmd.Parameters.AddWithValue("@TipSedinta", sedintaClient.TipSedinta);
                    cmd.Parameters.AddWithValue("@IDInstructor", sedintaClient.IDInstructor);
                    cmd.Parameters.AddWithValue("@CodMasina", (object)sedintaClient.CodMasina ?? DBNull.Value);
                    cmd.Parameters.AddWithValue("@IDClient", sedintaClient.IDClient);
                    cmd.Parameters.AddWithValue("@IDSedintaClient", sedintaClient.IDSedintaClient);
                    cmd.Parameters.AddWithValue("@LocatieID", (object)sedintaClient.LocatieID ?? DBNull.Value);

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

        /*
        [HttpDelete]
        public string Delete(int IDSedintaClient)
        {
            try
            {
                string query = @"
                        delete from dbo.SedintaClient 
                        where IDSedintaClient=" + IDSedintaClient + @"
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
                return "Deleted Successfully";
            }
            catch (Exception ex)
            {
                return $"Failed to delete: {ex.Message}";
            }
        }
        */

        [HttpDelete]
        public string Delete(int id)
        {
            // Your existing delete implementation
            try
            {
                string query = @"
                DELETE FROM dbo.SedintaClient 
                WHERE IDSedintaClient = @ID";

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

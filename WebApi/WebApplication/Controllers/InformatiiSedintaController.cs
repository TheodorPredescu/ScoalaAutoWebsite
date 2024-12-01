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
    public class InformatiiSedintaController : ApiController
    {
        // GET: InformatiiSedinta
        public HttpResponseMessage GetNameClient()
        {
            string query = @"
                select C.IDClient,SC.IDSedintaClient, SC.TipSedinta, TS.DenumireLocatie, 
                        TS.Localitatea, SC.DataSedinta, I.IDInstructor, TS.DurataTraseu, 
                        M.Numar, M.Marca as Marca_Masina, M.Model as Model_Masina
                from Instructor I inner join SedintaClient SC on I.IDInstructor = SC.IDInstructor
                inner join TraseeSedinte TS on TS.TraseuID = SC.LocatieID
                inner join Client C on C.IDClient = SC.IDClient
                inner join Masina M on M.CodMasina = SC.CodMasina;
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
        public string Post(InformatiiSedinta sedinta)
        {
            try
            {
                // Define the query with parameter placeholders
                string query = @"
                        insert into SedintaClient (IDInstructor, CodMasina, DataSedinta, Durata, TipSedinta, IDClient, LocatieID)
                        values (@IDInstructor
		                        ,(select CodMasina from Masina where Numar = @Numar)
		                        ,@DataSedinta
		                        ,(select DurataTraseu from TraseeSedinte where DenumireLocatie = @DenumireLocatie)
		                        ,@TipSedinta
		                        ,@IDClient
		                        ,(select TraseuID from TraseeSedinte where DenumireLocatie = @DenumireLocatie)
		                        );

                   ";

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["ScoalaAuto"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                {
                    // Add parameters to the command to prevent SQL injection and handle data types
                    cmd.Parameters.AddWithValue("@IDInstructor", sedinta.IDInstructor);
                    cmd.Parameters.AddWithValue("@Numar", sedinta.Numar);
                    cmd.Parameters.AddWithValue("@DataSedinta", sedinta.DataSedinta);
                    cmd.Parameters.AddWithValue("@DenumireLocatie", sedinta.DenumireLocatie);
                    cmd.Parameters.AddWithValue("@TipSedinta", sedinta.TipSedinta);
                    cmd.Parameters.AddWithValue("@IDClient", sedinta.IDClient);
                    

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


        [HttpPut]
        public string Put(InformatiiSedinta sedinta)
        {
            try
            {
                // Define the query with parameter placeholders for UPDATE
                string query = @"
            UPDATE SedintaClient
            SET
                IDInstructor = @IDInstructor,
                CodMasina = (SELECT CodMasina FROM Masina WHERE Numar = @Numar),
                DataSedinta = @DataSedinta,
                Durata = (SELECT DurataTraseu FROM TraseeSedinte WHERE DenumireLocatie = @DenumireLocatie),
                TipSedinta = @TipSedinta,
                IDClient = @IDClient,
                LocatieID = (SELECT TraseuID FROM TraseeSedinte WHERE DenumireLocatie = @DenumireLocatie)
            WHERE
                ID = @ID;";  // You will need to pass the ID of the row to update.

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["ScoalaAuto"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                {
                    // Add parameters to the command to prevent SQL injection and handle data types
                    cmd.Parameters.AddWithValue("@IDInstructor", sedinta.IDInstructor);
                    cmd.Parameters.AddWithValue("@Numar", sedinta.Numar);
                    cmd.Parameters.AddWithValue("@DataSedinta", sedinta.DataSedinta);
                    cmd.Parameters.AddWithValue("@DenumireLocatie", sedinta.DenumireLocatie);
                    cmd.Parameters.AddWithValue("@TipSedinta", sedinta.TipSedinta);
                    cmd.Parameters.AddWithValue("@IDClient", sedinta.IDClient);

                    // Open the connection and execute the query
                    con.Open();
                    cmd.ExecuteNonQuery(); // Use ExecuteNonQuery for INSERT, UPDATE, DELETE

                    return "Updated Successfully";
                }
            }
            catch (Exception ex)
            {
                // Log the exception details here if needed
                return $"Failed to Update : {ex.Message}";
            }
        }

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
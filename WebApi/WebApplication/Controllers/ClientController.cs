using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication.Models;

namespace WebApplication.Controllers
{
    public class ClientController : ApiController
    {
        public HttpResponseMessage GetNameClient()
        {
            string query = @"
        select c.Nume, c.Prenume, c.Adresa, c.IDClient, c.DataNasterii, c.CNP, c.DataInscriere, c.Sex ,
		    (select top 1 sc.Locatie
		    from dbo.SedintaClient sc
		    where sc.IDClient = c.IDClient) as ""Localitatea_Inscrierii""
        from dbo.Client c;";
            DataTable table = new DataTable();
            List<Client> clients = new List<Client>(); // Create a list to store client objects

            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["ScoalaAuto"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            // Convert DataTable rows to List of Client objects
            foreach (DataRow row in table.Rows)
            {
                clients.Add(new Client
                {
                    IdClient = Convert.ToInt32(row["IDClient"]),
                    Nume = row["Nume"].ToString(),
                    Prenume = row["Prenume"].ToString(),
                    Adresa = row["Adresa"].ToString(),
                    CNP = row["CNP"].ToString(),
                    Sex = row["Sex"].ToString(),
                    // Convert the date columns from the database to DateTime
                    Data_Nastere = Convert.ToDateTime(row["DataNasterii"]),
                    Data_Instriere = Convert.ToDateTime(row["DataInscriere"]),
                    Localitatea_Inscrierii = row["Localitatea_Inscrierii"].ToString()
                });
            }

            return Request.CreateResponse(HttpStatusCode.OK, clients); // Return the list of clients
        }


        [HttpPost]
        public string Post(Client client)
        {
            try
            {
                // Define the query with parameter placeholders
                string query = @"
                INSERT INTO dbo.Client 
                (Nume, Prenume, CNP, Adresa, DataNasterii, Sex, DataInscriere) 
                VALUES (@Nume, @Prenume, @CNP, @Adresa, @DataNasterii, @Sex, @DataInscriere)";

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["ScoalaAuto"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                {
                    // Add parameters to the command to prevent SQL injection and handle data types
                    //cmd.Parameters.AddWithValue("@IDClient",client.IdClient);
                    cmd.Parameters.AddWithValue("@Nume", client.Nume);
                    cmd.Parameters.AddWithValue("@Prenume", client.Prenume);
                    cmd.Parameters.AddWithValue("@CNP", client.CNP);
                    cmd.Parameters.AddWithValue("@Adresa", client.Adresa);
                    cmd.Parameters.AddWithValue("@DataNasterii", client.Data_Nastere);
                    cmd.Parameters.AddWithValue("@Sex", client.Sex);
                    cmd.Parameters.AddWithValue("@DataInscriere", client.Data_Instriere);

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

        public string Put(Client client)
        {
            try
            {
                string query = @"
            UPDATE dbo.Client 
            SET Adresa = @Adresa, Nume = @Nume, Prenume = @Prenume, CNP = @CNP, 
                DataNasterii = @DataNasterii, Sex = @Sex, DataInscriere = @DataInscriere
            WHERE IDClient = @IDClient";

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["ScoalaAuto"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                {
                    // Add parameters with the values from the client object
                    cmd.Parameters.AddWithValue("@Adresa", client.Adresa);
                    cmd.Parameters.AddWithValue("@Nume", client.Nume);
                    cmd.Parameters.AddWithValue("@Prenume", client.Prenume);
                    cmd.Parameters.AddWithValue("@CNP", client.CNP);
                    cmd.Parameters.AddWithValue("@DataNasterii", client.Data_Nastere);
                    cmd.Parameters.AddWithValue("@Sex", client.Sex);
                    cmd.Parameters.AddWithValue("@DataInscriere", client.Data_Instriere);
                    cmd.Parameters.AddWithValue("@IDClient", client.IdClient); // Assuming IDClient is the primary key

                    // Open the connection and execute the query
                    con.Open();
                    int rowsAffected = cmd.ExecuteNonQuery();

                    if (rowsAffected > 0)
                    {
                        return "Updated Successfully";
                    }
                    else
                    {
                        return "No record found to update";
                    }
                }
            }
            catch (Exception ex)
            {
                // Log the exception details here if needed
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
                DELETE FROM dbo.Client 
                WHERE IDClient = @ID";

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

using System;
using System.Data;
using System.Data.SqlClient;
using System.Configuration;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApplication.Models;
using System.Web.UI.WebControls;


namespace WebApplication.Controllers
{
    public class TraseeSedinteController : ApiController
    {
        public HttpResponseMessage GetTraseeSedinte()
        {
            // Fix the query syntax (FROM clause was missing)
            string query = @"
                SELECT DenumireLocatie, Localitatea, DurataTraseu, TraseuID
                FROM dbo.TraseeSedinte";  // Added 'FROM'

            DataTable table = new DataTable();
            using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["ScoalaAuto"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                da.Fill(table);
            }

            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        [HttpPost]
        public string Post(TraseeSedinte traseeSedinte)
        {
            try
            {
                // Define the query with parameter placeholders
                string query = @"
                INSERT INTO dbo.TraseeSedinte
                (DenumireLocatie, Localitatea, DurataTraseu) 
                VALUES (@DenumireLocatie, @Localitatea, @DurataTraseu)";  // Fixed parameter name

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["ScoalaAuto"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                {
                    // Add parameters to the command to prevent SQL injection and handle data types
                    cmd.Parameters.AddWithValue("@DenumireLocatie", traseeSedinte.DenumireLocatie);
                    cmd.Parameters.AddWithValue("@Localitatea", traseeSedinte.Localitatea);
                    cmd.Parameters.AddWithValue("@DurataTraseu", traseeSedinte.DurataTraseu);

                    // Open the connection and execute the query
                    con.Open();
                    cmd.ExecuteNonQuery(); // Use ExecuteNonQuery for INSERT, UPDATE, DELETE

                    return "Added Successfully";
                }
            }
            catch (Exception ex)
            {
                // Log the exception details here if needed
                return $"Failed to Add: {ex.Message}";
            }
        }
        [HttpPut]
        public string Put(TraseeSedinte traseeSedinte)
        {
            try
            {
                string query = @"
                UPDATE dbo.TraseeSedinte
                SET DenumireLocatie = @DenumireLocatie,
                    Localitatea = @Localitatea,
                    DurataTraseu = @DurataTraseu
                WHERE TraseuID = @TraseuID"; // Use TraseuID to identify the record

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["ScoalaAuto"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@DenumireLocatie", traseeSedinte.DenumireLocatie);
                    cmd.Parameters.AddWithValue("@Localitatea", traseeSedinte.Localitatea);
                    cmd.Parameters.AddWithValue("@DurataTraseu", traseeSedinte.DurataTraseu);
                    cmd.Parameters.AddWithValue("@TraseuID", traseeSedinte.TraseuID);  // Use the id parameter to identify the record to update

                    con.Open();
                    cmd.ExecuteNonQuery();

                    return "Updated Successfully";
                }
            }
            catch (Exception ex)
            {
                return $"Failed to Update: {ex.Message}";
            }
        }

        [HttpDelete]
        public string Delete(int id)
        {
            try
            {
                string query = @"
                DELETE FROM dbo.TraseeSedinte 
                WHERE TraseuID = @TraseuID";

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["ScoalaAuto"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@TraseuID", id); // Use the id parameter to identify the record to delete

                    con.Open();
                    cmd.ExecuteNonQuery();

                    return "Deleted Successfully";
                }
            }
            catch (Exception ex)
            {
                return $"Failed to Delete: {ex.Message}";
            }
        }



        [HttpGet]
        public HttpResponseMessage Get(int id)
        {
            try
            {
                string query = @"
                SELECT DenumireLocatie, Localitatea, DurataTraseu, TraseuID
                FROM dbo.TraseeSedinte
                WHERE TraseuID = @TraseuID"; // Use TraseuID to identify the record

                DataTable table = new DataTable();
                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["ScoalaAuto"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                using (var da = new SqlDataAdapter(cmd))
                {
                    cmd.Parameters.AddWithValue("@TraseuID", id);  // Use the id parameter to identify the record to update
                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                }

                return Request.CreateResponse(HttpStatusCode.OK, table);

               /* using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["ScoalaAuto"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                {

                    con.Open();
                    cmd.ExecuteNonQuery();

                    cmd.CommandType = CommandType.Text;
                    da.Fill(table);
                    return "Showed one Successfully";
                }

                */
            }
            catch (Exception ex)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, ex);
                //return $"Failed to Update: {ex.Message}";
            }
        }
        // Uncommented Put and Delete methods should be fixed too, if needed, based on your logic.
    }
}

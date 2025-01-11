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
    public class ProgramareTraseuController : ApiController
    {
        [HttpGet]
        [Route("api/ProgramareTraseu")]
        public HttpResponseMessage GetAll()
        {
            string query = @"
                select PT.IDProgramareTraseu,
                        (select C.CNP
                        from dbo.Client C
                        where C.IDClient = PT.IDClient) as CNPClient,
                        (select C.Nume
                        from dbo.Client C
                        where C.IDClient = PT.IDClient) as NumeClient,
                        (select C.Prenume
                        from dbo.Client C
                        where C.IDClient = PT.IDClient) as PrenumeClient,
		                PT.IDTraseu, PT.DataSustinerii, PT.CodMasina,
		                T.Localitatea, T.NumeTraseu, T.ZonaPlecare, T.DurataTraseu,
		                P.IDPolitist,
                        (select pp.Nume
                        from dbo.Politist pp
                        where pp.IDPolitist = P.IDPolitist) as NumePolitist,
                        (select pp.Prenume
                        from dbo.Politist pp
                        where pp.IDPolitist = P.IDPolitist) as PrenumePolitist,
                        (select pp.CNP
                        from dbo.Politist pp
                        where pp.IDPolitist = P.IDPolitist) as CNPPolitist,
                        (select m.Numar from dbo.Masina m where m.CodMasina = PT.CodMasina) as NumarMasina

                from dbo.ProgramareTraseu PT inner join dbo.Traseu T on T.IDTraseu = PT.IDTraseu
                    inner join dbo.Politist P on T.IDPolitist = P.IDPolitist
                    inner join dbo.Masina M on M.CodMasina = PT.CodMasina;
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
        [HttpGet]
        [Route("api/ProgramareTraseu/{data}")]
        public HttpResponseMessage GetOne(String data)
        {
            string query = @"
                select PT.IDProgramareTraseu,
                        (select C.CNP
                        from dbo.Client C
                        where C.IDClient = PT.IDClient) as CNPClient,
                        (select C.Nume
                        from dbo.Client C
                        where C.IDClient = PT.IDClient) as NumeClient,
                        (select C.Prenume
                        from dbo.Client C
                        where C.IDClient = PT.IDClient) as PrenumeClient,
		                PT.IDTraseu, PT.DataSustinerii, PT.CodMasina,
		                T.Localitatea, T.NumeTraseu, T.ZonaPlecare, T.DurataTraseu,
		                P.IDPolitist,
                        (select pp.Nume
                        from dbo.Politist pp
                        where pp.IDPolitist = P.IDPolitist) as NumePolitist,
                        (select pp.Prenume
                        from dbo.Politist pp
                        where pp.IDPolitist = P.IDPolitist) as PrenumePolitist,
                        (select pp.CNP
                        from dbo.Politist pp
                        where pp.IDPolitist = P.IDPolitist) as CNPPolitist,
                        (select m.Numar from dbo.Masina m where m.CodMasina = PT.CodMasina) as NumarMasina

                from dbo.ProgramareTraseu PT inner join dbo.Traseu T on T.IDTraseu = PT.IDTraseu
                    inner join dbo.Politist P on T.IDPolitist = P.IDPolitist
                    inner join dbo.Masina M on M.CodMasina = PT.CodMasina
                WHERE PT.DataSustinerii >= @data;
                ";
            DataTable table = new DataTable();
            using (var con = new SqlConnection(ConfigurationManager.
                ConnectionStrings["ScoalaAuto"].ConnectionString))
            using (var cmd = new SqlCommand(query, con))
            using (var da = new SqlDataAdapter(cmd))
            {
                cmd.CommandType = CommandType.Text;
                cmd.Parameters.AddWithValue("@data", data);
                da.Fill(table);
            }
            return Request.CreateResponse(HttpStatusCode.OK, table);
        }

        [HttpPost]
        public string Post(ProgramareTraseu programareTraseu)
        {
            try
            {
                // Define the query with parameter placeholders
                string query = @"
                INSERT INTO dbo.ProgramareTraseu
                (IDClient, IDTraseu, DataSustinerii, CodMasina) 
                VALUES (
                (SELECT C.IDClient
                 FROM dbo.Client C
                 WHERE C.CNP = @CNP),
                @IDTraseu,
                @DataSustinerii,
                @CodMasina )";

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["ScoalaAuto"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                {
                    // Add parameters to the command to prevent SQL injection and handle data types

                    cmd.Parameters.AddWithValue("@CNP", programareTraseu.CNPClient);
                    cmd.Parameters.AddWithValue("@DataSustinerii", programareTraseu.DataSustinerii);
                    cmd.Parameters.AddWithValue("@IDTraseu", programareTraseu.IDTraseu);
                    cmd.Parameters.AddWithValue("@CodMasina", programareTraseu.CodMasina);

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

        public string Put(ProgramareTraseu programareTraseu)
        {
            try
            {
                string query = @"
                UPDATE dbo.ProgramareTraseu
                SET IDClient = (SELECT C.IDClient
                            FROM dbo.Client C
                            WHERE C.CNP = @CNP),
                    IDTraseu = @IDTraseu,
                    DataSustinerii = @DataSustinerii,
                    CodMasina = @CodMasina
                WHERE IDProgramareTraseu = @IDProgramareTraseu";

                using (var con = new SqlConnection(ConfigurationManager.ConnectionStrings["ScoalaAuto"].ConnectionString))
                using (var cmd = new SqlCommand(query, con))
                {
                    cmd.Parameters.AddWithValue("@CNP", programareTraseu.CNPClient);
                    cmd.Parameters.AddWithValue("@IDTraseu", programareTraseu.IDTraseu);
                    cmd.Parameters.AddWithValue("@DataSustinerii", programareTraseu.DataSustinerii);
                    cmd.Parameters.AddWithValue("@CodMasina", programareTraseu.CodMasina);
                    cmd.Parameters.AddWithValue("@IDProgramareTraseu", programareTraseu.IDProgramareTraseu);

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
                DELETE FROM dbo.ProgramareTraseu 
                WHERE IDProgramareTraseu = @ID";

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
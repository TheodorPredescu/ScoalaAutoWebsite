select C.Nume, C.Prenume, C.CNP, PS.LoculSustinere, PS.DataInceperii, PS.durata
from Client C inner join ProbaScrisa PS on C.IDClient = PS.IDClient;

select  C.Nume, C.Prenume, C.CNP, C.IDClient, T.NumeTraseu, T.Localitatea, T.ZonaPlecare,
		PT.IDTraseu ,PT.DataSustinerii,
		(select top 1 M.Numar
		from Masina M
		where M.CodMasina = PT.CodMasina) as NumarMasina,
		PT.CodMasina
from Client C inner join ProgramareTraseu PT on PT.IDClient = C.IDClient
inner join Traseu T on T.IDTraseu = PT.IDTraseu;

select  C.Nume, C.Prenume, C.CNP, C.IDClient, PS.LoculSustinere, PS.DataInceperii, PS.IDProbaScrisa
from Client C inner join ProbaScrisa PS on PS.IDClient = C.IDClient;
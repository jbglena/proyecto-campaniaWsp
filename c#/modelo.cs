  public DataTable ListarPlantillasWhatsappChat(string codigoPlantilla, string codigoBot)
        {
            DataTable dt = new DataTable();
            try
            {
                using (SqlConnection sqlConnection1 = new SqlConnection(objConn))
                {
                    using (SqlCommand objCommand = new SqlCommand())
                    {
                        objCommand.CommandText = @"SELECT pl.id, pl.codigo, pl.mensaje, pl.estadoAprobado AS idEstado, tm.descripcion AS estado, DATEADD(HOUR, -5, pl.fechaCreacion)fechaCreacion,
                                                   usu.nombre AS usuarioCreador, ISNULL(pl.idPlantillaWhatsapp, '') idPlantillaGupshup
                                                   FROM PlPlantilla pl
                                                   INNER JOIN PlTablaMaestra tm ON tm.idTabla = 4 AND tm.idColumna = pl.estadoAprobado
                                                   INNER JOIN PlUsuario usu ON usu.id = pl.usuarioCreador
                                                   WHERE pl.estado = 1 AND pl.codigoBot = @codigoBot AND pl.codigo = @codigoPlantilla
                                                   ORDER BY pl.fechaCreacion DESC";
                        objCommand.Parameters.AddWithValue("@codigoBot", codigoBot);
                        objCommand.Parameters.AddWithValue("@codigoPlantilla", codigoPlantilla);
                        objCommand.CommandTimeout = Int32.MaxValue;
                        objCommand.CommandType = CommandType.Text;
                        objCommand.Connection = sqlConnection1;

                        sqlConnection1.Open();
                        dt.Load(objCommand.ExecuteReader());
                        sqlConnection1.Close();
                    }
                }
            }
            catch (Exception ex)
            {
                objLog.InsertarLog(System.Reflection.MethodInfo.GetCurrentMethod().ToString(), ex.Message);
            }
            return dt;
        }

          public List<dynamic> ListarVariablesPlantillasInner_List(string codigoPlantilla, string codigoBot)
        {
            var Listado = new List<dynamic>();
            try
            {
                DataTable dtVariables = ListarVariablesPlantillasInner(codigoPlantilla, codigoBot);
                if (dtVariables.Rows.Count > 0)
                {
                    for (int vp = 0; vp < dtVariables.Rows.Count; vp++)
                    {
                        string variable = dtVariables.Rows[vp]["variable"].ToString();
                        variable = variable.Replace("${", "").Replace("{{", "").Replace("}", "");

                        var Lista = new
                        {
                            Id = Convert.ToInt32(dtVariables.Rows[vp]["id"]),
                            Variable = variable,
                            IdQuestionType = Convert.ToInt32(dtVariables.Rows[vp]["idQuestionType"]),
                            nombreQuestionType = Convert.ToString(dtVariables.Rows[vp]["nombreQuestionType"]),
                            questionType = Convert.ToString(dtVariables.Rows[vp]["questionType"]),
                        };
                        Listado.Add(Lista);
                    }
                }
            }
            catch (Exception ex)
            {
                objLog.InsertarLog(System.Reflection.MethodInfo.GetCurrentMethod().ToString(), ex.Message);
            }
            return Listado;
        }
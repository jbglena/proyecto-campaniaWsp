public JsonResult GetListadoVariablesPorPlantillasInner(string codigoPlantilla, string codigoBot)
        {
            DataTable dtPlantilla = objBot.ListarPlantillasWhatsappChat(codigoPlantilla, codigoBot);
            if (dtPlantilla.Rows.Count > 0)
            {
                List<dynamic> ListaRecordatorio = new List<dynamic>();
                ListaRecordatorio.Add(new
                {
                    MensajePlantilla = dtPlantilla.Rows[0]["mensaje"].ToString(),
                    ListadoVariables = objBot.ListarVariablesPlantillasInner_List(codigoPlantilla, codigoBot).ToList()
                });

                return Json(ListaRecordatorio.ToList(), JsonRequestBehavior.AllowGet);
            }

            Response.StatusCode = (int)System.Net.HttpStatusCode.InternalServerError;
            return Json(new { response = false }, JsonRequestBehavior.AllowGet);
        }